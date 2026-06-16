export default function SitesWorkspace(state = {}) {
  const isPres = state.presentationMode;

  // ── MODE PRÉSENTATION — 2 slides visuelles ──────────────────────────────────
  if (isPres) {
    return `
      <!-- SLIDE 1 : Vue d'ensemble 27 sites -->
      <div data-pres-slide="1,2,3" data-pres-label="Architecture des 27 Sites"
           class="flex-1 min-h-0 flex flex-col items-center justify-center gap-6 w-full max-w-6xl mx-auto h-full py-4">

        <div class="text-center space-y-2">
          <h2 class="text-5xl font-extrabold text-white tracking-tight font-display">Architecture des 27 Sites</h2>
          <div class="w-20 h-1.5 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500 mx-auto rounded-full"></div>
          <p class="text-slate-400 text-sm">380 utilisateurs au plateau · Déploiement 2026-2028</p>
        </div>

        <div class="flex flex-col gap-6 w-full max-w-5xl mx-auto flex-1 min-h-0 justify-center">

          <!-- Siège -->
          <div class="bg-[#13141a] rounded-2xl p-6 border border-violet-500/20 flex items-center gap-6 shadow-[0_8px_40px_-12px_rgba(139,92,246,0.15)] relative overflow-hidden group">
            <div class="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-violet-500/60 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none"></div>
            
            <div class="w-72 shrink-0 flex flex-col gap-4 relative z-10 border-r border-white/5 pr-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  <svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div>
                  <div class="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Siège Social</div>
                  <div class="text-base font-bold text-white">Strasbourg DG</div>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div><div class="text-2xl font-mono font-extrabold text-violet-300">1</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">Site HUB</div></div>
                <div><div class="text-2xl font-mono font-extrabold text-violet-300">75</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">Utilisateurs</div></div>
              </div>
            </div>

            <div class="flex-1 grid grid-cols-2 gap-3 relative z-10">
              ${[
                'Cluster Proxmox VE HA — 2× Dell R760',
                'Baie Dell PowerVault ME484 + Ceph',
                'FortiGate 1100E — Hub VPN hub-and-spoke',
                'Exchange Online HDS + Entra ID',
                'PBS + OVH Object Storage HDS',
              ].map(b => `
                <div class="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl p-3 group-hover:border-violet-500/20 transition-colors">
                  <div class="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
                  <span class="text-[11px] font-semibold text-slate-300 leading-snug">${b}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Labos -->
          <div data-reveal-at="2" class="bg-[#13141a] rounded-2xl p-6 border border-blue-500/20 flex items-center gap-6 shadow-[0_8px_40px_-12px_rgba(59,130,246,0.15)] relative overflow-hidden group opacity-0 transition-all duration-700">
            <div class="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/60 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>
            
            <div class="w-72 shrink-0 flex flex-col gap-4 relative z-10 border-r border-white/5 pr-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Phase 2026</div>
                  <div class="text-base font-bold text-white">5 Laboratoires</div>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div><div class="text-2xl font-mono font-extrabold text-blue-300">5</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">Sites</div></div>
                <div><div class="text-2xl font-mono font-extrabold text-blue-300">60</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">Utilisateurs</div></div>
                <div><div class="text-2xl font-mono font-extrabold text-blue-300">11k€</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">/Labo</div></div>
              </div>
            </div>

            <div class="flex-1 grid grid-cols-2 gap-3 relative z-10">
              ${[
                'Toulouse · Marseille · Nantes · Lyon · Lille',
                '10 HP ProDesk 400 G9 + 2 HP 250 G10',
                'FortiGate 40F spoke + CBS250-24T',
                'Ubiquiti U6+ Wi-Fi 6',
                'VLAN 10/20/30/40/99 — règle 10.S.V.0/24',
              ].map(b => `
                <div class="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl p-3 group-hover:border-blue-500/20 transition-colors">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  <span class="text-[11px] font-semibold text-slate-300 leading-snug">${b}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Centres -->
          <div data-reveal-at="3" class="bg-[#13141a] rounded-2xl p-6 border border-emerald-500/20 flex items-center gap-6 shadow-[0_8px_40px_-12px_rgba(16,185,129,0.15)] relative overflow-hidden group opacity-0 transition-all duration-700">
            <div class="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/60 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
            
            <div class="w-72 shrink-0 flex flex-col gap-4 relative z-10 border-r border-white/5 pr-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>
                </div>
                <div>
                  <div class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Phase 2027-2028</div>
                  <div class="text-base font-bold text-white">15 Centres</div>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div><div class="text-2xl font-mono font-extrabold text-emerald-300">15</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">Sites</div></div>
                <div><div class="text-2xl font-mono font-extrabold text-emerald-300">245</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">Utilisateurs</div></div>
                <div><div class="text-2xl font-mono font-extrabold text-emerald-300">5k€</div><div class="text-[9px] text-slate-500 uppercase mt-0.5 font-bold">/Centre</div></div>
              </div>
            </div>

            <div class="flex-1 grid grid-cols-2 gap-3 relative z-10">
              ${[
                '3 centres par laboratoire (rayon &lt; 50 km)',
                '5 HP ProDesk 400 G9 + 1 HP 250 G10',
                'FortiGate 40F spoke + CBS250-16T',
                'VLAN 20/30/40/99 — VLAN 10 via VPN hub',
                'Lot 1 : 8 centres 2027 · Lot 2 : 7 centres 2028',
              ].map(b => `
                <div class="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl p-3 group-hover:border-emerald-500/20 transition-colors">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  <span class="text-[11px] font-semibold text-slate-300 leading-snug">${b}</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

      <!-- SLIDE 2 : Connectivité & VLAN -->
      <div data-pres-slide="4,5" data-pres-label="Connectivité & Sécurité Réseau"
           class="flex-1 min-h-0 flex flex-col items-center justify-center gap-6 w-full max-w-6xl mx-auto h-full py-4">

        <div class="text-center space-y-2">
          <h2 class="text-5xl font-extrabold text-indigo-300 tracking-tight font-display">Connectivité Hub-and-Spoke</h2>
          <div class="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]"></div>
          <p class="text-slate-400 text-sm">VPN IPsec AES-256 IKEv2 · Règle d'adressage 10.S.V.0/24</p>
        </div>

        <div class="flex flex-col gap-6 w-full max-w-5xl mx-auto flex-1 min-h-0 justify-center">

          <!-- Topologie hub-and-spoke -->
          <div class="bg-[#13141a] rounded-2xl p-6 border border-indigo-500/20 flex items-center gap-6 shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)] relative overflow-hidden group">
            <div class="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/60 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none"></div>
            
            <div class="w-72 shrink-0 flex flex-col gap-4 relative z-10 border-r border-white/5 pr-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
                <div>
                  <div class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Topologie Globale</div>
                  <div class="text-base font-bold text-white">Hub-and-Spoke</div>
                </div>
              </div>
              <div class="text-[10px] text-slate-400 leading-relaxed">
                Connectivité IPsec hautement sécurisée entre le Hub central et les 20 sites périphériques.
              </div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-center gap-3 relative z-10">
              <!-- HUB -->
              <div class="bg-violet-500/10 border border-violet-500/30 rounded-xl px-6 py-2.5 text-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <div class="text-violet-300 font-bold text-sm">HUB — Strasbourg</div>
                <div class="text-[10px] text-slate-400 mt-0.5">FortiGate 1100E · Cluster Proxmox</div>
              </div>

              <!-- VPN bar -->
              <div class="flex items-center gap-3 text-[9px] text-indigo-400 font-mono w-full justify-center">
                <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-indigo-500/50"></div>
                <div class="bg-indigo-500/10 border border-indigo-500/20 rounded px-3 py-1 text-center shadow-[0_0_10px_rgba(99,102,241,0.2)]">VPN IPsec AES-256 IKEv2</div>
                <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-indigo-500/50"></div>
              </div>

              <!-- Spokes -->
              <div class="grid grid-cols-3 gap-3 w-full max-w-sm">
                ${[
                  ['S10–14','5 Labos','blue'],
                  ['S20–27','8 Centres 2027','emerald'],
                  ['S28–34','7 Centres 2028','emerald'],
                ].map(([s,l,c]) => `
                  <div class="bg-${c}-500/10 border border-${c}-500/25 rounded-xl px-2 py-1.5 text-center group-hover:border-${c}-500/50 transition-colors">
                    <div class="text-${c}-300 font-mono font-bold text-xs">${s}</div>
                    <div class="text-[9px] text-slate-400 mt-0.5">${l}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Infra per site -->
              <div class="flex items-center gap-2 text-[9px] text-slate-400 bg-black/40 border border-white/5 rounded-lg px-4 py-1.5 mt-1">
                <span class="text-white font-semibold">LAN Spoke</span>
                <span>→</span>
                <span>FortiGate 40F</span>
                <span>→</span>
                <span>CBS250-24T/16T</span>
                <span>→</span>
                <span>Ubiquiti U6+</span>
              </div>
            </div>
          </div>

          <!-- VLAN palette -->
          <div data-reveal-at="5" class="bg-[#13141a] rounded-2xl p-6 border border-slate-500/20 flex items-center gap-6 shadow-[0_8px_40px_-12px_rgba(148,163,184,0.1)] relative overflow-hidden group opacity-0 transition-all duration-700">
            <div class="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-400/50 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-transparent pointer-events-none"></div>
            
            <div class="w-72 shrink-0 flex flex-col gap-4 relative z-10 border-r border-white/5 pr-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(148,163,184,0.2)]">
                  <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <div>
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modèle Spoke</div>
                  <div class="text-base font-bold text-white leading-tight">Segmentation<br>VLAN unifiée</div>
                </div>
              </div>
              <div class="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2.5 text-[9px] text-emerald-300">
                <svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span class="leading-relaxed"><b>ACL FortiGate HDS</b><br>VLAN 40 → 30 : DROP<br>VLAN 20 → 30 : PERMIT métier</span>
              </div>
            </div>

            <div class="flex-1 grid grid-cols-3 gap-3 relative z-10">
              ${[
                ['10','Admin / Serveurs','blue','Routé VPN vers Siège'],
                ['20','Postes de travail','indigo','Accès métier local'],
                ['30','Analyse HDS','emerald','ISOLÉ STRICT — V40 BLOQUÉ'],
                ['40','Wi-Fi invités','amber','Internet uniquement'],
                ['99','Management','slate','CBS250 + 40F hors-bande'],
              ].map(([id, name, color, note]) => `
                <div class="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center group-hover:border-${color}-500/30 transition-colors">
                  <div class="text-xl font-mono font-bold text-${color}-400 mb-0.5">${id}</div>
                  <div class="text-[11px] text-white font-semibold leading-tight">${name}</div>
                  <div class="text-[9px] text-slate-500 mt-1.5 leading-tight">${note}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ── MODE NORMAL ──────────────────────────────────────────────────────────────
  return `
    <!-- ═══════════════════════════════════════════════════════════════
         PRÉSENTATION DES SITES
    ═══════════════════════════════════════════════════════════════ -->
    <div class="space-y-10">

      <!-- PAGE HEADER -->
      <div data-pres-step="1" data-pres-label="Sites — Vue d'ensemble" class="glass-panel rounded-2xl p-6 border border-white/8">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-white font-display">Présentation des Sites</h1>
                <p class="text-xs text-slate-400 mt-0.5">Architecture cible — 27 sites au plateau (2028)</p>
              </div>
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <div class="bg-indigo-500/10 border border-indigo-500/25 rounded-xl px-4 py-2.5 text-center">
              <div class="text-xl font-bold text-indigo-300">27</div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Sites totaux</div>
            </div>
            <div class="bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-2.5 text-center">
              <div class="text-xl font-bold text-emerald-300">380</div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Utilisateurs</div>
            </div>
            <div class="bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-2.5 text-center">
              <div class="text-xl font-bold text-blue-300">135 450 €</div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Budget sites neufs HT</div>
            </div>
          </div>
        </div>

        <!-- Timeline déploiement -->
        <div class="mt-5 grid grid-cols-3 gap-3">
          <div class="rounded-xl p-3 bg-slate-900/60 border border-white/5 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider">Siège Strasbourg</div>
              <div class="text-xs font-semibold text-white mt-0.5">1 site — Hub central HDS</div>
            </div>
          </div>
          <div class="rounded-xl p-3 bg-slate-900/60 border border-white/5 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider">Phase 2026 — 5 Labos</div>
              <div class="text-xs font-semibold text-white mt-0.5">Toulouse · Marseille · Nantes · Lyon · Lille</div>
            </div>
          </div>
          <div class="rounded-xl p-3 bg-slate-900/60 border border-white/5 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>
            </div>
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider">Phase 2027-2028 — 15 Centres</div>
              <div class="text-xs font-semibold text-white mt-0.5">3 centres par laboratoire</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SECTION 1 : SIÈGE ─────────────────────────────────────────────── -->
      <div data-pres-step="2" data-pres-label="Siège Strasbourg DG" class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent"></div>
          <div class="flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full">
            <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span class="text-xs font-bold text-violet-300 uppercase tracking-wider">Siège Social — Strasbourg DG</span>
          </div>
          <div class="h-px flex-1 bg-gradient-to-l from-violet-500/50 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Colonne gauche : infos générales -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Effectifs & Accès</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-violet-300">64</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Utilisateurs</div>
              </div>
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-slate-200">56</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Devices</div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span class="text-slate-400">Type de licences</span>
                <span class="text-slate-200 font-medium">CAL User (itinérants)</span>
              </div>
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span class="text-slate-400">OS postes</span>
                <span class="text-slate-200 font-medium">Windows 11 Pro</span>
              </div>
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span class="text-slate-400">Messagerie</span>
                <span class="text-slate-200 font-medium">Exchange Online Plan 1</span>
              </div>
              <div class="flex items-center justify-between text-xs py-1.5">
                <span class="text-slate-400">Conformité</span>
                <span class="text-emerald-400 font-semibold">HDS</span>
              </div>
            </div>
            <!-- VLANs -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Segmentation VLAN</div>
              <div class="space-y-1.5">
                ${[
                  ['10','Administration / Serveurs','slate','IT only'],
                  ['20','Postes administratifs','blue','LAN + applis métier'],
                  ['30','Analyse médicale (HDS)','emerald','Isolé strict'],
                  ['40','Wi-Fi / Invités','amber','Internet only'],
                  ['99','Management réseau','violet','IT only'],
                ].map(([id, label, color, policy]) => `
                  <div class="flex items-center gap-2 text-[10px]">
                    <span class="w-9 text-center font-mono font-bold text-${color}-400 bg-${color}-500/10 border border-${color}-500/20 rounded px-1 py-0.5">V${id}</span>
                    <span class="text-slate-400 flex-1 truncate">${label}</span>
                    <span class="text-slate-600 italic">${policy}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Colonne centre : infrastructure serveurs -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Infrastructure Serveurs</span>
            </div>

            <!-- Cluster Proxmox -->
            <div class="bg-indigo-500/8 border border-indigo-500/20 rounded-xl p-3.5">
              <div class="flex items-center gap-2 mb-2.5">
                <div class="w-5 h-5 rounded bg-indigo-500/30 flex items-center justify-center">
                  <div class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                </div>
                <span class="text-xs font-bold text-indigo-300">Cluster Proxmox VE HA</span>
                <span class="ml-auto text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5 font-semibold">ACTIF</span>
              </div>
              <div class="space-y-2">
                <div class="bg-slate-900/60 rounded-lg p-2.5">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span class="text-[10px] font-bold text-emerald-300">2× Dell R760 — PRODUCTION</span>
                  </div>
                  <div class="text-[10px] text-slate-400 leading-relaxed">
                    Xeon Silver 4416+ · 256 Go RAM ECC<br>
                    8× 3,84 To SSD NVMe · 2× 10 GbE<br>
                    <span class="text-slate-500">Garantie Dell 5 ans basique</span>
                  </div>
                </div>
                <div class="bg-slate-900/60 rounded-lg p-2.5">
                  <div class="flex items-center gap-1.5 mb-1">
                    <div class="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                    <span class="text-[10px] font-bold text-amber-300">2× Dell R730 — HOT STANDBY</span>
                  </div>
                  <div class="text-[10px] text-slate-400 leading-relaxed">
                    Xeon E5-2609 v4 · 16 Go RAM<br>
                    SSD SAS 3,84 To × 4 (migration HDD→SSD)<br>
                    <span class="text-slate-500">Bascule HA auto (live migration)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stockage & backup -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Stockage & Sauvegarde</div>
              <div class="space-y-1.5">
                <div class="flex items-start gap-2 text-[10px] bg-slate-900/40 rounded-lg p-2">
                  <svg class="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                  <div>
                    <div class="font-semibold text-slate-300">Dell VNX 5200</div>
                    <div class="text-slate-500">12 To · cible PBS local · baie fiabilisée</div>
                  </div>
                </div>
                <div class="flex items-start gap-2 text-[10px] bg-slate-900/40 rounded-lg p-2">
                  <svg class="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                  <div>
                    <div class="font-semibold text-slate-300">PowerVault 114X + LTO-6</div>
                    <div class="text-slate-500">Air-gap anti-ransomware · archives 20 ans HDS</div>
                  </div>
                </div>
                <div class="flex items-start gap-2 text-[10px] bg-slate-900/40 rounded-lg p-2">
                  <svg class="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                  <div>
                    <div class="font-semibold text-slate-300">OVHcloud Cold Archive HDS</div>
                    <div class="text-slate-500">~25 €/mois · 2 To · hébergeur HDS France</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Règle 3-2-1-1-0 -->
            <div class="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
              <div class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">Sauvegarde 3-2-1-1-0 (ANSSI)</div>
              <div class="grid grid-cols-5 gap-1 text-center">
                ${[['3','Copies'],['2','Médias'],['1','Hors site'],['1','Hors ligne'],['0','Erreur']].map(([n, l]) => `
                  <div class="bg-slate-900/60 rounded-lg py-1.5">
                    <div class="text-sm font-bold text-emerald-300">${n}</div>
                    <div class="text-[8px] text-slate-500 leading-tight">${l}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Colonne droite : équipements & réseau -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-slate-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v8M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Postes & Réseau</span>
            </div>

            <div class="space-y-2">
              ${[
                ['40×','HP Z440 Workstations','Bureautique siège · Win 11 · conservés','slate'],
                ['11×','Cisco CBS250 (switchs)','5× CBS250-24P (2026) + 6× CBS250-24T (2027)','blue'],
                ['9×','Ubiquiti U6+ Wi-Fi 6','PoE · gestion UniFi centralisée','cyan'],
                ['2×','Eaton 9PX 3000W RT2U','Onduleurs · management SNMP · conservés','amber'],
                ['15×','Samsung Galaxy A16 5G','Knox MDM · 6 ans patches Android · MFA','green'],
              ].map(([qty, name, desc, color]) => `
                <div class="flex items-start gap-3 text-[10px] py-2 border-b border-white/5 last:border-0">
                  <span class="font-mono font-bold text-${color}-400 w-8 flex-shrink-0 pt-0.5">${qty}</span>
                  <div>
                    <div class="font-semibold text-slate-200">${name}</div>
                    <div class="text-slate-500 mt-0.5">${desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">OS serveurs virtualisés</div>
              <div class="space-y-1.5">
                ${[
                  ['WinAD1 / WinAD2','Active Directory · WS 2022'],
                  ['WinBackup','PBS + sauvegarde · WS 2022'],
                  ['WinCRM','CRM métier · WS 2022'],
                  ['WinAnalyse','Medoc (HDS) · WS 2016 → 2022 Q4 2026'],
                  ['Winfile','Partage fichiers · WS 2016 → 2022 Q4 2026'],
                ].map(([name, detail]) => `
                  <div class="flex items-center gap-2 text-[10px]">
                    <span class="font-mono text-indigo-300 text-[9px] bg-indigo-500/10 border border-indigo-500/20 rounded px-1.5 py-0.5 whitespace-nowrap">${name}</span>
                    <span class="text-slate-500 truncate">${detail}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Budget siège -->
            <div class="bg-violet-500/8 border border-violet-500/20 rounded-xl p-3">
              <div class="text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-2">Budget infrastructure siège</div>
              <div class="space-y-1">
                ${[
                  ['2× Dell R760 neufs','24 200 €'],
                  ['Migration SSD R730','3 400 €'],
                  ['VNX 5200 disques','2 200 €'],
                  ['Proxmox VE + support','10 400 €'],
                  ['WS 2022 + 250 CAL','16 350 €'],
                  ['VLAN + VPN IPsec','14 120 €'],
                  ['ESET + PBS + OVH + LTO','33 430 €'],
                  ['Wi-Fi U6+ + smartphones','5 680 €'],
                ].map(([label, cost]) => `
                  <div class="flex items-center justify-between text-[10px]">
                    <span class="text-slate-400">${label}</span>
                    <span class="font-mono font-semibold text-violet-300">${cost}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SECTION 2 : LABO TYPE ─────────────────────────────────────────── -->
      <div data-pres-step="3" data-pres-label="Labo Type × 5 (Phase 2026)" class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          <div class="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="text-xs font-bold text-blue-300 uppercase tracking-wider">Labo Type — Phase 2026 (× 5)</span>
          </div>
          <div class="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Fiche site -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Profil du site</span>
                </div>
                <div class="text-[10px] text-slate-500 mt-2">Déployés en 2026 — 1 labo = 1 centre de prélèvement principal</div>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="text-lg font-bold text-blue-300">55 425 €</div>
                <div class="text-[10px] text-slate-500">total 5 labos HT</div>
              </div>
            </div>

            <!-- Localisations -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Localisations</div>
              <div class="flex flex-wrap gap-2">
                ${['Toulouse','Marseille','Nantes','Lyon','Lille'].map(city => `
                  <span class="text-[10px] font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">${city}</span>
                `).join('')}
              </div>
            </div>

            <!-- Métriques -->
            <div class="grid grid-cols-3 gap-2">
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-xl font-bold text-blue-300">17</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Personnes</div>
              </div>
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-xl font-bold text-slate-200">10</div>
                <div class="text-[10px] text-slate-500 mt-0.5">PC fixes</div>
              </div>
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-xl font-bold text-slate-200">2</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Laptops</div>
              </div>
            </div>

            <!-- Équipements détaillés -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Équipements par labo</div>
              <div class="space-y-1.5">
                ${[
                  ['10×','HP ProDesk 400 G9','600 €/u','PC fixe','blue'],
                  ['2×','HP 250 G10','560 €/u','Laptop','blue'],
                  ['1×','FortiGate 40F','450 €/u','Routeur VPN spoke','indigo'],
                  ['1×','Cisco CBS250-24T','420 €/u','Switch 24 ports','slate'],
                  ['1×','Ubiquiti U6+','145 €/u','Borne Wi-Fi 6 PoE','cyan'],
                  ['1×','Ricoh MPC307SPF','1 600 €','Imprimante MFP','gray'],
                  ['—','Câblage + installation','1 350 €/labo','Prestation locale','gray'],
                ].map(([qty, name, price, role, color]) => `
                  <div class="flex items-center gap-2 text-[10px] py-1.5 border-b border-white/5 last:border-0">
                    <span class="font-mono font-bold text-${color}-400 w-7 flex-shrink-0">${qty}</span>
                    <span class="font-semibold text-slate-200 flex-1">${name}</span>
                    <span class="text-slate-600 italic hidden sm:block">${role}</span>
                    <span class="font-mono font-semibold text-slate-400 ml-2">${price}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Connectivité & Sécurité -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Connectivité & Sécurité</span>
            </div>

            <!-- Architecture réseau -->
            <div class="bg-slate-900/60 border border-white/5 rounded-xl p-4">
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-3 font-semibold">Topologie réseau (spoke)</div>
              <!-- Schéma ASCII-style -->
              <div class="font-mono text-[9px] text-center space-y-1 text-slate-400">
                <div class="flex items-center justify-center gap-2">
                  <span class="bg-indigo-500/20 border border-indigo-500/30 rounded px-2 py-1 text-indigo-300">Siège Strasbourg</span>
                  <span class="text-slate-600">━━━━━ VPN IPsec ━━━━━</span>
                  <span class="bg-blue-500/20 border border-blue-500/30 rounded px-2 py-1 text-blue-300">FortiGate 40F</span>
                </div>
                <div class="text-slate-700 text-center">│ AES-256 IKEv2</div>
                <div class="flex items-center justify-center gap-4 mt-1">
                  <span class="bg-slate-800/80 border border-white/10 rounded px-2 py-1">CBS250-24T</span>
                  <span class="text-slate-700">→</span>
                  <span class="bg-slate-800/80 border border-white/10 rounded px-2 py-1">U6+ Wi-Fi 6</span>
                </div>
                <div class="flex items-center justify-center gap-2 mt-1">
                  <span class="bg-slate-800/60 rounded px-1.5 py-0.5 text-emerald-300">VLAN 30 HDS</span>
                  <span class="bg-slate-800/60 rounded px-1.5 py-0.5 text-blue-300">VLAN 20 Admin</span>
                  <span class="bg-slate-800/60 rounded px-1.5 py-0.5 text-amber-300">VLAN 40 Wi-Fi</span>
                </div>
              </div>
            </div>

            <!-- Segmentation VLAN -->
            <div class="bg-slate-900/60 border border-white/5 rounded-xl p-4">
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-3 font-semibold">Segmentation VLAN — ex. Labo S10 (adresse : 10.S.V.0/24)</div>
              <div class="space-y-1.5">
                ${[
                  ['10','Admin / Serveurs','10.10.10.0/24','10.10.10.254','Tunnel VPN → Siège (aucun serveur local)','blue'],
                  ['20','Postes admin','10.10.20.0/24','10.10.20.254','10 PC fixes + 2 laptops HP ProDesk/250','indigo'],
                  ['30','Analyse HDS','10.10.30.0/24','10.10.30.254','ISOLÉ STRICT — VLAN 40 BLOQUÉ, VLAN 20 filtré','emerald'],
                  ['40','Wi-Fi invités','10.10.40.0/24','10.10.40.254','Ubiquiti U6+ · Internet only · BLOQUÉ vers VLAN 30','amber'],
                  ['99','Management','10.10.99.0/24','10.10.99.254','CBS250-24T + FortiGate 40F (hors-bande)','slate'],
                ].map(([id, name, subnet, gw, note, color]) => `
                  <div class="flex items-center gap-2 text-[9px]">
                    <span class="w-10 flex-shrink-0 text-center font-mono font-bold bg-${color}-500/15 border border-${color}-500/25 text-${color}-300 rounded px-1 py-0.5">V${id}</span>
                    <span class="w-28 flex-shrink-0 font-semibold text-slate-300">${name}</span>
                    <span class="w-28 flex-shrink-0 font-mono text-slate-400">${subnet}</span>
                    <span class="w-24 flex-shrink-0 font-mono text-slate-500">gw .254</span>
                    <span class="text-slate-500">${note}</span>
                  </div>
                `).join('')}
              </div>
              <div class="mt-3 flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2 text-[9px] text-emerald-300">
                <svg class="w-3 h-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span><b>Cloisonnement VLAN 30 HDS</b> — ACL FortiGate : VLAN 40 → VLAN 30 <b>DROP</b> · VLAN 20 → VLAN 30 <b>PERMIT flux métier uniquement</b> (SolarWinds, PBS) · toute autre source <b>BLOQUÉE</b></span>
              </div>
            </div>

            <!-- Sécurité -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Protection & Conformité HDS</div>
              <div class="space-y-2">
                ${[
                  ['ESET PROTECT Advanced','EDR · 16 €/poste/an (tarif Healthcare)','emerald'],
                  ['BitLocker laptops','Chiffrement AES-256 obligatoire (itinérance)','blue'],
                  ['VPN IPsec AES-256 IKEv2','FortiGate 40F spoke → Strasbourg hub','indigo'],
                  ['Sauvegarde centralisée','PBS Strasbourg via VPN · copie OVH HDS','violet'],
                  ['Exchange Online Plan 1','Cloud Microsoft HDS · OWA · MFA Authenticator','cyan'],
                ].map(([name, detail, color]) => `
                  <div class="flex items-start gap-2 text-[10px] bg-slate-900/40 rounded-lg p-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-${color}-400 mt-1 flex-shrink-0"></div>
                    <div>
                      <span class="font-semibold text-slate-200">${name}</span>
                      <span class="text-slate-500 ml-1">${detail}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Coût par labo -->
            <div class="bg-blue-500/8 border border-blue-500/20 rounded-xl p-3">
              <div class="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-2">Coût détaillé par labo</div>
              <div class="space-y-1">
                ${[
                  ['10× HP ProDesk 400 G9','6 000 €'],
                  ['2× HP 250 G10','1 120 €'],
                  ['FortiGate 40F','450 €'],
                  ['Cisco CBS250-24T','420 €'],
                  ['Ubiquiti U6+','145 €'],
                  ['Ricoh MPC307SPF','1 600 €'],
                  ['Câblage + installation','1 350 €'],
                ].map(([label, cost]) => `
                  <div class="flex items-center justify-between text-[10px]">
                    <span class="text-slate-400">${label}</span>
                    <span class="font-mono font-semibold text-blue-300">${cost}</span>
                  </div>
                `).join('')}
                <div class="flex items-center justify-between text-[10px] pt-1.5 border-t border-blue-500/20 mt-1.5">
                  <span class="font-bold text-slate-200">TOTAL par labo</span>
                  <span class="font-mono font-bold text-blue-200">≈ 11 085 €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SECTION 3 : CENTRE DE PRÉLÈVEMENT ─────────────────────────────── -->
      <div data-pres-step="4" data-pres-label="Centres de Prélèvement × 15" class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
          <div class="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>
            <span class="text-xs font-bold text-emerald-300 uppercase tracking-wider">Centre de Prélèvement — Phase 2027-2028 (× 15)</span>
          </div>
          <div class="h-px flex-1 bg-gradient-to-l from-emerald-500/50 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Profil -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Profil du site</span>
            </div>

            <div class="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3 text-[10px]">
              <div class="text-emerald-400 font-bold mb-1">Structure standard</div>
              <div class="text-slate-400">3 centres par laboratoire — rattachés au labo de leur région (FortiGate spoke)</div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-emerald-300">11</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Personnes</div>
              </div>
              <div class="bg-slate-900/60 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-slate-200">6</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Devices</div>
              </div>
            </div>

            <!-- Justification structure -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Pourquoi 5 PC + 1 laptop ?</div>
              <div class="space-y-1.5 text-[10px] text-slate-400">
                <div class="flex items-start gap-1.5">
                  <span class="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                  <span>Secrétaires médicales en poste fixe 8h/jour — écran 14" insuffisant</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                  <span>PC fixe pro = 5-6 ans de durée de vie vs 3-4 ans laptop</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                  <span>HDS : moins de contraintes BitLocker/MFA sur postes fixes en site sécurisé</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                  <span>Coût total équivalent : tout-laptop + dock + écran externe = plus cher</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Équipements -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-slate-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Équipements par centre</span>
            </div>

            <div class="space-y-2">
              ${[
                ['5×','HP ProDesk 400 G9','PC fixe · 600 €/u','emerald'],
                ['1×','HP 250 G10','Laptop · 560 €/u','emerald'],
                ['1×','FortiGate 40F','Routeur VPN spoke · 450 €/u','indigo'],
                ['1×','Cisco CBS250-16T','Switch 16 ports · 280 €/u','blue'],
                ['1×','Ubiquiti U6+','Wi-Fi 6 PoE · 145 €/u','cyan'],
                ['—','Câblage + install','Prestation locale · 900 €','gray'],
              ].map(([qty, name, desc, color]) => `
                <div class="flex items-start gap-3 text-[10px] py-2 border-b border-white/5 last:border-0">
                  <span class="font-mono font-bold text-${color}-400 w-7 flex-shrink-0 pt-0.5">${qty}</span>
                  <div class="flex-1">
                    <div class="font-semibold text-slate-200">${name}</div>
                    <div class="text-slate-500 mt-0.5">${desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Comparaison Labo vs Centre -->
            <div class="inner-panel">
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Labo vs Centre — différences clés</div>
              <div class="space-y-1">
                ${[
                  ['Effectifs','17 pers.','11 pers.'],
                  ['PC fixes','10','5'],
                  ['Laptops','2','1'],
                  ['Switch','CBS250-24T','CBS250-16T'],
                  ['Imprimante','Ricoh MFP','—'],
                  ['Coût / site','≈ 11 085 €','≈ 5 335 €'],
                ].map(([label, labo, centre]) => `
                  <div class="grid grid-cols-3 gap-1 text-[9px]">
                    <span class="text-slate-500">${label}</span>
                    <span class="text-blue-300 font-semibold text-center">${labo}</span>
                    <span class="text-emerald-300 font-semibold text-center">${centre}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Budget & déploiement -->
          <div class="glass-panel rounded-2xl p-5 border border-white/8 space-y-4">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Budget & Déploiement</span>
            </div>

            <!-- Budget 15 centres -->
            <div class="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
              <div class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">Budget 15 centres (total)</div>
              <div class="space-y-1">
                ${[
                  ['15× FortiGate 40F','6 750 €'],
                  ['15× Cisco CBS250-16T','4 200 €'],
                  ['15× Ubiquiti U6+','2 175 €'],
                  ['75× HP ProDesk 400 G9','45 000 €'],
                  ['15× HP 250 G10','8 400 €'],
                  ['Câblage + installation','13 500 €'],
                ].map(([label, cost]) => `
                  <div class="flex items-center justify-between text-[10px]">
                    <span class="text-slate-400">${label}</span>
                    <span class="font-mono font-semibold text-emerald-300">${cost}</span>
                  </div>
                `).join('')}
                <div class="flex items-center justify-between text-[10px] pt-1.5 border-t border-emerald-500/20 mt-1.5">
                  <span class="font-bold text-slate-200">TOTAL 15 centres</span>
                  <span class="font-mono font-bold text-emerald-200">80 025 €</span>
                </div>
              </div>
            </div>

            <!-- Planning déploiement -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Planning déploiement</div>
              <div class="space-y-2">
                <div class="flex items-start gap-3">
                  <div class="w-14 flex-shrink-0 text-[9px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded px-1.5 py-0.5 text-center mt-0.5">2027</div>
                  <div class="text-[10px] text-slate-400">Lot 1 — 8 centres de prélèvement · remplacement switchs SG350XG-24 (Phase 2)</div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-14 flex-shrink-0 text-[9px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5 text-center mt-0.5">2028</div>
                  <div class="text-[10px] text-slate-400">Lot 2 — 7 centres · parc cible atteint : 27 sites · 380 utilisateurs</div>
                </div>
              </div>
            </div>

            <!-- Connectivité -->
            <div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">Connectivité hub-and-spoke</div>
              <div class="space-y-1.5 text-[10px] text-slate-400">
                <div class="flex items-start gap-1.5">
                  <span class="text-indigo-400 mt-0.5 flex-shrink-0">→</span>
                  <span>VPN IPsec AES-256 IKEv2 vers Strasbourg (hub)</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-indigo-400 mt-0.5 flex-shrink-0">→</span>
                  <span>27 spokes au plateau (5 labos + 22 centres dont 15 nouveaux)</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-emerald-400 mt-0.5 flex-shrink-0">OK</span>
                  <span>Sauvegarde centralisée PBS Strasbourg via tunnel chiffré</span>
                </div>
              </div>
            </div>

            <!-- Segmentation VLAN Centre -->
            <div class="bg-slate-900/60 border border-white/5 rounded-xl p-4">
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mb-3 font-semibold">Segmentation VLAN — ex. Centre S20 (adresse : 10.S.V.0/24)</div>
              <div class="space-y-1.5">
                ${[
                  ['10','Admin / Serveurs','—','Via VPN hub','Routé vers Siège uniquement (pas de serveurs locaux)','blue'],
                  ['20','Postes admin','10.20.20.0/24','10.20.20.254','5 PC fixes + 1 laptop','indigo'],
                  ['30','Analyse HDS','10.20.30.0/24','10.20.30.254','ISOLÉ STRICT — VLAN 40 BLOQUÉ, VLAN 20 filtré','emerald'],
                  ['40','Wi-Fi invités','10.20.40.0/24','10.20.40.254','Ubiquiti U6+ · Internet only · BLOQUÉ vers VLAN 30','amber'],
                  ['99','Management','10.20.99.0/24','10.20.99.254','CBS250-16T + FortiGate 40F (hors-bande)','slate'],
                ].map(([id, name, subnet, gw, note, color]) => `
                  <div class="flex items-center gap-2 text-[9px]">
                    <span class="w-10 flex-shrink-0 text-center font-mono font-bold bg-${color}-500/15 border border-${color}-500/25 text-${color}-300 rounded px-1 py-0.5">V${id}</span>
                    <span class="w-28 flex-shrink-0 font-semibold text-slate-300">${name}</span>
                    <span class="w-28 flex-shrink-0 font-mono text-slate-400">${subnet}</span>
                    <span class="w-24 flex-shrink-0 font-mono text-slate-500">${gw}</span>
                    <span class="text-slate-500">${note}</span>
                  </div>
                `).join('')}
              </div>
              <div class="mt-3 flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-2 text-[9px] text-emerald-300">
                <svg class="w-3 h-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span><b>Cloisonnement VLAN 30 HDS</b> — ACL FortiGate : VLAN 40 → VLAN 30 <b>DROP</b> · VLAN 20 → VLAN 30 <b>PERMIT flux métier uniquement</b> · VLAN 10 routé via VPN (aucun serveur local)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── RÉCAPITULATIF GLOBAL ─────────────────────────────────────────── -->
      <div data-pres-step="4" class="glass-panel rounded-2xl p-6 border border-white/8">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-7 h-7 rounded-lg bg-slate-500/20 flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Récapitulatif — Parc matériel à la cible (2028)</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-[10px]">
            <thead>
              <tr class="border-b border-white/10">
                <th class="text-left py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">Type de site</th>
                <th class="text-center py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">Qté</th>
                <th class="text-center py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">Utilisateurs</th>
                <th class="text-center py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">PC fixes</th>
                <th class="text-center py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">Laptops</th>
                <th class="text-center py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">Routeur VPN</th>
                <th class="text-center py-2 px-3 text-slate-500 font-semibold uppercase tracking-wider">Coût HT</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                    <span class="font-semibold text-slate-200">Siège Strasbourg DG</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-300">1</td>
                <td class="py-2.5 px-3 text-center font-mono text-violet-300">64</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-400">40 (Z440)</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-400">—</td>
                <td class="py-2.5 px-3 text-center text-slate-400">Hub Proxmox HA</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-violet-300">infra cœur</td>
              </tr>
              <tr class="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                    <span class="font-semibold text-slate-200">Sites existants (hors siège)</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-300">6</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-300">66</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-400">36</td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-400">—</td>
                <td class="py-2.5 px-3 text-center text-slate-400">FortiGate (existant)</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-slate-400">—</td>
              </tr>
              <tr class="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span class="font-semibold text-slate-200">Laboratoires (Phase 2026)</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-300">5</td>
                <td class="py-2.5 px-3 text-center font-mono text-blue-300">85</td>
                <td class="py-2.5 px-3 text-center font-mono text-blue-300">50</td>
                <td class="py-2.5 px-3 text-center font-mono text-blue-300">10</td>
                <td class="py-2.5 px-3 text-center text-blue-300">FortiGate 40F × 5</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-blue-300">55 425 €</td>
              </tr>
              <tr class="hover:bg-white/2 transition-colors">
                <td class="py-2.5 px-3">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    <span class="font-semibold text-slate-200">Centres de prélèvement (Phase 2027-28)</span>
                  </div>
                </td>
                <td class="py-2.5 px-3 text-center font-mono text-slate-300">15</td>
                <td class="py-2.5 px-3 text-center font-mono text-emerald-300">165</td>
                <td class="py-2.5 px-3 text-center font-mono text-emerald-300">75</td>
                <td class="py-2.5 px-3 text-center font-mono text-emerald-300">15</td>
                <td class="py-2.5 px-3 text-center text-emerald-300">FortiGate 40F × 15</td>
                <td class="py-2.5 px-3 text-center font-mono font-bold text-emerald-300">80 025 €</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t border-white/10 bg-slate-900/40">
                <td class="py-3 px-3 font-bold text-slate-200">TOTAL PROJET</td>
                <td class="py-3 px-3 text-center font-mono font-bold text-white">27</td>
                <td class="py-3 px-3 text-center font-mono font-bold text-white">380</td>
                <td class="py-3 px-3 text-center font-mono font-bold text-white">126+</td>
                <td class="py-3 px-3 text-center font-mono font-bold text-white">25</td>
                <td class="py-3 px-3 text-center font-bold text-indigo-300">20 spokes VPN</td>
                <td class="py-3 px-3 text-center font-mono font-bold text-indigo-300">135 450 €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  `;
}
