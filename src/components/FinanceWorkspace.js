import { calculateFinancials, generateTcoProjections } from '../utils/financialMath.js?v=3';
import { parseCSVUsers, parseJSONBudget } from '../utils/dataParsers.js?v=5';

let chartInstance = null;
let _prevSavings = 0;
let _prevPct = 0;

const animateValue = (el, from, to, formatter, duration = 450) => {
  if (!el) return;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = formatter(from + (to - from) * ease);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Formateur de devises
const formatEuro = (val) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
};

export default function FinanceWorkspace(state) {
  const isPres = state.presentationMode;

  const dashboardHTML = `
      <!-- Title -->
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white">
          Espace Chiffrage & Analyse TCO (Total Cost of Ownership)
        </h2>
        <p class="text-slate-400 text-sm">
          Simulez et comparez le coût global d'exploitation de la cible Proxmox HA face à ses concurrents.
        </p>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Controls Column -->
        <div class="space-y-6 lg:col-span-1 no-print">
          
          <!-- Sliders Box -->
          <div class="glass-panel rounded-xl p-6 space-y-5">
            <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5 pb-2">
              Parametres du Projet
            </h3>
            
            <!-- Users -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-300">Utilisateurs / Laptops</span>
                <span class="font-mono text-blue-400 font-bold" id="lbl-users">${state.usersCount}</span>
              </div>
              <input 
                type="range" id="sld-users" min="100" max="500" value="${state.usersCount}"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <!-- Sites -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-300">Laboratoires (Spokes)</span>
                <span class="font-mono text-blue-400 font-bold" id="lbl-sites">${state.sitesCount}</span>
              </div>
              <input
                type="range" id="sld-sites" min="5" max="35" value="${state.sitesCount}"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <!-- Servers -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-300">Serveurs Physiques HA</span>
                <span class="font-mono text-blue-400 font-bold" id="lbl-servers">${state.serversCount}</span>
              </div>
              <input 
                type="range" id="sld-servers" min="2" max="8" value="${state.serversCount}"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <!-- VMware core license -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-300">Abonnement VMware / cœur</span>
                <span class="font-mono text-blue-400 font-bold" id="lbl-vmware">${state.vmwareCorePrice} €</span>
              </div>
              <input 
                type="range" id="sld-vmware" min="150" max="500" step="10" value="${state.vmwareCorePrice}"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <!-- Cloud monthly -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-300">Hébergement Cloud HDS</span>
                <span class="font-mono text-blue-400 font-bold" id="lbl-cloud">${formatEuro(state.cloudMonthlyCost)}/m</span>
              </div>
              <input 
                type="range" id="sld-cloud" min="2000" max="8000" step="250" value="${state.cloudMonthlyCost}"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <!-- Inflation -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-300">Inflation Abonnements</span>
                <span class="font-mono text-blue-400 font-bold" id="lbl-inflation">${Math.round(state.inflationRate * 100)} %</span>
              </div>
              <input 
                type="range" id="sld-inflation" min="0" max="15" value="${Math.round(state.inflationRate * 100)}"
                class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

          </div>

          <!-- Preset Cas Projet GSBLAB -->
          <button
            id="btn-preset-gsblab"
            class="w-full glass-panel rounded-xl p-4 border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] transition-all duration-200 text-left group"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              </div>
              <div>
                <div class="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">Cas Projet GSBLAB</div>
                <div class="text-[10px] text-slate-500">Préréglage officiel du dossier</div>
              </div>
              <span class="ml-auto text-[9px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">PRESET</span>
            </div>
            <div class="grid grid-cols-3 gap-1.5 text-[9px]">
              <div class="bg-slate-900/60 rounded px-2 py-1 text-center"><span class="text-slate-500 block">Utilisateurs</span><span class="text-indigo-300 font-bold font-mono">380</span></div>
              <div class="bg-slate-900/60 rounded px-2 py-1 text-center"><span class="text-slate-500 block">Spokes</span><span class="text-indigo-300 font-bold font-mono">27</span></div>
              <div class="bg-slate-900/60 rounded px-2 py-1 text-center"><span class="text-slate-500 block">Serveurs</span><span class="text-indigo-300 font-bold font-mono">4</span></div>
              <div class="bg-slate-900/60 rounded px-2 py-1 text-center"><span class="text-slate-500 block">VMware/cœur</span><span class="text-red-400 font-bold font-mono">300€</span></div>
              <div class="bg-slate-900/60 rounded px-2 py-1 text-center"><span class="text-slate-500 block">Cloud HDS</span><span class="text-amber-400 font-bold font-mono">4 500€</span></div>
              <div class="bg-slate-900/60 rounded px-2 py-1 text-center"><span class="text-slate-500 block">Inflation</span><span class="text-slate-300 font-bold font-mono">5%</span></div>
            </div>
          </button>

          <!-- Drag & Drop Zone -->
          <div
            id="drag-drop-zone"
            class="border-2 border-dashed border-white/10 hover:border-blue-500/60 bg-slate-900/40 hover:bg-blue-500/5 text-slate-400 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(99,102,241,0.12)]"
          >
            <input 
              type="file" 
              accept=".csv,.json"
              id="file-import"
              class="hidden"
            />
            <label for="file-import" class="cursor-pointer w-full flex flex-col items-center gap-2">
              <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <div class="text-sm font-semibold">Alimentation Dynamique</div>
              <div class="text-xs text-slate-500">Glissez-déposez ou cliquez pour importer un CSV d'utilisateurs ou un JSON de budget.</div>
            </label>

            <div id="import-msg" class="mt-4 px-3 py-2 rounded-lg text-xs hidden">
              <!-- Dynamically populated -->
            </div>
          </div>

        </div>

        <!-- Visuals Column -->
        <div class="space-y-6 lg:col-span-2">
          
          <!-- KPIs Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="glass-panel print-card rounded-xl p-5 border-l-4 border-l-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.08)]">
              <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Économie Nette (5 ans)</span>
              <div class="flex items-end gap-2 my-1.5">
                <div class="text-2xl font-mono font-extrabold text-emerald-400 leading-none" id="kpi-savings">-- €</div>
                <span class="text-emerald-500 text-lg font-bold leading-none mb-0.5">↑</span>
              </div>
              <div class="text-xs text-slate-400 font-medium">vs. statu quo VMware Broadcom</div>
            </div>

            <div class="glass-panel print-card rounded-xl p-5 border-l-4 border-l-red-500 shadow-[0_0_18px_rgba(239,68,68,0.05)]">
              <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Surcoût VMware Broadcom</span>
              <div class="flex items-end gap-2 my-1.5">
                <div class="text-2xl font-mono font-extrabold text-red-400 leading-none" id="kpi-pct-vmware">--%</div>
                <span class="text-red-500 text-lg font-bold leading-none mb-0.5">↑</span>
              </div>
              <div class="text-xs text-slate-400 font-medium">Dû au licensing par cœur</div>
            </div>

          </div>

          <!-- Budget advisory banner -->
          <div id="budget-advisory" class="p-4 rounded-xl flex items-start gap-3 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
            <span id="advisory-icon" class="flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </span>
            <div class="text-sm" id="advisory-text">
              <!-- JS target -->
            </div>
          </div>

          <!-- Carousel Graphique / Tableau -->
          <div class="glass-panel print-card rounded-xl relative overflow-hidden" style="height:360px;">

            <!-- Flèche gauche -->
            <button id="view-prev" class="absolute left-0 top-0 h-full w-9 z-10 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-white/5 transition-colors" title="Vue précédente">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <!-- Flèche droite -->
            <button id="view-next" class="absolute right-0 top-0 h-full w-9 z-10 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-white/5 transition-colors" title="Vue suivante">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <!-- Conteneur des vues (padding latéral pour les flèches) -->
            <div class="h-full px-9 py-4 flex flex-col">

              <!-- En-tête avec titre + indicateurs -->
              <div class="flex items-center justify-between mb-3 flex-shrink-0">
                <h3 id="view-title" class="text-sm font-semibold text-slate-300 uppercase tracking-wider transition-all duration-300">
                  Projection Cumulative du TCO (HT) sur 5 ans
                </h3>
                <div class="flex items-center gap-1.5">
                  <span id="dot-0" class="w-2 h-2 rounded-full bg-blue-400 transition-all duration-300"></span>
                  <span id="dot-1" class="w-2 h-2 rounded-full bg-slate-600 transition-all duration-300"></span>
                </div>
              </div>

              <!-- Vue Graphique -->
              <div id="view-chart" class="flex-1 min-h-0 transition-all duration-300" style="opacity:1;">
                <canvas id="tco-chart-canvas" class="h-full w-full"></canvas>
              </div>

              <!-- Vue Tableau -->
              <div id="view-table" class="flex-1 min-h-0 overflow-y-auto transition-all duration-300" style="opacity:0; position:absolute; inset:0; padding:1rem 2.25rem; padding-top:3.5rem; pointer-events:none;">
                <table class="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr class="border-b border-white/5 text-slate-400 uppercase tracking-wider font-semibold sticky top-0 bg-slate-900/80 backdrop-blur-sm">
                      <th class="py-2 px-3">Rubriques Budgétaires</th>
                      <th class="py-2 px-3 text-blue-400">Proxmox VE</th>
                      <th class="py-2 px-3 text-red-500">VMware</th>
                      <th class="py-2 px-3 text-amber-400">Cloud HDS</th>
                    </tr>
                  </thead>
                  <tbody id="budget-table-body"></tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
  `;

  if (!isPres) {
    return `<div data-pres-slide="1" class="space-y-6 h-full overflow-y-auto pr-2 pb-10">${dashboardHTML}</div>`;
  }

  const presSlide1 = `
    <div data-pres-slide="1" data-pres-label="Analyse TCO" class="flex-1 min-h-0 flex flex-col items-center justify-center space-y-8 w-full max-w-6xl mx-auto h-full py-4">
      <div class="text-center space-y-4 w-full mb-2">
        <h2 class="text-4xl md:text-5xl font-extrabold text-emerald-400 tracking-tight">Analyse TCO & Économies</h2>
        <div class="w-16 h-1.5 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
      </div>
      
      <!-- KPIs -->
      <div class="grid grid-cols-2 gap-8 w-full">
        <div class="glass-panel rounded-3xl p-8 border-l-[6px] border-l-emerald-500 shadow-2xl flex flex-col justify-center bg-slate-900/60">
          <span class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Économie Nette (5 ans)</span>
          <div class="flex items-center gap-4">
            <div class="text-[4rem] font-mono font-extrabold text-emerald-400 leading-none" id="kpi-savings">-- €</div>
            <span class="text-emerald-500 text-4xl font-bold mb-2">↑</span>
          </div>
          <div class="text-lg text-slate-400 font-medium mt-4">vs. statu quo VMware Broadcom</div>
        </div>
        <div class="glass-panel rounded-3xl p-8 border-l-[6px] border-l-red-500 shadow-2xl flex flex-col justify-center bg-slate-900/60">
          <span class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Surcoût VMware Broadcom</span>
          <div class="flex items-center gap-4">
            <div class="text-[4rem] font-mono font-extrabold text-red-400 leading-none" id="kpi-pct-vmware">--%</div>
            <span class="text-red-500 text-4xl font-bold mb-2">↑</span>
          </div>
          <div class="text-lg text-slate-400 font-medium mt-4">Dû au nouveau licensing par cœur</div>
        </div>
      </div>

      <!-- Advisory -->
      <div id="budget-advisory" class="w-full p-6 rounded-2xl flex items-center gap-6 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-xl shadow-lg mt-2">
        <span id="advisory-icon" class="flex-shrink-0">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </span>
        <div id="advisory-text" class="flex-1 leading-relaxed">
          <!-- JS target -->
        </div>
      </div>

      <!-- Chart -->
      <div class="w-full flex-1 min-h-[300px] glass-panel rounded-3xl p-8 shadow-2xl relative bg-slate-900/80">
         <canvas id="tco-chart-canvas" class="h-full w-full"></canvas>
      </div>
    </div>
  `;

  const presSlide2 = `
    <div data-pres-slide="2" data-pres-label="Comparatif Budgétaire" class="flex-1 min-h-0 flex flex-col items-center justify-center gap-6 w-full max-w-6xl mx-auto h-full py-4">
      <div class="text-center space-y-3 w-full">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Comparatif Budgétaire</h2>
        <div class="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
      </div>

      <!-- Mini KPIs -->
      <div class="grid grid-cols-2 gap-6 w-full">
        <div class="glass-panel rounded-2xl p-5 border-l-[5px] border-l-emerald-500 flex justify-between items-center bg-slate-900/60 shadow-xl">
          <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">Économie Nette 5 ans</span>
          <div class="text-3xl font-mono font-extrabold text-emerald-400" id="kpi-savings-2">-- €</div>
        </div>
        <div class="glass-panel rounded-2xl p-5 border-l-[5px] border-l-red-500 flex justify-between items-center bg-slate-900/60 shadow-xl">
          <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">Surcoût VMware Broadcom</span>
          <div class="text-3xl font-mono font-extrabold text-red-400" id="kpi-pct-vmware-2">--%</div>
        </div>
      </div>

      <!-- Synthèse budgétaire compacte -->
      <div class="w-full glass-panel rounded-3xl overflow-hidden shadow-2xl bg-slate-900/80 flex-1 min-h-0 flex flex-col">
        <!-- Header -->
        <div class="px-8 py-5 bg-slate-950/80 border-b border-white/10 flex items-center gap-4 flex-shrink-0">
          <span class="w-2.5 h-9 bg-blue-500 rounded-full"></span>
          <h3 class="text-xl font-extrabold text-white uppercase tracking-widest">Synthèse des Coûts (HT)</h3>
          <span class="ml-auto text-sm text-slate-500 font-medium italic">Lignes clés — détail disponible en vue tableau</span>
        </div>

        <!-- Table header -->
        <div class="grid grid-cols-4 px-8 py-4 border-b border-white/10 bg-slate-900/60 flex-shrink-0">
          <div class="text-sm font-bold text-slate-400 uppercase tracking-widest">Rubrique</div>
          <div class="text-sm font-bold text-blue-400 uppercase tracking-widest text-right">Proxmox VE</div>
          <div class="text-sm font-bold text-red-500 uppercase tracking-widest text-right">VMware</div>
          <div class="text-sm font-bold text-amber-400 uppercase tracking-widest text-right">Cloud HDS</div>
        </div>

        <!-- Rows -->
        <div id="budget-table-body" class="flex-1 min-h-0 flex flex-col divide-y divide-white/5">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  `;

  return `${presSlide1}${presSlide2}`;
}

// Actualisation des calculs et du DOM sans redessiner toute la page
const updateValues = (state) => {
  const data = calculateFinancials(state.usersCount, state.sitesCount, state.serversCount, state.vmwareCorePrice, state.cloudMonthlyCost);
  const projections = generateTcoProjections(state.usersCount, state.sitesCount, state.serversCount, state.vmwareCorePrice, state.cloudMonthlyCost, state.inflationRate);

  const finalTcoProxmox = projections[4].proxmoxTco;
  const finalTcoVmware = projections[4].vmwareTco;
  const finalTcoCloud = projections[4].cloudTco;

  const netSavings = finalTcoVmware - finalTcoProxmox;
  const pctVmwareIncrease = ((finalTcoVmware - finalTcoProxmox) / finalTcoProxmox) * 100;

  // Actualisation textuelle sécûrisée (pour gérer le mode présentation où les IDs peuvent être manquants selon la slide)
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText('lbl-users', state.usersCount);
  setText('lbl-sites', state.sitesCount);
  setText('lbl-servers', state.serversCount);
  setText('lbl-vmware', state.vmwareCorePrice + " €");
  setText('lbl-cloud', formatEuro(state.cloudMonthlyCost) + "/m");
  setText('lbl-inflation', Math.round(state.inflationRate * 100) + " %");

  const animateValueSafe = (id, from, to, formatter) => {
    const el = document.getElementById(id);
    if (el) animateValue(el, from, to, formatter);
  };

  animateValueSafe('kpi-savings', _prevSavings, netSavings, formatEuro);
  animateValueSafe('kpi-savings-2', _prevSavings, netSavings, formatEuro);
  
  animateValueSafe('kpi-pct-vmware', _prevPct, pctVmwareIncrease, v => "+" + Math.max(0, v).toFixed(1) + "%");
  animateValueSafe('kpi-pct-vmware-2', _prevPct, pctVmwareIncrease, v => "+" + Math.max(0, v).toFixed(1) + "%");

  _prevSavings = netSavings;
  _prevPct = pctVmwareIncrease;

  // Alerte budgetaire
  const advisory = document.getElementById('budget-advisory');
  if (advisory) {
    const advisoryText = document.getElementById('advisory-text');
    const advisoryIcon = document.getElementById('advisory-icon');

    if (data.proxmox.capex.total > 450000) {
      advisory.className = "w-full p-6 rounded-2xl flex items-center gap-6 border bg-red-500/10 border-red-500/20 text-red-400 text-xl shadow-lg mt-2 animate-pulse-border";
      advisoryIcon.innerHTML = `<svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      advisoryText.innerHTML = `<strong class="uppercase tracking-wider font-extrabold text-sm block mb-1">Dépassement budgétaire :</strong> L'enveloppe de départ (CapEx) atteint <strong>${formatEuro(data.proxmox.capex.total)} HT</strong>, dépassant la limite DAF de 450k€. Veuillez réduire le périmètre (nombre de sites ou laptops).`;
    } else {
      advisory.className = "w-full p-6 rounded-2xl flex items-center gap-6 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-xl shadow-lg mt-2";
      advisoryIcon.innerHTML = `<svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      advisoryText.innerHTML = `<strong class="uppercase tracking-wider font-extrabold text-sm block mb-1">Budget initial approuvé :</strong> Le CapEx initial (<strong>${formatEuro(data.proxmox.capex.total)} HT</strong>) respecte l'enveloppe budgétaire de démarrage sous les 450 000 € HT.`;
    }
  }

  // Actualisation tableau
  const tableBody = document.getElementById('budget-table-body');
  if (tableBody) {
    // Détecter si on est en mode présentation (le conteneur est un div flex, pas une table)
    const isPres = tableBody.tagName === 'DIV';

    if (isPres) {
      // Mode présentation : 5 lignes clés seulement, format compact grid
      const row = (label, labelIcon, proxmox, vmware, cloud, isHighlight) => `
        <div class="grid grid-cols-4 px-8 py-5 items-center ${isHighlight ? 'bg-slate-800/80 font-bold' : 'hover:bg-white/3 transition-colors'}">
          <div class="flex items-center gap-3 ${isHighlight ? 'text-white text-base uppercase tracking-widest' : 'text-slate-300 text-base'}">
            <span class="text-xl">${labelIcon}</span>
            ${label}
          </div>
          <div class="text-right font-mono ${isHighlight ? 'text-blue-400 text-xl' : 'text-slate-200 text-base'}">${proxmox}</div>
          <div class="text-right font-mono ${isHighlight ? 'text-red-400 text-xl' : 'text-red-300/80 text-base'}">${vmware}</div>
          <div class="text-right font-mono ${isHighlight ? 'text-amber-400 text-xl' : 'text-amber-300/80 text-base'}">${cloud}</div>
        </div>
      `;
      tableBody.innerHTML = `
        ${row('Total CapEx (Investissement Initial)', '🏗️', formatEuro(data.proxmox.capex.total), formatEuro(data.vmware.capex.total), formatEuro(data.cloud.capex.total), false)}
        ${row('Total OpEx (Fonctionnement An 1)', '🔄', formatEuro(data.proxmox.opex.total), formatEuro(data.vmware.opex.total), formatEuro(data.cloud.opex.total), false)}
        <div class="h-px bg-white/10 mx-8"></div>
        ${row('TCO Cumulé à 3 ans', '📅', formatEuro(projections[2].proxmoxTco), formatEuro(projections[2].vmwareTco), formatEuro(projections[2].cloudTco), false)}
        ${row('TCO CUMULÉ À 5 ANS', '🏆', formatEuro(finalTcoProxmox), formatEuro(finalTcoVmware), formatEuro(finalTcoCloud), true)}
      `;
    } else {
      // Mode dashboard : tableau complet
      tableBody.innerHTML = `
        <!-- CAPEX -->
        <tr class="bg-slate-900/50 font-bold text-white">
          <td colSpan="4" class="py-4 px-4 border-b border-white/5 text-sm tracking-widest text-slate-300">Dépenses d'Investissement (CapEx)</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Équipements (Dell R760, Switches, Baie SSD)</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.capex.hardware)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.capex.hardware)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.capex.hardware)}</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Sécurité & Périphériques (Firewalls, Laptops)</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.capex.security)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.capex.security)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.capex.security)}</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Licences Logicielles Bureautiques (Office LTSC)</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.capex.software)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.capex.software)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.capex.software)}</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Prestations ESN d'Intégration & Conduite</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.capex.integration)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.capex.integration)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.capex.integration)}</td>
        </tr>
        <tr class="border-b-2 border-white/10 font-bold bg-slate-800/80 text-white shadow-inner">
          <td class="py-4 px-4">TOTAL INVESTISSEMENT INITIAL (CAPEX)</td>
          <td class="py-4 px-4 font-mono text-blue-400 text-lg">${formatEuro(data.proxmox.capex.total)}</td>
          <td class="py-4 px-4 font-mono text-red-500 text-lg">${formatEuro(data.vmware.capex.total)}</td>
          <td class="py-4 px-4 font-mono text-amber-400 text-lg">${formatEuro(data.cloud.capex.total)}</td>
        </tr>

        <!-- OPEX -->
        <tr class="bg-slate-900/50 font-bold text-white">
          <td colSpan="4" class="py-4 px-4 border-b border-white/5 text-sm tracking-widest text-slate-300 mt-4">Abonnements & Fonctionnement (OpEx An 1)</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Support Hyperviseur (Sockets / Cœurs)</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.opex.hypervisorSupport)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.opex.hypervisorSupport)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.opex.hypervisorSupport)}</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Hébergement Cloud VMs (Souveraineté HDS)</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.opex.cloudHosting)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.opex.cloudHosting)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.opex.cloudHosting)}</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Collaboratif (M365 Exchange Online)</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.opex.messagerieSaas)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.opex.messagerieSaas)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.opex.messagerieSaas)}</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">Maintenance Firewalls (UTM) & Liens WAN</td>
          <td class="py-4 px-4 font-mono font-medium">${formatEuro(data.proxmox.opex.networkAndWan)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80">${formatEuro(data.vmware.opex.networkAndWan)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80">${formatEuro(data.cloud.opex.networkAndWan)}</td>
        </tr>
        <tr class="border-b-2 border-white/10 font-bold bg-slate-800/80 text-white shadow-inner">
          <td class="py-4 px-4">TOTAL OPEX RÉCURRENT (AN 1)</td>
          <td class="py-4 px-4 font-mono text-blue-400 text-lg">${formatEuro(data.proxmox.opex.total)}</td>
          <td class="py-4 px-4 font-mono text-red-500 text-lg">${formatEuro(data.vmware.opex.total)}</td>
          <td class="py-4 px-4 font-mono text-amber-400 text-lg">${formatEuro(data.cloud.opex.total)}</td>
        </tr>

        <!-- TCO Summary -->
        <tr class="bg-slate-900/50 font-bold text-white">
          <td colSpan="4" class="py-4 px-4 border-b border-white/5 text-sm tracking-widest text-slate-300 mt-4">Coût Total de Possession Cumulé (TCO)</td>
        </tr>
        <tr class="border-b border-white/5 text-slate-300 hover:bg-white/5 transition-colors">
          <td class="py-4 px-4">TCO Cumulé à 3 ans</td>
          <td class="py-4 px-4 font-mono font-bold text-blue-400 text-xl">${formatEuro(projections[2].proxmoxTco)}</td>
          <td class="py-4 px-4 font-mono font-medium text-red-400/80 text-xl">${formatEuro(projections[2].vmwareTco)}</td>
          <td class="py-4 px-4 font-mono font-medium text-amber-400/80 text-xl">${formatEuro(projections[2].cloudTco)}</td>
        </tr>
        <tr class="font-bold text-white bg-slate-900/80 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]">
          <td class="py-6 px-4 text-xl tracking-wider">TCO CUMULÉ À 5 ANS</td>
          <td class="py-6 px-4 font-mono text-emerald-400 text-3xl" style="text-shadow: 0 0 15px rgba(16,185,129,0.3)">${formatEuro(finalTcoProxmox)}</td>
          <td class="py-6 px-4 font-mono text-red-500 text-3xl">${formatEuro(finalTcoVmware)}</td>
          <td class="py-6 px-4 font-mono text-amber-400 text-3xl">${formatEuro(finalTcoCloud)}</td>
        </tr>
      `;
    }
  }

  // Actualisation graphique
  if (chartInstance) {
    chartInstance.data.datasets[0].data = projections.map(p => p.proxmoxTco);
    chartInstance.data.datasets[1].data = projections.map(p => p.vmwareTco);
    chartInstance.data.datasets[2].data = projections.map(p => p.cloudTco);
    chartInstance.update();
  }
};

export function bindFinanceEvents(state, renderApp) {
  // Initialisation du graphique Chart.js
  const canvas = document.getElementById('tco-chart-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    if (chartInstance) {
      chartInstance.destroy();
    }

    const projections = generateTcoProjections(state.usersCount, state.sitesCount, state.serversCount, state.vmwareCorePrice, state.cloudMonthlyCost, state.inflationRate);

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5'],
        datasets: [
          {
            label: 'Cible Proxmox VE HA',
            data: projections.map(p => p.proxmoxTco),
            borderColor: '#00cdff',
            backgroundColor: 'rgba(0, 205, 255, 0.06)',
            borderWidth: 4,
            fill: true,
            tension: 0.15,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Option VMware Broadcom',
            data: projections.map(p => p.vmwareTco),
            borderColor: '#ff4b4b',
            borderDash: [5, 5],
            borderWidth: 3.5,
            tension: 0.15,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Alternative Public Cloud HDS',
            data: projections.map(p => p.cloudTco),
            borderColor: '#f59e0b',
            borderWidth: 3.5,
            tension: 0.15,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#cbd5e1',
              font: { family: 'Inter', size: 16, weight: '700' },
              pointStyleWidth: 16,
              usePointStyle: true,
              padding: 24
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#f1f5f9',
            borderColor: 'rgba(99,102,241,0.3)',
            borderWidth: 1.5,
            titleFont: { family: 'Inter', weight: 'bold', size: 14 },
            bodyFont: { family: 'JetBrains Mono', size: 14 },
            padding: 12,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) label += formatEuro(context.parsed.y);
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255,255,255,0.08)', lineWidth: 1.5 },
            ticks: {
              color: '#cbd5e1',
              font: { family: 'Inter', size: 14, weight: '600' },
              callback: (value) => (value / 1000) + ' k€'
            }
          },
          x: {
            grid: { color: 'rgba(255,255,255,0.08)', lineWidth: 1.5 },
            ticks: { color: '#cbd5e1', font: { family: 'Inter', size: 14, weight: '600' } }
          }
        }
      }
    });
  }

  // ── Carousel graphique / tableau (Uniquement en mode normal) ──────────────────────────
  let currentView = 0;
  const views = [
    { id: 'view-chart', title: 'Projection Cumulative du TCO (HT) sur 5 ans' },
    { id: 'view-table', title: 'Ventilation des Dépenses Projet (HT)' }
  ];

  const switchView = (index) => {
    currentView = (index + views.length) % views.length;
    views.forEach((v, i) => {
      const el = document.getElementById(v.id);
      const dot = document.getElementById('dot-' + i);
      if (el && dot) {
        if (i === currentView) {
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
          el.style.position = i === 1 ? 'absolute' : '';
          dot.className = 'w-2 h-2 rounded-full bg-blue-400 transition-all duration-300';
        } else {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          dot.className = 'w-2 h-2 rounded-full bg-slate-600 transition-all duration-300';
        }
      }
    });
    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.innerText = views[currentView].title;
  };

  const btnPrev = document.getElementById('view-prev');
  const btnNext = document.getElementById('view-next');
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => switchView(currentView - 1));
    btnNext.addEventListener('click', () => switchView(currentView + 1));
  }

  // Calcul initial
  updateValues(state);

  // Binding des sliders
  const sliders = [
    { id: 'sld-users', key: 'usersCount' },
    { id: 'sld-sites', key: 'sitesCount' },
    { id: 'sld-servers', key: 'serversCount' },
    { id: 'sld-vmware', key: 'vmwareCorePrice' },
    { id: 'sld-cloud', key: 'cloudMonthlyCost' },
    { id: 'sld-inflation', key: 'inflationRate', isPercent: true }
  ];

  sliders.forEach(slider => {
    const el = document.getElementById(slider.id);
    if (el) {
      el.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        if (slider.isPercent) val = val / 100;
        state[slider.key] = val;
        updateValues(state);
      });
    }
  });

  // Drag and drop events
  const zone = document.getElementById('drag-drop-zone');
  const fileInput = document.getElementById('file-import');
  const msgBox = document.getElementById('import-msg');

  if (zone && fileInput && msgBox) {
    const showMsg = (text, error) => {
      msgBox.className = `mt-6 px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-3 w-full border font-semibold ${
        error ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      }`;
      msgBox.innerHTML = `
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        ${text}
      `;
      msgBox.classList.remove('hidden');
    };

    const processText = (text, name) => {
      if (name.endsWith('.csv')) {
        const res = parseCSVUsers(text);
        if (res.errorMessage) {
          showMsg(res.errorMessage, true);
        } else {
          state.usersCount = res.usersCount;
          updateValues(state);
          document.getElementById('sld-users').value = res.usersCount;
          showMsg(`Import réussi : ${res.usersCount} utilisateurs détectés depuis ${name}.`, false);
        }
      } else if (name.endsWith('.json')) {
        const res = parseJSONBudget(text);
        if (res.errorMessage) {
          showMsg(res.errorMessage, true);
        } else if (res.data) {
          const d = res.data;
          if (d.usersCount     !== undefined) { state.usersCount     = d.usersCount;     document.getElementById('sld-users').value     = d.usersCount; }
          if (d.sitesCount     !== undefined) { state.sitesCount     = d.sitesCount;     document.getElementById('sld-sites').value     = d.sitesCount; }
          if (d.serversCount   !== undefined) { state.serversCount   = d.serversCount;   document.getElementById('sld-servers').value   = d.serversCount; }
          if (d.vmwareCorePrice  !== undefined) { state.vmwareCorePrice  = d.vmwareCorePrice;  document.getElementById('sld-vmware').value    = d.vmwareCorePrice; }
          if (d.cloudMonthlyCost !== undefined) { state.cloudMonthlyCost = d.cloudMonthlyCost; document.getElementById('sld-cloud').value     = d.cloudMonthlyCost; }
          if (d.inflationRate  !== undefined) { state.inflationRate  = d.inflationRate;  document.getElementById('sld-inflation').value = Math.round(d.inflationRate * 100); }

          updateValues(state);

          if (d._isPrevisionnel) {
            const fmt = v => v != null ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v) : '—';
            showMsg(
              `<strong>${d._label}</strong> chargé (${d._horizon}) — ` +
              `Cible : <strong>${d.usersCount} users · ${d.sitesCount} sites</strong> — ` +
              `Budget : <strong>${fmt(d._totalHT)}</strong> / ${fmt(d._plafond)} — ` +
              `Réserve : <strong>${fmt(d._reserve)}</strong>`,
              false
            );
          } else {
            showMsg(`Import réussi : Paramètres budgétaires appliqués depuis ${name}.`, false);
          }
        }
      }
    };

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('border-blue-500', 'bg-blue-500/10');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('border-blue-500', 'bg-blue-500/10');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('border-blue-500', 'bg-blue-500/10');
      const files = e.dataTransfer.files;
      if (files.length === 0) return;
      const file = files[0];
      const r = new FileReader();
      r.onload = (evt) => processText(evt.target.result, file.name);
      r.readAsText(file);
    });

    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      const r = new FileReader();
      r.onload = (evt) => processText(evt.target.result, file.name);
      r.readAsText(file);
    });
  }

  // Preset Cas Projet GSBLAB (après showMsg pour éviter TDZ)
  const PRESET_GSBLAB = { usersCount: 380, sitesCount: 27, serversCount: 4, vmwareCorePrice: 300, cloudMonthlyCost: 4500, inflationRate: 0.05 };
  const btnPreset = document.getElementById('btn-preset-gsblab');
  if (btnPreset) {
    btnPreset.addEventListener('click', () => {
      Object.assign(state, PRESET_GSBLAB);
      document.getElementById('sld-users').value     = PRESET_GSBLAB.usersCount;
      document.getElementById('sld-sites').value     = PRESET_GSBLAB.sitesCount;
      document.getElementById('sld-servers').value   = PRESET_GSBLAB.serversCount;
      document.getElementById('sld-vmware').value    = PRESET_GSBLAB.vmwareCorePrice;
      document.getElementById('sld-cloud').value     = PRESET_GSBLAB.cloudMonthlyCost;
      document.getElementById('sld-inflation').value = Math.round(PRESET_GSBLAB.inflationRate * 100);
      updateValues(state);
      
      if (msgBox) {
        msgBox.className = "mt-6 px-4 py-3 rounded-xl text-sm flex items-center justify-center gap-3 w-full border font-semibold bg-indigo-500/10 border-indigo-500/30 text-indigo-400";
        msgBox.innerHTML = `
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
          Préréglage GSBLAB appliqué — valeurs officielles du dossier de projet.
        `;
        msgBox.classList.remove('hidden');
      }
    });
  }
}
