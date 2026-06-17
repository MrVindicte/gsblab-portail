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
              <p class="text-slate-400 text-sm mb-3">Interruption max : <strong class="text-white">4 heures</strong>.</p>
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
              <h4 class="text-red-400 font-bold mb-1 text-sm">Scénario de destruction totale (Incendie Salle Serveur)</h4>
              <div class="text-slate-400 text-xs leading-relaxed">
                 Si destruction physique totale du matériel, activation du <strong class="text-white">PCA dégradé</strong> :
                 <ul class="list-disc list-inside mt-1 space-y-0.5 ml-2 text-slate-300">
                    <li>Redéploiement Cloud (OVH) via Terraform (IaC).</li>
                    <li>Restauration depuis l'Archive Froide HDS en &lt; 48h.</li>
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
                 <div class="w-24 shrink-0 text-right mt-1">
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
                 <div class="w-24 shrink-0 text-right mt-1">
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
                 <div class="w-24 shrink-0 text-right mt-1">
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
                 <div class="w-24 shrink-0 text-right mt-1">
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

           <!-- Communication -->
           <div class="${getClasses(1)} transition-all duration-500 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-md">
              <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                 <svg class="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                 Communication
              </h3>
              <div class="space-y-2.5 text-sm">
                 <div class="flex items-center justify-between border-b border-white/5 pb-2">
                    <span class="text-slate-300">S-4 : Annonce DG</span>
                    <span class="text-slate-500 text-[10px] font-mono">Mail + affichage</span>
                 </div>
                 <div class="flex items-center justify-between border-b border-white/5 pb-2">
                    <span class="text-slate-300">S-2 : Guide de Survie IT</span>
                    <span class="text-slate-500 text-[10px] font-mono">PDF à tous</span>
                 </div>
                 <div class="flex items-center justify-between border-b border-white/5 pb-2">
                    <span class="text-slate-300">J-3 : Rappel maintenance</span>
                    <span class="text-slate-500 text-[10px] font-mono">Mail + Teams</span>
                 </div>
                 <div class="flex items-center justify-between">
                    <span class="text-slate-300">J+0 : Hypercare sur site</span>
                    <span class="text-emerald-400 text-[10px] font-bold font-mono">Gilets IT</span>
                 </div>
              </div>
           </div>

           <!-- Formations Utilisateurs -->
           <div class="${getClasses(2)} transition-all duration-500 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-md">
              <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                 <svg class="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                 Formations Users
              </h3>
              <div class="space-y-2.5 text-sm">
                 <div class="flex items-center justify-between border-b border-white/5 pb-2">
                    <span class="text-slate-300">Office LTSC & OWA</span>
                    <span class="text-blue-400 text-[10px] font-bold font-mono">1h · Tous</span>
                 </div>
                 <div class="flex items-center justify-between">
                    <span class="text-slate-300">Cybersécurité / MFA</span>
                    <span class="text-blue-400 text-[10px] font-bold font-mono">1h · Obligatoire</span>
                 </div>
              </div>
              <div class="mt-4 pt-3 border-t border-white/5">
                 <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    Transfert DSI
                 </h3>
                 <div class="space-y-2.5 text-sm">
                    <div class="flex items-center justify-between border-b border-white/5 pb-2">
                       <span class="text-slate-300">Proxmox VE & PBS</span>
                       <span class="text-indigo-400 text-[10px] font-bold font-mono">2j</span>
                    </div>
                    <div class="flex items-center justify-between border-b border-white/5 pb-2">
                       <span class="text-slate-300">Ubiquiti UniFi</span>
                       <span class="text-indigo-400 text-[10px] font-bold font-mono">1j</span>
                    </div>
                    <div class="flex items-center justify-between">
                       <span class="text-slate-300">ESET Endpoint</span>
                       <span class="text-indigo-400 text-[10px] font-bold font-mono">½j</span>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Hotline -->
           <div class="${getClasses(3)} transition-all duration-500 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-md flex flex-col">
              <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                 <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                 Hotline VIP
              </h3>
              <div class="space-y-3 text-sm flex-1">
                 <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-0.5">✓</span>
                    <span class="text-slate-300">Numéro dédié + raccourci Teams prioritaire</span>
                 </div>
                 <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-0.5">✓</span>
                    <span class="text-slate-300">Support N1 sur site le jour J</span>
                 </div>
                 <div class="flex items-start gap-2">
                    <span class="text-emerald-500 mt-0.5">✓</span>
                    <span class="text-slate-300">Couverture J+0 à J+30</span>
                 </div>
              </div>
              <div class="mt-auto pt-3 border-t border-emerald-500/20 text-center">
                 <span class="text-emerald-400 font-bold text-lg font-mono">3,5 jours</span>
                 <span class="text-slate-500 text-xs block mt-0.5">de transfert de compétences DSI</span>
              </div>
           </div>

        </div>
      </div>
      `;
    }
  }
];
