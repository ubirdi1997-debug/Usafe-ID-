import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  Server,
  Globe,
  FileCode,
  Terminal,
  RefreshCw,
  Lock,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye,
  Trash2,
  Filter,
  Layers,
  Database,
  KeyRound,
  Cpu,
  Zap,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Check,
  History
} from 'lucide-react';
import { AdminRole, CrashEvent, MeshNode } from '../types';
import { Region, REGIONS } from '../lib/domains';
import { INITIAL_CRASH_EVENTS, MESH_NODES } from '../lib/data';
import { SystemChangelog } from './SystemChangelog';

interface AdminConsoleProps {
  currentRegion: Region;
  onClose?: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  currentRegion,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'fleet' | 'cms' | 'crashes' | 'changelog'>('telemetry');
  const [currentRole, setCurrentRole] = useState<AdminRole>('SuperAdmin');
  const [nodes, setNodes] = useState<MeshNode[]>(MESH_NODES);
  const [crashes, setCrashes] = useState<CrashEvent[]>(INITIAL_CRASH_EVENTS);
  const [selectedCrash, setSelectedCrash] = useState<CrashEvent | null>(INITIAL_CRASH_EVENTS[0]);
  const [selectedNode, setSelectedNode] = useState<MeshNode | null>(MESH_NODES[0]);

  // Terminal state
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState<string[]>([
    '[*] Connected to admin.usafe.in control plane over WSS tunnel stream_0x89',
    '[*] SuperAdmin session active: PASETO v4 token validated (Ed25519)',
    '[*] Type "help" for available node orchestration commands',
  ]);

  // CMS state
  const [cmsDomain, setCmsDomain] = useState<Region>(currentRegion);
  const [cmsHeadline, setCmsHeadline] = useState('Hardware-Rooted Zero-Knowledge Operating Suite');
  const [cmsSubtext, setCmsSubtext] = useState('NXP SE050 Hardware Keystores, FIDO2 L3 Passkeys, and Private P2P Mesh.');
  const [cmsBanner, setCmsBanner] = useState('AmberOS-17 Production Kernel Attestation Live (v2.4.0)');
  const [cmsRevalidating, setCmsRevalidating] = useState(false);
  const [cmsLastRevalidated, setCmsLastRevalidated] = useState<string>('Just now');
  const [revalidationLogs, setRevalidationLogs] = useState<string[]>([]);

  // Telemetry real-time counters
  const [activeUsersCount] = useState(14892);
  const [authRate24h] = useState(94120);
  const [duressTriggerCount] = useState(0);

  // CLI execution handler
  const handleRunCli = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    const cmd = cliInput.trim();
    const newLogs = [...cliLogs, `> ${cmd}`];

    if (cmd === 'help') {
      newLogs.push(
        'Available Commands:',
        '  mesh status              - Print live OpenClaw relay cluster health',
        '  drain --node=<id>        - Safely drain node from active onion routes',
        '  rotate-keys              - Force rotate ephemeral nonces & Kyber-1024 keys',
        '  paseto verify            - Inspect current stateless PASETO v4 session',
        '  asn block --asn=<number> - Blacklist malicious ASN from ingress',
        '  crash dump               - Stream latest anonymized kernel stack traces',
        '  clear                    - Clear terminal console'
      );
    } else if (cmd === 'mesh status') {
      newLogs.push(
        `[OK] 6/6 Global Egress Relays Healthy (Average Latency: 28.3ms)`,
        `[OK] Active Relays: 9,380 sessions | Cipher: XChaCha20-Poly1305`
      );
    } else if (cmd.startsWith('drain')) {
      const parts = cmd.split('=');
      const targetId = parts[1] || 'node_zrh_04';
      setNodes((prev) =>
        prev.map((n) => (n.id === targetId ? { ...n, status: 'draining' } : n))
      );
      newLogs.push(`[ACTION] Initiated graceful drain on ${targetId}. Traffic rerouted in 3.2s.`);
    } else if (cmd === 'rotate-keys') {
      newLogs.push(`[ACTION] Broadcasted Kyber-1024 ephemeral key rotation across all 6 relays.`);
    } else if (cmd === 'paseto verify') {
      newLogs.push(
        `[PASETO_V4_VALID] Issuer: auth.usafe.in | Subject: uid_admin_0x01 | Algorithm: Ed25519 | Expiry: +3600s`
      );
    } else if (cmd === 'clear') {
      setCliLogs([]);
      setCliInput('');
      return;
    } else {
      newLogs.push(`[ERROR] Command not recognized: "${cmd}". Type "help" for list.`);
    }

    setCliLogs(newLogs);
    setCliInput('');
  };

  // Node drain handler
  const handleDrainNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? { ...n, status: n.status === 'draining' ? 'active' : 'draining' }
          : n
      )
    );
    setCliLogs((prev) => [
      ...prev,
      `[DRAIN_TOGGLE] Node ${nodeId} status altered by ${currentRole}.`,
    ]);
  };

  // Node key rotation handler
  const handleRotateNonces = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              ed25519Key:
                n.id.substring(5, 8) + '_' + Math.random().toString(36).substring(2, 10),
            }
          : n
      )
    );
    setCliLogs((prev) => [
      ...prev,
      `[KEY_ROTATED] Node ${nodeId} nonce & Ed25519 public key rotated.`,
    ]);
  };

  // Trigger Next.js Revalidation Engine
  const handleTriggerRevalidation = () => {
    setCmsRevalidating(true);
    setRevalidationLogs([
      `[1/4] POST /api/revalidate?secret=ENC_SE050_TOKEN on ${cmsDomain === 'in' ? 'usafe.in' : 'usafe.net'}`,
      `[2/4] Executing revalidatePath('/') & revalidateTag('ecosystem-metadata')...`,
      `[3/4] Purging Cloudflare Edge HTML cache across 285 PoPs (TTFB < 20ms)...`,
      `[4/4] 200 OK — Next.js 15 ISR revalidation completed in 148ms.`,
    ]);

    setTimeout(() => {
      setCmsRevalidating(false);
      setCmsLastRevalidated(new Date().toLocaleTimeString());
    }, 1200);
  };

  return (
    <div className="bg-[#0A0B0E] text-[#F4F4F5] min-h-[90vh] p-4 sm:p-6 lg:p-8 space-y-6 font-['Plus_Jakarta_Sans']">
      {/* Top Header & Role Switcher Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232836]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14161D] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
            <Terminal className="w-5 h-5 text-[#DDA15E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#F4F4F5]">
                admin.usafe.{currentRegion} <span className="text-[#DDA15E]">Control Plane</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#52B788]/10 border border-[#52B788]/30 text-[#52B788]">
                WSS LIVE
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] font-mono">
              FIDO2 Passkey Enclave Attestation • PASETO v4 RBAC Security
            </p>
          </div>
        </div>

        {/* RBAC Role Selector */}
        <div className="flex items-center gap-3 bg-[#14161D] p-1.5 rounded-2xl border border-[#232836]">
          <div className="text-[11px] font-mono text-[#71717A] px-2 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>ROLE:</span>
          </div>
          {(['SuperAdmin', 'MeshOperator', 'SecurityAuditor', 'ContentManager'] as AdminRole[]).map((role) => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                currentRole === role
                  ? 'bg-[#DDA15E] text-[#0A0B0E] font-bold shadow-md'
                  : 'text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#181A22]'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#232836] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'telemetry'
              ? 'bg-[#14161D] text-[#DDA15E] border border-[#232836]'
              : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#DDA15E]" />
          <span>Live Telemetry & PASETO Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'fleet'
              ? 'bg-[#14161D] text-[#52B788] border border-[#232836]'
              : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
          }`}
        >
          <Server className="w-4 h-4 text-[#52B788]" />
          <span>OpenClaw Node Fleet Orchestrator</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'cms'
              ? 'bg-[#14161D] text-[#4A6FA5] border border-[#232836]'
              : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#4A6FA5]" />
          <span>Dynamic CMS & ISR Publisher</span>
        </button>

        <button
          onClick={() => setActiveTab('crashes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'crashes'
              ? 'bg-[#14161D] text-[#7E78D2] border border-[#232836]'
              : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#7E78D2]" />
          <span>Zero-Knowledge Crash Diagnostic Room</span>
        </button>

        <button
          onClick={() => setActiveTab('changelog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'changelog'
              ? 'bg-[#14161D] text-[#E07A5F] border border-[#232836]'
              : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
          }`}
        >
          <History className="w-4 h-4 text-[#E07A5F]" />
          <span>System Changelog</span>
        </button>
      </div>

      {/* TAB 1: TELEMETRY & IDENTITY HUB */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Metric Cards (22% Squircles) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>@AMBER.ID ACCOUNTS</span>
                <KeyRound className="w-4 h-4 text-[#DDA15E]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] font-mono">
                {activeUsersCount.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-[#52B788] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>+18.4% this week • Ed25519 Ledger</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>24H SSO AUTHORIZATIONS</span>
                <Zap className="w-4 h-4 text-[#52B788]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#52B788] font-mono">
                {authRate24h.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-[#A1A1AA]">
                Avg Verification: <span className="text-[#F4F4F5]">18.2ms (UV=1, UP=1)</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>ENCLAVE FLEET UPTIME</span>
                <Server className="w-4 h-4 text-[#4A6FA5]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4A6FA5] font-mono">
                99.998%
              </div>
              <div className="text-[11px] font-mono text-[#A1A1AA]">
                6/6 High-Speed Relays Active
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>DURESS PURGE ALARMS</span>
                <ShieldAlert className="w-4 h-4 text-[#E07A5F]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E07A5F] font-mono">
                {duressTriggerCount} ACTIVE
              </div>
              <div className="text-[11px] font-mono text-[#71717A]">
                Zero duress self-clearing active
              </div>
            </div>
          </div>

          {/* PASETO v4 Token Inspector Box */}
          <div className="p-6 rounded-2xl bg-[#14161D] border border-[#232836] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#52B788]" />
                <h3 className="text-base font-bold text-[#F4F4F5]">
                  Stateless PASETO v4 Authentication Protocol Inspector
                </h3>
              </div>
              <span className="text-xs font-mono text-[#DDA15E] bg-[#DDA15E]/10 px-2.5 py-1 rounded-full border border-[#DDA15E]/20">
                v4.public • Cryptographically Verifiable
              </span>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              uAuth uses stateless <strong>PASETO v4 (Platform-Agnostic Security Tokens)</strong> with Ed25519 signatures. Unlike bloated JWTs, PASETO v4 eliminates algorithm confusion attacks and guarantees zero database query load on every API request.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#232836] space-y-2 font-mono text-xs">
                <div className="text-[11px] text-[#DDA15E] uppercase font-bold">Header & Public Key Token Blob</div>
                <div className="text-[#A1A1AA] break-all leading-relaxed bg-[#14161D] p-3 rounded-lg border border-[#232836]">
                  v4.public.eyJzdWIiOiJ1aWRfOThmMTJhODgiLCJpc3MiOiJhdXRoLnVzYWZlLmluIiwiZXhwIjoxNzg4MzQ4ODAwLCJzY29wZSI6Im9wZW5pZCBzdG9yYWdlLm1lc2gifQ.48b9f1a029cb7789af...
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#232836] space-y-2 font-mono text-xs">
                <div className="text-[11px] text-[#52B788] uppercase font-bold">Decoded Cryptographic Claims Payload</div>
                <pre className="text-[#F4F4F5] text-[11px] bg-[#14161D] p-3 rounded-lg border border-[#232836] overflow-x-auto">
{JSON.stringify(
  {
    sub: 'uid_98f12a884c7e4a11',
    iss: `auth.usafe.${currentRegion}`,
    aud: 'com.amberos.workspace',
    exp: 1788348800,
    scope: 'openid profile storage.workspace mesh.relay',
    hardware_attested: true,
    enclave_curve: 'Ed25519',
  },
  null,
  2
)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OPENCLAW NODE FLEET ORCHESTRATOR */}
      {activeTab === 'fleet' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#F4F4F5]">OpenClaw Decentralized Relay Fleet</h2>
              <p className="text-xs text-[#A1A1AA] font-mono">
                XChaCha20-Poly1305 Multi-Hop IP Cloaking & Blind Task Chambers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNodes(MESH_NODES)}
                className="px-3 py-1.5 rounded-xl bg-[#14161D] border border-[#232836] hover:border-[#DDA15E] text-xs font-mono text-[#F4F4F5] flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#DDA15E]" />
                <span>Refresh Nodes</span>
              </button>
            </div>
          </div>

          {/* Node Grid Table */}
          <div className="rounded-2xl bg-[#14161D] border border-[#232836] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0A0B0E] border-b border-[#232836] text-[#A1A1AA]">
                  <tr>
                    <th className="p-3.5">NODE ID & REGION</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5">LATENCY</th>
                    <th className="p-3.5">ACTIVE RELAYS</th>
                    <th className="p-3.5">ASN FIREWALL</th>
                    <th className="p-3.5">ED25519 PUBKEY</th>
                    <th className="p-3.5 text-right">ORCHESTRATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232836]/60">
                  {nodes.map((node) => (
                    <tr key={node.id} className="hover:bg-[#181A22] transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-[#F4F4F5]">{node.id}</div>
                        <div className="text-[11px] text-[#71717A]">{node.city}, {node.country}</div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] ${
                            node.status === 'active'
                              ? 'bg-[#52B788]/10 text-[#52B788] border border-[#52B788]/30'
                              : node.status === 'draining'
                              ? 'bg-[#E07A5F]/10 text-[#E07A5F] border border-[#E07A5F]/30 animate-pulse'
                              : 'bg-[#4A6FA5]/10 text-[#4A6FA5] border border-[#4A6FA5]/30'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span className="uppercase">{node.status}</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-[#52B788] font-bold">{node.latencyMs} ms</td>
                      <td className="p-3.5 text-[#F4F4F5]">{node.activeRelays.toLocaleString()}</td>
                      <td className="p-3.5 text-[#A1A1AA]">{node.asn}</td>
                      <td className="p-3.5 text-[#DDA15E]">{node.ed25519Key}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleDrainNode(node.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                            node.status === 'draining'
                              ? 'bg-[#52B788] text-[#0A0B0E] font-bold'
                              : 'bg-[#E07A5F]/20 text-[#E07A5F] hover:bg-[#E07A5F] hover:text-[#0A0B0E]'
                          }`}
                        >
                          {node.status === 'draining' ? 'Restore Node' : 'Drain Node'}
                        </button>
                        <button
                          onClick={() => handleRotateNonces(node.id)}
                          className="px-2.5 py-1 rounded-lg text-[11px] bg-[#181A22] border border-[#232836] hover:border-[#DDA15E] text-[#DDA15E]"
                        >
                          Rotate Nonce
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Embedded Terminal CLI */}
          <div className="rounded-2xl bg-[#0A0B0E] border border-[#232836] overflow-hidden space-y-2">
            <div className="px-4 py-2.5 bg-[#14161D] border-b border-[#232836] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#DDA15E]">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">WebSocket Admin CLI • openclaw-daemon bridge</span>
              </div>
              <span className="text-[#71717A]">Type "help" for command matrix</span>
            </div>

            <div className="p-4 font-mono text-xs text-[#A1A1AA] space-y-1.5 max-h-48 overflow-y-auto">
              {cliLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith('>')
                      ? 'text-[#F4F4F5] font-bold'
                      : log.startsWith('[OK]')
                      ? 'text-[#52B788]'
                      : log.startsWith('[ACTION]')
                      ? 'text-[#DDA15E]'
                      : 'text-[#A1A1AA]'
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleRunCli} className="p-3 bg-[#14161D] border-t border-[#232836] flex items-center gap-2 font-mono text-xs">
              <span className="text-[#52B788]">&gt;</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="e.g. mesh status, drain --node=node_zrh_04, paseto verify..."
                className="flex-1 bg-transparent text-[#F4F4F5] focus:outline-none placeholder-[#71717A]"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-[#DDA15E] text-[#0A0B0E] font-bold hover:bg-[#BC6C25] transition-colors"
              >
                Execute
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMIC CMS & ISR REVALIDATION PUBLISHER */}
      {activeTab === 'cms' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#F4F4F5]">Dynamic Frontend CMS Publisher</h2>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Direct Next.js 15 Incremental Static Regeneration (ISR) with On-Demand Cache Purge
              </p>
            </div>

            {/* Dual Domain Selector */}
            <div className="flex items-center gap-2 bg-[#14161D] p-1 rounded-xl border border-[#232836]">
              <button
                onClick={() => setCmsDomain('in')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  cmsDomain === 'in' ? 'bg-[#DDA15E] text-[#0A0B0E] font-bold' : 'text-[#A1A1AA]'
                }`}
              >
                🇮🇳 usafe.in (Domestic)
              </button>
              <button
                onClick={() => setCmsDomain('net')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  cmsDomain === 'net' ? 'bg-[#DDA15E] text-[#0A0B0E] font-bold' : 'text-[#A1A1AA]'
                }`}
              >
                🌐 usafe.net (Global)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Editable Copy Fields */}
            <div className="p-6 rounded-2xl bg-[#14161D] border border-[#232836] space-y-4">
              <h3 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider font-mono text-[#4A6FA5]">
                1. Edit Target Copy ({cmsDomain === 'in' ? 'usafe.in' : 'usafe.net'})
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A1A1AA]">Hero Headline</label>
                <input
                  type="text"
                  value={cmsHeadline}
                  onChange={(e) => setCmsHeadline(e.target.value)}
                  className="w-full bg-[#0A0B0E] border border-[#232836] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#DDA15E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A1A1AA]">Subtext & Value Proposition</label>
                <textarea
                  rows={3}
                  value={cmsSubtext}
                  onChange={(e) => setCmsSubtext(e.target.value)}
                  className="w-full bg-[#0A0B0E] border border-[#232836] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#DDA15E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#A1A1AA]">Announcement Banner Microcopy</label>
                <input
                  type="text"
                  value={cmsBanner}
                  onChange={(e) => setCmsBanner(e.target.value)}
                  className="w-full bg-[#0A0B0E] border border-[#232836] rounded-xl px-3.5 py-2 text-xs text-[#F4F4F5] focus:outline-none focus:border-[#DDA15E]"
                />
              </div>

              <button
                onClick={handleTriggerRevalidation}
                disabled={cmsRevalidating}
                className="w-full py-3 rounded-xl bg-[#4A6FA5] hover:bg-[#3B5B88] text-[#F4F4F5] font-bold text-xs font-mono flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {cmsRevalidating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#F4F4F5]" />
                    <span>Executing revalidatePath('/') ...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish & Revalidate Edge Cache ({cmsDomain})</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Next.js Revalidation Engine Monitor */}
            <div className="p-6 rounded-2xl bg-[#14161D] border border-[#232836] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#F4F4F5] uppercase tracking-wider text-[#52B788]">
                  2. Edge Cache & Revalidation Logs
                </h3>
                <span className="text-[11px] text-[#71717A]">Last Revalidated: {cmsLastRevalidated}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#232836] space-y-2 min-h-[220px]">
                {revalidationLogs.length > 0 ? (
                  revalidationLogs.map((log, idx) => (
                    <div key={idx} className="text-[#52B788] text-[11px]">
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-[#71717A] text-[11px] italic">
                    Ready for publication. Click "Publish & Revalidate Edge Cache" to trigger instant Next.js ISR purge.
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836] text-[11px] text-[#A1A1AA] space-y-1">
                <div className="text-[#DDA15E] font-bold">EDGE REVALIDATION SPECS:</div>
                <div>• Next.js Tag: <code className="text-[#F4F4F5]">revalidateTag('ecosystem-metadata')</code></div>
                <div>• Purge Scope: Global Cloudflare Workers (285 edge locations)</div>
                <div>• Time-to-First-Byte: &lt; 20ms</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ZERO-KNOWLEDGE CRASH DIAGNOSTIC ROOM */}
      {activeTab === 'crashes' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-[#F4F4F5]">Zero-Knowledge Crash Diagnostic Room</h2>
            <p className="text-xs text-[#A1A1AA] font-mono">
              Sanitized kernel exceptions & app panics broadcasted with 100% PII scrubbed by hardware enclaves
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crash Event Feed */}
            <div className="lg:col-span-1 p-4 rounded-2xl bg-[#14161D] border border-[#232836] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA] pb-2 border-b border-[#232836]">
                <span>ANONYMIZED EXCEPTION FEED</span>
                <span className="text-[#7E78D2] font-bold">{crashes.length} EVENTS</span>
              </div>

              <div className="space-y-2">
                {crashes.map((crash) => (
                  <div
                    key={crash.id}
                    onClick={() => setSelectedCrash(crash)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedCrash?.id === crash.id
                        ? 'bg-[#181A22] border-[#7E78D2]'
                        : 'bg-[#0A0B0E] border-[#232836] hover:border-[#7E78D2]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] mb-1">
                      <span>{crash.id}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] ${
                          crash.severity === 'critical'
                            ? 'bg-[#E07A5F]/20 text-[#E07A5F]'
                            : crash.severity === 'warning'
                            ? 'bg-[#DDA15E]/20 text-[#DDA15E]'
                            : 'bg-[#52B788]/20 text-[#52B788]'
                        }`}
                      >
                        {crash.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#F4F4F5]">{crash.sourceModule}</div>
                    <div className="text-[11px] text-[#A1A1AA] truncate mt-0.5">{crash.faultType}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sanitized Stack Inspector */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#14161D] border border-[#232836] space-y-4">
              {selectedCrash ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#232836]">
                    <div>
                      <div className="text-xs font-mono text-[#7E78D2]">{selectedCrash.sourceModule} • {selectedCrash.id}</div>
                      <h3 className="text-base font-bold text-[#F4F4F5]">{selectedCrash.faultType}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#52B788]/10 border border-[#52B788]/30 text-[#52B788] self-start">
                      {selectedCrash.enclaveIsolationTag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#A1A1AA]">CRYPTOGRAPHICALLY SANITIZED STACK TRACE</div>
                    <pre className="p-4 rounded-xl bg-[#0A0B0E] border border-[#232836] font-mono text-xs text-[#52B788] overflow-x-auto leading-relaxed">
                      {selectedCrash.sanitizedStack}
                    </pre>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                    <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
                      <div className="text-[#71717A]">PII SCRUBBING</div>
                      <div className="text-[#52B788] font-bold">100% ENCLAVE PURGED</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
                      <div className="text-[#71717A]">RAM DUMP STATE</div>
                      <div className="text-[#DDA15E] font-bold">{selectedCrash.memoryDumpState}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
                      <div className="text-[#71717A]">TRIAGE STATUS</div>
                      <div className="text-[#7E78D2] font-bold uppercase">{selectedCrash.status}</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-xs font-mono text-[#71717A]">
                  Select an exception from the stream to inspect sanitized diagnostics.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM CHANGELOG & BUILD LEDGER */}
      {activeTab === 'changelog' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <SystemChangelog />
        </div>
      )}
    </div>
  );
};
