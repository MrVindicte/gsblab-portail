export default [
  {
    id: "3.1",
    actName: "Acte 3 — La Prescription",
    label: "Stratégie (4 Piliers)",
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
         <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight border-l-4 border-indigo-500 pl-6 drop-shadow-lg">
            Cible : Modernisation & Conformité
         </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
           
           <!-- Pillar 1 -->
           <div class="${getClasses(1)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full"></div>
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                 Virtualisation
              </h3>
               <div class="mt-2">
                  <div class="text-[10px] text-slate-600/40 line-through mb-1 uppercase tracking-widest">VMware ESXi 6.0</div>
                  <div class="flex flex-col">
                     <span class="text-emerald-400 font-bold text-xl drop-shadow-md">Proxmox VE 9.2</span>
                     <span class="text-slate-300 text-sm mt-1">Cluster HA / Open-Source</span>
                  </div>
               </div>
           </div>

           <!-- Pillar 2 -->
           <div class="${getClasses(2)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full"></div>
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21 3.582 4 8 4s8-1.79 8-4"></path></svg>
                 Stockage
              </h3>
               <div class="mt-2">
                  <div class="text-[10px] text-slate-600/40 line-through mb-1 uppercase tracking-widest">SAN VNX (SPOF)</div>
                  <div class="flex flex-col">
                     <span class="text-emerald-400 font-bold text-xl drop-shadow-md">Hyperconvergence</span>
                     <span class="text-slate-300 text-sm mt-1">Ceph distribué & ZFS</span>
                  </div>
               </div>
           </div>

           <!-- Pillar 3 -->
           <div class="${getClasses(3)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full"></div>
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                 Réseau
              </h3>
               <div class="mt-2">
                  <div class="text-[10px] text-slate-600/40 line-through mb-1 uppercase tracking-widest">Réseau plat & VPN statique</div>
                  <div class="flex flex-col">
                     <span class="text-emerald-400 font-bold text-xl drop-shadow-md">100% Ubiquiti UniFi</span>
                     <span class="text-slate-300 text-sm mt-1">SD-WAN / IPsec AES-256</span>
                  </div>
               </div>
           </div>

           <!-- Pillar 4 -->
           <div class="${getClasses(4)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full"></div>
              <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                 Sécurité
              </h3>
               <div class="mt-2">
                  <div class="text-[10px] text-slate-600/40 line-through mb-1 uppercase tracking-widest">Zéro conformité</div>
                  <div class="flex flex-col">
                     <span class="text-emerald-400 font-bold text-xl drop-shadow-md">Certifié HDS</span>
                     <span class="text-slate-300 text-sm mt-1">Zero Trust, MFA, EDR</span>
                  </div>
               </div>
           </div>

        </div>
      </div>
      `;
    }
  },
  {
    id: "3.2",
    actName: "Acte 3 — La Prescription",
    label: "Budget & Souveraineté",
    subSteps: 3,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-5xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
         <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-indigo-500 pl-6">
            Budget & Souveraineté
         </h2>
        
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
           
           <div class="${getClasses(1)} transition-all duration-500 bg-red-950/20 border border-red-500/20 rounded-2xl p-8 flex-1 text-center backdrop-blur-md">
              <div class="text-3xl font-bold text-white mb-2">VMware (Broadcom)</div>
              <p class="text-red-400 font-mono mb-6">Modèle par abonnement cœur (VVF)</p>
              <div class="text-5xl font-black text-red-500 font-mono mb-2">~ 75 000 €</div>
              <div class="text-slate-500 text-sm">de licences sur 5 ans</div>
           </div>

           <div class="${getClasses(2)} transition-all duration-500 flex flex-col items-center gap-2">
              <div class="px-4 py-2 bg-slate-800 rounded-full text-slate-300 text-sm font-mono border border-slate-700">Migration V2V (qcow2)</div>
              <svg class="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           </div>

           <div class="${getClasses(2)} transition-all duration-500 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-8 flex-1 text-center backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <div class="text-3xl font-bold text-white mb-2">Proxmox VE 9.2</div>
              <p class="text-emerald-400 font-mono mb-6">Open-Source & Hyperconvergé</p>
              <div class="text-5xl font-black text-emerald-500 font-mono mb-2">0 €</div>
              <div class="text-slate-400 text-sm">Aucun coût de licence</div>
           </div>

        </div>

        <div class="${getClasses(3)} transition-all duration-500 bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-xl flex items-start gap-4">
           <svg class="w-6 h-6 text-indigo-400 shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <div>
               <h4 class="text-white font-bold mb-1">Souveraineté & Standards Ouverts</h4>
               <p class="text-slate-400 text-sm"><span class="text-white font-medium">Réversibilité totale.</span> Socle open-source (KVM) pour une indépendance garantie.</p>
           </div>
        </div>
      </div>
      `;
    }
  },
  {
    id: "3.3",
    actName: "Acte 3 — La Prescription",
    label: "Haute Disponibilité",
    subSteps: 3,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
         <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-indigo-500 pl-6">
            Continuité des Soins (HA)
         </h2>
        
        <div class="flex items-center gap-12 bg-slate-900/50 border border-white/5 p-10 rounded-3xl backdrop-blur-md">
           
           <!-- Info -->
           <div class="flex-1 space-y-8">
              <div class="${getClasses(1)} transition-all duration-500">
                 <h3 class="text-2xl font-bold text-white flex items-center gap-3"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> 4 Nœuds Actifs</h3>
                 <p class="text-slate-400 mt-2"><span class="text-white font-medium">2 Dell R760 (Prod) + 2 Dell R730 (Secours).</span> Tolérance de panne : jusqu'à 2 serveurs simultanés.</p>
              </div>
              
              <div class="${getClasses(2)} transition-all duration-500">
                 <h3 class="text-2xl font-bold text-white flex items-center gap-3"><span class="w-3 h-3 rounded-full bg-blue-500"></span> Ceph Distribué</h3>
                 <p class="text-slate-400 mt-2"><span class="text-white font-medium">Baie SAN supprimée.</span> Stockage répliqué en temps réel sur les disques locaux (SSD SAS).</p>
              </div>

              <div class="${getClasses(3)} transition-all duration-500 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                 <h4 class="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-2">Secret d'Architecte : Live Migration</h4>
                 <p class="text-slate-300 text-sm"><span class="text-white font-medium">Profil CPU Unifié (x86-64-v2-AES).</span> Masque les instructions Xeon 2023 pour migrer à chaud vers les serveurs 2016 sans Kernel Panic.</p>
              </div>
           </div>

           <!-- Graphic (Abstract Servers) -->
           <div class="w-[400px] h-[300px] relative shrink-0 ${getClasses(1)} transition-all duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-2xl border border-white/10 flex flex-col justify-evenly p-6 shadow-2xl">
                 <div class="w-full h-12 bg-slate-800 rounded-lg border border-slate-600 flex items-center px-4 relative overflow-hidden group">
                    <div class="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                    <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span class="ml-4 text-xs font-mono text-slate-300">DELL R760 (Master)</span>
                 </div>
                 <div class="w-full h-12 bg-slate-800 rounded-lg border border-slate-600 flex items-center px-4 relative overflow-hidden group">
                    <div class="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                    <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span class="ml-4 text-xs font-mono text-slate-300">DELL R760 (Master)</span>
                 </div>
                 <div class="w-full h-12 bg-slate-800 rounded-lg border border-slate-600 flex items-center px-4">
                    <div class="w-2 h-2 rounded-full bg-blue-400"></div><span class="ml-4 text-xs font-mono text-slate-300">DELL R730 (Standby)</span>
                 </div>
                 <div class="w-full h-12 bg-slate-800 rounded-lg border border-slate-600 flex items-center px-4">
                    <div class="w-2 h-2 rounded-full bg-blue-400"></div><span class="ml-4 text-xs font-mono text-slate-300">DELL R730 (Standby)</span>
                 </div>
                 <div class="absolute -left-6 top-1/2 -translate-y-1/2 bg-indigo-600 text-[10px] font-bold px-2 py-8 rounded-l font-mono tracking-widest" style="writing-mode: vertical-rl">CEPH MESH</div>
              </div>
           </div>
        </div>
      </div>
      `;
    }
  },
  {
    id: "3.4",
    actName: "Acte 3 — La Prescription",
    label: "Conformité & Licences",
    subSteps: 2,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
         <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-indigo-500 pl-6">
            Conformité Systèmes & Licences
         </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
           
           <div class="${getClasses(1)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
              <div class="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">Migration OS Windows</h3>
              <p class="text-slate-400 mb-6">Fermeture définitive des failles liées à l'Active Directory obsolète.</p>
              
              <div class="space-y-4">
                 <div class="flex items-center justify-between border-b border-white/5 pb-4">
                    <span class="text-slate-300 font-medium">Contrôleurs de Domaine</span>
                    <span class="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-sm font-bold">WS 2022</span>
                 </div>
                 <div class="flex items-center justify-between border-b border-white/5 pb-4">
                    <span class="text-slate-300 font-medium">App Métier "Medoc"</span>
                    <span class="bg-amber-500/20 text-amber-400 px-3 py-1 rounded text-sm font-bold">Bascule fin 2026</span>
                 </div>
                 <div class="flex items-center justify-between">
                    <span class="text-slate-300 font-medium">Stratégie d'Accès</span>
                    <span class="text-slate-400 text-sm">Mix CAL User / CAL Device</span>
                 </div>
              </div>
           </div>

           <div class="${getClasses(2)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
              <div class="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">Stratégie Bureautique</h3>
              <p class="text-slate-400 mb-6">Hébergement certifié HDS sans tomber dans le gouffre financier de M365.</p>
              
              <div class="bg-[#111218] p-5 rounded-xl border border-white/5">
                 <div class="flex items-center gap-3 mb-2">
                     <span class="bg-indigo-600 px-2 py-0.5 rounded text-xs font-bold text-white">CHOIX</span>
                     <span class="text-white font-bold">Office LTSC 2024</span>
                 </div>
                 <p class="text-sm text-slate-500 ml-12">Licence perpétuelle, zéro abonnement mensuel.</p>
                 
                 <div class="flex items-center gap-3 mt-4 mb-2">
                    <span class="text-slate-400 text-xs font-bold font-mono">+</span>
                    <span class="text-white font-bold">Exchange Online Plan 1 (HDS)</span>
                 </div>
                 <p class="text-sm text-slate-500 ml-12">Hébergement mail sécurisé, protégé par Entra ID (MFA).</p>
              </div>
           </div>

        </div>
      </div>
      `;
    }
  },
  {
    id: "3.5",
    actName: "Acte 3 — La Prescription",
    label: "Sauvegarde 3-2-1-1-0",
    subSteps: 6,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-indigo-500 pl-6">
           Résilience des Données (3-2-1-1-0)
        </h2>
        
        <div class="flex flex-col md:flex-row items-center gap-4 bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
           
           <div class="${getClasses(1)} transition-all duration-500 flex-1 flex flex-col items-center text-center space-y-3 p-4">
              <div class="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 text-2xl font-black mb-2">3</div>
              <h4 class="text-white font-bold">Le Principe</h4>
              <p class="text-xs text-slate-400 mt-1">3 exemplaires <br/><span class="text-[10px] text-slate-500 mt-1 block">(1 Prod + 2 Backups)</span></p>
           </div>
           
           <div class="${getClasses(2)} w-px h-24 bg-white/10 hidden md:block"></div>
           
           <div class="${getClasses(2)} transition-all duration-500 flex-1 flex flex-col items-center text-center space-y-3 p-4">
              <div class="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 text-2xl font-black mb-2">2</div>
              <h4 class="text-white font-bold">Anti-Panne</h4>
              <p class="text-xs text-slate-400 mt-1">2 supports physiques <br/><span class="text-[10px] text-slate-500 mt-1 block">(Disques + Bandes)</span></p>
           </div>
           
           <div class="${getClasses(3)} w-px h-24 bg-white/10 hidden md:block"></div>

           <div class="${getClasses(3)} transition-all duration-500 flex-1 flex flex-col items-center text-center space-y-3 p-4">
              <div class="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 text-2xl font-black mb-2">1</div>
              <h4 class="text-white font-bold">Anti-Sinistre</h4>
              <p class="text-xs text-slate-400 mt-1">Copie externalisée <br/><span class="text-[10px] text-slate-500 mt-1 block">(Cloud OVH)</span></p>
           </div>

           <div class="${getClasses(4)} w-px h-24 bg-white/10 hidden md:block"></div>

           <div class="${getClasses(4)} transition-all duration-500 flex-1 flex flex-col items-center text-center space-y-3 p-4">
              <div class="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 text-2xl font-black mb-2">1</div>
              <h4 class="text-white font-bold">Anti-Ransomware</h4>
              <p class="text-xs text-slate-400 mt-1">Copie hors-ligne <br/><span class="text-[10px] text-slate-500 mt-1 block">(Bandes au coffre)</span></p>
           </div>

           <div class="${getClasses(5)} w-px h-24 bg-white/10 hidden md:block"></div>

           <div class="${getClasses(5)} transition-all duration-500 flex-1 flex flex-col items-center text-center space-y-3 p-4">
              <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 text-2xl font-black mb-2">0</div>
              <h4 class="text-white font-bold">Garantie Reprise</h4>
              <p class="text-xs text-slate-400 mt-1">Contrôle automatisé <br/><span class="text-[10px] text-slate-500 mt-1 block">(Zéro échec)</span></p>
           </div>

        </div>

         <div class="${getClasses(6)} transition-all duration-500 bg-[#111218] border border-slate-800 rounded-xl p-6 text-center text-slate-300 text-lg flex flex-col xl:flex-row items-center justify-center gap-4 mt-8">
            <span class="text-white font-bold whitespace-nowrap">Trajet des données :</span>
            <div class="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium">
               <span class="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">1. Centralisation Siège</span>
               <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
               <span class="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">2. Sauvegarde Locale</span>
               <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
               <span class="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">3. Copies Externes (Cloud + Bandes)</span>
            </div>
         </div>
      </div>
      `;
    }
  },
  {
    id: "3.6",
    actName: "Acte 3 — La Prescription",
    label: "Sécurité (Zero Trust)",
    subSteps: 2,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-12 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
         <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-indigo-500 pl-6">
            Réseau Sécurisé (Zero Trust)
         </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
           
           <!-- SD-WAN -->
           <div class="${getClasses(1)} transition-all duration-500 bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md">
              <div class="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">100% Ubiquiti UniFi (SD-WAN)</h3>
              <ul class="space-y-4">
                 <li class="flex items-start gap-3">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                       <span class="text-slate-200 font-medium block">Topologie Hub & Spoke (IPsec AES-256)</span>
                       <span class="text-slate-500 text-sm">Le siège (Hub) centralise et filtre les flux des cliniques (Spokes) via Magic Site-to-Site.</span>
                    </div>
                 </li>
                 <li class="flex items-start gap-3">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                       <span class="text-slate-200 font-medium block">Passerelles UCG-Ultra (0€ licence)</span>
                       <span class="text-slate-500 text-sm">Pare-feux stateful avec gestion centralisée sur contrôleur VM Proxmox.</span>
                    </div>
                 </li>
              </ul>
           </div>

           <!-- PSSI & Endpoints -->
           <div class="${getClasses(2)} transition-all duration-500 bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md">
              <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">PSSI & Zero Trust</h3>
              <ul class="space-y-4">
                 <li class="flex items-start gap-3">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                       <span class="text-slate-200 font-medium block">Segmentation VLAN stricte</span>
                       <div class="flex flex-wrap gap-2 mt-2">
                          <span class="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-300">VLAN 10 <span class="text-slate-500 ml-1">Administration</span></span>
                          <span class="px-2 py-1 bg-emerald-900/40 border border-emerald-700/50 rounded text-xs font-mono text-emerald-300">VLAN 20 <span class="text-emerald-500/70 ml-1">Production</span></span>
                          <span class="px-2 py-1 bg-blue-900/40 border border-blue-700/50 rounded text-xs font-mono text-blue-300">VLAN 30 <span class="text-blue-500/70 ml-1">Médical HDS</span></span>
                          <span class="px-2 py-1 bg-amber-900/40 border border-amber-700/50 rounded text-xs font-mono text-amber-300">VLAN 40 <span class="text-amber-500/70 ml-1">Invités</span></span>
                          <span class="px-2 py-1 bg-purple-900/40 border border-purple-700/50 rounded text-xs font-mono text-purple-300">VLAN 99 <span class="text-purple-500/70 ml-1">Management</span></span>
                       </div>
                    </div>
                 </li>
                 <li class="flex items-start gap-3">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <div>
                       <span class="text-slate-200 font-medium block">Endpoints & Identités</span>
                       <span class="text-slate-500 text-sm">BitLocker, Tiering Model AD, MFA obligatoire, Posture Check VPN, et MDM Knox.</span>
                    </div>
                 </li>
              </ul>
           </div>

        </div>
      </div>
      `;
    }
  }
];
