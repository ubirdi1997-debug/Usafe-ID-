import { EcosystemApp, MeshNode, UserProfile } from '../types';

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: 'kite',
    name: 'Kite Browser',
    cleanName: 'Kite',
    subdomainKey: 'kite',
    category: 'flagship',
    tagline: 'Zero-Telemetry Sovereign Web Engine',
    description: 'Sandboxed browser runtime with hardware-enclave isolated tabs, tracker neutralization, canvas fingerprint scrambling, and zero telemetry.',
    iconName: 'Compass',
    accentColor: '#DDA15E',
    badge: 'FLAGSHIP ENGINE',
    isFlagship: true,
    features: [
      'Ephemeral container isolation per domain',
      'Canvas & WebGL noise injection',
      'Encrypted DNS over OpenClaw mesh',
      'Native ad & surveillance script blocker'
    ],
    metrics: '0.00 KB telemetry emitted'
  },
  {
    id: 'uchat',
    name: 'uChat',
    cleanName: 'uChat',
    subdomainKey: 'uchat',
    category: 'flagship',
    tagline: 'Double-Ratchet Sovereign Communications',
    description: 'Post-quantum end-to-end encrypted messaging, decentralized peer voice/video mesh, and self-destructing dispatches without phone numbers.',
    iconName: 'MessageSquareLock',
    accentColor: '#52B788',
    badge: 'POST-QUANTUM E2EE',
    isFlagship: true,
    features: [
      'Signal Double-Ratchet + Kyber-1024 encryption',
      'Zero central phone number requirements',
      'Decentralized P2P voice & video relay',
      'Timed cryptographic message burn'
    ],
    metrics: '256-bit Hardware Keystore'
  },
  {
    id: 'upay',
    name: 'uPay',
    cleanName: 'uPay',
    subdomainKey: 'upay',
    category: 'flagship',
    tagline: 'Enclave-Secured Digital Vault & Payments',
    description: 'Hardware tokenized payments with dynamic single-use NFC cryptograms, offline peer-to-peer vouchers, and zero merchant tracking.',
    iconName: 'ShieldCheck',
    accentColor: '#BC6C25',
    badge: 'TOKENIZED NFC',
    isFlagship: true,
    features: [
      'Single-use ephemeral cryptograms',
      'SE050 Secure Element token storage',
      'Offline cryptographic peer transfers',
      'Zero purchase history telemetry'
    ],
    metrics: 'Zero-Knowledge Attestation'
  },
  {
    id: 'office',
    name: 'Workspace by uSafe',
    cleanName: 'uWorkspace',
    subdomainKey: 'office',
    category: 'workspace',
    tagline: 'Sovereign Productivity & Office Cloud',
    description: 'Full-featured collaborative suite featuring uDocs, uSheets, uSlides, and uMail. Client-side encrypted with real-time CRDT sync.',
    iconName: 'Briefcase',
    accentColor: '#4A6FA5',
    badge: 'COLLABORATIVE SUITE',
    isFlagship: true,
    features: [
      'uDocs, uSheets, uSlides & uMail client suite',
      'Client-side ChaCha20-Poly1305 encryption',
      'Offline-first real-time CRDT synchronization',
      'Hardware-signed document certifications'
    ],
    metrics: 'Zero Server-Side Decryption'
  },
  {
    id: 'notes',
    name: 'Notes by uSafe',
    cleanName: 'Notes',
    subdomainKey: 'notes',
    category: 'utility',
    tagline: 'Local-First Markdown Studio',
    description: 'Rapid-fire markdown notebook with bidirectional wiki links, LaTeX math equations, offline storage, and peer mesh sync.',
    iconName: 'FileText',
    accentColor: '#7E78D2',
    badge: 'LOCAL-FIRST CRDT',
    isSystemUtility: true,
    features: [
      'Live markdown rendering & math formulas',
      'Bidirectional graph knowledge mapping',
      'Encrypted attachment vaults',
      'Zero cloud dependency mode'
    ],
    metrics: 'IndexedDB + Enclave Keys'
  },
  {
    id: 'launcher',
    name: 'Amber Launcher for Desktop',
    cleanName: 'Desktop Launcher',
    subdomainKey: 'account',
    category: 'core',
    tagline: 'Native Sovereign Desktop Shell (Tauri 2.0)',
    description: 'Lightweight, memory-safe native desktop runtime for Windows, macOS, and Linux with kernel isolation and hardware token bridging.',
    iconName: 'Cpu',
    accentColor: '#E07A5F',
    badge: 'TAURI 2.0 RUNTIME',
    features: [
      'Rust-backed micro-kernel architecture',
      'Direct FIDO2 / YubiKey / TPM2 hardware binding',
      'System-wide OpenClaw mesh proxying',
      'Ultra-low 18MB RAM footprint'
    ],
    metrics: 'Windows • macOS • Linux'
  },
  // Clean System Utilities for Amber System Dock
  {
    id: 'camera',
    name: 'Camera',
    cleanName: 'Camera',
    subdomainKey: 'account',
    category: 'utility',
    tagline: 'Zero-Telemetry Imaging Pipeline',
    description: 'Hardware sensor direct capture with automated EXIF scrub, biometric face scrambling option, and encrypted storage stream.',
    iconName: 'Camera',
    accentColor: '#DDA15E',
    isSystemUtility: true,
    features: [
      'Zero Google/OEM tracking telemetry',
      'Automated location & EXIF metadata stripping',
      'Direct-to-Enclave photo encryption',
      'Live sensor killswitch support'
    ],
    metrics: 'Isolated Sensor Driver'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    cleanName: 'Gallery',
    subdomainKey: 'account',
    category: 'utility',
    tagline: 'Local NPU Clustered Media Vault',
    description: 'On-device neural engine photo clustering, private hidden vaults, and biometric compartmentalization without cloud upload.',
    iconName: 'Image',
    accentColor: '#52B788',
    isSystemUtility: true,
    features: [
      '100% on-device local NPU object recognition',
      'Zero cloud image analysis or training',
      'Decoy gallery folders for duress protection',
      'Hardware-authenticated albums'
    ],
    metrics: 'Local Neural Pipeline'
  },
  {
    id: 'files',
    name: 'Files',
    cleanName: 'Files',
    subdomainKey: 'account',
    category: 'utility',
    tagline: 'Hardware-Encrypted Storage Vault',
    description: 'Hierarchical file manager with per-directory key derivation, shredding capabilities, and peer-to-peer zero-knowledge transfers.',
    iconName: 'FolderLock',
    accentColor: '#4A6FA5',
    isSystemUtility: true,
    features: [
      'AES-256-GCM + Argon2id key derivation',
      'Instant 7-pass DOD cryptographic file shredder',
      'Zero-knowledge OpenClaw mesh air-drop',
      'Granular partition mounting'
    ],
    metrics: 'Encrypted at Rest'
  },
  {
    id: 'aura',
    name: 'Aura AI',
    cleanName: 'Aura AI',
    subdomainKey: 'aura',
    category: 'flagship',
    tagline: 'Zero-Telemetry Sovereign AI Assistant',
    description: 'Confidential computing AI agent running inside hardware enclaves. Analyzes documents, drafts encrypted dispatches, and checks mesh health.',
    iconName: 'Sparkles',
    accentColor: '#7E78D2',
    badge: 'ENCLAVE AI',
    isFlagship: true,
    features: [
      'Confidential hardware enclave execution',
      'Zero model weight retraining on user data',
      'Local tokenizer & client-side sanitization',
      'Autonomous system & mesh command integration'
    ],
    metrics: 'Zurich-04 Enclave Node'
  }
];

export const INITIAL_USER: UserProfile = {
  handle: 'alex.vance@amber.id',
  displayName: 'Alex Vance',
  enclaveId: 'ENC-SE050-8842-ZURICH',
  fingerprint: 'ed25519:7f8a...3b21',
  isHardwareRooted: true,
  tier: 'pro',
  storageUsedBytes: 18.4 * 1024 * 1024 * 1024, // 18.4 GB
  storageQuotaBytes: 100 * 1024 * 1024 * 1024, // 100 GB
  nodeLocation: 'Zurich (CH-04 Enclave)',
  duressArmed: true,
  activePasskeys: 3,
};

export const MESH_NODES: MeshNode[] = [
  {
    id: 'node-zrh-04',
    city: 'Zurich',
    country: 'Switzerland',
    ipMask: '194.182.***.***',
    latencyMs: 14,
    hops: 1,
    status: 'active',
    bandwidth: '9.4 Gbps',
    ed25519Key: 'zrh4_f8902c31e',
  },
  {
    id: 'node-tyo-09',
    city: 'Tokyo',
    country: 'Japan',
    ipMask: '133.242.***.***',
    latencyMs: 62,
    hops: 2,
    status: 'active',
    bandwidth: '8.1 Gbps',
    ed25519Key: 'tyo9_83a1b02de',
  },
  {
    id: 'node-rjk-02',
    city: 'Reykjavik',
    country: 'Iceland',
    ipMask: '185.112.***.***',
    latencyMs: 28,
    hops: 1,
    status: 'active',
    bandwidth: '12.0 Gbps',
    ed25519Key: 'rjk2_11bc90a42',
  },
  {
    id: 'node-bom-07',
    city: 'Mumbai',
    country: 'India',
    ipMask: '103.14.***.***',
    latencyMs: 9,
    hops: 1,
    status: 'active',
    bandwidth: '10.5 Gbps',
    ed25519Key: 'bom7_99df34e12',
  },
  {
    id: 'node-sin-03',
    city: 'Singapore',
    country: 'Singapore',
    ipMask: '128.199.***.***',
    latencyMs: 38,
    hops: 2,
    status: 'synced',
    bandwidth: '7.8 Gbps',
    ed25519Key: 'sin3_74ba902ef',
  },
  {
    id: 'node-fra-05',
    city: 'Frankfurt',
    country: 'Germany',
    ipMask: '159.69.***.***',
    latencyMs: 19,
    hops: 1,
    status: 'active',
    bandwidth: '11.2 Gbps',
    ed25519Key: 'fra5_551c890ab',
  },
];
