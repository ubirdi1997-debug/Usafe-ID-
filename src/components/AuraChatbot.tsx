import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  RefreshCw,
  FileText,
  Mail,
  Activity,
  AlertOctagon,
  CornerDownLeft,
  ChevronRight
} from 'lucide-react';
import { AuraChatMessage } from '../types';
import { Region } from '../lib/domains';

interface AuraChatbotProps {
  currentRegion: Region;
  embeddedMode?: boolean;
}

export const AuraChatbot: React.FC<AuraChatbotProps> = ({
  currentRegion,
  embeddedMode = false,
}) => {
  const [messages, setMessages] = useState<AuraChatMessage[]>([
    {
      id: 'init-1',
      sender: 'aura',
      content:
        'Greetings. I am Aura, your confidential on-device and enclave-backed intelligence assistant. All prompts and outputs are encrypted under your sovereign Ed25519 session key. How may I assist your enclave operations today?',
      timestamp: '18:32:00',
      status: 'enclave_signed',
      meta: {
        nodeId: 'ZURICH-04',
        executionTimeMs: 12,
        signature: 'sig_ed25519:9f81a0e...',
      },
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const executeCommand = (
    commandKey: 'summarize' | 'draft-mail' | 'check-mesh' | 'crash-logs' | 'custom',
    customText?: string
  ) => {
    const userText = customText || getCommandText(commandKey);
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    const userMsg: AuraChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: userText,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);
    setInputPrompt('');

    setTimeout(() => {
      let auraResponse: AuraChatMessage;

      if (commandKey === 'summarize' || userText.toLowerCase().includes('summar') || userText.toLowerCase().includes('note')) {
        auraResponse = {
          id: `aura-${Date.now()}`,
          sender: 'aura',
          content:
            'Decrypted and analyzed 4 recent markdown documents from your local IndexedDB vault. Generated a unified sovereign executive summary:',
          timestamp: new Date().toTimeString().split(' ')[0],
          status: 'verified',
          commandType: 'summarize',
          meta: {
            nodeId: 'ZURICH-04-CONFIDENTIAL',
            executionTimeMs: 84,
            signature: 'sig_ed25519:7a28e910...',
            actionResult: {
              title: 'Encrypted Notes Synthesis [Compiled to uDocs]',
              details: [
                '• Project Quantum: Finalized Ed25519 key derivation schedule for Q3 deployment.',
                '• Security Audit: Zero privilege escalation findings across Android 17 Amber OS LSM layers.',
                '• Mesh Topology: 6 Global egress nodes confirmed running with 0.00ms telemetry leakage.',
                '• Export target: Saved as "Executive_Enclave_Briefing.udoc" with local ChaCha20 encryption.'
              ],
              codeBlock: 'HASH_DIGEST: sha256:4b20...e91a [SAVED TO uWORKSPACE]',
            },
          },
        };
      } else if (commandKey === 'draft-mail' || userText.toLowerCase().includes('mail') || userText.toLowerCase().includes('draft')) {
        auraResponse = {
          id: `aura-${Date.now()}`,
          sender: 'aura',
          content:
            'Drafted encrypted dispatch via uMail. Verified recipient public key fingerprint for dev.team@amber.id against sovereign PKI ledger:',
          timestamp: new Date().toTimeString().split(' ')[0],
          status: 'verified',
          commandType: 'draft-mail',
          meta: {
            nodeId: 'ZURICH-04-CONFIDENTIAL',
            executionTimeMs: 110,
            signature: 'sig_ed25519:5c31f088...',
            actionResult: {
              title: 'uMail Encrypted Dispatch (#UMAIL-9812)',
              details: [
                '• Recipient: dev.team@amber.id (Ed25519: Verified on-chain ledger)',
                '• Subject: [ENCRYPTED] Sovereign Node Handshake Configuration V4',
                '• Payload Encryption: Double-Ratchet E2E with Kyber-1024 Ephemeral Secret',
                '• Self-Destruct Timer: 72 hours post-read confirmation'
              ],
              codeBlock: 'STATUS: Staged in Outbox queue. Ready for hardware token signature assertion.',
            },
          },
        };
      } else if (commandKey === 'check-mesh' || userText.toLowerCase().includes('mesh') || userText.toLowerCase().includes('latency') || userText.toLowerCase().includes('nonce')) {
        auraResponse = {
          id: `aura-${Date.now()}`,
          sender: 'aura',
          content:
            'Performed cryptographic telemetry scan across 6 active OpenClaw mesh relay nodes. Ephemeral packet nonces have been successfully rotated:',
          timestamp: new Date().toTimeString().split(' ')[0],
          status: 'verified',
          commandType: 'check-mesh',
          meta: {
            nodeId: 'ZURICH-04-CONFIDENTIAL',
            executionTimeMs: 42,
            signature: 'sig_ed25519:bb0124ac...',
            actionResult: {
              title: 'OpenClaw Mesh Health & Nonce Rotation Report',
              details: [
                '• Node Zurich-04: 14ms (Ingress Primary) - Nonce #0x7f8a91b2 (Rotated)',
                '• Node Mumbai-07: 9ms (Domestic Relay) - Nonce #0x3a1b90cd (Rotated)',
                '• Node Reykjavik-02: 28ms (Zero-Knowledge Egress) - Verified 0 Logs',
                '• Hop Latency Average: 17.2ms | Packet Loss: 0.00%'
              ],
              codeBlock: 'ALL PACKET NONCES ROTATED. ChaCha20-Poly1305 state re-keyed.',
            },
          },
        };
      } else if (commandKey === 'crash-logs' || userText.toLowerCase().includes('crash') || userText.toLowerCase().includes('dump') || userText.toLowerCase().includes('log')) {
        auraResponse = {
          id: `aura-${Date.now()}`,
          sender: 'aura',
          content:
            'Inspected Zero-Knowledge Crash Reporting Room stack dumps. All identifiers, IP addresses, and memory addresses have been cryptographically sanitized:',
          timestamp: new Date().toTimeString().split(' ')[0],
          status: 'verified',
          commandType: 'crash-logs',
          meta: {
            nodeId: 'ZURICH-04-CONFIDENTIAL',
            executionTimeMs: 95,
            signature: 'sig_ed25519:ee9043ba...',
            actionResult: {
              title: 'Sanitized Enclave Crash Diagnostics Room',
              details: [
                '• Total Reports: 0 Fatal Kernel Panics, 1 Minor UI Frame Drop (Resolved)',
                '• Sanitization Filter: 100% EXIF, IP, Handle, and Seed strings stripped',
                '• Enclave Attestation: Stack dump confirmed authentic by SE050 chip',
                '• Action: Log bundle committed to private zero-knowledge crash pool'
              ],
              codeBlock: 'CRASH_ROOM_ID: #ZK-CRASH-0491 | ZERO LEAKS FOUND',
            },
          },
        };
      } else {
        auraResponse = {
          id: `aura-${Date.now()}`,
          sender: 'aura',
          content: `Processed query securely inside Zurich Enclave: "${userText}". All computation executed within an isolated enclave chamber. Your data never leaves your cryptographic boundary without your explicit biometric signature.`,
          timestamp: new Date().toTimeString().split(' ')[0],
          status: 'verified',
          meta: {
            nodeId: 'ZURICH-04-CONFIDENTIAL',
            executionTimeMs: 65,
            signature: 'sig_ed25519:11ef882a...',
            actionResult: {
              title: 'Confidential Computing Result',
              details: [
                '• Model Execution: Aura Zero-Knowledge Transformer v4.1',
                '• Hardware Token Attestation: Validated',
                '• Memory State: Zeroized post-computation'
              ]
            }
          }
        };
      }

      setMessages((prev) => [...prev, auraResponse]);
      setIsProcessing(false);
    }, 600);
  };

  const getCommandText = (cmd: string) => {
    switch (cmd) {
      case 'summarize':
        return 'Compile a summary of my latest encrypted notes into a document.';
      case 'draft-mail':
        return 'Draft an encrypted dispatch via uMail and verify recipient @amber.id key.';
      case 'check-mesh':
        return 'Inspect OpenClaw mesh latency and rotate ephemeral packet nonces.';
      case 'crash-logs':
        return 'Sanitize and inspect Zero-Knowledge Crash Reporting Room stack dumps.';
      default:
        return 'Execute enclave system status check';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isProcessing) return;
    executeCommand('custom', inputPrompt.trim());
  };

  return (
    <div
      id="aura-ai"
      className={`rounded-[22px] bg-[#121214] border border-[#232836] overflow-hidden flex flex-col ${
        embeddedMode ? 'h-full min-h-[520px]' : 'my-8 shadow-2xl'
      }`}
    >
      {/* Assistant Header & Hardware Status */}
      <div className="bg-[#181A22] border-b border-[#232836] p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7E78D2]/20 border border-[#7E78D2]/40 flex items-center justify-center text-[#7E78D2]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                Aura AI Command Hub
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0E0E10] border border-[#7E78D2]/30 text-[#7E78D2]">
                ENCLAVE RUNTIME
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#52B788] flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse" />
              <span>AURA AI • MESH CONNECTED • NODE ZURICH-04</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
          <span className="hidden sm:inline bg-[#0E0E10] px-2.5 py-1 rounded-full border border-[#232836]">
            Ed25519 Verified
          </span>
          <span className="text-[#DDA15E]">Target: *.usafe.{currentRegion}</span>
        </div>
      </div>

      {/* Quick Command Action Chips (Prompt Section 4.B) */}
      <div className="bg-[#0E0E10] px-4 py-2.5 border-b border-[#232836] overflow-x-auto flex items-center gap-2 text-xs font-mono">
        <span className="text-[#71717A] text-[11px] whitespace-nowrap">One-Tap Commands:</span>
        <button
          onClick={() => executeCommand('summarize')}
          disabled={isProcessing}
          className="px-2.5 py-1 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#232836] text-[#7E78D2] hover:text-[#F4F4F5] transition-colors whitespace-nowrap flex items-center gap-1"
        >
          <FileText className="w-3 h-3 text-[#7E78D2]" />
          <span>/summarize</span>
        </button>
        <button
          onClick={() => executeCommand('draft-mail')}
          disabled={isProcessing}
          className="px-2.5 py-1 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#232836] text-[#DDA15E] hover:text-[#F4F4F5] transition-colors whitespace-nowrap flex items-center gap-1"
        >
          <Mail className="w-3 h-3 text-[#DDA15E]" />
          <span>/draft-mail</span>
        </button>
        <button
          onClick={() => executeCommand('check-mesh')}
          disabled={isProcessing}
          className="px-2.5 py-1 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#232836] text-[#52B788] hover:text-[#F4F4F5] transition-colors whitespace-nowrap flex items-center gap-1"
        >
          <Activity className="w-3 h-3 text-[#52B788]" />
          <span>/check-mesh</span>
        </button>
        <button
          onClick={() => executeCommand('crash-logs')}
          disabled={isProcessing}
          className="px-2.5 py-1 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#232836] text-[#E07A5F] hover:text-[#F4F4F5] transition-colors whitespace-nowrap flex items-center gap-1"
        >
          <AlertOctagon className="w-3 h-3 text-[#E07A5F]" />
          <span>/crash-logs</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[420px] bg-[#0E0E10]/60">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1 text-[11px] font-mono text-[#71717A]">
                <span>{isUser ? 'You (@amber.id)' : 'Aura Enclave AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {!isUser && msg.status === 'verified' && (
                  <span className="text-[#52B788] flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Signed
                  </span>
                )}
              </div>

              <div
                className={`max-w-[92%] sm:max-w-[82%] rounded-[18px] p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#181A22] text-[#F4F4F5] border border-[#DDA15E]/40 font-sans'
                    : 'bg-[#121214] text-[#E4E4E7] border border-[#232836] font-sans'
                }`}
              >
                <p>{msg.content}</p>

                {/* Rich Action Results Rendered Cleanly */}
                {msg.meta?.actionResult && (
                  <div className="mt-3 pt-3 border-t border-[#232836] font-mono text-xs space-y-2">
                    <div className="font-bold text-[#DDA15E]">
                      {msg.meta.actionResult.title}
                    </div>

                    <div className="space-y-1 text-[#A1A1AA] text-[11px]">
                      {msg.meta.actionResult.details.map((detail, idx) => (
                        <div key={idx}>{detail}</div>
                      ))}
                    </div>

                    {msg.meta.actionResult.codeBlock && (
                      <div className="p-2 rounded-lg bg-[#0E0E10] border border-[#232836] text-[10px] text-[#52B788] overflow-x-auto">
                        {msg.meta.actionResult.codeBlock}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enclave metadata tag */}
              {!isUser && msg.meta && (
                <div className="mt-1 px-1 text-[10px] font-mono text-[#71717A] flex items-center gap-2">
                  <span>Enclave: {msg.meta.nodeId}</span>
                  <span>|</span>
                  <span>{msg.meta.executionTimeMs}ms</span>
                </div>
              )}
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-start gap-2 text-xs font-mono text-[#7E78D2] bg-[#121214] p-3 rounded-[16px] border border-[#232836] max-w-sm">
            <RefreshCw className="w-3.5 h-3.5 animate-spin mt-0.5" />
            <div>
              <div>Delegating compute to Zurich Hardware Enclave...</div>
              <div className="text-[10px] text-[#71717A] mt-0.5">Encrypting with session Kyber-1024 secret</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Form */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 bg-[#181A22] border-t border-[#232836] flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask Aura or type /summarize, /draft-mail, /check-mesh, /crash-logs..."
            className="w-full bg-[#0E0E10] border border-[#232836] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#F4F4F5] placeholder-[#71717A] focus:outline-none focus:border-[#7E78D2] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={!inputPrompt.trim() || isProcessing}
          className="p-2.5 rounded-full bg-[#7E78D2] hover:bg-[#6862C4] disabled:opacity-40 text-[#0E0E10] transition-colors flex items-center justify-center font-bold"
          aria-label="Send prompt to Aura AI"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
