/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { detectRegion, Region, setPreferredRegion, REGIONS } from './lib/domains';
import { EcosystemApp, TierType } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AmberShowcase } from './components/AmberShowcase';
import { ProductGrid } from './components/ProductGrid';
import { OpenClawMesh } from './components/OpenClawMesh';
import { AuraChatbot } from './components/AuraChatbot';
import { Pricing } from './components/Pricing';
import { DashboardView } from './components/DashboardView';
import { AppDrawer } from './components/AppDrawer';
import { PasskeyModal } from './components/PasskeyModal';
import { AppModalPreview } from './components/AppModalPreview';
import { QRPairingModal } from './components/QRPairingModal';
import { Footer } from './components/Footer';
import { CheckCircle2, Sparkles, Shield } from 'lucide-react';

export default function App() {
  const [currentRegion, setCurrentRegion] = useState<Region>('in');
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const [isPasskeyModalOpen, setIsPasskeyModalOpen] = useState(false);
  const [isQRPairingModalOpen, setIsQRPairingModalOpen] = useState(false);
  const [passkeyModalMode, setPasskeyModalMode] = useState<'signin' | 'create'>('signin');
  const [activeAppPreview, setActiveAppPreview] = useState<EcosystemApp | null>(null);
  const [userTier, setUserTier] = useState<TierType>('pro');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const detected = detectRegion();
    setCurrentRegion(detected);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleRegionChange = (newRegion: Region) => {
    setCurrentRegion(newRegion);
    setPreferredRegion(newRegion);
    showToast(`Domain context switched to www.usafe.${newRegion} (${REGIONS[newRegion].currencyCode})`);
  };

  const handleOpenCreateId = () => {
    setPasskeyModalMode('create');
    setIsPasskeyModalOpen(true);
  };

  const handleOpenSignIn = () => {
    setPasskeyModalMode('signin');
    setIsPasskeyModalOpen(true);
  };

  const handleAuthSuccess = (handle: string) => {
    showToast(`Authenticated as ${handle} via WebAuthn Ed25519`);
    setActiveView('dashboard');
  };

  const handleSelectTier = (tier: TierType) => {
    setUserTier(tier);
    showToast(`Subscription tier updated to ${tier.toUpperCase()}`);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E4E4E7] font-['Plus_Jakarta_Sans'] flex flex-col selection:bg-[#DDA15E]/30 selection:text-[#F4F4F5]">
      {/* Universal Navigation */}
      <Navbar
        currentRegion={currentRegion}
        onRegionChange={handleRegionChange}
        onOpenPasskeyModal={handleOpenSignIn}
        onOpenAppDrawer={() => setIsAppDrawerOpen(true)}
        activeView={activeView}
        onToggleView={setActiveView}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'landing' ? (
          <>
            {/* Section 3.B: Hero Section with Live Attestation Terminal */}
            <Hero
              currentRegion={currentRegion}
              onOpenCreateId={handleOpenCreateId}
              onExploreEcosystem={() => scrollToSection('products')}
            />

            {/* Section 3.C: Amber OS Hardware Security Teaser */}
            <AmberShowcase />

            {/* Section 3.D: Interactive Product Suite Grid (6 squircle cards) */}
            <ProductGrid
              currentRegion={currentRegion}
              onLaunchApp={(app) => setActiveAppPreview(app)}
            />

            {/* OpenClaw Decentralized Mesh Protocol */}
            <OpenClawMesh currentRegion={currentRegion} />

            {/* Section 4.B: Standalone Ambient Aura AI Hub on Landing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A22] border border-[#232836] text-xs font-mono text-[#7E78D2]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7E78D2]" />
                  <span>CONFIDENTIAL HARDWARE ENCLAVE ASSISTANT</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#F4F4F5]">
                  Experience Aura AI Automation
                </h2>
                <p className="text-sm text-[#A1A1AA]">
                  Interact with real-time zero-knowledge task delegates running in hardware enclaves.
                </p>
              </div>
              <AuraChatbot currentRegion={currentRegion} />
            </div>

            {/* Section 5: Revised Comprehensive 4-Tier Pricing Matrix */}
            <Pricing
              currentRegion={currentRegion}
              activeUserTier={userTier}
              onSelectTier={handleSelectTier}
              onOpenQRPairing={() => setIsQRPairingModalOpen(true)}
            />
          </>
        ) : (
          /* Section 4: Reimagined User Dashboard & Settings (account.usafe.*) */
          <DashboardView
            currentRegion={currentRegion}
            onLaunchApp={(app) => setActiveAppPreview(app)}
            onUpgradeTier={() => {
              setActiveView('landing');
              setTimeout(() => scrollToSection('pricing'), 100);
            }}
            onOpenPasskeyModal={handleOpenSignIn}
            onOpenQRPairing={() => setIsQRPairingModalOpen(true)}
          />
        )}
      </main>

      {/* Global Interactive App Drawer (Amber System Dock Overlay) */}
      <AppDrawer
        isOpen={isAppDrawerOpen}
        onClose={() => setIsAppDrawerOpen(false)}
        currentRegion={currentRegion}
        onLaunchApp={(app) => setActiveAppPreview(app)}
      />

      {/* Passkey / FIDO2 uAuth SSO Dialog */}
      <PasskeyModal
        isOpen={isPasskeyModalOpen}
        onClose={() => setIsPasskeyModalOpen(false)}
        currentRegion={currentRegion}
        onSuccessAuth={handleAuthSuccess}
        initialMode={passkeyModalMode}
        onSwitchToQRPairing={() => setIsQRPairingModalOpen(true)}
      />

      {/* Zero-Knowledge Device QR Pairing Modal */}
      <QRPairingModal
        isOpen={isQRPairingModalOpen}
        onClose={() => setIsQRPairingModalOpen(false)}
        currentRegion={currentRegion}
      />

      {/* Sandboxed Interactive Webview Preview for Launched Apps */}
      <AppModalPreview
        app={activeAppPreview}
        onClose={() => setActiveAppPreview(null)}
        currentRegion={currentRegion}
      />

      {/* Footer */}
      <Footer
        currentRegion={currentRegion}
        onRegionChange={handleRegionChange}
        onOpenPasskeyModal={handleOpenSignIn}
        onOpenAppDrawer={() => setIsAppDrawerOpen(true)}
      />

      {/* Cryptographic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181A22] border border-[#52B788] text-[#F4F4F5] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-mono text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#52B788] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
