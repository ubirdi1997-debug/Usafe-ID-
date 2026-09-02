import { Region } from './lib/domains';

export type TierType = 'free' | 'amber_early' | 'pro' | 'enterprise';

export type AdminRole = 'SuperAdmin' | 'MeshOperator' | 'SecurityAuditor' | 'ContentManager';

export interface UserProfile {
  handle: string; // e.g., "alex.vance@amber.id"
  displayName: string;
  enclaveId: string;
  fingerprint: string;
  isHardwareRooted: boolean;
  tier: TierType;
  storageUsedBytes: number;
  storageQuotaBytes: number;
  nodeLocation: string;
  duressArmed: boolean;
  activePasskeys: number;
}

export interface EcosystemApp {
  id: string;
  name: string;
  cleanName: string;
  subdomainKey: string;
  category: 'core' | 'flagship' | 'workspace' | 'utility';
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  badge?: string;
  isFlagship?: boolean;
  isSystemUtility?: boolean;
  features: string[];
  metrics: string;
}

export interface AuraChatMessage {
  id: string;
  sender: 'user' | 'aura' | 'system';
  content: string;
  timestamp: string;
  status?: 'executing' | 'verified' | 'enclave_signed' | 'error';
  commandType?: 'summarize' | 'draft-mail' | 'check-mesh' | 'crash-logs' | 'custom';
  meta?: {
    nodeId?: string;
    executionTimeMs?: number;
    signature?: string;
    actionResult?: {
      title: string;
      details: string[];
      codeBlock?: string;
    };
  };
}

export interface MeshNode {
  id: string;
  city: string;
  country: string;
  ipMask: string;
  latencyMs: number;
  hops: number;
  status: 'active' | 'synced' | 'routing' | 'draining' | 'isolated';
  bandwidth: string;
  ed25519Key: string;
  asn: string;
  activeRelays: number;
  uptimePercent: number;
}

export interface CrashEvent {
  id: string;
  timestamp: string;
  sourceModule: 'AmberOS-Kernel' | 'Amber-Pico' | 'uChat-Core' | 'Kite-WASM' | 'uWorkspace' | 'OpenClaw-Relay';
  faultType: string;
  sanitizedStack: string;
  enclaveIsolationTag: string;
  memoryDumpState: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'isolated' | 'triaged' | 'resolved';
}

export interface ApiEndpointSpec {
  id: string;
  method: 'GET' | 'POST' | 'WSS';
  path: string;
  subdomain: string;
  title: string;
  summary: string;
  requestHeaders: Record<string, string>;
  requestBodySample: string;
  responseStatus: number;
  responseSample: string;
}

export interface ChangelogSection {
  category: string;
  items: string[];
}

export interface ChangelogRelease {
  version: string;
  releaseName: string;
  date: string;
  status: 'PRODUCTION' | 'STABLE' | 'LTS' | 'HOTFIX' | 'BETA';
  buildHash: string;
  signedBy: string;
  summary: string;
  tags: string[];
  metrics?: {
    activeNodes?: number | string;
    verifiedPasskeys?: number | string;
    piiScrubbingRate?: string;
    averageLatency?: string;
    passkeyAuthTime?: string;
    supportedEnclaves?: number;
    currencyProfiles?: number;
    p2pTunnelSpeed?: string;
    globalEgressHops?: string;
    meshBandwidth?: string;
    modelContext?: string;
    telemetryCollected?: string;
    e2eeDocsLatency?: string;
    driveChunkSize?: string;
    mailEncryption?: string;
    appsDeployed?: number;
    enclaveBootTime?: string;
    ramFootprint?: string;
    certifiedSecurity?: string;
    kernelVersion?: string;
  };
  sections: ChangelogSection[];
}

export interface ChangelogDocument {
  project: string;
  repository: string;
  rootEnclavePki: string;
  lastSyncedAt: string;
  releases: ChangelogRelease[];
}

