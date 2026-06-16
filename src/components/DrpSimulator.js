export default function DrpSimulator(state) {
  if (state.activeCrisis === 'none') {
    return `
      <div data-pres-slide="1,2,3" data-pres-label="Dispositif PRA & Continuité" class="h-full w-full flex flex-col font-sans animate-fade-in text-slate-300">
        <!-- Top Header -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <div class="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-slate-400"></span>
              Plan de Reprise d'Activité · HDS V2 Activité 6
            </div>
            <h1 class="text-4xl font-bold tracking-tight text-white mb-2">Plan de Reprise d'Activité</h1>
            <p class="text-slate-400 text-sm max-w-xl leading-relaxed">
              Procédures testées garantissant la reprise de toute activité en moins de 4h après un sinistre majeur sur le Hub Strasbourg.
            </p>
          </div>
          <div class="text-right">
            <div class="inline-block border border-slate-700/50 rounded px-3 py-1.5 text-[10px] font-mono tracking-widest text-slate-300 mb-2">
              CRITIQUE - PRIORITÉ 1
            </div>
            <div class="text-[10px] font-mono text-slate-500">Hub Strasbourg · Site principal</div>
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="grid grid-cols-4 gap-[1px] bg-slate-800/60 rounded-xl overflow-hidden mb-6 border border-slate-800/60">
          <div class="bg-[#13141a] p-6 flex flex-col items-center justify-center">
            <div class="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">RTO</div>
            <div class="text-4xl font-bold text-indigo-300 mb-2">4h</div>
            <div class="text-[10px] text-slate-500">Reprise d'activité max.</div>
          </div>
          <div class="bg-[#13141a] p-6 flex flex-col items-center justify-center">
            <div class="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">RPO</div>
            <div class="text-4xl font-bold text-slate-200 mb-2">1h</div>
            <div class="text-[10px] text-slate-500">Perte de données max.</div>
          </div>
          <div class="bg-[#13141a] p-6 flex flex-col items-center justify-center">
            <div class="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">Sites Couverts</div>
            <div class="text-4xl font-bold text-slate-200 mb-2">27</div>
            <div class="text-[10px] text-slate-500">Spokes VPN IPsec</div>
          </div>
          <div class="bg-[#13141a] p-6 flex flex-col items-center justify-center">
            <div class="text-[10px] font-bold text-slate-400 tracking-widest mb-2 uppercase">Scénarios</div>
            <div class="text-4xl font-bold text-slate-200 mb-2">2</div>
            <div class="text-[10px] text-slate-500">Testés & documentés</div>
          </div>
        </div>

        <!-- Scenarios Grid -->
        <div data-reveal-at="2" class="grid grid-cols-2 gap-6 mb-6 opacity-0 transition-all duration-700">
          <!-- Ransomware -->
          <div id="btn-start-ransomware" class="bg-[#13141a] border-t-2 border-indigo-500 rounded-xl p-6 cursor-pointer hover:bg-[#181a22] transition-colors group flex flex-col h-full border-x border-b border-slate-800/50 shadow-lg">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-lg bg-[#1a1c24] border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <h3 class="font-bold text-white text-sm mb-1">Scénario A — Ransomware</h3>
                <div class="text-[10px] font-mono text-slate-500">Cyberattaque · propagation active</div>
              </div>
            </div>
            
            <div class="space-y-3 font-mono text-[11px] text-slate-300 mb-8 flex-grow">
              <div class="flex gap-3"><span class="text-indigo-400 font-bold">01</span> Isolation VM infectée sur VLAN 999</div>
              <div class="flex gap-3"><span class="text-indigo-400 font-bold">02</span> Snapshot figé — cluster Proxmox</div>
              <div class="flex gap-3"><span class="text-indigo-400 font-bold">03</span> Restauration depuis PBS - snapshot J-1</div>
              <div class="flex gap-3"><span class="text-indigo-400 font-bold">04</span> Scan EDR + remise en production</div>
            </div>
            
            <div class="text-[10px] font-mono text-slate-500 mt-auto pt-4">
              RTO effectif : <span class="text-slate-300">~2h30</span>
            </div>
          </div>

          <!-- Fire -->
          <div id="btn-start-fire" class="bg-[#13141a] border-t-2 border-yellow-500 rounded-xl p-6 cursor-pointer hover:bg-[#181a22] transition-colors group flex flex-col h-full border-x border-b border-slate-800/50 shadow-lg">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-lg bg-[#1a1c24] border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <div>
                <h3 class="font-bold text-white text-sm mb-1">Scénario B — Sinistre Physique</h3>
                <div class="text-[10px] font-mono text-slate-500">Incendie · destruction totale du Hub</div>
              </div>
            </div>
            
            <div class="space-y-3 font-mono text-[11px] text-slate-300 mb-8 flex-grow">
              <div class="flex gap-3"><span class="text-yellow-500 font-bold">01</span> Failover DNS AD ➔ contrôleur Nantes</div>
              <div class="flex gap-3"><span class="text-yellow-500 font-bold">02</span> Tunnels VPN spokes redirigés sur Nantes</div>
              <div class="flex gap-3"><span class="text-yellow-500 font-bold">03</span> Restauration SGL sur R730 standby</div>
              <div class="flex gap-3"><span class="text-yellow-500 font-bold">04</span> Validation PostgreSQL · 14 321 patients</div>
            </div>
            
            <div class="text-[10px] font-mono text-slate-500 mt-auto pt-4">
              RTO effectif : <span class="text-slate-300">1h42</span>
            </div>
          </div>
        </div>

        <!-- Backup Chain -->
        <div data-reveal-at="3" class="bg-[#13141a] rounded-xl p-6 shadow-lg border border-slate-800/50 opacity-0 transition-all duration-700">
          <div class="text-[10px] font-mono tracking-widest text-slate-500 mb-8 uppercase">Chaîne de Sauvegarde 3-2-1-1-0</div>
          
          <div class="flex items-center justify-between px-4 lg:px-12">
            <!-- PBS Local -->
            <div class="flex flex-col items-center text-center w-32">
              <div class="w-12 h-12 rounded-lg bg-[#1a1c24] border border-slate-700/50 flex items-center justify-center mb-4 text-slate-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              </div>
              <div class="text-[11px] font-bold text-slate-200 mb-1">PBS Local</div>
              <div class="text-[10px] text-slate-500">J-1 incrémental<br>Strasbourg</div>
            </div>

            <!-- Line 1 -->
            <div class="h-[1px] flex-1 bg-slate-800/60 mx-2 relative flex justify-center -translate-y-6">
              <span class="absolute text-[9px] font-mono text-slate-600 bg-[#13141a] px-2 -translate-y-1/2">hebdo</span>
            </div>

            <!-- PBS Nantes -->
            <div class="flex flex-col items-center text-center w-32">
              <div class="w-12 h-12 rounded-lg bg-[#1a1c24] border border-slate-700/50 flex items-center justify-center mb-4 text-slate-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              </div>
              <div class="text-[11px] font-bold text-slate-200 mb-1">PBS Nantes</div>
              <div class="text-[10px] text-slate-500">Hebdomadaire<br>Site de secours</div>
            </div>

            <!-- Line 2 -->
            <div class="h-[1px] flex-1 bg-slate-800/60 mx-2 relative flex justify-center -translate-y-6">
              <span class="absolute text-[9px] font-mono text-slate-600 bg-[#13141a] px-2 -translate-y-1/2">mensuel</span>
            </div>

            <!-- OVH Cloud -->
            <div class="flex flex-col items-center text-center w-32">
              <div class="w-12 h-12 rounded-lg bg-[#1a1c24] border border-slate-700/50 flex items-center justify-center mb-4 text-slate-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
              </div>
              <div class="text-[11px] font-bold text-slate-200 mb-1">OVHcloud HDS</div>
              <div class="text-[10px] text-slate-500">Object Storage<br>Cold Archive</div>
            </div>

            <!-- Spacer -->
            <div class="w-8"></div>

            <!-- 3-2-1-1-0 -->
            <div class="flex flex-col items-center text-center w-32">
              <div class="w-12 h-12 rounded-lg bg-[#1a1c24] border border-slate-700/50 flex items-center justify-center mb-4 text-slate-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div class="text-[11px] font-bold text-slate-200 mb-1">3-2-1-1-0</div>
              <div class="text-[10px] text-slate-500">Immuable<br>0 erreur</div>
            </div>
            
          </div>
        </div>

      </div>
    `;
  }

  const currentSteps = state.activeCrisis === 'ransomware' ? ransomwareSteps : fireSteps;
  const currentStepData = currentSteps[state.crisisStep];
  const crisisColor = state.activeCrisis === 'ransomware' ? 'indigo' : 'yellow';
  const crisisTitle = state.activeCrisis === 'ransomware' ? 'Infection Ransomware' : 'Sinistre Physique';

  const stepsIndicators = currentSteps.map((_, i) => `
    <div class="h-1 flex-1 rounded-full transition-all duration-300 ${
      i < state.crisisStep ? `bg-${crisisColor}-500` : 
      i === state.crisisStep ? `bg-${crisisColor}-500/50 relative overflow-hidden` : 
      'bg-slate-800'
    }">
      ${i === state.crisisStep ? `<div class="absolute inset-0 bg-${crisisColor}-400/30 animate-pulse"></div>` : ''}
    </div>
  `).join('');

  return `
    <div data-pres-slide="1,2,3" data-pres-label="Simulation Active" class="h-full w-full flex flex-col font-sans animate-fade-in text-slate-300 pb-8">
      
      <!-- Top Header -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <div class="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-${crisisColor}-500 animate-pulse"></span>
            Simulation Active · HDS V2
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-white mb-2">${crisisTitle}</h1>
          <p class="text-slate-400 text-sm max-w-xl leading-relaxed">
            Exécution des procédures de reprise d'activité...
          </p>
        </div>
        <div class="text-right">
          <div class="text-[10px] font-mono tracking-widest text-slate-400 mb-1 uppercase">Progression</div>
          <div class="text-3xl font-bold text-${crisisColor}-400">${Math.round(((state.crisisStep) / (currentSteps.length - 1)) * 100)}%</div>
        </div>
      </div>

      <!-- Active Crisis Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Timeline & Steps (Left) -->
        <div class="lg:col-span-4 bg-[#13141a] border border-slate-800/50 rounded-xl p-8 flex flex-col justify-between shadow-lg">
          
          <div class="space-y-8">
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <span class="text-[10px] font-bold text-${crisisColor}-400 uppercase tracking-widest flex items-center gap-2">
                Action Requise
              </span>
              <span class="text-[10px] font-mono text-slate-500">
                Étape ${state.crisisStep + 1} / ${currentSteps.length}
              </span>
            </div>
            
            <div class="space-y-4 min-h-[140px]">
              <h3 class="text-xl font-bold text-white">${currentStepData.title}</h3>
              <p class="text-sm text-slate-400 leading-relaxed">${currentStepData.desc}</p>
            </div>

            <!-- Steps indicators -->
            <div class="flex items-center gap-2 pt-4 border-t border-slate-800">
              ${stepsIndicators}
            </div>
          </div>

          <button
            id="btn-next-crisis-step"
            class="w-full mt-8 py-3.5 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors ${
              state.crisisStep === currentSteps.length - 1 
                ? 'bg-slate-200 hover:bg-white text-slate-900' 
                : `bg-${crisisColor}-500/10 hover:bg-${crisisColor}-500/20 text-${crisisColor}-400 border border-${crisisColor}-500/20`
            }"
          >
            <span>${currentStepData.btnText}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${state.crisisStep === currentSteps.length - 1 ? 'M5 13l4 4L19 7' : 'M14 5l7 7m0 0l-7 7m7-7H3'}"></path>
            </svg>
          </button>
        </div>

        <!-- Terminal Output (Right) -->
        <div class="lg:col-span-8 bg-[#13141a] border border-slate-800/50 rounded-xl p-0 flex flex-col overflow-hidden shadow-lg">
          
          <!-- Terminal Header -->
          <div class="bg-[#1a1c24] border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              </div>
              <span class="text-xs font-mono text-slate-500">root@hub-str-01:~#</span>
            </div>
          </div>
          
          <!-- Terminal Body -->
          <div class="p-8 font-mono text-[11px] md:text-xs leading-relaxed overflow-y-auto h-[320px] lg:h-auto custom-scrollbar flex-grow text-slate-300 whitespace-pre-wrap" id="terminal-logs">
            ${formatTerminalOutput(currentStepData.log, state.activeCrisis)}
          </div>

          <!-- Terminal Footer -->
          <div class="bg-[#1a1c24] border-t border-slate-800 px-8 py-4 flex flex-col sm:flex-row justify-between sm:items-center text-[10px] text-slate-500 font-mono">
            <div class="flex items-center gap-6">
              <span>CIBLE: <span class="text-slate-300">${state.activeCrisis === 'ransomware' ? 'SRV-STR-SGL-01' : 'HUB-STR-ROUT-01'}</span></span>
              <span>PROTOCOLE: <span class="text-slate-300">SSH/CLI</span></span>
            </div>
            <span class="mt-2 sm:mt-0">Conforme HDS Act. 6</span>
          </div>
        </div>

      </div>

    </div>
  `;
}

// Helper to format terminal text nicely with syntax highlighting pseudo-classes
function formatTerminalOutput(logText, crisisType) {
  const colorHighlight = crisisType === 'ransomware' ? 'text-indigo-400' : 'text-yellow-500';
  return logText.split('\n').map(line => {
    if (line.startsWith('#')) {
      return `<span class="text-slate-600">$ </span><span class="text-slate-400">${line.substring(1).trim()}</span>`;
    }
    if (line.startsWith('[ALERTE]') || line.startsWith('[CRITIQUE]')) {
      return `<span class="${colorHighlight} font-bold">${line}</span>`;
    }
    if (line.startsWith('[OK]') || line.startsWith('[SUCCÈS]')) {
      return `<span class="text-slate-200 font-bold">${line}</span>`;
    }
    if (line.startsWith('[INFO]') || line.startsWith('[LOG]') || line.startsWith('[STATUT]')) {
      return `<span class="text-slate-400">${line}</span>`;
    }
    if (line.startsWith('[RÉSULTAT]')) {
      return `<span class="text-white">${line}</span>`;
    }
    return line;
  }).join('<br/>');
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
    btnText: "Arrêter hyperviseurs et isoler VM"
  },
  {
    title: "Arrêt Forcé & Purge",
    desc: "Les VMs suspectes et le stockage partagé Ceph de production sont arrêtés de force sur le cluster Proxmox pour figer l'environnement.",
    log: "# Connexion SSH sur pve01 (10.100.99.11)...\n# qm stop 104 --skiplock 1\n[OK] Machine virtuelle de fichiers arrêtée.\n# qm stop 101 --skiplock 1\n[OK] Machine SGL Medoc arrêtée.\n[LOG] Wiping et réinitialisation des disques virtuels de production.",
    btnText: "Restaurer depuis le PBS"
  },
  {
    title: "Restauration PBS",
    desc: "Restauration complète de la dernière sauvegarde incrémentale saine effectuée à 2:00 du matin sur le stockage dédupliqué et protégé.",
    log: "# Recherche snapshot immuable PBS du 31/05/2026 à 02:00...\n[OK] Snapshot valide trouvé.\n# qmrestore pbs-storage:backup/vm-101-2026_05_31T02_00_00Z 101 --force 1\n[LOG] Copie de 120 Go d'image système en cours...\n[INFO] Restauration terminée à 100%.",
    btnText: "Valider en quarantaine"
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
    btnText: "Déclencher failover DNS"
  },
  {
    title: "Failover DNS & Routage WAN",
    desc: "Mise à jour des enregistrements DNS internes sur le contrôleur de Nantes et réactivation des tunnels VPN secondaires des 17 centres.",
    log: "# Connexion AD Nantes en PowerShell...\n# Set-DnsServerResourceRecordA -Name \"sgl\" -ZoneName \"gsblab.local\" -OldRecordData \"10.100.10.10\" -NewRecordData \"10.200.10.10\"\n# repadmin /syncall /AePdq\n[OK] Mise à jour DNS propagée. Les spokes ciblent désormais Nantes.",
    btnText: "Restaurer sur cluster de secours"
  },
  {
    title: "Restauration Nantes (R730)",
    desc: "Puisque Strasbourg est physiquement détruit, restauration des VMs du SGL et de l'AD depuis le serveur PBS secondaire de Nantes.",
    log: "# Connexion SSH sur hyperviseur de secours Nantes (10.200.99.10)...\n# qmstart 200 (Contrôleur de Domaine Standby)\n[OK] AD-Nantes en cours d'exécution.\n# qmrestore pbs-standby:backup/vm-101-2026_05_30 101 --force 1\n# qm set 101 --net0 virtio,bridge=vmbr0,tag=210 (VLAN Production Nantes)\n# qm start 101\n[OK] SGL Medoc actif sur serveur R730.",
    btnText: "Re-router flux FortiGate Spokes"
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

    const startRansomware = () => {
      state.activeCrisis = 'ransomware';
      state.crisisStep = 0;
      if (state.presentationMode) state.presentationStep = 1;
      renderApp();
    };

    const startFire = () => {
      state.activeCrisis = 'fire';
      state.crisisStep = 0;
      if (state.presentationMode) state.presentationStep = 1;
      renderApp();
    };

    btnRans?.addEventListener('click', startRansomware);
    btnFire?.addEventListener('click', startFire);

  } else {
    const btnNext = document.getElementById('btn-next-crisis-step');
    const currentSteps = state.activeCrisis === 'ransomware' ? ransomwareSteps : fireSteps;

    btnNext?.addEventListener('click', () => {
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
