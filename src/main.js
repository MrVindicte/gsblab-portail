// ==============================================================================
// CORE ORCHESTRATOR - PORTAIL GSBLAB ES6 NATIVE
// ==============================================================================
import { defaultSpokes, defaultRisks } from './config/defaultData.js?v=3';
import Sidebar, { bindSidebarEvents, menuSections } from './components/Sidebar.js?v=4';
import ExecutiveSummary from './components/ExecutiveSummary.js?v=21';
import FinanceWorkspace, { bindFinanceEvents } from './components/FinanceWorkspace.js?v=28';
import TechnicalWorkspace, { bindTechEvents } from './components/TechnicalWorkspace.js?v=17';
import DrpSimulator, { bindDrpEvents } from './components/DrpSimulator.js?v=5';
import PmoWorkspace, { bindPmoEvents } from './components/PmoWorkspace.js?v=6';
import BeforeAfterSlider, { bindSliderEvents } from './components/BeforeAfterSlider.js?v=5';
import SitesWorkspace from './components/SitesWorkspace.js?v=5';
import ConclusionWorkspace from './components/ConclusionWorkspace.js?v=1';

// Global state holding parameters
window.appState = {
  activeTab: 'dashboard',
  usersCount: 333,
  sitesCount: defaultSpokes.length,
  serversCount: 4,
  vmwareCorePrice: 300,
  cloudMonthlyCost: 4500,
  inflationRate: 0.05,
  spokesList: defaultSpokes,
  risksList: defaultRisks,
  
  // States for sub-components
  activeCrisis: 'none',
  crisisStep: 0,
  pmoSubTab: 'risks',
  pmoFilterCategory: 'Tout',
  beforeAfterSliderVal: 50,
  
  // Presentation Mode — global continuous counter
  presentationMode: true,     // ACTIVATED BY DEFAULT
  globalPresentationStep: 1,  // never resets between tabs
  presentationStep: 1         // local step for the current tab (derived)
};

// ─── Presentation step configuration ────────────────────────────────────────
// Update maxSteps when you add/remove data-pres-step elements in a component.
const PRES_TABS = ['dashboard', 'finance', 'tech', 'drp', 'pmo', 'comparison', 'sites', 'conclusion'];
// Nombre de slides par onglet (Option B : slides exclusives)
const PRES_MAX  = { dashboard: 14, finance: 7, tech: 17, drp: 3, pmo: 5, comparison: 2, sites: 5, conclusion: 1 };

// Compute cumulative offsets once
const PRES_OFFSET = {};
let _acc = 0;
for (const t of PRES_TABS) { PRES_OFFSET[t] = _acc; _acc += PRES_MAX[t]; }
const PRES_TOTAL = _acc; // 37

/** Convert a global step (1-based) to { tab, localStep } */
const globalToLocal = (g) => {
  for (let i = PRES_TABS.length - 1; i >= 0; i--) {
    const t = PRES_TABS[i];
    if (g > PRES_OFFSET[t]) {
      return { tab: t, localStep: Math.min(g - PRES_OFFSET[t], PRES_MAX[t]) };
    }
  }
  return { tab: PRES_TABS[0], localStep: 1 };
};

// ─── Presentation helpers ────────────────────────────────────────────────────
const togglePresentationMode = (active) => {
  window.appState.presentationMode = active;
  window.appState.globalPresentationStep = 1;
  window.appState.activeTab = 'dashboard';
  window.appState.presentationStep = 1;
  renderApp();
};

const navigatePresentation = (direction) => {
  let next = window.appState.globalPresentationStep + direction;
  next = Math.max(1, Math.min(PRES_TOTAL, next));
  
  const { tab, localStep } = globalToLocal(next);
  window.appState.globalPresentationStep = next;
  window.appState.presentationStep = localStep;

  if (tab !== window.appState.activeTab) {
    window.appState.activeTab = tab;
    renderApp(); // full re-render to load the new tab's HTML
  } else {
    updatePresentationDOM();
  }
};


// ── Auto-scale : compresse le contenu de la slide active pour tenir en plein écran ──
const scalePresentationSlide = () => {
  if (!window.appState?.presentationMode) return;
  // Réinitialiser toutes les slides
  document.querySelectorAll('.pres-slides-container [data-pres-slide]').forEach(s => {
    s.style.transform = '';
    s.style.transformOrigin = '';
  });
  const container = document.querySelector('.pres-slides-container');
  const slide = document.querySelector('.pres-slides-container [data-pres-slide].pres-slide-active');
  if (!slide || !container) return;

  // Double rAF : le navigateur a le temps de finaliser le layout avant la mesure
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const cH = container.clientHeight;
    const cW = container.clientWidth;

    // Exclure temporairement les éléments opacity-0 (reveals cachés) du calcul de hauteur
    // car ils occupent de la place dans le DOM mais ne sont pas visibles
    const hiddenReveals = [...slide.querySelectorAll('.opacity-0[data-reveal-at]')];
    hiddenReveals.forEach(el => { el.style.display = 'none'; });
    const sH = slide.scrollHeight;
    const sW = slide.scrollWidth;
    hiddenReveals.forEach(el => { el.style.display = ''; });

    const scale = Math.min(cH / sH, cW / sW, 1);
    if (scale < 0.985) {
      slide.style.transformOrigin = 'top center';
      slide.style.transform = `scale(${scale.toFixed(5)})`;
    }
  }));
};

const updatePresentationDOM = () => {
  // ── Slides : désactiver toutes, activer la courante ────────────────────────
  document.querySelectorAll('[data-pres-slide]').forEach(el => {
    el.classList.remove('pres-slide-active');
  });
  const stepStr = String(window.appState.presentationStep);
  const activeSlide = Array.from(document.querySelectorAll('[data-pres-slide]')).find(el => {
    return el.getAttribute('data-pres-slide').split(',').includes(stepStr);
  });
  if (activeSlide) {
    activeSlide.classList.add('pres-slide-active');
    
    // Révélation dynamique des sous-éléments (sans rechargement DOM)
    activeSlide.querySelectorAll('[data-reveal-at]').forEach(el => {
      const revealAt = parseInt(el.getAttribute('data-reveal-at'), 10);
      if (window.appState.presentationStep >= revealAt) {
        el.classList.remove('opacity-0');
        el.classList.add('opacity-100');
      } else {
        el.classList.add('opacity-0');
        el.classList.remove('opacity-100');
      }
    });
  }

  // ── Compteur footer + badge slide flottant ──────────────────────────────────────
  const g = window.appState.globalPresentationStep;
  const counterEl = document.getElementById('pres-counter-label');
  if (counterEl) {
    counterEl.innerText = `Slide ${g} / ${PRES_TOTAL}`;
  }
  // Badge flottant sur la slide (position fixe, hors de tout conteneur)
  const badge = document.getElementById('pres-slide-badge');
  if (badge) {
    const num = String(g).padStart(2, '0');
    const tot = String(PRES_TOTAL).padStart(2, '0');
    badge.innerHTML = `
      <span style="color:#f1f5f9;font-size:1.15rem;font-weight:900;line-height:1;">${num}</span>
      <span style="color:#475569;font-size:0.85rem;font-weight:700;line-height:1;">/</span>
      <span style="color:#64748b;font-size:0.85rem;font-weight:600;line-height:1;">${tot}</span>
    `;
  }

  // ── Barre de progression ───────────────────────────────────────────────────
  const pillsContainer = document.getElementById('pres-step-pills');
  if (pillsContainer) {
    const g   = window.appState.globalPresentationStep;
    const pct = ((g - 1) / Math.max(PRES_TOTAL - 1, 1)) * 100;

    const boundaryPcts = PRES_TABS.slice(1).map(t =>
      (PRES_OFFSET[t] / PRES_TOTAL) * 100
    );
    const ticks = boundaryPcts.map(p =>
      `<div style="position:absolute;top:-4px;left:${p}%;width:2px;height:14px;background:#475569;border-radius:1px;transform:translateX(-50%);pointer-events:none;"></div>`
    ).join('');

    pillsContainer.innerHTML = `
      <div style="position:relative;width:100%;height:6px;background:#1e293b;border-radius:3px;box-shadow:inset 0 1px 2px rgba(0,0,0,0.4);">
        <div style="position:absolute;inset:0;width:${pct}%;background:linear-gradient(90deg,#3b82f6,#6366f1);border-radius:3px;transition:width 0.3s cubic-bezier(0.16,1,0.3,1);box-shadow:0 0 8px rgba(99,102,241,0.4);"></div>
        ${ticks}
        <div style="position:absolute;top:50%;left:${pct}%;transform:translate(-50%,-50%);width:12px;height:12px;background:#818cf8;border:2px solid #1e293b;border-radius:50%;box-shadow:0 0 10px rgba(129,140,248,0.7);transition:left 0.3s cubic-bezier(0.16,1,0.3,1);pointer-events:none;"></div>
      </div>
    `;

    pillsContainer.onclick = (e) => {
      const rect   = pillsContainer.getBoundingClientRect();
      const ratio  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const target = Math.max(1, Math.min(PRES_TOTAL, Math.round(ratio * (PRES_TOTAL - 1)) + 1));
      const { tab, localStep } = globalToLocal(target);
      window.appState.globalPresentationStep = target;
      window.appState.presentationStep       = localStep;
      if (tab !== window.appState.activeTab) {
        window.appState.activeTab = tab;
        renderApp();
      } else {
        updatePresentationDOM();
      }
    };
  }

  // ── Label contextuel de la slide active ────────────────────────────────────
  const stepLabelEl = document.getElementById('pres-step-label');
  if (stepLabelEl) {
    const label = activeSlide ? activeSlide.getAttribute('data-pres-label') : '';
    if (label) {
      stepLabelEl.textContent = '· ' + label;
      stepLabelEl.classList.remove('hidden');
    } else {
      stepLabelEl.classList.add('hidden');
    }
  }

  // ── État des boutons Préc / Suiv ───────────────────────────────────────────
  const btnPrev = document.getElementById('btn-pres-prev');
  const btnNext = document.getElementById('btn-pres-next');
  if (btnPrev) {
    const atStart = window.appState.globalPresentationStep <= 1;
    btnPrev.classList.toggle('opacity-30', atStart);
    btnPrev.classList.toggle('cursor-not-allowed', atStart);
    atStart ? btnPrev.setAttribute('disabled', 'true') : btnPrev.removeAttribute('disabled');
  }
  if (btnNext) {
    const atEnd = window.appState.globalPresentationStep >= PRES_TOTAL;
    btnNext.classList.toggle('opacity-30', atEnd);
    btnNext.classList.toggle('cursor-not-allowed', atEnd);
    atEnd ? btnNext.setAttribute('disabled', 'true') : btnNext.removeAttribute('disabled');
  }

  scalePresentationSlide();

  // Dispatch custom event to notify components of step change
  window.dispatchEvent(new CustomEvent('presentationStepChange', {
    detail: { tab: window.appState.activeTab, step: window.appState.presentationStep }
  }));
};
window.updatePresentationDOM = updatePresentationDOM;

const renderApp = () => {
  const root = document.getElementById('root');
  const state = window.appState;
  const isPres = state.presentationMode;

  if (isPres) {
    document.body.classList.add('pres-mode-active');
  } else {
    document.body.classList.remove('pres-mode-active');
  }

  // Header template (matches App.tsx layout)
  const headerHtml = `
    <header class="bg-slate-900/95 backdrop-blur-md border-b border-white/5 py-3 px-8 sticky top-0 z-50 flex justify-between items-center no-print flex-shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)] flex-shrink-0 select-none">
          G1
        </div>
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-base font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              GSBLAB — Projet de Migration SI
            </h1>
            <span class="hidden sm:flex items-center bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest text-blue-400 flex-shrink-0">
              MASTÈRE 2IC &nbsp;·&nbsp; GRP.01
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mt-0.5 tracking-wide flex items-center gap-1.5">
            <span>Romain, Léo &amp; Jérôme &nbsp;—&nbsp; 2026</span>
            ${!isPres ? `<span class="text-slate-700">·</span><span class="text-slate-400 font-medium">${{
              dashboard: 'Synthèse Générale',
              finance: 'Chiffrage & TCO',
              tech: 'Architecture',
              drp: 'Simulateur PRA',
              pmo: 'PMO & Risques',
              comparison: 'Avant / Après'
            }[state.activeTab] || ''}</span>` : ''}
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="group relative cursor-help">
          <div class="badge-emerald">
            <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>CERTIFIÉ HDS V2</span>
          </div>
          
          <!-- Tooltip Encart Hover -->
          <div class="absolute right-0 top-full mt-2 w-80 p-4 bg-[#111218] border border-white/10 rounded-xl shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 space-y-2.5 text-left text-xs text-slate-300">
            <div class="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-white/5 pb-1.5 uppercase font-mono tracking-wider text-[10px]">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Garanties HDS &amp; RGPD
            </div>
            <div class="space-y-2.5">
              <div>
                <span class="text-white font-semibold block text-[11px]">Pourquoi ?</span>
                <p class="text-[10px] text-slate-400 leading-relaxed mt-0.5">Le cadre réglementaire <strong>HDS (Hébergeur Données de Santé)</strong> est une obligation légale pour stocker et traiter les examens des patients des 17 laboratoires.</p>
              </div>
              <div>
                <span class="text-white font-semibold block text-[11px]">Comment ?</span>
                <ul class="list-disc list-inside text-[10px] text-slate-400 leading-relaxed mt-0.5 space-y-1">
                  <li>Cluster de stockage <strong>Ceph</strong> isolé en réseau privé.</li>
                  <li>Tunnels <strong>IPsec VPN</strong> chiffrant les flux de santé des sites.</li>
                  <li>Plan de Secours avec sauvegardes <strong>immuables PBS</strong>.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <button 
          id="btn-toggle-presentation"
          class="${isPres ? 'hidden' : 'btn-primary'}"
          title="Basculer le mode présentation (Diaporama)"
        >
          <svg class="w-4 h-4 ${isPres ? 'text-slate-400' : 'text-white/90 animate-pulse'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          <span>${isPres ? 'Quitter' : 'Lancer la Présentation'}</span>
        </button>
        
        <button 
          id="btn-global-print"
          class="btn-secondary"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Exporter en PDF
        </button>
      </div>
    </header>
  `;

  // Layout wrapper grid
  const sidebarHtml = isPres ? '' : Sidebar(state.activeTab);
  
  let mainContentHtml = '';
  switch (state.activeTab) {
    case 'dashboard':
      mainContentHtml = ExecutiveSummary(state);
      break;
    case 'finance':
      mainContentHtml = FinanceWorkspace(state);
      break;
    case 'tech':
      mainContentHtml = TechnicalWorkspace(state);
      break;
    case 'drp':
      mainContentHtml = DrpSimulator(state);
      break;
    case 'pmo':
      mainContentHtml = PmoWorkspace(state);
      break;
    case 'comparison':
      mainContentHtml = BeforeAfterSlider(state);
      break;
    case 'sites':
      mainContentHtml = SitesWorkspace(state);
      break;
    case 'conclusion':
      mainContentHtml = ConclusionWorkspace(state);
      break;
  }

  const footerHtml = isPres ? `
    <footer class="bg-slate-900 border-t border-white/10 px-8 flex justify-between items-center no-print h-16 flex-shrink-0 z-50 relative">
      
      <!-- Page Switcher -->
      <div class="flex items-center gap-2">
        <span class="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">Espace :</span>
        <select id="pres-page-select" class="bg-slate-950 border border-white/10 text-white text-xs font-bold rounded-lg px-3 py-1 cursor-pointer focus:outline-none focus:border-blue-500 transition">
          ${menuSections.flatMap(section => section.items.map(item => `
            <option value="${item.id}" ${state.activeTab === item.id ? 'selected' : ''}>${item.name.replace(/&amp;/g, '&')}</option>
          `)).join('')}
        </select>
      </div>

      <!-- Navigation center: dots + label -->
      <div class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div class="flex items-center gap-3">
          <button 
            id="btn-pres-prev" 
            class="text-slate-400 hover:text-white transition p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md flex-shrink-0"
            title="Étape précédente (Flèche gauche)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          
          <!-- Progress bar (generated by updatePresentationDOM) -->
          <div id="pres-step-pills" style="width:220px;position:relative;cursor:pointer;" title="Cliquer pour naviguer"></div>
          
          <button 
            id="btn-pres-next" 
            class="text-slate-400 hover:text-white transition p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md flex-shrink-0"
            title="Étape suivante (Flèche droite / Espace)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
        <!-- Step counter + contextual label -->
        <div class="flex items-center gap-2 select-none">
          <span id="pres-counter-label" class="text-[10px] font-mono font-semibold text-slate-500">
            Étape ${state.presentationStep} / --
          </span>
          <span id="pres-step-label" class="text-[10px] font-semibold text-indigo-400/80 font-mono hidden"></span>
          <span class="text-[9px] font-mono text-slate-700 border border-slate-800 rounded px-1 py-0.5 tracking-wider">← ESPACE →</span>
        </div>
      </div>

      <!-- Mode exit button on the right -->
      <div class="invisible pointer-events-none">
        <button 
          id="btn-pres-exit" 
          class="btn-danger"
          title="Quitter le mode présentation (Echap)"
        >
          Vue Globale
        </button>
      </div>
    </footer>
  ` : `
    <footer class="text-center py-2 px-8 text-xs text-slate-500 border-t border-white/5 bg-slate-950 flex justify-between items-center no-print h-10 flex-shrink-0">
      <div>Projet Mastère 2IC 2026 — Groupe 1 — Conçu et réalisé par Romain, Léo & Jérôme</div>
      <div class="flex items-center gap-1.5 font-semibold text-slate-400">
        <span>GSBLAB</span>
        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        <span>Architecture Cible</span>
      </div>
    </footer>
  `;

  // Inject structural HTML
  const isDash = state.activeTab === 'dashboard';

  // En mode présentation : container de slides (position:relative, enfants absolus)
  // En mode normal dashboard : flex-col overflow-hidden fit-viewport
  // En mode normal autres onglets : scroll vertical classique
  const mainClasses    = isPres || isDash ? 'overflow-hidden flex flex-col' : 'overflow-y-auto';
  const wrapperClasses = isPres
    ? 'pres-slides-container flex-1 min-h-0 max-w-7xl mx-auto w-full relative'
    : isDash
      ? 'flex-1 min-h-0 max-w-7xl mx-auto w-full flex flex-col'
      : 'max-w-7xl mx-auto space-y-8';

  root.innerHTML = `
    ${headerHtml}
    ${isPres ? `
      <div id="pres-slide-badge" style="
        position:fixed;
        bottom:5.5rem;
        right:2.5rem;
        z-index:9999;
        display:flex;
        align-items:baseline;
        gap:0.4rem;
        background:rgba(8,9,12,0.85);
        border:1px solid rgba(255,255,255,0.10);
        backdrop-filter:blur(12px);
        padding:0.4rem 1.1rem;
        border-radius:99px;
        font-family:'JetBrains Mono',monospace;
        pointer-events:none;
        box-shadow:0 4px 24px rgba(0,0,0,0.6);
        letter-spacing:0.05em;
      "></div>
    ` : ''}
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      ${sidebarHtml}
      <main class="flex-1 p-6 md:p-8 ${mainClasses}">
        <div class="${wrapperClasses} tab-enter">
          ${mainContentHtml}
        </div>
      </main>
    </div>
    ${footerHtml}
  `;

  // --- BIND EVENT LISTENERS ---
  
  // Print button (header)
  document.getElementById('btn-global-print').addEventListener('click', () => {
    window.print();
  });

  // Export Livrable button (synthèse only)
  const btnExportLivrable = document.getElementById('btn-export-livrable');
  if (btnExportLivrable) {
    btnExportLivrable.addEventListener('click', () => {
      document.body.classList.add('livrable-export-mode');
      window.print();
      document.body.classList.remove('livrable-export-mode');
    });
  }

  // Toggle Presentation Mode button
  document.getElementById('btn-toggle-presentation').addEventListener('click', () => {
    togglePresentationMode(!window.appState.presentationMode);
  });

  // Sidebar links
  if (!isPres) {
    bindSidebarEvents(renderApp);
  }

  if (isPres) {
    document.getElementById('btn-pres-prev').addEventListener('click', () => {
      navigatePresentation(-1);
    });
    document.getElementById('btn-pres-next').addEventListener('click', () => {
      navigatePresentation(1);
    });
    document.getElementById('btn-pres-exit').addEventListener('click', () => {
      togglePresentationMode(false);
    });
    document.getElementById('pres-page-select').addEventListener('change', (e) => {
      const selectedTab = e.target.value;
      const globalStart = (PRES_OFFSET[selectedTab] !== undefined) ? PRES_OFFSET[selectedTab] + 1 : 1;
      window.appState.activeTab = selectedTab;
      window.appState.globalPresentationStep = globalStart;
      window.appState.presentationStep = 1;
      renderApp();
    });

    // Update DOM step elements immediately on render
    updatePresentationDOM();
  }

  // Active view specific bindings
  switch (state.activeTab) {
    case 'finance':
      bindFinanceEvents(state, renderApp);
      break;
    case 'tech':
      bindTechEvents(state);
      break;
    case 'drp':
      bindDrpEvents(state, renderApp);
      break;
    case 'pmo':
      bindPmoEvents(state, renderApp);
      break;
    case 'comparison':
      bindSliderEvents(state);
      break;
  }
};

// Global keydown listeners for slide navigation
window.addEventListener('keydown', (e) => {
  if (!window.appState.presentationMode) return;
  
  if (e.key === 'ArrowRight' || e.key === ' ' || e.code === 'Space') {
    e.preventDefault();
    navigatePresentation(1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigatePresentation(-1);
  } else if (e.key === 'Escape') {
    // e.preventDefault();
    // togglePresentationMode(false); // DISABLED: cannot exit presentation
  }
});

// Initial Render
document.addEventListener('DOMContentLoaded', renderApp);
renderApp();

// Recalcul du scale si la fenêtre est redimensionnée (ex: rotation vidéoprojecteur)
window.addEventListener('resize', () => {
  if (window.appState?.presentationMode) scalePresentationSlide();
});
