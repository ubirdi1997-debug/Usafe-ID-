import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Fingerprint,
  X,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Lock,
  QrCode,
  Radio,
  Zap
} from 'lucide-react';
import { Region } from '../lib/domains';

interface PasskeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: Region;
  onSuccessAuth: (handle: string) => void;
  initialMode?: 'signin' | 'create';
  onSwitchToQRPairing?: () => void;
}

export const PasskeyModal: React.FC<PasskeyModalProps> = ({
  isOpen,
  onClose,
  currentRegion,
  onSuccessAuth,
  initialMode = 'signin',
  onSwitchToQRPairing,
}) => {
  const [mode, setMode] = useState<'signin' | 'create'>(initialMode);
  const [handleInput, setHandleInput] = useState('alex.vance');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [keyPairGenerated, setKeyPairGenerated] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState<number>(0);
  const [scanProgress, setScanProgress] = useState<number>(0);

  // Sync mode with initialMode if it changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticating(false);
      setAuthSuccess(false);
      setScanStep(0);
      setScanProgress(0);
      setKeyPairGenerated(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const runBiometricScanSequence = () => {
    if (isAuthenticating || authSuccess) return;
    setIsAuthenticating(true);
    setScanStep(1);
    setScanProgress(15);

    // 0ms - 500ms: Query Authenticator & User Verification prompt (UV flag)
    setTimeout(() => {
      setScanStep(2);
      setScanProgress(45);
    }, 500);

    // 500ms - 1200ms: Optical/Capacitive Biometric Ridge Mapping
    setTimeout(() => {
      setScanStep(3);
      setScanProgress(75);
    }, 1200);

    // 1200ms - 1700ms: Enclave Keystore Signature (Ed25519)
    setTimeout(() => {
      setScanStep(4);
      setScanProgress(90);
    }, 1700);

    // Exact 2.0-second mark (2000ms): Hardware assertion verified successfully
    setTimeout(() => {
      const generatedFingerprint =
        'ed25519:7f8a' + Math.floor(Math.random() * 9000 + 1000) + '...3b21';
      setKeyPairGenerated(generatedFingerprint);
      setScanStep(5);
      setScanProgress(100);
      setIsAuthenticating(false);
      setAuthSuccess(true);

      setTimeout(() => {
        const fullHandle = handleInput.includes('@') ? handleInput : `${handleInput}@amber.id`;
        onSuccessAuth(fullHandle);
        onClose();
        setAuthSuccess(false);
      }, 1200);
    }, 2000);
  };

  const handleStartPasskeyAuth = (e: React.FormEvent) => {
    e.preventDefault();
    runBiometricScanSequence();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0E10]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#121214] border border-[#232836] rounded-[24px] shadow-2xl p-6 sm:p-7 relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DDA15E] to-transparent opacity-40" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#232836]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#181A22] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
                  uAuth SSO Passkey Gateway
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/30">
                  FIDO2 L3
                </span>
              </div>
              <div className="font-mono text-[10px] text-[#71717A]">
                auth.usafe.{currentRegion} • SE050 Hardware Keystore
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#232836] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-[#0E0E10] p-1 rounded-full border border-[#232836] my-5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 rounded-full transition-all ${
              mode === 'signin'
                ? 'bg-[#181A22] text-[#DDA15E] border border-[#232836] font-semibold'
                : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
            }`}
          >
            Sign In with Passkey
          </button>
          <button
            type="button"
            onClick={() => setMode('create')}
            className={`flex-1 py-1.5 rounded-full transition-all ${
              mode === 'create'
                ? 'bg-[#181A22] text-[#52B788] border border-[#232836] font-semibold'
                : 'text-[#A1A1AA] hover:text-[#E4E4E7]'
            }`}
          >
            Create @amber.id
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleStartPasskeyAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#A1A1AA] mb-1.5">
              {mode === 'create' ? 'Choose Sovereign Username:' : 'Enter Sovereign uID:'}
            </label>
            <div className="flex items-center bg-[#0E0E10] border border-[#232836] rounded-xl px-3.5 py-2.5 focus-within:border-[#DDA15E] transition-colors">
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                placeholder="username"
                className="bg-transparent text-sm text-[#F4F4F5] placeholder-[#71717A] focus:outline-none flex-1 font-mono"
                required
              />
              <span className="text-xs font-mono text-[#DDA15E] select-none">@amber.id</span>
            </div>
          </div>

          {/* Biometric Interactive Unlock / Glowing Scanner Viewport */}
          <div
            onClick={runBiometricScanSequence}
            className="p-5 rounded-2xl bg-[#0E0E10] border border-[#232836] text-center space-y-3.5 relative overflow-hidden group cursor-pointer hover:border-[#DDA15E]/60 transition-all duration-300"
          >
            {/* Background Ambient Radial Glow */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                authSuccess
                  ? 'bg-[radial-gradient(circle_at_center,rgba(82,183,136,0.25)_0%,transparent_70%)] opacity-100'
                  : isAuthenticating
                  ? 'bg-[radial-gradient(circle_at_center,rgba(221,161,94,0.25)_0%,transparent_70%)] opacity-100'
                  : 'opacity-0 group-hover:opacity-60 bg-[radial-gradient(circle_at_center,rgba(221,161,94,0.12)_0%,transparent_70%)]'
              }`}
            />

            {/* Glowing Circular Fingerprint Scanner Target */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              {/* Outer Glowing Pulse Waves (Fires when active) */}
              {isAuthenticating && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-[#DDA15E] animate-ping opacity-40 pointer-events-none" />
                  <div className="absolute -inset-2 rounded-full border border-[#DDA15E]/50 animate-pulse pointer-events-none" />
                </>
              )}

              {/* Rotating Holographic Orbital Scan Rings */}
              {isAuthenticating && (
                <div className="absolute inset-0 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '2s' }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#DDA15E"
                      strokeWidth="2"
                      strokeDasharray="18 12"
                      strokeLinecap="round"
                      className="opacity-80 shadow-[0_0_8px_#DDA15E]"
                    />
                    <circle cx="50" cy="4" r="3" fill="#DDA15E" className="filter drop-shadow-[0_0_6px_#DDA15E]" />
                  </svg>
                </div>
              )}

              {/* Counter-rotating Secondary Ring */}
              {isAuthenticating && (
                <div className="absolute inset-2 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#52B788"
                      strokeWidth="1.5"
                      strokeDasharray="10 18"
                      strokeLinecap="round"
                      className="opacity-70"
                    />
                  </svg>
                </div>
              )}

              {/* Static Glowing Orbit Ring on Idle */}
              {!isAuthenticating && !authSuccess && (
                <div className="absolute inset-0 rounded-full border border-[#232836] group-hover:border-[#DDA15E]/50 transition-colors pointer-events-none">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#232836]/80" />
                </div>
              )}

              {/* Inner Scanner Core */}
              <div
                className={`w-20 h-20 rounded-full bg-[#181A22] border transition-all duration-300 flex items-center justify-center relative overflow-hidden shadow-inner ${
                  authSuccess
                    ? 'border-[#52B788] shadow-[0_0_20px_rgba(82,183,136,0.35)]'
                    : isAuthenticating
                    ? 'border-[#DDA15E] shadow-[0_0_20px_rgba(221,161,94,0.35)]'
                    : 'border-[#232836] group-hover:border-[#DDA15E]/60'
                }`}
              >
                {/* Laser Scanning Beam Sweep */}
                {isAuthenticating && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DDA15E] to-transparent shadow-[0_0_12px_#DDA15E] animate-[bounce_1s_infinite] z-20 pointer-events-none" />
                )}

                {/* Radar Conical Gradient Sweep */}
                {isAuthenticating && (
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-25 animate-spin"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(221,161,94,0.6) 0deg, transparent 60deg, transparent 360deg)',
                      animationDuration: '1.2s'
                    }}
                  />
                )}

                {authSuccess ? (
                  <div className="w-12 h-12 rounded-full bg-[#52B788]/20 border border-[#52B788]/40 flex items-center justify-center animate-in zoom-in-75 duration-300">
                    <CheckCircle2 className="w-7 h-7 text-[#52B788]" />
                  </div>
                ) : (
                  <div className="relative">
                    {/* Stylized Vector Biometric Fingerprint Ridge Render */}
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-11 h-11 transition-colors duration-300 ${
                        isAuthenticating
                          ? 'text-[#DDA15E] filter drop-shadow-[0_0_8px_rgba(221,161,94,0.8)]'
                          : 'text-[#A1A1AA] group-hover:text-[#DDA15E]'
                      }`}
                    >
                      <path
                        d="M32 8C20 8 16 16 16 26C16 38 20 46 22 54"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M48 26C48 16 44 8 32 8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="2 4"
                      />
                      <path
                        d="M24 24C24 18 27 15 32 15C37 15 40 18 40 24C40 34 38 42 42 52"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M32 22C29.5 22 28 24 28 28C28 35 30 44 32 56"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M36 28C36 32 35 38 36 46"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M48 38C46 44 45 49 46 54"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Scan Feedback & Stage Logs */}
            <div className="text-xs space-y-1.5 relative z-10">
              {authSuccess ? (
                <div className="space-y-1 animate-in fade-in">
                  <div className="text-[#52B788] font-bold font-mono text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                    <span>FIDO2 Hardware Biometric Verified</span>
                  </div>
                  <div className="text-[#A1A1AA] text-[11px] font-mono">
                    NXP SE050 Hardware Keystore • Ed25519 Signed
                  </div>
                </div>
              ) : isAuthenticating ? (
                <div className="space-y-2">
                  <div className="text-[#DDA15E] font-mono font-bold text-xs flex items-center justify-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#DDA15E]" />
                    <span>
                      {scanStep === 1 && 'Querying WebAuthn FIDO2 Authenticator...'}
                      {scanStep === 2 && 'Scanning Biometric Ridge Pattern (2.0s)...'}
                      {scanStep === 3 && 'Signing Hardware Cryptographic Challenge...'}
                      {scanStep === 4 && 'Attestation Validated by Secure Enclave...'}
                      {scanStep === 5 && 'Access Granted.'}
                    </span>
                  </div>

                  {/* 2-Second Visual Progress Bar */}
                  <div className="w-52 mx-auto h-1.5 rounded-full bg-[#181A22] border border-[#232836] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#52B788] via-[#DDA15E] to-[#52B788] transition-all duration-300 shadow-[0_0_8px_#DDA15E]"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] px-4">
                    <span>FLAG: UV=1, UP=1</span>
                    <span>CURVE: ED25519</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-[#E4E4E7] font-semibold text-xs flex items-center justify-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5 text-[#DDA15E]" />
                    <span>Touch Glowing Ring or Click Below</span>
                  </div>
                  <div className="text-[#71717A] text-[11px]">
                    Simulates 2-second FIDO2 hardware enclave biometric verification
                  </div>
                </div>
              )}
            </div>

            {keyPairGenerated && (
              <div className="text-[10px] font-mono text-[#52B788] pt-1">
                Hardware Assertion: {keyPairGenerated}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isAuthenticating || authSuccess}
            className="w-full py-3 rounded-full bg-[#DDA15E] hover:bg-[#BC6C25] disabled:opacity-50 text-[#0E0E10] font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            {isAuthenticating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying Biometric Enclave...</span>
              </>
            ) : authSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Assertion Verified</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {mode === 'create'
                    ? 'Verify Identity & Register Passkey'
                    : 'Verify Identity & Authenticate'}
                </span>
              </>
            )}
          </button>

          {onSwitchToQRPairing && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToQRPairing();
              }}
              className="w-full py-2 rounded-xl bg-[#0E0E10] border border-[#232836] hover:border-[#DDA15E]/60 text-xs font-mono text-[#DDA15E] flex items-center justify-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Or Pair Secondary Device via QR Code</span>
            </button>
          )}
        </form>

        <div className="mt-4 pt-3 border-t border-[#232836] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#52B788]" />
            <span>Secure Element Isolated</span>
          </span>
          <span className="text-[#52B788]">Zero Passwords</span>
        </div>
      </div>
    </div>
  );
};
