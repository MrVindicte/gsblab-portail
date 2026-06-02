import { defaultRaci } from '../config/defaultData.js?v=2';

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

  return `
    <div class="space-y-6">
      
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
          
          <div data-pres-step="1" class="flex flex-wrap gap-2 no-print">
            ${catButtons}
          </div>

          <div data-pres-step="2" class="glass-panel print-card rounded-xl p-6 overflow-x-auto">
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
          <div data-pres-step="3" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-4 no-print">
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
          
          <div data-pres-step="1" class="glass-panel print-card rounded-xl p-6 overflow-x-auto">
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
          <div data-pres-step="2" class="flex flex-wrap gap-4 text-xs mt-2 justify-center no-print">
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
