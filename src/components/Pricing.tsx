import React, { useState } from 'react';
import {
  Check,
  Zap,
  Shield,
  Sparkles,
  Building2,
  Lock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  QrCode
} from 'lucide-react';
import { Region, REGIONS } from '../lib/domains';
import { TierType } from '../types';

interface PricingProps {
  currentRegion: Region;
  activeUserTier?: TierType;
  onSelectTier: (tier: TierType) => void;
  onOpenQRPairing?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({
  currentRegion,
  activeUserTier = 'pro',
  onSelectTier,
  onOpenQRPairing,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const regionConfig = REGIONS[currentRegion];
  const isDomestic = currentRegion === 'in';

  // Currency & Tier Pricing Data
  const pricingData = {
    free: {
      name: 'Free Sovereign',
      badge: 'COMMUNITY',
      storage: '1 GB',
      monthlyPrice: isDomestic ? '₹0' : '$0',
      period: '/month',
      subtext: 'Forever free for all sovereign identities',
      description: 'Zero-knowledge cryptography for personal sovereign identity and lightweight private notes.',
      features: [
        '1 GB Zero-Knowledge Encrypted Cloud Storage',
        'Standard @amber.id Identity with local enclave tools',
        'Full access to Kite Browser & community mesh relay',
        'Standard on-device Aura AI tokenizer calls',
        '1-Click launcher to standard web utilities',
      ],
      cta: 'Claim @amber.id ($0/mo)',
      accent: '#A1A1AA',
    },
    amber_early: {
      name: 'AmberOS Early Access',
      badge: 'HARDWARE UNLOCKED',
      storage: '5 GB',
      monthlyPrice: isDomestic ? '₹0' : '$0',
      period: '/month',
      subtext: 'Exclusive to Amber Handsets & Launcher',
      description: '5x cloud storage tier unlocked automatically by authenticating hardware-enclave devices.',
      features: [
        '5 GB Zero-Knowledge Cloud Storage (5x free capacity)',
        'Unlocked for Amber OS Handsets & Amber Desktop Launcher',
        'Hardware-enclave device attestation verification',
        'Priority P2P OpenClaw mesh peering for rapid sync',
        'Includes all Free Sovereign capabilities',
      ],
      cta: 'Verify Hardware ($0/mo)',
      accent: '#52B788',
      isHighlight: false,
    },
    pro: {
      name: 'Pro Shield',
      badge: 'MOST POPULAR',
      storage: '100 GB',
      monthlyPrice: isDomestic ? '₹399' : '$5',
      annualEquivalentPrice: isDomestic ? '₹332.50' : '$4.17',
      annualTotalPrice: isDomestic ? '₹3,990/yr' : '$50/yr',
      period: '/month',
      subtext:
        billingCycle === 'annual'
          ? isDomestic
            ? 'Billed annually at ₹3,990/yr (Save 17%)'
            : 'Billed annually at $50/yr (Save 17%)'
          : 'Billed monthly with no lock-in',
      description: 'The definitive sovereign workstation suite with 100GB vault storage, instant QR device pairing, and priority AI compute.',
      features: [
        '100 GB Zero-Knowledge Encrypted Cloud Storage',
        'Instant Zero-Knowledge QR Device Pairing & Multi-Sync',
        'Full Workspace by uSafe Access: uDocs, uSheets, uSlides, uMail',
        'High-Bandwidth Aura AI Tokens for OCR & spreadsheets',
        'Priority Multi-Hop OpenClaw Egress (Zurich, Tokyo, Reykjavik, Mumbai)',
        'Full cross-device sync (Mobile, Web, Desktop, Amber Pico)',
      ],
      cta: isDomestic ? 'Activate Pro Shield (₹399/mo)' : 'Activate Pro Shield ($5/mo)',
      accent: '#DDA15E',
      isHighlight: true,
    },
    enterprise: {
      name: 'Enterprise Enclave',
      badge: 'INSTITUTIONAL',
      storage: 'Multi-TB Scalable',
      monthlyPrice: isDomestic ? '₹21,500' : '$250',
      annualEquivalentPrice: isDomestic ? '₹17,917' : '$208.33',
      annualTotalPrice: isDomestic ? '₹215,000/yr' : '$2,500/yr',
      period: '/month base',
      subtext:
        billingCycle === 'annual'
          ? isDomestic
            ? 'Billed annually at ₹215,000/yr + ₹350/mo/seat'
            : 'Billed annually at $2,500/yr + $4.17/mo/seat'
          : isDomestic
          ? 'Billed monthly + ₹420/mo/seat'
          : 'Billed monthly + $5/mo/seat',
      description: 'Institutional-grade cryptographic deployment with dedicated enclave isolation and RBAC controls.',
      features: [
        'Scalable dedicated enterprise storage & private mesh nodes',
        'Custom Enclave Attestation & isolated cryptographic chambers',
        'Multi-Seat Centralized Management with Granular RBAC',
        'Dedicated Duress Deployment Policies & Instant Remote Shredding',
        'Unlimited Aura AI Enterprise Compute Chamber Calls',
        '99.99% Hardware Enclave SLA & 24/7 Cryptographic Support',
      ],
      cta: 'Deploy Enterprise Enclave',
      accent: '#4A6FA5',
    },
  };

  return (
    <section id="pricing" className="py-24 bg-[#0E0E10] border-t border-[#232836]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A22] border border-[#232836] text-xs font-mono text-[#DDA15E]">
            <Lock className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>TRANSPARENT SOVEREIGN PRICING MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
            Zero-Knowledge Storage for Every Scale
          </h2>
          <p className="text-base text-[#A1A1AA]">
            Sovereign security is not a subscription luxury—it begins free with your @amber.id and
            scales cleanly into enterprise cryptographic infrastructure.
          </p>

          {/* Billing Cycle Toggle & Region Indicator */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="bg-[#121214] border border-[#232836] p-1 rounded-full flex items-center text-xs font-mono">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] px-2 py-0.2 bg-[#52B788]/20 text-[#52B788] rounded-full font-bold">
                  Save 17%
                </span>
              </button>
            </div>

            <div className="text-xs font-mono text-[#71717A] flex items-center gap-1.5 bg-[#121214] px-3 py-1.5 rounded-full border border-[#232836]">
              <span>Currency:</span>
              <strong className="text-[#E4E4E7]">{regionConfig.currencyCode} ({regionConfig.currencySymbol})</strong>
              <span className="text-[10px] text-[#DDA15E]">via {regionConfig.tld}</span>
            </div>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Free Sovereign */}
          <div
            className={`rounded-[22px] bg-[#121214] border p-6 flex flex-col justify-between transition-all relative ${
              activeUserTier === 'free' ? 'border-[#52B788]' : 'border-[#232836] hover:border-[#232836]/90'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#181A22] border border-[#232836] text-[#A1A1AA]">
                  {pricingData.free.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#52B788] bg-[#181A22] px-2 py-0.5 rounded">
                  {pricingData.free.storage}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                  {pricingData.free.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#F4F4F5] font-mono">
                    {pricingData.free.monthlyPrice}
                  </span>
                  <span className="text-xs text-[#71717A] font-mono">{pricingData.free.period}</span>
                </div>
                <div className="text-[11px] font-mono text-[#71717A] mt-1">
                  {pricingData.free.subtext}
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {pricingData.free.description}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-[#232836]">
                {pricingData.free.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#E4E4E7]">
                    <Check className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectTier('free')}
                className="w-full py-2.5 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#232836] text-xs font-semibold text-[#E4E4E7] transition-colors"
              >
                {pricingData.free.cta}
              </button>
            </div>
          </div>

          {/* 2. AmberOS Early Access Offer */}
          <div
            className={`rounded-[22px] bg-[#121214] border p-6 flex flex-col justify-between transition-all relative ${
              activeUserTier === 'amber_early' ? 'border-[#52B788]' : 'border-[#232836] hover:border-[#52B788]/40'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#52B788]/20 border border-[#52B788]/40 text-[#52B788]">
                  {pricingData.amber_early.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#52B788] bg-[#181A22] px-2 py-0.5 rounded">
                  {pricingData.amber_early.storage}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#52B788]" />
                  {pricingData.amber_early.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#52B788] font-mono">
                    {pricingData.amber_early.monthlyPrice}
                  </span>
                  <span className="text-xs text-[#52B788] font-mono">{pricingData.amber_early.period}</span>
                </div>
                <div className="text-[11px] font-mono text-[#52B788] mt-1">
                  {pricingData.amber_early.subtext}
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {pricingData.amber_early.description}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-[#232836]">
                {pricingData.amber_early.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#E4E4E7]">
                    <Check className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectTier('amber_early')}
                className="w-full py-2.5 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#52B788]/40 text-xs font-semibold text-[#52B788] transition-colors flex items-center justify-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{pricingData.amber_early.cta}</span>
              </button>
            </div>
          </div>

          {/* 3. Pro Shield (Highlighted Tier) */}
          <div
            className={`rounded-[22px] bg-[#181A22] border-2 border-[#DDA15E] p-6 flex flex-col justify-between transition-all relative shadow-xl shadow-[#DDA15E]/5 ${
              activeUserTier === 'pro' ? 'ring-2 ring-[#DDA15E]/20' : ''
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DDA15E] text-[#0E0E10] text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              {pricingData.pro.badge}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E0E10] text-[#DDA15E]">
                  COMPLETE WORKSPACE
                </span>
                <span className="text-xs font-mono font-bold text-[#DDA15E] bg-[#0E0E10] px-2 py-0.5 rounded border border-[#DDA15E]/30">
                  {pricingData.pro.storage}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                  {pricingData.pro.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] font-mono">
                    {billingCycle === 'annual' ? pricingData.pro.annualEquivalentPrice : pricingData.pro.monthlyPrice}
                  </span>
                  <span className="text-xs text-[#DDA15E] font-mono">{pricingData.pro.period}</span>
                </div>
                <div className="text-[11px] font-mono text-[#DDA15E] mt-1">
                  {pricingData.pro.subtext}
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {pricingData.pro.description}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-[#232836]">
                {pricingData.pro.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#E4E4E7]">
                    <Check className="w-3.5 h-3.5 text-[#DDA15E] mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 space-y-2">
              <button
                onClick={() => onSelectTier('pro')}
                className="w-full py-2.5 rounded-full bg-[#DDA15E] hover:bg-[#BC6C25] text-[#0E0E10] font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>{pricingData.pro.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onOpenQRPairing && (
                <button
                  type="button"
                  onClick={onOpenQRPairing}
                  className="w-full py-1.5 rounded-full bg-[#0E0E10] hover:bg-[#232836] border border-[#232836] text-[11px] font-mono text-[#DDA15E] transition-colors flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Test QR Device Pairing</span>
                </button>
              )}
            </div>
          </div>

          {/* 4. Enterprise Enclave */}
          <div
            className={`rounded-[22px] bg-[#121214] border p-6 flex flex-col justify-between transition-all relative ${
              activeUserTier === 'enterprise' ? 'border-[#4A6FA5]' : 'border-[#232836] hover:border-[#4A6FA5]/40'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#181A22] border border-[#232836] text-[#4A6FA5]">
                  {pricingData.enterprise.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#4A6FA5] bg-[#181A22] px-2 py-0.5 rounded">
                  {pricingData.enterprise.storage}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#4A6FA5]" />
                  {pricingData.enterprise.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] font-mono">
                    {billingCycle === 'annual' ? pricingData.enterprise.annualEquivalentPrice : pricingData.enterprise.monthlyPrice}
                  </span>
                  <span className="text-[11px] text-[#71717A] font-mono">{pricingData.enterprise.period}</span>
                </div>
                <div className="text-[10px] font-mono text-[#71717A] mt-1">
                  {pricingData.enterprise.subtext}
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                {pricingData.enterprise.description}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-[#232836]">
                {pricingData.enterprise.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#E4E4E7]">
                    <Check className="w-3.5 h-3.5 text-[#4A6FA5] mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectTier('enterprise')}
                className="w-full py-2.5 rounded-full bg-[#181A22] hover:bg-[#232836] border border-[#4A6FA5]/40 text-xs font-semibold text-[#4A6FA5] transition-colors"
              >
                {pricingData.enterprise.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
