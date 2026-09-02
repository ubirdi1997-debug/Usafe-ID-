import React, { useState } from 'react';
import {
  Search,
  X,
  Compass,
  MessageSquareLock,
  ShieldCheck,
  Briefcase,
  FileText,
  Cpu,
  Camera,
  Image,
  FolderLock,
  Sparkles,
  ExternalLink,
  Shield,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ECOSYSTEM_APPS } from '../lib/data';
import { Region, getSubdomainUrl } from '../lib/domains';
import { EcosystemApp } from '../types';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: Region;
  onLaunchApp: (app: EcosystemApp) => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  currentRegion,
  onLaunchApp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'flagship' | 'utility' | 'workspace'>('all');

  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'MessageSquareLock':
        return <MessageSquareLock className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Camera':
        return <Camera className="w-6 h-6" />;
      case 'Image':
        return <Image className="w-6 h-6" />;
      case 'FolderLock':
        return <FolderLock className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  const filteredApps = ECOSYSTEM_APPS.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.cleanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'flagship' && app.category === 'flagship') ||
      (activeCategory === 'utility' && app.category === 'utility') ||
      (activeCategory === 'workspace' && app.category === 'workspace');

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0E0E10]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#121214] border border-[#232836] rounded-[24px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#181A22] border-b border-[#232836] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                Amber System Dock & Launcher
              </h2>
              <div className="text-[11px] font-mono text-[#71717A]">
                Targeting *.usafe.{currentRegion} • Zero-Knowledge Sandbox
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#232836] transition-colors"
            aria-label="Close Launcher"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-[#0E0E10] border-b border-[#232836] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sovereign apps (Camera, uChat, Kite, uWorkspace, Files, Notes)..."
              className="w-full bg-[#121214] border border-[#232836] rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-[#F4F4F5] placeholder-[#71717A] focus:outline-none focus:border-[#DDA15E]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
              }`}
            >
              All Apps ({ECOSYSTEM_APPS.length})
            </button>
            <button
              onClick={() => setActiveCategory('flagship')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeCategory === 'flagship'
                  ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
              }`}
            >
              Flagships
            </button>
            <button
              onClick={() => setActiveCategory('utility')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeCategory === 'utility'
                  ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
              }`}
            >
              System Utilities
            </button>
            <button
              onClick={() => setActiveCategory('workspace')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeCategory === 'workspace'
                  ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
              }`}
            >
              Workspace Suite
            </button>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                onClose();
                onLaunchApp(app);
              }}
              className="group p-4 rounded-[20px] bg-[#181A22] border border-[#232836] hover:border-[#DDA15E]/60 text-left transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-2xl bg-[#0E0E10] border border-[#232836] flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ color: app.accentColor }}
                  >
                    {getIcon(app.iconName)}
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#DDA15E] transition-colors" />
                </div>

                <div className="font-bold text-sm text-[#F4F4F5] group-hover:text-[#DDA15E] transition-colors font-['Plus_Jakarta_Sans']">
                  {app.cleanName}
                </div>
                <div className="text-[11px] font-mono text-[#71717A] truncate">
                  {app.subdomainKey}.usafe.{currentRegion}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#232836]/60 text-[10px] text-[#A1A1AA] line-clamp-2">
                {app.tagline}
              </div>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#181A22] border-t border-[#232836] flex items-center justify-between text-[11px] font-mono text-[#71717A]">
          <span>App Drawer: Android 17 / Tauri 2.0 Bridge</span>
          <span className="text-[#52B788]">Hardware Authenticated</span>
        </div>
      </div>
    </div>
  );
};
