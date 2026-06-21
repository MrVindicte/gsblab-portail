export default [
   {
      id: "2.1",
      actName: "Acte 2 — Le Diagnostic",
      label: "L'Audit de l'Existant",
      subSteps: 4,
      render: (state) => {
         const sub = state.soutenanceV2SubStep || 0;
         const getClasses = (step) => {
            if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
            if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
            return "opacity-100 translate-y-0";
         };

         return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-10 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <div class="flex items-center gap-4 border-l-4 border-amber-500 pl-6">
           <svg class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
           <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
              État des Lieux & Risques Majeurs
           </h2>
        </div>
        
        <p class="text-xl text-slate-400 max-w-3xl leading-relaxed">
          L'infrastructure héritée cumule obsolescence et failles critiques.<br />
          <strong class="text-red-400 mt-2 block">La certification HDS est impossible en l'état.</strong>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
           
           <!-- OS Alert -->
           <div class="${getClasses(1)} transition-all duration-500 bg-red-950/30 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] relative overflow-hidden group">
              <!-- Watermark Icon -->
              <svg class="absolute -bottom-6 -right-6 w-36 h-36 text-red-500/5 group-hover:text-red-500/10 group-hover:scale-110 transition-all duration-700 pointer-events-none" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              
              <div class="relative z-10">
                 <h3 class="text-xl font-bold text-white mb-2">OS Obsolètes</h3>
                 <p class="text-sm text-red-200/80 mb-4">Fin de support critique</p>
                 <ul class="text-sm text-slate-400 space-y-2 font-medium">
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Windows Server 2012 R2 (EOL)</li>
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Active Directory vulnérable</li>
                 </ul>
              </div>
           </div>

           <!-- Virtu Alert -->
           <div class="${getClasses(2)} transition-all duration-500 bg-red-950/30 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] relative overflow-hidden group">
              <!-- Watermark Icon -->
              <svg class="absolute -bottom-6 -right-6 w-36 h-36 text-red-500/5 group-hover:text-red-500/10 group-hover:scale-110 transition-all duration-700 pointer-events-none" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              
              <div class="relative z-10">
                 <h3 class="text-xl font-bold text-white mb-2">Virtualisation</h3>
                 <p class="text-sm text-red-200/80 mb-4">Vendor Lock-in Broadcom</p>
                 <ul class="text-sm text-slate-400 space-y-2 font-medium">
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> VMware ESXi 6.0 (EOL)</li>
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Explosion des coûts (+75k€)</li>
                 </ul>
              </div>
           </div>

           <!-- Network Alert -->
           <div class="${getClasses(3)} transition-all duration-500 bg-red-950/30 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] relative overflow-hidden group">
              <!-- Watermark Icon -->
              <svg class="absolute -bottom-6 -right-6 w-36 h-36 text-red-500/5 group-hover:text-red-500/10 group-hover:scale-110 transition-all duration-700 pointer-events-none" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              
              <div class="relative z-10">
                 <h3 class="text-xl font-bold text-white mb-2">Réseau "À Plat"</h3>
                 <p class="text-sm text-red-200/80 mb-4">Zéro segmentation</p>
                 <ul class="text-sm text-slate-400 space-y-2 font-medium">
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Réseau unique (Pas de VLANs)</li>
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Risque de propagation latérale</li>
                 </ul>
              </div>
           </div>

           <!-- Mail Alert -->
           <div class="${getClasses(4)} transition-all duration-500 bg-red-950/30 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] relative overflow-hidden group">
              <!-- Watermark Icon -->
              <svg class="absolute -bottom-6 -right-6 w-36 h-36 text-red-500/5 group-hover:text-red-500/10 group-hover:scale-110 transition-all duration-700 pointer-events-none" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path></svg>
              
              <div class="relative z-10">
                 <h3 class="text-xl font-bold text-white mb-2">Messagerie</h3>
                 <p class="text-sm text-red-200/80 mb-4">Faille de sécurité béante</p>
                 <ul class="text-sm text-slate-400 space-y-2 font-medium">
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Exchange 2013 (EOL)</li>
                    <li class="flex items-start gap-2"><span class="text-red-500 mt-0.5">✗</span> Failles critiques (Hafnium/ProxyShell)</li>
                 </ul>
              </div>
           </div>

        </div>
      </div>
      `;
      }
   },
   {
      id: "2.2",
      actName: "Acte 2 — Le Diagnostic",
      label: "L'Esprit Critique (Anomalies)",
      subSteps: 8,
      render: (state) => {
         const sub = state.soutenanceV2SubStep || 0;
         const getClasses = (step) => {
            if (sub < step) return "opacity-0 invisible translate-y-4 pointer-events-none";
            if (sub === step) return "animate-[fadeIn_0.5s_ease-out] translate-y-0";
            return "opacity-100 translate-y-0";
         };

         return `
      <div class="flex flex-col justify-center h-full max-w-6xl mx-auto space-y-10 ${sub === 0 ? 'animate-[fadeIn_0.5s_ease-out]' : ''}">
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight border-l-4 border-emerald-500 pl-6 drop-shadow-lg">
           Cahier des Charges
        </h2>
        
        <p class="text-xl text-slate-400 max-w-3xl leading-relaxed">
          Nous avons challengé le cahier des charges et identifié <span class="text-emerald-400 font-bold">16 anomalies techniques</span>. En voici 4 exemples critiques :
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
           
           <!-- Anomalie 1 -->
           <div class="${getClasses(1)} transition-all duration-500 bg-blue-950/20 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-blue-500/40 hover:bg-blue-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-white flex items-center gap-2">
                       <span class="text-blue-400">01.</span> Réseau : Wi-Fi Obsolète
                    </h4>
                    <span class="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-blue-500/20">Matériel</span>
                 </div>
                 
                 <p class="text-sm text-slate-400 mb-4 flex-1"><span class="font-medium text-white">Bornes Wi-Fi 4 (2015) non supportées.</span> Violation de la norme HDS.</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 flex items-center gap-3 ${getClasses(2)} transition-all duration-500">
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg shrink-0 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow">
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Solution G1</span>
                       <p class="text-xs text-emerald-100 font-medium">Standardisation sur Ubiquiti U6+ (Wi-Fi 6).</p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Anomalie 2 -->
           <div class="${getClasses(3)} transition-all duration-500 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 hover:bg-indigo-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-white flex items-center gap-2">
                       <span class="text-indigo-400">02.</span> Licensing : Double Comptage
                    </h4>
                    <span class="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-indigo-500/20">Finance</span>
                 </div>
                 
                 <p class="text-sm text-slate-400 mb-4 flex-1"><span class="font-medium text-white">Portables comptabilisés deux fois</span> dans le budget initial (siège + centres).</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 flex items-center gap-3 ${getClasses(4)} transition-all duration-500">
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg shrink-0 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow">
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Économie générée : 1 560 €</span>
                       <p class="text-xs text-emerald-100 font-medium">Ajustement des licences au nombre réel d'utilisateurs.</p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Anomalie 3 -->
           <div class="${getClasses(5)} transition-all duration-500 bg-red-950/20 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-red-500/40 hover:bg-red-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all duration-500"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-white flex items-center gap-2">
                       <span class="text-red-400">03.</span> Sécurité : SAN Exposé Internet
                    </h4>
                    <span class="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-red-500/20">Critique</span>
                 </div>
                 
                 <p class="text-sm text-slate-400 mb-4 flex-1"><span class="font-medium text-white">Baie SAN de santé reliée directement à internet</span> (sans firewall).</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 flex items-center gap-3 ${getClasses(6)} transition-all duration-500">
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg shrink-0 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow">
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Faille Évitée</span>
                       <p class="text-xs text-emerald-100 font-medium">Isolation stricte dans un VLAN de stockage (VLAN 30).</p>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Anomalie 4 -->
           <div class="${getClasses(7)} transition-all duration-500 bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 hover:bg-amber-900/20">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-bold text-white flex items-center gap-2">
                       <span class="text-amber-400">04.</span> Virtu : Crash Live Migration
                    </h4>
                    <span class="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-amber-500/20">Architecture</span>
                 </div>
                 
                 <p class="text-sm text-slate-400 mb-4 flex-1"><span class="font-medium text-white">Live migration d'un CPU récent vers ancien = Kernel Panic</span> immédiat.</p>
                 
                 <div class="mt-auto pt-4 border-t border-white/5 flex items-center gap-3 ${getClasses(8)} transition-all duration-500">
                    <div class="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg shrink-0 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow">
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                       <span class="text-[9px] uppercase tracking-widest text-emerald-500 font-black block mb-0.5">Anticipé</span>
                       <p class="text-xs text-emerald-100 font-medium">Configuration du cluster avec un profil CPU unifié.</p>
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
