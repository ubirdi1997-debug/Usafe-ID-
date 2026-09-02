import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Cpu,
  Fingerprint,
  Radio,
  ArrowRight,
  CheckCircle2,
  Terminal as TerminalIcon,
  RefreshCw,
  Sparkles,
  Layers,
  Key
} from 'lucide-react';
import { Region } from '../lib/domains';

interface HeroProps {
  currentRegion: Region;
  onOpenCreateId: () => void;
  onExploreEcosystem: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentRegion,
  onOpenCreateId,
  onExploreEcosystem,
}) => {
  const [activeTab, setActiveTab] = useState<'attestation' | 'passkey' | 'mesh'>('attestation');
  const [nonce, setNonce] = useState('0x7f9a2b8e310d');
  const [bootAttested, setBootAttested] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  const rotateHandshake = () => {
    setIsRotating(true);
    setTimeout(() => {
      const randomHex = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setNonce(`0x${randomHex}`);
      setIsRotating(false);
    }, 450);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const randomHex = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setNonce(`0x${randomHex}`);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle Matte Background Structural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#232836_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181A22] border border-[#232836] text-[11px] font-mono tracking-wide text-[#52B788]">
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-ping" />
              <span>HARDWARE-ISOLATED ZERO-KNOWLEDGE INFRASTRUCTURE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F4F5] font-['Plus_Jakarta_Sans'] leading-[1.12]">
              Absolute Privacy.{' '}
              <span className="text-[#DDA15E]">Hardware Enclave</span> Security.{' '}
              <span className="text-[#52B788]">Zero-Knowledge</span> Mesh.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-2xl">
              Experience sovereign computing from privacy-hardened Android 17 Amber OS to
              decentralized peer-to-peer mesh networking. Zero telemetry, zero corporate surveillance,
              and 100% cryptographic user ownership.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenCreateId}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#DDA15E] hover:bg-[#BC6C25] text-[#0E0E10] font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#DDA15E]/10"
              >
                <span>Create Sovereign uID (@amber.id)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreEcosystem}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#181A22] hover:bg-[#232836] text-[#E4E4E7] border border-[#232836] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#DDA15E]" />
                <span>Explore Ecosystem</span>
              </button>
            </div>

            {/* Key Micro Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#232836] w-full max-w-xl text-left">
              <div>
                <div className="text-sm font-semibold text-[#F4F4F5]">Ed25519 Root</div>
                <div className="text-xs text-[#71717A] mt-0.5">Non-exportable keys</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#F4F4F5]">0.00 KB Leaks</div>
                <div className="text-xs text-[#71717A] mt-0.5">Zero central telemetry</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#F4F4F5]">CRDT Offline</div>
                <div className="text-xs text-[#71717A] mt-0.5">P2P mesh sync</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Enclave Attestation Terminal */}
          <div className="lg:col-span-5">
            <div className="rounded-[22px] bg-[#121214] border border-[#232836] p-4 sm:p-5 shadow-2xl relative">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#232836]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DDA15E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#52B788]" />
                  <span className="ml-2 font-mono text-xs text-[#A1A1AA] flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#DDA15E]" />
                    attestation_daemon_v4.2
                  </span>
                </div>
                <button
                  onClick={rotateHandshake}
                  className="p-1 rounded-lg text-[#71717A] hover:text-[#DDA15E] hover:bg-[#181A22] transition-colors"
                  title="Rotate Attestation Nonce"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Selector Tabs */}
              <div className="flex items-center gap-1.5 bg-[#181A22] p-1 rounded-xl mb-3 border border-[#232836]">
                <button
                  onClick={() => setActiveTab('attestation')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'attestation'
                      ? 'bg-[#121214] text-[#DDA15E] border border-[#232836] font-medium'
                      : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
                  }`}
                >
                  1. Enclave Boot
                </button>
                <button
                  onClick={() => setActiveTab('passkey')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'passkey'
                      ? 'bg-[#121214] text-[#52B788] border border-[#232836] font-medium'
                      : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
                  }`}
                >
                  2. FIDO2 Key
                </button>
                <button
                  onClick={() => setActiveTab('mesh')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'mesh'
                      ? 'bg-[#121214] text-[#4A6FA5] border border-[#232836] font-medium'
                      : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
                  }`}
                >
                  3. OpenClaw
                </button>
              </div>

              {/* Interactive Terminal Screen */}
              <div className="bg-[#0E0E10] border border-[#232836] rounded-xl p-3.5 font-mono text-xs text-[#A1A1AA] space-y-2.5 h-64 overflow-y-auto">
                {activeTab === 'attestation' && (
                  <>
                    <div className="flex items-center justify-between text-[#52B788] pb-1 border-b border-[#232836]/60">
                      <span>[ENCLAVE ROOT OF TRUST]</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-[#52B788]" /> VERIFIED
                      </span>
                    </div>
                    <div className="text-[#E4E4E7]">
                      $ amber-ctl verify-hardware --enclave=SE050
                    </div>
                    <div className="text-[#71717A] text-[11px] space-y-1">
                      <div>&gt; Bootloader Hash: sha256:d89f...b420 [SEALED]</div>
                      <div>&gt; Hardware Chipset: Secure Element NXP SE050 / TPM2.0</div>
                      <div>&gt; Kernel Isolation: Android 17 Hardened Shell (LSM Active)</div>
                      <div className="text-[#DDA15E]">&gt; Ephemeral Nonce: {nonce}</div>
                      <div>&gt; Memory Zeroization Policy: ARMED ON TAMPER</div>
                    </div>
                    <div className="p-2 rounded bg-[#181A22] border border-[#52B788]/30 text-[11px] text-[#52B788]">
                      PASS: Cryptographic proof confirmed by Zurich-04 enclave node. Zero OS kernel privilege escalation vectors detected.
                    </div>
                  </>
                )}

                {activeTab === 'passkey' && (
                  <>
                    <div className="flex items-center justify-between text-[#52B788] pb-1 border-b border-[#232836]/60">
                      <span>[WEBAUTHN / FIDO2 L3]</span>
                      <span className="text-[11px] text-[#DDA15E]">PASSWORDLESS</span>
                    </div>
                    <div className="text-[#E4E4E7]">
                      $ uauth-daemon challenge --user=sovereign@amber.id
                    </div>
                    <div className="text-[#71717A] text-[11px] space-y-1">
                      <div>&gt; Identity Handle: sovereign@amber.id</div>
                      <div>&gt; PublicKey Algorithm: Ed25519 / ES256-Strict</div>
                      <div>&gt; Biometric Assertion: Secure Element Match (0-Knowledge)</div>
                      <div className="text-[#52B788]">&gt; Attestation Cert: Self-Rooted Sovereign PKI</div>
                    </div>
                    <div className="p-2 rounded bg-[#181A22] border border-[#232836] text-[11px] text-[#E4E4E7]">
                      Biometric signature computed inside hardware enclave. Private key never touches RAM or network sockets.
                    </div>
                  </>
                )}

                {activeTab === 'mesh' && (
                  <>
                    <div className="flex items-center justify-between text-[#4A6FA5] pb-1 border-b border-[#232836]/60">
                      <span>[OPENCLAW P2P ROUTING]</span>
                      <span className="text-[11px] text-[#52B788]">3 HOPS ACTIVE</span>
                    </div>
                    <div className="text-[#E4E4E7]">
                      $ openclaw-router route --target=uchat.usafe.{currentRegion}
                    </div>
                    <div className="text-[#71717A] text-[11px] space-y-1">
                      <div>&gt; Ingress: Node Mumbai-07 (9ms)</div>
                      <div>&gt; Relay: Node Zurich-04 (ChaCha20 Layer 2)</div>
                      <div>&gt; Egress: Node Reykjavik-02 (Zero Log Verified)</div>
                      <div className="text-[#4A6FA5]">&gt; Active Packet Nonce: {nonce}</div>
                    </div>
                    <div className="p-2 rounded bg-[#181A22] border border-[#4A6FA5]/30 text-[11px] text-[#A1A1AA]">
                      Packets are multi-layered encrypted using Onion V4 routing. Zero IP address leaks to ISP or external snooping.
                    </div>
                  </>
                )}
              </div>

              {/* Status bar footer */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
                  SE050 Cryptoprocessor Active
                </span>
                <span className="text-[#DDA15E]">Region: .{currentRegion}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
