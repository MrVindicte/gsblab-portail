export default [
  {
    id: "4.1",
    actName: "Acte 4 — Les Garanties",
    label: "PRA : Plan de Reprise",
    subSteps: 3,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-6 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight border-l-4 border-amber-500 pl-6">
           Plan de Reprise d'Activité (PRA)
        </h2>
        
        <p class="text-lg text-slate-400">
           En cas de sinistre majeur (incendie, cyberattaque), voici nos engagements de reprise.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
           
           <!-- RPO -->
           <div class="${getClasses(1)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
              <div class="flex items-center gap-4 mb-4">
                 <div class="text-4xl font-black text-blue-400 font-mono">1h</div>
                 <div>
                    <h3 class="text-xl font-bold text-white">R.P.O</h3>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Recovery Point Objective</p>
                 </div>
              </div>
              <p class="text-slate-400 text-sm mb-3">Perte de données max : <strong class="text-white">1 heure</strong>.</p>
              <div class="bg-[#111218] p-3 rounded-xl border border-white/5 text-xs text-slate-300">
                 Réplication incrémentale en continu (Snapshots ZFS + PBS) pour une sécurisation quasi temps réel.
              </div>
           </div>

           <!-- RTO -->
           <div class="${getClasses(2)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-bl-full"></div>
              <div class="flex items-center gap-4 mb-4">
                 <div class="text-4xl font-black text-amber-400 font-mono">4h</div>
                 <div>
                    <h3 class="text-xl font-bold text-white">R.T.O</h3>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Recovery Time Objective</p>
                 </div>
              </div>
              <p class="text-slate-400 text-sm mb-3">Interruption max : <strong class="text-white">4 heures</strong> (Incident local / Ransomware).</p>
              <div class="bg-[#111218] p-3 rounded-xl border border-white/5 text-xs text-slate-300">
                 Restauration des VMs critiques à 10 Gbps depuis le PBS local (Live Mount instantané possible).
              </div>
           </div>

        </div>

        <!-- Scénario Pire Cas -->
        <div class="${getClasses(3)} transition-all duration-500 bg-red-950/20 border border-red-500/20 rounded-xl p-5 flex items-start gap-5 backdrop-blur-md">
           <div class="bg-red-500/20 text-red-400 p-2.5 rounded-lg shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
           </div>
           <div>
              <h4 class="text-red-400 font-bold mb-1 text-sm">Exception : Destruction Totale (Incendie du Siège)</h4>
              <div class="text-slate-400 text-xs leading-relaxed">
                 Si le matériel local est physiquement détruit, le RTO passe à <strong class="text-white">&lt; 48h (PCA dégradé)</strong> :
                 <ul class="list-disc list-inside mt-1 space-y-0.5 ml-2 text-slate-300">
                    <li>Redéploiement d'urgence sur le Cloud (OVH) via Terraform (IaC).</li>
                    <li>Rapatriement des données depuis la copie externalisée (hors-site).</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
      `;
    }
  },
  {
    id: "4.2",
    actName: "Acte 4 — Les Garanties",
    label: "Riposte Incident SOC",
    subSteps: 4,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-amber-500 pl-6">
           Scénario : Riposte Ransomware
        </h2>
        
        <p class="text-xl text-slate-400 max-w-4xl">
           La question n'est plus de savoir <em>si</em> GSBLAB sera attaqué, mais <em>quand</em>. Voici notre chaîne de réaction automatisée (SOC) si un biologiste ouvre une pièce jointe piégée.
        </p>

        <div class="relative mt-8">
           <!-- Ligne temporelle -->
           <div class="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0 hidden md:block"></div>
           
           <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              
              <!-- T=0 -->
              <div class="${getClasses(1)} transition-all duration-500 bg-slate-900 border border-slate-700 rounded-2xl p-6 relative">
                 <div class="absolute -top-3 left-6 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded font-mono tracking-widest">T = 0 sec</div>
                 <div class="text-red-400 mb-4"><svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg></div>
                 <h4 class="text-white font-bold mb-2">Exécution</h4>
                 <p class="text-xs text-slate-400">Le malware tente de chiffrer les fichiers locaux et de se propager sur le réseau via SMB.</p>
              </div>

              <!-- T+1 -->
              <div class="${getClasses(2)} transition-all duration-500 bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                 <div class="absolute -top-3 left-6 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded font-mono tracking-widest">T + 1 sec</div>
                 <div class="text-emerald-400 mb-4"><svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div>
                 <h4 class="text-white font-bold mb-2">Détection EDR</h4>
                 <p class="text-xs text-slate-400">L'agent EDR détecte une anomalie comportementale (chiffrement de masse) et tue le processus instantanément.</p>
              </div>

              <!-- T+5 -->
              <div class="${getClasses(3)} transition-all duration-500 bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative">
                 <div class="absolute -top-3 left-6 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded font-mono tracking-widest">T + 5 sec</div>
                 <div class="text-indigo-400 mb-4"><svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"></path></svg></div>
                 <h4 class="text-white font-bold mb-2">Isolation Réseau</h4>
                 <p class="text-xs text-slate-400">Le pare-feu Ubiquiti UCG-Ultra coupe le port réseau du PC infecté. Menace confinée au VLAN 40.</p>
              </div>

              <!-- T+15 -->
              <div class="${getClasses(4)} transition-all duration-500 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 relative">
                 <div class="absolute -top-3 left-6 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded font-mono tracking-widest">T + 15 sec</div>
                 <div class="text-amber-400 mb-4"><svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></div>
                 <h4 class="text-white font-bold mb-2">Alerte SOC</h4>
                 <p class="text-xs text-slate-400">Le SIEM (Wazuh) agrège les logs et génère un ticket critique niveau 1 pour l'équipe astreinte.</p>
              </div>

           </div>
        </div>
      </div>
      `;
    }
  },
  {
    id: "4.3",
    actName: "Acte 4 — Les Garanties",
    label: "Le Cutover Exchange",
    subSteps: 4,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-amber-500 pl-6">
           Migration Exchange : Zéro Perte de Mail
        </h2>
        
        <p class="text-xl text-slate-400 max-w-4xl">
           Bascule des 130 boîtes existantes (Exchange 2013 vers Online) : voici le planning du <strong>Cutover (Week-end J-0)</strong>. Les futurs collaborateurs seront créés nativement dans le cloud.
        </p>

        <div class="bg-slate-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
           
           <div class="space-y-6">
              
              <!-- Vendredi -->
              <div class="${getClasses(1)} transition-all duration-500 flex gap-6 items-start group">
                 <div class="w-28 shrink-0 text-right mt-1">
                    <span class="text-indigo-400 font-black text-xl block">VEN. 20h</span>
                 </div>
                 <div class="w-4 h-4 rounded-full bg-slate-700 border-2 border-indigo-500 relative z-10 mt-1.5 group-hover:bg-indigo-500 transition-colors"></div>
                 <div class="flex-1 pb-6 border-b border-white/5">
                    <h4 class="text-white font-bold text-lg mb-1">Gel de l'Active Directory (On-Prem)</h4>
                    <p class="text-sm text-slate-400">Interdiction de création de comptes. Synchro Delta finale <em>Azure AD Connect</em>.</p>
                 </div>
              </div>

              <!-- Samedi -->
              <div class="${getClasses(2)} transition-all duration-500 flex gap-6 items-start group">
                 <div class="w-28 shrink-0 text-right mt-1">
                    <span class="text-amber-400 font-black text-xl block">SAM. 08h</span>
                 </div>
                 <div class="w-4 h-4 rounded-full bg-slate-700 border-2 border-amber-500 relative z-10 mt-1.5 group-hover:bg-amber-500 transition-colors"></div>
                 <div class="flex-1 pb-6 border-b border-white/5">
                    <h4 class="text-white font-bold text-lg mb-1">Réplication des Boîtes aux Lettres</h4>
                    <p class="text-sm text-slate-400">Lancement du Migration Batch. Copie des mails et calendriers en arrière-plan.</p>
                 </div>
              </div>

              <!-- Dimanche -->
              <div class="${getClasses(3)} transition-all duration-500 flex gap-6 items-start group">
                 <div class="w-28 shrink-0 text-right mt-1">
                    <span class="text-red-400 font-black text-xl block">DIM. 14h</span>
                 </div>
                 <div class="w-4 h-4 rounded-full bg-slate-700 border-2 border-red-500 relative z-10 mt-1.5 group-hover:bg-red-500 transition-colors shadow-[0_0_10px_rgba(248,113,113,0.5)]"></div>
                 <div class="flex-1 pb-6 border-b border-white/5">
                    <h4 class="text-white font-bold text-lg mb-1">Point de Non-Retour (Cutover DNS)</h4>
                    <p class="text-sm text-slate-400">Changement du DNS <strong class="text-white">MX / Autodiscover</strong>. Les nouveaux emails arrivent sur le Cloud.</p>
                 </div>
              </div>

              <!-- Lundi -->
              <div class="${getClasses(4)} transition-all duration-500 flex gap-6 items-start group">
                 <div class="w-28 shrink-0 text-right mt-1">
                    <span class="text-emerald-400 font-black text-xl block">LUN. 08h</span>
                 </div>
                 <div class="w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-400 relative z-10 mt-1.5 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                 <div class="flex-1">
                    <h4 class="text-emerald-400 font-bold text-lg mb-1">Go-Live & Support Hypercare</h4>
                    <p class="text-sm text-slate-400">Connexion des utilisateurs (MFA actif). Support Hypercare N1 sur site.</p>
                 </div>
              </div>

           </div>

        </div>
      </div>
      `;
    }
  },
  {
    id: "4.4",
    actName: "Acte 4 — Les Garanties",
    label: "Conduite du Changement",
    subSteps: 3,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-5 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <h2 class="text-3xl font-bold text-white tracking-tight border-l-4 border-amber-500 pl-6">
           Conduite du Changement (130 collaborateurs actuels)
        </h2>

        <p class="text-lg text-slate-400">
           La technique ne suffit pas. Si les collaborateurs n'adhèrent pas, le projet échoue.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

            <!-- Phase 1 : Avant -->
            <div class="${getClasses(1)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
               <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
               <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span class="bg-blue-500/20 text-blue-400 w-8 h-8 rounded-lg flex items-center justify-center font-bold">1</span>
                  Avant : Préparer
               </h3>
               <p class="text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Dédramatiser la bascule</p>
               <ul class="space-y-4 text-sm text-slate-300">
                  <li class="flex items-start gap-3"><span class="text-blue-500 mt-0.5">●</span> <div><span class="font-bold text-white block">S-4 : Annonce DG</span>Communication officielle pour rassurer.</div></li>
                  <li class="flex items-start gap-3"><span class="text-blue-500 mt-0.5">●</span> <div><span class="font-bold text-white block">S-2 : "Guide de Survie IT"</span>Distribution d'un livret simple à tous.</div></li>
                  <li class="flex items-start gap-3"><span class="text-blue-500 mt-0.5">●</span> <div><span class="font-bold text-white block">J-3 : Rappel des étapes</span>Explication claire du déroulé du week-end.</div></li>
               </ul>
            </div>

            <!-- Phase 2 : Pendant -->
            <div class="${getClasses(2)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
               <div class="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-bl-full"></div>
               <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span class="bg-amber-500/20 text-amber-400 w-8 h-8 rounded-lg flex items-center justify-center font-bold">2</span>
                  Pendant : Le Jour J
               </h3>
               <p class="text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Zéro panique lundi matin</p>
               <ul class="space-y-4 text-sm text-slate-300">
                  <li class="flex items-start gap-3"><span class="text-amber-500 mt-0.5">●</span> <div><span class="font-bold text-white block">Hypercare sur site</span>Présence physique de nos techniciens (Gilets IT).</div></li>
                  <li class="flex items-start gap-3"><span class="text-amber-500 mt-0.5">●</span> <div><span class="font-bold text-white block">Hotline VIP Prioritaire</span>Numéro dédié en cas de blocage immédiat.</div></li>
                  <li class="flex items-start gap-3"><span class="text-amber-500 mt-0.5">●</span> <div><span class="font-bold text-white block">Accompagnement VIP</span>Focus prioritaire sur les médecins et le secrétariat.</div></li>
               </ul>
            </div>

            <!-- Phase 3 : Après -->
            <div class="${getClasses(3)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
               <div class="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full"></div>
               <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span class="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-lg flex items-center justify-center font-bold">3</span>
                  Après : Autonomiser
               </h3>
               <p class="text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Pérenniser l'investissement</p>
               <ul class="space-y-4 text-sm text-slate-300">
                  <li class="flex items-start gap-3"><span class="text-emerald-500 mt-0.5">●</span> <div><span class="font-bold text-white block">Formations Utilisateurs</span>Bonnes pratiques cyber, utilisation du MFA (1h).</div></li>
                  <li class="flex items-start gap-3"><span class="text-emerald-500 mt-0.5">●</span> <div><span class="font-bold text-white block">Ateliers Bureautiques</span>Adaptation à Office LTSC et Web App.</div></li>
                  <li class="flex items-start gap-3"><span class="text-emerald-500 mt-0.5">●</span> <div><span class="font-bold text-emerald-400 block">Transfert DSI (3,5 jours)</span>Formation complète des équipes IT locales.</div></li>
               </ul>
            </div>

        </div>
      </div>
      `;
    }
  }
];
