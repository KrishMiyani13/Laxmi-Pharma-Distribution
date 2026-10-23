/* ==========================================================================
   LAXMI PHARMA DISTRIBUTION - CORE CONTROLLER & INTERACTIONS
   Theme manager, sticky navigation, mobile drawer, telemetry simulator, FAQ
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initAuth();
  initHeroSlider();
  initTelemetrySimulator();
  initFaqAccordion();
  initScrollAnimations();

  // Initialize sub-modules
  if (window.initCatalog) window.initCatalog();
  if (window.initEstimator) window.initEstimator();
  if (window.initFormHandler) window.initFormHandler();
});

/* ==========================================================================
   1. THEME MANAGER (Light / Dark Mode with Persistence)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const storedTheme = localStorage.getItem("laxmi-pharma-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
  applyTheme(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const active = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(active);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("laxmi-pharma-theme", theme);

  const icons = document.querySelectorAll(".theme-icon");
  icons.forEach(icon => {
    if (theme === "dark") {
      icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      icon.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      icon.setAttribute("aria-label", "Switch to Dark Mode");
    }
  });
}

/* ==========================================================================
   2. STICKY HEADER & 3-HORIZONTAL-LINE NAVIGATION TOGGLE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector(".main-header");
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navMoreBtn = document.getElementById("nav-toggle-more");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  const drawerOverlay = document.querySelector(".mobile-drawer-overlay");
  const drawerCloseBtn = document.querySelector(".mobile-drawer-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky header class toggle
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }, { passive: true });

  function openDrawer() {
    mobileDrawer?.classList.add("active");
    drawerOverlay?.classList.add("active");
    navMoreBtn?.classList.add("active");
    navMoreBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove("active");
    drawerOverlay?.classList.remove("active");
    navMoreBtn?.classList.remove("active");
    navMoreBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleDrawer() {
    if (mobileDrawer?.classList.contains("active")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Bind toggle buttons (both 3-horizontal-line desktop toggle and mobile toggle)
  mobileBtn?.addEventListener("click", toggleDrawer);
  navMoreBtn?.addEventListener("click", toggleDrawer);
  drawerCloseBtn?.addEventListener("click", closeDrawer);
  drawerOverlay?.addEventListener("click", closeDrawer);
  mobileLinks.forEach(link => link.addEventListener("click", closeDrawer));

  // Dropdown toggling for mobile & touch devices
  const dropdownItems = document.querySelectorAll(".nav-item-dropdown");
  dropdownItems.forEach(item => {
    const trigger = item.querySelector(".nav-link");
    trigger?.addEventListener("click", (e) => {
      if (window.innerWidth < 1180 || e.pointerType === "touch") {
        e.preventDefault();
        const isOpen = item.classList.contains("dropdown-active");
        dropdownItems.forEach(d => d.classList.remove("dropdown-active"));
        if (!isOpen) item.classList.add("dropdown-active");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item-dropdown")) {
      dropdownItems.forEach(d => d.classList.remove("dropdown-active"));
    }
  });

  // Press ESC to close drawer or modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      window.closeQuoteModal?.();
      dropdownItems.forEach(d => d.classList.remove("dropdown-active"));
    }
  });
}

/* ==========================================================================
/* ==========================================================================
   MEHER-STYLE HERO SLIDER CONTROLLER
   ========================================================================== */
let heroSliderCurrentIndex = 0;
let heroSliderInterval = null;

function showHeroSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot-btn");
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  heroSliderCurrentIndex = index;

  slides.forEach((slide, i) => {
    if (i === heroSliderCurrentIndex) {
      slide.classList.add("active");
      slide.style.opacity = "1";
      slide.style.visibility = "visible";
      slide.style.zIndex = "2";
      slide.style.pointerEvents = "auto";
    } else {
      slide.classList.remove("active");
      slide.style.opacity = "0";
      slide.style.visibility = "hidden";
      slide.style.zIndex = "1";
      slide.style.pointerEvents = "none";
    }
  });

  dots.forEach((dot, i) => {
    if (i === heroSliderCurrentIndex) {
      dot.classList.add("active");
      dot.setAttribute("aria-selected", "true");
    } else {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", "false");
    }
  });
}

function nextHeroSlide() {
  showHeroSlide(heroSliderCurrentIndex + 1);
  resetHeroSliderAutoPlay();
}

function prevHeroSlide() {
  showHeroSlide(heroSliderCurrentIndex - 1);
  resetHeroSliderAutoPlay();
}

function resetHeroSliderAutoPlay() {
  if (heroSliderInterval) {
    clearInterval(heroSliderInterval);
    heroSliderInterval = null;
  }
  heroSliderInterval = setInterval(() => {
    showHeroSlide(heroSliderCurrentIndex + 1);
  }, 6000);
}

function stopHeroSliderAutoPlay() {
  if (heroSliderInterval) {
    clearInterval(heroSliderInterval);
    heroSliderInterval = null;
  }
}

// Bind globally immediately so HTML inline onclicks never fail
window.sliderPrev = prevHeroSlide;
window.sliderNext = nextHeroSlide;
window.showHeroSlide = showHeroSlide;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot-btn");
  const prevBtn = document.getElementById("slider-prev-btn");
  const nextBtn = document.getElementById("slider-next-btn");
  const sliderSection = document.querySelector(".hero-slider-section");

  if (!slides || slides.length === 0) return;

  prevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    prevHeroSlide();
  });

  nextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextHeroSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showHeroSlide(i);
      resetHeroSliderAutoPlay();
    });
  });

  sliderSection?.addEventListener("mouseenter", stopHeroSliderAutoPlay);
  sliderSection?.addEventListener("mouseleave", resetHeroSliderAutoPlay);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevHeroSlide();
    } else if (e.key === "ArrowRight") {
      nextHeroSlide();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  sliderSection?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderSection?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 45) {
      nextHeroSlide();
    } else if (touchEndX > touchStartX + 45) {
      prevHeroSlide();
    }
  }, { passive: true });

  showHeroSlide(0);
  resetHeroSliderAutoPlay();
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}

/* ==========================================================================
   3. LIVE COLD-CHAIN TELEMETRY SIMULATOR
   ========================================================================== */
function initTelemetrySimulator() {
  const tempElements = document.querySelectorAll(".telemetry-temp-reading");
  if (tempElements.length === 0) return;

  // Realistic temperature drift within 3.8°C to 4.4°C
  setInterval(() => {
    const variance = (Math.random() * 0.6 + 3.8).toFixed(1);
    tempElements.forEach(el => {
      el.textContent = `${variance}°C`;
    });
  }, 4500);
}

/* ==========================================================================
   4. FAQ ACCORDION HANDLER
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const body = item.querySelector(".faq-body");

    trigger?.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove("active");
        const otherBody = other.querySelector(".faq-body");
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive && body) {
        item.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // Open first item by default
  if (faqItems[0]) {
    const firstTrigger = faqItems[0].querySelector(".faq-trigger");
    firstTrigger?.click();
  }
}

/* ==========================================================================
   5. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === "success" 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
      }
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.showToast = showToast;

/* ==========================================================================
   6. SCROLL ANIMATIONS / INTERSECTION OBSERVERS
   ========================================================================== */
function initScrollAnimations() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("counted");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statNumbers.forEach(stat => observer.observe(stat));
  }
}

/* ==========================================================================
   7. CUSTOMER PORTAL LOGIN, DEMO ACCOUNT & LEGAL MODALS
   ========================================================================== */
function closeQuoteModal() {
  const backdrop = document.getElementById("quote-modal-backdrop");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function getAuthUser() {
  try {
    const data = localStorage.getItem("laxmi_auth_user");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function setAuthUser(user) {
  try {
    if (user) {
      localStorage.setItem("laxmi_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("laxmi_auth_user");
    }
  } catch (e) {}
  renderAuthUI();
}

function initAuth() {
  renderAuthUI();
}

function renderAuthUI() {
  const user = getAuthUser();
  const authSlots = document.querySelectorAll(".auth-nav-slot");

  authSlots.forEach(slot => {
    if (user) {
      slot.innerHTML = `
        <button type="button" class="user-badge-btn" onclick="openUserProfileModal()" aria-label="Customer Account Profile" title="${user.businessName}">
          <span class="pulse-dot-green" aria-hidden="true"></span>
          <span>${user.businessName.split(' ')[0]}</span>
          <span style="font-size: 0.68rem; padding: 1px 6px; border-radius: 4px; background: var(--color-emerald-600); color: #fff; font-weight: 700;">Active</span>
        </button>
      `;
    } else {
      slot.innerHTML = `
        <button type="button" class="btn btn-outline btn-sm" onclick="openLoginModal()" style="padding: 0.45rem 0.85rem; font-size: var(--fs-xs);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
          <span>Login</span>
        </button>
      `;
    }
  });

  const drawerStatus = document.getElementById("drawer-auth-status");
  if (drawerStatus) {
    if (user) {
      drawerStatus.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid var(--color-emerald-500); border-radius: var(--radius-lg); padding: 0.85rem 1rem; margin-top: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <strong style="color: var(--text-main); font-size: var(--fs-xs);">${user.businessName}</strong>
            <span class="badge badge-emerald" style="font-size: 0.65rem;">Verified B2B</span>
          </div>
          <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: 8px;">DL: ${user.dlNo} • ${user.city}</div>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="openUserProfileModal()" style="flex: 1; padding: 0.35rem 0.5rem; font-size: 0.75rem;">Account Details</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="logoutUser()" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; color: var(--color-rose-500); border-color: var(--color-rose-500);">Logout</button>
          </div>
        </div>
      `;
    } else {
      drawerStatus.innerHTML = `
        <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 0.85rem 1rem; margin-top: 1rem;">
          <div style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: 8px;">
            Wholesale Customer Portal (Order History & Live Catalog)
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="openLoginModal()" style="width: 100%; justify-content: center;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            <span>Customer Login / Demo</span>
          </button>
        </div>
      `;
    }
  }
}

let pendingPostLoginAction = null;

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function requireLogin(requiredFeature, callback) {
  const user = getAuthUser();
  if (user) {
    if (typeof callback === "function") callback();
    return true;
  }
  pendingPostLoginAction = callback;
  openLoginModal(requiredFeature, callback);
  return false;
}

function openLoginModal(requiredFeature = null, callback = null) {
  if (callback) {
    pendingPostLoginAction = callback;
  }
  const backdrop = document.getElementById("quote-modal-backdrop");
  const content = document.getElementById("quote-modal-content");
  if (!backdrop || !content) return;

  const currentUser = getAuthUser();
  if (currentUser) {
    if (typeof pendingPostLoginAction === "function") {
      const act = pendingPostLoginAction;
      pendingPostLoginAction = null;
      act();
    } else {
      openUserProfileModal();
    }
    return;
  }

  const requirementNoticeHtml = requiredFeature ? `
    <div style="background: rgba(245, 158, 11, 0.12); border: 1.5px solid #f59e0b; border-radius: var(--radius-lg); padding: 0.85rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: flex-start; gap: 10px; text-align: left;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2" style="flex-shrink: 0; margin-top: 2px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      <div>
        <strong style="color: #d97706; display: block; font-size: 0.85rem; font-weight: 700;">Login Required for Wholesale Access</strong>
        <span style="font-size: var(--fs-xs); color: var(--text-main); line-height: 1.4; display: block; margin-top: 2px;">
          Access to <strong>${escapeHtml(requiredFeature)}</strong> is restricted to registered chemists and hospitals. Sign in below or click <strong>1-Click Demo Login</strong> to proceed immediately.
        </span>
      </div>
    </div>
  ` : "";

  content.innerHTML = `
    <!-- Top Modal Header with Back to Website Button -->
    <div class="modal-top-actions">
      <button type="button" class="login-back-btn" onclick="closeQuoteModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Website</span>
      </button>
      <button type="button" class="modal-close-btn" onclick="closeQuoteModal()" aria-label="Close Login Modal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    ${requirementNoticeHtml}

    <div style="text-align: center; margin-bottom: 1.25rem;">
      <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: rgba(6, 182, 212, 0.12); color: var(--color-accent-600); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
      </div>
      <span class="badge badge-verified" style="margin-bottom: 0.35rem;">Registered Customer Portal</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">Wholesale Customer Login</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 4px;">
        Access registered wholesale prices, live batch availability, order tracking, and downloadable tax invoices.
      </p>
    </div>

    <!-- Demo Login Account Card -->
    <div class="demo-account-box">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
        <span class="demo-account-badge">
          <span class="pulse-dot-green"></span>
          Instant Demo Account
        </span>
        <span class="badge badge-emerald" style="font-size: 0.65rem;">Verified Chemist</span>
      </div>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-bottom: 0.5rem;">
        Explore all verified wholesale features instantly without registering:
      </p>
      <div class="demo-credentials-pill">
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Drug Licence No:</span> <strong style="color: var(--color-accent-600);">20B254798 / 21B254799</strong></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Security PIN:</span> <strong style="color: var(--text-main);">demo123</strong></div>
        <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Business:</span> <span style="color: var(--text-main);">Apex Chemist & Surgical (Ahmedabad)</span></div>
      </div>
      <button type="button" id="btn-quick-demo-login" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; font-weight: 700; background: linear-gradient(135deg, var(--color-accent-600), var(--color-primary-600));">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
        <span>Fill & Sign In with Demo Account</span>
      </button>
    </div>

    <!-- Standard Login Form -->
    <form id="portal-login-form" style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1rem;">
      <div class="form-group">
        <label class="form-label" for="login-drug-lic">Drug Licence No. or Mobile Number</label>
        <input type="text" id="login-drug-lic" class="form-input" placeholder="e.g. 20B254798 or 6355459482" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="login-otp">Access Password / Security PIN</label>
        <input type="password" id="login-otp" class="form-input" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
        Sign In to B2B Account
      </button>
    </form>

    <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: var(--fs-xs); color: var(--text-muted);">
      <strong style="color: var(--text-main); display: block; margin-bottom: 2px;">Need Instant WhatsApp Verification?</strong>
      New pharmacy or hospital? Connect directly with dispatch desk for same-day manual approval.
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="https://api.whatsapp.com/send?phone=916355459482&text=Hello%20Laxmi%20Pharma,%20I%20am%20a%20registered%20customer%20requesting%20portal%20assistance." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center;">
        Login via WhatsApp Support Desk (6355459482)
      </a>
      <button type="button" class="btn btn-outline" style="width: 100%;" onclick="closeQuoteModal()">
        ← Back to Website
      </button>
    </div>
  `;

  const quickDemoBtn = document.getElementById("btn-quick-demo-login");
  const licInput = document.getElementById("login-drug-lic");
  const pinInput = document.getElementById("login-otp");
  const loginForm = document.getElementById("portal-login-form");

  function executeDemoAuth() {
    const demoUser = {
      businessName: "Apex Chemist & Surgical",
      contactPerson: "Dr. Rajesh Patel",
      dlNo: licInput?.value || "20B254798 / 21B254799",
      city: "Ahmedabad",
      type: "Retail Chemist & Hospital Supply",
      tier: "Tier-1 Gold Wholesale (12% Discount)"
    };
    setAuthUser(demoUser);
    if (window.showToast) {
      window.showToast("Welcome back, Dr. Rajesh Patel! Logged in as Apex Chemist & Surgical.");
    }
    const act = pendingPostLoginAction;
    pendingPostLoginAction = null;
    setTimeout(() => {
      closeQuoteModal();
      if (typeof act === "function") {
        setTimeout(act, 250);
      }
    }, 450);
  }

  quickDemoBtn?.addEventListener("click", () => {
    if (licInput) licInput.value = "20B254798 / 21B254799";
    if (pinInput) pinInput.value = "demo123";
    executeDemoAuth();
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    executeDemoAuth();
  });

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openUserProfileModal() {
  const backdrop = document.getElementById("quote-modal-backdrop");
  const content = document.getElementById("quote-modal-content");
  if (!backdrop || !content) return;

  const user = getAuthUser() || {
    businessName: "Apex Chemist & Surgical",
    contactPerson: "Dr. Rajesh Patel",
    dlNo: "20B254798 / 21B254799",
    city: "Ahmedabad",
    type: "Retail Chemist & Hospital Supply",
    tier: "Tier-1 Gold Wholesale (12% Discount)"
  };

  content.innerHTML = `
    <!-- Top Modal Header with Back to Website Button -->
    <div class="modal-top-actions">
      <button type="button" class="login-back-btn" onclick="closeQuoteModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Website</span>
      </button>
      <button type="button" class="modal-close-btn" onclick="closeQuoteModal()" aria-label="Close Profile">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div style="text-align: center; margin-bottom: 1.25rem;">
      <div style="width: 56px; height: 56px; border-radius: var(--radius-full); background: rgba(16, 185, 129, 0.12); color: var(--color-emerald-500); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; border: 2px solid var(--color-emerald-500);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </div>
      <span class="badge badge-emerald" style="margin-bottom: 0.35rem;">Authenticated B2B Partner</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">${user.businessName}</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted);">${user.contactPerson} • ${user.city}, Gujarat</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem; background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1rem; margin-bottom: 1.25rem; font-size: var(--fs-xs);">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
        <span style="color: var(--text-muted);">Drug Licence No.</span>
        <strong style="color: var(--text-main);">${user.dlNo}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
        <span style="color: var(--text-muted);">Pricing Tier</span>
        <span style="color: var(--color-emerald-400); font-weight: 700;">${user.tier}</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
        <span style="color: var(--text-muted);">Depot Fulfillment</span>
        <strong style="color: var(--text-main);">Ahmedabad Hub (Express Daily)</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Credit Settlement</span>
        <span style="color: var(--color-accent-400);">21-Day Authorized Ledger</span>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="#catalog" class="btn btn-primary" onclick="closeQuoteModal()" style="width: 100%; justify-content: center;">
        Browse Wholesale 500+ SKU Catalog
      </a>
      <button type="button" class="btn btn-outline" onclick="logoutUser()" style="width: 100%; justify-content: center; color: var(--color-rose-500); border-color: var(--color-rose-500);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        <span>Sign Out (Logout)</span>
      </button>
      <button type="button" class="btn btn-outline" onclick="closeQuoteModal()" style="width: 100%;">
        ← Back to Website
      </button>
    </div>
  `;

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function logoutUser() {
  setAuthUser(null);
  if (window.showToast) {
    window.showToast("Signed out of wholesale account.");
  }
  closeQuoteModal();
}

function openPrivacyModal() {
  const backdrop = document.getElementById("quote-modal-backdrop");
  const content = document.getElementById("quote-modal-content");
  if (!backdrop || !content) return;

  content.innerHTML = `
    <div class="modal-top-actions">
      <button type="button" class="login-back-btn" onclick="closeQuoteModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Website</span>
      </button>
      <button type="button" class="modal-close-btn" onclick="closeQuoteModal()" aria-label="Close Modal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-verified" style="margin-bottom: 0.5rem;">Legal Compliance</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">Privacy Policy</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 4px;">Last Updated: October 2026 • Laxmi Pharma Distributor</p>
    </div>

    <div style="font-size: var(--fs-sm); color: var(--text-secondary); line-height: var(--lh-loose); max-height: 50vh; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 1.5rem;">
      <h4 style="color: var(--text-main); margin-bottom: 4px;">1. Statutory Wholesale Information</h4>
      <p style="margin-bottom: 1rem;">Laxmi Pharma Distributor collects business identification information including Registered Firm Name, Food & Drugs Control Administration (FDCA) Drug Licence numbers (Form 20B/21B), GSTIN, and physical establishment coordinates solely for the verification of wholesale trading eligibility under the Drugs & Cosmetics Act 1940 and GST Rules.</p>

      <h4 style="color: var(--text-main); margin-bottom: 4px;">2. Confidentiality of Ordering Records</h4>
      <p style="margin-bottom: 1rem;">Purchase orders, commercial margins, and facility requisitions are treated with strict clinical and commercial confidentiality. We do not sell, rent, or trade your inventory patterns to third-party commercial brokers.</p>

      <h4 style="color: var(--text-main); margin-bottom: 4px;">3. Data Security</h4>
      <p style="margin-bottom: 1rem;">All customer information transmitted via our digital onboarding forms is processed over encrypted SSL/TLS channels and stored within secure systems complying with applicable Indian Information Technology regulations.</p>

      <h4 style="color: var(--text-main); margin-bottom: 4px;">4. Contact Regarding Privacy</h4>
      <p>For inquiries regarding data records or regulatory disclosures, contact: <strong>laxmipharmadistributor15@gmail.com</strong>.</p>
    </div>

    <button type="button" class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="closeQuoteModal()">
      I Understand & Close
    </button>
  `;

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openTermsModal() {
  const backdrop = document.getElementById("quote-modal-backdrop");
  const content = document.getElementById("quote-modal-content");
  if (!backdrop || !content) return;

  content.innerHTML = `
    <div class="modal-top-actions">
      <button type="button" class="login-back-btn" onclick="closeQuoteModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Website</span>
      </button>
      <button type="button" class="modal-close-btn" onclick="closeQuoteModal()" aria-label="Close Modal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-verified" style="margin-bottom: 0.5rem;">B2B Supply Terms</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">Terms of Use & Wholesale Supply Policy</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 4px;">Effective: 2026 • Wholesale Supply Terms in Gujarat</p>
    </div>

    <div style="font-size: var(--fs-sm); color: var(--text-secondary); line-height: var(--lh-loose); max-height: 50vh; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 1.5rem;">
      <h4 style="color: var(--text-main); margin-bottom: 4px;">1. Verification of Valid Drug Licence</h4>
      <p style="margin-bottom: 1rem;">Under Indian law, medicines are distributed strictly to licensed chemists, registered medical hospitals, clinics, and authorized stockists. Orders cannot be fulfilled without verified Form 20B/21B credentials or institutional healthcare certificates.</p>

      <h4 style="color: var(--text-main); margin-bottom: 4px;">2. Receiving Inspection & Expiry Policy</h4>
      <p style="margin-bottom: 1rem;">The receiving buyer is required to verify physical seals, batch numbers, manufacturer expiry horizons, and cold-chain temperature readings upon delivery. Any discrepancies, transit damages, or shortages must be reported within 24 hours of delivery receipt for formal investigation and credit note issuance.</p>

      <h4 style="color: var(--text-main); margin-bottom: 4px;">3. Cold-Chain Integrity Guarantee</h4>
      <p style="margin-bottom: 1rem;">All biologicals, vaccines, and insulin products are transported in pre-conditioned thermal shippers maintaining 2°C to 8°C. Once delivery receipt is signed, the buyer assumes responsibility for continuous refrigerated storage in compliance with manufacturer guidelines.</p>

      <h4 style="color: var(--text-main); margin-bottom: 4px;">4. Credit & Payment Settlement</h4>
      <p>Credit facilities are extended to approved accounts subject to rolling 7–21 day settlement cycles. Overdue balances may result in temporary suspension of scheduled dispatches until cleared.</p>
    </div>

    <button type="button" class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="closeQuoteModal()">
      Acknowledge & Close
    </button>
  `;

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   LIVE STOCK REPORT LEDGER MODAL (MATCHING MEHER LIFECARE SCREENSHOT 2)
   ========================================================================== */
function openStockReportModal(depotName = "Ahmedabad Central Depot") {
  if (!requireLogin(`Live Depot Stock Report (${depotName})`, () => openStockReportModal(depotName))) {
    return;
  }

  const backdrop = document.getElementById("quote-modal-backdrop");
  const content = document.getElementById("quote-modal-content");
  if (!backdrop || !content) return;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  content.innerHTML = `
    <div class="modal-top-actions">
      <button type="button" class="login-back-btn" onclick="closeQuoteModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Website</span>
      </button>
      <button type="button" class="modal-close-btn" onclick="closeQuoteModal()" aria-label="Close Stock Report">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div style="text-align: center; margin-bottom: 1.25rem;">
      <div style="width: 54px; height: 54px; border-radius: var(--radius-lg); background: rgba(0, 34, 204, 0.12); color: #0022cc; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; border: 1.5px solid rgba(0, 34, 204, 0.3);">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
      </div>
      <span class="badge badge-verified" style="background: rgba(0, 34, 204, 0.15); color: #0022cc; border-color: rgba(0, 34, 204, 0.3); margin-bottom: 0.35rem;">Live Depot Stock Audit</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">${depotName}</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 2px;">
        Audit Date: <strong>${dateStr}</strong> • Authorized FDCA Form 20B/21B Wholesale Facility
      </p>
    </div>

    <!-- Live Telemetry Matrix -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 1.25rem;">
      <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 0.5rem; text-align: center;">
        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; text-transform: uppercase;">Available SKUs</span>
        <strong style="font-size: 1.15rem; color: var(--color-accent-600); font-family: var(--font-display);">500+ Active</strong>
      </div>
      <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 0.5rem; text-align: center;">
        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; text-transform: uppercase;">Cold Storage</span>
        <strong style="font-size: 1.15rem; color: var(--color-emerald-500); font-family: var(--font-display);">4.2°C (2–8°C)</strong>
      </div>
      <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 0.5rem; text-align: center;">
        <span style="font-size: 0.7rem; color: var(--text-muted); display: block; text-transform: uppercase;">Dispatch SLA</span>
        <strong style="font-size: 1.15rem; color: var(--color-emerald-500); font-family: var(--font-display);">&lt; 4 Hours</strong>
      </div>
    </div>

    <!-- Sample High-Demand Formulation Stock Snapshot -->
    <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1rem; margin-bottom: 1.25rem; font-size: var(--fs-xs); max-height: 220px; overflow-y: auto;">
      <div style="font-weight: 700; color: var(--text-main); margin-bottom: 8px; display: flex; justify-content: space-between;">
        <span>Key Formulation Line</span>
        <span>Batch Availability</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding: 5px 0;">
        <span>Pipzo 4.5g Inj (Sun Pharma)</span>
        <span style="color: var(--color-emerald-500); font-weight: 700;">● In Stock (Batch B-2026/89)</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding: 5px 0;">
        <span>Actrapid Insulin 40IU (Torrent)</span>
        <span style="color: var(--color-emerald-500); font-weight: 700;">● In Stock (2°C–8°C Chilled)</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding: 5px 0;">
        <span>Augmentin 625mg Duo (GSK/Sun)</span>
        <span style="color: var(--color-emerald-500); font-weight: 700;">● High Availability</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding: 5px 0;">
        <span>Clex-Enoxa 40mg PFS (Zydus)</span>
        <span style="color: var(--color-emerald-500); font-weight: 700;">● In Stock</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 5px 0;">
        <span>Monocef 1g Inj (Aristo/Alkem)</span>
        <span style="color: var(--color-emerald-500); font-weight: 700;">● High Availability</span>
      </div>
    </div>

    <!-- Actions -->
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="https://api.whatsapp.com/send?phone=916355459482&text=Hello%20Laxmi%20Pharma,%20please%20send%20the%20live%20stock%20and%20price%20list%20for%20${encodeURIComponent(depotName)}." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center;">
        Transmit Stock Inquiry via WhatsApp (6355459482)
      </a>
      <a href="index.html#catalog" class="btn btn-primary" onclick="closeQuoteModal()" style="width: 100%; justify-content: center;">
        Search All 500+ SKUs in Interactive Catalog
      </a>
      <button type="button" class="btn btn-outline" onclick="closeQuoteModal()" style="width: 100%;">
        Close Stock Report
      </button>
    </div>
  `;

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   LIVE ORDER PORTAL & DISPATCH DESK (AUTHENTICATION PROTECTED)
   ========================================================================== */
function openLiveOrderPortal() {
  if (!requireLogin("Live Wholesale Order Portal & Dispatch Tracking", () => openLiveOrderPortal())) {
    return;
  }

  const backdrop = document.getElementById("quote-modal-backdrop");
  const content = document.getElementById("quote-modal-content");
  if (!backdrop || !content) return;

  const user = getAuthUser() || {
    businessName: "Apex Chemist & Surgical",
    contactPerson: "Dr. Rajesh Patel",
    dlNo: "20B254798 / 21B254799",
    city: "Ahmedabad"
  };

  const cart = window.getQuoteCart ? window.getQuoteCart() : [];
  const cartSummary = cart.length > 0 
    ? cart.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle); font-size: var(--fs-xs);">
          <div>
            <strong style="color: var(--text-main);">${escapeHtml(item.brand)}</strong>
            <span style="display: block; color: var(--text-muted); font-size: 0.72rem;">${escapeHtml(item.packSize)} • ${escapeHtml(item.manufacturer)}</span>
          </div>
          <span class="badge badge-emerald" style="font-size: 0.65rem;">Ready to Dispatch</span>
        </div>
      `).join("")
    : `
        <div style="text-align: center; padding: 1rem 0; color: var(--text-muted); font-size: var(--fs-xs);">
          <p>No medicines selected in cart yet.</p>
          <a href="index.html#catalog" class="btn btn-outline btn-sm" onclick="closeQuoteModal()" style="margin-top: 6px;">
            + Browse 500+ SKUs in Catalog
          </a>
        </div>
      `;

  content.innerHTML = `
    <div class="modal-top-actions">
      <button type="button" class="login-back-btn" onclick="closeQuoteModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Website</span>
      </button>
      <button type="button" class="modal-close-btn" onclick="closeQuoteModal()" aria-label="Close Live Order Portal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div style="text-align: center; margin-bottom: 1.25rem;">
      <div style="width: 54px; height: 54px; border-radius: var(--radius-lg); background: rgba(0, 34, 204, 0.12); color: #0022cc; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; border: 1.5px solid rgba(0, 34, 204, 0.3);">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      </div>
      <span class="badge badge-emerald" style="margin-bottom: 0.35rem;">Authenticated Wholesale Portal</span>
      <h2 style="font-size: var(--fs-xl); font-weight: 800; color: var(--text-main);">Live Order & Dispatch Desk</h2>
      <p style="font-size: var(--fs-xs); color: var(--text-muted); margin-top: 2px;">
        Account: <strong>${escapeHtml(user.businessName)}</strong> • DL: <strong>${escapeHtml(user.dlNo)}</strong>
      </p>
    </div>

    <!-- Live Active Status Banner -->
    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid var(--color-emerald-500); border-radius: var(--radius-lg); padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: var(--fs-xs); font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
          <span class="pulse-dot-green"></span>
          Ahmedabad Central Depot Dispatch Status: Active
        </span>
        <span class="badge badge-emerald" style="font-size: 0.65rem;">Same-Day Delivery</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">
        Next scheduled hospital/pharmacy dispatch departs at <strong>11:30 AM</strong> (Order cutoff in 42 mins).
      </div>
    </div>

    <!-- Current Order Items / Cart -->
    <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1rem; margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <strong style="color: var(--text-main); font-size: var(--fs-xs);">Selected Requisition Formulations (${cart.length})</strong>
        <span style="font-size: 0.7rem; color: var(--color-accent-600); font-weight: 600;">Direct Factory Billing</span>
      </div>
      <div style="max-height: 140px; overflow-y: auto;">
        ${cartSummary}
      </div>
    </div>

    <!-- Live Order Action Buttons -->
    <div style="display: flex; flex-direction: column; gap: 0.65rem;">
      <a href="https://api.whatsapp.com/send?phone=916355459482&text=Hello%20Laxmi%20Pharma%20Dispatch,%20I%20am%20logged%20in%20as%20${encodeURIComponent(user.businessName)}%20(DL:%20${encodeURIComponent(user.dlNo)}).%20I%20would%20like%20to%20place%20a%20live%20order%20for%20immediate%20dispatch." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center; font-weight: 700;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.109-.064-.265-.084-.606-.214-1.047-.406-1.879-.817-3.102-2.71-3.197-2.836-.095-.126-.767-.997-.767-1.921 0-.924.475-1.378.644-1.569.17-.19.37-.238.494-.238.125 0 .25.002.358.007.114.005.267-.043.418.318.157.375.534 1.299.581 1.394.048.095.079.206.016.333-.063.127-.095.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.389.111.19.494.814 1.06 1.318.728.649 1.341.85 1.531.945.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.159.429-.095.175.063 1.11.524 1.301.619.19.095.317.143.365.222.048.079.048.46-.096.865z"/></svg>
        Transmit Live Order via WhatsApp (6355459482)
      </a>
      <a href="index.html#contact" class="btn btn-primary" onclick="closeQuoteModal()" style="width: 100%; justify-content: center;">
        Submit Formal Institutional Purchase Order
      </a>
      <button type="button" class="btn btn-outline" onclick="closeQuoteModal()" style="width: 100%;">
        Close Live Order Portal
      </button>
    </div>
  `;

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openLiveOrderGuide() {
  if (!requireLogin("Live Order Procurement Guide", () => {
    window.location.hash = "#ordering";
    const el = document.getElementById("ordering");
    el?.scrollIntoView({ behavior: "smooth" });
  })) {
    return;
  }
  window.location.hash = "#ordering";
  const el = document.getElementById("ordering");
  el?.scrollIntoView({ behavior: "smooth" });
}

function openLiveOrderEstimator() {
  if (!requireLogin("Live Delivery & Turnaround Estimator", () => {
    window.location.hash = "#estimator";
    const el = document.getElementById("estimator");
    el?.scrollIntoView({ behavior: "smooth" });
  })) {
    return;
  }
  window.location.hash = "#estimator";
  const el = document.getElementById("estimator");
  el?.scrollIntoView({ behavior: "smooth" });
}

window.initAuth = initAuth;
window.getAuthUser = getAuthUser;
window.setAuthUser = setAuthUser;
window.requireLogin = requireLogin;
window.openLoginModal = openLoginModal;
window.openUserProfileModal = openUserProfileModal;
window.logoutUser = logoutUser;
window.closeQuoteModal = closeQuoteModal;
window.openPrivacyModal = openPrivacyModal;
window.openTermsModal = openTermsModal;
window.openStockReportModal = openStockReportModal;
window.openLiveOrderPortal = openLiveOrderPortal;
window.openLiveOrderGuide = openLiveOrderGuide;
window.openLiveOrderEstimator = openLiveOrderEstimator;
window.initHeroSlider = initHeroSlider;


