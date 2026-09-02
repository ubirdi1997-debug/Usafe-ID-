import React, { useState } from 'react';
import {
  Globe,
  KeyRound,
  LayoutGrid,
  Menu,
  X,
  Sparkles,
  Layers,
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { detectRegion, REGIONS, Region, setPreferredRegion, getSubdomainUrl } from '../lib/domains';

interface NavbarProps {
  currentRegion: Region;
  onRegionChange: (region: Region) => void;
  onOpenPasskeyModal: () => void;
  onOpenAppDrawer: () => void;
  activeView: 'landing' | 'dashboard' | 'admin' | 'api' | 'install';
  onToggleView: (view: 'landing' | 'dashboard' | 'admin' | 'api' | 'install') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRegion,
  onRegionChange,
  onOpenPasskeyModal,
  onOpenAppDrawer,
  activeView,
  onToggleView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeRegionConfig = REGIONS[currentRegion];

  const handleRegionSelect = (newRegion: Region) => {
    setPreferredRegion(newRegion);
    onRegionChange(newRegion);
  };

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Amber OS', href: '#amber-os' },
    { name: 'Aura AI', href: '#aura-ai' },
    { name: 'OpenClaw Mesh', href: '#openclaw' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E0E10]/90 backdrop-blur-md border-b border-[#232836]">
      {/* Top micro-bar for active domain indication */}
      <div className="bg-[#121214] border-b border-[#232836]/60 px-4 py-1 text-xs text-[#A1A1AA] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse"></span>
          <span className="font-mono text-[11px] tracking-tight">
            ROOT HUB: <strong className="text-[#E4E4E7] font-semibold">{activeRegionConfig.primaryDomain}</strong>
          </span>
          <span className="hidden sm:inline-block text-[#71717A]">•</span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#A1A1AA]">
            HARDWARE ENCLAVE VERIFIED (ED25519)
          </span>
        </div>

        {/* View Switcher Bar */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button
            onClick={() => onToggleView('landing')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeView === 'landing' ? 'text-[#DDA15E] font-bold bg-[#181A22]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
            }`}
          >
            Showcase
          </button>
          <span className="text-[#71717A]">|</span>
          <button
            onClick={() => onToggleView('dashboard')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeView === 'dashboard' ? 'text-[#DDA15E] font-bold bg-[#181A22]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
            }`}
          >
            Account (Portal)
          </button>
          <span className="text-[#71717A]">|</span>
          <button
            onClick={() => onToggleView('admin')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeView === 'admin' ? 'text-[#DDA15E] font-bold bg-[#181A22]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
            }`}
          >
            Admin (Control Plane)
          </button>
          <span className="text-[#71717A]">|</span>
          <button
            onClick={() => onToggleView('api')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeView === 'api' ? 'text-[#52B788] font-bold bg-[#181A22]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
            }`}
          >
            APIs / SSO
          </button>
          <span className="text-[#71717A]">|</span>
          <button
            onClick={() => onToggleView('install')}
            className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
              activeView === 'install' ? 'text-[#DDA15E] font-bold bg-[#181A22]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
            }`}
          >
            <span>Install / DSU</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleView('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="uSafe Homepage"
          >
            {/* uSafe continuous infinity vector glyph */}
            <div className="w-9 h-9 rounded-xl bg-[#181A22] border border-[#232836] p-1.5 flex items-center justify-center group-hover:border-[#DDA15E]/50 transition-colors">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#DDA15E]"
              >
                <path
                  d="M10 9C6.68629 9 4 11.6863 4 15C4 18.3137 6.68629 21 10 21C13.5 21 15 17.5 16 15C17 12.5 18.5 9 22 9C25.3137 9 28 11.6863 28 15C28 18.3137 25.3137 21 22 21C18.5 21 17 17.5 16 15C15 12.5 13.5 9 10 9Z"
                  stroke="currentColor"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="15" r="2" fill="#52B788" />
                <circle cx="22" cy="15" r="2" fill="#DDA15E" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                  uSafe
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#181A22] border border-[#232836] text-[#DDA15E] rounded-full">
                  {activeRegionConfig.tld}
                </span>
              </div>
              <span className="text-[10px] text-[#A1A1AA] -mt-0.5 hidden sm:inline font-mono">
                Zero-Knowledge Mesh
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Section Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Geo-IP Switcher Pill */}
          <div className="flex items-center bg-[#121214] border border-[#232836] rounded-full p-0.5 text-xs font-mono">
            <button
              onClick={() => handleRegionSelect('in')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                currentRegion === 'in'
                  ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] shadow-sm font-medium'
                  : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
              }`}
              title="Switch to India Domestic Hub (.in)"
            >
              <span>🇮🇳</span>
              <span className="hidden sm:inline font-semibold">IN</span>
              <span className="text-[10px] text-[#71717A]">.in</span>
            </button>
            <button
              onClick={() => handleRegionSelect('net')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                currentRegion === 'net'
                  ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] shadow-sm font-medium'
                  : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
              }`}
              title="Switch to Global International Alias (.net)"
            >
              <span>🌐</span>
              <span className="hidden sm:inline font-semibold">GLOBAL</span>
              <span className="text-[10px] text-[#71717A]">.net</span>
            </button>
          </div>

          {/* Secondary Button: Sign In via uAuth SSO */}
          <button
            onClick={onOpenPasskeyModal}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#E4E4E7] bg-[#181A22] border border-[#232836] hover:border-[#DDA15E]/60 rounded-full transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>uAuth SSO</span>
          </button>

          {/* Primary Button: Launch Dashboard / App Drawer */}
          <button
            onClick={() => {
              if (activeView === 'landing') {
                onToggleView('dashboard');
              } else {
                onOpenAppDrawer();
              }
            }}
            className="flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#0E0E10] bg-[#DDA15E] hover:bg-[#BC6C25] rounded-full transition-colors shadow-sm"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{activeView === 'landing' ? 'Launch Dashboard' : 'App Drawer'}</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A1A1AA] hover:text-[#F4F4F5] bg-[#181A22] border border-[#232836] rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121214] border-b border-[#232836] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#232836]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-[#E4E4E7] bg-[#181A22] border border-[#232836] rounded-xl"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPasskeyModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#E4E4E7] bg-[#181A22] border border-[#232836] rounded-full"
            >
              <KeyRound className="w-4 h-4 text-[#DDA15E]" />
              <span>Sign In via uAuth SSO (Passkey)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleView(activeView === 'landing' ? 'dashboard' : 'landing');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#0E0E10] bg-[#DDA15E] rounded-full"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>
                {activeView === 'landing'
                  ? `Launch account.usafe.${currentRegion}`
                  : 'Back to Commercial Home'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
