/* ==========================================================================
   LAXMI PHARMA DISTRIBUTION - B2B ONBOARDING & QUOTE FORM HANDLER
   Compliant with Indian Drug Rules (Form 20B/21B) & GST e-invoicing
   ========================================================================== */

function initFormHandler() {
  const form = document.getElementById("b2b-quote-form");
  if (!form) return;

  const phoneInput = document.getElementById("quote-phone");
  const licenseInput = document.getElementById("quote-license");
  const gstinInput = document.getElementById("quote-gstin");

  // Real-time phone sanitizer
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
  }

  // Auto-uppercase license & GST
  if (licenseInput) {
    licenseInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
  }
  if (gstinInput) {
    gstinInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase().slice(0, 15);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Extract values
    const entityName = document.getElementById("quote-business-name").value.trim();
    const contactPerson = document.getElementById("quote-contact-name").value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const email = document.getElementById("quote-email").value.trim();
    const licenseNo = licenseInput ? licenseInput.value.trim() : "";
    const gstin = gstinInput ? gstinInput.value.trim() : "";
    const facilityType = document.getElementById("quote-facility-type").value;
    const city = document.getElementById("quote-city").value.trim() || "Ahmedabad";
    const medicines = document.getElementById("quote-medicines-field").value.trim();
    const isUrgent = document.getElementById("quote-urgent-check")?.checked;

    // Validation
    if (!entityName || entityName.length < 3) {
      if (window.showToast) window.showToast("Please enter a valid Pharmacy / Healthcare Facility name.", "error");
      document.getElementById("quote-business-name")?.focus();
      return;
    }

    if (!contactPerson || contactPerson.length < 2) {
      if (window.showToast) window.showToast("Please provide the contact person's name.", "error");
      document.getElementById("quote-contact-name")?.focus();
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      if (window.showToast) window.showToast("Please enter a valid 10-digit Indian mobile number.", "error");
      phoneInput?.focus();
      return;
    }

    if (!licenseNo || licenseNo.length < 4) {
      if (window.showToast) window.showToast("Please enter your Drug License Number (Form 20B/21B) or state 'Pending'.", "error");
      licenseInput?.focus();
      return;
    }

    // Generate B2B Reference ID
    const refCode = "LP-GJ-" + Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    // Format WhatsApp Message Payload
    const urgentFlag = isUrgent ? "🚨 *URGENT 4-HOUR EMERGENCY DISPATCH REQUESTED*" : "📋 *Standard B2B Quotation / Onboarding Request*";
    const waMessage = 
`${urgentFlag}
*Ref Code:* ${refCode} (${dateStr})

*Business Entity:* ${entityName}
*Facility Type:* ${facilityType.toUpperCase()}
*Drug License No:* ${licenseNo}
*GSTIN:* ${gstin || "N/A (Unregistered / In-Process)"}
*City / District:* ${city}

*Authorized Contact:* ${contactPerson}
*Phone / WhatsApp:* +91 ${phone}
*Email:* ${email || "N/A"}

*Medicine Requirements / Selected SKUs:*
${medicines || "Full monthly replenishment price-list requested."}

---
*Generated via Laxmi Pharma Distribution Gujarat Portal*`;

    const encodedWaUrl = `https://api.whatsapp.com/send?phone=916355459482&text=${encodeURIComponent(waMessage)}`;

    // Display confirmation modal
    showConfirmationModal({
      refCode,
      entityName,
      contactPerson,
      phone,
      facilityType,
      city,
      licenseNo,
      medicines,
      isUrgent,
      waUrl: encodedWaUrl
    });

    // Reset form & cart
    form.reset();
    if (window.getQuoteCart) {
      window.getQuoteCart().length = 0;
      const countBadge = document.getElementById("quote-cart-count");
      if (countBadge) countBadge.style.display = "none";
    }
  });
}

/**
 * Display Structured B2B Order Confirmation Modal
 */
function showConfirmationModal(data) {
  const modalBackdrop = document.getElementById("quote-modal-backdrop");
  const modalContent = document.getElementById("quote-modal-content");
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-emerald-50); color: var(--color-emerald-600); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 2px solid var(--color-emerald-100);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <span class="badge badge-verified" style="margin-bottom: 0.5rem;">Inquiry Registered Successfully</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">Quotation Reference: ${data.refCode}</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 4px;">A dedicated Relationship Manager at Ahmedabad Central Depot has received your details.</p>
    </div>

    <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; font-size: var(--fs-sm); margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Facility:</span>
        <strong style="color: var(--text-main);">${data.entityName} (${data.facilityType})</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Drug License:</span>
        <span class="mono" style="font-weight: 600; color: var(--text-main);">${data.licenseNo}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Location:</span>
        <span style="color: var(--text-main);">${data.city}, Gujarat</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Dispatch SLA:</span>
        <span style="color: ${data.isUrgent ? 'var(--color-rose-500)' : 'var(--color-emerald-600)'}; font-weight: 700;">
          ${data.isUrgent ? '⚡ Urgent Express (Under 4 Hours)' : 'Standard Next-Morning Scheduled Delivery'}
        </span>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="${data.waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.109-.064-.265-.084-.606-.214-1.047-.406-1.879-.817-3.102-2.71-3.197-2.836-.095-.126-.767-.997-.767-1.921 0-.924.475-1.378.644-1.569.17-.19.37-.238.494-.238.125 0 .25.002.358.007.114.005.267-.043.418.318.157.375.534 1.299.581 1.394.048.095.079.206.016.333-.063.127-.095.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.494.814 1.06 1.318.728.649 1.341.85 1.531.945.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.159.429-.095.175.063 1.11.524 1.301.619.19.095.317.143.365.222.048.079.048.46-.096.865z"/></svg>
        Transmit to WhatsApp Dispatch Desk Now
      </a>

      <button type="button" class="btn btn-outline" style="width: 100%;" onclick="closeConfirmationModal()">
        Done / Return to Catalog
      </button>
    </div>
  `;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeConfirmationModal() {
  const modalBackdrop = document.getElementById("quote-modal-backdrop");
  if (modalBackdrop) modalBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

window.initFormHandler = initFormHandler;
window.closeConfirmationModal = closeConfirmationModal;
