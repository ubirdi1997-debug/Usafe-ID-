# uSafe — Zero-Knowledge Cloud & Sovereign OS Platform

[![Status](https://img.shields.io/badge/Release-v2.4.0%20Production-52B788?style=flat-square)](https://usafe.com)
[![Security](https://img.shields.io/badge/Security-FIDO2%20L3%20Enclave-DDA15E?style=flat-square)](https://usafe.com)
[![Privacy](https://img.shields.io/badge/Architecture-Zero--Knowledge-7E78D2?style=flat-square)](https://usafe.com)

**uSafe** is a universal commercial web portal and sovereign operating suite. It combines hardware-backed security (Amber OS & NXP SE050 Hardware Keystores), zero-knowledge cloud applications (uDocs, uSheets, uSlides, uDrive, uMail, uChat), an encrypted P2P mesh network (OpenClaw), and on-device private AI compute (Aura AI).

---

## 📑 Live Changelog & Release Notes

A standalone, styled release page is available directly at:
- **`public/updates.html`** (served at `/updates.html` in the application)

---

## 🚀 Key Implemented Features & Architecture

### 1. 🌐 Sovereign Multi-Domain Routing & Jurisdiction Localization
- **6 Global Regional TLDs**:
  - `usafe.com` (Global Standard)
  - `usafe.in` (India Sovereign Zone, ₹ INR Pricing, Mumbai egress)
  - `usafe.is` (Iceland Privacy Haven, ISK Pricing, Reykjavik egress)
  - `usafe.de` (Germany / EU GDPR Compliant, EUR Pricing, Frankfurt egress)
  - `usafe.jp` (Japan Asia-Pacific, JPY Pricing, Tokyo egress)
  - `usafe.ch` (Switzerland Banking Privacy, CHF Pricing, Zurich egress)
- **Subdomain Routing Engine**: Automatic resolver generating live endpoints (`mail.usafe.*`, `docs.*`, `drive.*`, `auth.*`, `aura.*`, `openclaw.*`).

---

### 2. 🔐 Hardware-Isolated Passkey Authentication (uAuth SSO)
- **FIDO2 Level 3 Hardware Enclave Simulation**:
  - Hardware authentication against NXP SE050 Secure Element root keys.
  - Interactive **2.0-second biometric unlock animation** with dual rotating holographic SVG scan rings, radial conic-gradient sweep, and laser scanline feedback.
  - Generates verifiable curve **Ed25519** assertion signatures without passwords.
  - Dual triggers: Click *"Verify Identity"* or touch the glowing sensor ring directly.

---

### 3. 📱 Pro Shield & Zero-Knowledge QR Device Pairing
- **Cross-Device Hardware Attestation**:
  - Ephemeral Kyber-1024 + Ed25519 pairing payload URIs.
  - **60-Second Nonce Countdown Rotation** with dynamic SVG QR code matrix.
  - Integrated camera viewfinder scanner simulation.
  - Hardware node manager tracking synchronized handsets, desktops, and security keys with revocation support.

---

### 4. 💳 Normalized Per-Month Pricing System
- **Transparent Monthly Breakdown**:
  - **Free Sovereign**: `$0/month` (₹0/mo) — 1 GB zero-knowledge vault + on-device Aura AI.
  - **AmberOS Early Access**: `$0/month` (₹0/mo) — 5 GB hardware-unlocked sovereign vault.
  - **Pro Shield**: `$5/month` (`₹399/mo` on `usafe.in`) — 100 GB encrypted storage, instant QR device pairing, and high-bandwidth AI compute. Annual billing option displays the effective `$4.17/month` rate (`₹332.50/mo`).
  - **Enterprise Enclave**: `$250/month base` (`₹21,500/mo` on `usafe.in`) with dedicated enclave isolation.

---

### 5. 📦 Zero-Knowledge Ecosystem Applications Suite
Full suite of collaborative sovereign tools with sandboxed interactive webviews:
- **uDocs**: End-to-end encrypted real-time document editor with CRDT sync.
- **uSheets**: Zero-knowledge spreadsheet application with local formulas.
- **uSlides**: Sovereign presentation software with offline rendering.
- **uDrive**: Chunked ChaCha20-Poly1305 cloud storage vault.
- **uMail**: Post-quantum encrypted webmail with automated PGP handshake.
- **uChat**: Double-ratchet peer-to-peer encrypted messaging.
- **uVault**: Hardware-isolated credential & identity keystore.
- **Amber Studio**: Sovereign developer IDE with zero cloud telemetry.

---

### 6. ⚡ OpenClaw Encrypted Mesh & Aura On-Device AI
- **OpenClaw Mesh**: Multi-hop P2P encrypted routing bypassing centralized ISP surveillance with live egress nodes across Zurich, Tokyo, Reykjavik, and Mumbai.
- **Aura AI Assistant**: Floating on-device AI copilot running quantized tokenizers with zero prompt logging or remote data leaks.

---

### 7. 🎛️ Tailwind Admin & Control Plane (`admin.usafe.*`)
- **Theme Matrix**: 22% rounded squircles, `#0A0B0E` tactical canvas, `#14161D` surfaces, `#DDA15E` Ochre, `#52B788` Sage, `#4A6FA5` Dusty Cobalt, and `#7E78D2` Slate Lavender.
- **RBAC Role Matrix**: `SuperAdmin`, `MeshOperator`, `SecurityAuditor`, and `ContentManager`.
- **5 Operational Modules**:
  - **Live Telemetry & Identity Hub**: Real-time tracking of 14,800+ `@amber.id` accounts, 24-hour FIDO2 authorization rates, and live PASETO v4 token ledger inspection.
  - **OpenClaw Node Fleet Orchestrator**: Live node matrix across Zurich, Tokyo, Reykjavik, Mumbai, Frankfurt, and Singapore with **Node Drain**, **Nonce Key Rotation**, and embedded **WebSocket CLI / Terminal**.
  - **Dynamic CMS & ISR Publisher**: Live copy editor with on-demand Next.js 15 Incremental Static Regeneration cache purging (`revalidatePath('/')` & `revalidateTag('ecosystem-metadata')`).
  - **Zero-Knowledge Crash Diagnostic Room**: Real-time anonymized kernel panic and app crash streams with 100% PII scrubbed by hardware enclaves.
  - **System Changelog & Build Ledger**: Local `updates.json` parser with chronological release timeline, Ed25519 PKI verification, release tags, and JSON schema exporter.

---

### 8. ⚡ REST / WSS APIs & Interactive Developer Playground (`api.usafe.*` / `developers.usafe.*`)
Interactive developer test suite with live cURL & TypeScript generators for:
- `POST /v1/auth/register`: Device onboarding & public key ledger entry.
- `POST /v1/auth/challenge`: FIDO2 anti-replay nonce generation.
- `POST /v1/auth/passkey/verify`: Hardware enclave assertion verification.
- `POST /v1/auth/token`: OAuth 2.0 PKCE stateless PASETO v4 token issuance.
- `POST /v1/auth/revoke`: Emergency Duress PIN / session purge.
- `POST /v1/bridge/google`: Zero-knowledge secondary account linkage.
- `WSS /v1/mesh/tunnel`: Multi-hop encrypted socket stream (XChaCha20-Poly1305).
- `POST /v1/mesh/compute/delegate`: Amber Pico (<16MB RAM) blind compute delegation.

---

### 9. 🛡️ Cloudflare Worker Edge Landing Router (`workers/edge-landings/worker.ts`)
- Sub-15KB ultra-fast zero-JS semantic edge landing router.
- Instant TTFB (<20ms) with `Cache-Control: public, max-age=3600, s-maxage=86400`.
- Dynamic domain-scope preservation for `usafe.in` vs `usafe.net`.

---

## 🛠️ Project Structure

```text
/
├── android/
│   ├── scripts/
│   │   └── flash_amber_dedicated.sh # Fastboot & Dimensity MT6833 HAL patch engine
│   ├── ime/
│   │   └── AmberKeyboardService.kt  # Zero-permission Jetpack Compose IME
│   ├── transfer/
│   │   └── AmberTransferService.kt  # AES-GCM-256 data extraction & OOBE restore
│   └── telemetry/
│       └── AmberTelemetryService.kt # Non-PII fleet heartbeat & SQLite offline queue
├── public/
│   ├── updates.html        # Interactive HTML release log & updates matrix
│   └── assets/             # Brand logos & static vector assets
├── workers/
│   └── edge-landings/
│       └── worker.ts       # Sub-15KB Cloudflare Worker edge router
├── src/
│   ├── components/
│   │   ├── AdminConsole.tsx       # Tailwind Admin Control Plane & Node Orchestrator
│   │   ├── AmberInstallRoutes.tsx # Multi-route installation, DSU sideloader & APK launcher
│   │   ├── ApiExplorer.tsx        # Interactive REST / WSS SSO & Mesh API Playground
│   │   ├── AmberShowcase.tsx      # Amber Handset 17 Pro & Desktop launcher view
│   │   ├── AppDrawer.tsx          # Slide-over sovereign app ecosystem drawer
│   │   ├── AppModalPreview.tsx    # Sandboxed interactive application webviews
│   │   ├── AuraChatbot.tsx        # Floating zero-knowledge AI assistant
│   │   ├── DashboardView.tsx      # Sovereign authenticated account dashboard
│   │   ├── Footer.tsx             # Multi-domain directory & compliance footer
│   │   ├── Hero.tsx               # Interactive hero showcase with dynamic badges
│   │   ├── Navbar.tsx             # Top navigation with 5-view switcher & domain selector
│   │   ├── OpenClawMesh.tsx       # P2P mesh topology & multi-hop egress inspector
│   │   ├── PasskeyModal.tsx       # FIDO2 passkey gateway & 2s biometric animation
│   │   ├── Pricing.tsx            # Per-month sovereign subscription matrix
│   │   ├── ProductGrid.tsx        # Core product feature cards with quick launch
│   │   ├── QRPairingModal.tsx     # Zero-knowledge QR cross-device sync modal
│   │   └── SystemChangelog.tsx    # Chronological matte release timeline & updates parser
│   ├── lib/
│   │   ├── data.ts              # Ecosystem apps, node fleet, crash streams & API specs
│   │   └── domains.ts           # Multi-domain resolver (.in vs .net) & subdomains
│   ├── App.tsx                  # Master View Router (Landing, Account, Admin, APIs)
│   ├── types.ts                 # Core TypeScript interfaces & RBAC definitions
│   ├── index.css                # Global Tailwind CSS styles
│   └── main.tsx                 # React entry point
├── metadata.json                # AI Studio platform metadata
├── package.json                 # Project dependencies and build scripts
└── vite.config.ts               # Vite configuration
```

---

## 💻 Tech Stack

- **Framework**: React 18+ with TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS with custom sovereign color architecture (`#0E0E10`, `#181A22`, `#DDA15E`, `#52B788`, `#7E78D2`, `#E07A5F`)
- **Icons**: `lucide-react`
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 🚦 Build & Verification Commands

```bash
# Type check and lint codebase
npm run lint

# Production build
npm run build
```

---

## 📄 License & Sovereignty

Built for the **uSafe Sovereign Operating Foundation**. Zero Telemetry. Zero Third-Party Trackers. 100% Client-Side Cryptographic Verifiability.
