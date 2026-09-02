import React from 'react';
import {
  Compass,
  MessageSquareLock,
  ShieldCheck,
  Briefcase,
  FileText,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Check,
  ExternalLink,
  Shield,
  Activity
} from 'lucide-react';
import { ECOSYSTEM_APPS } from '../lib/data';
import { Region, getSubdomainUrl } from '../lib/domains';
import { EcosystemApp } from '../types';

interface ProductGridProps {
  currentRegion: Region;
  onLaunchApp: (app: EcosystemApp) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  currentRegion,
  onLaunchApp,
}) => {
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
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  // Only show the 6 core flagship products requested in prompt Section 3.D
  const coreProducts = ECOSYSTEM_APPS.filter((app) =>
    ['kite', 'uchat', 'upay', 'office', 'notes', 'launcher'].includes(app.id)
  );

  return (
    <section id="products" className="py-24 bg-[#0E0E10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#232836]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A22] border border-[#232836] text-xs font-mono text-[#52B788]">
              <span className="w-2 h-2 rounded-full bg-[#52B788]" />
              <span>THE SOVEREIGN APPLICATION MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
              Engineered for Absolute Isolation
            </h2>
            <p className="text-base text-[#A1A1AA] max-w-2xl">
              Every tool in the uSafe ecosystem operates on a zero-knowledge substrate.
              Your data is encrypted on your device before touching the network.
            </p>
          </div>

          <div className="font-mono text-xs text-[#DDA15E] bg-[#181A22] px-3.5 py-2 rounded-full border border-[#232836] flex items-center gap-2 self-start md:self-auto">
            <Activity className="w-3.5 h-3.5 text-[#52B788] animate-pulse" />
            <span>Targeting *.usafe.{currentRegion}</span>
          </div>
        </div>

        {/* 6 Squircle Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreProducts.map((app) => {
            const subdomainUrl = getSubdomainUrl(app.subdomainKey, currentRegion);

            return (
              <div
                key={app.id}
                className="group rounded-[22px] bg-[#121214] border border-[#232836] p-6 hover:border-[#DDA15E]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-lg"
              >
                {/* Top Card Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl bg-[#181A22] border border-[#232836] flex items-center justify-center transition-colors group-hover:border-[#DDA15E]/40"
                      style={{ color: app.accentColor }}
                    >
                      {getIcon(app.iconName)}
                    </div>

                    {app.badge && (
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#181A22] border border-[#232836] text-[#A1A1AA]">
                        {app.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans'] group-hover:text-[#DDA15E] transition-colors">
                        {app.name}
                      </h3>
                    </div>
                    <div className="font-mono text-xs text-[#71717A] mt-0.5">
                      {app.subdomainKey}.usafe.{currentRegion}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {app.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-2">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#E4E4E7]">
                        <Check className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Launch Trigger */}
                <div className="mt-8 pt-4 border-t border-[#232836] flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-[#71717A]">
                    {app.metrics}
                  </span>

                  <button
                    onClick={() => onLaunchApp(app)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0E0E10] bg-[#DDA15E] hover:bg-[#BC6C25] transition-colors shadow-sm"
                  >
                    <span>Launch App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
