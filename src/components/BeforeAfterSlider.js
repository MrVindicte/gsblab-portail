export default function BeforeAfterSlider(state) {
  const isPres = state.presentationMode;

  // ── MODE PRÉSENTATION — slide visuelle full-screen ──────────────────────────
  if (isPres) {
    return `
      <div data-pres-slide="1" data-pres-label="Avant / Après — Dette Technique"
           class="flex-1 min-h-0 flex flex-col items-center justify-center gap-6 w-full max-w-6xl mx-auto h-full py-4">

        <div class="text-center space-y-3">
          <h2 class="text-5xl font-extrabold text-white tracking-tight font-display">Avant / Après — Dette Technique</h2>
          <div class="w-20 h-1.5 bg-gradient-to-r from-red-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-3 gap-6 w-full flex-1 min-h-0">

          <!-- AVANT -->
          <div class="glass-panel rounded-3xl p-7 border-l-[6px] border-l-red-500 flex flex-col gap-4 bg-slate-900/60">
            <div class="flex items-center gap-2 text-red-400 font-bold uppercase tracking-widest text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Situation existante
            </div>
            <div class="space-y-3 flex-1">
              ${[
                ['WS 2012 / VMware ESXi', 'EoL 2027 — vulnérabilités critiques non patchées'],
                ['Réseau plat sans VLAN', 'Secrétariats et serveurs cliniques sur le même L2'],
                ['Pas de MFA ni MDM', 'Messagerie sans 2FA · laptops non chiffrés'],
                ['Baie VNX exposée WAN', 'Stockage accessible sans pare-feu frontal dédié'],
              ].map(([t, d]) => `
                <div class="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
                  <div class="text-red-300 font-semibold text-sm">${t}</div>
                  <div class="text-slate-500 text-xs mt-0.5 leading-snug">${d}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- CENTER delta -->
          <div class="flex flex-col items-center justify-center gap-5 text-center">
            <div>
              <div class="text-5xl font-mono font-extrabold text-emerald-400 leading-none">65 k€</div>
              <div class="text-slate-400 text-sm mt-2">économisés par an<br>vs VMware Broadcom</div>
            </div>
            <div class="w-1 h-12 bg-gradient-to-b from-red-500 to-emerald-500 rounded-full"></div>
            <div>
              <div class="text-3xl font-mono font-bold text-indigo-300">440 794 €</div>
              <div class="text-slate-400 text-xs mt-1">investi dans la nouvelle infra</div>
            </div>
            <div class="mt-2 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span class="text-emerald-400 text-xs font-bold">HDS v2 conforme</span>
            </div>
          </div>

          <!-- APRÈS -->
          <div class="glass-panel rounded-3xl p-7 border-l-[6px] border-l-emerald-500 flex flex-col gap-4 bg-slate-900/60">
            <div class="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              Infrastructure cible HDS
            </div>
            <div class="space-y-3 flex-1">
              ${[
                ['Proxmox VE HA + Ceph', 'Hyperconvergé · RTO &lt; 5 min · support 5 ans'],
                ['VLAN HDS + VPN IPsec', 'VLAN 30 isolé strict · 27 spokes FortiGate 40F'],
                ['Exchange Online + MFA', 'M365 HDS certifié · BitLocker · Authenticator'],
                ['PBS + OVH Object Storage', 'Sauvegarde 3-2-1 · RPO 1h · chiffré AES-256'],
              ].map(([t, d]) => `
                <div class="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3">
                  <div class="text-emerald-300 font-semibold text-sm">${t}</div>
                  <div class="text-slate-500 text-xs mt-0.5 leading-snug">${d}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ── MODE NORMAL ──────────────────────────────────────────────────────────────
  return `
    <div class="space-y-6">
      
      <!-- Title -->
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Analyse d'Évolution : Avant (Existant) / Après (Cible HDS)
        </h2>
        <p class="text-slate-400 text-sm">
          Faites glisser le curseur central pour comparer la dette technique existante à l'architecture cible sécurisée.
        </p>
      </div>

      <!-- Slider Frame -->
      <div class="relative w-full h-[400px] rounded-2xl border border-white/10 overflow-hidden bg-slate-950 select-none">
        
        <!-- BEFORE (Bottom Layer) -->
        <div class="absolute inset-0 w-full h-full bg-red-950/20 p-8 flex flex-col justify-between">
          <div data-pres-step="1" class="flex items-center gap-2 text-red-500 border border-red-500/20 bg-red-500/10 px-3 py-1.5 rounded-lg w-fit text-xs font-bold">
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            SITUATION EXISTANTE : DETTE TECHNIQUE CRITIQUE
          </div>

          <div data-pres-step="1" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 max-w-4xl">
            <div class="space-y-3">
              <div>
                <div class="text-xs font-bold text-red-400 uppercase">Stockage & Sauvegarde Exposés</div>
                <p class="text-xs text-slate-400">La baie VNX et le robot de sauvegarde sont branchés directement sur le routeur frontal WAN, accessibles sans pare-feu.</p>
              </div>
              <div>
                <div class="text-xs font-bold text-red-400 uppercase">Réseau Local Plat</div>
                <p class="text-xs text-slate-400">Aucun VLAN de cloisonnement. Les secrétariats accèdent au même réseau local que les serveurs de fichiers cliniques.</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <div>
                <div class="text-xs font-bold text-red-400 uppercase">Obsolescence logicielle Windows Server 2012</div>
                <p class="text-xs text-slate-400">Hyperviseur et contrôleur de domaine AD sous WS 2012, hors support de sécurité de Microsoft en janvier 2027.</p>
              </div>
              <div>
                <div class="text-xs font-bold text-red-400 uppercase">Absence de MFA & Chiffrement Mobile</div>
                <p class="text-xs text-slate-400">Aucune authentification multifacteur pour le courrier. Mobiles non sécurisés par MDM, laptops non chiffrés.</p>
              </div>
            </div>
          </div>

          <div data-pres-step="1" class="text-[10px] text-red-500 font-mono">
            * Risques Majeurs : Ransomware, non-conformité RGPD, fuite de données de santé (patientèle).
          </div>
        </div>

        <!-- AFTER (Top Overlay Layer - width dynamically adjusted) -->
        <div 
          id="slider-overlay"
          class="absolute top-0 left-0 h-full bg-emerald-950/20 border-r border-emerald-500/50 overflow-hidden"
          style="width: ${state.beforeAfterSliderVal}%"
        >
          <!-- Fixed width content container -->
          <div class="w-[900px] md:w-[1200px] h-full p-8 flex flex-col justify-between absolute top-0 left-0">
            <div data-pres-step="2" class="flex items-center gap-2 text-emerald-400 border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit text-xs font-bold">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              SITUATION CIBLE : INFRASTRUCTURE DURCIE HDS v2
            </div>

            <div data-pres-step="2" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 max-w-4xl">
              <div class="space-y-3">
                <div>
                  <div class="text-xs font-bold text-emerald-400 uppercase">Stockage Isolé sous Proxmox VE / Ceph</div>
                  <p class="text-xs text-slate-400">La baie de stockage et les hyperviseurs sont isolés dans des VLANs étanches et protégés par un cluster FortiGate HA.</p>
                </div>
                <div>
                  <div class="text-xs font-bold text-emerald-400 uppercase">Segmentation Réseau Hub & Spoke</div>
                  <p class="text-xs text-slate-400">Flux d'administration (VLAN 99) et cliniques (VLAN 10) hermétiques. VPN IPsec SD-WAN durcis pour les 17 centres.</p>
                </div>
              </div>
              
              <div class="space-y-3">
                <div>
                  <div class="text-xs font-bold text-emerald-400 uppercase">Systèmes Windows Server 2022 & Proxmox</div>
                  <p class="text-xs text-slate-400">Migration des hyperviseurs sous Proxmox VE HA (support 5 ans). Contrôleur AD basculé sous Windows Server 2022.</p>
                </div>
                <div>
                  <div class="text-xs font-bold text-emerald-400 uppercase">MFA & Terminaux sous MDM</div>
                  <p class="text-xs text-slate-400">Bascule de messagerie sur Exchange Online M365 HDS avec MFA obligatoire. Gestion des laptops par BitLocker.</p>
                </div>
              </div>
            </div>

            <div data-pres-step="2" class="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Résilience : RTO inférieur à 5 minutes (Proxmox HA) et PRA activable en moins de 2 heures.
            </div>
          </div>
        </div>

        <!-- Separator Handle -->
        <div 
          id="slider-handle"
          class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
          style="left: ${state.beforeAfterSliderVal}%; transform: translateX(-50%)"
        >
          <div class="w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center shadow-lg">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
          </div>
        </div>

        <!-- Range Input Layer -->
        <input 
          type="range"
          id="before-after-input-range"
          min="0"
          max="100"
          value="${state.beforeAfterSliderVal}"
          class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />

      </div>

      <div data-pres-step="3" class="text-center text-xs text-slate-500 no-print">
        * Faites glisser votre souris de gauche à droite sur l'image pour dévoiler la transition technologique de GSBLAB.
      </div>

    </div>
  `;
}

export function bindSliderEvents(state) {
  const range = document.getElementById('before-after-input-range');
  const overlay = document.getElementById('slider-overlay');
  const handle = document.getElementById('slider-handle');

  range.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.beforeAfterSliderVal = val;
    overlay.style.width = val + '%';
    handle.style.left = val + '%';
  });
}
