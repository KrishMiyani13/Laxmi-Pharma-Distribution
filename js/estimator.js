/* ==========================================================================
   LAXMI PHARMA DISTRIBUTION - B2B ORDER & TURNAROUND ESTIMATOR
   Interactive calculation engine for Gujarat pharmacies & healthcare centers
   ========================================================================== */

function initEstimator() {
  const facilitySelect = document.getElementById("est-facility");
  const volumeRange = document.getElementById("est-volume-range");
  const volumeDisplay = document.getElementById("est-volume-display");
  const districtSelect = document.getElementById("est-district");

  // Output elements
  const outTurnaround = document.getElementById("est-out-turnaround");
  const outTier = document.getElementById("est-out-tier");
  const outCredit = document.getElementById("est-out-credit");
  const outColdChain = document.getElementById("est-out-coldchain");
  const applyBtn = document.getElementById("est-apply-btn");

  if (!volumeRange || !volumeDisplay) return;

  function formatCurrency(num) {
    return "₹" + Number(num).toLocaleString('en-IN');
  }

  function recalculate() {
    const volume = parseInt(volumeRange.value, 10);
    const facility = facilitySelect ? facilitySelect.value : "pharmacy";
    const district = districtSelect ? districtSelect.value : "ahmedabad";

    // Format display text
    volumeDisplay.textContent = formatCurrency(volume) + (volume >= 1000000 ? "+" : "");

    // 1. Delivery Turnaround Calculation
    let turnaroundText = "Same-Day (Under 4 Hours)";
    if (district === "ahmedabad") {
      turnaroundText = "Same-Day Express (< 4 Hours)";
    } else if (district === "gandhinagar") {
      turnaroundText = "Same-Day (Morning & Evening Vans)";
    } else if (["vadodara", "anand", "mehsana"].includes(district)) {
      turnaroundText = "Next-Morning (By 8:30 AM)";
    } else {
      turnaroundText = "Scheduled 24h Transit (By 10:00 AM)";
    }

    if (outTurnaround) {
      outTurnaround.textContent = turnaroundText;
    }

    // 2. Wholesale Pricing Tier & Credit Terms Calculation
    let tierText = "Standard Retail Chemist Slab";
    let creditText = "7 Days / Weekly Restock Cycle";

    if (volume < 50000) {
      tierText = "Standard Chemist Margin Slab";
      creditText = facility === "hospital" ? "10 Days Institutional" : "7 Days Weekly Settle";
    } else if (volume < 200000) {
      tierText = "Tier-1 Partner (Extra 2.5% Slab)";
      creditText = "14 Days Credit Window";
    } else if (volume < 500000) {
      tierText = "Institutional Hospital Preferred Slab";
      creditText = "21 Days Verified Credit Cycle";
    } else {
      tierText = "Super Stockist Prime Volume Tier";
      creditText = "30 Days Monthly Rolling Settlement";
    }

    if (outTier) outTier.textContent = tierText;
    if (outCredit) outCredit.textContent = creditText;

    // 3. Cold Chain SLA
    if (outColdChain) {
      outColdChain.textContent = "2°C – 8°C Validated Data Logger Included Free";
    }
  }

  volumeRange.addEventListener("input", recalculate);
  if (facilitySelect) facilitySelect.addEventListener("change", recalculate);
  if (districtSelect) districtSelect.addEventListener("change", recalculate);

  // Apply button clicks
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const facility = facilitySelect ? facilitySelect.value : "pharmacy";
      const district = districtSelect ? districtSelect.value : "ahmedabad";
      const volume = volumeRange ? volumeRange.value : "50000";

      // Pre-fill contact form
      const formFacility = document.getElementById("quote-facility-type");
      const formDistrict = document.getElementById("quote-city");
      const formVolume = document.getElementById("quote-volume-tier");

      if (formFacility) formFacility.value = facility;
      if (formDistrict) formDistrict.value = districtSelect ? districtSelect.options[districtSelect.selectedIndex].text : "Ahmedabad";
      if (formVolume) formVolume.value = formatCurrency(volume);

      // Smooth scroll to form
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }

      if (window.showToast) {
        window.showToast("Estimator parameters applied to B2B Onboarding Form below.");
      }
    });
  }

  // Initial run
  recalculate();
}

window.initEstimator = initEstimator;
