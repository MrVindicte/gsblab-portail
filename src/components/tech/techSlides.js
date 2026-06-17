// ══════════════════════════════════════════════════════════════════════════════
// techSlides.js — Slides de présentation (avec animations SVG de SKZ)
// ══════════════════════════════════════════════════════════════════════════════

export function buildPresHTML(state) {
  // Ressources du cluster Proxmox (utilisées par presSlide8 — slide 26)
  const totalCores = state.serversCount * 2 * 16, totalRam = state.serversCount * 128;
  const allocatedCores = 16, allocatedRam = 36;
  const pctCores = Math.round((allocatedCores / totalCores) * 100);
  const pctRam   = Math.round((allocatedRam   / totalRam)   * 100);

  const presSlide1 = `
    <div data-pres-slide="1,2,3,4,5,6,7,8" data-pres-label="Cartographie SD-WAN — France" class="flex-1 min-h-0 w-full h-full" id="eraState" data-era="avant">
      <style>
        /* Era-aware background shift */
        #eraState{transition:background 0.9s ease}
        #eraState[data-era="avant"]{background:radial-gradient(ellipse at 75% 20%,rgba(239,68,68,0.05) 0%,transparent 55%)}
        #eraState[data-era="apres"]{background:radial-gradient(ellipse at 25% 80%,rgba(99,102,241,0.07) 0%,transparent 55%)}
        /* Map styles */
        .fmap-shape{fill:#0f1e3d;stroke:#6366f1;stroke-width:2.5;stroke-linejoin:round;filter:drop-shadow(0 0 22px rgba(99,102,241,.35))}
        .fmap-corse{fill:#0d1420;stroke:#475569;stroke-width:1.3;stroke-linejoin:round;opacity:.7}
        .fmap-sealabel{font-family:monospace;font-size:10px;fill:#334155;letter-spacing:.2em;text-transform:uppercase}
        .fmap-link{fill:none;stroke-linecap:round;transition:opacity .5s}
        .fmap-link.legacy{stroke:#f87171;stroke-width:1.7;stroke-dasharray:3 7;opacity:.8}
        .fmap-link.sdwan{stroke:#6366f1;stroke-width:1.8;stroke-dasharray:7 9;animation:fmapFlow 1.1s linear infinite}
        .fmap-link.sdwan.to-centre{stroke:#818cf8;stroke-width:1.3;stroke-dasharray:5 9;opacity:.75}
        .fmap-link.backup{stroke:#10b981;stroke-width:1.6;stroke-dasharray:2 6;animation:fmapFlow 1.6s linear infinite}
        @keyframes fmapFlow{to{stroke-dashoffset:-16}}
        .fmap-site circle,.fmap-site rect{transition:filter .2s}
        .fmap-site:hover circle,.fmap-site:hover rect{filter:brightness(1.2) drop-shadow(0 0 8px rgba(99,102,241,.7))}
        .fmap-halo{animation:fmapHalo 2.7s ease-out infinite;transform-origin:center;transform-box:fill-box}
        @keyframes fmapHalo{0%{opacity:.5;transform:scale(.6)}70%{opacity:0;transform:scale(2.1)}100%{opacity:0}}
        .fmap-label{font-family:'Inter',sans-serif;font-weight:600;font-size:10.5px;fill:#94a3b8;pointer-events:none}
        .fmap-label.major{font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;fill:#c7d2fe}
        #fmap-ovh{transition:opacity .55s}
        [data-era="avant"] .only-apres{opacity:0!important;pointer-events:none!important}
        [data-era="apres"] .only-avant{opacity:0!important;pointer-events:none!important}
        /* Scanline grid on map */
        .fmap-grid{background-image:linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px);background-size:28px 28px}
        /* Map glow bg shifts with era */
        .fmap-glow-bg{transition:background 0.9s ease;pointer-events:none}
        #eraState[data-era="avant"] .fmap-glow-bg{background:radial-gradient(ellipse at 80% 30%,rgba(239,68,68,0.09) 0%,transparent 55%)}
        #eraState[data-era="apres"] .fmap-glow-bg{background:radial-gradient(ellipse at 80% 30%,rgba(99,102,241,0.14) 0%,transparent 55%)}
        /* Toggle glow shifts */
        #eraToggle{transition:box-shadow 0.6s ease,border-color 0.6s ease}
        #eraState[data-era="avant"] #eraToggle{box-shadow:0 0 22px rgba(239,68,68,0.18);border-color:rgba(239,68,68,0.25)!important}
        #eraState[data-era="apres"] #eraToggle{box-shadow:0 0 22px rgba(99,102,241,0.28);border-color:rgba(99,102,241,0.3)!important}
        /* KPI cards highlight */
        .fmap-kpi{transition:all 0.5s ease}
        #eraState[data-era="avant"] #kpiSitesCard{border-color:rgba(239,68,68,0.25);background:rgba(239,68,68,0.04)}
        #eraState[data-era="apres"] #kpiSitesCard{border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.05)}
        #eraState[data-era="apres"] #kpiVlanCard{border-color:rgba(52,211,153,0.25);background:rgba(52,211,153,0.04)}
        /* Hub pulse rings */
        @keyframes hubRing{0%{r:16;opacity:.55}100%{r:46;opacity:0}}
        .hub-ring-a{animation:hubRing 2.6s ease-out infinite}
        .hub-ring-b{animation:hubRing 2.6s ease-out .85s infinite}
        .hub-ring-c{animation:hubRing 2.6s ease-out 1.7s infinite}
        /* Era label transition */
        #fmapEraLabel{transition:color 0.5s ease,background 0.5s ease,border-color 0.5s ease}
      </style>

      <div class="max-w-6xl w-full mx-auto px-4 py-3 h-full flex flex-col gap-3">

        <!-- ── Header ── -->
        <div class="flex flex-col items-center text-center shrink-0 gap-1">
          <div class="text-[9px] font-mono tracking-[0.3em] uppercase text-indigo-400/70">Évolution réseau · GSBLAB 2026 → 2030</div>
          <h2 class="text-[2rem] font-extrabold leading-tight tracking-tight" style="background:linear-gradient(135deg,#f1f5f9 0%,#c7d2fe 45%,#34d399 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Cartographie nationale SD-WAN</h2>
          <div class="w-20 h-0.5 rounded-full" style="background:linear-gradient(90deg,#6366f1,#8b5cf6,#10b981)"></div>
        </div>

        <!-- ── KPI Strip (always visible after reveal 1) ── -->
        <div class="grid grid-cols-4 gap-3 shrink-0 opacity-0 transition-all duration-700" data-reveal-at="1">
          <div id="kpiSitesCard" class="fmap-kpi glass-panel rounded-xl p-3 text-center border border-red-500/20" style="background:rgba(239,68,68,0.04)">
            <div class="text-[1.6rem] font-extrabold font-mono leading-none" id="kSites" style="color:#818cf8">7</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Sites actifs</div>
          </div>
          <div class="fmap-kpi glass-panel rounded-xl p-3 text-center border border-white/5">
            <div class="text-[1.6rem] font-extrabold font-mono leading-none text-slate-200" id="kPostes">260</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Postes</div>
          </div>
          <div class="fmap-kpi glass-panel rounded-xl p-3 text-center border border-white/5">
            <div class="text-[1.6rem] font-extrabold font-mono leading-none text-slate-200" id="kUsers">333</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Utilisateurs</div>
          </div>
          <div id="kpiVlanCard" class="fmap-kpi glass-panel rounded-xl p-3 text-center border border-white/5 transition-all duration-500" id="kpiVlan">
            <div class="text-[1.6rem] font-extrabold font-mono leading-none text-red-400" id="kVlan">0</div>
            <div class="text-[9px] uppercase tracking-wider text-slate-400 mt-1" id="kVlanL">VLANs</div>
          </div>
        </div>

        <!-- ── Main Split ── -->
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-4 min-h-0 opacity-0 transition-all duration-700" data-reveal-at="1">

          <!-- Left : France Map -->
          <div class="glass-panel rounded-2xl relative overflow-hidden flex flex-col fmap-grid">
            <!-- Glow overlay -->
            <div class="fmap-glow-bg absolute inset-0 pointer-events-none z-0"></div>

            <!-- Era Toggle (floating top-right) -->
            <div class="absolute top-3 right-3 z-20">
              <div id="eraToggle" class="relative inline-flex bg-slate-950/90 backdrop-blur-md border rounded-xl p-1 shadow-2xl" style="border-color:rgba(239,68,68,0.25)">
                <div id="eraPill" class="absolute inset-y-1 rounded-lg transition-all duration-500 bg-red-500/15 border border-red-500/30 pointer-events-none" style="width:calc(50% - 4px);left:4px"></div>
                <button class="relative z-10 px-4 py-2 rounded-lg text-center min-w-[120px] transition-colors duration-200" data-era-btn="avant">
                  <div class="text-xs font-bold text-orange-400">⚠ 2026 — Existant</div>
                </button>
                <button class="relative z-10 px-4 py-2 rounded-lg text-center min-w-[120px] transition-colors duration-200" data-era-btn="apres">
                  <div class="text-xs font-bold text-slate-400" id="eraBtnApresLabel">✦ 2030 — Cible SD-WAN</div>
                </button>
              </div>
            </div>

            <!-- Era badge (floating top-left) -->
            <div class="absolute top-3.5 left-3.5 z-10">
              <div id="fmapEraLabel" class="text-[10px] font-bold px-3 py-1.5 rounded-lg border shadow-lg backdrop-blur-sm" style="color:rgb(251,146,60);background:rgba(120,53,15,0.35);border-color:rgba(239,68,68,0.3)">
                2026 — Avant migration
              </div>
            </div>

            <!-- SVG Map -->
            <div class="flex-1 w-full flex items-center justify-center p-3 relative z-10">
              <svg viewBox="0 0 600 600" id="franceMap" class="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <text class="fmap-sealabel" x="34" y="340" transform="rotate(-90 34 340)">Océan Atlantique</text>
                <text class="fmap-sealabel" x="340" y="565">Mer Méditerranée</text>
                <path class="fmap-shape" d="M284,49 L304,45 L331,72 L394,105 L435,126 L512,176 L495,222 L448,302 L479,318 L468,372 L502,431 L442,467 L420,462 L387,452 L331,500 L271,500 L145,453 L167,388 L167,305 L128,260 L93,233 L28,185 L59,169 L136,172 L140,116 L151,119 L171,137 L217,127 L255,104 Z"/>
                <path class="fmap-corse" d="M552,480 L566,471 L574,498 L567,545 L553,540 L549,506 Z"/>
                <!-- Strasbourg hub pulse rings (après only) -->
                <circle class="only-apres hub-ring-a" cx="500" cy="180" fill="none" stroke="#6366f1" stroke-width="1.4" r="16" opacity="0"/>
                <circle class="only-apres hub-ring-b" cx="500" cy="180" fill="none" stroke="#818cf8" stroke-width="1" r="16" opacity="0"/>
                <circle class="only-apres hub-ring-c" cx="500" cy="180" fill="none" stroke="#a5b4fc" stroke-width="0.7" r="16" opacity="0"/>
                <g id="fmap-ovh" class="only-apres" style="opacity:1">
                  <path d="M300,34 a9,9 0 0 1 9,-8 a11,9 0 0 1 21,1 a8,8 0 0 1 2,15 l-28,0 a8,8 0 0 1 -4,-8 Z" fill="#0a2020" stroke="#10b981" stroke-width="1.5"/>
                  <text x="338" y="28" class="fmap-label" style="fill:#34d399;font-weight:700;font-size:10px">OVHcloud Cold Archive HDS</text>
                </g>
                <g id="fmapLinks"></g>
                <g id="fmapSites"></g>
              </svg>
            </div>

            <!-- Legend bar -->
            <div class="relative z-10 flex flex-wrap justify-center gap-x-3 gap-y-1 pb-2 pt-1.5 border-t border-white/5 text-[8px] uppercase tracking-widest text-slate-500 bg-slate-900/60 shrink-0">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-sm bg-indigo-500 transform rotate-45 shrink-0 shadow-[0_0_5px_rgba(99,102,241,0.6)]"></span>Siège</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>Laboratoire</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#0d1117] border border-indigo-400 shrink-0"></span>Prélèvement</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-slate-600 shrink-0"></span>Historique</span>
              <span class="flex items-center gap-1"><span class="w-3.5 border-t border-dashed border-red-400 shrink-0"></span>VPN</span>
              <span class="flex items-center gap-1"><span class="w-3.5 border-t border-dashed border-indigo-500 shrink-0"></span>SD-WAN</span>
              <span class="flex items-center gap-1"><span class="w-3.5 border-t border-dashed border-emerald-400 shrink-0"></span>Backup</span>
            </div>
          </div>

          <!-- Right : Context Panel -->
          <div class="glass-panel rounded-2xl flex flex-col h-full overflow-hidden">
            <div class="p-4 flex-1 flex flex-col gap-3 overflow-hidden">

              <!-- Avant Panel -->
              <div id="fmapPanelAvant" class="flex flex-col gap-2.5 flex-1">
                <div class="flex items-center justify-between shrink-0">
                  <h4 class="text-[12px] font-bold text-orange-400 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_6px_rgba(251,146,60,0.7)]"></span>
                    Audit 2026 — Dette technique
                  </h4>
                  <span class="text-[8.5px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 rounded px-1.5 py-0.5">NON-CONFORME HDS</span>
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <div class="bg-orange-950/25 border border-orange-500/20 rounded-xl p-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-orange-500/12 flex items-center justify-center shrink-0 border border-orange-500/20">
                      <svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">Réseau à plat — <span class="text-red-400">0 VLAN</span></div><div class="text-[10px] text-slate-400 leading-snug">Trafic médical non isolé du reste du SI.</div></div>
                  </div>
                  <div class="bg-slate-800/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="2">
                    <div class="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">Matériel EoSL</div><div class="text-[10px] text-slate-400 leading-snug">Cisco SF200, Wi-Fi 4 — <span class="text-orange-300">CVE non patchables</span>.</div></div>
                  </div>
                  <div class="bg-slate-800/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="3">
                    <div class="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">Serveurs obsolètes</div><div class="text-[10px] text-slate-400 leading-snug">VMware ESXi 6, Exchange 2013 — exploitables.</div></div>
                  </div>
                  <div class="bg-slate-800/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="4">
                    <div class="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">Tunnels VPN artisanaux</div><div class="text-[10px] text-slate-400 leading-snug">Routage manuel, aucune supervision centralisée.</div></div>
                  </div>
                </div>
              </div>

              <!-- Après Panel -->
              <div id="fmapPanelApres" class="flex flex-col gap-2.5 flex-1 hidden">
                <div class="flex items-center justify-between shrink-0">
                  <h4 class="text-[12px] font-bold text-emerald-400 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                    Cible 2030 — Socle sécurisé
                  </h4>
                  <span class="text-[8.5px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-1.5 py-0.5">CERTIFIÉ HDS</span>
                </div>
                <div class="flex flex-col gap-2 flex-1">
                  <div class="bg-emerald-950/25 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="5">
                    <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">SD-WAN — <span class="text-indigo-300">26 tunnels</span></div><div class="text-[10px] text-slate-400 leading-snug">IPsec auto-orchestrés, monitoring Zabbix centralisé.</div></div>
                  </div>
                  <div class="bg-slate-800/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="6">
                    <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">5 VLANs/site — <span class="text-emerald-300">HDS isolé</span></div><div class="text-[10px] text-slate-400 leading-snug">VLAN 30 médical strictement compartimenté.</div></div>
                  </div>
                  <div class="bg-slate-800/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="7">
                    <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">Parc 100% UniFi — 0 licence</div><div class="text-[10px] text-slate-400 leading-snug">UCG-Ultra, AP Wi-Fi 6, Switches PoE gérés.</div></div>
                  </div>
                  <div class="bg-slate-800/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 opacity-0 transition-all duration-700" data-reveal-at="8">
                    <div class="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                      <svg class="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>
                    </div>
                    <div><div class="text-[11px] font-bold text-slate-100">Backup 3-2-1-1-0 · OVHcloud HDS</div><div class="text-[10px] text-slate-400 leading-snug">Cold Archive — données chiffrées externalisées.</div></div>
                  </div>
                </div>
                <div class="flex justify-between items-center text-[9.5px] shrink-0 pt-2 border-t border-white/5 opacity-0 transition-all duration-700" data-reveal-at="8">
                  <span class="text-slate-400">Budget matériel réseau complet</span>
                  <span class="font-mono text-emerald-400 font-bold bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/15">398 733 € HT</span>
                </div>
              </div>

              <!-- ── Roadmap timeline (always visible once revealed) ── -->
              <div class="shrink-0 pt-2.5 border-t border-white/5">
                <div class="text-[8px] font-mono tracking-[0.2em] uppercase text-slate-600 mb-2">Roadmap déploiement</div>
                <div class="flex items-start gap-0">
                  <div class="flex flex-col items-center flex-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.7)] mb-1"></div>
                    <div class="text-[9px] font-extrabold text-orange-400">2026</div>
                    <div class="text-[8px] text-slate-500 text-center leading-tight mt-0.5">Siège<br>+ 5 labos</div>
                  </div>
                  <div class="flex-1 h-px mt-1.5" style="background:linear-gradient(90deg,rgba(251,146,60,0.4),rgba(99,102,241,0.3))"></div>
                  <div class="flex flex-col items-center flex-1">
                    <div class="w-2 h-2 rounded-full bg-indigo-400/55 mb-1"></div>
                    <div class="text-[9px] font-bold text-indigo-400/55">2027</div>
                    <div class="text-[8px] text-slate-600 text-center leading-tight mt-0.5">15<br>centres</div>
                  </div>
                  <div class="flex-1 h-px mt-1.5" style="background:linear-gradient(90deg,rgba(99,102,241,0.3),rgba(99,102,241,0.2))"></div>
                  <div class="flex flex-col items-center flex-1">
                    <div class="w-2 h-2 rounded-full bg-indigo-400/35 mb-1"></div>
                    <div class="text-[9px] font-bold text-indigo-400/35">2028</div>
                    <div class="text-[8px] text-slate-600 text-center leading-tight mt-0.5">+ 6<br>sites</div>
                  </div>
                  <div class="flex-1 h-px mt-1.5" style="background:linear-gradient(90deg,rgba(99,102,241,0.2),rgba(52,211,153,0.5))"></div>
                  <div class="flex flex-col items-center flex-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] mb-1"></div>
                    <div class="text-[9px] font-extrabold text-emerald-400">2030</div>
                    <div class="text-[8px] text-emerald-300 font-bold text-center leading-tight mt-0.5">27 sites<br>complets</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div id="sdwanTip" class="fixed z-[200] pointer-events-none opacity-0 transition-opacity duration-150 bg-[#0d0e13]/95 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-sm max-w-[220px]"></div>
    </div>
  `;
  const presSlide2 = `
    <div data-pres-slide="9,10,11,12,13,14,15,16,17,18,19,20" data-pres-label="Focus Siège — Strasbourg" class="flex-1 min-h-0 overflow-y-auto w-full">
      <div class="max-w-6xl mx-auto px-4 py-6 space-y-5">
        <div class="text-center space-y-2">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Étape 02 — GSBLAB-STR-DC · site 02</p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Siège de Strasbourg — hub SD-WAN</h2>
          <div class="w-14 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 mx-auto rounded-full"></div>
          <p class="text-slate-400 text-sm max-w-2xl mx-auto">Concentrateur de l'ensemble des <b class="text-slate-200">26 tunnels SD-WAN</b>. Les données de santé restent on-premise ; le VLAN 30 est strictement isolé sur chaque site.</p>
        </div>

        <!-- Chain + fiche réseau (reveal progressively) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          
          <!-- Schéma réseau -->
          <div class="glass-panel rounded-xl p-6 opacity-0 transition-all duration-700" data-reveal-at="9">
            <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
              <span class="w-2 h-2 rounded-sm bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
              Schéma réseau du siège
            </h3>
            
            <div class="flex flex-col gap-1.5">
              <!-- Étape 1 : WAN -->
              <div class="grid grid-cols-2 gap-3 opacity-0 transition-all duration-700" data-reveal-at="10">
                <div class="bg-slate-800/50 hover:bg-slate-800 transition-colors border border-white/10 rounded-xl p-3.5">
                  <div class="text-sm font-bold text-slate-200">WAN principal</div>
                  <div class="text-xs text-slate-400 mt-1">FTTO 1 Gb/s — Opérateur</div>
                </div>
                <div class="bg-slate-800/50 hover:bg-slate-800 transition-colors border border-white/10 rounded-xl p-3.5">
                  <div class="text-sm font-bold text-slate-200">WAN secours</div>
                  <div class="text-xs text-slate-400 mt-1">FTTH — Failover auto</div>
                </div>
              </div>
              
              <div class="flex flex-col items-center py-1 opacity-0 transition-all duration-700" data-reveal-at="10">
                <div class="text-[10px] font-mono text-indigo-400/80 tracking-wider uppercase bg-indigo-950/30 px-2 py-0.5 rounded border border-indigo-500/10">Dual-WAN · OPEX hors projet</div>
                <div class="w-px h-5 bg-indigo-500/40 border-l-2 border-dashed border-indigo-500/50 mt-1"></div>
              </div>
              
              <!-- Étape 2 : UCG -->
              <div class="grid grid-cols-2 gap-3 opacity-0 transition-all duration-700" data-reveal-at="11">
                <div class="bg-indigo-950/30 hover:bg-indigo-950/50 transition-colors border border-indigo-500/40 rounded-xl p-3.5 relative overflow-hidden group">
                  <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div class="flex justify-between items-start mb-1">
                    <div class="text-sm font-bold text-slate-200">UCG-Ultra n°1</div>
                    <span class="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded px-1.5 py-0.5 font-mono">SD-WAN HUB</span>
                  </div>
                  <div class="text-[11px] text-slate-400 leading-snug">Firewall · routage inter-VLAN · 26 tunnels IPsec</div>
                </div>
                <div class="bg-slate-900/40 border border-indigo-500/20 rounded-xl p-3.5">
                  <div class="flex justify-between items-start mb-1">
                    <div class="text-sm font-bold text-slate-200">UCG-Ultra n°2</div>
                    <span class="text-[9px] bg-slate-800 text-slate-400 border border-white/10 rounded px-1.5 py-0.5 font-mono">STANDBY</span>
                  </div>
                  <div class="text-[11px] text-slate-400 leading-snug">Redondance passerelle HA</div>
                </div>
              </div>
              
              <div class="flex flex-col items-center py-1 opacity-0 transition-all duration-700" data-reveal-at="12">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 tracking-wider bg-emerald-950/30 border border-emerald-500/20 rounded-full px-3 py-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  IPsec AES-256 + IKEv2 · Magic Site-to-Site
                </div>
                <div class="w-px h-5 bg-slate-600 mt-1"></div>
              </div>
              
              <!-- Étape 3 : Switches -->
              <div class="bg-slate-900/60 hover:bg-slate-800/80 transition-colors border border-indigo-400/30 rounded-xl p-4 opacity-0 transition-all duration-700" data-reveal-at="12">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                  </div>
                  <div>
                    <div class="text-sm font-bold text-slate-200">5× Ubiquiti USW-24</div>
                    <div class="text-xs text-slate-400 mt-0.5">L2 manageable · 802.1Q · PoE · 10 GbE vers serveurs</div>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col items-center py-1 opacity-0 transition-all duration-700" data-reveal-at="13">
                <div class="w-px h-5 bg-slate-700"></div>
              </div>
              
              <!-- Étape 4 : Wi-Fi -->
              <div class="bg-emerald-950/20 hover:bg-emerald-950/40 transition-colors border border-emerald-500/30 rounded-xl p-4 opacity-0 transition-all duration-700" data-reveal-at="13">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>
                  </div>
                  <div>
                    <div class="text-sm font-bold text-slate-200">3× Ubiquiti U6+ — Wi-Fi 6</div>
                    <div class="text-xs text-slate-400 mt-0.5">SSID GSBLAB → <span class="text-indigo-300 font-mono text-[10px]">VLAN 20</span> · SSID Invités → <span class="text-orange-300 font-mono text-[10px]">VLAN 40</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Fiche réseau -->
          <div class="glass-panel rounded-xl p-6 opacity-0 transition-all duration-700 flex flex-col" data-reveal-at="14">
            <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
              <span class="w-2 h-2 rounded-sm bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
              Fiche réseau
            </h3>
            
            <div class="flex-1 flex flex-col gap-3">
              <div class="bg-slate-800/30 border border-white/5 rounded-lg p-3.5 flex justify-between items-center opacity-0 transition-all duration-700" data-reveal-at="15">
                <div class="text-xs text-slate-500 font-medium">Identifiant site</div>
                <div class="text-sm font-mono text-slate-200 font-bold">GSBLAB-STR-DC</div>
              </div>
              
              <div class="bg-slate-800/30 border border-white/5 rounded-lg p-3.5 flex justify-between items-center opacity-0 transition-all duration-700" data-reveal-at="16">
                <div class="text-xs text-slate-500 font-medium">Rôle SD-WAN</div>
                <div class="text-xs text-indigo-300 font-semibold bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">Hub concentrateur — 26 tunnels</div>
              </div>
              
              <div class="bg-slate-800/30 border border-white/5 rounded-lg p-3.5 flex justify-between items-center opacity-0 transition-all duration-700" data-reveal-at="17">
                <div class="text-xs text-slate-500 font-medium">Passerelles</div>
                <div class="text-xs text-slate-300 text-right">2× UCG-Ultra (HA) <br/> <span class="text-slate-500 text-[10px]">Dual-WAN failover</span></div>
              </div>
              
              <div class="bg-slate-800/30 border border-white/5 rounded-lg p-3.5 flex justify-between items-center opacity-0 transition-all duration-700" data-reveal-at="18">
                <div class="text-xs text-slate-500 font-medium">Switches &amp; Wi-Fi</div>
                <div class="text-xs text-slate-300 text-right">5× USW-24 <br/> 3× U6+ (Wi-Fi 6)</div>
              </div>
              
              <div class="bg-slate-800/30 border border-white/5 rounded-lg p-3.5 flex justify-between items-center opacity-0 transition-all duration-700" data-reveal-at="19">
                <div class="text-xs text-slate-500 font-medium">VLANs déployés</div>
                <div class="flex gap-1.5">
                  <span class="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px] border border-blue-500/20">10</span>
                  <span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[10px] border border-indigo-500/20">20</span>
                  <span class="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20 shadow-[0_0_5px_rgba(16,185,129,0.2)]">30</span>
                  <span class="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono text-[10px] border border-orange-500/20">40</span>
                  <span class="px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 font-mono text-[10px] border border-slate-500/20">99</span>
                </div>
              </div>
              
              <div class="bg-slate-800/30 border border-white/5 rounded-lg p-3.5 flex justify-between items-center mt-auto opacity-0 transition-all duration-700" data-reveal-at="20">
                <div class="text-xs text-slate-500 font-medium">Capacité estimée</div>
                <div class="text-xs text-slate-300 font-medium flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  56 postes
                  <span class="w-1 h-1 rounded-full bg-slate-600 mx-0.5"></span>
                  <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  15 smt
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
  const presSlide3 = `
    <div data-pres-slide="21,22,23" data-pres-label="Schéma réseau Siège" class="flex-1 min-h-0 overflow-y-auto w-full h-full">
      <div class="max-w-6xl mx-auto px-4 py-5 space-y-4">
        <div class="text-center space-y-2">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Siège — GSBLAB-STR-DC · site 02</p>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Schéma réseau détaillé — Strasbourg</h2>
          <div class="w-14 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 mx-auto rounded-full"></div>
        </div>
        <div class="glass-panel rounded-xl p-5 opacity-0 transition-all duration-700" data-reveal-at="22">
          <svg class="pres-schema-svg" viewBox="0 0 680 530" role="img" preserveAspectRatio="xMidYMid meet"><title>Schéma réseau du siège GSBLAB</title><defs>
  <marker id="arsg2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>
<g class="svg-g1">
  <rect x="96" y="14" width="160" height="44" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="176" y="27" text-anchor="middle" dominant-baseline="central">WAN principal</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="176" y="45" text-anchor="middle" dominant-baseline="central">FTTO 1 Gb/s — opérateur</text>
  <rect x="424" y="14" width="160" height="44" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="504" y="27" text-anchor="middle" dominant-baseline="central">WAN secours</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="504" y="45" text-anchor="middle" dominant-baseline="central">FTTH — failover auto</text>
  <line x1="176" y1="58" x2="230" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arsg2)" fill="none"/>
  <line x1="504" y1="58" x2="450" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arsg2)" fill="none"/>
</g>
<g class="svg-g2">
  <rect x="150" y="100" width="160" height="54" rx="8" fill="#0c1e36" stroke="#6366f1" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="230" y="118" text-anchor="middle" dominant-baseline="central">UCG-Ultra n°1</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="230" y="136" text-anchor="middle" dominant-baseline="central">SD-WAN hub · firewall</text>
  <rect x="370" y="100" width="160" height="54" rx="8" fill="#0c1e36" stroke="#6366f1" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="450" y="118" text-anchor="middle" dominant-baseline="central">UCG-Ultra n°2</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="450" y="136" text-anchor="middle" dominant-baseline="central">Standby HA</text>
  <line x1="310" y1="127" x2="370" y2="127" stroke="#6366f1" stroke-width="1.2" stroke-dasharray="4 3" fill="none"/>
  <text font-family="monospace" font-size="10" fill="#6366f1" x="340" y="121" text-anchor="middle" dominant-baseline="central">HA</text>
</g>
<g class="svg-g3">
  <rect x="260" y="156" width="160" height="22" rx="6" fill="#0a1f15" stroke="#059669" stroke-width="0.5"/>
  <text font-family="monospace" font-size="10" font-weight="600" fill="#34d399" x="340" y="168" text-anchor="middle" dominant-baseline="central">IPsec AES-256 · IKEv2</text>
  <line x1="230" y1="154" x2="295" y2="196" stroke="#334155" stroke-width="1.2" marker-end="url(#arsg2)" fill="none"/>
  <line x1="450" y1="154" x2="385" y2="196" stroke="#334155" stroke-width="1.2" marker-end="url(#arsg2)" fill="none"/>
</g>
<g class="svg-g4">
  <rect x="190" y="196" width="300" height="54" rx="8" fill="#171340" stroke="#818cf8" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="214" text-anchor="middle" dominant-baseline="central">Cœur de commutation</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="232" text-anchor="middle" dominant-baseline="central">5× USW-24 · 802.1Q · PoE · 10 GbE uplinks</text>
  <line x1="265" y1="250" x2="160" y2="292" stroke="#334155" stroke-width="1" marker-end="url(#arsg2)" fill="none"/>
  <line x1="340" y1="250" x2="340" y2="292" stroke="#334155" stroke-width="1" marker-end="url(#arsg2)" fill="none"/>
  <line x1="415" y1="250" x2="500" y2="292" stroke="#334155" stroke-width="1" marker-end="url(#arsg2)" fill="none"/>
</g>
<g class="svg-g5">
  <rect x="60" y="292" width="190" height="54" rx="8" fill="#0a2a1a" stroke="#10b981" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="155" y="310" text-anchor="middle" dominant-baseline="central">3× Ubiquiti U6+</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="155" y="328" text-anchor="middle" dominant-baseline="central">Wi-Fi 6 · PoE alimentées</text>
  <rect x="245" y="292" width="190" height="54" rx="8" fill="#0a2a1a" stroke="#10b981" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="310" text-anchor="middle" dominant-baseline="central">Serveurs Dell R760 / R730</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="328" text-anchor="middle" dominant-baseline="central">Proxmox VE · HA · 9 VMs</text>
  <rect x="430" y="292" width="190" height="54" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="525" y="310" text-anchor="middle" dominant-baseline="central">Postes &amp; téléphonie</text>
  <text font-family="inherit" font-size="12" fill="#94a3b8" x="525" y="328" text-anchor="middle" dominant-baseline="central">56 postes · 15 smartphones</text>
  <line x1="160" y1="346" x2="160" y2="388" stroke="#334155" stroke-width="1" marker-end="url(#arsg2)" fill="none"/>
  <line x1="340" y1="346" x2="340" y2="388" stroke="#334155" stroke-width="1" marker-end="url(#arsg2)" fill="none"/>
  <line x1="500" y1="346" x2="500" y2="388" stroke="#334155" stroke-width="1" marker-end="url(#arsg2)" fill="none"/>
</g>
<g class="svg-g6">
  <rect x="60" y="388" width="100" height="46" rx="6" fill="#0c1e36" stroke="#c7d2fe" stroke-width="2.5"/>
  <rect x="60" y="388" width="100" height="8" rx="3" fill="#1e3a8a"/>
  <text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="110" y="393" text-anchor="middle" dominant-baseline="central">VLAN 10</text>
  <text font-family="inherit" font-size="10" fill="#e2e8f0" x="110" y="414" text-anchor="middle" dominant-baseline="central">Administration</text>
  <text font-family="monospace" font-size="9" fill="#94a3b8" x="110" y="425" text-anchor="middle" dominant-baseline="central">10.2.1.0/24</text>
  <rect x="171" y="388" width="100" height="46" rx="6" fill="#0c1235" stroke="#6366f1" stroke-width="2.5"/>
  <rect x="171" y="388" width="100" height="8" rx="3" fill="#4338ca"/>
  <text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="221" y="393" text-anchor="middle" dominant-baseline="central">VLAN 20</text>
  <text font-family="inherit" font-size="10" fill="#e2e8f0" x="221" y="414" text-anchor="middle" dominant-baseline="central">Postes</text>
  <text font-family="monospace" font-size="9" fill="#94a3b8" x="221" y="425" text-anchor="middle" dominant-baseline="central">10.2.20.0/24</text>
  <rect x="282" y="384" width="100" height="50" rx="6" fill="#0a1f15" stroke="#10b981" stroke-width="2.5"/>
  <rect x="282" y="384" width="100" height="8" rx="3" fill="#047857"/>
  <text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="332" y="389" text-anchor="middle" dominant-baseline="central">VLAN 30</text>
  <text font-family="inherit" font-size="10" fill="#34d399" x="332" y="409" text-anchor="middle" dominant-baseline="central">Analyse médicale</text>
  <text font-family="monospace" font-size="9" fill="#34d399" x="332" y="420" text-anchor="middle" dominant-baseline="central">10.2.30.0/24</text>
  <text font-family="monospace" font-size="8" font-weight="700" fill="#34d399" x="332" y="431" text-anchor="middle" dominant-baseline="central">HDS — ISOLÉ</text>
  <rect x="393" y="388" width="100" height="46" rx="6" fill="#221400" stroke="#d97706" stroke-width="2.5"/>
  <rect x="393" y="388" width="100" height="8" rx="3" fill="#B45309"/>
  <text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="443" y="393" text-anchor="middle" dominant-baseline="central">VLAN 40</text>
  <text font-family="inherit" font-size="10" fill="#B45309" x="443" y="414" text-anchor="middle" dominant-baseline="central">Wi-Fi invités</text>
  <text font-family="monospace" font-size="9" fill="#94a3b8" x="443" y="425" text-anchor="middle" dominant-baseline="central">10.2.40.0/24</text>
  <rect x="504" y="388" width="100" height="46" rx="6" fill="#1e2530" stroke="#475569" stroke-width="2.5"/>
  <rect x="504" y="388" width="100" height="8" rx="3" fill="#475569"/>
  <text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="554" y="393" text-anchor="middle" dominant-baseline="central">VLAN 99</text>
  <text font-family="inherit" font-size="10" fill="#94a3b8" x="554" y="414" text-anchor="middle" dominant-baseline="central">Management</text>
  <text font-family="monospace" font-size="9" fill="#94a3b8" x="554" y="425" text-anchor="middle" dominant-baseline="central">10.2.99.0/24</text>
</g>
<g class="svg-g7">
  <rect x="40" y="452" width="600" height="46" rx="8" fill="#0c1235" stroke="#6366f1" stroke-width="0.5" stroke-dasharray="5 3"/>
  <text font-family="inherit" font-size="14" font-weight="500" fill="#818cf8" x="340" y="469" text-anchor="middle" dominant-baseline="central">26 tunnels SD-WAN sortants — IPsec AES-256 / IKEv2</text>
  <text font-family="inherit" font-size="12" fill="#6366f1" x="340" y="486" text-anchor="middle" dominant-baseline="central">5 laboratoires · 21 centres · auto-orchestrés — UniFi Magic Site-to-Site</text>
</g>
</svg>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center text-xs opacity-0 transition-all duration-700" data-reveal-at="23">
          <div class="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3"><span class="font-mono text-indigo-300 font-bold">Dual-WAN</span><div class="text-slate-500 mt-1">FTTO 1 Gb/s + FTTH failover</div></div>
          <div class="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3"><span class="font-mono text-indigo-300 font-bold">HA Actif/Passif</span><div class="text-slate-500 mt-1">2× UCG-Ultra · heartbeat direct</div></div>
          <div class="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-3"><span class="font-mono text-emerald-300 font-bold">26 tunnels SD-WAN</span><div class="text-slate-500 mt-1">IPsec AES-256 / IKEv2 auto-orchestrés</div></div>
        </div>
      </div>
    </div>
  `;
  const presSlide4 = `
    <div data-pres-slide="24" data-pres-label="Laboratoire régional" class="flex-1 min-h-0 overflow-y-auto w-full h-full">
      <div class="max-w-6xl mx-auto px-4 py-5 space-y-5">
        <div class="text-center space-y-2">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Étape 04 — GSBLAB-LAB-[VILLE] · sites 10 à 14 · phase 2026</p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Laboratoire régional — site témoin</h2>
          <div class="w-14 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto rounded-full"></div>
          <p class="text-slate-400 text-sm max-w-2xl mx-auto">Configuration <b class="text-slate-200">identique sur les 5 laboratoires</b> (Toulouse, Marseille, Nantes, Lyon, Lille). Ce site témoin présente l'architecture type déployée sur chacun d'eux.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="glass-panel rounded-xl p-5">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><span class="w-2 h-2 rounded-sm bg-indigo-400"></span>Chaîne réseau type</h3>
            <div class="flex flex-col gap-0">
          <div class="bg-slate-800/50 border border-white/8 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">WAN — FTTH Pro ≈ 1 Gb/s</div><div class="text-xs text-slate-500 mt-0.5">Opérateur local · OPEX hors projet</div></div>
          <div class="flex flex-col items-center py-1"><div class="w-px h-4 bg-indigo-500/40 border-l-2 border-dashed border-indigo-500/50"></div></div>
          <div class="bg-[#0c1e36] border border-indigo-500/40 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">Ubiquiti UCG-Ultra <span class="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded px-1.5 py-0.5 font-mono">tunnel → Strasbourg</span> <span class="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-1.5 py-0.5 font-mono">IPsec AES-256</span></div><div class="text-xs text-slate-500 mt-0.5">Firewall stateful · SD-WAN Magic Site-to-Site auto-orchestré</div></div>
          <div class="flex flex-col items-center py-1"><div class="w-px h-4 bg-slate-700"></div></div>
          <div class="bg-[#171340] border border-indigo-400/30 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">Ubiquiti USW-24</div><div class="text-xs text-slate-500 mt-0.5">Switch manageable · 24 ports · 802.1Q · PoE</div></div>
          <div class="flex flex-col items-center py-1"><div class="w-px h-4 bg-slate-700"></div></div>
          <div class="bg-[#0a2a1a] border border-emerald-500/30 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">Ubiquiti U6+ — Wi-Fi 6</div><div class="text-xs text-slate-500 mt-0.5">SSID GSBLAB → VLAN 20 · SSID Invités → VLAN 40</div></div>
        </div>
          </div>
          <div class="glass-panel rounded-xl p-5">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><span class="w-2 h-2 rounded-sm bg-indigo-400"></span>Fiche réseau — type laboratoire</h3>
            <table class="w-full text-xs border-collapse">
          <tbody>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium w-40">Identifiant site</td><td class="py-1.5 font-mono text-slate-300">GSBLAB-LAB-[VILLE]</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Rôle SD-WAN</td><td class="py-1.5 text-slate-300">Spoke — 1 tunnel IPsec vers hub Strasbourg</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Passerelle</td><td class="py-1.5 text-slate-300">1× UCG-Ultra · SD-WAN Magic Site-to-Site</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Switch</td><td class="py-1.5 text-slate-300">1× USW-24 (802.1Q, PoE, 24 ports)</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Wi-Fi</td><td class="py-1.5 text-slate-300">1× U6+ (Wi-Fi 6) — 2 SSID distincts</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">VLANs déployés</td><td class="py-1.5 font-mono text-indigo-300">10 · 20 · 30 · 40 · 99</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Postes</td><td class="py-1.5 text-slate-300">10 PC fixes HP ProDesk 400 G9 · 2 laptops HP 250 G10</td></tr>
            <tr><td class="py-1.5 pr-3 text-slate-500 font-medium">MFP</td><td class="py-1.5 text-slate-300">1× Ricoh MPC307SPF</td></tr>
          </tbody>
        </table>
          </div>
        </div>

      </div>
    </div>
  `;
  const presSlide5 = `
    <div data-pres-slide="25" data-pres-label="Schéma réseau Laboratoire" class="flex-1 min-h-0 overflow-y-auto w-full h-full">
      <div class="max-w-6xl mx-auto px-4 py-5 space-y-4">
        <div class="text-center space-y-2">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Laboratoire régional — GSBLAB-LAB-[VILLE] · sites 10 → 14</p>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Schéma réseau type — Laboratoire régional</h2>
          <div class="w-14 h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto rounded-full"></div>
        </div>
        <div class="glass-panel rounded-xl p-5">
          <svg class="pres-schema-svg" viewBox="0 0 680 430" role="img" preserveAspectRatio="xMidYMid meet"><title>Schéma réseau laboratoire régional GSBLAB</title><defs>
  <marker id="arlb2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs><rect x="190" y="14" width="300" height="44" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="27" text-anchor="middle" dominant-baseline="central">WAN — FTTH Pro ≈ 1 Gb/s</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="45" text-anchor="middle" dominant-baseline="central">Opérateur local · OPEX hors projet</text><line x1="340" y1="58" x2="340" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arlb2)" fill="none"/><rect x="150" y="100" width="380" height="54" rx="8" fill="#0c1e36" stroke="#6366f1" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="118" text-anchor="middle" dominant-baseline="central">Ubiquiti UCG-Ultra</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="136" text-anchor="middle" dominant-baseline="central">Firewall · SD-WAN spoke · tunnel → Strasbourg</text><rect x="250" y="156" width="180" height="22" rx="6" fill="#0a1f15" stroke="#059669" stroke-width="0.5"/><text font-family="monospace" font-size="10" font-weight="600" fill="#34d399" x="340" y="168" text-anchor="middle" dominant-baseline="central">IPsec AES-256 · IKEv2 · Magic S2S</text><line x1="340" y1="178" x2="340" y2="210" stroke="#334155" stroke-width="1.2" marker-end="url(#arlb2)" fill="none"/><rect x="190" y="210" width="300" height="44" rx="8" fill="#171340" stroke="#818cf8" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="223" text-anchor="middle" dominant-baseline="central">Ubiquiti USW-24</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="241" text-anchor="middle" dominant-baseline="central">Switch 24 ports · 802.1Q · PoE</text><line x1="255" y1="254" x2="145" y2="294" stroke="#334155" stroke-width="1" marker-end="url(#arlb2)" fill="none"/><line x1="340" y1="254" x2="340" y2="294" stroke="#334155" stroke-width="1" marker-end="url(#arlb2)" fill="none"/><line x1="425" y1="254" x2="520" y2="294" stroke="#334155" stroke-width="1" marker-end="url(#arlb2)" fill="none"/><rect x="60" y="294" width="190" height="54" rx="8" fill="#0a2a1a" stroke="#10b981" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="155" y="312" text-anchor="middle" dominant-baseline="central">Ubiquiti U6+</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="155" y="330" text-anchor="middle" dominant-baseline="central">Wi-Fi 6 · PoE · 2 SSID</text><rect x="250" y="294" width="190" height="54" rx="8" fill="#0a2a1a" stroke="#10b981" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="345" y="312" text-anchor="middle" dominant-baseline="central">HP ProDesk + HP 250 G10</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="345" y="330" text-anchor="middle" dominant-baseline="central">10 PC fixes · 2 laptops</text><rect x="440" y="294" width="190" height="54" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="535" y="312" text-anchor="middle" dominant-baseline="central">Ricoh MPC307SPF</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="535" y="330" text-anchor="middle" dominant-baseline="central">MFP réseau · VLAN 20</text><rect x="35" y="364" width="100" height="46" rx="6" fill="#0c1e36" stroke="#c7d2fe" stroke-width="2.5"/><rect x="35" y="364" width="100" height="8" rx="3" fill="#1e3a8a"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="85" y="369" text-anchor="middle" dominant-baseline="central">VLAN 10</text><text font-family="inherit" font-size="10" fill="#e2e8f0" x="85" y="390" text-anchor="middle" dominant-baseline="central">Admin</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="85" y="401" text-anchor="middle" dominant-baseline="central">10.X.10.0/24</text><rect x="149" y="364" width="100" height="46" rx="6" fill="#0c1235" stroke="#6366f1" stroke-width="2.5"/><rect x="149" y="364" width="100" height="8" rx="3" fill="#4338ca"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="199" y="369" text-anchor="middle" dominant-baseline="central">VLAN 20</text><text font-family="inherit" font-size="10" fill="#e2e8f0" x="199" y="390" text-anchor="middle" dominant-baseline="central">Postes</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="199" y="401" text-anchor="middle" dominant-baseline="central">10.X.20.0/24</text><rect x="263" y="360" width="100" height="50" rx="6" fill="#0a1f15" stroke="#10b981" stroke-width="2.5"/><rect x="263" y="360" width="100" height="8" rx="3" fill="#047857"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="313" y="365" text-anchor="middle" dominant-baseline="central">VLAN 30</text><text font-family="inherit" font-size="10" fill="#34d399" x="313" y="385" text-anchor="middle" dominant-baseline="central">Analyse HDS</text><text font-family="monospace" font-size="9" fill="#34d399" x="313" y="396" text-anchor="middle" dominant-baseline="central">10.X.30.0/24</text><text font-family="monospace" font-size="8" font-weight="700" fill="#34d399" x="313" y="407" text-anchor="middle" dominant-baseline="central">HDS — ISOLÉ</text><rect x="377" y="364" width="100" height="46" rx="6" fill="#221400" stroke="#d97706" stroke-width="2.5"/><rect x="377" y="364" width="100" height="8" rx="3" fill="#B45309"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="427" y="369" text-anchor="middle" dominant-baseline="central">VLAN 40</text><text font-family="inherit" font-size="10" fill="#B45309" x="427" y="390" text-anchor="middle" dominant-baseline="central">Wi-Fi invités</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="427" y="401" text-anchor="middle" dominant-baseline="central">10.X.40.0/24</text><rect x="491" y="364" width="100" height="46" rx="6" fill="#1e2530" stroke="#475569" stroke-width="2.5"/><rect x="491" y="364" width="100" height="8" rx="3" fill="#475569"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="541" y="369" text-anchor="middle" dominant-baseline="central">VLAN 99</text><text font-family="inherit" font-size="10" fill="#94a3b8" x="541" y="390" text-anchor="middle" dominant-baseline="central">Management</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="541" y="401" text-anchor="middle" dominant-baseline="central">10.X.99.0/24</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="590" y="378" text-anchor="start">X = site</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="590" y="390" text-anchor="start">10 → 14</text></svg>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center text-xs">
          <div class="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3"><span class="font-mono text-indigo-300 font-bold">FTTH Pro ≈ 1 Gb/s</span><div class="text-slate-500 mt-1">WAN unique · OPEX hors projet</div></div>
          <div class="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3"><span class="font-mono text-indigo-300 font-bold">1× UCG-Ultra</span><div class="text-slate-500 mt-1">SD-WAN spoke · tunnel vers Strasbourg</div></div>
          <div class="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-3"><span class="font-mono text-emerald-300 font-bold">10 PC · 2 laptops · 1 MFP</span><div class="text-slate-500 mt-1">12 postes · Ricoh MPC307SPF réseau</div></div>
        </div>

      </div>
    </div>
  `;
  const presSlide6 = `
    <div data-pres-slide="26" data-pres-label="Centre de prélèvement" class="flex-1 min-h-0 overflow-y-auto w-full h-full">
      <div class="max-w-6xl mx-auto px-4 py-5 space-y-5">
        <div class="text-center space-y-2">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Étape 06 — GSBLAB-CP-[VILLE] · sites 20 à 34 · phase 2027-2028</p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Centre de prélèvement — site témoin</h2>
          <div class="w-14 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
          <p class="text-slate-400 text-sm max-w-2xl mx-auto">Configuration <b class="text-slate-200">identique sur les 15 centres</b> (rattachés chacun à un laboratoire régional). Ce site témoin présente l'architecture type déployée sur chacun d'eux.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="glass-panel rounded-xl p-5">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><span class="w-2 h-2 rounded-sm bg-indigo-400"></span>Chaîne réseau type</h3>
            <div class="flex flex-col gap-0">
          <div class="bg-slate-800/50 border border-white/8 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">WAN — FTTH Pro ≈ 1 Gb/s</div><div class="text-xs text-slate-500 mt-0.5">Opérateur local · OPEX hors projet</div></div>
          <div class="flex flex-col items-center py-1"><div class="w-px h-4 bg-indigo-500/40 border-l-2 border-dashed border-indigo-500/50"></div></div>
          <div class="bg-[#0c1e36] border border-indigo-500/40 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">Ubiquiti UCG-Ultra <span class="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded px-1.5 py-0.5 font-mono">tunnel → Strasbourg</span> <span class="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-1.5 py-0.5 font-mono">IPsec AES-256</span></div><div class="text-xs text-slate-500 mt-0.5">Firewall stateful · SD-WAN Magic Site-to-Site auto-orchestré</div></div>
          <div class="flex flex-col items-center py-1"><div class="w-px h-4 bg-slate-700"></div></div>
          <div class="bg-[#171340] border border-indigo-400/30 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">Ubiquiti USW-Lite-16-PoE</div><div class="text-xs text-slate-500 mt-0.5">Switch manageable · 16 ports PoE · 802.1Q · PoE</div></div>
          <div class="flex flex-col items-center py-1"><div class="w-px h-4 bg-slate-700"></div></div>
          <div class="bg-[#0a2a1a] border border-emerald-500/30 rounded-xl p-3"><div class="text-sm font-bold text-slate-200">Ubiquiti U6+ — Wi-Fi 6</div><div class="text-xs text-slate-500 mt-0.5">SSID GSBLAB → VLAN 20 · SSID Invités → VLAN 40</div></div>
        </div>
          </div>
          <div class="glass-panel rounded-xl p-5">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><span class="w-2 h-2 rounded-sm bg-indigo-400"></span>Fiche réseau — type centre de prélèvement</h3>
            <table class="w-full text-xs border-collapse">
          <tbody>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium w-40">Identifiant site</td><td class="py-1.5 font-mono text-slate-300">GSBLAB-CP-[VILLE]</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Rôle SD-WAN</td><td class="py-1.5 text-slate-300">Spoke — 1 tunnel IPsec vers hub Strasbourg</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Passerelle</td><td class="py-1.5 text-slate-300">1× UCG-Ultra · SD-WAN Magic Site-to-Site</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Switch</td><td class="py-1.5 text-slate-300">1× USW-Lite-16-PoE (802.1Q, 16 ports)</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">Wi-Fi</td><td class="py-1.5 text-slate-300">1× U6+ (Wi-Fi 6) — 2 SSID distincts</td></tr>
            <tr class="border-b border-white/5"><td class="py-1.5 pr-3 text-slate-500 font-medium">VLANs déployés</td><td class="py-1.5 font-mono text-indigo-300">10 · 20 · 30 · 40 · 99</td></tr>
            <tr><td class="py-1.5 pr-3 text-slate-500 font-medium">Postes</td><td class="py-1.5 text-slate-300">5 PC fixes HP ProDesk 400 G9 · 1 laptop HP 250 G10 reconditionné</td></tr>
          </tbody>
        </table>
          </div>
        </div>

      </div>
    </div>
  `;
  const presSlide7 = `
    <div data-pres-slide="27" data-pres-label="Schéma réseau Centre" class="flex-1 min-h-0 overflow-y-auto w-full h-full">
      <div class="max-w-6xl mx-auto px-4 py-5 space-y-4">
        <div class="text-center space-y-2">
          <p class="text-[11px] font-mono tracking-widest uppercase text-indigo-400">Centre de prélèvement — GSBLAB-CP-[VILLE] · sites 20 → 34</p>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Schéma réseau type — Centre de prélèvement</h2>
          <div class="w-14 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
        <div class="glass-panel rounded-xl p-5">
          <svg class="pres-schema-svg" viewBox="0 0 680 415" role="img" preserveAspectRatio="xMidYMid meet"><title>Schéma réseau centre de prélèvement GSBLAB</title><defs>
  <marker id="arcp2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs><rect x="190" y="14" width="300" height="44" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="27" text-anchor="middle" dominant-baseline="central">WAN — FTTH ≈ 500 Mb/s</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="45" text-anchor="middle" dominant-baseline="central">Opérateur local · OPEX hors projet</text><line x1="340" y1="58" x2="340" y2="100" stroke="#334155" stroke-width="1.2" marker-end="url(#arcp2)" fill="none"/><rect x="150" y="100" width="380" height="54" rx="8" fill="#0c1e36" stroke="#6366f1" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="118" text-anchor="middle" dominant-baseline="central">Ubiquiti UCG-Ultra</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="136" text-anchor="middle" dominant-baseline="central">Firewall · SD-WAN spoke · tunnel → Strasbourg</text><rect x="250" y="156" width="180" height="22" rx="6" fill="#0a1f15" stroke="#059669" stroke-width="0.5"/><text font-family="monospace" font-size="10" font-weight="600" fill="#34d399" x="340" y="168" text-anchor="middle" dominant-baseline="central">IPsec AES-256 · IKEv2 · Magic S2S</text><line x1="340" y1="178" x2="340" y2="210" stroke="#334155" stroke-width="1.2" marker-end="url(#arcp2)" fill="none"/><rect x="200" y="210" width="280" height="44" rx="8" fill="#171340" stroke="#818cf8" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="340" y="223" text-anchor="middle" dominant-baseline="central">Ubiquiti USW-Lite-16-PoE</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="340" y="241" text-anchor="middle" dominant-baseline="central">Switch 16 ports PoE · 802.1Q</text><line x1="255" y1="254" x2="145" y2="294" stroke="#334155" stroke-width="1" marker-end="url(#arcp2)" fill="none"/><line x1="340" y1="254" x2="340" y2="294" stroke="#334155" stroke-width="1" marker-end="url(#arcp2)" fill="none"/><line x1="425" y1="254" x2="520" y2="294" stroke="#334155" stroke-width="1" marker-end="url(#arcp2)" fill="none"/><rect x="60" y="294" width="190" height="54" rx="8" fill="#0a2a1a" stroke="#10b981" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="155" y="312" text-anchor="middle" dominant-baseline="central">Ubiquiti U6+</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="155" y="330" text-anchor="middle" dominant-baseline="central">Wi-Fi 6 · PoE · 2 SSID</text><rect x="250" y="294" width="190" height="54" rx="8" fill="#0a2a1a" stroke="#10b981" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="345" y="312" text-anchor="middle" dominant-baseline="central">5 PC fixes + 1 laptop</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="345" y="330" text-anchor="middle" dominant-baseline="central">HP ProDesk 400 G9 · HP 250 G10</text><rect x="440" y="294" width="190" height="54" rx="8" fill="#1e2530" stroke="#334155" stroke-width="0.5"/><text font-family="inherit" font-size="14" font-weight="500" fill="#e2e8f0" x="535" y="312" text-anchor="middle" dominant-baseline="central">Accès Medoc</text><text font-family="inherit" font-size="12" fill="#94a3b8" x="535" y="330" text-anchor="middle" dominant-baseline="central">Via VLAN 30 · tunnel chiffré</text><rect x="35" y="360" width="100" height="46" rx="6" fill="#0c1e36" stroke="#c7d2fe" stroke-width="2.5"/><rect x="35" y="360" width="100" height="8" rx="3" fill="#1e3a8a"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="85" y="365" text-anchor="middle" dominant-baseline="central">VLAN 10</text><text font-family="inherit" font-size="10" fill="#e2e8f0" x="85" y="386" text-anchor="middle" dominant-baseline="central">Admin</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="85" y="397" text-anchor="middle" dominant-baseline="central">10.X.10.0/24</text><rect x="149" y="360" width="100" height="46" rx="6" fill="#0c1235" stroke="#6366f1" stroke-width="2.5"/><rect x="149" y="360" width="100" height="8" rx="3" fill="#4338ca"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="199" y="365" text-anchor="middle" dominant-baseline="central">VLAN 20</text><text font-family="inherit" font-size="10" fill="#e2e8f0" x="199" y="386" text-anchor="middle" dominant-baseline="central">Postes</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="199" y="397" text-anchor="middle" dominant-baseline="central">10.X.20.0/24</text><rect x="263" y="356" width="100" height="50" rx="6" fill="#0a1f15" stroke="#10b981" stroke-width="2.5"/><rect x="263" y="356" width="100" height="8" rx="3" fill="#047857"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="313" y="361" text-anchor="middle" dominant-baseline="central">VLAN 30</text><text font-family="inherit" font-size="10" fill="#34d399" x="313" y="381" text-anchor="middle" dominant-baseline="central">Analyse HDS</text><text font-family="monospace" font-size="9" fill="#34d399" x="313" y="392" text-anchor="middle" dominant-baseline="central">10.X.30.0/24</text><text font-family="monospace" font-size="8" font-weight="700" fill="#34d399" x="313" y="403" text-anchor="middle" dominant-baseline="central">HDS — ISOLÉ</text><rect x="377" y="360" width="100" height="46" rx="6" fill="#221400" stroke="#d97706" stroke-width="2.5"/><rect x="377" y="360" width="100" height="8" rx="3" fill="#B45309"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="427" y="365" text-anchor="middle" dominant-baseline="central">VLAN 40</text><text font-family="inherit" font-size="10" fill="#B45309" x="427" y="386" text-anchor="middle" dominant-baseline="central">Wi-Fi invités</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="427" y="397" text-anchor="middle" dominant-baseline="central">10.X.40.0/24</text><rect x="491" y="360" width="100" height="46" rx="6" fill="#1e2530" stroke="#475569" stroke-width="2.5"/><rect x="491" y="360" width="100" height="8" rx="3" fill="#475569"/><text font-family="monospace" font-size="9" font-weight="700" fill="#fff" x="541" y="365" text-anchor="middle" dominant-baseline="central">VLAN 99</text><text font-family="inherit" font-size="10" fill="#94a3b8" x="541" y="386" text-anchor="middle" dominant-baseline="central">Management</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="541" y="397" text-anchor="middle" dominant-baseline="central">10.X.99.0/24</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="590" y="374" text-anchor="start">X = site</text><text font-family="monospace" font-size="9" fill="#94a3b8" x="590" y="386" text-anchor="start">20 → 34</text></svg>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center text-xs">
          <div class="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3"><span class="font-mono text-indigo-300 font-bold">USW-Lite-16-PoE</span><div class="text-slate-500 mt-1">Switch compact · 16 ports · PoE intégré</div></div>
          <div class="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3"><span class="font-mono text-indigo-300 font-bold">5 PC + 1 laptop</span><div class="text-slate-500 mt-1">HP ProDesk 400 G9 · HP 250 G10</div></div>
          <div class="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-3"><span class="font-mono text-emerald-300 font-bold">VLAN 30 isolé</span><div class="text-slate-500 mt-1">Accès Medoc via tunnel chiffré HDS</div></div>
        </div>

      </div>
    </div>
  `;
  const presSlide8 = `
    <div data-pres-slide="28" data-pres-label="Cluster Proxmox HA" class="flex-1 min-h-0 w-full h-full">
      <div class="max-w-6xl mx-auto px-4 py-5 space-y-8 h-full flex flex-col justify-center">
      <div class="text-center space-y-4 w-full">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Capacité du Cluster Proxmox HA</h2>
        <div class="w-16 h-1.5 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
        <p class="text-xl text-slate-400 mt-4">Ressources allouées sur le Hub centralisé (${state.serversCount} Nœuds physiques)</p>
      </div>
      <div class="w-full glass-panel rounded-3xl p-12 space-y-12 shadow-2xl bg-slate-900/60">
        <div class="space-y-4">
          <div class="flex justify-between items-end"><span class="text-2xl font-bold text-slate-300 flex items-center gap-3"><svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>Processeur (vCœurs)</span><span class="text-3xl font-mono font-extrabold text-blue-400">${allocatedCores} / ${totalCores} <span class="text-xl text-slate-500">(${pctCores}%)</span></span></div>
          <div class="h-6 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5"><div class="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style="width:${pctCores}%"></div></div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-end"><span class="text-2xl font-bold text-slate-300 flex items-center gap-3"><svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="4" x2="10" y2="20"></line></svg>Mémoire RAM (Go)</span><span class="text-3xl font-mono font-extrabold text-indigo-400">${allocatedRam} / ${totalRam} <span class="text-xl text-slate-500">(${pctRam}%)</span></span></div>
          <div class="h-6 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5"><div class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full" style="width:${pctRam}%"></div></div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-end"><span class="text-2xl font-bold text-slate-300 flex items-center gap-3"><svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>Pool Ceph (Utile NVMe)</span><span class="text-3xl font-mono font-extrabold text-emerald-400">1.2 TB / 6.0 TB <span class="text-xl text-slate-500">(20%)</span></span></div>
          <div class="h-6 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5"><div class="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style="width:20%"></div></div>
        </div>
      </div>
      </div>
    </div>
  `;
  const presSlide9 = `
    <div data-pres-slide="29" data-pres-label="Déploiement IaC" class="flex-1 min-h-0 w-full h-full">
      <style>
        @keyframes iacCursor{0%,100%{opacity:1}50%{opacity:0}}
        .iac-cursor{display:inline-block;width:7px;height:0.9em;background:#6366f1;vertical-align:text-bottom;border-radius:1px;animation:iacCursor 1.1s step-end infinite;margin-left:1px}
        @keyframes iacBarFill{from{width:0%}to{width:var(--bar-w)}}
        .iac-bar-inner{animation:iacBarFill 1.2s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--bar-delay,0s);width:0%}
        @keyframes iacRowIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
        .iac-row{animation:iacRowIn 0.25s ease forwards;animation-delay:var(--row-delay,0s);opacity:0}
        #iac-run-panel{background:#080a0f;background-image:repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(255,255,255,.009) 23px)}
      </style>

      <div class="max-w-6xl w-full mx-auto px-4 py-3 h-full flex flex-col gap-3">

        <!-- ── Header : titre + concept clair pour le jury ── -->
        <div class="flex items-start justify-between gap-6 shrink-0">
          <div class="flex flex-col gap-1">
            <div class="text-[9px] font-mono tracking-[0.28em] uppercase text-blue-400/70">Infrastructure-as-Code · Terraform + Ansible</div>
            <h2 class="text-[1.8rem] font-extrabold leading-tight tracking-tight" style="background:linear-gradient(135deg,#f1f5f9 0%,#93c5fd 40%,#6366f1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Déploiement Automatisé (IaC)</h2>
            <p class="text-slate-400 text-[12px] max-w-lg leading-snug">Un <b class="text-slate-200">git push</b> suffit pour déployer et sécuriser un nouveau site complet — <b class="text-slate-200">sans intervention manuelle</b>. Chaque site est reproductible à l'identique en cas de sinistre.</p>
          </div>
          <!-- Run badge -->
          <div class="glass-panel rounded-2xl px-4 py-3 flex flex-col gap-2 shrink-0 border border-white/8 text-[10px] font-mono" style="background:rgba(10,12,18,0.8)">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                <svg class="w-2.5 h-2.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span class="text-emerald-400 font-bold">passed</span>
              <span class="text-slate-600 mx-1">·</span>
              <span class="text-slate-400">2m 34s</span>
            </div>
            <div class="text-slate-600">commit <span class="text-yellow-500/80">a3f92c1</span> · branch <span class="text-slate-400">main</span></div>
            <div class="text-slate-600 truncate max-w-[220px]">"feat: provisioning Strasbourg + 6 labos"</div>
          </div>
        </div>

        <!-- ── Main: terminal log + sidebar ── -->
        <div class="flex-1 grid grid-cols-[1fr_252px] gap-3 min-h-0">

          <!-- Terminal CI log -->
          <div id="iac-run-panel" class="rounded-2xl border border-white/8 flex flex-col overflow-hidden">
            <!-- Chrome bar -->
            <div class="flex items-center gap-2 px-4 py-2 border-b border-white/8 shrink-0" style="background:rgba(255,255,255,0.025)">
              <div class="flex gap-1.5 mr-2">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/55"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/55"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/55"></div>
              </div>
              <span class="font-mono text-[9.5px] text-slate-600">gsblab-iac / deploy #42 — job log</span>
            </div>

            <!-- Scrollable log -->
            <div class="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-[1.7] space-y-0.5">

              <!-- ① PLANIFICATION -->
              <div class="iac-row text-slate-600 text-[9.5px] tracking-widest uppercase mb-1" style="--row-delay:0.2s">── ① Planification Terraform ──────────────────── 12s</div>
              <div class="iac-row pl-2 text-slate-600" style="--row-delay:0.7s">$ terraform init -input=false</div>
              <div class="iac-row pl-4 text-slate-500" style="--row-delay:1.2s">Initializing provider plugins... <span class="text-indigo-400/80">hashicorp/proxmox v0.46.0</span></div>
              <div class="iac-row pl-2 text-slate-600 mt-1" style="--row-delay:1.7s">$ terraform plan -out=gsblab.tfplan</div>
              <div class="iac-row pl-4 text-slate-500" style="--row-delay:2.2s">Refreshing state... <span class="text-slate-600">proxmox_vm_qemu.existing: Read complete</span></div>
              <div class="iac-row pl-4 text-emerald-400 font-semibold" style="--row-delay:2.7s">Plan: 4 to add, 0 to change, 0 to destroy.</div>

              <!-- ② PROVISIONING -->
              <div class="iac-row text-slate-600 text-[9.5px] tracking-widest uppercase mt-3 mb-1" style="--row-delay:3.3s">── ② Provisioning VMs sur Proxmox VE ──────── 1m 48s</div>
              <div class="iac-row pl-2 text-slate-600" style="--row-delay:3.8s">$ terraform apply -auto-approve gsblab.tfplan</div>
              <div class="iac-row pl-4" style="--row-delay:4.4s">
                <span class="text-green-400">+</span> <span class="text-slate-400">proxmox_vm_qemu.</span><span class="text-white font-bold">sgl_server</span>
                <span class="text-slate-600"> [pve02/qemu/101] ...</span> <span class="text-emerald-400">created</span> <span class="text-slate-700 text-[10px]">23s</span>
              </div>
              <div class="iac-row pl-4" style="--row-delay:5.0s">
                <span class="text-green-400">+</span> <span class="text-slate-400">proxmox_vm_qemu.</span><span class="text-white font-bold">lims_server</span>
                <span class="text-slate-600"> [pve02/qemu/102] ...</span> <span class="text-emerald-400">created</span> <span class="text-slate-700 text-[10px]">31s</span>
              </div>
              <div class="iac-row pl-4" style="--row-delay:5.5s">
                <span class="text-green-400">+</span> <span class="text-slate-400">proxmox_vm_qemu.</span><span class="text-white font-bold">zabbix_srv</span>
                <span class="text-slate-600"> [pve02/qemu/103] ...</span> <span class="text-emerald-400">created</span> <span class="text-slate-700 text-[10px]">28s</span>
              </div>
              <div class="iac-row pl-4" style="--row-delay:6.0s">
                <span class="text-green-400">+</span> <span class="text-slate-400">proxmox_vm_qemu.</span><span class="text-white font-bold">medoc_db</span>
                <span class="text-slate-600">   [pve02/qemu/104] ...</span> <span class="text-emerald-400">created</span> <span class="text-slate-700 text-[10px]">19s</span>
              </div>
              <div class="iac-row pl-4 text-emerald-400 font-semibold mt-0.5" style="--row-delay:6.6s">Apply complete! Resources: 4 added, 0 changed, 0 destroyed.</div>

              <!-- ③ DURCISSEMENT -->
              <div class="iac-row text-slate-600 text-[9.5px] tracking-widest uppercase mt-3 mb-1" style="--row-delay:7.2s">── ③ Durcissement sécurité CIS L1 (Ansible) ──── 34s</div>
              <div class="iac-row pl-2 text-slate-600" style="--row-delay:7.7s">$ ansible-playbook -i inventory.yml 04_Server_Hardening.yml</div>
              <div class="iac-row pl-4 text-slate-600" style="--row-delay:8.2s">PLAY [Hardening GSBLAB servers — 4 hosts] <span class="text-slate-700">*****</span></div>
              <div class="iac-row pl-4" style="--row-delay:8.7s"><span class="text-slate-500">TASK [Gathering Facts]</span> <span class="text-emerald-400/80">ok</span><span class="text-slate-600">: [101] [102] [103] [104]</span></div>
              <div class="iac-row pl-4 text-slate-500" style="--row-delay:9.2s">TASK [ssh : Disable root login] <span class="text-yellow-400/80">changed</span><span class="text-slate-600">: 4 hosts</span></div>
              <div class="iac-row pl-4 text-slate-500" style="--row-delay:9.7s">TASK [ufw : Enable firewall] <span class="text-yellow-400/80">changed</span><span class="text-slate-600">: 4 hosts</span></div>
              <div class="iac-row pl-4 text-slate-500" style="--row-delay:10.2s">TASK [fail2ban : Install &amp; configure] <span class="text-yellow-400/80">changed</span><span class="text-slate-600">: 4 hosts</span></div>
              <div class="iac-row pl-4 mt-1" style="--row-delay:10.8s">
                <span class="text-slate-600">PLAY RECAP </span>
                <span class="text-emerald-400 font-bold">ok=47</span>
                <span class="text-yellow-400/80 ml-2">changed=23</span>
                <span class="text-slate-600 ml-2">unreachable=0</span>
                <span class="text-slate-600 ml-2">failed=<span class="text-emerald-400 font-bold">0</span></span>
                <span class="iac-cursor"></span>
              </div>

            </div>
          </div>

          <!-- Right sidebar -->
          <div class="flex flex-col gap-3">

            <!-- "Pourquoi IaC" card -->
            <div class="glass-panel rounded-2xl p-4 flex flex-col gap-3 flex-1 border border-white/8">
              <div class="text-[8.5px] font-mono tracking-[0.2em] uppercase text-slate-600">Pourquoi l'IaC ?</div>
              <div class="flex flex-col gap-2.5">
                <div class="flex items-start gap-2.5">
                  <div class="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20">
                    <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  </div>
                  <div><div class="text-[11px] font-bold text-slate-200">Reproductible</div><div class="text-[10px] text-slate-400 leading-snug">Tout site peut être redéployé à l'identique depuis Git en cas de sinistre.</div></div>
                </div>
                <div class="flex items-start gap-2.5">
                  <div class="w-6 h-6 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-teal-500/20">
                    <svg class="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div><div class="text-[11px] font-bold text-slate-200">Sécurisé dès le départ</div><div class="text-[10px] text-slate-400 leading-snug">Hardening CIS L1 automatique sur chaque VM — 0 oubli possible.</div></div>
                </div>
                <div class="flex items-start gap-2.5">
                  <div class="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                    <svg class="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <div><div class="text-[11px] font-bold text-slate-200">Scalable × 27 sites</div><div class="text-[10px] text-slate-400 leading-snug">Ajouter un site = modifier une variable. Pas de re-configuration manuelle.</div></div>
                </div>
              </div>

              <div class="h-px bg-white/5 my-1"></div>

              <!-- KPI mini grid -->
              <div class="grid grid-cols-2 gap-2">
                <div class="rounded-xl p-2.5 text-center border border-indigo-500/15 bg-indigo-950/20">
                  <div class="text-lg font-extrabold font-mono text-indigo-400">4</div>
                  <div class="text-[8px] uppercase tracking-wider text-slate-500 mt-0.5">VMs créées</div>
                </div>
                <div class="rounded-xl p-2.5 text-center border border-teal-500/15 bg-teal-950/20">
                  <div class="text-lg font-extrabold font-mono text-teal-400">47</div>
                  <div class="text-[8px] uppercase tracking-wider text-slate-500 mt-0.5">Tasks auto</div>
                </div>
                <div class="rounded-xl p-2.5 text-center border border-yellow-500/15 bg-yellow-950/10">
                  <div class="text-lg font-extrabold font-mono text-yellow-400">~3<span class="text-sm">min</span></div>
                  <div class="text-[8px] uppercase tracking-wider text-slate-500 mt-0.5">Déploiement</div>
                </div>
                <div class="rounded-xl p-2.5 text-center border border-emerald-500/15 bg-emerald-950/20">
                  <div class="text-lg font-extrabold font-mono text-emerald-400">0</div>
                  <div class="text-[8px] uppercase tracking-wider text-slate-500 mt-0.5">Intervention</div>
                </div>
              </div>
            </div>

            <!-- Files -->
            <div class="glass-panel rounded-2xl p-3.5 shrink-0 border border-white/5 font-mono" style="background:rgba(8,10,16,0.7)">
              <div class="text-[8.5px] tracking-[0.2em] uppercase text-slate-600 mb-2">Fichiers IaC</div>
              <div class="flex flex-col gap-1.5 text-[10px]">
                <div class="flex items-center gap-2"><svg class="w-3 h-3 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="13 2 13 9 20 9"/></svg><span class="text-slate-500">03_Proxmox_Provisioning<span class="text-indigo-400">.tf</span></span></div>
                <div class="flex items-center gap-2"><svg class="w-3 h-3 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="13 2 13 9 20 9"/></svg><span class="text-slate-500">04_Server_Hardening<span class="text-teal-400">.yml</span></span></div>
                <div class="flex items-center gap-2"><svg class="w-3 h-3 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="13 2 13 9 20 9"/></svg><span class="text-slate-500">inventory<span class="text-slate-400">.yml</span></span></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  return `${presSlide1}${presSlide2}${presSlide3}${presSlide4}${presSlide5}${presSlide6}${presSlide7}${presSlide8}${presSlide9}`;
}
