import React, { useState } from 'react';
import {
  Smartphone,
  Cpu,
  Layers,
  Terminal,
  Download,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  HardDrive,
  RefreshCw,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Shield,
  Flame,
  Key,
  Globe
} from 'lucide-react';
import { Region, REGIONS } from '../lib/domains';

interface AmberInstallRoutesProps {
  currentRegion: Region;
  onRegionChange?: (region: Region) => void;
  onOpenPasskeyModal?: () => void;
  onOpenQRPairing?: () => void;
}

export const AmberInstallRoutes: React.FC<AmberInstallRoutesProps> = ({
  currentRegion,
  onRegionChange,
  onOpenPasskeyModal,
  onOpenQRPairing,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'dedicated' | 'dsu'>('dedicated');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const activeRegionConfig = REGIONS[currentRegion];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleDownloadFlashScript = () => {
    const scriptContent = `#!/usr/bin/env bash
# AmberOS 17 Dedicated Installer for itel A95 5G
set -euo pipefail
echo "[AMBER] Initializing Fastboot Handshake..."
fastboot wait-for-device
fastboot getvar product
fastboot erase userdata
fastboot erase metadata
fastboot flash boot_b images/boot.img
fastboot flash vendor_boot_b images/vendor_boot.img
fastboot flash dtbo_b images/dtbo.img
fastboot flash system_b images/system.img
fastboot flash product_b images/product.img
fastboot flash vbmeta_b images/vbmeta.img
fastboot set_active b
fastboot reboot
echo "[AMBER] Device Provisioned with AVB 2.0 StrongBox Hardware Enclave."
`;
    const blob = new Blob([scriptContent], { type: 'text/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flash_amber_dedicated.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#0E0E10] text-[#F4F4F9] py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header & Sovereign Domain Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#2A2E35]">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AMBEROS 17 RELEASE MATRIX • itel A95 5G & GSI UNIVERSAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4F9]">
            Choose Your Installation Pathway
          </h1>
          <p className="text-sm text-[#8D99AE] max-w-2xl font-mono">
            Zero-telemetry sovereign mobile architecture. Flash dedicated hardware firmware or sideload without touching your primary OS.
          </p>
        </div>

        {/* Action & Domain Matrix */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#181A1F] border border-[#2A2E35] text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-[#52B788]" />
            <span className="text-[#8D99AE]">JURISDICTION:</span>
            <button
              onClick={() => onRegionChange?.('in')}
              className={`px-2 py-0.5 rounded ${currentRegion === 'in' ? 'bg-[#DDA15E] text-[#0E0E10] font-bold' : 'text-[#8D99AE] hover:text-[#F4F4F9]'}`}
            >
              .IN (India)
            </button>
            <button
              onClick={() => onRegionChange?.('net')}
              className={`px-2 py-0.5 rounded ${currentRegion === 'net' ? 'bg-[#DDA15E] text-[#0E0E10] font-bold' : 'text-[#8D99AE] hover:text-[#F4F4F9]'}`}
            >
              .NET (Global)
            </button>
          </div>

          <button
            onClick={onOpenPasskeyModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#DDA15E] text-[#0E0E10] hover:bg-[#BC6C25] transition-all shadow-sm"
          >
            <Key className="w-3.5 h-3.5" />
            <span>uAuth FIDO2 Sign In</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison of the 2 Core Installation Methods */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#F4F4F9]">
            2 Production Deployment Pathways
          </h2>
          <p className="text-xs text-[#8D99AE] font-mono">
            Both pathways enforce AVB 2.0 dm-verity, StrongBox HSM attestation, and zero telemetry egress.
          </p>
        </div>

        {/* Route Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Route 1: Dedicated Native Flash Card */}
          <div
            onClick={() => setSelectedRoute('dedicated')}
            className={`cursor-pointer p-6 sm:p-8 rounded-3xl transition-all border relative overflow-hidden ${
              selectedRoute === 'dedicated'
                ? 'bg-[#181A22] border-[#DDA15E] shadow-xl ring-2 ring-[#DDA15E]/20'
                : 'bg-[#181A1F] border-[#2A2E35] hover:border-[#383E48]'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] flex items-center justify-center text-[#DDA15E]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DDA15E]">
                    ROUTE 01 • BARE-METAL FLASH
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F9]">
                    Dedicated Native Flash
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E]">
                RECOMMENDED
              </span>
            </div>

            <p className="text-xs text-[#8D99AE] font-mono leading-relaxed mb-6">
              Complete bare-metal OS installation tailored for <strong>itel A95 5G</strong> (MediaTek MT6833 / MT6835T Dimensity 6300/6080). Replaces stock ROM with permanent A/B background seamless updates.
            </p>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex items-center gap-2 text-[#52B788]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Full Hardware Enclave & StrongBox Keystore Binding</span>
              </div>
              <div className="flex items-center gap-2 text-[#52B788]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Dual-Slot A/B Seamless OTA (zero user data loss)</span>
              </div>
              <div className="flex items-center gap-2 text-[#52B788]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>90Hz/120Hz MTK Display HAL & 5G SA/NSA Carrier Lock</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A6FA5]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Automated script: <code className="text-[#F4F4F9]">flash_amber_dedicated.sh</code></span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRoute('dedicated')}
              className={`w-full py-3 rounded-2xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                selectedRoute === 'dedicated'
                  ? 'bg-[#DDA15E] text-[#0E0E10]'
                  : 'bg-[#0E0E10] text-[#DDA15E] border border-[#2A2E35]'
              }`}
            >
              <span>View Fastboot Flash Instructions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Route 2: DSU Sideloader Card */}
          <div
            onClick={() => setSelectedRoute('dsu')}
            className={`cursor-pointer p-6 sm:p-8 rounded-3xl transition-all border relative overflow-hidden ${
              selectedRoute === 'dsu'
                ? 'bg-[#181A22] border-[#52B788] shadow-xl ring-2 ring-[#52B788]/20'
                : 'bg-[#181A1F] border-[#2A2E35] hover:border-[#383E48]'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] flex items-center justify-center text-[#52B788]">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#52B788]">
                    ROUTE 02 • NON-DESTRUCTIVE
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F9]">
                    DSU Sideloader (Zero-PC)
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#52B788]/10 border border-[#52B788]/30 text-[#52B788]">
                1-CLICK GUEST OS
              </span>
            </div>

            <p className="text-xs text-[#8D99AE] font-mono leading-relaxed mb-6">
              Boot AmberOS 17 GSI directly from a guest partition using Android Dynamic System Updates (DSU) and Shizuku with zero PC required and zero risk of wiping your existing OS.
            </p>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex items-center gap-2 text-[#52B788]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% Non-Destructive: Original stock OS remains intact</span>
              </div>
              <div className="flex items-center gap-2 text-[#52B788]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero-PC Setup: Uses Wireless Debugging + Shizuku</span>
              </div>
              <div className="flex items-center gap-2 text-[#52B788]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Single Reboot Switching between Stock & AmberOS</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A6FA5]">
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Compatible with all ARM64 Project Treble devices</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRoute('dsu')}
              className={`w-full py-3 rounded-2xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                selectedRoute === 'dsu'
                  ? 'bg-[#52B788] text-[#0E0E10]'
                  : 'bg-[#0E0E10] text-[#52B788] border border-[#2A2E35]'
              }`}
            >
              <span>View DSU 1-Click Instructions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Guide Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#14161D] border border-[#2A2E35] space-y-6 shadow-md">
          {selectedRoute === 'dedicated' ? (
            /* Dedicated Fastboot Workflow */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2E35]">
                <div>
                  <h3 className="text-lg font-bold text-[#F4F4F9] flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#DDA15E]" />
                    <span>Dedicated Hardware Flashing Walkthrough (itel A95 5G)</span>
                  </h3>
                  <p className="text-xs text-[#8D99AE] font-mono mt-0.5">
                    Safe A/B staging pipeline flashing inactive slot with AVB 2.0 dm-verity integrity.
                  </p>
                </div>

                <button
                  onClick={handleDownloadFlashScript}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#DDA15E] text-[#0E0E10] hover:bg-[#BC6C25] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download flash_amber_dedicated.sh</span>
                </button>
              </div>

              {/* Step Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { num: 1, title: 'Unlock & Fastbootd', desc: 'Handshake & verify slot' },
                  { num: 2, title: 'Wipe Volatile', desc: 'Preserve NVRAM/cal' },
                  { num: 3, title: 'Flash Subsystems', desc: 'MTK HAL & AmberOS' },
                  { num: 4, title: 'AVB 2.0 Seal', desc: 'Seal root & reboot' },
                ].map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveStep(s.num)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeStep === s.num
                        ? 'bg-[#181A22] border-[#DDA15E] text-[#DDA15E]'
                        : 'bg-[#0E0E10] border-[#2A2E35] text-[#8D99AE] hover:text-[#F4F4F9]'
                    }`}
                  >
                    <div className="font-bold">STEP 0{s.num}: {s.title}</div>
                    <div className="text-[10px] text-[#8D99AE] mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>

              {/* Step Detail Code Box */}
              <div className="p-4 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-3 font-mono text-xs">
                {activeStep === 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#8D99AE]">
                      <span>1. Put itel A95 5G in Fastboot Mode (Hold Vol Down + Power) and execute:</span>
                      <button
                        onClick={() => handleCopy('fastboot reboot fastboot\nfastboot getvar current-slot', 's1')}
                        className="text-[#DDA15E] hover:underline flex items-center gap-1"
                      >
                        {copiedCmd === 's1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCmd === 's1' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-[#14161D] text-[#52B788] overflow-x-auto">
{`# Reboot to userspace fastbootd for dynamic partitions
fastboot reboot fastboot
fastboot wait-for-device
fastboot getvar current-slot`}
                    </pre>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#8D99AE]">
                      <span>2. Clean volatile storage while protecting baseband calibration:</span>
                      <button
                        onClick={() => handleCopy('fastboot erase userdata\nfastboot erase metadata', 's2')}
                        className="text-[#DDA15E] hover:underline flex items-center gap-1"
                      >
                        {copiedCmd === 's2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCmd === 's2' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-[#14161D] text-[#52B788] overflow-x-auto">
{`fastboot erase userdata
fastboot erase metadata`}
                    </pre>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#8D99AE]">
                      <span>3. Flash kernel, Dimensity HAL initramfs, and AmberOS system partitions:</span>
                      <button
                        onClick={() => handleCopy('fastboot flash boot_b boot.img\nfastboot flash vendor_boot_b vendor_boot.img\nfastboot flash system_b system.img', 's3')}
                        className="text-[#DDA15E] hover:underline flex items-center gap-1"
                      >
                        {copiedCmd === 's3' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCmd === 's3' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-[#14161D] text-[#52B788] overflow-x-auto">
{`fastboot flash boot_b images/boot.img
fastboot flash vendor_boot_b images/vendor_boot.img
fastboot flash dtbo_b images/dtbo.img
fastboot flash system_b images/system.img
fastboot flash product_b images/product.img`}
                    </pre>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#8D99AE]">
                      <span>4. Lock AVB 2.0 dm-verity and switch boot slot:</span>
                      <button
                        onClick={() => handleCopy('fastboot flash vbmeta_b vbmeta.img\nfastboot set_active b\nfastboot reboot', 's4')}
                        className="text-[#DDA15E] hover:underline flex items-center gap-1"
                      >
                        {copiedCmd === 's4' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCmd === 's4' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-[#14161D] text-[#52B788] overflow-x-auto">
{`fastboot flash vbmeta_b images/vbmeta.img
fastboot flash vbmeta_system_b images/vbmeta_system.img
fastboot set_active b
fastboot reboot`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* DSU Sideloader Workflow */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2E35]">
                <div>
                  <h3 className="text-lg font-bold text-[#F4F4F9] flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-[#52B788]" />
                    <span>DSU Sideloader 1-Click Installation (Universal GSI)</span>
                  </h3>
                  <p className="text-xs text-[#8D99AE] font-mono mt-0.5">
                    Zero-PC installation via Android Dynamic System Updates & Wireless Debugging.
                  </p>
                </div>

                <a
                  href="/assets/amber-dsu-manifest.json"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#52B788] text-[#0E0E10] hover:bg-[#2D6A4F] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download DSU GSI Profile</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-2">
                  <div className="text-[#52B788] font-bold">1. Pair Wireless Debugging</div>
                  <p className="text-[#8D99AE] text-[11px] leading-relaxed">
                    Enable Developer Options on your Android device and pair Shizuku via Wireless Debugging port.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-2">
                  <div className="text-[#52B788] font-bold">2. Import Amber GSI DSU</div>
                  <p className="text-[#8D99AE] text-[11px] leading-relaxed">
                    Open DSU Sideloader, load <code className="text-[#F4F4F9]">amber-arm64-v17.gz</code>, and set userdata size to 16GB.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-2">
                  <div className="text-[#52B788] font-bold">3. Tap 'Restart to AmberOS'</div>
                  <p className="text-[#8D99AE] text-[11px] leading-relaxed">
                    Android notification drawer will prompt "Dynamic System Update Ready". Tap Restart to boot into AmberOS 17.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Tier Banner (Amber Launcher APK for Hesitant Users) */}
      <div className="max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#181A22] via-[#14161D] to-[#181A22] border border-[#4A6FA5]/40 relative overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#4A6FA5]/15 border border-[#4A6FA5]/30 text-[#4A6FA5]">
                <Smartphone className="w-3.5 h-3.5" />
                <span>PREVIEW TIER • ZERO FLASHING REQUIRED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F4F4F9]">
                Try the Amber Experience on Your Existing Phone
              </h3>
              <p className="text-xs sm:text-sm text-[#8D99AE] max-w-2xl font-mono leading-relaxed">
                Download the standalone <strong>Amber Launcher APK</strong>. Enjoy the soothing matte visual system, 22% squircles, Amber Keyboard, and consolidated uWorkspace hubs without modifying your firmware.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleCopy('https://get.usafe.in/apk/AmberLauncher-v17.apk', 'launcher')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-[#0E0E10] border border-[#2A2E35] text-[#8D99AE] hover:text-[#F4F4F9]"
              >
                {copiedCmd === 'launcher' ? <Check className="w-4 h-4 text-[#52B788]" /> : <Copy className="w-4 h-4" />}
                <span>Copy Direct APK URL</span>
              </button>

              <a
                href="/assets/AmberLauncher-v17.apk"
                download="AmberLauncher-v17.apk"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#4A6FA5] text-[#F4F4F9] hover:bg-[#2E4057] transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Amber Launcher (18.4 MB)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Amber Transfer CTA & Migration Suite Card */}
      <div className="max-w-7xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#181A1F] border border-[#2A2E35] space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#2A2E35]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] flex items-center justify-center text-[#DDA15E]">
              <RefreshCw className="w-7 h-7 text-[#DDA15E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#F4F4F9]">Amber Transfer Migration Suite</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#52B788]/10 text-[#52B788] border border-[#52B788]/30">
                  AES-GCM-256
                </span>
              </div>
              <p className="text-xs text-[#8D99AE] font-mono mt-0.5">
                Migrate your contacts, SMS messages, and call logs from legacy Android/iOS in under 2 minutes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQRPairing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-[#0E0E10] border border-[#2A2E35] text-[#DDA15E] hover:border-[#DDA15E]/40 transition-all"
            >
              <span>Scan Sovereign QR Code</span>
            </button>

            <a
              href="/assets/AmberTransfer.apk"
              download="AmberTransfer.apk"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#DDA15E] text-[#0E0E10] hover:bg-[#BC6C25] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download AmberTransfer.apk</span>
            </a>
          </div>
        </div>

        {/* 3 Step Visual Migration Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#DDA15E] font-bold">01. Install on Old Device</span>
              <span className="text-[10px] text-[#8D99AE]">STEP 1</span>
            </div>
            <p className="text-[#8D99AE] text-[11px] leading-relaxed">
              Install <code className="text-[#F4F4F9]">AmberTransfer.apk</code> on your previous phone. Sign in with your phone number and link Google account for Drive/Photos bridge.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#DDA15E] font-bold">02. Zero-Knowledge Encrypt</span>
              <span className="text-[10px] text-[#8D99AE]">STEP 2</span>
            </div>
            <p className="text-[#8D99AE] text-[11px] leading-relaxed">
              Your device generates a local AES-GCM-256 master key. Contacts, SMS, and Call Logs are encrypted before leaving the device to <code className="text-[#F4F4F9]">api.usafe.in</code>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0E10] border border-[#2A2E35] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#52B788] font-bold">03. OOBE Instant Restore</span>
              <span className="text-[10px] text-[#52B788]">STEP 3</span>
            </div>
            <p className="text-[#8D99AE] text-[11px] leading-relaxed">
              Turn on your new AmberOS itel A95 5G. Sign in during First-Boot Setup to automatically inject all contacts and call history into native Android providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
