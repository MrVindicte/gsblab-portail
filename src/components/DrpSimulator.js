export default function DrpSimulator(state) {
  const isPres = state.presentationMode;

  // ── MODE PRÉSENTATION — slide visuelle full-screen ──────────────────────────
  if (isPres) {
    return `
      <div data-pres-slide="1,2,3" data-pres-label="Plan de Reprise d'Activité" class="flex-1 min-h-0 w-full overflow-y-auto">
        <style>
          @keyframes drpIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
          .drp-1{animation:drpIn .45s cubic-bezier(.16,1,.3,1) forwards;opacity:0;animation-delay:.1s}
          .drp-2{animation:drpIn .45s cubic-bezier(.16,1,.3,1) forwards;opacity:0;animation-delay:.35s}
          .drp-3{animation:drpIn .45s cubic-bezier(.16,1,.3,1) forwards;opacity:0;animation-delay:.6s}
          .drp-4{animation:drpIn .45s cubic-bezier(.16,1,.3,1) forwards;opacity:0;animation-delay:.85s}
          @keyframes alertBlink{0%,100%{opacity:1}50%{opacity:.3}}
          .drp-alert{animation:alertBlink 1.6s ease-in-out infinite}
          @keyframes drpChainIn{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
          .drp-chain-line{transform-origin:left;animation:drpChainIn .6s ease forwards}
        </style>

        <div class="max-w-6xl w-full mx-auto px-4 py-4 flex flex-col gap-2 justify-center" style="min-height:100%">

          <!-- Header -->
          <div class="flex items-start justify-between shrink-0">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="drp-alert w-2 h-2 rounded-full bg-slate-500"></span>
                <span class="text-[9px] font-mono tracking-[0.28em] uppercase text-slate-500">Plan de Reprise d'Activité · HDS v2 Activité 6</span>
              </div>
              <h2 class="text-[1.9rem] font-extrabold tracking-tight leading-tight text-white">Plan de Reprise d'Activité</h2>
              <p class="text-slate-400 text-[12px] max-w-lg mt-1 leading-snug">Procédures testées garantissant la reprise de toute activité en moins de <b class="text-slate-200">4h</b> après un sinistre majeur sur le Hub Strasbourg.</p>
            </div>
            <div class="flex flex-col items-end gap-1.5 shrink-0">
              <span class="font-mono text-[9px] bg-white/5 text-slate-400 border border-white/10 rounded-lg px-2.5 py-1.5">CRITIQUE · PRIORITÉ 1</span>
              <span class="font-mono text-[9px] text-slate-600">Hub Strasbourg · Site principal</span>
            </div>
          </div>

          <!-- KPI strip — 1 bloc unifié, séparateurs internes -->
          <div class="grid grid-cols-4 gap-0 rounded-xl overflow-hidden shrink-0" style="background:#13141a">
            <div class="drp-1 p-4 text-center border-r border-white/8">
              <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">RTO</div>
              <div class="text-[2.2rem] font-extrabold font-mono text-indigo-300 leading-none">4h</div>
              <div class="text-[10px] text-slate-500 mt-1.5">Reprise d'activité max.</div>
            </div>
            <div class="drp-2 p-4 text-center border-r border-white/8">
              <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">RPO</div>
              <div class="text-[2.2rem] font-extrabold font-mono text-indigo-300 leading-none">1h</div>
              <div class="text-[10px] text-slate-500 mt-1.5">Perte de données max.</div>
            </div>
            <div class="drp-3 p-4 text-center border-r border-white/8">
              <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sites couverts</div>
              <div class="text-[2.2rem] font-extrabold font-mono text-indigo-300 leading-none">27</div>
              <div class="text-[10px] text-slate-500 mt-1.5">Spokes VPN IPsec</div>
            </div>
            <div class="drp-4 p-4 text-center">
              <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Scénarios</div>
              <div class="text-[2.2rem] font-extrabold font-mono text-indigo-300 leading-none">2</div>
              <div class="text-[10px] text-slate-500 mt-1.5">Testés &amp; documentés</div>
            </div>
          </div>

          <!-- Scenarios — reveal at step 2 -->
          <div data-reveal-at="2" class="grid grid-cols-2 gap-3 opacity-0 transition-all duration-700">

            <!-- Scénario A : Ransomware -->
            <div class="rounded-xl overflow-hidden flex flex-col" style="background:#13141a">
              <div class="h-[3px] bg-indigo-500"></div>
              <div class="p-4 flex flex-col gap-3 flex-1">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background:#1e2040">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <div class="text-[11px] font-extrabold text-white">Scénario A — Ransomware</div>
                    <div class="text-[9px] text-slate-500 font-mono">Cyberattaque · propagation active</div>
                  </div>
                </div>
                <div class="flex flex-col gap-1.5 pl-1">
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-indigo-400 font-bold shrink-0">01</span><span class="text-slate-300">Isolation VM infectée sur VLAN 999</span></div>
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-indigo-400 font-bold shrink-0">02</span><span class="text-slate-300">Snapshot figé — cluster Proxmox</span></div>
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-indigo-400 font-bold shrink-0">03</span><span class="text-slate-300">Restauration depuis PBS · snapshot J-1</span></div>
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-indigo-400 font-bold shrink-0">04</span><span class="text-slate-300">Scan EDR + remise en production</span></div>
                </div>
                <div class="mt-auto pt-2 border-t border-white/5">
                  <span class="text-[9px] font-mono text-slate-400">RTO effectif : ~2h30</span>
                </div>
              </div>
            </div>

            <!-- Scénario B : Sinistre physique -->
            <div class="rounded-xl overflow-hidden flex flex-col" style="background:#13141a">
              <div class="h-[3px] bg-amber-500/70"></div>
              <div class="p-4 flex flex-col gap-3 flex-1">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background:#221c0e">
                    <svg class="w-4 h-4 text-amber-400/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div>
                    <div class="text-[11px] font-extrabold text-white">Scénario B — Sinistre Physique</div>
                    <div class="text-[9px] text-slate-500 font-mono">Incendie · destruction totale du Hub</div>
                  </div>
                </div>
                <div class="flex flex-col gap-1.5 pl-1">
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-amber-500/80 font-bold shrink-0">01</span><span class="text-slate-300">Failover DNS AD → contrôleur Nantes</span></div>
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-amber-500/80 font-bold shrink-0">02</span><span class="text-slate-300">Tunnels VPN spokes redirigés sur Nantes</span></div>
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-amber-500/80 font-bold shrink-0">03</span><span class="text-slate-300">Restauration SGL sur R730 standby</span></div>
                  <div class="flex items-center gap-2 text-[10.5px]"><span class="text-amber-500/80 font-bold shrink-0">04</span><span class="text-slate-300">Validation PostgreSQL · 14 321 patients</span></div>
                </div>
                <div class="mt-auto pt-2 border-t border-white/5">
                  <span class="text-[9px] font-mono text-slate-400">RTO effectif : 1h42</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Backup chain — reveal at step 3 -->
          <div data-reveal-at="3" class="opacity-0 transition-all duration-700 shrink-0">
            <div class="rounded-xl p-4" style="background:#13141a">
              <div class="text-[8.5px] font-mono tracking-[0.22em] uppercase text-slate-600 mb-3">Chaîne de sauvegarde 3-2-1-1-0</div>
              <div class="flex items-center gap-0">

                <!-- Node 1 -->
                <div class="flex flex-col items-center gap-1.5 flex-1">
                  <div class="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <svg class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>
                  </div>
                  <div class="text-center">
                    <div class="text-[10px] font-bold text-slate-300">PBS Local</div>
                    <div class="text-[9px] text-slate-500">J-1 incrémental</div>
                    <div class="text-[8.5px] font-mono text-slate-600">Strasbourg</div>
                  </div>
                </div>

                <!-- Arrow -->
                <div class="flex flex-col items-center gap-0.5 px-1">
                  <div class="drp-chain-line h-px w-12 bg-slate-600/60" style="animation-delay:.2s"></div>
                  <div class="text-[8px] text-slate-700 font-mono">hebdo</div>
                </div>

                <!-- Node 2 -->
                <div class="flex flex-col items-center gap-1.5 flex-1">
                  <div class="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <svg class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>
                  </div>
                  <div class="text-center">
                    <div class="text-[10px] font-bold text-slate-300">PBS Nantes</div>
                    <div class="text-[9px] text-slate-500">Hebdomadaire</div>
                    <div class="text-[8.5px] font-mono text-slate-600">Site de secours</div>
                  </div>
                </div>

                <!-- Arrow -->
                <div class="flex flex-col items-center gap-0.5 px-1">
                  <div class="drp-chain-line h-px w-12 bg-slate-600/60" style="animation-delay:.5s"></div>
                  <div class="text-[8px] text-slate-700 font-mono">mensuel</div>
                </div>

                <!-- Node 3 -->
                <div class="flex flex-col items-center gap-1.5 flex-1">
                  <div class="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <svg class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
                  </div>
                  <div class="text-center">
                    <div class="text-[10px] font-bold text-slate-300">OVHcloud HDS</div>
                    <div class="text-[9px] text-slate-500">Object Storage</div>
                    <div class="text-[8.5px] font-mono text-slate-600">Cold Archive</div>
                  </div>
                </div>

                <!-- Immuable badge -->
                <div class="ml-4 flex flex-col items-center gap-1.5">
                  <div class="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <svg class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div class="text-center">
                    <div class="text-[10px] font-bold text-slate-200">3-2-1-1-0</div>
                    <div class="text-[9px] text-slate-500">Immuable</div>
                    <div class="text-[8.5px] font-mono text-slate-600">0 erreur</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ── MODE NORMAL ──────────────────────────────────────────────────────────────
  if (state.activeCrisis === 'none') {
    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Title -->
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Simulateur de Secours & Reprise après Sinistre (DRP / PRA)
          </h2>
          <p class="text-slate-400 text-sm">
            Simulez en temps réel une cyberattaque ou un incendie sur le Hub central de Strasbourg et validez le plan de secours HDS.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Ransomware Box -->
          <div data-pres-step="1" class="glass-panel rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-red-500/20 transition duration-200">
            <div class="space-y-2">
              <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 class="text-lg font-bold text-white">Scénario A : Infection Ransomware</h3>
              <p class="text-sm text-slate-400 leading-relaxed">
                Le ransomware se propage à partir d'un poste client du siège et commence à chiffrer les partages de fichiers. L'objectif est d'isoler le Hub, de figer le cluster Proxmox, de restaurer depuis le PBS et de valider la VM en quarantaine.
              </p>
            </div>
            <button
              id="btn-start-ransomware"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            >
              Lancer la simulation Ransomware
            </button>
          </div>

          <!-- Fire Box -->
          <div data-pres-step="2" class="glass-panel rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-orange-500/20 transition duration-200">
            <div class="space-y-2">
              <div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3 class="text-lg font-bold text-white">Scénario B : Incendie Hub Strasbourg</h3>
              <p class="text-sm text-slate-400 leading-relaxed">
                Une panne majeure de climatisation provoque un incendie dans la salle serveur de Strasbourg, entraînant une destruction physique totale. L'objectif est de déclencher le PRA, de failover le DNS AD et de remonter le SGL sur le site standby de Nantes.
              </p>
            </div>
            <button
              id="btn-start-fire"
              class="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            >
              Lancer la simulation Incendie
            </button>
          </div>

        </div>
      </div>
    `;
  }

  const currentSteps = state.activeCrisis === 'ransomware' ? ransomwareSteps : fireSteps;
  const currentStepData = currentSteps[state.crisisStep];

  const stepsIndicators = currentSteps.map((_, i) => `
    <div class="h-1.5 flex-1 rounded-full transition-all ${
      i <= state.crisisStep ? 'bg-red-500' : 'bg-slate-800'
    }"></div>
  `).join('');

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Title -->
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Simulateur de Secours & Reprise après Sinistre (DRP / PRA)
        </h2>
        <p class="text-slate-400 text-sm">
          Simulez en temps réel une cyberattaque ou un incendie sur le Hub central de Strasbourg et validez le plan de secours HDS.
        </p>
      </div>

      <!-- Active Crisis Simulation -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Timeline & Steps (Left) -->
        <div data-pres-step="1" class="lg:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-white/5 pb-2">
              <span class="text-xs font-bold text-red-400 uppercase tracking-wide flex items-center gap-1.5 animate-pulse">
                SIMULATION ACTIVE
              </span>
              <span class="text-xs text-slate-500">Étape ${state.crisisStep + 1} / ${currentSteps.length}</span>
            </div>
            
            <div class="space-y-1">
              <h3 class="text-base font-bold text-white">${currentStepData.title}</h3>
              <p class="text-xs text-slate-400 leading-relaxed">${currentStepData.desc}</p>
            </div>

            <!-- Steps indicators -->
            <div class="flex items-center gap-2 pt-2">
              ${stepsIndicators}
            </div>
          </div>

          <button
            id="btn-next-crisis-step"
            class="w-full mt-6 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
              state.crisisStep === currentSteps.length - 1 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }"
          >
            ${currentStepData.btnText}
          </button>
        </div>

        <!-- Terminal Output (Right) -->
        <div data-pres-step="2" class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            Console Trace d'Exécution & Journaux
          </h3>
          
          <div class="bg-slate-950 rounded-lg p-4 font-mono text-[10px] text-slate-300 overflow-y-auto h-[240px] border border-white/5 whitespace-pre-wrap flex-grow" id="terminal-logs">
            ${currentStepData.log}
          </div>

          <div class="flex justify-between items-center text-[9px] text-slate-500 mt-3 border-t border-white/5 pt-2">
            <span>Nœud affecté : ${state.activeCrisis === 'ransomware' ? 'SRV-STR-SGL-01' : 'HUB-STR-ROUT-01'}</span>
            <span>Conforme référentiel HDS Activité 6</span>
          </div>
        </div>

      </div>

    </div>
  `;
}

const ransomwareSteps = [
  {
    title: "Détection & Alerte",
    desc: "L'EDR ESET signale un comportement de type ransomware sur le serveur de fichiers Strasbourg (VM 104). Des fichiers .crypt apparaissent.",
    log: "[ALERTE] EDR ESET - Menace active détectée sur VM-104 (IP: 10.100.10.104).\n[LOG] Fichiers chiffrés détectés : /data/partage/*.crypt.\n[CRITIQUE] Risque d'accès latéral aux bases de données du SGL.",
    btnText: "Lancer le confinement réseau"
  },
  {
    title: "Confinement Réseau",
    desc: "Lancement des scripts CLI sur le FortiGate de Strasbourg. Les liaisons VPN des 17 spokes sont immédiatement coupées pour protéger les centres.",
    log: "# Connexion SSH sur FW-STR-EDGE-01...\n# config firewall policy\n# edit 15 (VPN-SPOKES)\n# set status disable\n# next\n# end\n[INFO] Tunnels VPN IPsec vers les 17 centres d'Alsace désactivés.\n[STATUT] Strasbourg isolé du réseau d'entreprise.",
    btnText: "Arrêter les hyperviseurs et isoler les VM"
  },
  {
    title: "Arrêt Forcé & Purge",
    desc: "Les VMs suspectes et le stockage partagé Ceph de production sont arrêtés de force sur le cluster Proxmox pour figer l'environnement.",
    log: "# Connexion SSH sur pve01 (10.100.99.11)...\n# qm stop 104 --skiplock 1\n[OK] Machine virtuelle de fichiers arrêtée.\n# qm stop 101 --skiplock 1\n[OK] Machine SGL Medoc arrêtée.\n[LOG] Wiping et réinitialisation des disques virtuels de production.",
    btnText: "Restaurer depuis le Proxmox Backup Server"
  },
  {
    title: "Restauration PBS",
    desc: "Restauration complète de la dernière sauvegarde incrémentale saine effectuée à 2:00 du matin sur le stockage dédupliqué et protégé.",
    log: "# Recherche snapshot immuable PBS du 31/05/2026 à 02:00...\n[OK] Snapshot valide trouvé.\n# qmrestore pbs-storage:backup/vm-101-2026_05_31T02_00_00Z 101 --force 1\n[LOG] Copie de 120 Go d'image système en cours...\n[INFO] Restauration terminée à 100%.",
    btnText: "Valider en quarantaine avant démarrage"
  },
  {
    title: "Validation & Remise en Route",
    desc: "La VM restaurée est démarrée dans un VLAN de quarantaine (VLAN 999) pour exécuter un scan EDR approfondi et valider Postgres. Si valide, retour en prod.",
    log: "# Brancher l'interface de la VM 101 sur le VLAN 999...\n# qm set 101 --net0 virtio,bridge=vmbr0,tag=999\n# qm start 101\n# Lancement du scan de sécurité ESET sur la base medoc_db...\n[INFO] Menace : 0 détectée.\n# Remise en production de la VM 101 (VLAN 10)...\n# Réactivation de la règle de pare-feu VPN Spokes.\n[SUCCÈS] Reprise d'activité complète du SGL.",
    btnText: "Terminer la simulation"
  }
];

const fireSteps = [
  {
    title: "Alerte Destruction Hub",
    desc: "Un incendie détruit intégralement la salle serveur principale du siège de Strasbourg. Toutes les liaisons physiques tombent en timeout.",
    log: "[ALERTE] Timeout complet de la passerelle 154.32.23.154.\n[CRITIQUE] Panne totale d'alimentation et rupture réseau à Strasbourg.\n[INFO] RTO cible pour bascule vers le site de secours : 2 Heures.",
    btnText: "Déclencher le plan de secours et le failover DNS"
  },
  {
    title: "Failover DNS & Routage WAN",
    desc: "Mise à jour des enregistrements DNS internes sur le contrôleur de Nantes et réactivation des tunnels VPN secondaires des 17 centres.",
    log: "# Connexion AD Nantes en PowerShell...\n# Set-DnsServerResourceRecordA -Name \"sgl\" -ZoneName \"gsblab.local\" -OldRecordData \"10.100.10.10\" -NewRecordData \"10.200.10.10\"\n# repadmin /syncall /AePdq\n[OK] Mise à jour DNS propagée. Les spokes ciblent désormais Nantes.",
    btnText: "Provisionner les VM et restaurer sur cluster de secours"
  },
  {
    title: "Restauration Nantes (R730)",
    desc: "Puisque Strasbourg est physiquement détruit, restauration des VMs du SGL et de l'AD depuis le serveur PBS secondaire de Nantes.",
    log: "# Connexion SSH sur hyperviseur de secours Nantes (10.200.99.10)...\n# qmstart 200 (Contrôleur de Domaine Standby)\n[OK] AD-Nantes en cours d'exécution.\n# qmrestore pbs-standby:backup/vm-101-2026_05_30 101 --force 1\n# qm set 101 --net0 virtio,bridge=vmbr0,tag=210 (VLAN Production Nantes)\n# qm start 101\n[OK] SGL Medoc actif sur serveur R730.",
    btnText: "Re-router les flux réseau FortiGate Spokes"
  },
  {
    title: "Rétablissement Réseau Spokes",
    desc: "Les tunnels VPN de secours configurés sur les FortiGate 40F des 17 spokes s'activent pour rediriger le trafic vers le routeur de Nantes.",
    log: "# Modification de la priorité de routage statique sur les spokes...\n# config router static\n# edit 1 (Strasbourg) -> set distance 20 (priorité basse)\n# edit 2 (Nantes Secours) -> set distance 10 (priorité haute)\n# end\n[OK] Tunnel IPsec active vers Nantes (IP: 195.12.32.12).\n[STATUT] Liaison réseau active pour les 17 centres.",
    btnText: "Vérifier l'intégrité métier"
  },
  {
    title: "Validation Métier & Mode Dégradé",
    desc: "Validation finale de l'accès SGL à Nantes, test d'écriture sur la base de données PostgreSQL, et synchronisation avec les équipes.",
    log: "# Requête test Postgres depuis Nantes...\n# psql -h 10.200.10.10 -d medoc_db -c \"SELECT count(*) FROM patients;\"\n[RÉSULTAT] 14 321 fiches patients détectées.\n[OK] Lecture/Écriture validée.\n[INFO] Cellule de crise : Mode secours validé. RTO effectif : 1h42.",
    btnText: "Terminer la simulation"
  }
];

export function bindDrpEvents(state, renderApp) {
  if (state.activeCrisis === 'none') {
    const btnRans = document.getElementById('btn-start-ransomware');
    const btnFire = document.getElementById('btn-start-fire');

    btnRans.addEventListener('click', () => {
      state.activeCrisis = 'ransomware';
      state.crisisStep = 0;
      if (state.presentationMode) state.presentationStep = 1;
      renderApp();
    });

    btnFire.addEventListener('click', () => {
      state.activeCrisis = 'fire';
      state.crisisStep = 0;
      if (state.presentationMode) state.presentationStep = 1;
      renderApp();
    });
  } else {
    const btnNext = document.getElementById('btn-next-crisis-step');
    const currentSteps = state.activeCrisis === 'ransomware' ? ransomwareSteps : fireSteps;

    btnNext.addEventListener('click', () => {
      if (state.crisisStep < currentSteps.length - 1) {
        state.crisisStep += 1;
        if (state.presentationMode) state.presentationStep = 1;
        renderApp();
      } else {
        state.activeCrisis = 'none';
        state.crisisStep = 0;
        if (state.presentationMode) state.presentationStep = 1;
        renderApp();
      }
    });
  }
}
