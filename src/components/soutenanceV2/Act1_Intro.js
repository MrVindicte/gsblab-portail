export default [
  {
    id: "1.1",
    actName: "Acte 1 — Le Contexte",
    label: "Titre & Équipe",
    render: () => `
      <div class="flex flex-col items-center justify-center h-full text-center space-y-8 animate-[fadeIn_0.5s_ease-out]">
         <h1 class="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl">
            GSBLAB
         </h1>
         <p class="text-2xl text-emerald-400 font-mono tracking-widest uppercase font-semibold">
            Plan de Transformation IT — Architecture Cible
         </p>
         
         <div class="flex flex-wrap justify-center items-center gap-8 mt-16">
            <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg shadow-black/50">
               <span class="block text-slate-500 text-xs mb-1.5 uppercase tracking-widest font-bold">Architecte Sécurité</span>
               <span class="text-white font-medium text-xl">Jérôme</span>
            </div>
            <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg shadow-black/50">
               <span class="block text-slate-500 text-xs mb-1.5 uppercase tracking-widest font-bold">Architecte Infra</span>
               <span class="text-white font-medium text-xl">Léo</span>
            </div>
            <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg shadow-black/50">
               <span class="block text-slate-500 text-xs mb-1.5 uppercase tracking-widest font-bold">Architecte Système</span>
               <span class="text-white font-medium text-xl">Romain</span>
            </div>
         </div>
      </div>
    `
  },
  {
    id: "1.2",
    actName: "Acte 1 — Le Contexte",
    label: "Le Périmètre",
    subSteps: 3,
    render: (state) => {
      const sub = state.soutenanceV2SubStep || 0;
      
      // On applique l'animation *uniquement* lors de l'apparition pour éviter le "flash" au re-render global.
      // invisible = garde l'espace intact (pas de décalage) mais l'élément n'est pas vu
      const slideAnim = sub === 0 ? "animate-[fadeIn_0.5s_ease-out]" : "";
      const cibleClasses = sub === 0 ? "opacity-0 invisible" : (sub === 1 ? "animate-[fadeIn_0.5s_ease-out]" : "opacity-100");
      const dafClasses = sub < 2 ? "opacity-0 invisible" : (sub === 2 ? "animate-[fadeIn_0.5s_ease-out]" : "opacity-100");

      return `
      <div class="flex flex-col justify-center h-full max-w-5xl mx-auto space-y-12 ${slideAnim}">
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-6 drop-shadow-lg">
           La Transformation GSBLAB (2026-2030)
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
           <!-- Avant (Toujours visible) -->
           <div class="bg-red-950/20 border border-red-500/20 rounded-3xl p-10 backdrop-blur-md relative overflow-hidden group hover:border-red-500/40 transition-colors">
              <div class="absolute top-0 right-0 bg-red-500/20 px-5 py-1.5 rounded-bl-2xl font-mono text-xs text-red-400 font-bold tracking-widest">AVANT (2026)</div>
              <ul class="space-y-8 mt-6">
                 <li class="flex items-center gap-6">
                    <span class="text-5xl font-black text-white font-mono opacity-90">130</span>
                    <span class="text-slate-400 text-sm uppercase tracking-wider font-bold">Collaborateurs</span>
                 </li>
                 <li class="flex items-center gap-6">
                    <span class="text-5xl font-black text-white font-mono opacity-90">07</span>
                    <span class="text-slate-400 text-sm uppercase tracking-wider font-bold">Sites physiques</span>
                 </li>
                 <li class="flex items-center gap-6">
                    <span class="text-5xl font-black text-red-400 font-mono drop-shadow-[0_0_15px_rgba(248,113,113,0.4)]">0%</span>
                    <span class="text-slate-400 text-sm uppercase tracking-wider font-bold">Conformité HDS</span>
                 </li>
              </ul>
           </div>

           <!-- Après (Révélé au SubStep 1) -->
           <div class="${cibleClasses} bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-10 backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)] group hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <div class="absolute top-0 right-0 bg-emerald-500/20 px-5 py-1.5 rounded-bl-2xl font-mono text-xs text-emerald-400 font-bold tracking-widest">CIBLE (2030)</div>
              <ul class="space-y-8 mt-6">
                 <li class="flex items-center gap-6">
                    <span class="text-5xl font-black text-emerald-400 font-mono drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">380</span>
                    <span class="text-slate-300 text-sm uppercase tracking-wider font-bold">Collaborateurs</span>
                 </li>
                 <li class="flex items-center gap-6">
                    <span class="text-5xl font-black text-emerald-400 font-mono drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">27</span>
                    <span class="text-slate-300 text-sm uppercase tracking-wider font-bold">Sites physiques</span>
                 </li>
                 <li class="flex items-center gap-6">
                    <span class="text-5xl font-black text-emerald-400 font-mono drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">100%</span>
                    <span class="text-slate-300 text-sm uppercase tracking-wider font-bold">Conformité HDS</span>
                 </li>
              </ul>
           </div>
        </div>

        <!-- DAF (Révélé au SubStep 2, S'anime au SubStep 3) -->
        <div class="${sub < 2 ? 'opacity-0 invisible translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-700 mt-8 relative group">
           <!-- Glow effect -->
           <div class="absolute inset-0 bg-amber-500/10 rounded-2xl blur-2xl transition-all duration-700 ${sub >= 3 ? 'opacity-100' : 'opacity-0'} pointer-events-none"></div>
           
           <div class="relative bg-slate-900/60 border rounded-2xl p-6 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 ${sub >= 3 ? 'border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'border-slate-700/50 shadow-lg'}">
              
              <!-- Background gradient -->
              <div class="absolute inset-0 transition-all duration-500 ${sub >= 3 ? 'bg-gradient-to-r from-amber-500/10 to-transparent' : 'bg-transparent'}"></div>

              <div class="flex items-center gap-5 relative z-10 w-full">
                 <!-- Icon Box -->
                 <div class="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-500 ${sub >= 3 ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-800 border-slate-700 text-slate-400'}">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"></path></svg>
                 </div>
                 
                 <!-- Text Content -->
                 <div class="flex-1">
                    <div class="flex items-center gap-4 mb-1">
                       <h3 class="text-white font-bold text-xl tracking-tight">Contrainte DAF</h3>
                       
                       <!-- Animated Premium Typography -->
                       <div class="transition-all duration-500 overflow-hidden flex items-center gap-3 ${sub >= 3 ? 'max-w-xs opacity-100 translate-x-0' : 'max-w-0 opacity-0 -translate-x-4'}">
                          <div class="w-1 h-4 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                          <span class="text-amber-400 font-bold text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
                             BUDGET VERROUILLÉ
                          </span>
                       </div>
                    </div>
                    <p class="text-slate-400 text-sm max-w-xl transition-colors duration-500 ${sub >= 3 ? 'text-amber-200/70' : ''}">
                       Plafond global (CAPEX) pour l'ensemble du projet de migration.
                    </p>
                 </div>
                 
                 <!-- Amount -->
                 <div class="text-right shrink-0">
                    <div class="font-mono text-4xl font-black tracking-tight transition-all duration-500 ${sub >= 3 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105' : 'text-slate-200 scale-100'}">
                       450 <span class="opacity-50">000</span> <span class="text-2xl text-slate-500 ml-1">€ HT</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      `;
    }
  }
];
