import React, { useState } from 'react';
import {
  ShieldAlert,
  Smartphone,
  Cpu,
  Radio,
  EyeOff,
  Flame,
  CheckCircle2,
  Lock,
  KeyRound,
  Shield,
  Zap,
  Activity,
  AlertTriangle
} from 'lucide-react';

export const AmberShowcase: React.FC = () => {
  const [duressMode, setDuressMode] = useState<'normal' | 'decoy' | 'wipe'>('normal');
  const [basebandCloak, setBasebandCloak] = useState(true);
  const [gpsVirtualizer, setGpsVirtualizer] = useState(true);
  const [showWipeAlert, setShowWipeAlert] = useState(false);

  const handleDuressTrigger = (mode: 'decoy' | 'wipe') => {
    if (mode === 'wipe') {
      setShowWipeAlert(true);
      setTimeout(() => {
        setDuressMode('wipe');
        setShowWipeAlert(false);
      }, 1500);
    } else {
      setDuressMode('decoy');
    }
  };

  const resetDuress = () => {
    setDuressMode('normal');
    setShowWipeAlert(false);
  };

  return (
    <section id="amber-os" className="py-20 bg-[#121214] border-y border-[#232836]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A22] border border-[#232836] text-xs font-mono text-[#DDA15E]">
            <Smartphone className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>SOVEREIGN MOBILE SHELL & KERNEL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
            Amber OS: Hardware Enclave Security
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Built on a privacy-hardened Android 17 microkernel with physical Secure Element integration.
            Complete immunity against carrier interception, silent SMS exploits, and hostile physical inspection.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1: Root of Trust */}
          <div className="rounded-[22px] bg-[#181A22] border border-[#232836] p-6 hover:border-[#DDA15E]/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                Hardware Enclave Root of Trust
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Cryptographic Ed25519 and FIDO2 seed keys reside exclusively in physical Secure Elements (NXP SE050 / Titan-M).
                Private keys are mathematically immune to kernel exploits and cold-boot attacks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#232836] font-mono text-xs text-[#52B788] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-Leak Hardware Keystore</span>
            </div>
          </div>

          {/* Pillar 2: Baseband & GPS Cloaking */}
          <div className="rounded-[22px] bg-[#181A22] border border-[#232836] p-6 hover:border-[#52B788]/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#52B788]">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                Baseband & GPS Cloaking
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Hardware-isolated modem sandbox that intercepts and drops Type-0 silent SMS pings, IMSI catchers (Stingrays),
                and injects jittered coarse coordinates into non-essential apps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#232836] font-mono text-xs text-[#52B788] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Type-0 Silent SMS Neutralized</span>
            </div>
          </div>

          {/* Pillar 3: Dual-Mode Duress */}
          <div className="rounded-[22px] bg-[#181A22] border border-[#232836] p-6 hover:border-[#E07A5F]/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#E07A5F]">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                Dual-Mode Duress Defense
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Enter your secondary Decoy PIN to open a sanitized stock operating system with innocuous dummy history,
                or enter your Duress Zeroing PIN to immediately zeroize all master cryptographic key blocks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#232836] font-mono text-xs text-[#E07A5F] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Key Zeroization</span>
            </div>
          </div>
        </div>

        {/* Interactive Duress & Enclave Simulator Widget */}
        <div className="rounded-[22px] bg-[#0E0E10] border border-[#232836] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#232836]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DDA15E]" />
                <h4 className="text-lg font-bold text-[#F4F4F5] font-mono">
                  AMBER OS SECURITY HARNESS INTERACTIVE BENCH
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                Simulate how Amber OS handles hostile radio inspection, silent cellular pings, and duress unlock triggers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {duressMode !== 'normal' && (
                <button
                  onClick={resetDuress}
                  className="px-3 py-1.5 rounded-full bg-[#181A22] border border-[#232836] text-xs font-mono text-[#DDA15E] hover:bg-[#232836]"
                >
                  Reset to Normal State
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Control Panel */}
            <div className="lg:col-span-6 space-y-5">
              {/* Duress Trigger Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2.5">
                  Test Duress Response Matrix:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDuressTrigger('decoy')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      duressMode === 'decoy'
                        ? 'bg-[#181A22] border-[#DDA15E] text-[#DDA15E]'
                        : 'bg-[#121214] border-[#232836] text-[#E4E4E7] hover:border-[#DDA15E]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs font-bold mb-1">
                      <EyeOff className="w-4 h-4 text-[#DDA15E]" />
                      Decoy PIN [9021]
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      Boots clean decoy profile with simulated benign user activity.
                    </div>
                  </button>

                  <button
                    onClick={() => handleDuressTrigger('wipe')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      duressMode === 'wipe'
                        ? 'bg-[#181A22] border-[#E07A5F] text-[#E07A5F]'
                        : 'bg-[#121214] border-[#232836] text-[#E4E4E7] hover:border-[#E07A5F]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-xs font-bold mb-1">
                      <Flame className="w-4 h-4 text-[#E07A5F]" />
                      Zeroing PIN [0000]
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      Irreversibly clears RAM keystore and Secure Element root partitions.
                    </div>
                  </button>
                </div>
              </div>

              {/* Hardware Radio Toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121214] border border-[#232836]">
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-[#52B788]" />
                    <div>
                      <div className="text-xs font-semibold text-[#E4E4E7]">Baseband Firewall & Silent SMS Blocker</div>
                      <div className="text-[11px] text-[#71717A]">Drops covert Type-0 network positioning packets</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setBasebandCloak(!basebandCloak)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      basebandCloak ? 'bg-[#52B788]' : 'bg-[#232836]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        basebandCloak ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#121214] border border-[#232836]">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#4A6FA5]" />
                    <div>
                      <div className="text-xs font-semibold text-[#E4E4E7]">Coarse GPS Virtualizer</div>
                      <div className="text-[11px] text-[#71717A]">Injects randomized geographic uncertainty into telemetry-hungry apps</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setGpsVirtualizer(!gpsVirtualizer)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      gpsVirtualizer ? 'bg-[#4A6FA5]' : 'bg-[#232836]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        gpsVirtualizer ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Live State Visualizer */}
            <div className="lg:col-span-6 bg-[#121214] border border-[#232836] rounded-xl p-4 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#232836]">
                <span className="text-[#A1A1AA]">[AMBER KERNEL STATE INSPECTOR]</span>
                <span className="text-xs font-bold">
                  {duressMode === 'normal' && <span className="text-[#52B788]">SECURE_ACTIVE</span>}
                  {duressMode === 'decoy' && <span className="text-[#DDA15E]">DECOY_SANDBOX_ENGAGED</span>}
                  {duressMode === 'wipe' && <span className="text-[#E07A5F]">KEYS_ZEROIZED_DORMANT</span>}
                </span>
              </div>

              {showWipeAlert ? (
                <div className="p-4 rounded-lg bg-[#E07A5F]/20 border border-[#E07A5F] text-[#E07A5F] animate-pulse space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> ZEROIZATION IN PROGRESS...
                  </div>
                  <div className="text-[11px]">Writing random entropy into SE050 memory blocks...</div>
                </div>
              ) : (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Master Encryption Key:</span>
                    <span className={duressMode === 'wipe' ? 'text-[#E07A5F]' : 'text-[#52B788]'}>
                      {duressMode === 'wipe' ? '[CLEARED: 0x000000000000]' : '0x7f8a...3b21 (Sealed in Enclave)'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Active Profile Vault:</span>
                    <span className="text-[#E4E4E7]">
                      {duressMode === 'normal' && 'Primary Sovereign Vault (/dev/enc_vault0)'}
                      {duressMode === 'decoy' && 'Decoy Vanilla Profile (/dev/decoy_dummy1)'}
                      {duressMode === 'wipe' && 'Unallocated Null Sector (Destroyed)'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#71717A]">Modem Interceptor:</span>
                    <span className={basebandCloak ? 'text-[#52B788]' : 'text-[#E07A5F]'}>
                      {basebandCloak ? 'FILTERING_ACTIVE (Type-0 Dropped)' : 'BYPASS_WARNING'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#71717A]">GPS Virtualizer:</span>
                    <span className={gpsVirtualizer ? 'text-[#4A6FA5]' : 'text-[#71717A]'}>
                      {gpsVirtualizer ? 'JITTER_INJECTED (±4.2km Gaussian)' : 'RAW_HARDWARE_PASSTHROUGH'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#232836] text-[#A1A1AA] leading-relaxed">
                    {duressMode === 'normal' &&
                      '• System functioning in standard zero-knowledge enclave isolation. All communications route through OpenClaw.'}
                    {duressMode === 'decoy' &&
                      '• Decoy profile active: Private notes, cryptographic credentials, and sovereign communications are completely hidden.'}
                    {duressMode === 'wipe' &&
                      '• Cryptographic zeroing complete: No forensic analysis or hardware probe can recover zeroed keys without the original seed recovery shard.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
