import React, { useState } from 'react';
import {
  X,
  Compass,
  MessageSquareLock,
  ShieldCheck,
  Briefcase,
  FileText,
  Camera,
  Image,
  FolderLock,
  Sparkles,
  ExternalLink,
  Shield,
  Send,
  Lock,
  FileSpreadsheet,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  Paperclip
} from 'lucide-react';
import { EcosystemApp } from '../types';
import { Region, getSubdomainUrl } from '../lib/domains';

interface AppModalPreviewProps {
  app: EcosystemApp | null;
  onClose: () => void;
  currentRegion: Region;
}

export const AppModalPreview: React.FC<AppModalPreviewProps> = ({
  app,
  onClose,
  currentRegion,
}) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'peer', text: 'Verified sovereign handshake via Kyber-1024. Are the node keys deployed?', time: '18:24' },
    { sender: 'me', text: 'Yes, all 6 global OpenClaw nodes are attested with 0.00ms leakage.', time: '18:25' },
  ]);

  const [notes, setNotes] = useState([
    { id: '1', title: 'Amber OS Architecture Notes', content: '# Kernel Isolation\nAndroid 17 LSM layers + NXP SE050 hardware keystore.' },
    { id: '2', title: 'OpenClaw Mesh Nonce Schedule', content: 'Rotations occur every 10 seconds per circuit.' }
  ]);
  const [activeNote, setActiveNote] = useState(notes[0]);

  if (!app) return null;

  const subdomainUrl = getSubdomainUrl(app.subdomainKey, currentRegion);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'me', text: chatInput, time: new Date().toTimeString().split(' ')[0].slice(0, 5) }
    ]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0E0E10]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#121214] border border-[#232836] rounded-[24px] shadow-2xl flex flex-col h-[88vh] overflow-hidden">
        {/* Top Browser / Window Frame */}
        <div className="p-3.5 bg-[#181A22] border-b border-[#232836] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <div className="w-3 h-3 rounded-full bg-[#E07A5F]" />
              <div className="w-3 h-3 rounded-full bg-[#DDA15E]" />
              <div className="w-3 h-3 rounded-full bg-[#52B788]" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E4E4E7] bg-[#0E0E10] px-3 py-1 rounded-full border border-[#232836] max-w-md truncate">
              <Lock className="w-3 h-3 text-[#52B788]" />
              <span className="text-[#52B788] font-semibold">{app.subdomainKey}.usafe.{currentRegion}</span>
              <span className="text-[#71717A] text-[10px]">[Zero-Knowledge Sandboxed]</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://${app.subdomainKey}.usafe.${currentRegion}`}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#DDA15E] hover:bg-[#232836] transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#232836] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sandboxed Interactive App Content */}
        <div className="flex-1 bg-[#0E0E10] overflow-y-auto p-4 sm:p-6 text-[#E4E4E7]">
          {/* 1. Kite Browser Preview */}
          {app.id === 'kite' && (
            <div className="h-full flex flex-col space-y-4">
              <div className="p-4 rounded-xl bg-[#121214] border border-[#232836] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Compass className="w-6 h-6 text-[#DDA15E]" />
                  <div>
                    <div className="font-bold text-sm">Kite Sovereign Web Sandbox</div>
                    <div className="text-xs text-[#71717A] font-mono">0 Trackers • 0 Third-Party Cookies • Canvas Scrambled</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#52B788]/20 text-[#52B788] text-xs font-mono">
                  DNS over OpenClaw Active
                </span>
              </div>

              <div className="flex-1 rounded-xl bg-[#181A22] border border-[#232836] p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold font-['Plus_Jakarta_Sans']">Ephemeral Tab Session Active</h4>
                <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg">
                  Every tab in Kite runs in a memory-isolated container. When closed, all DOM states, caches, and storage entries are mathematically shredded.
                </p>
                <div className="flex gap-2 text-xs font-mono text-[#52B788]">
                  <span className="bg-[#0E0E10] px-3 py-1.5 rounded-lg border border-[#232836]">Fingerprint: Scrambled</span>
                  <span className="bg-[#0E0E10] px-3 py-1.5 rounded-lg border border-[#232836]">Telemetry: 0 KB</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. uChat Preview */}
          {app.id === 'uchat' && (
            <div className="h-full flex flex-col bg-[#121214] rounded-xl border border-[#232836] overflow-hidden">
              <div className="p-3 bg-[#181A22] border-b border-[#232836] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#52B788]/20 flex items-center justify-center text-[#52B788]">
                    <MessageSquareLock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#F4F4F5]">Security Research Channel</div>
                    <div className="text-[10px] font-mono text-[#52B788]">Double-Ratchet + Kyber-1024 [E2EE]</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#A1A1AA] bg-[#0E0E10] px-2 py-0.5 rounded">
                  Self-Destruct: 24h
                </span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs max-w-md ${
                        msg.sender === 'me'
                          ? 'bg-[#52B788] text-[#0E0E10] font-medium'
                          : 'bg-[#181A22] text-[#E4E4E7] border border-[#232836]'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-mono text-[#71717A] mt-1">{msg.time} • Enclave-Signed</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-3 bg-[#181A22] border-t border-[#232836] flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send sovereign E2EE message..."
                  className="flex-1 bg-[#0E0E10] border border-[#232836] rounded-full px-4 py-2 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#52B788]"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-[#52B788] text-[#0E0E10] font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* 3. uPay Preview */}
          {app.id === 'upay' && (
            <div className="max-w-xl mx-auto space-y-6 pt-4">
              <div className="rounded-[22px] bg-gradient-to-br from-[#181A22] to-[#121214] border border-[#BC6C25]/50 p-6 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] font-mono text-[#BC6C25] uppercase tracking-widest">SOVEREIGN NFC CARD</div>
                    <div className="text-xl font-bold text-[#F4F4F5] mt-1 font-['Plus_Jakarta_Sans']">uPay Cryptogram</div>
                  </div>
                  <ShieldCheck className="w-7 h-7 text-[#BC6C25]" />
                </div>

                <div className="my-8 font-mono text-base tracking-widest text-[#E4E4E7]">
                  •••• •••• •••• 8842
                </div>

                <div className="flex justify-between items-end text-xs font-mono">
                  <div>
                    <div className="text-[9px] text-[#71717A]">TOKENIZED ID</div>
                    <div className="text-[#DDA15E]">alex.vance@amber.id</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-[#71717A]">ENCLAVE ROOT</div>
                    <div className="text-[#52B788]">SE050 PASSIVE</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#121214] border border-[#232836] rounded-xl">
                  <div className="text-[#71717A] text-[10px]">CURRENT NONCE</div>
                  <div className="text-[#DDA15E] font-bold">#0x7f9a2b8e310d</div>
                </div>
                <div className="p-3 bg-[#121214] border border-[#232836] rounded-xl">
                  <div className="text-[#71717A] text-[10px]">TELEMETRY LEAKAGE</div>
                  <div className="text-[#52B788] font-bold">0.00% Zero-Tracking</div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Workspace Preview */}
          {app.id === 'office' && (
            <div className="h-full flex flex-col space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#181A22] border border-[#4A6FA5]/40 text-center">
                  <FileText className="w-5 h-5 text-[#4A6FA5] mx-auto mb-1" />
                  <div className="text-xs font-bold">uDocs</div>
                </div>
                <div className="p-3 rounded-xl bg-[#121214] border border-[#232836] text-center">
                  <FileSpreadsheet className="w-5 h-5 text-[#52B788] mx-auto mb-1" />
                  <div className="text-xs font-bold">uSheets</div>
                </div>
                <div className="p-3 rounded-xl bg-[#121214] border border-[#232836] text-center">
                  <Briefcase className="w-5 h-5 text-[#DDA15E] mx-auto mb-1" />
                  <div className="text-xs font-bold">uSlides</div>
                </div>
                <div className="p-3 rounded-xl bg-[#121214] border border-[#232836] text-center">
                  <Lock className="w-5 h-5 text-[#7E78D2] mx-auto mb-1" />
                  <div className="text-xs font-bold">uMail</div>
                </div>
              </div>

              <div className="flex-1 rounded-xl bg-[#121214] border border-[#232836] p-6 font-mono text-xs space-y-3">
                <div className="text-[#DDA15E] font-bold">[uDOCS CLIENT-SIDE ENCRYPTED EDITOR]</div>
                <div className="text-[#A1A1AA] leading-relaxed">
                  # Sovereign Infrastructure Briefing Q3<br />
                  Every document is chunked into 256-bit blocks and encrypted using ChaCha20-Poly1305 before CRDT synchronization.<br />
                  Central servers only observe encrypted byte envelopes.
                </div>
              </div>
            </div>
          )}

          {/* 5. Notes Preview */}
          {app.id === 'notes' && (
            <div className="h-full flex gap-4">
              <div className="w-1/3 bg-[#121214] border border-[#232836] rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[#232836] text-xs font-bold">
                  <span>Encrypted Notes</span>
                  <Plus className="w-4 h-4 text-[#7E78D2] cursor-pointer" />
                </div>
                {notes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setActiveNote(n)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors ${
                      activeNote.id === n.id ? 'bg-[#181A22] text-[#7E78D2] font-semibold' : 'text-[#A1A1AA] hover:bg-[#181A22]'
                    }`}
                  >
                    {n.title}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-[#121214] border border-[#232836] rounded-xl p-4 font-mono text-xs space-y-3">
                <div className="text-[#7E78D2] font-bold">{activeNote.title}</div>
                <textarea
                  value={activeNote.content}
                  onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
                  className="w-full h-48 bg-transparent text-[#E4E4E7] focus:outline-none resize-none"
                />
                <div className="text-[10px] text-[#52B788] pt-2 border-t border-[#232836]">
                  IndexedDB local-first storage active.
                </div>
              </div>
            </div>
          )}

          {/* 6. Default Fallback Preview (Camera, Files, Gallery, Launcher) */}
          {!['kite', 'uchat', 'upay', 'office', 'notes'].includes(app.id) && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
              <div
                className="w-16 h-16 rounded-2xl bg-[#181A22] border border-[#232836] flex items-center justify-center"
                style={{ color: app.accentColor }}
              >
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans']">{app.name}</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">{app.description}</p>
              <div className="p-3 rounded-xl bg-[#121214] border border-[#232836] text-xs font-mono text-[#52B788]">
                ✓ Enclave Subsystem Initialized • 0 Telemetry Emitted
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
