export default [
  {
    id: "5.1",
    actName: "Acte 5 — Le Budget (TCO)",
    label: "Respect du Plafond DAF",
    subSteps: 1,
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
           <div class="bg-[#111218] border border-slate-700/50 rounded-3xl p-8 shrink-0 text-center w-full md:w-80 shadow-2xl relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent"></div>
              <h3 class="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">Plafond Alloué</h3>
              <div class="text-5xl font-black text-slate-300 font-mono relative z-10">450k€</div>
           </div>

           <!-- Vs -->
           <div class="${getClasses(1)} transition-all duration-500 text-slate-600 font-bold text-2xl hidden md:block">VS</div>

           <!-- Our Budget -->
           <div class="${getClasses(1)} transition-all duration-500 bg-emerald-950/20 border border-emerald-500/40 rounded-3xl p-10 flex-1 text-center backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden w-full group hover:border-emerald-500/60 hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]">
              <div class="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
              <div class="absolute top-0 right-0 bg-emerald-500/20 px-4 py-1.5 rounded-bl-2xl font-mono text-xs text-emerald-400 font-bold tracking-widest">VALIDÉ</div>
              
              <h3 class="text-emerald-400/80 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">Notre CAPEX Global</h3>
              <div class="text-7xl font-black text-emerald-400 font-mono mb-4 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">~ 395k€</div>
              
              <div class="grid grid-cols-3 gap-4 mt-8 relative z-10">
                 <div class="border-t border-emerald-500/20 pt-3">
                    <div class="text-white font-bold">Matériel</div>
                    <div class="text-xs text-slate-400 mt-1">Dell, Ubiquiti, NAS</div>
                 </div>
                 <div class="border-t border-emerald-500/20 pt-3">
                    <div class="text-white font-bold">Licences Initiales</div>
                    <div class="text-xs text-slate-400 mt-1">LTSC, Veeam, Windows</div>
                 </div>
                 <div class="border-t border-emerald-500/20 pt-3">
                    <div class="text-white font-bold">Prestations</div>
                    <div class="text-xs text-slate-400 mt-1">Migration, PMO, Câblage</div>
                 </div>
              </div>
           </div>

        </div>

        <div class="${getClasses(1)} transition-all duration-500 bg-slate-900/40 border border-slate-700/50 rounded-xl p-5 text-center text-slate-400 text-sm">
           Marge de sécurité conservée : <strong class="text-emerald-400 text-lg font-mono">55 000 €</strong> (12% du budget global pour imprévus de chantier).
        </div>
      </div>
      `;
    }
  },
  {
    id: "5.2",
    actName: "Acte 5 — Le Budget (TCO)",
    label: "TCO & Économies sur 5 ans",
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
        <h2 class="text-4xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-6">
           Les Choix Qui Paient (TCO 5 ans)
        </h2>
        
        <p class="text-xl text-slate-400">
           Le vrai coût s'évalue sur 5 ans (TCO). Nos choix à contre-courant génèrent des <strong class="text-emerald-400">économies massives en OPEX</strong>.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
           
           <!-- Economy 1 -->
           <div class="${getClasses(1)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 hover:bg-indigo-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-white flex items-center gap-2">
                       <span class="text-indigo-400">01.</span> Refus de Microsoft 365 (E3/E5)
                    </h4>
                    <span class="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-indigo-500/20">Licences</span>
                 </div>
                 
                 <p class="text-sm text-slate-400 mb-4 flex-1"><span class="font-medium text-white">Office LTSC 2024 (perpétuel) + Exchange Online P1</span> plutôt qu'un abonnement M365 Business Premium.</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Économie générée (TCO)</span>
                       <span class="text-2xl font-black text-emerald-400 font-mono drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">~ 200 000 €</span>
                    </div>
                    <div class="bg-emerald-500/10 text-emerald-400 p-2 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-500 group-hover:-translate-y-1">
                       <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Economy 2 -->
           <div class="${getClasses(2)} transition-all duration-500 bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 hover:bg-amber-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-white flex items-center gap-2">
                       <span class="text-amber-400">02.</span> Refus de VMware VVF
                    </h4>
                    <span class="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-amber-500/20">Hyperviseur</span>
                 </div>
                 
                 <p class="text-sm text-slate-400 mb-4 flex-1"><span class="font-medium text-white">Fuite du modèle par cœur (Broadcom)</span> au profit de l'hyperconvergence open-source Proxmox VE.</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Économie générée (TCO)</span>
                       <span class="text-2xl font-black text-emerald-400 font-mono drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">~ 75 000 €</span>
                    </div>
                    <div class="bg-emerald-500/10 text-emerald-400 p-2 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-500 group-hover:-translate-y-1">
                       <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        <!-- Big Total -->
        <div class="${getClasses(3)} transition-all duration-500 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-6 flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.15)]">
           <div>
              <h4 class="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Économies Totales (TCO)</h4>
              <p class="text-slate-400 text-sm">Sur 5 ans par rapport aux standards habituels du marché.</p>
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
    subSteps: 3,
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

         <div class="${getClasses(2)} transition-all duration-500 mt-8 relative z-10 w-full max-w-4xl mx-auto flex gap-6 text-left">
            <div class="flex-1 bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:bg-slate-900/60 transition-colors">
               <h4 class="text-white font-bold mb-2 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-blue-500"></span>Horizon 2026</h4>
               <p class="text-sm text-slate-400">Certification HDS finale, Cutover Exchange et transfert de compétences aux équipes internes.</p>
            </div>
            <div class="flex-1 bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:bg-slate-900/60 transition-colors">
               <h4 class="text-white font-bold mb-2 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-indigo-500"></span>Vision 2030</h4>
               <p class="text-sm text-slate-400">Déploiement d'une IA souveraine (locale), expansion SD-WAN, et approche Zero Trust (ZTNA).</p>
            </div>
         </div>

         <div class="${getClasses(3)} transition-all duration-500 relative z-10 w-full max-w-2xl mx-auto">
            <div class="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
            <h3 class="text-3xl font-bold text-white mb-2 tracking-tight">Merci de votre attention.</h3>
            <p class="text-slate-400 text-lg font-light">L'Équipe G1 se tient prête pour la phase d'entretiens individuels.</p>
         </div>

      </div>
      `;
    }
  }
];
