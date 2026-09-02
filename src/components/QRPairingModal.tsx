import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Smartphone,
  Laptop,
  Key,
  ShieldCheck,
  RefreshCw,
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Radio,
  Cpu,
  Trash2,
  Copy,
  Check,
  Camera,
  AlertCircle
} from 'lucide-react';
import { Region } from '../lib/domains';

interface QRPairingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: Region;
}

interface PairedDevice {
  id: string;
  name: string;
  type: 'handset' | 'desktop' | 'web' | 'hardware';
  enclaveType: string;
  fingerprint: string;
  lastActive: string;
  isCurrent?: boolean;
}

export const QRPairingModal: React.FC<QRPairingModalProps> = ({
  isOpen,
  onClose,
  currentRegion,
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'scan' | 'devices'>('qr');
  const [countdown, setCountdown] = useState(60);
  const [ephemeralNonce, setEphemeralNonce] = useState('0x9a8f2e1b4c3d');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isSimulatingPair, setIsSimulatingPair] = useState(false);
  const [pairStep, setPairStep] = useState<number>(0);
  const [pairedDevices, setPairedDevices] = useState<PairedDevice[]>([
    {
      id: 'dev-1',
      name: 'Amber Handset 17 Pro',
      type: 'handset',
      enclaveType: 'NXP SE050 Hardware Keystore',
      fingerprint: 'ed25519:7f8a...3b21',
      lastActive: 'Just now',
    },
    {
      id: 'dev-2',
      name: 'MacBook Pro Amber Launcher',
      type: 'desktop',
      enclaveType: 'Apple T2 / Secure Enclave',
      fingerprint: 'ed25519:9e4c...88d2',
      lastActive: '2 mins ago',
      isCurrent: true,
    },
    {
      id: 'dev-3',
      name: 'Amber Pico Security Dongle',
      type: 'hardware',
      enclaveType: 'FIDO2 Level 3 Cryptoprocessor',
      fingerprint: 'ed25519:1a2b...990f',
      lastActive: '1 hour ago',
    },
  ]);

  // Rotate QR code nonce on countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setEphemeralNonce('0x' + Math.random().toString(16).substring(2, 14));
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const pairingPayload = `usafe://pair?v=1&nonce=${ephemeralNonce}&enclave=SE050&region=${currentRegion}&pki=ed25519:7f8a9e4c3b21`;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(pairingPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleSimulateScanPairing = () => {
    setIsSimulatingPair(true);
    setPairStep(1);

    setTimeout(() => setPairStep(2), 1000);
    setTimeout(() => setPairStep(3), 2000);
    setTimeout(() => {
      setPairStep(4);
      const newDev: PairedDevice = {
        id: `dev-${Date.now()}`,
        name: 'Amber Phone Alpha (Paired via QR)',
        type: 'handset',
        enclaveType: 'NXP SE050 Enclave',
        fingerprint: 'ed25519:' + Math.random().toString(16).substring(2, 8) + '...77a1',
        lastActive: 'Just now',
      };
      setPairedDevices((prev) => [newDev, ...prev]);
      setTimeout(() => {
        setIsSimulatingPair(false);
        setPairStep(0);
        setActiveTab('devices');
      }, 1500);
    }, 3200);
  };

  const handleRevokeDevice = (id: string) => {
    setPairedDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0E10]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#121214] border border-[#232836] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 bg-[#181A22] border-b border-[#232836] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                  Zero-Knowledge QR Pairing
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DDA15E]/20 text-[#DDA15E] border border-[#DDA15E]/40 font-bold">
                  PRO SHIELD ($5)
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Cross-device hardware attestation & encrypted CRDT vault sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#232836] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex p-2 bg-[#0E0E10] border-b border-[#232836] text-xs font-mono">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'qr'
                ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Pair New Device (QR)</span>
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'scan'
                ? 'bg-[#181A22] text-[#52B788] border border-[#232836] font-semibold'
                : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Scan Handset QR</span>
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'devices'
                ? 'bg-[#181A22] text-[#7E78D2] border border-[#232836] font-semibold'
                : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Paired Nodes ({pairedDevices.length})</span>
          </button>
        </div>

        {/* Tab 1: Ephemeral QR Code Generator */}
        {activeTab === 'qr' && (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* QR Code Container */}
              <div className="relative p-4 bg-white rounded-2xl shadow-xl flex-shrink-0 flex flex-col items-center justify-center border-4 border-[#DDA15E]/30">
                {/* SVG Visual Stylized QR Code Matrix */}
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  className="w-44 h-44"
                >
                  <rect width="180" height="180" fill="#FFFFFF" rx="12" />
                  {/* Outer Alignment Squares */}
                  <rect x="14" y="14" width="40" height="40" rx="6" fill="#0E0E10" />
                  <rect x="22" y="22" width="24" height="24" rx="3" fill="#FFFFFF" />
                  <rect x="28" y="28" width="12" height="12" rx="2" fill="#DDA15E" />

                  <rect x="126" y="14" width="40" height="40" rx="6" fill="#0E0E10" />
                  <rect x="134" y="22" width="24" height="24" rx="3" fill="#FFFFFF" />
                  <rect x="140" y="28" width="12" height="12" rx="2" fill="#DDA15E" />

                  <rect x="14" y="126" width="40" height="40" rx="6" fill="#0E0E10" />
                  <rect x="22" y="134" width="24" height="24" rx="3" fill="#FFFFFF" />
                  <rect x="28" y="140" width="12" height="12" rx="2" fill="#DDA15E" />

                  {/* Pseudo Data Matrix Blocks */}
                  <g fill="#181A22">
                    <rect x="64" y="18" width="10" height="10" rx="2" />
                    <rect x="80" y="18" width="10" height="10" rx="2" />
                    <rect x="96" y="18" width="10" height="10" rx="2" />
                    <rect x="110" y="26" width="8" height="8" rx="2" />

                    <rect x="64" y="36" width="8" height="18" rx="2" />
                    <rect x="80" y="44" width="16" height="10" rx="2" />
                    <rect x="104" y="38" width="12" height="12" rx="2" />

                    <rect x="20" y="64" width="12" height="12" rx="2" />
                    <rect x="40" y="64" width="14" height="14" rx="2" />
                    <rect x="62" y="62" width="10" height="10" rx="2" />
                    <rect x="80" y="64" width="20" height="10" rx="2" />
                    <rect x="110" y="62" width="12" height="12" rx="2" />
                    <rect x="130" y="64" width="16" height="10" rx="2" />
                    <rect x="154" y="64" width="12" height="12" rx="2" />

                    <rect x="20" y="86" width="14" height="14" rx="2" />
                    <rect x="42" y="88" width="10" height="10" rx="2" />
                    <rect x="126" y="86" width="12" height="12" rx="2" />
                    <rect x="146" y="86" width="20" height="12" rx="2" />

                    <rect x="20" y="108" width="12" height="12" rx="2" />
                    <rect x="40" y="108" width="12" height="12" rx="2" />
                    <rect x="62" y="106" width="16" height="10" rx="2" />
                    <rect x="86" y="108" width="10" height="10" rx="2" />
                    <rect x="106" y="106" width="12" height="12" rx="2" />
                    <rect x="126" y="108" width="18" height="10" rx="2" />
                    <rect x="152" y="108" width="14" height="12" rx="2" />

                    <rect x="64" y="126" width="10" height="10" rx="2" />
                    <rect x="82" y="130" width="18" height="10" rx="2" />
                    <rect x="108" y="126" width="10" height="10" rx="2" />
                    <rect x="128" y="128" width="12" height="12" rx="2" />
                    <rect x="148" y="126" width="18" height="10" rx="2" />

                    <rect x="64" y="146" width="14" height="14" rx="2" />
                    <rect x="86" y="148" width="12" height="12" rx="2" />
                    <rect x="106" y="146" width="18" height="10" rx="2" />
                    <rect x="132" y="148" width="12" height="12" rx="2" />
                    <rect x="152" y="146" width="14" height="14" rx="2" />
                  </g>

                  {/* Center Shield Badge */}
                  <rect x="74" y="74" width="32" height="32" rx="8" fill="#0E0E10" stroke="#DDA15E" strokeWidth="2" />
                  <path
                    d="M90 82C94 82 98 84 98 88C98 94 90 98 90 98C90 98 82 94 82 88C82 84 86 82 90 82Z"
                    fill="#DDA15E"
                  />
                </svg>

                {/* Live Scanning Reticle Line */}
                <div className="absolute inset-x-6 top-8 h-0.5 bg-gradient-to-r from-transparent via-[#DDA15E] to-transparent animate-pulse" />
              </div>

              {/* Instructions and Nonce */}
              <div className="space-y-3 flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#DDA15E] font-bold">LIVE EPHEMERAL PAIRING KEY</span>
                  <span className="font-mono text-[11px] text-[#52B788] flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Rotates in {countdown}s</span>
                  </span>
                </div>

                <p className="text-[#A1A1AA] leading-relaxed">
                  Open the <strong>Amber OS Camera</strong> or <strong>Amber Desktop Launcher</strong>, select <em>Pair Vault</em>, and scan this QR code to establish zero-knowledge symmetric key exchange.
                </p>

                <div className="p-3 rounded-xl bg-[#0E0E10] border border-[#232836] space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Cryptographic Nonce:</span>
                    <span className="text-[#DDA15E]">{ephemeralNonce}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Protocol:</span>
                    <span className="text-[#52B788]">Kyber-1024 + Ed25519</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Enclave Attestation:</span>
                    <span className="text-[#E4E4E7]">NXP SE050 Root</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleCopyPayload}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#181A22] border border-[#232836] hover:border-[#DDA15E] text-[11px] font-mono text-[#E4E4E7] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedPayload ? <Check className="w-3.5 h-3.5 text-[#52B788]" /> : <Copy className="w-3.5 h-3.5 text-[#A1A1AA]" />}
                    <span>{copiedPayload ? 'Copied URI' : 'Copy Pairing URI'}</span>
                  </button>

                  <button
                    onClick={handleSimulateScanPairing}
                    disabled={isSimulatingPair}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#DDA15E] hover:bg-[#BC6C25] text-[#0E0E10] font-bold text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSimulatingPair ? 'Simulating...' : 'Simulate Scan'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Handshake Progress Indicator */}
            {isSimulatingPair && (
              <div className="p-4 rounded-xl bg-[#0E0E10] border border-[#DDA15E]/50 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#DDA15E] font-bold">HARDWARE ENCLAVE HANDSHAKE IN PROGRESS</span>
                  <span className="text-[#71717A]">Step {pairStep} / 4</span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-[#181A22] overflow-hidden">
                  <div
                    className="h-full bg-[#DDA15E] transition-all duration-300"
                    style={{ width: `${pairStep * 25}%` }}
                  />
                </div>

                <div className="text-[11px] font-mono text-[#A1A1AA] space-y-1">
                  {pairStep >= 1 && <div className="text-[#E4E4E7]">✓ Ephemeral Kyber-1024 pairing payload ingested</div>}
                  {pairStep >= 2 && <div className="text-[#E4E4E7]">✓ Remote SE050 hardware signature validated</div>}
                  {pairStep >= 3 && <div className="text-[#DDA15E]">⚡ Establishing ChaCha20-Poly1305 cross-device synchronization pipeline...</div>}
                  {pairStep >= 4 && <div className="text-[#52B788] font-bold">✓ Device Paired! 100GB Pro Shield storage synced across nodes.</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Camera Scanner Viewfinder */}
        {activeTab === 'scan' && (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="rounded-2xl bg-[#0E0E10] border border-[#232836] p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[260px] text-center">
              <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-[#52B788] relative flex items-center justify-center bg-[#181A22]/50">
                <Camera className="w-10 h-10 text-[#52B788] animate-pulse" />
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#52B788] shadow-lg shadow-[#52B788]" />
              </div>

              <div className="mt-4 space-y-1">
                <div className="font-bold text-sm text-[#F4F4F5]">Point Camera at Host QR Code</div>
                <p className="text-xs text-[#71717A] max-w-sm">
                  Align the zero-knowledge QR code displayed on your Amber OS device, Web dashboard, or Desktop Launcher.
                </p>
              </div>
            </div>

            <button
              onClick={handleSimulateScanPairing}
              disabled={isSimulatingPair}
              className="w-full py-3 rounded-full bg-[#52B788] hover:bg-[#52B788]/80 text-[#0E0E10] font-bold text-xs font-mono tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSimulatingPair ? 'Verifying Hardware Enclave...' : 'Test Scan & Authenticate Device'}</span>
            </button>
          </div>
        )}

        {/* Tab 3: Active Paired Devices */}
        {activeTab === 'devices' && (
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                SYNCHRONIZED CRYPTOGRAPHIC NODES ({pairedDevices.length})
              </span>
              <span className="text-[11px] font-mono text-[#52B788]">
                Pro Shield Storage Shared: 100 GB
              </span>
            </div>

            <div className="space-y-3">
              {pairedDevices.map((dev) => (
                <div
                  key={dev.id}
                  className="p-4 rounded-xl bg-[#181A22] border border-[#232836] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
                      {dev.type === 'handset' && <Smartphone className="w-5 h-5 text-[#52B788]" />}
                      {dev.type === 'desktop' && <Laptop className="w-5 h-5 text-[#DDA15E]" />}
                      {dev.type === 'hardware' && <Key className="w-5 h-5 text-[#7E78D2]" />}
                    </div>

                    <div>
                      <div className="font-bold text-sm text-[#F4F4F5] flex items-center gap-2">
                        <span>{dev.name}</span>
                        {dev.isCurrent && (
                          <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/40">
                            THIS DEVICE
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-[#71717A] mt-0.5">
                        {dev.enclaveType} • <span className="text-[#A1A1AA]">{dev.fingerprint}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#71717A] hidden sm:inline">
                      {dev.lastActive}
                    </span>
                    {!dev.isCurrent && (
                      <button
                        onClick={() => handleRevokeDevice(dev.id)}
                        className="p-2 rounded-lg text-[#71717A] hover:text-[#E07A5F] hover:bg-[#0E0E10] transition-colors"
                        title="Revoke device access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#0E0E10] border border-[#232836] flex items-center justify-between text-xs font-mono">
              <span className="text-[#71717A]">Want to pair an additional handset or desktop?</span>
              <button
                onClick={() => setActiveTab('qr')}
                className="text-[#DDA15E] hover:underline font-bold flex items-center gap-1"
              >
                <span>Generate New QR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer Note */}
        <div className="p-4 bg-[#181A22] border-t border-[#232836] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#52B788]" />
            <span>Zero-Knowledge: Private keys never leave hardware enclaves</span>
          </div>
          <span className="text-[#DDA15E]">uSafe Pro Pairing v2.4</span>
        </div>
      </div>
    </div>
  );
};
