export default function DrpSimulator(state) {
  const isPres = state.presentationMode;

  // ── MODE PRÉSENTATION — slide visuelle full-screen ──────────────────────────
  if (isPres) {
    return `
      <div data-pres-slide="1" data-pres-label="Plan de Reprise d'Activité"
           class="flex-1 min-h-0 flex flex-col items-center justify-center gap-8 w-full max-w-6xl mx-auto h-full py-6">

        <div class="text-center space-y-3">
          <h2 class="text-5xl font-extrabold text-red-400 tracking-tight font-display">Plan de Reprise d'Activité</h2>
          <div class="w-16 h-1.5 bg-red-500 mx-auto rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]"></div>
          <p class="text-slate-400 text-sm">Hub Strasbourg — Conformité HDS v2 Activité 6</p>
        </div>

        <div class="grid grid-cols-3 gap-6 w-full">
          <div class="glass-panel rounded-3xl p-8 border-l-[6px] border-l-emerald-500 flex flex-col items-center justify-center text-center bg-slate-900/60 shadow-xl">
            <span class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">RTO</span>
            <div class="text-6xl font-mono font-extrabold text-emerald-400 leading-none">4h</div>
            <div class="text-slate-400 text-sm mt-3">Reprise d'activité max.</div>
          </div>
          <div class="glass-panel rounded-3xl p-8 border-l-[6px] border-l-blue-500 flex flex-col items-center justify-center text-center bg-slate-900/60 shadow-xl">
            <span class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">RPO</span>
            <div class="text-6xl font-mono font-extrabold text-blue-400 leading-none">1h</div>
            <div class="text-slate-400 text-sm mt-3">Perte de données max.</div>
          </div>
          <div class="glass-panel rounded-3xl p-8 border-l-[6px] border-l-indigo-500 flex flex-col items-center justify-center text-center bg-slate-900/60 shadow-xl">
            <span class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Sites couverts</span>
            <div class="text-6xl font-mono font-extrabold text-indigo-400 leading-none">27</div>
            <div class="text-slate-400 text-sm mt-3">Spokes VPN IPsec</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 w-full">
          <div class="glass-panel rounded-2xl p-6 border-l-[5px] border-l-red-500 flex items-start gap-4 bg-slate-900/60">
            <div class="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div class="text-lg font-bold text-white mb-1">Scénario A — Ransomware</div>
              <div class="text-slate-400 text-sm">Isolation VM · Snapshot Proxmox · Restauration PBS · Quarantaine VLAN 999</div>
            </div>
          </div>
          <div class="glass-panel rounded-2xl p-6 border-l-[5px] border-l-amber-500 flex items-start gap-4 bg-slate-900/60">
            <div class="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <div class="text-lg font-bold text-white mb-1">Scénario B — Sinistre Physique</div>
              <div class="text-slate-400 text-sm">Failover DNS AD · Restoration R730 Nantes · Bascule OVH HDS hors-site</div>
            </div>
          </div>
        </div>

        <div class="w-full glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-center gap-3 bg-emerald-500/5 border border-emerald-500/20">
          <span class="text-emerald-400 text-sm font-bold uppercase tracking-wider">Chaîne de sauvegarde :</span>
          <span class="font-mono text-xs text-slate-300 bg-slate-900/60 border border-white/8 rounded px-2.5 py-1">PBS Local · J-1 incrémental</span>
          <span class="text-slate-600 font-bold">→</span>
          <span class="font-mono text-xs text-slate-300 bg-slate-900/60 border border-white/8 rounded px-2.5 py-1">PBS Nantes · hebdomadaire</span>
          <span class="text-slate-600 font-bold">→</span>
          <span class="font-mono text-xs text-slate-300 bg-slate-900/60 border border-white/8 rounded px-2.5 py-1">OVH Object Storage HDS · mensuel</span>
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
