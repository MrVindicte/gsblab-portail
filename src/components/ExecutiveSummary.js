export default function ExecutiveSummary(state) {
  const kpis = [
    {
      title: 'Utilisateurs Actifs',
      value: state.usersCount,
      desc: 'Laptops & boites mails',
      icon: `<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Laboratoires (Spokes)',
      value: state.sitesCount,
      desc: 'Tunnels VPN actifs',
      icon: `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Serveurs Physiques HA',
      value: state.serversCount,
      desc: 'Dell R760/R730 Strasbourg',
      icon: `<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
      bg: 'bg-purple-500/10'
    }
  ];

  const renderedKpis = kpis.map((kpi, idx) => `
    <div data-pres-step="${idx + 3}" data-pres-label="${kpi.title}" class="glass-panel rounded-xl p-4 flex items-center justify-between transition duration-200 hover:border-white/15">
      <div class="space-y-1.5">
        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">${kpi.title}</span>
        <div class="text-3xl font-mono font-extrabold text-white leading-none">${kpi.value}</div>
        <p class="text-xs text-slate-400 font-medium">${kpi.desc}</p>
      </div>
      <div class="w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center flex-shrink-0 shadow-inner">
        ${kpi.icon}
      </div>
    </div>
  `).join('');

  // 4th KPI Card (HDS Compliance Dial)
  const hdsKpiCard = `
    <div data-pres-step="6" data-pres-label="Conformité HDS v2" class="glass-panel rounded-xl p-4 flex items-center justify-between transition duration-200 hover:border-white/15">
      <div class="space-y-1.5">
        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Conformité HDS v2</span>
        <div class="text-3xl font-mono font-extrabold text-white leading-none">95%</div>
        <p class="text-xs text-emerald-400 font-semibold">Certifié — Act. 1 à 6</p>
      </div>
      <div class="w-10 h-10 flex items-center justify-center relative flex-shrink-0">
        <svg class="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" class="stroke-slate-800" stroke-width="4" fill="transparent" />
          <circle cx="18" cy="18" r="15" class="stroke-emerald-500 animate-dial [filter:drop-shadow(0_0_2px_rgba(16,185,129,0.5))]" stroke-width="4" fill="transparent" stroke-dasharray="94.2" stroke-dashoffset="94.2" />
        </svg>
        <div class="absolute text-[8px] font-bold text-emerald-400 font-mono">95%</div>
      </div>
    </div>
  `;

  const isIntroStep = state.presentationMode && state.presentationStep === 1;

  const introSlideHtml = `
    <div id="pres-intro-slide" data-pres-step="1" class="${isIntroStep ? 'flex' : 'hidden'} flex-col items-center justify-center text-center space-y-8 no-print" style="height: calc(100vh - var(--layout-chrome, 130px));">
      
      <!-- Glowing tag -->
      <div class="flex items-center bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-slate-300 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
        <span>MASTÈRE 2IC</span>
        <span class="mx-2 text-slate-600">/</span>
        <span class="text-blue-400">GRP.01</span>
      </div>

      <!-- Title -->
      <div class="space-y-4 max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight font-display">
          GSBLAB : PORTAIL DÉCISIONNEL
        </h1>
        <p class="text-sm md:text-base text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
          Soutenance de Projet : Plan de Transition Technologique, Chiffrage TCO & Simulation de Résilience HDS v2
        </p>
      </div>

      <div class="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>

      <!-- Credits -->
      <div class="grid grid-cols-3 gap-6 max-w-lg w-full pt-4">
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <span class="text-white font-bold block text-sm">Romain</span>
          <span class="text-[9px] text-slate-500 uppercase font-semibold mt-1 block">Chiffrage & PMO</span>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <span class="text-white font-bold block text-sm">Jérôme</span>
          <span class="text-[9px] text-slate-500 uppercase font-semibold mt-1 block">Portail & Doc</span>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <span class="text-white font-bold block text-sm">Léo</span>
          <span class="text-[9px] text-slate-500 uppercase font-semibold mt-1 block">Architecture & IaC</span>
        </div>
      </div>

      <div class="text-[10px] text-slate-500 font-mono tracking-widest uppercase animate-pulse pt-8 select-none">
        Appuyez sur Espace ou Flèche Droite pour démarrer la présentation
      </div>

    </div>
  `;

  const dashboardHtml = `
    <div id="pres-dashboard" class="${isIntroStep ? 'hidden' : 'space-y-6 pb-2'}">
      
      <!-- Title & Intro -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold tracking-tight text-white">
              Synthèse Générale du Projet
            </h2>
            <div class="flex items-center bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider text-slate-300">
              <span>2IC</span>
              <span class="mx-1.5 text-slate-500">/</span>
              <span class="text-blue-400">GRP.01</span>
            </div>
          </div>
          <p class="text-slate-500 text-xs mt-0.5">
            Tableau de bord de pilotage d'architecture - Vue synthétique pour l'oral de soutenance.
          </p>
        </div>
      </div>

      <!-- Section: L'Équipe Projet (Step 2) -->
      <div data-pres-step="2" data-pres-label="Équipe Projet G01" class="space-y-3">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span class="w-1.5 h-3 bg-blue-500 rounded"></span>
          Présentation de l'Équipe & Rôles
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Romain Card -->
          <div class="glass-panel rounded-xl p-4 border-t-[3px] border-emerald-500/80 flex flex-col justify-between min-h-[140px] relative overflow-hidden group">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-xs shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                  R
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white leading-tight">Romain</h4>
                  <span class="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider mt-0.5 inline-block">
                    PMO & Chiffrage TCO
                  </span>
                </div>
              </div>
              <div class="space-y-1 text-slate-400 text-[10px] pl-1 leading-normal">
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Modélisation financière du TCO sur 5 ans</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Planification PMO & Jalons de transition</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Registre des risques & Plan de remédiation</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Jérôme Card -->
          <div class="glass-panel rounded-xl p-4 border-t-[3px] border-blue-500/80 flex flex-col justify-between min-h-[140px] relative overflow-hidden group">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-xs shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                  J
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white leading-tight">Jérôme</h4>
                  <span class="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider mt-0.5 inline-block">
                    Portail & Documentation
                  </span>
                </div>
              </div>
              <div class="space-y-1 text-slate-400 text-[10px] pl-1 leading-normal">
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Conception & dev du portail décisionnel</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Consolidation de la documentation technique</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Rédaction des livrables de soutenance</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Léo Card -->
          <div class="glass-panel rounded-xl p-4 border-t-[3px] border-red-500/80 flex flex-col justify-between min-h-[140px] relative overflow-hidden group">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center font-bold text-red-400 text-xs shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                  L
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white leading-tight">Léo</h4>
                  <span class="text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider mt-0.5 inline-block">
                    Architecture & IaC
                  </span>
                </div>
              </div>
              <div class="space-y-1 text-slate-400 text-[10px] pl-1 leading-normal">
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Design Proxmox VE HA & Stockage Ceph</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Cadre réglementaire HDS & DRP/PRA</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Modélisation réseau & automatisation IaC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Indicateurs Clés (Step 3 to 6) -->
      <div class="space-y-3">
        <h3 data-pres-step="3" data-pres-label="Indicateurs Clés" class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span class="w-1.5 h-3 bg-emerald-500 rounded"></span>
          Indicateurs Clés & Métriques d'Infrastructure
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${renderedKpis}
          ${hdsKpiCard}
        </div>
      </div>

      <!-- Section: Matrice de Décisions (Step 7 to 10) -->
      <div class="space-y-3">
        <h3 data-pres-step="7" data-pres-label="Matrice de Décisions" class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span class="w-1.5 h-3 bg-blue-500 rounded"></span>
          Matrice de Transition (Dette Technique vs Cible HDS)
        </h3>
        <div data-pres-step="7" class="glass-panel rounded-xl p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <!-- Pilier 1 -->
            <div data-pres-step="7" data-pres-label="01. Virtualisation" class="bg-slate-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group min-h-[110px]">
              <div class="space-y-2">
                <div class="text-[9px] font-bold text-blue-400 uppercase tracking-widest">01. Virtualisation</div>
                <div class="text-xs text-red-400 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  ESXi 6.0 (Dette)
                </div>
                <div class="text-sm font-bold text-white flex items-center gap-1.5 group-hover:text-blue-300 transition">
                  <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  Proxmox VE HA
                </div>
              </div>
            </div>

            <!-- Pilier 2 -->
            <div data-pres-step="8" data-pres-label="02. Stockage (Ceph)" class="bg-slate-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300 group min-h-[110px]">
              <div class="space-y-2">
                <div class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">02. Stockage</div>
                <div class="space-y-1">
                  <div class="text-xs text-red-400 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    SAN SAS (SPOF)
                  </div>
                  <div class="text-sm font-bold text-white flex items-center gap-1.5 group-hover:text-emerald-300 transition">
                    <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    Cluster Ceph 3x
                  </div>
                </div>
              </div>
            </div>

            <!-- Pilier 3 -->
            <div data-pres-step="9" data-pres-label="03. Sécurité Flux" class="bg-slate-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 group min-h-[110px]">
              <div class="space-y-2">
                <div class="text-[9px] font-bold text-purple-400 uppercase tracking-widest">03. Sécurité Flux</div>
                <div class="space-y-1">
                  <div class="text-xs text-red-400 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    Flat Net sans FW
                  </div>
                  <div class="text-sm font-bold text-white flex items-center gap-1.5 group-hover:text-purple-300 transition">
                    <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    VLANs + FortiGate
                  </div>
                </div>
              </div>
            </div>

            <!-- Pilier 4 -->
            <div data-pres-step="10" data-pres-label="04. Sauvegardes PBS" class="bg-slate-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/20 transition-all duration-300 group min-h-[110px]">
              <div class="space-y-2">
                <div class="text-[9px] font-bold text-red-400 uppercase tracking-widest">04. Sauvegardes</div>
                <div class="space-y-1">
                  <div class="text-xs text-red-400 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    Bandes manuelles LTO
                  </div>
                  <div class="text-sm font-bold text-white flex items-center gap-1.5 group-hover:text-red-300 transition">
                    <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    PBS Immuable (DRP)
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Section: Viabilité & Résilience (Step 11 to 13) -->
      <div class="space-y-3">
        <h3 data-pres-step="11" class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span class="w-1.5 h-3 bg-purple-500 rounded"></span>
          Viabilité Financière, Dimensionnement & SLAs
        </h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          <!-- ROI & Économies Financières -->
          <div data-pres-step="11" data-pres-label="Impact Budgétaire (TCO)" class="glass-panel rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
            <div class="flex items-center justify-between border-b border-white/5 pb-2">
              <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Impact Budgétaire (TCO sur 5 ans)
              </span>
              <span class="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">-74% Licences</span>
            </div>
            <div class="flex items-center justify-around py-2">
              <div class="text-center">
                <span class="text-[8px] text-slate-500 uppercase font-semibold">Statu quo VMware</span>
                <div class="text-base font-mono font-bold text-red-400 mt-0.5">441,5 k€</div>
              </div>
              <div class="text-slate-700 text-xs font-bold font-mono">VS</div>
              <div class="text-center">
                <span class="text-[8px] text-slate-500 uppercase font-semibold">Cible Proxmox (Cible)</span>
                <div class="text-base font-mono font-bold text-emerald-400 mt-0.5">112,0 k€</div>
              </div>
            </div>
            <div class="text-center bg-emerald-500/5 border border-emerald-500/10 rounded-lg py-1 px-2 text-[10px] text-emerald-400 font-semibold font-mono">
              Gain net : +329 500 € (ROI &lt; 12 mois)
            </div>
          </div>

          <!-- Capacitaire & Sizing Technique -->
          <div data-pres-step="12" data-pres-label="Sizing du Cluster HA" class="glass-panel rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300">
            <div class="flex items-center justify-between border-b border-white/5 pb-2">
              <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                Sizing du Cluster (Capacitaire Cible)
              </span>
              <span class="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-mono font-bold">4 Serveurs HA</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center py-2">
              <div>
                <span class="text-[8px] text-slate-500 uppercase block font-semibold">Compute</span>
                <span class="text-sm font-mono font-bold text-white">256 vCPUs</span>
              </div>
              <div>
                <span class="text-[8px] text-slate-500 uppercase block font-semibold">Mémoire</span>
                <span class="text-sm font-mono font-bold text-white">1,5 To RAM</span>
              </div>
              <div>
                <span class="text-[8px] text-slate-500 uppercase block font-semibold">Ceph SSD</span>
                <span class="text-sm font-mono font-bold text-white">48 To raw</span>
              </div>
            </div>
            <div class="text-center bg-purple-500/5 border border-purple-500/10 rounded-lg py-1 px-2 text-[10px] text-purple-300 font-semibold font-mono">
              Proxmox VE HA &amp; Stockage Ceph
            </div>
          </div>

          <!-- SLAs & RPO/RTO Secours -->
          <div data-pres-step="13" data-pres-label="SLAs & RTO / RPO" class="glass-panel rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
            <div class="flex items-center justify-between border-b border-white/5 pb-2">
              <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                Indicateurs de Résilience (SLA)
              </span>
              <span class="text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono font-bold">PRA Activé</span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-center py-2">
              <div>
                <span class="text-[8px] text-slate-500 uppercase block font-semibold">RTO (Reprise)</span>
                <span class="text-sm font-mono font-bold text-white">&lt; 5 minutes</span>
              </div>
              <div>
                <span class="text-[8px] text-slate-500 uppercase block font-semibold">RPO (Perte Max)</span>
                <span class="text-sm font-mono font-bold text-white">&lt; 1 heure</span>
              </div>
            </div>
            <div class="text-center bg-blue-500/5 border border-blue-500/10 rounded-lg py-1 px-2 text-[10px] text-blue-300 font-semibold font-mono">
              Sauvegardes PBS répliquées vers Nantes
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return `
    ${introSlideHtml}
    ${dashboardHtml}
  `;
}
