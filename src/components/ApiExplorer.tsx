import React, { useState } from 'react';
import {
  Code,
  Send,
  CheckCircle2,
  Copy,
  KeyRound,
  Radio,
  FileJson,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Play
} from 'lucide-react';
import { ApiEndpointSpec } from '../types';
import { Region } from '../lib/domains';
import { API_ENDPOINTS } from '../lib/data';

interface ApiExplorerProps {
  currentRegion: Region;
}

export const ApiExplorer: React.FC<ApiExplorerProps> = ({ currentRegion }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointSpec>(API_ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState<string>(API_ENDPOINTS[0].requestBodySample);
  const [responseOutput, setResponseOutput] = useState<string | null>(API_ENDPOINTS[0].responseSample);
  const [responseStatus, setResponseStatus] = useState<number | null>(API_ENDPOINTS[0].responseStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number>(18);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'typescript'>('curl');

  const handleSelectEndpoint = (endpoint: ApiEndpointSpec) => {
    setSelectedEndpoint(endpoint);
    setRequestBody(endpoint.requestBodySample);
    setResponseOutput(endpoint.responseSample);
    setResponseStatus(endpoint.responseStatus);
  };

  const handleExecuteRequest = () => {
    setIsLoading(true);
    const executionLatency = Math.floor(Math.random() * 20) + 12; // 12-32ms

    setTimeout(() => {
      setLatencyMs(executionLatency);
      setResponseStatus(selectedEndpoint.responseStatus);
      setResponseOutput(selectedEndpoint.responseSample);
      setIsLoading(false);
    }, 450);
  };

  const generateCurlSnippet = () => {
    const fullUrl = `https://${selectedEndpoint.subdomain.replace('*', currentRegion)}${selectedEndpoint.path}`;
    const headers = Object.entries(selectedEndpoint.requestHeaders)
      .map(([k, v]) => `  -H "${k}: ${v}"`)
      .join(' \\\n');

    if (selectedEndpoint.method === 'WSS') {
      return `wscat -c "wss://${selectedEndpoint.subdomain.replace('*', currentRegion)}${selectedEndpoint.path}" \\\n${headers}`;
    }

    return `curl -X ${selectedEndpoint.method} "${fullUrl}" \\\n${headers} \\\n  -d '${requestBody.replace(/\n/g, ' ')}'`;
  };

  const generateTsSnippet = () => {
    const fullUrl = `https://${selectedEndpoint.subdomain.replace('*', currentRegion)}${selectedEndpoint.path}`;
    return `// uAuth SDK Client Invocation
import { uAuthClient } from '@usafe/sdk';

const response = await fetch('${fullUrl}', {
  method: '${selectedEndpoint.method}',
  headers: ${JSON.stringify(selectedEndpoint.requestHeaders, null, 2)},
  body: JSON.stringify(${requestBody.trim()})
});

const data = await response.json();
console.log('Attested Output:', data);`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-[#0E0E10] text-[#F4F4F5] p-4 sm:p-6 lg:p-8 space-y-8 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232836]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E]">
              DEVELOPER SPECIFICATION
            </span>
            <span className="text-xs font-mono text-[#52B788]">v1.4.0 (PASETO v4 / Ed25519)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F5] tracking-tight mt-1">
            uAuth ID & OpenClaw REST / WSS APIs
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 font-mono">
            Interactive playground targeting <strong className="text-[#DDA15E]">auth.usafe.{currentRegion}</strong> and <strong className="text-[#52B788]">api.usafe.{currentRegion}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#14161D] p-2 rounded-2xl border border-[#232836] font-mono text-xs text-[#A1A1AA]">
          <ShieldCheck className="w-4 h-4 text-[#52B788]" />
          <span>ZERO DATABASE READ BOTTLENECKS (STATELESS PASETO)</span>
        </div>
      </div>

      {/* Main 2-Column API Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Endpoints Directory */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-[#A1A1AA] uppercase font-bold tracking-wider px-1">
            Standard Endpoints ({API_ENDPOINTS.length})
          </div>

          <div className="space-y-2">
            {API_ENDPOINTS.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => handleSelectEndpoint(endpoint)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  selectedEndpoint.id === endpoint.id
                    ? 'bg-[#181A22] border-[#DDA15E] shadow-lg'
                    : 'bg-[#14161D] border-[#232836] hover:border-[#DDA15E]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      endpoint.method === 'POST'
                        ? 'bg-[#DDA15E]/20 text-[#DDA15E]'
                        : 'bg-[#7E78D2]/20 text-[#7E78D2]'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="text-[#71717A] text-[10px]">{endpoint.subdomain.replace('*', currentRegion)}</span>
                </div>
                <div className="text-xs font-bold text-[#F4F4F5] truncate">{endpoint.path}</div>
                <div className="text-[11px] text-[#A1A1AA] truncate mt-0.5">{endpoint.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Request/Response Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Endpoint Info Banner */}
          <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                    selectedEndpoint.method === 'POST'
                      ? 'bg-[#DDA15E] text-[#0A0B0E]'
                      : 'bg-[#7E78D2] text-[#0A0B0E]'
                  }`}
                >
                  {selectedEndpoint.method}
                </span>
                <span className="text-[#F4F4F5] font-bold text-sm">
                  https://{selectedEndpoint.subdomain.replace('*', currentRegion)}{selectedEndpoint.path}
                </span>
              </div>

              <button
                onClick={handleExecuteRequest}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl bg-[#52B788] hover:bg-[#40916c] text-[#0A0B0E] font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Sending Attestation...</span>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              {selectedEndpoint.summary}
            </p>

            {/* Request Headers Pill List */}
            <div className="pt-2 border-t border-[#232836] flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="text-[#71717A]">Headers:</span>
              {Object.entries(selectedEndpoint.requestHeaders).map(([key, val]) => {
                const strVal = String(val);
                return (
                  <span key={key} className="px-2 py-0.5 rounded-lg bg-[#0E0E10] border border-[#232836] text-[#D4D4D8]">
                    <strong className="text-[#DDA15E]">{key}</strong>: {strVal.length > 25 ? `${strVal.substring(0, 25)}...` : strVal}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Request Payload Editor */}
          <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <FileJson className="w-4 h-4 text-[#DDA15E]" />
                <span className="font-bold text-[#F4F4F5]">Request Body (JSON / x-www-form-urlencoded)</span>
              </div>
              <span>Editable</span>
            </div>

            <textarea
              rows={6}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full bg-[#0E0E10] border border-[#232836] rounded-xl p-3.5 font-mono text-xs text-[#52B788] focus:outline-none focus:border-[#DDA15E] leading-relaxed resize-none"
            />
          </div>

          {/* Live Response Panel */}
          <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#52B788]" />
                <span className="font-bold text-[#F4F4F5]">Cryptographic Response Output</span>
              </div>

              {responseStatus && (
                <div className="flex items-center gap-2">
                  <span className="text-[#A1A1AA] text-[11px]">Latency: <strong className="text-[#F4F4F5]">{latencyMs} ms</strong></span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#52B788]/20 text-[#52B788] font-bold text-xs border border-[#52B788]/30">
                    HTTP {responseStatus} OK
                  </span>
                </div>
              )}
            </div>

            <pre className="p-4 rounded-xl bg-[#0E0E10] border border-[#232836] font-mono text-xs text-[#F4F4F5] overflow-x-auto leading-relaxed max-h-64">
              {responseOutput}
            </pre>
          </div>

          {/* Copyable Code Snippets */}
          <div className="p-5 rounded-2xl bg-[#14161D] border border-[#232836] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#7E78D2]" />
                <span className="text-xs font-mono font-bold text-[#F4F4F5]">Generated Integration Code</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setActiveCodeTab('curl')}
                  className={`px-2.5 py-1 rounded-lg ${
                    activeCodeTab === 'curl' ? 'bg-[#DDA15E] text-[#0A0B0E] font-bold' : 'text-[#A1A1AA]'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveCodeTab('typescript')}
                  className={`px-2.5 py-1 rounded-lg ${
                    activeCodeTab === 'typescript' ? 'bg-[#DDA15E] text-[#0A0B0E] font-bold' : 'text-[#A1A1AA]'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => handleCopy(activeCodeTab === 'curl' ? generateCurlSnippet() : generateTsSnippet())}
                  className="px-2.5 py-1 rounded-lg bg-[#0E0E10] border border-[#232836] hover:border-[#DDA15E] text-[#F4F4F5] flex items-center gap-1 transition-colors"
                >
                  {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-[#0E0E10] border border-[#232836] font-mono text-xs text-[#A1A1AA] overflow-x-auto leading-relaxed">
              {activeCodeTab === 'curl' ? generateCurlSnippet() : generateTsSnippet()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
