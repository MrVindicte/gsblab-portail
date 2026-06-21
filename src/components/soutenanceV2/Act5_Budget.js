export default [
  {
    id: "5.1",
    actName: "Acte 5 — Le Budget (TCO)",
    label: "Respect du Plafond DAF",
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
        <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-6">
           Budget CAPEX (Investissement Initial)
        </h2>
        
        <p class="text-xl text-slate-400">
           Le conseil d'administration a imposé un plafond strict de <strong class="text-white">450 000 € HT</strong> pour la refonte complète du SI. Voici notre atterrissage financier.
        </p>

        <div class="flex flex-col md:flex-row gap-8 items-center mt-4">
           
           <!-- DAF Target -->
           <div class="transition-all duration-500 bg-[#111218] border rounded-3xl p-8 shrink-0 flex flex-col items-center justify-center min-h-[200px] w-full md:w-80 relative overflow-hidden ${sub >= 1 ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-slate-700/50 shadow-2xl'}">
              <div class="absolute inset-0 transition-all duration-500 ${sub >= 1 ? 'bg-gradient-to-b from-amber-900/10 to-transparent' : 'bg-gradient-to-b from-slate-800/20 to-transparent'}"></div>
              
              <h3 class="font-bold uppercase tracking-widest text-sm mb-3 relative z-10 transition-colors duration-500 ${sub >= 1 ? 'text-amber-400' : 'text-slate-500'}">Plafond Alloué</h3>
              
              <div class="text-5xl font-black font-mono relative z-10 transition-all duration-500 ${sub >= 1 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-slate-300'}">450k€</div>
              
              <div class="absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-500 ${sub >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} pointer-events-none w-full flex items-center justify-center gap-3">
                 <div class="w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                 <span class="text-amber-400 font-bold text-[11px] uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                    BUDGET VERROUILLÉ
                 </span>
                 <div class="w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
              </div>
           </div>

           <!-- Vs -->
           <div class="${getClasses(2)} transition-all duration-500 text-slate-600 font-bold text-2xl hidden md:block">VS</div>

           <!-- Our Budget -->
           <div class="${getClasses(2)} transition-all duration-500 bg-emerald-950/20 border border-emerald-500/40 rounded-3xl p-10 flex-1 text-center backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden w-full group hover:border-emerald-500/60 hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]">
              <div class="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
              <div class="absolute top-0 right-0 bg-emerald-500/20 px-4 py-1.5 rounded-bl-2xl font-mono text-xs text-emerald-400 font-bold tracking-widest">VALIDÉ</div>
              
              <h3 class="text-emerald-400/80 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">Notre CAPEX Global</h3>
              <div class="text-7xl font-black text-emerald-400 font-mono mb-4 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">398 733 €</div>
              
              <div class="grid grid-cols-3 gap-4 mt-8 relative z-10">
                 <div class="${getClasses(3)} transition-all duration-500 border-t border-emerald-500/20 pt-3">
                    <div class="text-white font-bold">Matériel</div>
                    <div class="text-xs text-slate-400 mt-1">Serveurs Dell, Ubiquiti, NAS</div>
                 </div>
                 <div class="${getClasses(4)} transition-all duration-500 border-t border-emerald-500/20 pt-3">
                    <div class="text-white font-bold">Licences Initiales</div>
                    <div class="text-xs text-slate-400 mt-1">LTSC, PBS, Windows Server</div>
                 </div>
                 <div class="${getClasses(5)} transition-all duration-500 border-t border-emerald-500/20 pt-3">
                    <div class="text-white font-bold">Prestations</div>
                    <div class="text-xs text-slate-400 mt-1">Migration, PMO, Câblage</div>
                 </div>
              </div>
           </div>

        </div>

        <div class="${getClasses(6)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-xl p-5 text-center text-slate-400 text-sm">
           Réserve de sécurité conservée : <strong class="text-emerald-400 text-lg font-mono">51 267 €</strong> (~11% du budget global pour imprévus de chantier).
        </div>
      </div>
      `;
    }
  },
  {
    id: "5.2",
    actName: "Acte 5 — Le Budget (TCO)",
    label: "TCO & Économies sur 5 ans",
    subSteps: 4,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-fade-in translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-8 ${sub === 0 ? 'animate-fade-in' : ''}">
        <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-6">
           Les Choix Qui Paient (TCO 5 ans)
        </h2>

        <p class="text-lg text-slate-400">
           Le vrai coût s'évalue sur 5 ans (TCO). Nos choix à contre-courant génèrent des <strong class="text-emerald-400">économies massives en OPEX</strong>.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

           <!-- Economy 1 -->
           <div class="${getClasses(1)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 hover:bg-indigo-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>

              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-3">
                    <h4 class="text-base font-bold text-white flex items-center gap-2">
                       <span class="text-indigo-400">01.</span> Refus de Microsoft 365
                    </h4>
                    <span class="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-indigo-500/20">Licences</span>
                 </div>

                 <p class="text-sm text-slate-400 mb-3 flex-1"><span class="font-medium text-white">Office LTSC 2024 (perpétuel) + Exchange Online P1</span> plutôt qu'un abonnement M365 Business Premium.</p>

                 <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Économie (TCO)</span>
                       <span class="text-xl font-black text-emerald-400 font-mono">~ 200 000 €</span>
                    </div>
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/20">
                       <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Economy 2 -->
           <div class="${getClasses(2)} transition-all duration-500 bg-amber-950/20 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 hover:bg-amber-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>

              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-3">
                    <h4 class="text-base font-bold text-white flex items-center gap-2">
                       <span class="text-amber-400">02.</span> Refus de VMware VVF
                    </h4>
                    <span class="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-amber-500/20">Hyperviseur</span>
                 </div>

                 <p class="text-sm text-slate-400 mb-3 flex-1"><span class="font-medium text-white">Fuite du modèle par cœur (Broadcom)</span> au profit de l'hyperconvergence open-source Proxmox VE.</p>

                 <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Économie (TCO)</span>
                       <span class="text-xl font-black text-emerald-400 font-mono">~ 75 000 €</span>
                    </div>
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/20">
                       <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Economy 3 -->
           <div class="${getClasses(3)} transition-all duration-500 bg-blue-950/20 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/40 hover:bg-blue-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-3">
                    <h4 class="text-base font-bold text-white flex items-center gap-2">
                       <span class="text-blue-400">03.</span> Optimisations Récurrentes
                    </h4>
                    <span class="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-blue-500/20">OpEx</span>
                 </div>

                 <p class="text-sm text-slate-400 mb-3 flex-1"><span class="font-medium text-white">Recyclage matériel (R730, baie VNX, robot LTO)</span>, correction double comptage et effet cumulé 5 ans.</p>

                 <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Économie (TCO)</span>
                       <span class="text-xl font-black text-emerald-400 font-mono">~ 54 500 €</span>
                    </div>
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/20">
                       <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        <!-- Big Total -->
        <div class="${getClasses(4)} transition-all duration-500 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-5 flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.15)]">
           <div>
              <h4 class="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Économies Totales (TCO)</h4>
              <p class="text-slate-400 text-sm">Sur 5 ans par rapport aux standards du marché (200k + 75k + 54,5k).</p>
           </div>
           <div class="text-5xl font-black text-white font-mono drop-shadow-lg">
              329 500 €
           </div>
        </div>
      </div>
      `;
    }
  },
  {
    id: "5.3",
    actName: "Acte 5 — Le Budget (TCO)",
    label: "Conclusion Finale",
    subSteps: 4,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      const getClasses = (step) => {
         if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
         if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
         return "opacity-100 translate-y-0";
      };

      return `
      <div class="flex flex-col items-center justify-center h-full text-center space-y-10 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''} relative">
         
         <div class="absolute inset-0 bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none"></div>

         <div class="flex items-center gap-8 relative z-10 max-w-4xl mx-auto text-left w-full justify-center">
            <!-- Icône -->
            <div class="w-24 h-24 shrink-0 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
               <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
            </div>
            
            <!-- Titre et sous-titre -->
            <div class="flex flex-col">
               <h2 class="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-2">
                  Objectif Atteint
               </h2>
               <p class="${getClasses(1)} transition-all duration-500 text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
                  Une infrastructure <strong class="text-white font-bold">Souveraine, Hautement Disponible et certifiable HDS</strong> pour les 5 prochaines années.
               </p>
            </div>
         </div>

         <div class="mt-8 relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 text-left">
            <div class="${getClasses(2)} transition-all duration-500 flex-1 bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:bg-slate-900/60 hover:border-blue-500/30">
               <h4 class="text-white font-bold mb-2 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-blue-500"></span>Horizon 2026</h4>
               <p class="text-sm text-slate-400">Certification HDS finale, Cutover Exchange et transfert de compétences aux équipes internes.</p>
            </div>
            <div class="${getClasses(3)} transition-all duration-500 flex-1 bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:bg-slate-900/60 hover:border-indigo-500/30">
               <h4 class="text-white font-bold mb-2 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-indigo-500"></span>Vision 2030</h4>
               <p class="text-sm text-slate-400">Démarche de certification ISO 27001, sécurisation des objets connectés (IoMT - Internet of Medical Things), et automatisation de l'infrastructure.</p>
            </div>
         </div>

         <div class="${getClasses(4)} transition-all duration-500 relative z-10 w-full max-w-2xl mx-auto">
            <div class="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
            <h3 class="text-3xl font-bold text-white mb-2 tracking-tight">Merci de votre attention.</h3>
            <p class="text-slate-400 text-lg font-light">Nous sommes prêts à répondre à vos questions.</p>
         </div>

      </div>
      `;
    }
  }
];
