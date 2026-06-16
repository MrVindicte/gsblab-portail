import { defaultRaci } from '../config/defaultData.js?v=3';

export default function PmoWorkspace(state) {
  // Sort risks by criticality descending
  const sortedRisks = [...state.risksList].sort((a, b) => b.criticality - a.criticality);
  
  // Filter risks if category is chosen
  const filteredRisks = sortedRisks.filter(risk => state.pmoFilterCategory === 'Tout' || risk.category === state.pmoFilterCategory);

  const categories = ['Tout', 'Technique', 'Sécurité', 'Finance', 'Humain', 'Organisationnel'];
  const catButtons = categories.map(cat => `
    <button
      data-category="${cat}"
      class="btn-risk-filter px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
        state.pmoFilterCategory === cat 
          ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 font-semibold' 
          : 'bg-transparent border-white/5 text-slate-400 hover:border-slate-500'
      }"
    >
      ${cat}
    </button>
  `).join('');

  // RACI labels colors
  const getRaciLabelStyle = (role) => {
    switch (role) {
      case 'R': return 'bg-blue-500/10 border border-blue-500/25 text-blue-400 font-bold';
      case 'A': return 'bg-red-500/10 border border-red-500/25 text-red-500 font-extrabold';
      case 'C': return 'bg-orange-500/10 border border-orange-500/25 text-orange-400 font-semibold';
      case 'I': return 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold';
      default: return 'text-slate-600';
    }
  };

  const getCriticalityStyle = (score) => {
    if (score >= 12) return 'bg-red-500/15 text-red-500 border border-red-500/25 font-bold';
    if (score >= 8) return 'bg-orange-500/15 text-orange-400 border border-orange-500/25';
    return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25';
  };

  const renderedRisksRows = filteredRisks.map(risk => `
    <tr class="border-b border-white/5 text-slate-300 hover:bg-white/[0.02] transition">
      <td class="py-3 px-3 font-mono font-bold text-white">${risk.id}</td>
      <td class="py-3 px-3 font-semibold text-[10px] text-slate-400 uppercase">${risk.category}</td>
      <td class="py-3 px-3">
        <div class="font-semibold text-white">${risk.title}</div>
        <div class="text-[10px] text-slate-500 leading-normal mt-0.5">${risk.description}</div>
      </td>
      <td class="py-3 px-3 text-center font-mono">${risk.probability}</td>
      <td class="py-3 px-3 text-center font-mono">${risk.impact}</td>
      <td class="py-3 px-3 text-center">
        <span class="px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${getCriticalityStyle(risk.criticality)}">
          ${risk.criticality}
        </span>
      </td>
      <td class="py-3 px-3 text-[11px] leading-relaxed text-slate-400">${risk.mitigation}</td>
      <td class="py-3 px-3 font-semibold text-slate-300">${risk.owner}</td>
    </tr>
  `).join('');

  const renderedRaciRows = defaultRaci.map(item => `
    <tr class="border-b border-white/5 text-slate-300 hover:bg-white/[0.02] transition">
      <td class="py-3 px-3">
        <div class="font-semibold text-white">${item.task}</div>
        <div class="text-[10px] text-slate-500 mt-0.5 font-bold uppercase">${item.phase}</div>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.sponsor)}">
          ${item.roles.sponsor || '-'}
        </span>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.dirProjetClient)}">
          ${item.roles.dirProjetClient || '-'}
        </span>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.chefProjetEsn)}">
          ${item.roles.chefProjetEsn || '-'}
        </span>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.rssiGSB)}">
          ${item.roles.rssiGSB || '-'}
        </span>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.adminEsn)}">
          ${item.roles.adminEsn || '-'}
        </span>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.techSpokes)}">
          ${item.roles.techSpokes || '-'}
        </span>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block w-6 py-0.5 rounded text-[10px] font-bold ${getRaciLabelStyle(item.roles.editeurSgl)}">
          ${item.roles.editeurSgl || '-'}
        </span>
      </td>
    </tr>
  `).join('');

  const isPres = state.presentationMode;

  // ── MODE PRÉSENTATION — 2 slides visuelles ──────────────────────────────────
  if (isPres) {
    return `
      <!-- SLIDE 1 : Roadmap -->
      <div data-pres-slide="1,2,3,4,5" data-pres-label="Roadmap 2026-2030"
           class="flex-1 min-h-0 flex flex-col items-center justify-center gap-6 w-full max-w-6xl mx-auto h-full py-4">

        <div class="text-center space-y-2.5">
          <h2 class="text-3xl font-extrabold text-white tracking-tight leading-tight">Roadmap 2026–2030</h2>
          <div class="w-16 h-[2px] mx-auto bg-slate-700 rounded-full"></div>
          <p class="text-slate-400 text-sm mt-4">398 733 € &middot; Plafond 450 000 € &middot; Réserve 51 267 €</p>
        </div>

        <div class="relative w-full max-w-5xl mx-auto mt-12 px-4">
          <!-- Ligne horizontale de fond -->
          <div class="absolute top-[82px] left-[10%] right-[10%] h-[2px] bg-slate-800"></div>

          <div class="relative flex justify-between w-full">
          ${[
            { year:'2026', budget:'228 k€', color:'violet', phase:'Migration cœur', sites:12, users:215, bullets:['Proxmox VE + 2× R760','Exchange Online HDS','5 labos déployés'],   revealAt: null },
            { year:'2027', budget:'64 k€',  color:'blue',   phase:'Centres lot 1',  sites:20, users:303, bullets:['8 centres ouverts','SD-WAN 20 spokes','USW déploiement'],          revealAt: 2 },
            { year:'2028', budget:'60 k€',  color:'cyan',   phase:'Parc cible',     sites:27, users:380, bullets:['7 centres → plateau','380 utilisateurs','Coûts stabilisés'],        revealAt: 3 },
            { year:'2029', budget:'23 k€',  color:'emerald',phase:'Run-rate',        sites:27, users:380, bullets:['Exploitation courante','LTO-6 → LTO-8','Rachat optionnel'],        revealAt: 4 },
            { year:'2030', budget:'23 k€',  color:'slate',  phase:'Clôture projet', sites:27, users:380, bullets:['Dernière année','Bilan migration','Réserve disponible'],            revealAt: 5 },
          ].map((y, i) => `
            <div ${y.revealAt ? `data-reveal-at="${y.revealAt}"` : ''} class="relative flex flex-col items-center w-1/5 ${y.revealAt ? 'opacity-0 transition-all duration-700' : ''}">
              
              <!-- Titre du jalon (haut) -->
              <div class="text-center mb-6 w-full">
                <div class="text-3xl font-black text-${y.color}-400 font-mono" style="text-shadow: 0 0 15px rgba(255,255,255,0.05)">${y.year}</div>
                <div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">${y.phase}</div>
                <div class="font-mono text-${y.color}-300 font-bold text-sm mt-1">${y.budget}</div>
              </div>

              <!-- Nœud sur la ligne -->
              <div class="w-12 h-12 bg-slate-950 rounded-full border-[3px] border-${y.color}-500/50 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div class="w-3 h-3 bg-${y.color}-400 rounded-full shadow-[0_0_10px_currentColor]"></div>
              </div>

              <!-- Contenu du jalon (bas) -->
              <div class="mt-6 w-full px-2 text-center">
                <div class="flex justify-center gap-5 text-center border-b border-white/5 pb-3 mb-3 mx-2">
                  <div><div class="font-mono font-bold text-white text-sm">${y.users}</div><div class="text-[9px] text-slate-500 uppercase tracking-wider">pers.</div></div>
                  <div><div class="font-mono font-bold text-white text-sm">${y.sites}</div><div class="text-[9px] text-slate-500 uppercase tracking-wider">sites</div></div>
                </div>
                <div class="flex flex-col items-start gap-2 text-left pl-1">
                  ${y.bullets.map(b => `
                    <div class="flex items-start gap-1.5 text-xs text-slate-400 leading-tight">
                      <span class="text-${y.color}-500 flex-shrink-0 mt-0.5">▸</span><span>${b}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              
            </div>
          `).join('')}
          </div>
        </div>

      </div>

    `;
  }

  // ── MODE NORMAL ──────────────────────────────────────────────────────────────
  return `
    <div class="space-y-6">

      <!-- ── ROADMAP 2026-2030 ── -->
      <div data-pres-step="1" data-pres-label="Roadmap 2026-2030" class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Roadmap Projet — 2026 à 2030</span>
          </div>
          <div class="flex flex-wrap gap-2 text-[10px] items-center">
            <span class="bg-slate-800 border border-white/5 rounded px-2 py-1 font-mono text-slate-300">Sous-total : <strong class="text-white">369 197 €</strong></span>
            <span class="text-slate-600 font-bold">+</span>
            <span class="bg-amber-500/10 border border-amber-500/25 rounded px-2 py-1 font-mono text-amber-300">Provision 8 % : <strong>29 536 €</strong></span>
            <span class="text-slate-600 font-bold">=</span>
            <span class="bg-slate-700 border border-white/10 rounded px-2 py-1 font-mono text-white font-bold">Total : 398 733 €</span>
            <span class="text-slate-600 font-bold">·</span>
            <span class="bg-indigo-500/10 border border-indigo-500/25 rounded px-2 py-1 font-mono text-indigo-300">Plafond : <strong>450 000 €</strong></span>
            <span class="text-slate-600 font-bold">→</span>
            <span class="bg-emerald-500/10 border border-emerald-500/25 rounded px-2 py-1 font-mono text-emerald-300">Réserve : <strong>51 267 €</strong></span>
          </div>
        </div>

        <!-- Frise budgétaire -->
        <div class="grid grid-cols-5 gap-2">
          ${[
            { year: '2026', budget: 228662, pct: 100, phase: 'Migration cœur + 5 labos', eff: 215, sites: 12, color: 'violet', events: ['Proxmox VE + 2× R760','Exchange Online','VLAN + VPN IPsec','5 labos (Toulouse…)'] },
            { year: '2027', budget: 64508,  pct: 28,  phase: 'Centres lot 1 + switchs P2', eff: 303, sites: 20, color: 'blue',   events: ['8 centres de prélèvement','USW-24 déploiement','COPIL annuel'] },
            { year: '2028', budget: 60747,  pct: 27,  phase: 'Centres lot 2 — parc cible', eff: 380, sites: 27, color: 'cyan',   events: ['7 centres → 27 sites','380 utilisateurs atteints','Coûts au plateau'] },
            { year: '2029', budget: 23402,  pct: 10,  phase: 'Exploitation run-rate',       eff: 380, sites: 27, color: 'emerald',events: ['Exploitation courante','LTO-6 → LTO-8 (arbitrage)','Rachat concurrent (enveloppe distincte)'] },
            { year: '2030', budget: 23403,  pct: 10,  phase: 'Clôture projet migration',    eff: 380, sites: 27, color: 'slate',  events: ['Dernière année projet','Support Office LTSC à réévaluer','Réserve 51 267 € disponible'] },
          ].map(y => `
            <div class="flex flex-col gap-2">
              <!-- Année + budget -->
              <div class="text-center">
                <div class="text-lg font-black text-${y.color}-300 font-mono">${y.year}</div>
                <div class="text-[10px] font-mono font-semibold text-slate-300">${(y.budget/1000).toFixed(0)} k€</div>
              </div>
              <!-- Barre proportionnelle -->
              <div class="relative h-24 bg-slate-900/60 rounded-xl overflow-hidden border border-white/5">
                <div class="absolute bottom-0 left-0 right-0 bg-${y.color}-500/30 border-t-2 border-${y.color}-400/60 rounded-b-xl transition-all" style="height:${y.pct}%"></div>
                <div class="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                  <span class="text-[8px] font-bold text-slate-400">${y.eff} pers.</span>
                  <span class="text-[8px] text-slate-500">${y.sites} sites</span>
                </div>
              </div>
              <!-- Phase label -->
              <div class="text-[9px] text-center text-slate-400 leading-tight font-medium">${y.phase}</div>
              <!-- Événements -->
              <div class="space-y-0.5">
                ${y.events.map(e => `
                  <div class="flex items-start gap-1 text-[8px] text-slate-500">
                    <span class="text-${y.color}-500 flex-shrink-0 mt-0.5">▸</span>
                    <span>${e}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Jalons clés -->
        <div class="border-t border-white/5 pt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          ${[
            ['Jan 2027','EoSL WS 2016 — migration Q4 2026','amber'],
            ['Avr 2028','EoSL Cisco SG350XG-24 — remplacés 2027','amber'],
            ['2029','Rachat concurrent 150 pers. (enveloppe distincte)','blue'],
            ['2030','Clôture projet — run-rate 50 573 €/an','emerald'],
          ].map(([date, label, color]) => `
            <div class="flex items-start gap-2 bg-${color}-500/5 border border-${color}-500/15 rounded-lg px-2.5 py-2">
              <span class="text-[9px] font-mono font-bold text-${color}-400 flex-shrink-0 mt-0.5">${date}</span>
              <span class="text-[9px] text-slate-400 leading-snug">${label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Toggle headers -->
      <div class="flex justify-between items-center border-b border-white/5 pb-3">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-white">
            Gouvernance Projet & Méthodologie (PMO)
          </h2>
          <p class="text-slate-400 text-sm">
            Gerez les risques cyber-organisationnels et attribuez les responsabilites de la transition.
          </p>
        </div>

        <div class="flex bg-slate-900 p-1 rounded-lg border border-white/5 text-xs no-print">
          <button
            id="btn-subtab-risks"
            class="px-4 py-2 rounded-md font-semibold transition ${
              state.pmoSubTab === 'risks' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }"
          >
            Registre des Risques
          </button>
          <button
            id="btn-subtab-raci"
            class="px-4 py-2 rounded-md font-semibold transition ${
              state.pmoSubTab === 'raci' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }"
          >
            Matrice RACI
          </button>
        </div>
      </div>

      ${state.pmoSubTab === 'risks' ? `
        <!-- REGISTRE DES RISQUES -->
        <div class="space-y-4">
          
          <div data-pres-step="2" class="flex flex-wrap gap-2 no-print">
            ${catButtons}
          </div>

          <div data-pres-step="3" class="glass-panel print-card rounded-xl p-6 overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="border-b border-white/5 text-slate-400 uppercase tracking-wider font-semibold">
                  <th class="py-2.5 px-3 w-16">ID</th>
                  <th class="py-2.5 px-3 w-32">Catégorie</th>
                  <th class="py-2.5 px-3">Risque</th>
                  <th class="py-2.5 px-3 w-12 text-center">P</th>
                  <th class="py-2.5 px-3 w-12 text-center">I</th>
                  <th class="py-2.5 px-3 w-20 text-center">Score</th>
                  <th class="py-2.5 px-3">Actions de Mitigation</th>
                  <th class="py-2.5 px-3 w-36">Propriétaire</th>
                </tr>
              </thead>
              <tbody>
                ${renderedRisksRows}
              </tbody>
            </table>
          </div>

          <!-- Explanations -->
          <div data-pres-step="4" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-4 no-print">
            <div class="p-3 bg-red-500/5 border border-red-500/10 rounded-lg flex gap-2">
              <svg class="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <div>
                <span class="font-bold text-red-400 block mb-0.5">Criticite Rouge [12-25]</span>
                Plan d'action d'urgence obligatoire sous 24h, arbitrage direct en COPIL.
              </div>
            </div>
            <div class="p-3 bg-orange-500/5 border border-orange-500/10 rounded-lg flex gap-2">
              <svg class="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <div>
                <span class="font-bold text-orange-400 block mb-0.5">Criticite Orange [8-10]</span>
                Actions d'attenuation programmees, surveillance étroite.
              </div>
            </div>
            <div class="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex gap-2">
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div>
                <span class="font-bold text-emerald-400 block mb-0.5">Criticite Verte [1-6]</span>
                Risque faible tolere, mitige par les procedures standard.
              </div>
            </div>
          </div>

        </div>
      ` : `
        <!-- MATRICE RACI -->
        <div class="space-y-4">
          
          <div data-pres-step="2" class="glass-panel print-card rounded-xl p-6 overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="border-b border-white/5 text-slate-400 uppercase tracking-wider font-semibold">
                  <th class="py-3 px-3 w-1/3">Tâches et Activités Clés</th>
                  <th class="py-3 px-3 text-center">Sponsor</th>
                  <th class="py-3 px-3 text-center">Dir. Projet</th>
                  <th class="py-3 px-3 text-center">ESN CP</th>
                  <th class="py-3 px-3 text-center">RSSI</th>
                  <th class="py-3 px-3 text-center">Admins</th>
                  <th class="py-3 px-3 text-center">Tech</th>
                  <th class="py-3 px-3 text-center">Éditeur</th>
                </tr>
              </thead>
              <tbody>
                ${renderedRaciRows}
              </tbody>
            </table>
          </div>

          <!-- Legend -->
          <div data-pres-step="3" class="flex flex-wrap gap-4 text-xs mt-2 justify-center no-print">
            <span class="flex items-center gap-1.5">
              <span class="w-5 py-0.5 rounded text-[10px] font-bold text-center bg-blue-500/10 border border-blue-500/25 text-blue-400">R</span>
              <span>Responsible (Réalise l'action)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-5 py-0.5 rounded text-[10px] font-bold text-center bg-red-500/10 border border-red-500/25 text-red-500">A</span>
              <span>Accountable (Garant / Décideur final)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-5 py-0.5 rounded text-[10px] font-bold text-center bg-orange-500/10 border border-orange-500/25 text-orange-400">C</span>
              <span>Consulted (Consulté pour expertise)</span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-5 py-0.5 rounded text-[10px] font-bold text-center bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">I</span>
              <span>Informed (Tenu informé de la fin)</span>
            </span>
          </div>

        </div>
      `}

    </div>
  `;
}

export function bindPmoEvents(state, renderApp) {
  const btnRisks = document.getElementById('btn-subtab-risks');
  const btnRaci = document.getElementById('btn-subtab-raci');

  btnRisks.addEventListener('click', () => {
    state.pmoSubTab = 'risks';
    if (state.presentationMode) state.presentationStep = 1;
    renderApp();
  });

  btnRaci.addEventListener('click', () => {
    state.pmoSubTab = 'raci';
    if (state.presentationMode) state.presentationStep = 1;
    renderApp();
  });

  if (state.pmoSubTab === 'risks') {
    const filters = document.querySelectorAll('.btn-risk-filter');
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        state.pmoFilterCategory = btn.getAttribute('data-category');
        if (state.presentationMode) state.presentationStep = 1;
        renderApp();
      });
    });
  }
}
