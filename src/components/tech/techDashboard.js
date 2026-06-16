// ══════════════════════════════════════════════════════════════════════════════
// techDashboard.js — HTML du dashboard technique (mode non-présentation)
// ══════════════════════════════════════════════════════════════════════════════

import { mapHub, mapPositions, franceMapPath } from './techData.js';

export function buildDashboardHTML(state) {
  const hubX = 250, hubY = 180, radius = 130;
  const spokesList = state.spokesList;
  const spokesWithCoords = spokesList.slice(1).map((site, index, arr) => {
    const angle = (index * 2 * Math.PI) / arr.length;
    return { ...site, x: hubX + radius * Math.cos(angle), y: hubY + radius * Math.sin(angle) };
  });
  const totalCores = state.serversCount * 2 * 16, totalRam = state.serversCount * 128;
  const allocatedCores = 16, allocatedRam = 36;
  const pctCores = Math.round((allocatedCores / totalCores) * 100);
  const pctRam   = Math.round((allocatedRam   / totalRam)   * 100);

  const svgLines = spokesWithCoords.map(spoke => `
    <line id="line-${spoke.id}" x1="${hubX}" y1="${hubY}" x2="${spoke.x}" y2="${spoke.y}"
      stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4" class="transition-all" />
  `).join('');
  const svgNodes = spokesWithCoords.map(spoke => `
    <g class="spoke-node-group cursor-pointer group" data-spoke-id="${spoke.id}">
      <circle cx="${spoke.x}" cy="${spoke.y}" r="12" fill="#131b2e" stroke="#1e293b" stroke-width="2"
        class="group-hover:stroke-emerald-400 group-hover:fill-emerald-900/40 transition-all duration-300" />
      <text x="${spoke.x}" y="${spoke.y + 24}" text-anchor="middle" fill="#64748b" font-size="8" font-weight="bold"
        class="pointer-events-none font-sans group-hover:fill-emerald-400 transition-colors">
        ${spoke.name.replace('Labo Expansion ', 'E-').replace('Strasbourg ', 'S-').split(' ')[0]}
      </text>
    </g>
  `).join('');

  // ── Carte de France (non-pres) ──
  const mapSpokes = spokesList.slice(1).map((site, index) => ({ ...site, ...mapPositions[index] }));
  const franceMapLines = mapSpokes.map(s => `<line id="map-line-${s.id}" x1="${mapHub.x}" y1="${mapHub.y}" x2="${s.x}" y2="${s.y}" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3" class="transition-all duration-200" />`).join('');
  const franceMapMarkers = mapSpokes.map(s => `<g class="france-map-marker cursor-pointer" data-map-site-id="${s.id}"><circle cx="${s.x}" cy="${s.y}" r="11" fill="transparent" /><circle class="map-marker-dot" cx="${s.x}" cy="${s.y}" r="5" fill="#10b981" stroke="#0d1117" stroke-width="1.5" style="transition:r .2s ease,fill .2s ease;" /></g>`).join('');
  const franceMapHub = `<g class="france-map-marker cursor-pointer" data-map-site-id="${spokesList[0].id}"><circle cx="${mapHub.x}" cy="${mapHub.y}" r="14" fill="#3b82f6" fill-opacity="0.18" class="animate-ping" style="transform-origin:${mapHub.x}px ${mapHub.y}px;" /><circle cx="${mapHub.x}" cy="${mapHub.y}" r="20" fill="transparent" /><circle class="map-marker-dot" cx="${mapHub.x}" cy="${mapHub.y}" r="7" fill="#3b82f6" stroke="#0d1117" stroke-width="2" style="transition:r .2s ease;" /></g><text x="${mapHub.x + 10}" y="${mapHub.y + 30}" text-anchor="end" fill="#93c5fd" font-size="12" font-weight="800" class="font-sans uppercase tracking-wider pointer-events-none">Strasbourg · Siège</text>`;

  return `
    <div data-pres-slide="1" class="space-y-6 h-full overflow-y-auto pr-2 pb-10">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white">Technique, Architecture &amp; Topologie Réseau</h2>
        <p class="text-slate-400 text-sm">Inspectez la configuration physique du réseau Hub &amp; Spoke et les ressources système allouées.</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Topologie Réseau Hub &amp; Spoke (Interactif)</h3>
          <div class="bg-slate-950/60 rounded-lg p-4 flex items-center justify-center overflow-x-auto relative">
            <svg width="500" height="360" viewBox="0 0 500 360" class="w-full max-w-[500px]">
              ${svgLines}
              <circle id="hub-node" cx="${hubX}" cy="${hubY}" r="28" fill="#1e293b" stroke="#3b82f6" stroke-width="3" class="cursor-pointer hover:stroke-blue-400 hover:fill-blue-900/30 transition-all duration-300" />
              <text x="${hubX}" y="${hubY + 4}" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" class="pointer-events-none font-sans">HUB</text>
              <text x="${hubX}" y="${hubY + 38}" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="semibold" class="pointer-events-none font-sans">Strasbourg</text>
              ${svgNodes}
            </svg>
          </div>
          <div class="text-[10px] text-slate-500 mt-3 text-center">* Survolez un nœud pour inspecter ses configurations</div>
        </div>
        <div class="lg:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between" id="site-details-panel"></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1 glass-panel rounded-xl p-6 space-y-5 flex flex-col justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider border-b border-white/5 pb-2">Ressources du Cluster Proxmox</h3>
          <div class="space-y-4">
            <div class="space-y-1"><div class="flex justify-between text-xs"><span class="text-slate-400">Processeur (vCœurs)</span><span class="font-mono text-slate-300">${allocatedCores} / ${totalCores} (${pctCores}%)</span></div><div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-blue-500 rounded-full" style="width:${pctCores}%"></div></div></div>
            <div class="space-y-1"><div class="flex justify-between text-xs"><span class="text-slate-400">Mémoire RAM (Go)</span><span class="font-mono text-slate-300">${allocatedRam} / ${totalRam} (${pctRam}%)</span></div><div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-blue-500 rounded-full" style="width:${pctRam}%"></div></div></div>
            <div class="space-y-1"><div class="flex justify-between text-xs"><span class="text-slate-400">Pool Ceph (NVMe)</span><span class="font-mono text-slate-300">1.2 TB / 6.0 TB (20%)</span></div><div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-blue-500 rounded-full" style="width:20%"></div></div></div>
          </div>
        </div>
        <div class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div class="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
            <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">Déploiement Automatisé (PoC IaC)</h3>
            <div class="flex bg-slate-950 p-1 rounded-lg border border-white/5 text-xs no-print">
              <button id="btn-code-terraform" class="px-3 py-1 rounded-md font-medium transition bg-blue-600/10 text-blue-400">Terraform (VMs)</button>
              <button id="btn-code-ansible" class="px-3 py-1 rounded-md font-medium transition text-slate-400">Ansible (Securisation)</button>
            </div>
          </div>
          <div class="code-panel" id="code-content-box">
            <!-- Populated -->
          </div>
          
          <div class="flex justify-between items-center text-[10px] text-slate-500 mt-3 border-t border-white/5 pt-2">
            <span id="code-file-path">Chemin : /Scripts/03_Proxmox_Provisioning.tf</span>
            <span class="flex items-center gap-1">IaC Validé</span>
          </div>
        </div>
      </div>
    </div>`;
}
