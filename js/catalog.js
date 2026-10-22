/* ==========================================================================
   LAXMI PHARMA DISTRIBUTION - PRODUCT CATALOG & SKU ENGINE
   Genuine Pharmaceutical Formulations across Gujarat Healthcare Networks
   Dual Filter System: Browse by Dosage Form & Browse by Manufacturer (6 Authorized)
   ========================================================================== */

const PHARMA_CATALOG = [
  // 1. INJECTABLES: Vials, Ampoules, Infusions
  {
    id: "SKU-INJ-001",
    name: "Piperacillin & Tazobactam 4.5g Inj",
    brand: "Pipzo 4.5g Injection",
    manufacturer: "Sun Pharma",
    dosageGroup: "injectables",
    categoryLabel: "Injectables (Vials)",
    dosageForm: "Dry Powder Vial + 20ml WFI",
    packSize: "Glass Vial Pack",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "ICU nosocomial pneumonia, severe intra-abdominal infections",
    gstRate: "12%",
    hsn: "300420",
    inStock: true
  },
  {
    id: "SKU-INJ-002",
    name: "Human Regular Insulin IP 40 IU/ml",
    brand: "Torrent Actrapid Insulin 40IU",
    manufacturer: "Torrent Pharmaceuticals",
    dosageGroup: "injectables",
    categoryLabel: "Injectables (Cold Chain)",
    dosageForm: "Vial (10ml)",
    packSize: "10ml Glass Vial",
    storage: "2°C – 8°C (Cold Chain Strict)",
    tempClass: "cold",
    indication: "Diabetes Mellitus, ICU glycemic stabilization",
    gstRate: "12%",
    hsn: "300431",
    inStock: true
  },
  {
    id: "SKU-INJ-003",
    name: "Enoxaparin Sodium 40mg / 0.4ml",
    brand: "Zydus Clex-Enoxa 40mg PFS",
    manufacturer: "Zydus Lifesciences",
    dosageGroup: "injectables",
    categoryLabel: "Injectables (PFS)",
    dosageForm: "Prefilled Syringe (PFS)",
    packSize: "Box of 2 Prefilled Syringes",
    storage: "Store below 25°C (Do Not Freeze)",
    tempClass: "normal",
    indication: "DVT prophylaxis, acute coronary syndrome",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-INJ-004",
    name: "Ceftriaxone Sodium 1g IV/IM",
    brand: "Cipla Ceftas 1g Inj",
    manufacturer: "Cipla Ltd",
    dosageGroup: "injectables",
    categoryLabel: "Injectables (Vials)",
    dosageForm: "Sterile Powder for Inj",
    packSize: "Vial + 10ml WFI",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Bacterial meningitis, perioperative surgical prophylaxis",
    gstRate: "12%",
    hsn: "300420",
    inStock: true
  },
  {
    id: "SKU-INJ-005",
    name: "Pantoprazole for Injection BP 40mg",
    brand: "Pan-40 IV Injection",
    manufacturer: "Alkem Laboratories",
    dosageGroup: "injectables",
    categoryLabel: "Injectables (Vials)",
    dosageForm: "Lyophilized Powder Vial",
    packSize: "Single Vial with Diluent",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Acute upper GI bleeding, acute GERD in non-oral patients",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-INJ-006",
    name: "Tranexamic Acid Injection 500mg/5ml",
    brand: "Mankind Texakind 500mg Inj",
    manufacturer: "Mankind Pharma",
    dosageGroup: "injectables",
    categoryLabel: "Injectables (Ampoules)",
    dosageForm: "Liquid Ampoules",
    packSize: "Box of 5 x 5ml Ampoules",
    storage: "Store below 30°C",
    tempClass: "normal",
    indication: "Emergency trauma hemorrhage control, menorrhagia, surgical bleeding",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },

  // 2. SOLID DOSAGE FORMS: Tablets, Capsules
  {
    id: "SKU-SOL-001",
    name: "Telmisartan 40mg + Amlodipine 5mg",
    brand: "Torrent Telma-AM",
    manufacturer: "Torrent Pharmaceuticals",
    dosageGroup: "solids",
    categoryLabel: "Solid Dosage (Tablets)",
    dosageForm: "Film-coated Tablets",
    packSize: "Strip of 15 Tablets",
    storage: "Store below 30°C",
    tempClass: "normal",
    indication: "Essential hypertension, cardiovascular risk management",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-SOL-002",
    name: "Amoxicillin & Potassium Clavulanate 625mg",
    brand: "Alkem Clavam 625",
    manufacturer: "Alkem Laboratories",
    dosageGroup: "solids",
    categoryLabel: "Solid Dosage (Tablets)",
    dosageForm: "Film-coated Tablets",
    packSize: "Strip of 10 Tablets (Alu-Alu)",
    storage: "Store in moisture-proof pack below 25°C",
    tempClass: "normal",
    indication: "Lower respiratory infections, ENT bacterial sinusitis",
    gstRate: "12%",
    hsn: "300410",
    inStock: true
  },
  {
    id: "SKU-SOL-003",
    name: "Montelukast 10mg + Levocetirizine 5mg",
    brand: "Cipla Montair-LC",
    manufacturer: "Cipla Ltd",
    dosageGroup: "solids",
    categoryLabel: "Solid Dosage (Tablets)",
    dosageForm: "Bilayered Tablets",
    packSize: "Strip of 15 Tablets",
    storage: "Store in cool dry place",
    tempClass: "normal",
    indication: "Allergic rhinitis, seasonal asthma prophylaxis",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-SOL-004",
    name: "Rosuvastatin 10mg + Aspirin 75mg",
    brand: "Sun Pharma Rosuvas-A 10",
    manufacturer: "Sun Pharma",
    dosageGroup: "solids",
    categoryLabel: "Solid Dosage (Capsules)",
    dosageForm: "Hard Gelatin Capsules",
    packSize: "Strip of 15 Capsules",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Dyslipidemia, prevention of atherosclerotic cardiovascular events",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-SOL-005",
    name: "Cefixime 200mg + Ofloxacin 200mg",
    brand: "Mankind Mahacef-Plus",
    manufacturer: "Mankind Pharma",
    dosageGroup: "solids",
    categoryLabel: "Solid Dosage (Tablets)",
    dosageForm: "Film-coated Tablets",
    packSize: "Strip of 10 Tablets",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Typhoid fever, complicated urinary tract infections",
    gstRate: "12%",
    hsn: "300420",
    inStock: true
  },
  {
    id: "SKU-SOL-006",
    name: "Rabeprazole Sodium 20mg + Domperidone 30mg SR",
    brand: "Zydus Happi-D",
    manufacturer: "Zydus Lifesciences",
    dosageGroup: "solids",
    categoryLabel: "Solid Dosage (Capsules)",
    dosageForm: "Sustained Release Capsules",
    packSize: "Strip of 15 Capsules",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Non-ulcer dyspepsia, gastroesophageal reflux disease",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },

  // 3. LIQUID ORALS: Syrups, Suspensions, Drops
  {
    id: "SKU-LIQ-001",
    name: "Levosalbutamol + Ambroxol + Guaiphenesin",
    brand: "Cipla Ascoril-LS Syrup",
    manufacturer: "Cipla Ltd",
    dosageGroup: "liquids",
    categoryLabel: "Liquid Orals (Syrup)",
    dosageForm: "Oral Expectorant Syrup",
    packSize: "100ml PET Bottle with Measure Cap",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Productive wet cough, bronchial asthma, acute bronchitis",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-LIQ-002",
    name: "Paracetamol 250mg / 5ml Suspension",
    brand: "Mankind Doloquik Paediatric",
    manufacturer: "Mankind Pharma",
    dosageGroup: "liquids",
    categoryLabel: "Liquid Orals (Suspension)",
    dosageForm: "Pediatric Oral Suspension",
    packSize: "60ml Bottle",
    storage: "Store below 25°C (Shake Well)",
    tempClass: "normal",
    indication: "Pediatric fever reduction, acute childhood pain relief",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-LIQ-003",
    name: "Magaldrate 400mg + Simethicone 20mg Oral Gel",
    brand: "Alkem Almacarb Suspension",
    manufacturer: "Alkem Laboratories",
    dosageGroup: "liquids",
    categoryLabel: "Liquid Orals (Suspension)",
    dosageForm: "Antacid Oral Liquid",
    packSize: "200ml Mint Flavored Bottle",
    storage: "Store below 30°C",
    tempClass: "normal",
    indication: "Heartburn, acid indigestion, gastritis flatulence",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-LIQ-004",
    name: "Vitamin D3 Oral Drops 800 IU/ml",
    brand: "Sun Pharma D3-Must Drops",
    manufacturer: "Sun Pharma",
    dosageGroup: "liquids",
    categoryLabel: "Liquid Orals (Paediatric Drops)",
    dosageForm: "Oral Drops with Calibrated Dropper",
    packSize: "15ml Dropper Bottle",
    storage: "Store below 25°C in Dark",
    tempClass: "normal",
    indication: "Infant rickets prevention, vitamin D deficiency",
    gstRate: "12%",
    hsn: "300450",
    inStock: true
  },

  // 4. TOPICALS: Ointments, Creams, Gels
  {
    id: "SKU-TOP-001",
    name: "Mupirocin Ointment IP 2.0% w/w",
    brand: "Cipla Supirocin 2% Ointment",
    manufacturer: "Cipla Ltd",
    dosageGroup: "topicals",
    categoryLabel: "Topicals (Ointment)",
    dosageForm: "Dermatological Ointment",
    packSize: "5g / 15g Lami Tube",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Impetigo, foliculitis, primary and secondary bacterial dermatoses",
    gstRate: "12%",
    hsn: "300420",
    inStock: true
  },
  {
    id: "SKU-TOP-002",
    name: "Diclofenac Diethylamine + Virgin Linseed Oil + Methyl Salicylate + Menthol",
    brand: "Sun Pharma Volini Pain Relief Gel",
    manufacturer: "Sun Pharma",
    dosageGroup: "topicals",
    categoryLabel: "Topicals (Gel)",
    dosageForm: "Analgesic Fast-Acting Gel",
    packSize: "30g / 50g Tube",
    storage: "Store below 30°C",
    tempClass: "normal",
    indication: "Joint pain, musculoskeletal sprains, backache, sports injuries",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-TOP-003",
    name: "Clotrimazole 1.0% + Beclomethasone 0.025% Cream",
    brand: "Zydus Candid-B Cream",
    manufacturer: "Zydus Lifesciences",
    dosageGroup: "topicals",
    categoryLabel: "Topicals (Cream)",
    dosageForm: "Broad-Spectrum Antifungal Cream",
    packSize: "20g Tube",
    storage: "Store below 25°C (Do Not Freeze)",
    tempClass: "normal",
    indication: "Tinea cruris, tinea corporis, fungal skin infections with inflammation",
    gstRate: "12%",
    hsn: "300420",
    inStock: true
  },

  // 5. OTHER DOSAGE FORMS: Ophthalmic, Respiratory, Consumables
  {
    id: "SKU-OTH-001",
    name: "Budesonide Respiration Suspension 0.5mg/2ml",
    brand: "Cipla Budecort 0.5mg Respules",
    manufacturer: "Cipla Ltd",
    dosageGroup: "others",
    categoryLabel: "Respiratory (Respules)",
    dosageForm: "Inhalation Suspension",
    packSize: "Pack of 5 x 2ml Respules",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Acute severe bronchial asthma nebulization in clinics & hospitals",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-OTH-002",
    name: "Carboxymethylcellulose Sodium 0.5% Eye Drops",
    brand: "Torrent Lubrex Eye Drops",
    manufacturer: "Torrent Pharmaceuticals",
    dosageGroup: "others",
    categoryLabel: "Ophthalmic Drops",
    dosageForm: "Sterile Ophthalmic Solution",
    packSize: "10ml Dropper Vial",
    storage: "Store below 25°C",
    tempClass: "normal",
    indication: "Dry eye discomfort, post-cataract corneal surface hydration",
    gstRate: "12%",
    hsn: "300490",
    inStock: true
  },
  {
    id: "SKU-OTH-003",
    name: "IV Cannula with Injection Port & Wings (20G & 22G)",
    brand: "Poly Medicure / Hospital Pack",
    manufacturer: "Zydus Lifesciences",
    dosageGroup: "others",
    categoryLabel: "Medical Consumables",
    dosageForm: "Sterile Medical Device",
    packSize: "Box of 50 Units",
    storage: "Controlled Room Temperature",
    tempClass: "normal",
    indication: "Peripheral venous infusion access, hospital ICU line",
    gstRate: "12%",
    hsn: "901839",
    inStock: true
  }
];

// In-Memory Quote Cart State
let quoteCart = [];

/**
 * Initialize Catalog Engine with Dual-Dimension Filtering
 */
function initCatalog() {
  const catalogGrid = document.getElementById("catalog-grid");
  const searchInput = document.getElementById("catalog-search");
  const dosageButtons = document.querySelectorAll(".dosage-chip");
  const mfgSelect = document.getElementById("catalog-mfg-select");

  if (!catalogGrid) return;

  renderCatalog(PHARMA_CATALOG);

  // 1. Filter by Dosage Form
  dosageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      dosageButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      runCompositeFilter();
    });
  });

  // 2. Filter by Manufacturer
  if (mfgSelect) {
    mfgSelect.addEventListener("change", runCompositeFilter);
  }

  // 3. Real-time Search with Debouncing
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runCompositeFilter, 120);
    });
  }
}

/**
 * Run Composite Filter: Dosage Form + Manufacturer + Search Keyword
 */
function runCompositeFilter() {
  const activeDosageBtn = document.querySelector(".dosage-chip.active");
  const selectedDosage = activeDosageBtn ? activeDosageBtn.getAttribute("data-dosage") : "all";

  const mfgSelect = document.getElementById("catalog-mfg-select");
  const selectedMfg = mfgSelect ? mfgSelect.value : "all";

  const searchInput = document.getElementById("catalog-search");
  const query = searchInput ? (searchInput.value || "").trim().toLowerCase() : "";

  const filtered = PHARMA_CATALOG.filter(item => {
    // Dosage check
    const matchesDosage = selectedDosage === "all" || item.dosageGroup === selectedDosage;

    // Manufacturer check
    const matchesMfg = selectedMfg === "all" || item.manufacturer.toLowerCase().includes(selectedMfg.toLowerCase());

    // Search query check
    const matchesQuery = !query ||
      item.name.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.manufacturer.toLowerCase().includes(query) ||
      item.indication.toLowerCase().includes(query) ||
      item.dosageForm.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query);

    return matchesDosage && matchesMfg && matchesQuery;
  });

  renderCatalog(filtered);
}

/**
 * Render Catalog SKU Cards into DOM
 */
function renderCatalog(items) {
  const container = document.getElementById("catalog-grid");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface-elevated); border: 1px dashed var(--border-medium); border-radius: var(--radius-2xl);">
        <svg style="width: 48px; height: 48px; color: var(--color-accent-600); margin: 0 auto 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="font-size: var(--fs-lg); margin-bottom: 0.5rem; color: var(--text-main);">No Formulations Found for This Filter</h3>
        <p style="color: var(--text-muted); font-size: var(--fs-sm); max-width: 580px; margin: 0 auto 1.5rem;">
          We represent 6 authorized manufacturers with over 500 products in Gujarat. Contact our pharmacist dispatch desk directly for immediate stock inquiries or alternative formulations.
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-outline btn-sm" onclick="resetCatalogFilters()">Reset Filters</button>
          <a href="#contact" class="btn btn-primary btn-sm">Direct WhatsApp Enquiry</a>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const isCold = item.tempClass === "cold";
    const isInCart = quoteCart.some(c => c.id === item.id);

    return `
      <article class="sku-card" data-id="${item.id}">
        <div>
          <div class="sku-card-header">
            <span class="sku-category-tag">${item.categoryLabel}</span>
            ${isCold 
              ? `<span class="badge badge-cold"><span class="sensor-dot" style="width:6px;height:6px;"></span> 2°C – 8°C Cold Chain</span>`
              : `<span class="badge badge-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Authorized</span>`
            }
          </div>

          <h3 class="sku-title">${item.brand}</h3>
          <p class="sku-generic">${item.name}</p>

          <div class="sku-specs-list">
            <div class="sku-spec-item">
              <span class="sku-spec-lbl">Manufacturer</span>
              <span class="sku-spec-val">${item.manufacturer}</span>
            </div>
            <div class="sku-spec-item">
              <span class="sku-spec-lbl">Dosage Form</span>
              <span class="sku-spec-val">${item.dosageForm}</span>
            </div>
            <div class="sku-spec-item">
              <span class="sku-spec-lbl">Pack Packaging</span>
              <span class="sku-spec-val">${item.packSize}</span>
            </div>
            <div class="sku-spec-item">
              <span class="sku-spec-lbl">Storage Spec</span>
              <span class="sku-spec-val">${item.storage}</span>
            </div>
          </div>
        </div>

        <div class="sku-footer">
          <button type="button" class="btn btn-outline btn-sm" onclick="openSkuModal('${item.id}')">
            View Details
          </button>
          <button type="button" class="btn ${isInCart ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="toggleQuoteItem('${item.id}')">
            ${isInCart ? '✓ Added' : '+ Add to Quote'}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function resetCatalogFilters() {
  const searchInput = document.getElementById("catalog-search");
  if (searchInput) searchInput.value = "";

  const mfgSelect = document.getElementById("catalog-mfg-select");
  if (mfgSelect) mfgSelect.value = "all";

  const dosageButtons = document.querySelectorAll(".dosage-chip");
  dosageButtons.forEach(b => b.classList.remove("active"));
  if (dosageButtons[0]) dosageButtons[0].classList.add("active");

  runCompositeFilter();
}

/**
 * Open SKU Detail Monograph Modal (Requires Login)
 */
function openSkuModal(id) {
  const item = PHARMA_CATALOG.find(i => i.id === id);
  if (!item) return;

  if (window.requireLogin && !window.requireLogin(`Product Report: ${item.brand}`, () => openSkuModal(id))) {
    return;
  }

  const modalBackdrop = document.getElementById("sku-modal-backdrop");
  const modalContent = document.getElementById("sku-modal-content");
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
      <div>
        <span class="section-tag" style="margin-bottom: 0.5rem;">${item.categoryLabel}</span>
        <h2 style="font-size: var(--fs-2xl); font-weight: 800; color: var(--text-main);">${item.brand}</h2>
        <p style="font-size: var(--fs-sm); color: var(--text-muted); font-style: italic;">${item.name}</p>
      </div>
      <button class="modal-close-btn" onclick="closeSkuModal()" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Principal Manufacturer</span>
          <p style="font-weight: 700; color: var(--text-main);">${item.manufacturer}</p>
        </div>
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Dosage & Pack Size</span>
          <p style="font-weight: 700; color: var(--text-main);">${item.packSize}</p>
        </div>
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Storage Temperature</span>
          <p style="font-weight: 700; color: ${item.tempClass === 'cold' ? 'var(--color-cold-500)' : 'var(--text-main)'};">${item.storage}</p>
        </div>
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Statutory GST & HSN</span>
          <p style="font-weight: 700; color: var(--text-main);">${item.gstRate} (HSN: ${item.hsn})</p>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: var(--fs-sm); font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-main);">Clinical Indications & Usage</h4>
      <p style="font-size: var(--fs-sm); color: var(--text-secondary); line-height: 1.6;">${item.indication}</p>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
      <span class="badge badge-verified">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        100% Genuine Direct Billing Guarantee
      </span>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-primary" onclick="toggleQuoteItem('${item.id}'); closeSkuModal();">
          Add to B2B Quote
        </button>
      </div>
    </div>
  `;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSkuModal() {
  const modalBackdrop = document.getElementById("sku-modal-backdrop");
  if (modalBackdrop) modalBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Toggle Item in Quote Cart
 */
function toggleQuoteItem(id) {
  const item = PHARMA_CATALOG.find(i => i.id === id);
  if (!item) return;

  const index = quoteCart.findIndex(c => c.id === id);
  if (index > -1) {
    quoteCart.splice(index, 1);
    if (window.showToast) window.showToast(`Removed "${item.brand}" from quote list.`);
  } else {
    quoteCart.push(item);
    if (window.showToast) window.showToast(`Added "${item.brand}" to your quotation request.`);
  }

  updateQuoteCartUI();
  runCompositeFilter();
}

/**
 * Update Quote Cart UI Badges & Pre-populate Form Textarea
 */
function updateQuoteCartUI() {
  const cartBadge = document.getElementById("quote-cart-count");
  if (cartBadge) {
    cartBadge.textContent = quoteCart.length;
    cartBadge.style.display = quoteCart.length > 0 ? "inline-flex" : "none";
  }

  const reqTextarea = document.getElementById("quote-medicines-field");
  if (reqTextarea && quoteCart.length > 0) {
    const itemsList = quoteCart.map(c => `• ${c.brand} (${c.name}) - ${c.manufacturer}`).join("\n");
    reqTextarea.value = `Selected Catalog SKUs (${quoteCart.length}):\n${itemsList}\n\nPlease quote institutional pricing and availability for monthly supply.`;
  }
}

/**
 * Open Downloadable Catalogue & Product Report Modal (Requires Login)
 */
function openCatalogDownloadModal() {
  if (window.requireLogin && !window.requireLogin("Wholesale Product Report & Complete 500+ SKU Catalogue", () => openCatalogDownloadModal())) {
    return;
  }

  const modalBackdrop = document.getElementById("sku-modal-backdrop");
  const modalContent = document.getElementById("sku-modal-content");
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <div style="width: 54px; height: 54px; border-radius: var(--radius-lg); background: var(--color-primary-50); color: var(--color-primary-600); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      </div>
      <span class="badge badge-verified" style="margin-bottom: 0.5rem;">Registered Customer Portal</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">Wholesale Product Report & Complete 500+ SKU Catalogue</h2>
      <p style="font-size: var(--fs-sm); color: var(--text-muted); margin-top: 4px;">
        As per the Drugs & Cosmetics Act, wholesale product price-lists and reports are restricted to licensed pharmacies, hospitals, and registered healthcare facilities.
      </p>
    </div>

    <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem; font-size: var(--fs-sm);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Current Catalogue Version:</span>
        <strong style="color: var(--text-main);">Q4-2026 Master Formulation Index</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Authorized Manufacturers:</span>
        <strong style="color: var(--text-main);">6 Principal Pharmaceutical Companies</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Formulations Handled:</span>
        <span class="badge badge-cold" style="font-size: 0.75rem;">500+ Injectables, Solids, Orals & Topicals</span>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="https://api.whatsapp.com/send?phone=916355459482&text=Hello%20Laxmi%20Pharma%20Distribution,%20please%20send%20the%20complete%20downloadable%20B2B%20medicine%20catalogue%20and%20product%20report%20to%20my%20registered%20pharmacy/hospital." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.109-.064-.265-.084-.606-.214-1.047-.406-1.879-.817-3.102-2.71-3.197-2.836-.095-.126-.767-.997-.767-1.921 0-.924.475-1.378.644-1.569.17-.19.37-.238.494-.238.125 0 .25.002.358.007.114.005.267-.043.418.318.157.375.534 1.299.581 1.394.048.095.079.206.016.333-.063.127-.095.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.494.814 1.06 1.318.728.649 1.341.85 1.531.945.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.159.429-.095.175.063 1.11.524 1.301.619.19.095.317.143.365.222.048.079.048.46-.096.865z"/></svg>
        Request Instant PDF Catalogue & Product Report (6355459482)
      </a>
      <button type="button" class="btn btn-outline" style="width: 100%;" onclick="closeSkuModal()">
        Close Window
      </button>
    </div>
  `;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

window.initCatalog = initCatalog;
window.openSkuModal = openSkuModal;
window.closeSkuModal = closeSkuModal;
window.toggleQuoteItem = toggleQuoteItem;
window.resetCatalogFilters = resetCatalogFilters;
window.openCatalogDownloadModal = openCatalogDownloadModal;
window.downloadCatalogueModal = openCatalogDownloadModal;
window.openProductReportModal = openCatalogDownloadModal;
window.getQuoteCart = () => quoteCart;
