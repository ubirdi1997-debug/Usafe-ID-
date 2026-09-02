import React, { useState } from 'react';
import {
  Radio,
  Share2,
  RefreshCw,
  Zap,
  ShieldCheck,
  Server,
  Activity,
  Globe2,
  Cpu
} from 'lucide-react';
import { MESH_NODES } from '../lib/data';
import { Region } from '../lib/domains';
import { MeshNode } from '../types';

interface OpenClawMeshProps {
  currentRegion: Region;
}

export const OpenClawMesh: React.FC<OpenClawMeshProps> = ({ currentRegion }) => {
  const [selectedNode, setSelectedNode] = useState<MeshNode>(MESH_NODES[0]);
  const [packetCounter, setPacketCounter] = useState(14829);
  const [isPinging, setIsPinging] = useState(false);

  const simulatePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPacketCounter((prev) => prev + Math.floor(Math.random() * 8) + 1);
      setIsPinging(false);
    }, 400);
  };

  return (
    <section id="openclaw" className="py-20 bg-[#121214] border-t border-[#232836]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#232836]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A22] border border-[#232836] text-xs font-mono text-[#52B788]">
              <Radio className="w-3.5 h-3.5 text-[#52B788] animate-pulse" />
              <span>DECENTRALIZED PEER-TO-PEER ROUTING PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4F5] font-['Plus_Jakarta_Sans']">
              OpenClaw Mesh Network
            </h2>
            <p className="text-base text-[#A1A1AA] max-w-2xl">
              An onion-routed peer mesh network with quantum-resistant key exchanges.
              Traffic is fragmented, re-ordered, and routed across multi-jurisdiction hardware enclaves.
            </p>
          </div>

          <button
            onClick={simulatePing}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181A22] border border-[#232836] hover:border-[#52B788]/60 text-xs font-mono text-[#52B788] transition-colors self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>Probe Global Mesh Nodes</span>
          </button>
        </div>

        {/* Live Node Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node Selector List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {MESH_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-[18px] text-left transition-all border ${
                    isSelected
                      ? 'bg-[#181A22] border-[#52B788] shadow-md'
                      : 'bg-[#0E0E10] border-[#232836] hover:border-[#232836]/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#F4F4F5] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#52B788]" />
                      {node.city}, {node.country}
                    </span>
                    <span className="font-mono text-xs text-[#52B788] bg-[#121214] px-2 py-0.5 rounded-full border border-[#232836]">
                      {node.latencyMs} ms
                    </span>
                  </div>

                  <div className="font-mono text-[11px] text-[#71717A] space-y-0.5">
                    <div>IP Mask: {node.ipMask}</div>
                    <div className="flex justify-between">
                      <span>Bandwidth: {node.bandwidth}</span>
                      <span className="text-[#A1A1AA]">{node.hops} Hop Route</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Node Inspector Terminal */}
          <div className="lg:col-span-5 rounded-[22px] bg-[#0E0E10] border border-[#232836] p-5 font-mono text-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#232836]">
                <div className="flex items-center gap-2 text-[#52B788]">
                  <Server className="w-4 h-4" />
                  <span className="font-bold">INSPECTING: {selectedNode.id.toUpperCase()}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#181A22] text-[#DDA15E] rounded-full border border-[#232836]">
                  ZERO-LOG SEALED
                </span>
              </div>

              <div className="space-y-2.5 text-[#A1A1AA] text-[11px]">
                <div className="flex justify-between py-1 border-b border-[#232836]/40">
                  <span className="text-[#71717A]">Jurisdiction / City:</span>
                  <span className="text-[#E4E4E7] font-semibold">{selectedNode.city}, {selectedNode.country}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#232836]/40">
                  <span className="text-[#71717A]">Hardware Keystore:</span>
                  <span className="text-[#52B788]">ed25519:{selectedNode.ed25519Key}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#232836]/40">
                  <span className="text-[#71717A]">Current Roundtrip Latency:</span>
                  <span className="text-[#DDA15E] font-bold">{selectedNode.latencyMs} milliseconds</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#232836]/40">
                  <span className="text-[#71717A]">Egress Packet Nonces:</span>
                  <span className="text-[#E4E4E7]">#0x{packetCounter.toString(16)} (Rotated per 10s)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#232836]/40">
                  <span className="text-[#71717A]">Onion Layer Cipher:</span>
                  <span className="text-[#4A6FA5]">ChaCha20-Poly1305 + Kyber-1024</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-[#181A22] border border-[#232836] text-[11px] text-[#A1A1AA] flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#52B788]">
                <ShieldCheck className="w-4 h-4" />
                No single node knows both origin & payload
              </span>
              <span className="text-[#71717A] text-[10px]">v2.4-Mesh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
