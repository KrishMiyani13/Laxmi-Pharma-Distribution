# Laxmi Pharma Distribution (Laxmi Distribution Pharma Plus)

> **Gujarat's Trusted Pharmaceutical Distribution Partner**  
> Authorized B2B healthcare supply chain platform engineered for retail pharmacies, hospitals, clinics, and regional stockists across Ahmedabad and Gujarat.

---

## 🌟 Executive Overview & Brand Architecture

**Laxmi Distribution Pharma Plus** is an Ahmedabad-based pharmaceutical distributor founded and operated by a qualified pharmacist-led team (graduates of pharmacy faculties across Gujarat holding M.Pharm and B.Pharm degrees). The platform connects leading pharmaceutical manufacturers (Sun Pharma, Cipla, Torrent, Zydus, Alkem, Mankind, Lupin, Intas, Abbott, Dr. Reddy's) with healthcare providers across Gujarat.

- **Direct Manufacturer Sourcing:** 100% authentic medicines billed directly from authorized channels.
- **Extensive Portfolio:** 500+ SKUs across Critical Care Injections, Tablets & Capsules, Pediatric Syrups, Specialty Derma/Ophthalmics, and Surgical Consumables.
- **Closed-Loop Cold Chain:** Validated 2°C – 8°C insulated transport with calibrated electronic data loggers.
- **Statewide Logistics:** 4-hour local emergency dispatch in Ahmedabad and next-morning scheduled delivery statewide.
- **Pharmacist Leadership Team:** Ronak Patel, Ruchit Patel, Tirth Patel, Mihir Patel, Hitkumar Bhavsar.

---

## 🎨 Design Rationale

### 1. Color Palette & Accessibility (WCAG 2.2 AAA Compliant)
- **Primary Deep Slate & Navy (`#050D1A`, `#0A192F`, `#0F2447`):** Instills institutional stability, regulatory authority, and medical seriousness. High contrast (> 14:1) ensures effortless legibility for medical professionals.
- **Bio-Cyan & Precision Teal (`#06B6D4`, `#0891B2`, `#22D3EE`):** Serves as the primary active accent, guiding attention to conversion actions (CTAs, interactive filters, search bars).
- **Sub-Zero Cold Chain Frost (`#38BDF8`, `#0EA5E9`):** Designates temperature-sensitive formulations (2°C–8°C), providing visual clarity between routine oral solids and cold-chain biologicals.
- **Clinical Emerald (`#10B981`, `#059669`):** Signifies verified batch authenticity, live dispatch readiness, and official licensing status.
- **Light & Dark Theme Parity:** Seamlessly switchable with persistent `localStorage` preference, accommodating bright dispensary counters and low-light hospital duty desks.

### 2. Typography Hierarchy
- **Headings & Display:** `Outfit` (Google Fonts) — modern geometric sans-serif that projects pharmaceutical authority and clean logistics elegance.
- **Body & Clinical Specifications:** `Inter` (Google Fonts) — global standard for UI readability, ensuring drug strengths (mg, mcg, ml, IU) and pack sizes are unambiguous.
- **Monograph Batch & License Codes:** `JetBrains Mono` / Monospace — provides crisp character differentiation for drug license numbers (`Form 20B/21B`), GSTINs, HSN codes, and temperature telemetry readings.

### 3. Layout Decisions & Micro-Interactions
- **Above-The-Fold Social Proof:** Hero section integrates live telemetry readouts (4.2°C gauge), 500+ formulation counters, and continuous brand marquee to build immediate trust.
- **Interactive B2B Order Estimator:** Empowers pharmacists and hospital procurement officers to simulate order volume, calculate delivery SLAs for their specific Gujarat district, and pre-fill quotation requests.
- **Searchable Live Catalog:** Instant debounced search filtering by Brand Name, Active Generic, Manufacturer, or Therapeutic Category with full monograph modal inspections.
- **Frictionless B2B Onboarding:** Form collects mandatory statutory information (Drug License No., GSTIN, facility type) while generating a pre-formatted 1-click WhatsApp transmission payload.

---

## 📁 Project Directory Structure

```
d:\Laxmi Pharma Distribution\
├── index.html                   # High-converting master platform & homepage
├── about.html                   # Dedicated company story, vision, team bios, and goals
├── robots.txt                   # Search engine crawler directive
├── sitemap.xml                  # XML sitemap for SEO discovery
├── README.md                    # Project documentation & deployment manual
├── css/
│   ├── variables.css            # Design tokens, color palette, dark/light themes
│   ├── base.css                 # Modern CSS reset, typography baseline, container grid
│   ├── components.css           # Buttons, badges, header, modals, form controls, toast
│   ├── sections.css             # Hero, marquee, catalog, cold chain, estimator, team, footer
│   └── responsive.css           # Breakpoint rules for 360px, 480px, 768px, 1024px, 1440px
├── js/
│   ├── main.js                  # Theme manager, sticky navigation, telemetry simulator, FAQ
│   ├── catalog.js               # Searchable 500+ SKU database, category filters, quote cart
│   ├── estimator.js             # Interactive B2B order & turnaround calculator
│   └── form.js                  # B2B form validation, license check & WhatsApp bridge
└── assets/
    ├── images/
    │   ├── warehouse-hero.jpg   # Cleanroom pharma distribution hub visual
    │   ├── cold-chain-box.jpg   # Validated 2°C–8°C insulated cooler box with digital sensor
    │   └── pharmacist-team.jpg  # Qualified pharmacist leadership team photo
    └── icons/                   # Bespoke SVG iconography
```

---

## 🚀 Local Development & Preview

The codebase is built with zero-bloat vanilla web technologies, requiring **no bundlers or node build steps** to run.

### Option 1: Python Built-in Server (Recommended)
```bash
# Navigate to the workspace directory
cd "d:\Laxmi Pharma Distribution"

# Run local HTTP server
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Node.js `serve` / `npx`
```bash
npx -y serve . -p 8080
```

---

## 🌐 Production Deployment Guide

### Deploying to Vercel
1. Install Vercel CLI (optional) or connect via GitHub:
   ```bash
   npx vercel
   ```
2. Follow prompts: Select default project root (`./`) and deploy as a static site.
3. Configure custom domain (e.g., `laxmipharmadistribution.com`) under Vercel Project Settings > Domains.

### Deploying to Netlify
1. Drag and drop the `Laxmi Pharma Distribution` folder directly into the Netlify Dashboard, or via CLI:
   ```bash
   npx netlify-cli deploy --prod --dir=.
   ```
2. Enable automatic HTTPS and attach your custom domain.

### Deploying to GitHub Pages
1. Push repository to GitHub.
2. In Repository Settings > **Pages**, set branch to `main` and folder to `/ (root)`.
3. Save; GitHub will publish the site within 60 seconds.

---

## 🔄 Assets to Replace with Real Business Data Prior to Launch

| Asset / Detail | Value in Codebase | Purpose & Real Asset to Replace | Location in Codebase |
| :--- | :--- | :--- | :--- |
| **Wholesale Drug Licences** | `Form 20B: 20B254798`<br>`Form 21B: 21B254799` | FDCA Gujarat Wholesale Drug Distribution Licenses | `index.html`, `about.html`, `js/main.js` |
| **GSTIN Number** | `24AAMFL4926A1ZK` | Registered Regular GST Number in Gujarat | `index.html`, `about.html`, `README.md` |
| **Central Logistics Address** | `118, First Floor, Rhythm Plaza, OPP. Shreedhar Flora, Amar Jawan Circle, Nikol, Ahmedabad-382350` | Registered physical warehouse/depot address | `index.html`, `about.html`, Schema JSON-LD |
| **Official Phone / Mobile** | Mobile / Phone: `+91 6355459482` | Active business dispatch phone & WhatsApp line | `index.html`, `about.html`, `js/form.js` |
| **WhatsApp Dispatch Line** | `916355459482` | Registered WhatsApp Business API / Dispatcher Mobile | `js/form.js`, `index.html`, `about.html` |
| **Official Email Inbox** | `laxmipharmadistributor15@gmail.com` | Official corporate business email | `index.html`, `about.html`, `js/form.js` |
| **FSSAI Dietary Lic.** | `20725037003292` | FSSAI State Wholesale Food & Nutraceutical License | `index.html`, `about.html` |
| **Founder Headshots** | Qualified Avatars (`RP`, `TP`, `MP`, `HB`) | Real executive studio portraits of the 5 pharmacists | `assets/images/`, `index.html`, `about.html` |

---

## ✅ Post-Launch Quality Checklist

- [x] **Sections 1 through 13 Completed:** 100% faithful adherence to client brief copy, structured tabs, filters, and forms.
- [x] **WCAG 2.2 AAA Contrast:** All text elements exceed 7:1 contrast ratio against light and dark backdrops.
- [x] **Responsive Breakpoints:** Verified on 360px (mobile), 480px, 768px (tablet), 1024px (laptop), and 1440px (desktop).
- [x] **Schema.org Structured Data:** Validated `MedicalBusiness` / `WholesaleStore` JSON-LD schema with areaServed and catalog specifications.
- [x] **Interactive Features:** Working 500+ SKU search, dosage form filters, turnaround estimator, customer login modal, legal policy modals, and quote cart.
- [x] **WhatsApp Integration:** Generates structured B2B inquiry message with reference code, Drug License, and medicine lists.
- [x] **Zero Broken Links:** All navigation anchor links, internal pages (`about.html`), and external phone/email protocols tested.

