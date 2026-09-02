import { Region } from './lib/domains';

export type TierType = 'free' | 'amber_early' | 'pro' | 'enterprise';

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
  status: 'active' | 'synced' | 'routing';
  bandwidth: string;
  ed25519Key: string;
}
