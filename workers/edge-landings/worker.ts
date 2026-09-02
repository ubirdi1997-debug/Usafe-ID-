/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * uSafe Cloudflare Worker Edge Landing Router (worker.ts)
 * Compliant with uAuth ID: MASTER SYSTEM SPECIFICATION Section 6
 * 
 * Target: Sub-15 KB minified semantic HTML + inline CSS + inline SVGs
 * Edge Cache: Cache-Control: public, max-age=3600, s-maxage=86400 (TTFB < 20ms)
 * Subdomains: uchat.*, kite.*, upay.*, office.*, media.*, vault.*, aura.*, auth.*
 */

export interface Env {
  ENVIRONMENT?: string;
}

interface SubdomainTheme {
  name: string;
  badge: string;
  tagline: string;
  color: string;
  accentBg: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  features: string[];
}

const SUBDOMAIN_THEMES: Record<string, SubdomainTheme> = {
  uchat: {
    name: 'uChat',
    badge: 'HARDWARE-ISOLATED MESSAGING',
    tagline: 'Zero-Knowledge Peer Messaging on Double-Ratchet Mesh',
    color: '#52B788',
    accentBg: 'rgba(82, 183, 136, 0.1)',
    description: 'Post-quantum double-ratchet encrypted messaging backed by hardware enclaves. No phone numbers, no metadata harvesting.',
    primaryCta: 'Open uChat Web',
    secondaryCta: 'Authenticate via uAuth ID',
    features: ['Double-Ratchet XChaCha20-Poly1305', 'OpenClaw Multi-Hop Egress', 'Offline P2P Mesh Sync'],
  },
  kite: {
    name: 'Kite Browser',
    badge: 'EDGE MESH WEB ENGINE',
    tagline: 'Private Web Engine with Onion Egress Routing',
    color: '#3D8D8B',
    accentBg: 'rgba(61, 141, 139, 0.1)',
    description: 'Ultra-lightweight sovereign browser shielding your IP address across dynamic OpenClaw relays with zero third-party telemetry.',
    primaryCta: 'Launch Kite Engine',
    secondaryCta: 'Verify Enclave Proxy',
    features: ['Multi-Hop IP Masking', 'Built-in WebAssembly Sandboxing', 'Zero-Cookie Shield'],
  },
  upay: {
    name: 'uPay',
    badge: 'HARDWARE-ROOTED WALLET',
    tagline: 'Cryptographic Payments with StrongBox Security',
    color: '#DDA15E',
    accentBg: 'rgba(221, 161, 94, 0.1)',
    description: 'Self-custodial sovereign payments secured directly by NXP SE050 hardware roots with instant QR and NFC settlement.',
    primaryCta: 'Access uPay Vault',
    secondaryCta: 'Pair Amber Pico Dongle',
    features: ['Ed25519 Enclave Signing', 'Duress PIN Self-Purge', 'Zero Intermediary Ledger'],
  },
  office: {
    name: 'uOffice',
    badge: 'ZERO-KNOWLEDGE PRODUCTIVITY',
    tagline: 'Encrypted Docs, Sheets, and Slides for Sovereign Teams',
    color: '#4A6FA5',
    accentBg: 'rgba(74, 111, 165, 0.1)',
    description: 'Real-time collaborative workspace with zero-knowledge CRDT state sync. Your documents are decrypted purely on client RAM.',
    primaryCta: 'Launch uOffice Suite',
    secondaryCta: 'Claim @amber.id Seat',
    features: ['E2E Encrypted uDocs & uSheets', 'OPFS Fast Local Storage', 'WASM-Powered Offline Compute'],
  },
  media: {
    name: 'uMedia',
    badge: 'ZERO-TELEMETRY OPTICS',
    tagline: 'Confidential Camera and Media Vault',
    color: '#2E4057',
    accentBg: 'rgba(46, 64, 87, 0.15)',
    description: 'Hardware-encrypted photo and video capture. EXIF metadata is stripped at the sensor level before saving to encrypted chunks.',
    primaryCta: 'Open Media Vault',
    secondaryCta: 'Hardware Key Pair',
    features: ['Sensor-Level EXIF Sanitization', 'Chunked ChaCha20 Storage', 'Encrypted Stream Sharing'],
  },
  aura: {
    name: 'Aura AI',
    badge: 'DECENTRALIZED MESH INTELLIGENCE',
    tagline: 'On-Device NPU Intelligence & Blind Mesh Compute',
    color: '#7E78D2',
    accentBg: 'rgba(126, 120, 210, 0.1)',
    description: 'Zero-knowledge personal intelligence. Small tokenizers run locally on your phone while intensive tasks offload to ephemeral mesh chambers.',
    primaryCta: 'Launch Aura Assistant',
    secondaryCta: 'Inspect Blind Enclave',
    features: ['Quantized On-Device NPU (<2MB)', 'Zero Prompt Telemetry', 'Blind Result Envelope'],
  },
  auth: {
    name: 'uAuth SSO',
    badge: 'HARDWARE-ISOLATED SINGLE SIGN-ON',
    tagline: 'FIDO2 Level 3 Passkeys & PASETO v4 Tokens',
    color: '#DDA15E',
    accentBg: 'rgba(221, 161, 94, 0.1)',
    description: 'Eliminate passwords across the entire sovereign ecosystem. Cryptographically authenticated with hardware enclave attestation.',
    primaryCta: 'Authenticate Device',
    secondaryCta: 'Register @amber.id',
    features: ['WebAuthn FIDO2 StrongBox', 'Stateless PASETO v4 Tokens', 'Zero-Knowledge 3rd Party Bridge'],
  },
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    
    // Auto-preserve incoming root domain (.in vs .net)
    const isDomestic = host.endsWith('.in');
    const rootDomain = isDomestic ? 'usafe.in' : 'usafe.net';
    const currency = isDomestic ? '₹' : '$';

    // Extract subdomain (e.g., uchat.usafe.in -> uchat)
    const parts = host.split('.');
    const subdomain = parts.length > 2 ? parts[0] : 'auth';
    const theme = SUBDOMAIN_THEMES[subdomain] || SUBDOMAIN_THEMES.auth;

    // Detect client device
    const userAgent = request.headers.get('user-agent') || '';
    const isAmberOS = userAgent.includes('AmberOS') || userAgent.includes('Android');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${theme.name} • ${rootDomain}</title>
  <meta name="description" content="${theme.tagline}">
  <style>
    :root{--bg:#0E0E10;--surface:#14161D;--border:#232836;--text:#F4F4F5;--muted:#A1A1AA;--accent:${theme.color};}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:24px;line-height:1.5;}
    .card{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:36px;max-width:520px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.6);text-align:center;}
    .badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1px;color:var(--accent);background:${theme.accentBg};border:1px solid var(--accent);border-radius:999px;padding:4px 12px;margin-bottom:18px;text-transform:uppercase;}
    h1{font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:8px;}
    p.lead{font-size:14px;color:var(--muted);margin-bottom:24px;}
    .features{text-align:left;background:#0A0B0E;border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:28px;}
    .features li{font-size:12px;color:#D4D4D8;list-style:none;margin-bottom:6px;display:flex;align-items:center;gap:8px;}
    .features li::before{content:"✓";color:var(--accent);font-weight:bold;}
    .btn-primary{display:block;width:100%;background:var(--accent);color:#0E0E10;font-weight:700;font-size:14px;padding:14px 20px;border-radius:12px;text-decoration:none;transition:opacity 0.2s;}
    .btn-primary:hover{opacity:0.9;}
    .btn-sec{display:block;width:100%;background:transparent;color:var(--text);font-size:13px;padding:10px;border:1px solid var(--border);border-radius:12px;text-decoration:none;margin-top:10px;}
    .footer-note{margin-top:24px;font-size:11px;color:#71717A;font-family:monospace;}
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${theme.badge}</div>
    <h1>${theme.name}</h1>
    <p class="lead">${theme.description}</p>
    <div class="features">
      ${theme.features.map(f => `<li>${f}</li>`).join('')}
    </div>
    <a href="https://${rootDomain}" class="btn-primary">${isAmberOS ? 'Open in Amber OS' : theme.primaryCta}</a>
    <a href="https://auth.${rootDomain}" class="btn-sec">${theme.secondaryCta}</a>
    <div class="footer-note">Node: Edge Relay • Zero-Knowledge Verified • ${rootDomain}</div>
  </div>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-uSafe-Edge-Node': 'cloudflare-worker-edge-01',
        'X-uSafe-Root-Domain': rootDomain,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  },
};
