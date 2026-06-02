import { calculateFinancials, generateTcoProjections } from '../utils/financialMath.js?v=3';
import { parseCSVUsers, parseJSONBudget } from '../utils/dataParsers.js?v=3';

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
  return `
    <div class="space-y-6">
      
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
          <div data-pres-step="1" class="glass-panel rounded-xl p-6 space-y-5">
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
                type="range" id="sld-sites" min="5" max="25" value="${state.sitesCount}"
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

          <!-- Drag & Drop Zone -->
          <div 
            data-pres-step="2"
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
          <div data-pres-step="3" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
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
          <div data-pres-step="4" id="budget-advisory" class="p-4 rounded-xl flex items-start gap-3 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
            <span id="advisory-icon" class="flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </span>
            <div class="text-sm" id="advisory-text">
              <!-- JS target -->
            </div>
          </div>

          <!-- Carousel Graphique / Tableau -->
          <div data-pres-step="5" class="glass-panel print-card rounded-xl relative overflow-hidden" style="height:360px;">

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

    </div>
  `;
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

  // Actualisation textuelle
  document.getElementById('lbl-users').innerText = state.usersCount;
  document.getElementById('lbl-sites').innerText = state.sitesCount;
  document.getElementById('lbl-servers').innerText = state.serversCount;
  document.getElementById('lbl-vmware').innerText = state.vmwareCorePrice + " €";
  document.getElementById('lbl-cloud').innerText = formatEuro(state.cloudMonthlyCost) + "/m";
  document.getElementById('lbl-inflation').innerText = Math.round(state.inflationRate * 100) + " %";

  animateValue(document.getElementById('kpi-savings'), _prevSavings, netSavings, formatEuro);
  animateValue(document.getElementById('kpi-pct-vmware'), _prevPct, pctVmwareIncrease,
    v => "+" + Math.max(0, v).toFixed(1) + "%");
  _prevSavings = netSavings;
  _prevPct = pctVmwareIncrease;

  // Alerte budgetaire
  const advisory = document.getElementById('budget-advisory');
  const advisoryText = document.getElementById('advisory-text');
  const advisoryIcon = document.getElementById('advisory-icon');

  if (data.proxmox.capex.total > 450000) {
    advisory.className = "p-4 rounded-xl flex items-start gap-3 border bg-red-500/10 border-red-500/20 text-red-400 animate-pulse-border";
    advisoryIcon.innerHTML = `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    advisoryText.innerHTML = `<strong class="uppercase tracking-wider font-bold text-[11px] block">Dépassement budgétaire :</strong> L'enveloppe de départ (CapEx) atteint <strong>${formatEuro(data.proxmox.capex.total)} HT</strong>, dépassant la limite DAF de 450k€. Veuillez réduire le périmètre (nombre de sites ou laptops).`;
  } else {
    advisory.className = "p-4 rounded-xl flex items-start gap-3 border bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    advisoryIcon.innerHTML = `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    advisoryText.innerHTML = `<strong class="uppercase tracking-wider font-bold text-[11px] block">Budget initial approuvé :</strong> Le CapEx initial (<strong>${formatEuro(data.proxmox.capex.total)} HT</strong>) respecte l'enveloppe budgétaire de démarrage sous les 450 000 € HT.`;
  }

  // Actualisation tableau
  const tableBody = document.getElementById('budget-table-body');
  tableBody.innerHTML = `
    <!-- CAPEX -->
    <tr class="bg-slate-900/30 font-semibold text-white">
      <td colSpan="4" class="py-2 px-3 border-b border-white/5">Dépenses d'Investissement (CapEx)</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Équipements (Dell R760, Switches, Baie SSD)</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.capex.hardware)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.capex.hardware)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.capex.hardware)}</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Sécurité & Périphériques (Firewalls, Laptops)</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.capex.security)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.capex.security)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.capex.security)}</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Licences Logicielles Bureautiques (Office LTSC)</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.capex.software)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.capex.software)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.capex.software)}</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Prestations ESN d'Intégration & Conduite</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.capex.integration)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.capex.integration)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.capex.integration)}</td>
    </tr>
    <tr class="border-b-2 border-white/10 font-bold bg-slate-900/50 text-white">
      <td class="py-2 px-3">TOTAL INVESTISSEMENT INITIAL (CAPEX)</td>
      <td class="py-2 px-3 font-mono text-blue-400">${formatEuro(data.proxmox.capex.total)}</td>
      <td class="py-2 px-3 font-mono text-red-500">${formatEuro(data.vmware.capex.total)}</td>
      <td class="py-2 px-3 font-mono text-amber-400">${formatEuro(data.cloud.capex.total)}</td>
    </tr>

    <!-- OPEX -->
    <tr class="bg-slate-900/30 font-semibold text-white">
      <td colSpan="4" class="py-2 px-3 border-b border-white/5">Abonnements & Fonctionnement (OpEx An 1)</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Support Hyperviseur (Sockets / Cœurs)</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.opex.hypervisorSupport)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.opex.hypervisorSupport)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.opex.hypervisorSupport)}</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Hébergement Cloud VMs (Souveraineté HDS)</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.opex.cloudHosting)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.opex.cloudHosting)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.opex.cloudHosting)}</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Collaboratif (M365 Exchange Online)</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.opex.messagerieSaas)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.opex.messagerieSaas)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.opex.messagerieSaas)}</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">Maintenance Firewalls (UTM) & Liens WAN</td>
      <td class="py-2 px-3 font-mono">${formatEuro(data.proxmox.opex.networkAndWan)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(data.vmware.opex.networkAndWan)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(data.cloud.opex.networkAndWan)}</td>
    </tr>
    <tr class="border-b-2 border-white/10 font-bold bg-slate-900/50 text-white">
      <td class="py-2 px-3">TOTAL OPEX RÉCURRENT (AN 1)</td>
      <td class="py-2 px-3 font-mono text-blue-400">${formatEuro(data.proxmox.opex.total)}</td>
      <td class="py-2 px-3 font-mono text-red-500">${formatEuro(data.vmware.opex.total)}</td>
      <td class="py-2 px-3 font-mono text-amber-400">${formatEuro(data.cloud.opex.total)}</td>
    </tr>

    <!-- TCO Summary -->
    <tr class="bg-slate-900/30 font-semibold text-white">
      <td colSpan="4" class="py-2 px-3 border-b border-white/5">Coût Total de Possession Cumulé (TCO)</td>
    </tr>
    <tr class="border-b border-white/5 text-slate-300">
      <td class="py-2 px-3">TCO Cumulé à 3 ans</td>
      <td class="py-2 px-3 font-mono font-semibold text-blue-400">${formatEuro(projections[2].proxmoxTco)}</td>
      <td class="py-2 px-3 font-mono text-red-400/80">${formatEuro(projections[2].vmwareTco)}</td>
      <td class="py-2 px-3 font-mono text-amber-400/80">${formatEuro(projections[2].cloudTco)}</td>
    </tr>
    <tr class="font-bold text-white bg-slate-900/60 text-sm">
      <td class="py-3 px-3">TCO Cumulé à 5 ans</td>
      <td class="py-3 px-3 font-mono text-emerald-400">${formatEuro(finalTcoProxmox)}</td>
      <td class="py-3 px-3 font-mono text-red-500">${formatEuro(finalTcoVmware)}</td>
      <td class="py-3 px-3 font-mono text-amber-400">${formatEuro(finalTcoCloud)}</td>
    </tr>
  `;

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
  const ctx = document.getElementById('tco-chart-canvas').getContext('2d');
  
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
          borderWidth: 3,
          fill: true,
          tension: 0.15
        },
        {
          label: 'Option VMware Broadcom',
          data: projections.map(p => p.vmwareTco),
          borderColor: '#ff4b4b',
          borderDash: [5, 5],
          borderWidth: 2.5,
          tension: 0.15
        },
        {
          label: 'Alternative Public Cloud HDS',
          data: projections.map(p => p.cloudTco),
          borderColor: '#f59e0b',
          borderWidth: 2.5,
          tension: 0.15
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
            font: { family: 'Inter', size: 13, weight: '600' },
            pointStyleWidth: 12,
            usePointStyle: true,
            padding: 18
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#f8fafc',
          bodyColor: '#f1f5f9',
          borderColor: 'rgba(99,102,241,0.3)',
          borderWidth: 1,
          titleFont: { family: 'Inter', weight: 'bold' },
          bodyFont: { family: 'JetBrains Mono' },
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
          grid: { color: 'rgba(255,255,255,0.08)' },
          ticks: {
            color: '#cbd5e1',
            font: { family: 'Inter', size: 10 },
            callback: (value) => (value / 1000) + ' k€'
          }
        },
        x: {
          grid: { color: 'rgba(255,255,255,0.08)' },
          ticks: { color: '#cbd5e1', font: { family: 'Inter', size: 11 } }
        }
      }
    }
  });

  // ── Carousel graphique / tableau ──────────────────────────
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
    });
    document.getElementById('view-title').innerText = views[currentView].title;
  };

  document.getElementById('view-prev').addEventListener('click', () => switchView(currentView - 1));
  document.getElementById('view-next').addEventListener('click', () => switchView(currentView + 1));

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
    el.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      if (slider.isPercent) val = val / 100;
      state[slider.key] = val;
      updateValues(state);
    });
  });

  // Drag and drop events
  const zone = document.getElementById('drag-drop-zone');
  const fileInput = document.getElementById('file-import');
  const msgBox = document.getElementById('import-msg');

  const showMsg = (text, error) => {
    msgBox.className = `mt-4 px-3 py-2 rounded-lg text-xs flex items-center gap-2 ${
      error ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
    }`;
    msgBox.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
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
        if (d.usersCount !== undefined) { state.usersCount = d.usersCount; document.getElementById('sld-users').value = d.usersCount; }
        if (d.sitesCount !== undefined) { state.sitesCount = d.sitesCount; document.getElementById('sld-sites').value = d.sitesCount; }
        if (d.serversCount !== undefined) { state.serversCount = d.serversCount; document.getElementById('sld-servers').value = d.serversCount; }
        if (d.vmwareCorePrice !== undefined) { state.vmwareCorePrice = d.vmwareCorePrice; document.getElementById('sld-vmware').value = d.vmwareCorePrice; }
        if (d.cloudMonthlyCost !== undefined) { state.cloudMonthlyCost = d.cloudMonthlyCost; document.getElementById('sld-cloud').value = d.cloudMonthlyCost; }
        if (d.inflationRate !== undefined) { state.inflationRate = d.inflationRate; document.getElementById('sld-inflation').value = Math.round(d.inflationRate * 100); }
        
        updateValues(state);
        showMsg(`Import réussi : Paramètres budgétaires appliqués depuis ${name}.`, false);
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
