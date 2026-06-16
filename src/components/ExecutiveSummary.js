export default function ExecutiveSummary(state) {
  const isPres = state.presentationMode;

  // ─── Data ────────────────────────────────────────────────────────────────
  const pillars = [
    { num: '01', label: 'Virtualisation',  before: 'ESXi 6.0 (Dette)',       after: 'Proxmox VE HA',       color: 'blue'    },
    { num: '02', label: 'Stockage',        before: 'SAN SAS (SPOF)',          after: 'Cluster Ceph 3×',     color: 'emerald' },
    { num: '03', label: 'Sécurité Flux',   before: 'Flat Net sans FW',        after: 'VLANs + Ubiquiti',    color: 'purple'  },
    { num: '04', label: 'Sauvegardes',     before: 'Bandes LTO Manuelles',    after: 'PBS Immuable (DRP)',  color: 'amber'   },
  ];

  const hdsItems = [
    ['Hébergement physique', 'OK',       'emerald'],
    ['Chiffrement AES-256',  'OK',       'emerald'],
    ['Sauvegarde 3-2-1-1-0', 'OK',       'emerald'],
    ['Messagerie HDS',       'OK',       'emerald'],
    ['Audit & traçabilité',  'OK',       'emerald'],
    ['DPA Microsoft',        'À signer', 'amber'  ],
  ];


  const footerMetrics = [
    {
      label: 'Budget Total',
      value: '398 733 €',
      sub:   '/ 450 000 € · 11,4 % réserve',
      color: 'emerald',
      icon:  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    },
    {
      label: 'Conformité HDS',
      value: '100 %',
      sub:   'Certifié · Activités 1-6',
      color: 'blue',
      icon:  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    },
    {
      label: 'Retour Invest.',
      value: '< 12 mois',
      sub:   'Gain net 329 500 €',
      color: 'indigo',
      icon:  '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    },
    {
      label: 'Sites Couverts',
      value: '27 sites',
      sub:   '26 Spokes · SD-WAN',
      color: 'purple',
      icon:  '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    },
  ];

  // ════════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Intro plein écran (commune)
  // ════════════════════════════════════════════════════════════════════════════
  const slide1 = `
    <div
      data-pres-slide="1"
      data-pres-label="Présentation de l'équipe"
      class="${isPres ? '' : 'hidden'} flex flex-col items-center justify-center text-center space-y-8 no-print h-full"
    >
      <div class="flex items-center bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-slate-300">
        <span>MASTÈRE 2IC</span>
        <span class="mx-2 text-slate-600">/</span>
        <span class="text-blue-400">GRP.01</span>
      </div>

      <div class="space-y-4 max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight font-display">
          GSBLAB — Transition Technologique
        </h1>
        <p class="text-sm md:text-base text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
          Groupe 1 &middot; Mastère 2IC 2026
        </p>
      </div>

      <div class="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>

      <div class="grid grid-cols-3 gap-6 max-w-lg w-full pt-4">
        <div class="pres-card">
          <span class="text-white font-bold block text-sm">Romain</span>
          <span class="text-[9px] text-slate-500 uppercase font-semibold mt-1 block">Chiffrage &amp; PMO</span>
        </div>
        <div class="pres-card">
          <span class="text-white font-bold block text-sm">Jérôme</span>
          <span class="text-[9px] text-slate-500 uppercase font-semibold mt-1 block">Portail &amp; Doc</span>
        </div>
        <div class="pres-card">
          <span class="text-white font-bold block text-sm">Léo</span>
          <span class="text-[9px] text-slate-500 uppercase font-semibold mt-1 block">Architecture &amp; IaC</span>
        </div>
      </div>

      <div class="text-[10px] text-slate-500 font-mono tracking-widest uppercase animate-pulse pt-8 select-none">
        Appuyez sur Espace ou Flèche Droite pour démarrer
      </div>
    </div>
  `;

  // ════════════════════════════════════════════════════════════════════════════
  // MODE NON-PRÉSENTATION : LE DASHBOARD COMPLET
  // ════════════════════════════════════════════════════════════════════════════
  if (!isPres) {
    return `
      ${slide1}
      <div data-pres-slide="2" data-pres-label="Synthèse Générale" class="flex-1 min-h-0 flex flex-col gap-4">
        <!-- ════ SLIDE HEADER ════ -->
        <div class="flex items-center justify-between flex-shrink-0 pb-3 border-b border-white/5">
          <div class="flex items-center gap-3">
            <div class="w-0.5 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full flex-shrink-0"></div>
            <div>
              <h2 style="font-size:clamp(15px,1.8vw,22px);" class="font-extrabold text-white tracking-tight leading-tight">
                Synthèse Générale du Projet
              </h2>
              <p class="text-[10px] text-slate-500 mt-0.5 tracking-wide">
                Migration SI · Proxmox HA · Conformité HDS v2 · Horizon 2026-2030
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/8 px-2.5 py-1.5 rounded-lg text-[9px] font-mono">
              <span class="text-slate-400">MASTÈRE 2IC</span>
              <span class="text-slate-600">/</span>
              <span class="font-bold text-blue-400">GRP.01</span>
            </span>
            <span class="badge-emerald">
              <svg class="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>398 733 € / 450 000 €</span>
            </span>
            <button id="btn-export-livrable" class="btn-secondary no-print cursor-pointer">
              <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Livrable PDF</span>
            </button>
          </div>
        </div>

        <!-- ════ MAIN BODY (2 colonnes) ════ -->
        <div class="flex-1 min-h-0 grid gap-4" style="grid-template-columns:5fr 6fr;">
          <!-- ── COLONNE GAUCHE ── -->
          <div class="flex flex-col gap-4 min-h-0">
            <!-- KPIs 2×2 -->
            <div class="grid grid-cols-2 gap-3 flex-shrink-0">
              <div class="glass-panel rounded-xl p-3.5 flex items-center gap-3 hover:border-white/15 transition">
                <div class="icon-box-blue">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div style="font-size:clamp(20px,2.4vw,32px);" class="metric-value">${state.usersCount}</div>
                  <div class="label-subtext">Utilisateurs</div>
                </div>
              </div>
              <div class="glass-panel rounded-xl p-3.5 flex items-center gap-3 hover:border-white/15 transition">
                <div class="icon-box-emerald">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <div style="font-size:clamp(20px,2.4vw,32px);" class="metric-value">${state.sitesCount}</div>
                  <div class="label-subtext">Sites (Spokes)</div>
                </div>
              </div>
              <div class="glass-panel rounded-xl p-3.5 flex items-center gap-3 hover:border-white/15 transition">
                <div class="icon-box-purple">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                </div>
                <div>
                  <div style="font-size:clamp(20px,2.4vw,32px);" class="metric-value">${state.serversCount}</div>
                  <div class="label-subtext">Serveurs HA</div>
                </div>
              </div>
              <div class="glass-panel rounded-xl p-3.5 flex items-center gap-3 hover:border-white/15 transition">
                <div class="w-9 h-9 relative flex-shrink-0 flex items-center justify-center">
                  <svg class="w-9 h-9 -rotate-90 absolute" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" class="stroke-slate-800" stroke-width="3.5" fill="transparent"/>
                    <circle cx="18" cy="18" r="15" class="stroke-emerald-500 animate-dial" style="filter:drop-shadow(0 0 2px rgba(16,185,129,0.5))" stroke-width="3.5" fill="transparent" stroke-dasharray="94.2" stroke-dashoffset="94.2"/>
                  </svg>
                  <span class="absolute text-[7px] font-bold text-emerald-400 font-mono z-10 select-none">100%</span>
                </div>
                <div>
                  <div style="font-size:clamp(20px,2.4vw,32px);" class="font-mono font-extrabold text-emerald-400 leading-none">100%</div>
                  <div class="text-[8px] text-emerald-500 uppercase tracking-wider mt-0.5">HDS v2</div>
                </div>
              </div>
            </div>

            <!-- Matrice de Transition -->
            <div class="flex-1 min-h-0 glass-panel rounded-xl p-4 flex flex-col overflow-hidden">
              <div class="flex items-center gap-2 mb-3 flex-shrink-0">
                <span class="w-0.5 h-3.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span class="panel-header-title">Matrice de Transition — Dette Technique → Cible HDS</span>
              </div>
              <div class="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3">
                ${pillars.map(p => `
                  <div class="inner-panel flex flex-col justify-between hover:border-${p.color}-500/20 transition-all group overflow-hidden">
                    <div class="text-[8px] font-bold text-${p.color}-400 uppercase tracking-widest leading-none">${p.num} · ${p.label}</div>
                    <div class="space-y-1.5 mt-auto">
                      <div class="text-[9px] text-red-400 flex items-center gap-1 leading-none">
                        <span class="font-bold text-red-500 flex-shrink-0">&#x2715;</span>
                        <span class="truncate">${p.before}</span>
                      </div>
                      <div style="font-size:clamp(10px,1.1vw,13px);" class="font-bold text-white flex items-center gap-1 group-hover:text-${p.color}-300 transition-colors leading-none">
                        <span class="text-emerald-400 font-bold flex-shrink-0">→</span>
                        <span class="truncate">${p.after}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- ── COLONNE DROITE ── -->
          <div class="flex flex-col gap-4 min-h-0">
            <!-- Budget TCO Hero Card -->
            <div class="flex-1 min-h-0 glass-panel rounded-xl p-5 flex flex-col justify-between relative overflow-hidden border-t-[2px] border-emerald-500/70">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>
              <div class="flex items-center justify-between flex-shrink-0 relative">
                <div class="flex items-center gap-2">
                  <span class="w-0.5 h-4 bg-emerald-500 rounded-full flex-shrink-0"></span>
                  <span class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Impact Budgétaire · TCO 5 ans</span>
                </div>
                <span class="text-[8px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-bold text-emerald-400 flex-shrink-0">−74 % Licences</span>
              </div>
              <div class="flex items-end justify-around gap-2 relative">
                <div class="text-center">
                  <div class="text-[8px] text-slate-500 uppercase font-semibold mb-2 tracking-wide">Statu quo VMware</div>
                  <div style="font-size:clamp(26px,3.4vw,48px);" class="font-mono font-extrabold text-red-400 leading-none">441,5k€</div>
                  <div class="text-[7px] text-red-500/40 mt-1 font-mono">TCO 5 ans</div>
                </div>
                <div class="pb-3 text-slate-600 font-bold text-2xl">→</div>
                <div class="text-center">
                  <div class="text-[8px] text-slate-500 uppercase font-semibold mb-2 tracking-wide">Cible Proxmox</div>
                  <div style="font-size:clamp(26px,3.4vw,48px);" class="font-mono font-extrabold text-emerald-400 leading-none">112,0k€</div>
                  <div class="text-[7px] text-emerald-500/40 mt-1 font-mono">TCO 5 ans</div>
                </div>
              </div>
              <div class="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-3 text-center flex-shrink-0 relative">
                <div style="font-size:clamp(16px,2.2vw,28px);" class="font-mono font-extrabold text-emerald-300 leading-none">+ 329 500 €</div>
                <div class="text-[7px] text-emerald-400/50 mt-1 uppercase tracking-wider font-mono">Gain net · ROI &lt; 12 mois · Remises 49 532 €</div>
              </div>
            </div>

            <!-- Cluster + SLAs row -->
            <div class="grid grid-cols-2 gap-4 flex-shrink-0">
              <div class="glass-panel rounded-xl p-4 border-t-[2px] border-purple-500/60">
                <div class="flex items-center gap-1.5 mb-3">
                  <span class="w-0.5 h-3 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span class="text-[8px] font-bold text-purple-400 uppercase tracking-widest">Cluster HA · Capacitaire</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center">
                  ${[['256', 'vCPUs'], ['1,5 To', 'RAM'], ['48 To', 'Ceph SSD']].map(([v, l]) => `
                    <div>
                      <div style="font-size:clamp(13px,1.6vw,20px);" class="metric-value">${v}</div>
                      <div class="text-[7px] text-slate-500 uppercase mt-0.5 tracking-wide">${l}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="text-[7px] text-purple-300/40 text-center mt-2 font-mono">2× R760 + 2× R730 · Strasbourg</div>
              </div>
              <div class="glass-panel rounded-xl p-4 border-t-[2px] border-blue-500/60">
                <div class="flex items-center gap-1.5 mb-3">
                  <span class="w-0.5 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span class="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Résilience · SLAs PRA</span>
                </div>
                <div class="grid grid-cols-2 gap-3 text-center">
                  ${[["< 5'", 'RTO Reprise'], ['< 1h', 'RPO Perte Max']].map(([v, l]) => `
                    <div>
                      <div style="font-size:clamp(13px,1.6vw,20px);" class="metric-value">${v}</div>
                      <div class="text-[7px] text-slate-500 uppercase mt-0.5 tracking-wide">${l}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="text-[7px] text-blue-300/40 text-center mt-2 font-mono">PBS répliqué Stras.→Nantes HDS</div>
              </div>
            </div>

            <!-- HDS Compliance -->
            <div class="flex-shrink-0 glass-panel rounded-xl p-3 border-t-[2px] border-blue-400/40">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-0.5 h-3 bg-blue-400 rounded-full flex-shrink-0"></span>
                  <span class="text-[8px] font-bold text-blue-300 uppercase tracking-widest">Conformité HDS v2 · Activités 1 à 6</span>
                </div>
                <span class="text-[8px] text-emerald-400 font-mono font-bold">Certifié</span>
              </div>
              <div class="grid grid-cols-3 gap-1">
                ${hdsItems.map(([l, s, c]) => `
                  <div class="flex items-center justify-between bg-slate-900/40 rounded px-1.5 py-1 gap-1">
                    <span class="text-[7px] text-slate-400 truncate leading-none">${l}</span>
                    <span class="text-${c}-400 font-bold text-[7px] flex-shrink-0">${s}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- ════ FOOTER HERO STRIP ════ -->
        <div class="flex-shrink-0 grid grid-cols-4 gap-3">
          ${footerMetrics.map(m => `
            <div class="glass-panel rounded-xl px-4 py-3 flex items-center gap-3 hover:border-${m.color}-500/20 transition-all">
              <div class="w-8 h-8 rounded-lg bg-${m.color}-500/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-${m.color}-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${m.icon}</svg>
              </div>
              <div class="min-w-0">
                <div class="text-[7px] text-slate-500 uppercase tracking-widest leading-none">${m.label}</div>
                <div style="font-size:clamp(11px,1.3vw,16px);" class="font-mono font-extrabold text-${m.color}-300 leading-tight mt-0.5">${m.value}</div>
                <div class="text-[6px] text-slate-600 mt-0.5 truncate">${m.sub}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════════════════
  // MODE PRÉSENTATION : DÉCOUPAGE MINIMALISTE EN 4 SLIDES
  // ════════════════════════════════════════════════════════════════════════════

  const presSlide2to6 = `
    <div data-pres-slide="2,3,4,5,6" data-pres-label="Périmètre du Projet"
         class="flex-1 min-h-0 flex flex-col justify-center py-2">
      
      <div class="w-full max-w-3xl mx-auto flex flex-col gap-8">

        <!-- ── TITRE ─────────────────────────────────────────────────────────── -->
        <div class="text-center space-y-2.5">
          <h2 class="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Périmètre du Projet
          </h2>
          <div class="w-16 h-[2px] mx-auto bg-slate-700 rounded-full"></div>
        </div>

        <!-- ── CORPS : AVANT / FLÈCHE / APRÈS ───────────────────────────────── -->
        <div class="flex items-stretch gap-10 w-full">

          <!-- AVANT -->
          <div class="flex-1 flex flex-col gap-4">
            <!-- Column Header -->
            <div class="flex items-center gap-2 border-b border-white/10 pb-2.5">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Situation 2022</span>
              <span class="ml-auto text-[10px] font-bold tracking-wider uppercase" style="color: #f87171">Dette Technique</span>
            </div>

            <div class="flex flex-col gap-4 py-2">
              <div class="flex flex-col gap-1">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-slate-100 font-mono">130</span>
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">collaborateurs</span>
                </div>
                <div class="text-[11px] text-slate-500 leading-normal">1 laboratoire principal &middot; 6 centres en Alsace</div>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-slate-100 font-mono">7</span>
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">sites</span>
                </div>
                <div class="text-[11px] text-slate-500 leading-normal">Réseau flat &middot; Aucun cloisonnement VLAN</div>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-red-400/90 font-mono">0%</span>
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">données HDS</span>
                </div>
                <div class="text-[11px] text-red-400/70 leading-normal font-medium">Non-conformité réglementaire &middot; Risque légal</div>
              </div>
            </div>
          </div>

          <!-- TRANSITION INDICATOR (MIDDLE) -->
          <div class="flex-shrink-0 flex flex-col items-center justify-center gap-3 px-2">
            <div class="flex-1 w-px bg-white/10"></div>
            <div class="flex flex-col items-center gap-1.5 select-none">
              <div class="w-7 h-7 rounded-full border border-white/10 bg-slate-900/60 flex items-center justify-center text-slate-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </div>
              <span class="text-[8px] font-bold text-slate-500 uppercase tracking-widest text-center leading-tight">2 ans</span>
            </div>
            <div class="flex-1 w-px bg-white/10"></div>
          </div>

          <!-- APRÈS -->
          <div class="flex-1 flex flex-col gap-4">
            <!-- Column Header -->
            <div class="flex items-center gap-2 border-b border-white/10 pb-2.5">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Cible 2028</span>
              <span class="ml-auto text-[10px] font-bold tracking-wider uppercase" style="color: #34d399">HDS Certifié</span>
            </div>

            <div class="flex flex-col gap-4 py-2">
              <div data-reveal-at="3" class="flex flex-col gap-1 transition-all duration-700 opacity-0">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-white font-mono">380</span>
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">collaborateurs</span>
                </div>
                <div class="text-[11px] text-emerald-400 leading-normal font-medium">+192% &middot; 5 laboratoires &middot; 15 relais</div>
              </div>

              <div data-reveal-at="4" class="flex flex-col gap-1 transition-all duration-700 opacity-0">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-white font-mono">27</span>
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">sites</span>
                </div>
                <div class="text-[11px] text-emerald-400 leading-normal font-medium font-medium">SD-WAN Ubiquiti Magic Site-to-Site</div>
              </div>

              <div data-reveal-at="5" class="flex flex-col gap-1 transition-all duration-700 opacity-0">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-emerald-400 font-mono">100%</span>
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wide">données HDS</span>
                </div>
                <div class="text-[11px] text-emerald-400 leading-normal font-medium">Stockage intégralement certifié HDS v2</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ── BARRE CONTRAINTES BAS ──────────────────────────────────────────── -->
        <div data-reveal-at="6"
             class="grid grid-cols-3 gap-6 opacity-0 transition-opacity duration-700 pt-4 border-t border-white/10">
          
          <div class="flex items-center gap-3">
            <div class="text-amber-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200">450 000 € HT</div>
              <div class="label-subtext font-medium">Budget DAF &middot; Plafond strict</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-blue-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200">HDS v2 &middot; RGPD</div>
              <div class="label-subtext font-medium">Obligation légale &middot; ANS</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-purple-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200">2026 → 2028</div>
              <div class="label-subtext font-medium">Horizon projet &middot; 3 équipiers</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  // Slide 7 : Stratégie de Transformation — reveal mot-clé par mot-clé (étapes locales 7→10)
  // Même fond/fonctionnement que la slide "Périmètre du Projet" : titre + barre,
  // lignes font-mono font-black, accumulation via data-reveal-at.
  const presSlide7 = `
    <div data-pres-slide="7,8,9,10" data-pres-label="Stratégie de Transformation"
         class="flex-1 min-h-0 flex flex-col justify-center py-2">

      <div class="w-full max-w-5xl mx-auto flex flex-col gap-10">

        <!-- ── TITRE ─────────────────────────────────────────────────────────── -->
        <div class="text-center space-y-2.5">
          <h2 class="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Stratégie de Transformation
          </h2>
          <div class="w-16 h-[2px] mx-auto bg-slate-700 rounded-full"></div>
        </div>

        <!-- ── 4 PILIERS — révélés un par un (étapes 7→10) ──────────────────── -->
        <div class="flex flex-col gap-7 mx-auto w-fit">
          ${pillars.map((p, i) => {
            const step = 7 + i;
            const reveal = i === 0 ? '' : `data-reveal-at="${step}" `;
            const hidden = i === 0 ? '' : 'opacity-0 transition-all duration-700 ';
            return `
            <div ${reveal}class="${hidden}flex items-center gap-8">
              <div class="w-56 flex-shrink-0 flex items-center gap-2.5">
                <span class="w-6 h-1 bg-${p.color}-500/50 rounded-full inline-block flex-shrink-0"></span>
                <span class="text-xs font-bold text-${p.color}-400 uppercase tracking-widest">${p.num} · ${p.label}</span>
              </div>
              <div class="flex items-baseline gap-3 flex-1 min-w-0 flex-wrap">
                <span class="text-lg md:text-xl font-mono font-bold text-slate-500 line-through decoration-2 whitespace-nowrap">${p.before}</span>
                <span class="text-slate-600 text-xl flex-shrink-0">→</span>
                <span class="text-xl md:text-2xl font-mono font-black text-white whitespace-nowrap" style="text-shadow: 0 0 15px rgba(255,255,255,0.1)">${p.after}</span>
              </div>
            </div>
            `;
          }).join('')}
        </div>

      </div>
    </div>
  `;

  // Slide "Impact Budgétaire" (étapes locales 11→14) : chiffre choc en hero
  // (visible direct), puis 3 lignes-preuves révélées une par une (TCO, ROI,
  // Budget) — même gabarit mono que "Périmètre du Projet" / "Stratégie de
  // Transformation".
  const presSlide8 = `
    <div data-pres-slide="11,12,13,14" data-pres-label="Impact Budgétaire"
         class="flex-1 min-h-0 flex flex-col justify-center py-2">

      <div class="w-full max-w-5xl mx-auto flex flex-col gap-10">

        <!-- ── TITRE ─────────────────────────────────────────────────────────── -->
        <div class="text-center space-y-2.5">
          <h2 class="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Impact Budgétaire
          </h2>
          <div class="w-16 h-[2px] mx-auto bg-slate-700 rounded-full"></div>
        </div>

        <!-- ── HERO : chiffre choc, visible direct (étape 11) ────────────────── -->
        <div class="text-center space-y-2">
          <div class="text-6xl md:text-7xl font-mono font-black text-emerald-400 tracking-tight whitespace-nowrap"
               style="text-shadow: 0 0 25px rgba(16,185,129,0.35)">
            + 329 500 €
          </div>
          <div class="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">
            économisés sur 5 ans · TCO global du projet
          </div>
        </div>

        <!-- ── 3 LIGNES-PREUVES — révélées une par une (étapes 12→14) ────────── -->
        <div class="flex flex-col gap-7 mx-auto w-fit">

          <div data-reveal-at="12" class="opacity-0 transition-all duration-700 flex items-center gap-8">
            <div class="w-56 flex-shrink-0 flex items-center gap-2.5">
              <span class="w-6 h-1 bg-emerald-500/50 rounded-full inline-block flex-shrink-0"></span>
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">01 · TCO 5 ans</span>
            </div>
            <div class="flex items-baseline gap-3 flex-1 min-w-0 flex-wrap">
              <span class="text-lg md:text-xl font-mono font-bold text-slate-500 line-through decoration-2 whitespace-nowrap">441,5k€</span>
              <span class="text-slate-600 text-xl flex-shrink-0">→</span>
              <span class="text-xl md:text-2xl font-mono font-black text-white whitespace-nowrap" style="text-shadow: 0 0 15px rgba(255,255,255,0.1)">112,0k€</span>
            </div>
          </div>

          <div data-reveal-at="13" class="opacity-0 transition-all duration-700 flex items-center gap-8">
            <div class="w-56 flex-shrink-0 flex items-center gap-2.5">
              <span class="w-6 h-1 bg-blue-500/50 rounded-full inline-block flex-shrink-0"></span>
              <span class="text-xs font-bold text-blue-400 uppercase tracking-widest">02 · ROI</span>
            </div>
            <div class="flex items-baseline gap-3 flex-1 min-w-0 flex-wrap">
              <span class="text-xl md:text-2xl font-mono font-black text-white whitespace-nowrap" style="text-shadow: 0 0 15px rgba(255,255,255,0.1)">&lt; 12 mois</span>
              <span class="text-slate-600 text-xl flex-shrink-0">·</span>
              <span class="text-lg md:text-xl font-mono font-bold text-slate-500 whitespace-nowrap">-74% licences</span>
            </div>
          </div>

          <div data-reveal-at="14" class="opacity-0 transition-all duration-700 flex items-center gap-8">
            <div class="w-56 flex-shrink-0 flex items-center gap-2.5">
              <span class="w-6 h-1 bg-purple-500/50 rounded-full inline-block flex-shrink-0"></span>
              <span class="text-xs font-bold text-purple-400 uppercase tracking-widest">03 · Budget</span>
            </div>
            <div class="flex items-baseline gap-3 flex-1 min-w-0 flex-wrap">
              <span class="text-lg md:text-xl font-mono font-bold text-slate-500 whitespace-nowrap">450 000€</span>
              <span class="text-slate-600 text-xl flex-shrink-0">→</span>
              <span class="text-xl md:text-2xl font-mono font-black text-white whitespace-nowrap" style="text-shadow: 0 0 15px rgba(255,255,255,0.1)">398 733€</span>
              <span class="text-lg md:text-xl font-mono font-bold text-slate-500 whitespace-nowrap">(réserve 11,4%)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  return `${slide1}${presSlide2to6}${presSlide7}${presSlide8}`;
}
