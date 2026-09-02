import React from 'react';
import {
  ShieldCheck,
  Lock,
  Globe,
  Radio,
  FileCode,
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Region, REGIONS, setPreferredRegion, getSubdomainUrl } from '../lib/domains';

interface FooterProps {
  currentRegion: Region;
  onRegionChange: (region: Region) => void;
  onOpenPasskeyModal: () => void;
  onOpenAppDrawer: () => void;
  onNavigateView?: (view: 'landing' | 'dashboard' | 'admin' | 'api' | 'install') => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentRegion,
  onRegionChange,
  onOpenPasskeyModal,
  onOpenAppDrawer,
  onNavigateView,
}) => {
  const activeRegionConfig = REGIONS[currentRegion];

  const handleRegionSwitch = (reg: Region) => {
    setPreferredRegion(reg);
    onRegionChange(reg);
  };

  return (
    <footer className="bg-[#0E0E10] border-t border-[#232836] text-[#A1A1AA] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#232836]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#181A22] border border-[#232836] p-1.5 flex items-center justify-center text-[#DDA15E]">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M10 9C6.68629 9 4 11.6863 4 15C4 18.3137 6.68629 21 10 21C13.5 21 15 17.5 16 15C17 12.5 18.5 9 22 9C25.3137 9 28 11.6863 28 15C28 18.3137 25.3137 21 22 21C18.5 21 17 17.5 16 15C15 12.5 13.5 9 10 9Z"
                    stroke="currentColor"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-bold text-base text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                uSafe Ecosystem
              </span>
            </div>

            <p className="text-xs text-[#71717A] leading-relaxed max-w-sm">
              Sovereign, hardware-isolated zero-knowledge cloud platform. Protecting human rights,
              civil liberties, and corporate privacy through uncompromising mathematics and physical Secure Elements.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#DDA15E]">
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
              <span>Active Hub: {activeRegionConfig.primaryDomain}</span>
            </div>
          </div>

          {/* Col 1: Flagship Apps */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-[#F4F4F5] uppercase tracking-wider">
              Flagship Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={getSubdomainUrl('kite', currentRegion)} className="hover:text-[#F4F4F5] transition-colors">
                  Kite Browser
                </a>
              </li>
              <li>
                <a href={getSubdomainUrl('uchat', currentRegion)} className="hover:text-[#F4F4F5] transition-colors">
                  uChat (Double-Ratchet)
                </a>
              </li>
              <li>
                <a href={getSubdomainUrl('upay', currentRegion)} className="hover:text-[#F4F4F5] transition-colors">
                  uPay NFC Vault
                </a>
              </li>
              <li>
                <a href={getSubdomainUrl('office', currentRegion)} className="hover:text-[#F4F4F5] transition-colors">
                  Workspace (uDocs, uMail)
                </a>
              </li>
              <li>
                <a href={getSubdomainUrl('notes', currentRegion)} className="hover:text-[#F4F4F5] transition-colors">
                  Notes by uSafe
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Security & OS */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-[#F4F4F5] uppercase tracking-wider">
              Amber OS & Mesh
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateView?.('install')}
                  className="text-left text-[#DDA15E] font-bold hover:underline flex items-center gap-1"
                >
                  <span>AmberOS 17 Dedicated Flash & DSU</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <a href="#amber-os" className="hover:text-[#F4F4F5] transition-colors">
                  Android 17 Amber Kernel
                </a>
              </li>
              <li>
                <a href="#amber-os" className="hover:text-[#F4F4F5] transition-colors">
                  Baseband Silent SMS Blocker
                </a>
              </li>
              <li>
                <a href="#amber-os" className="hover:text-[#F4F4F5] transition-colors">
                  Dual Duress Wipe Trigger
                </a>
              </li>
              <li>
                <a href="#openclaw" className="hover:text-[#F4F4F5] transition-colors">
                  OpenClaw P2P Mesh Protocol
                </a>
              </li>
              <li>
                <a href="#aura-ai" className="hover:text-[#F4F4F5] transition-colors">
                  Aura Enclave AI Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Authentication & Developers */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-[#F4F4F5] uppercase tracking-wider">
              Control & Developers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateView?.('admin')}
                  className="hover:text-[#DDA15E] transition-colors text-left font-bold text-[#DDA15E]"
                >
                  Admin Control Plane (admin.usafe.*)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView?.('api')}
                  className="hover:text-[#52B788] transition-colors text-left font-bold text-[#52B788]"
                >
                  REST / WSS API Explorer (api.usafe.*)
                </button>
              </li>
              <li>
                <button onClick={onOpenPasskeyModal} className="hover:text-[#DDA15E] transition-colors text-left">
                  uAuth FIDO2 SSO (auth.usafe.*)
                </button>
              </li>
              <li>
                <button onClick={onOpenAppDrawer} className="hover:text-[#DDA15E] transition-colors text-left">
                  Account Dashboard (account.usafe.*)
                </button>
              </li>
              <li>
                <a href="/updates.html" className="text-[#DDA15E] hover:underline flex items-center gap-1">
                  <span>System Updates & Changelog</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#71717A]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} uSafe Foundation. All rights reserved.</span>
            <span>•</span>
            <span className="text-[#52B788]">0.00 KB Telemetry Emitted</span>
          </div>

          {/* Region Switcher Mini */}
          <div className="flex items-center gap-2 bg-[#121214] border border-[#232836] rounded-full p-1">
            <button
              onClick={() => handleRegionSwitch('in')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                currentRegion === 'in' ? 'bg-[#181A22] text-[#DDA15E] font-bold' : 'hover:text-[#E4E4E7]'
              }`}
            >
              🇮🇳 .in (India Hub)
            </button>
            <button
              onClick={() => handleRegionSwitch('net')}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                currentRegion === 'net' ? 'bg-[#181A22] text-[#DDA15E] font-bold' : 'hover:text-[#E4E4E7]'
              }`}
            >
              🌐 .net (Global Alias)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
