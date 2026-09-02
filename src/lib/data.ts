import { EcosystemApp, MeshNode, UserProfile, CrashEvent, ApiEndpointSpec } from '../types';

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
    id: 'node_zrh_04',
    city: 'Zurich',
    country: 'Switzerland',
    ipMask: '194.182.***.***',
    latencyMs: 14,
    hops: 1,
    status: 'active',
    bandwidth: '9.4 Gbps',
    ed25519Key: 'zrh4_f8902c31e9a041cb83d',
    asn: 'AS5577 (Init7 CH)',
    activeRelays: 1420,
    uptimePercent: 99.998,
  },
  {
    id: 'node_tyo_09',
    city: 'Tokyo',
    country: 'Japan',
    ipMask: '133.242.***.***',
    latencyMs: 62,
    hops: 2,
    status: 'active',
    bandwidth: '8.1 Gbps',
    ed25519Key: 'tyo9_83a1b02de7142fa990c',
    asn: 'AS2514 (NTT Communications)',
    activeRelays: 890,
    uptimePercent: 99.994,
  },
  {
    id: 'node_rjk_02',
    city: 'Reykjavik',
    country: 'Iceland',
    ipMask: '185.112.***.***',
    latencyMs: 28,
    hops: 1,
    status: 'active',
    bandwidth: '12.0 Gbps',
    ed25519Key: 'rjk2_11bc90a42df9841e219',
    asn: 'AS44925 (1984 Web Hosting)',
    activeRelays: 1840,
    uptimePercent: 99.999,
  },
  {
    id: 'node_bom_07',
    city: 'Mumbai',
    country: 'India',
    ipMask: '103.14.***.***',
    latencyMs: 9,
    hops: 1,
    status: 'active',
    bandwidth: '10.5 Gbps',
    ed25519Key: 'bom7_99df34e12c5541ba302',
    asn: 'AS4755 (Tata Communications)',
    activeRelays: 2410,
    uptimePercent: 99.995,
  },
  {
    id: 'node_sin_03',
    city: 'Singapore',
    country: 'Singapore',
    ipMask: '128.199.***.***',
    latencyMs: 38,
    hops: 2,
    status: 'synced',
    bandwidth: '7.8 Gbps',
    ed25519Key: 'sin3_74ba902ef19024ca881',
    asn: 'AS4657 (StarHub Ltd)',
    activeRelays: 630,
    uptimePercent: 99.989,
  },
  {
    id: 'node_fra_05',
    city: 'Frankfurt',
    country: 'Germany',
    ipMask: '159.69.***.***',
    latencyMs: 19,
    hops: 1,
    status: 'active',
    bandwidth: '11.2 Gbps',
    ed25519Key: 'fra5_551c890ab82711dc409',
    asn: 'AS24940 (Hetzner Online)',
    activeRelays: 2190,
    uptimePercent: 99.997,
  },
];

export const INITIAL_CRASH_EVENTS: CrashEvent[] = [
  {
    id: 'crash_89f01a',
    timestamp: '2026-09-02T02:41:18Z',
    sourceModule: 'AmberOS-Kernel',
    faultType: 'SIGSEGV in Isolated strongbox_key_derive()',
    sanitizedStack: `[KERNEL_PANIC_ISOLATED] 0x7fff89a0 -> strongbox.c:142
  caller: <SANITIZED_CALLER_0x11>
  hardware_enclave: NXP_SE050_ACTIVE
  pii_scrubbed: 100% (serial, ip, user tokens stripped)
  dump_hash: sha256:7f81a...bc90`,
    enclaveIsolationTag: 'STRONG_BOX_KEYSTORE_SAFE',
    memoryDumpState: 'CLEARED_FROM_RAM',
    severity: 'warning',
    status: 'isolated',
  },
  {
    id: 'crash_77c24b',
    timestamp: '2026-09-02T02:15:02Z',
    sourceModule: 'Amber-Pico',
    faultType: 'Pico Heap Limit Exceeded (<16MB RAM Boundary)',
    sanitizedStack: `[PICO_OUT_OF_BOUNDS] Available: 1.2MB, Requested: 4.8MB
  action: Automatically offloaded to Tier-2 BLE Phone NPU
  task_id: compute_delegation_90a1
  status: Handshake Successful, zero user disruption`,
    enclaveIsolationTag: 'BLE_DELEGATION_RECOVERED',
    memoryDumpState: 'RAM_ZEROED',
    severity: 'info',
    status: 'resolved',
  },
  {
    id: 'crash_62b11e',
    timestamp: '2026-09-02T01:50:44Z',
    sourceModule: 'OpenClaw-Relay',
    faultType: 'WSS Ephemeral Socket Timeout on node_reykjavik_02',
    sanitizedStack: `[MESH_SOCKET_TIMEOUT] socket_id: stream_5f8a01
  hops_rerouted: node_reykjavik_02 -> node_zurich_04
  packet_loss: 0.00%
  crypto_cipher: XChaCha20-Poly1305 unbroken`,
    enclaveIsolationTag: 'MULTI_HOP_AUTO_HEAL',
    memoryDumpState: 'EPHEMERAL_SOCKET_CLOSED',
    severity: 'info',
    status: 'triaged',
  },
  {
    id: 'crash_51a99d',
    timestamp: '2026-09-02T00:12:30Z',
    sourceModule: 'uChat-Core',
    faultType: 'Double-Ratchet Out-of-Order Packet Sequence Drop',
    sanitizedStack: `[RATCHET_SKIP_KEY] sequence_gap: 3 packets
  ephemeral_key_chain: ratcheted_forward_safely
  decryption_integrity: preserved (zero plaintexts leaked)`,
    enclaveIsolationTag: 'SIGNAL_PROTOCOL_INTEACT',
    memoryDumpState: 'KEYS_PURGED',
    severity: 'warning',
    status: 'resolved',
  },
];

export const API_ENDPOINTS: ApiEndpointSpec[] = [
  {
    id: 'auth_register',
    method: 'POST',
    path: '/v1/auth/register',
    subdomain: 'auth.usafe.*',
    title: 'Device Onboarding & Public Key Ledger Entry',
    summary: 'First-time Amber OS device registration and @amber.id public key ledger entry with StrongBox attestation blob.',
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-uSafe-Attestation': '<Hardware_Enclave_StrongBox_Attestation_Blob>',
    },
    requestBodySample: JSON.stringify(
      {
        handle: 'user@amber.id',
        public_key: 'MCowBQYDK2VwAyEA9Y8gH... (Ed25519 32-byte pubkey)',
        key_algorithm: 'Ed25519',
        client_device_meta: {
          os_version: 'AmberOS-17',
          device_fingerprint: 'a4f89c02e881',
        },
      },
      null,
      2
    ),
    responseStatus: 201,
    responseSample: JSON.stringify(
      {
        status: 'success',
        user_id: 'uid_98f12a884c7e4a11',
        handle: 'user@amber.id',
        created_at: '2026-09-02T03:30:00Z',
      },
      null,
      2
    ),
  },
  {
    id: 'auth_challenge',
    method: 'POST',
    path: '/v1/auth/challenge',
    subdomain: 'auth.usafe.*',
    title: 'Generate Anti-Replay WebAuthn Challenge',
    summary: 'Issues an anti-replay cryptographic nonce for FIDO2 passkey hardware authentication.',
    requestHeaders: {
      'Content-Type': 'application/json',
    },
    requestBodySample: JSON.stringify(
      {
        handle: 'user@amber.id',
        intent: 'AUTHENTICATE',
      },
      null,
      2
    ),
    responseStatus: 200,
    responseSample: JSON.stringify(
      {
        challenge_id: 'ch_77b01fa6',
        challenge_nonce: 'dGhpcy1pcy1hLWZpZG8yLW5vbmNl',
        timeout_seconds: 60,
      },
      null,
      2
    ),
  },
  {
    id: 'auth_verify',
    method: 'POST',
    path: '/v1/auth/passkey/verify',
    subdomain: 'auth.usafe.*',
    title: 'Validate FIDO2 Hardware Enclave Assertion',
    summary: 'Validates client FIDO2 hardware assertion signed by the NXP SE050 / StrongBox secure enclave.',
    requestHeaders: {
      'Content-Type': 'application/json',
    },
    requestBodySample: JSON.stringify(
      {
        challenge_id: 'ch_77b01fa6',
        client_data_json: 'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0Ii...',
        authenticator_data: 'SZYN5YgOJGh0NBcPZhZgW4...',
        signature: 'MEQCIG7/z6T... (Ed25519 signature)',
        user_handle: 'user@amber.id',
      },
      null,
      2
    ),
    responseStatus: 200,
    responseSample: JSON.stringify(
      {
        verified: true,
        auth_code: 'code_89acfe9931b2',
        expires_in: 300,
      },
      null,
      2
    ),
  },
  {
    id: 'auth_token',
    method: 'POST',
    path: '/v1/auth/token',
    subdomain: 'auth.usafe.*',
    title: 'OAuth 2.0 PKCE Stateless PASETO v4 Token Handoff',
    summary: 'Exchanges authorization code for stateless PASETO v4 tokens (sub, scope, exp) with zero database read bottlenecks.',
    requestHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestBodySample: `grant_type=authorization_code
&client_id=com.amberos.workspace
&code=code_89acfe9931b2
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
&redirect_uri=amber-auth://callback`,
    responseStatus: 200,
    responseSample: JSON.stringify(
      {
        access_token: 'v4.public.eyJzdWIiOiJ1aWRfOThmMTJhODgiLCJpc3MiOiJhdXRoLnVzYWZlLmluIiwiZXhwIjoxNzg4MzQ4ODAwLCJzY29wZSI6Im9wZW5pZCBzdG9yYWdlLm1lc2gifQ...',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'v4.k3.local.ref_44901bce771a98bc...',
        id_token: 'v4.public.id_token_payload_ed25519_signed...',
        scope: 'openid profile storage.workspace mesh.relay',
      },
      null,
      2
    ),
  },
  {
    id: 'auth_revoke',
    method: 'POST',
    path: '/v1/auth/revoke',
    subdomain: 'auth.usafe.*',
    title: 'Emergency Duress PIN / Session Revocation',
    summary: 'Immediately purges session tokens and activates Duress self-clearing across active relay nodes.',
    requestHeaders: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer v4.public.eyJzdWIiOiJ1aWRfOThmMTJhODgi...',
    },
    requestBodySample: JSON.stringify(
      {
        token: 'v4.public.eyJzdWIiOiJ1aWRfOThmMTJhODgi...',
        token_type_hint: 'access_token',
        reason: 'DURESS_PURGE',
      },
      null,
      2
    ),
    responseStatus: 200,
    responseSample: JSON.stringify(
      {
        status: 'revoked',
        purged_at: '2026-09-02T03:30:15Z',
        relay_nodes_notified: 6,
      },
      null,
      2
    ),
  },
  {
    id: 'bridge_google',
    method: 'POST',
    path: '/v1/bridge/google',
    subdomain: 'auth.usafe.*',
    title: 'Zero-Knowledge 3rd-Party Google Bridge',
    summary: 'Links secondary cloud accounts (Gmail relay, Drive metadata) in zero-knowledge enclave without leaking master keys.',
    requestHeaders: {
      'Content-Type': 'application/json',
    },
    requestBodySample: JSON.stringify(
      {
        amber_id_token: 'v4.public.id_token_payload...',
        google_id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI...',
        sync_preferences: {
          mail_relay: true,
          drive_metadata: false,
        },
      },
      null,
      2
    ),
    responseStatus: 200,
    responseSample: JSON.stringify(
      {
        status: 'bridged',
        bridge_id: 'br_google_55a29f',
        masked_identity: 'user.work@gmail.com',
        isolation_status: 'ZERO_KNOWLEDGE_ENFORCED',
      },
      null,
      2
    ),
  },
  {
    id: 'mesh_tunnel',
    method: 'WSS',
    path: '/v1/mesh/tunnel',
    subdomain: 'api.usafe.*',
    title: 'Multi-Hop WebSocket Tunnel Handshake (XChaCha20)',
    summary: 'Decentralized multi-hop socket tunnel for client traffic cloaking and onion routing.',
    requestHeaders: {
      Authorization: 'Bearer <paseto_access_token>',
      'X-OpenClaw-Node-ID': 'node_zurich_04',
      'X-Ephemeral-Pubkey': 'MCowBQYDK2VwAyEA9Y8gH...',
    },
    requestBodySample: JSON.stringify(
      {
        action: 'INITIATE_RELAY_STREAM',
        stream_id: 'stream_5f8a01',
        egress_strategy: 'MULTI_HOP_RANDOMIZED',
        encryption: 'XChaCha20-Poly1305',
        ephemeral_nonce: '9a7fbc28d1109a01',
        target_hops: ['node_reykjavik_02', 'node_zurich_04'],
      },
      null,
      2
    ),
    responseStatus: 101,
    responseSample: JSON.stringify(
      {
        status: 'STREAM_CONNECTED',
        stream_id: 'stream_5f8a01',
        cipher: 'XChaCha20-Poly1305',
        egress_ip_masked: '185.112.***.*** (Reykjavik)',
        latency_ms: 28,
      },
      null,
      2
    ),
  },
  {
    id: 'mesh_compute_delegate',
    method: 'POST',
    path: '/v1/mesh/compute/delegate',
    subdomain: 'api.usafe.*',
    title: 'Amber Pico (<16MB) Blind Compute Delegation',
    summary: 'Offloads high-computation AI inference from constrained Amber Pico hardware into ephemeral blind compute chambers.',
    requestHeaders: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer <paseto_access_token>',
    },
    requestBodySample: JSON.stringify(
      {
        task_type: 'TEXT_SUMMARIZATION',
        execution_tier: 'EPHEMERAL_COMPUTE_CHAMBER',
        encrypted_token_diff: 'U2FsdGVkX19q89fA1b... (AES-GCM-256)',
        return_route_pubkey: 'MCowBQYDK2VwAyEA9Y8gH...',
      },
      null,
      2
    ),
    responseStatus: 200,
    responseSample: JSON.stringify(
      {
        status: 'COMPUTED',
        processing_node: 'node_mumbai_09',
        blind_result_envelope: 'U2FsdGVkX18749ab... (Encrypted with return_route_pubkey)',
        telemetry_scrubbed: true,
      },
      null,
      2
    ),
  },
];
