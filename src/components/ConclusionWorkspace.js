export default function ConclusionWorkspace(state) {
  const isPres = state.presentationMode;

  if (!isPres) {
    return `<div class="flex items-center justify-center h-full text-slate-500 text-sm">Conclusion — disponible uniquement en mode présentation.</div>`;
  }

  return `
    <div data-pres-slide="1" data-pres-label="Conclusion" class="flex-1 min-h-0 flex flex-col items-center justify-center w-full h-full">

      <!-- Halo de fond -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl"></div>
        <div class="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/4 blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-8 py-6 w-full flex flex-col gap-8">

        <!-- En-tête -->
        <div class="text-center space-y-3">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Mastère 2IC · GSBLAB · 2026 – 2030</p>
          <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Modernisation du SI de<br/>
            <span class="bg-gradient-to-r from-indigo-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">GSBLAB</span>
          </h1>
          <div class="w-20 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        <!-- 4 chiffres clés -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-900/70 border border-indigo-500/20 rounded-2xl p-5 text-center backdrop-blur-sm">
            <div class="text-3xl font-extrabold font-mono text-indigo-400">27</div>
            <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-1.5">Sites interconnectés</div>
            <div class="text-[10px] text-slate-600 mt-0.5">vs 7 aujourd'hui</div>
          </div>
          <div class="bg-slate-900/70 border border-emerald-500/20 rounded-2xl p-5 text-center backdrop-blur-sm">
            <div class="text-3xl font-extrabold font-mono text-emerald-400">380</div>
            <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-1.5">Utilisateurs couverts</div>
            <div class="text-[10px] text-slate-600 mt-0.5">vs 130 aujourd'hui</div>
          </div>
          <div class="bg-slate-900/70 border border-blue-500/20 rounded-2xl p-5 text-center backdrop-blur-sm">
            <div class="text-3xl font-extrabold font-mono text-blue-400">5</div>
            <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-1.5">VLAN / site</div>
            <div class="text-[10px] text-slate-600 mt-0.5">segmentation HDS isolée</div>
          </div>
          <div class="bg-slate-900/70 border border-purple-500/20 rounded-2xl p-5 text-center backdrop-blur-sm">
            <div class="text-3xl font-extrabold font-mono text-purple-400">4</div>
            <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-1.5">Phases de déploiement</div>
            <div class="text-[10px] text-slate-600 mt-0.5">2026 → 2030</div>
          </div>
        </div>

        <!-- 3 piliers -->
        <div class="grid grid-cols-3 gap-4">
          <div class="glass-panel rounded-xl p-4 flex flex-col gap-2 border-l-2 border-indigo-500">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="text-sm font-bold text-slate-200">Réseau SD-WAN unifié</span>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">26 tunnels IPsec AES-256 auto-orchestrés · UniFi Magic Site-to-Site · HA au siège</p>
          </div>
          <div class="glass-panel rounded-xl p-4 flex flex-col gap-2 border-l-2 border-emerald-500">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
              <span class="text-sm font-bold text-slate-200">Conformité HDS</span>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">VLAN 30 isolé sur chaque site · chiffrement bout-en-bout · OVHcloud Cold Archive</p>
          </div>
          <div class="glass-panel rounded-xl p-4 flex flex-col gap-2 border-l-2 border-blue-500">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              <span class="text-sm font-bold text-slate-200">Infrastructure IaC</span>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">Proxmox VE · cluster HA · 9 VMs · déploiement Terraform + Ansible reproductible</p>
          </div>
        </div>

        <!-- Budget + questions -->
        <div class="flex items-center justify-between gap-6">
          <div class="flex items-center gap-4 bg-slate-900/60 border border-white/8 rounded-2xl px-6 py-4">
            <div class="text-center">
              <div class="text-2xl font-extrabold font-mono text-white">398 733 €</div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">Budget total CAPEX</div>
            </div>
            <div class="w-px h-10 bg-white/10"></div>
            <div class="text-center">
              <div class="text-2xl font-extrabold font-mono text-emerald-400">51 267 €</div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">Réserve provision.</div>
            </div>
            <div class="w-px h-10 bg-white/10"></div>
            <div class="text-center">
              <div class="text-2xl font-extrabold font-mono text-indigo-400">450 000 €</div>
              <div class="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">Enveloppe totale</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-4xl font-extrabold text-white">Merci</div>
            <div class="text-slate-500 text-sm mt-1 font-mono">Questions ?</div>
            <div class="text-[10px] text-slate-600 mt-2 font-mono tracking-wider uppercase">Équipe GSBLAB · Mastère 2IC</div>
          </div>
        </div>

      </div>
    </div>
  `;
}
