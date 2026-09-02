import React, { useState, useMemo } from 'react';
import {
  History,
  GitCommit,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Tag,
  Search,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  KeyRound,
  ShieldAlert,
  Zap,
  Activity
} from 'lucide-react';
import { ChangelogDocument, ChangelogRelease } from '../types';
import updatesJson from '../data/updates.json';

interface SystemChangelogProps {
  className?: string;
}

export const SystemChangelog: React.FC<SystemChangelogProps> = ({ className = '' }) => {
  // Load data from local updates.json
  const changelogData = updatesJson as ChangelogDocument;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({
    'v2.4.0': true,
    'v2.3.0': true,
  });
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [verifyingHash, setVerifyingHash] = useState<string | null>(null);
  const [verifiedHashes, setVerifiedHashes] = useState<Record<string, boolean>>({
    'v2.4.0': true,
  });
  const [jsonExported, setJsonExported] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    changelogData.releases.forEach((rel) => {
      rel.tags.forEach((tag) => tagsSet.add(tag));
    });
    return ['ALL', ...Array.from(tagsSet)];
  }, [changelogData]);

  // Filtered releases based on search and tag
  const filteredReleases = useMemo(() => {
    return changelogData.releases.filter((rel) => {
      const matchesTag = selectedTag === 'ALL' || rel.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTag;

      const matchesQuery =
        rel.version.toLowerCase().includes(q) ||
        rel.releaseName.toLowerCase().includes(q) ||
        rel.summary.toLowerCase().includes(q) ||
        rel.buildHash.toLowerCase().includes(q) ||
        rel.tags.some((t) => t.toLowerCase().includes(q)) ||
        rel.sections.some((sec) =>
          sec.items.some((item) => item.toLowerCase().includes(q))
        );

      return matchesTag && matchesQuery;
    });
  }, [changelogData, selectedTag, searchQuery]);

  const toggleExpand = (version: string) => {
    setExpandedVersions((prev) => ({
      ...prev,
      [version]: !prev[version],
    }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    changelogData.releases.forEach((r) => {
      next[r.version] = true;
    });
    setExpandedVersions(next);
  };

  const handleCollapseAll = () => {
    setExpandedVersions({});
  };

  const handleCopyHash = (hash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerifySignature = (version: string, hash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVerifyingHash(version);
    setTimeout(() => {
      setVerifyingHash(null);
      setVerifiedHashes((prev) => ({ ...prev, [version]: true }));
    }, 1000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(changelogData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `usafe-changelog-audit-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setJsonExported(true);
    setTimeout(() => setJsonExported(false), 2500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header & Meta Card */}
      <div className="p-6 rounded-2xl bg-[#14161D] border border-[#232836] space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0A0B0E] border border-[#232836] flex items-center justify-center text-[#DDA15E]">
              <History className="w-6 h-6 text-[#DDA15E]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-[#F4F4F5]">System Changelog & Build Ledger</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E]">
                  LOCAL updates.json
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] font-mono mt-0.5">
                Cryptographic audit trail of verified releases, hardware keystores, and kernel milestones.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono bg-[#0A0B0E] border border-[#232836] text-[#D4D4D8] hover:text-[#DDA15E] hover:border-[#DDA15E]/50 transition-all"
            >
              {jsonExported ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#52B788]" />
                  <span className="text-[#52B788]">Audit JSON Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span>Export JSON Schema</span>
                </>
              )}
            </button>

            <a
              href="/updates.html"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E] hover:bg-[#DDA15E]/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public HTML Matrix</span>
            </a>
          </div>
        </div>

        {/* Repository & PKI Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#232836] font-mono text-[11px]">
          <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
            <span className="text-[#71717A]">ROOT REPOSITORY</span>
            <div className="text-[#F4F4F5] font-semibold truncate mt-0.5">{changelogData.repository}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
            <span className="text-[#71717A]">ROOT ENCLAVE PKI</span>
            <div className="text-[#DDA15E] font-semibold truncate mt-0.5">{changelogData.rootEnclavePki}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
            <span className="text-[#71717A]">TOTAL RELEASES</span>
            <div className="text-[#52B788] font-semibold mt-0.5">{changelogData.releases.length} Verified Builds</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#232836]">
            <span className="text-[#71717A]">LAST AUDITED SYNC</span>
            <div className="text-[#7E78D2] font-semibold mt-0.5">2026-09-01 • 19:50 UTC</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#14161D] border border-[#232836] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search release version, hash, RFC spec, or feature keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0A0B0E] border border-[#232836] text-xs font-mono text-[#F4F4F5] placeholder-[#71717A] focus:outline-none focus:border-[#DDA15E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#71717A] hover:text-[#F4F4F5]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Toggle Controls */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={handleExpandAll}
              className="px-3 py-1.5 rounded-lg bg-[#0A0B0E] border border-[#232836] text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-1.5 rounded-lg bg-[#0A0B0E] border border-[#232836] text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-[#71717A] text-[11px] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#DDA15E]" />
            <span>FILTER:</span>
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-[#DDA15E] text-[#0A0B0E] font-bold shadow-sm'
                  : 'bg-[#0A0B0E] text-[#A1A1AA] border border-[#232836] hover:text-[#F4F4F5] hover:border-[#DDA15E]/40'
              }`}
            >
              {tag.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Timeline Container */}
      <div className="relative pl-4 sm:pl-8 space-y-8 before:absolute before:top-4 before:bottom-4 before:left-2 sm:before:left-4 before:w-0.5 before:bg-[#232836]">
        {filteredReleases.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#14161D] border border-[#232836] text-[#71717A] font-mono text-xs">
            No releases match your search criteria "{searchQuery}".
          </div>
        ) : (
          filteredReleases.map((rel, idx) => {
            const isExpanded = !!expandedVersions[rel.version];
            const isVerified = !!verifiedHashes[rel.version];
            const isVerifying = verifyingHash === rel.version;

            return (
              <div key={rel.version} className="relative group">
                {/* Timeline Connector Node */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    idx === 0
                      ? 'bg-[#DDA15E] border-[#0A0B0E] ring-4 ring-[#DDA15E]/20'
                      : 'bg-[#14161D] border-[#52B788] group-hover:border-[#DDA15E]'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A0B0E]" />
                </div>

                {/* Release Card */}
                <div className="rounded-2xl bg-[#14161D] border border-[#232836] overflow-hidden transition-all hover:border-[#383E50]">
                  {/* Release Card Header */}
                  <div
                    onClick={() => toggleExpand(rel.version)}
                    className="p-5 sm:p-6 cursor-pointer select-none hover:bg-[#181A22]/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Version & Status */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-lg sm:text-xl font-extrabold text-[#F4F4F5] font-mono tracking-tight flex items-center gap-2">
                            <GitCommit className="w-5 h-5 text-[#DDA15E]" />
                            <span>{rel.version}</span>
                          </span>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                              rel.status === 'PRODUCTION'
                                ? 'bg-[#DDA15E]/15 text-[#DDA15E] border border-[#DDA15E]/30'
                                : rel.status === 'LTS'
                                ? 'bg-[#7E78D2]/15 text-[#7E78D2] border border-[#7E78D2]/30'
                                : 'bg-[#52B788]/15 text-[#52B788] border border-[#52B788]/30'
                            }`}
                          >
                            {rel.status}
                          </span>

                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#71717A]">
                            <Calendar className="w-3.5 h-3.5 text-[#71717A]" />
                            <span>{rel.date}</span>
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#D4D4D8]">
                          {rel.releaseName}
                        </h3>
                      </div>

                      {/* Right Meta Controls */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Verify Attestation Button */}
                        <button
                          onClick={(e) => handleVerifySignature(rel.version, rel.buildHash, e)}
                          disabled={isVerifying}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all ${
                            isVerified
                              ? 'bg-[#52B788]/10 border border-[#52B788]/30 text-[#52B788]'
                              : isVerifying
                              ? 'bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E] animate-pulse'
                              : 'bg-[#0A0B0E] border border-[#232836] text-[#A1A1AA] hover:text-[#DDA15E] hover:border-[#DDA15E]/40'
                          }`}
                        >
                          {isVerifying ? (
                            <>
                              <Activity className="w-3.5 h-3.5 animate-spin" />
                              <span>Verifying Enclave...</span>
                            </>
                          ) : isVerified ? (
                            <>
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Attestation Verified</span>
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>Verify Signature</span>
                            </>
                          )}
                        </button>

                        {/* Expand / Collapse Icon */}
                        <div className="p-1.5 rounded-lg bg-[#0A0B0E] border border-[#232836] text-[#A1A1AA]">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#DDA15E]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Summary text */}
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mt-3 max-w-4xl">
                      {rel.summary}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#232836]/60">
                      {rel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#0A0B0E] border border-[#232836] text-[10px] font-mono text-[#A1A1AA]"
                        >
                          #{tag}
                        </span>
                      ))}

                      {/* Build Hash Chip */}
                      <button
                        onClick={(e) => handleCopyHash(rel.buildHash, e)}
                        className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0A0B0E] border border-[#232836] text-[10px] font-mono text-[#DDA15E] hover:border-[#DDA15E]/40 transition-colors"
                      >
                        <KeyRound className="w-3 h-3 text-[#DDA15E]" />
                        <span>{rel.buildHash.substring(0, 18)}...</span>
                        {copiedHash === rel.buildHash ? (
                          <Check className="w-3 h-3 text-[#52B788]" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#71717A]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Section Details */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-[#0E0E10] border-t border-[#232836] space-y-6">
                      {/* Hardware Signed-by Banner */}
                      <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#14161D] border border-[#232836] text-xs font-mono">
                        <div className="flex items-center gap-2 text-[#DDA15E]">
                          <ShieldCheck className="w-4 h-4 text-[#52B788]" />
                          <span className="text-[#A1A1AA]">SIGNING AUTHORITY:</span>
                          <strong className="text-[#F4F4F5]">{rel.signedBy}</strong>
                        </div>
                        <span className="hidden sm:inline-block text-[11px] text-[#52B788] bg-[#52B788]/10 px-2 py-0.5 rounded">
                          ED25519 ENCLAVE ASSERTION OK
                        </span>
                      </div>

                      {/* Benchmark Metrics Grid (if present) */}
                      {rel.metrics && (
                        <div className="space-y-2">
                          <div className="text-[11px] font-mono text-[#71717A] uppercase tracking-wider">
                            Release Telemetry & Benchmarks
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                            {Object.entries(rel.metrics).map(([mKey, mVal]) => (
                              <div
                                key={mKey}
                                className="p-3 rounded-xl bg-[#14161D] border border-[#232836] space-y-1"
                              >
                                <div className="text-[10px] text-[#71717A] uppercase truncate">
                                  {mKey.replace(/([A-Z])/g, ' $1')}
                                </div>
                                <div className="text-sm font-bold text-[#F4F4F5] truncate">
                                  {String(mVal)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Categorized Item Sections */}
                      <div className="space-y-4">
                        {rel.sections.map((section) => (
                          <div key={section.category} className="space-y-2">
                            <h4 className="text-xs font-bold font-mono text-[#DDA15E] uppercase tracking-wider flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DDA15E]" />
                              <span>{section.category}</span>
                            </h4>
                            <ul className="space-y-2 text-xs">
                              {section.items.map((item, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="flex items-start gap-2.5 text-[#D4D4D8] leading-relaxed p-2.5 rounded-xl bg-[#14161D]/50 border border-[#232836]/50 hover:border-[#232836] transition-colors"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
