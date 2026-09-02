import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  Cpu,
  Fingerprint,
  HardDrive,
  Sparkles,
  Layers,
  Compass,
  MessageSquareLock,
  ShieldCheck,
  Briefcase,
  FileText,
  Camera,
  Image,
  FolderLock,
  Search,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  Flame,
  Radio,
  Lock,
  AlertTriangle,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { Region, getSubdomainUrl, REGIONS } from '../lib/domains';
import { ECOSYSTEM_APPS, INITIAL_USER } from '../lib/data';
import { EcosystemApp, TierType, UserProfile } from '../types';
import { AuraChatbot } from './AuraChatbot';

interface DashboardViewProps {
  currentRegion: Region;
  onLaunchApp: (app: EcosystemApp) => void;
  onUpgradeTier: () => void;
  onOpenPasskeyModal: () => void;
  onOpenQRPairing?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRegion,
  onLaunchApp,
  onUpgradeTier,
  onOpenPasskeyModal,
  onOpenQRPairing,
}) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [searchQuery, setSearchQuery] = useState('');
  const [duressArmed, setDuressArmed] = useState(user.duressArmed);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'flagship' | 'utilities'>('all');

  const regionConfig = REGIONS[currentRegion];

  // Helper to format bytes cleanly
  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const getTierQuotaLabel = (tier: TierType) => {
    switch (tier) {
      case 'free':
        return '1 GB (Free Tier)';
      case 'amber_early':
        return '5 GB (AmberOS Early Access)';
      case 'pro':
        return '100 GB (Pro Shield)';
      case 'enterprise':
        return 'Unlimited Multi-TB (Enterprise)';
    }
  };

  const getQuotaBytes = (tier: TierType) => {
    switch (tier) {
      case 'free':
        return 1 * 1024 * 1024 * 1024;
      case 'amber_early':
        return 5 * 1024 * 1024 * 1024;
      case 'pro':
        return 100 * 1024 * 1024 * 1024;
      case 'enterprise':
        return 2048 * 1024 * 1024 * 1024;
    }
  };

  const currentQuota = getQuotaBytes(user.tier);
  const usedPercent = Math.min(100, Math.round((user.storageUsedBytes / currentQuota) * 100));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'MessageSquareLock':
        return <MessageSquareLock className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      case 'Image':
        return <Image className="w-5 h-5" />;
      case 'FolderLock':
        return <FolderLock className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  // Clean System Utilities vs Flagships
  const systemUtilities = ECOSYSTEM_APPS.filter((app) =>
    ['camera', 'gallery', 'files', 'notes'].includes(app.id)
  );

  const flagshipTiles = ECOSYSTEM_APPS.filter((app) =>
    ['uchat', 'kite', 'upay', 'office', 'aura'].includes(app.id)
  );

  const filteredApps = ECOSYSTEM_APPS.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.cleanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'flagship' && app.category === 'flagship') ||
      (selectedCategory === 'utilities' && app.category === 'utility');

    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-8 bg-[#0E0E10] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header / Portal Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232836]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                User App Hub & Settings
              </h1>
            </div>
            <div className="font-mono text-xs text-[#71717A] mt-1 flex items-center gap-2">
              <span>Domain: account.usafe.{currentRegion}</span>
              <span>•</span>
              <span className="text-[#52B788]">Node: {user.nodeLocation}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenQRPairing && (
              <button
                onClick={onOpenQRPairing}
                className="px-3.5 py-1.5 rounded-full bg-[#181A22] border border-[#DDA15E]/40 hover:border-[#DDA15E] text-xs font-mono text-[#DDA15E] flex items-center gap-1.5 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5 text-[#DDA15E]" />
                <span>QR Device Pairing (Pro)</span>
              </button>
            )}

            <button
              onClick={onOpenPasskeyModal}
              className="px-3.5 py-1.5 rounded-full bg-[#181A22] border border-[#232836] hover:border-[#DDA15E]/60 text-xs font-mono text-[#E4E4E7] flex items-center gap-1.5 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#DDA15E]" />
              <span>{user.activePasskeys} FIDO2 Passkeys Active</span>
            </button>

            <button
              onClick={onUpgradeTier}
              className="px-4 py-1.5 rounded-full bg-[#DDA15E] hover:bg-[#BC6C25] text-[#0E0E10] font-bold text-xs font-mono tracking-wide transition-colors"
            >
              Manage Storage Tier
            </button>
          </div>
        </div>

        {/* Top Grid: Section 4.C Identity Card & Storage Quota Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Identity Card */}
          <div className="lg:col-span-6 rounded-[22px] bg-[#121214] border border-[#232836] p-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#181A22] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-base text-[#F4F4F5] font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                      {user.displayName}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/30">
                        HARDWARE ROOTED
                      </span>
                    </div>
                    <div className="font-mono text-xs text-[#DDA15E]">
                      {user.handle}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 bg-[#181A22] rounded-full text-[#A1A1AA] border border-[#232836]">
                  SE050 Chip
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0E0E10] border border-[#232836] space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Public Key Fingerprint:</span>
                  <span className="text-[#52B788]">{user.fingerprint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Enclave Hardware ID:</span>
                  <span className="text-[#E4E4E7]">{user.enclaveId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Active Subscription:</span>
                  <span className="text-[#DDA15E] font-semibold uppercase">{user.tier} Shield</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#232836] flex items-center justify-between text-xs font-mono">
              <span className="text-[#71717A]">Duress Decoy Profile:</span>
              <button
                onClick={() => setDuressArmed(!duressArmed)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  duressArmed
                    ? 'bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/40'
                    : 'bg-[#181A22] text-[#A1A1AA] border border-[#232836]'
                }`}
              >
                {duressArmed ? 'ARMED (PIN 9021)' : 'STANDBY'}
              </button>
            </div>
          </div>

          {/* Dynamic Storage Quota Bar */}
          <div className="lg:col-span-6 rounded-[22px] bg-[#121214] border border-[#232836] p-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#181A22] border border-[#232836] flex items-center justify-center text-[#4A6FA5]">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#F4F4F5]">Zero-Knowledge Storage Quota</h3>
                    <div className="font-mono text-xs text-[#71717A]">{getTierQuotaLabel(user.tier)}</div>
                  </div>
                </div>

                <button
                  onClick={onUpgradeTier}
                  className="text-xs font-mono text-[#DDA15E] hover:underline"
                >
                  Change Tier
                </button>
              </div>

              {/* Visual Storage Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#E4E4E7]">Used: {formatBytes(user.storageUsedBytes)}</span>
                  <span className="text-[#71717A]">Limit: {formatBytes(currentQuota)}</span>
                </div>

                <div className="w-full h-3 rounded-full bg-[#0E0E10] border border-[#232836] overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#52B788] via-[#DDA15E] to-[#4A6FA5] transition-all duration-500"
                    style={{ width: `${Math.max(8, usedPercent)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-[#71717A]">
                  <span>{usedPercent}% capacity consumed</span>
                  <span>ChaCha20 Encrypted At Rest</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#232836] grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#A1A1AA]">
              <div className="p-1.5 rounded bg-[#181A22]">uDocs: 4.2 GB</div>
              <div className="p-1.5 rounded bg-[#181A22]">uChat Vault: 8.9 GB</div>
              <div className="p-1.5 rounded bg-[#181A22]">Notes CRDT: 5.3 GB</div>
            </div>
          </div>
        </div>

        {/* Section 4.A: Interactive App Drawer (Amber System Dock) */}
        <div className="rounded-[22px] bg-[#121214] border border-[#232836] p-6 space-y-6">
          {/* Launcher Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#232836]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DDA15E]" />
                <h2 className="text-lg font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                  Amber System Dock
                </h2>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Launch sandboxed sovereign applications or open dedicated subdomain endpoints.
              </p>
            </div>

            {/* App Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter apps (Camera, uChat, Kite)..."
                className="w-full bg-[#0E0E10] border border-[#232836] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#F4F4F5] placeholder-[#71717A] focus:outline-none focus:border-[#DDA15E]"
              />
            </div>
          </div>

          {/* Group 1: Clean System Utility Tiles (Prompt Section 4.A) */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] flex items-center justify-between">
              <span>System Utility Applications</span>
              <span className="text-[#71717A] text-[10px]">Zero-Telemetry Drivers</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {systemUtilities.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onLaunchApp(app)}
                  className="group p-4 rounded-[20px] bg-[#181A22] border border-[#232836] hover:border-[#DDA15E]/60 text-left transition-all duration-200 flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ color: app.accentColor }}
                    >
                      {getIcon(app.iconName)}
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#DDA15E]" />
                  </div>

                  <div>
                    <div className="font-bold text-sm text-[#F4F4F5] group-hover:text-[#DDA15E] font-['Plus_Jakarta_Sans']">
                      {app.cleanName}
                    </div>
                    <div className="text-[10px] text-[#A1A1AA] mt-1 line-clamp-1">
                      {app.tagline}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Flagship Brand Tiles (uChat, Kite, uPay, uWorkspace, Aura AI) */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#DDA15E] flex items-center justify-between">
              <span>Flagship Sovereign Products</span>
              <span className="text-[#71717A] text-[10px]">Multi-Hop Mesh Enabled</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {flagshipTiles.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onLaunchApp(app)}
                  className="group p-4 rounded-[20px] bg-[#181A22] border border-[#232836] hover:border-[#DDA15E]/60 text-left transition-all duration-200 flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ color: app.accentColor }}
                    >
                      {getIcon(app.iconName)}
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#DDA15E]" />
                  </div>

                  <div>
                    <div className="font-bold text-sm text-[#F4F4F5] group-hover:text-[#DDA15E] font-['Plus_Jakarta_Sans']">
                      {app.cleanName}
                    </div>
                    <div className="font-mono text-[10px] text-[#71717A] truncate mt-0.5">
                      {app.subdomainKey}.usafe.{currentRegion}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4.B: Embedded Reimagined Aura AI Chatbot & Command Hub */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#7E78D2]">
              <Sparkles className="w-4 h-4" />
              <span>AURA CONFIDENTIAL ENCLAVE COPILOT & AUTOMATION COMMANDS</span>
            </div>
            <span className="text-[11px] font-mono text-[#71717A]">
              Node Zurich-04 • Kyber-1024 Session
            </span>
          </div>

          <AuraChatbot currentRegion={currentRegion} embeddedMode={true} />
        </div>
      </div>
    </div>
  );
};
