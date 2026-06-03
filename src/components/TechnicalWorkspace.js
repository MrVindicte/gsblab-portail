export default function TechnicalWorkspace(state) {
  const isPres = state.presentationMode;

  // Strasbourg Hub position (SVG coordinates)
  const hubX = 250;
  const hubY = 180;
  const radius = 130;

  // Calcul dynamique des positions des Spokes en cercle autour de Strasbourg
  const spokesList = state.spokesList;
  const spokesWithCoords = spokesList.slice(1).map((site, index, arr) => {
    const angle = (index * 2 * Math.PI) / arr.length;
    const x = hubX + radius * Math.cos(angle);
    const y = hubY + radius * Math.sin(angle);
    return { ...site, x, y };
  });

  // Allocation des ressources en pourcentage
  const totalCores = state.serversCount * 2 * 16;
  const totalRam = state.serversCount * 128;
  const allocatedCores = 16;
  const allocatedRam = 36;
  const pctCores = Math.round((allocatedCores / totalCores) * 100);
  const pctRam = Math.round((allocatedRam / totalRam) * 100);

  // SVG nodes strings
  const svgLines = spokesWithCoords.map(spoke => `
    <line
      id="line-${spoke.id}"
      x1="${hubX}"
      y1="${hubY}"
      x2="${spoke.x}"
      y2="${spoke.y}"
      stroke="#1e293b"
      stroke-width="1"
      stroke-dasharray="4,4"
      class="transition-all"
    />
  `).join('');

  const svgNodes = spokesWithCoords.map(spoke => `
    <g class="spoke-node-group cursor-pointer group" data-spoke-id="${spoke.id}">
      <circle
        cx="${spoke.x}"
        cy="${spoke.y}"
        r="12"
        fill="#131b2e"
        stroke="#1e293b"
        stroke-width="2"
        class="group-hover:stroke-emerald-400 group-hover:fill-emerald-900/40 transition-all duration-300"
      />
      <text 
        x="${spoke.x}" 
        y="${spoke.y + 24}" 
        text-anchor="middle" 
        fill="#64748b" 
        font-size="8" 
        font-weight="bold"
        class="pointer-events-none font-sans group-hover:fill-emerald-400 transition-colors"
      >
        ${spoke.name.replace('Labo Expansion ', 'E-').replace('Strasbourg ', 'S-').split(' ')[0]}
      </text>
    </g>
  `).join('');

  const dashboardHTML = `
      <!-- Title -->
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white">
          Technique, Architecture & Topologie Réseau
        </h2>
        <p class="text-slate-400 text-sm">
          Inspectez la configuration physique du réseau Hub & Spoke et les ressources système allouées.
        </p>
      </div>

      <!-- Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Network Diagram SVG -->
        <div class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Topologie Réseau Hub & Spoke (Interactif)
          </h3>
          
          <div class="bg-slate-950/60 rounded-lg p-4 flex items-center justify-center overflow-x-auto relative">
            <svg width="500" height="360" viewBox="0 0 500 360" class="w-full max-w-[500px]">
              <!-- Draw lines -->
              ${svgLines}

              <!-- Strasbourg Hub Node -->
              <circle
                id="hub-node"
                cx="${hubX}"
                cy="${hubY}"
                r="28"
                fill="#1e293b"
                stroke="#3b82f6"
                stroke-width="3"
                class="cursor-pointer hover:stroke-blue-400 hover:fill-blue-900/30 transition-all duration-300"
              />
              <text x="${hubX}" y="${hubY + 4}" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" class="pointer-events-none font-sans">
                HUB
              </text>
              <text x="${hubX}" y="${hubY + 38}" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="semibold" class="pointer-events-none font-sans">
                Strasbourg
              </text>

              <!-- Spoke Nodes -->
              ${svgNodes}
            </svg>
          </div>
          <div class="text-[10px] text-slate-500 mt-3 text-center">
            * Survolez un nœud du schéma pour inspecter ses configurations de pare-feu et d'adressage IP.
          </div>
        </div>

        <!-- Details Column -->
        <div class="lg:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between" id="site-details-panel">
          <!-- Populated in bind -->
        </div>

      </div>

      <!-- Hardware gauges & Code Viewer -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Resources gauges -->
        <div class="lg:col-span-1 glass-panel rounded-xl p-6 space-y-5 flex flex-col justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider border-b border-white/5 pb-2">
            Ressources du Cluster Proxmox
          </h3>
          
          <div class="space-y-4">
            <!-- CPU -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-slate-400 flex items-center gap-1">Processeur (vCœurs)</span>
                <span class="font-mono text-slate-300">${allocatedCores} / ${totalCores} Cores (${pctCores}%)</span>
              </div>
              <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: ${pctCores}%"></div>
              </div>
            </div>

            <!-- RAM -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-slate-400 flex items-center gap-1">Mémoire RAM (Go)</span>
                <span class="font-mono text-slate-300">${allocatedRam} GB / ${totalRam} GB (${pctRam}%)</span>
              </div>
              <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: ${pctRam}%"></div>
              </div>
            </div>

            <!-- Ceph Storage -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-slate-400 flex items-center gap-1">Pool Ceph (Utile NVMe)</span>
                <span class="font-mono text-slate-300">1.2 TB / 6.0 TB (20%)</span>
              </div>
              <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: 20%"></div>
              </div>
            </div>
          </div>

          <div class="text-[10px] text-slate-500 leading-relaxed border-t border-white/5 pt-3 mt-2">
            * Métriques basées sur les ${state.serversCount} nœuds configurés.
          </div>
        </div>

        <!-- Code Viewer Panel -->
        <div class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div class="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
            <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Déploiement Automatisé (PoC IaC)
            </h3>
            
            <div class="flex bg-slate-950 p-1 rounded-lg border border-white/5 text-xs no-print">
              <button
                id="btn-code-terraform"
                class="px-3 py-1 rounded-md font-medium transition bg-blue-600/10 text-blue-400"
              >
                Terraform (VMs)
              </button>
              <button
                id="btn-code-ansible"
                class="px-3 py-1 rounded-md font-medium transition text-slate-400"
              >
                Ansible (Securisation)
              </button>
            </div>
          </div>

          <div class="bg-slate-950 rounded-lg p-4 font-mono text-[10px] text-slate-300 overflow-x-auto h-[130px] border border-white/5 flex-grow" id="code-content-box">
            <!-- Populated -->
          </div>
          
          <div class="flex justify-between items-center text-[10px] text-slate-500 mt-3 border-t border-white/5 pt-2">
            <span id="code-file-path">Chemin : /Scripts/03_Proxmox_Provisioning.tf</span>
            <span class="flex items-center gap-1">IaC Validé</span>
          </div>
        </div>

      </div>
  `;

  if (!isPres) {
    return `<div data-pres-slide="1" class="space-y-6 h-full overflow-y-auto pr-2 pb-10">${dashboardHTML}</div>`;
  }

  // ════════════════════════════════════════════════════════════════════════════
  // MODE PRÉSENTATION : 3 SLIDES GÉANTES
  // ════════════════════════════════════════════════════════════════════════════
  
  const presSlide1 = `
    <div data-pres-slide="1" data-pres-label="Architecture Globale" class="flex-1 min-h-0 flex flex-col items-center justify-center space-y-8 w-full max-w-7xl mx-auto h-full py-4">
      <div class="text-center space-y-4 w-full mb-6">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Topologie Réseau & SD-WAN</h2>
        <div class="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      </div>
      
      <div class="grid grid-cols-3 gap-12 w-full flex-1 min-h-0">
        
        <!-- Network Diagram SVG -->
        <div class="col-span-2 glass-panel rounded-3xl p-10 flex flex-col justify-center items-center shadow-2xl relative bg-slate-900/60">
          <div class="w-full flex items-center justify-center h-[500px]">
            <svg width="100%" height="100%" viewBox="0 0 500 360" preserveAspectRatio="xMidYMid meet">
              ${svgLines}
              <circle
                id="hub-node"
                cx="${hubX}"
                cy="${hubY}"
                r="35"
                fill="#1e293b"
                stroke="#3b82f6"
                stroke-width="4"
                class="cursor-pointer hover:stroke-blue-400 hover:fill-blue-900/30 transition-all duration-300"
              />
              <text x="${hubX}" y="${hubY + 6}" text-anchor="middle" fill="#fff" font-size="14" font-weight="extrabold" class="pointer-events-none font-sans">
                HUB
              </text>
              <text x="${hubX}" y="${hubY + 50}" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold" class="pointer-events-none font-sans">
                Strasbourg
              </text>
              ${svgNodes}
            </svg>
          </div>
          <div class="absolute bottom-6 left-0 right-0 text-center text-sm text-slate-400 font-semibold tracking-wide">
            Survolez un nœud du schéma pour inspecter ses configurations de pare-feu
          </div>
        </div>

        <!-- Details Column -->
        <div class="col-span-1 glass-panel rounded-3xl p-10 shadow-2xl bg-slate-900/60 flex flex-col justify-center" id="site-details-panel">
          <!-- Populated in bind -->
        </div>

      </div>
    </div>
  `;

  const presSlide2 = `
    <div data-pres-slide="2" data-pres-label="Cluster Proxmox" class="flex-1 min-h-0 flex flex-col items-center justify-center space-y-12 w-full max-w-5xl mx-auto h-full py-4">
      <div class="text-center space-y-4 w-full mb-8">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Capacité du Cluster Proxmox HA</h2>
        <div class="w-16 h-1.5 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
        <p class="text-xl text-slate-400 mt-4">Ressources allouées sur le Hub centralisé (${state.serversCount} Nœuds physiques)</p>
      </div>

      <div class="w-full glass-panel rounded-3xl p-12 space-y-12 shadow-2xl bg-slate-900/60">
        
        <!-- CPU -->
        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <span class="text-2xl font-bold text-slate-300 flex items-center gap-3">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              Processeur (vCœurs)
            </span>
            <span class="text-3xl font-mono font-extrabold text-blue-400">${allocatedCores} / ${totalCores} <span class="text-xl text-slate-500">(${pctCores}%)</span></span>
          </div>
          <div class="h-6 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5">
            <div class="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style="width: ${pctCores}%"></div>
          </div>
        </div>

        <!-- RAM -->
        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <span class="text-2xl font-bold text-slate-300 flex items-center gap-3">
              <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="4" x2="10" y2="20"></line></svg>
              Mémoire RAM (Go)
            </span>
            <span class="text-3xl font-mono font-extrabold text-indigo-400">${allocatedRam} / ${totalRam} <span class="text-xl text-slate-500">(${pctRam}%)</span></span>
          </div>
          <div class="h-6 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5">
            <div class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full" style="width: ${pctRam}%"></div>
          </div>
        </div>

        <!-- Ceph Storage -->
        <div class="space-y-4">
          <div class="flex justify-between items-end">
            <span class="text-2xl font-bold text-slate-300 flex items-center gap-3">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              Pool Ceph (Utile NVMe)
            </span>
            <span class="text-3xl font-mono font-extrabold text-emerald-400">1.2 TB / 6.0 TB <span class="text-xl text-slate-500">(20%)</span></span>
          </div>
          <div class="h-6 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5">
            <div class="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style="width: 20%"></div>
          </div>
        </div>

      </div>
    </div>
  `;

  const presSlide3 = `
    <div data-pres-slide="3" data-pres-label="Déploiement IaC" class="flex-1 min-h-0 flex flex-col items-center justify-center space-y-8 w-full max-w-6xl mx-auto h-full py-4">
      <div class="text-center space-y-4 w-full mb-4">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Déploiement Automatisé (IaC)</h2>
        <div class="w-16 h-1.5 bg-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <p class="text-xl text-slate-400 mt-4">Infrastructure-as-Code pour un provisionning reproductible</p>
      </div>

      <div class="w-full glass-panel rounded-3xl p-8 flex flex-col shadow-2xl bg-slate-900/80 flex-1 min-h-0">
        <div class="flex justify-between items-center border-b border-white/10 pb-6 mb-6 flex-shrink-0">
          <div class="flex bg-slate-950 p-2 rounded-xl border border-white/10 text-lg">
            <button
              id="btn-code-terraform"
              class="px-6 py-2 rounded-lg font-bold transition bg-blue-600/20 text-blue-400"
            >
              Terraform (VMs)
            </button>
            <button
              id="btn-code-ansible"
              class="px-6 py-2 rounded-lg font-bold transition text-slate-400 hover:text-slate-200"
            >
              Ansible (Hardening)
            </button>
          </div>
          <div class="flex items-center gap-3 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Pipeline Validé
          </div>
        </div>

        <div class="bg-[#0d1117] rounded-2xl p-8 font-mono text-base text-slate-300 overflow-y-auto flex-1 border border-white/10 shadow-inner" id="code-content-box">
          <!-- Populated -->
        </div>
        
        <div class="flex justify-between items-center text-sm font-semibold text-slate-500 mt-6 border-t border-white/10 pt-4 flex-shrink-0">
          <span id="code-file-path" class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            /Scripts/03_Proxmox_Provisioning.tf
          </span>
          <span class="text-slate-600">Projet GSBLAB - Repository Interne</span>
        </div>
      </div>
    </div>
  `;

  return `${presSlide1}${presSlide2}${presSlide3}`;
}

const codeTerraform = `# ==============================================================================
# PROXMOX VE VM PROVISIONING - GEOPROJECT GSBLAB
# ==============================================================================
resource "proxmox_vm_qemu" "sgl_server" {
  name        = "SRV-STR-SGL-01"
  desc        = "Serveur Web & Base de Données Medoc - SGL"
  target_node = "pve02"
  vmid        = 101
  onboot      = true
  hastate     = "started"

  cores   = 8
  sockets = 1
  memory  = 16384
  
  # RESOLUTION INCOMPATIBILITE CPU (Xeon 2023 vs 2016)
  cpu     = "x86-64-v2-AES"

  network {
    id     = 0
    model  = "virtio"
    bridge = "vmbr0"
    tag    = 10 # Tag VLAN 10 (Production Médicale HDS)
  }
}`;

const codeAnsible = `# ==============================================================================
# OS HARDENING PLAYBOOK - GEOPROJECT GSBLAB
# ==============================================================================
- name: Playbook de Durcissement Système HDS / ANSSI
  hosts: linux_servers
  become: true
  tasks:
    - name: Durcissement de la configuration SSH daemon
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "{{ item.regexp }}"
        line: "{{ item.line }}"
      loop:
        - { regexp: '^PermitRootLogin', line: 'PermitRootLogin no' }
        - { regexp: '^PasswordAuthentication', line: 'PasswordAuthentication no' }
        - { regexp: '^MaxAuthTries', line: 'MaxAuthTries 3' }
      notify: Redemarrer SSH`;

const renderDetails = (site, isPres) => {
  const isHub = site.id === '1';
  
  // Custom sizing based on mode
  const titleClass = isPres ? "text-xl font-bold text-slate-300 uppercase tracking-wider border-b border-white/10 pb-4 mb-6" : "text-sm font-semibold text-slate-300 uppercase tracking-wider border-b border-white/5 pb-2";
  const rowClass = isPres ? "flex justify-between items-center text-lg" : "flex justify-between text-xs";
  const labelClass = isPres ? "text-slate-400 font-medium" : "text-slate-500";
  const valueClass = isPres ? "font-bold text-white text-xl" : "font-bold text-white text-xs";
  const monoValueClass = isPres ? "font-mono font-bold text-slate-300 text-xl" : "font-mono font-semibold text-slate-300 text-xs";
  const ipClass = isPres ? "font-mono font-bold text-blue-400 text-xl" : "font-mono font-semibold text-blue-400 text-xs";
  const statusClass = isPres ? "font-bold flex items-center gap-2 text-emerald-400 text-xl" : "font-semibold flex items-center gap-1 text-emerald-400 text-xs";
  
  const boxClass = isPres ? "bg-slate-950/80 rounded-2xl p-6 space-y-3" : "bg-slate-900/50 rounded-lg p-3 space-y-2";
  const boxTitleClass = isPres ? "text-sm font-extrabold text-blue-400 uppercase tracking-widest" : "text-[10px] font-bold text-blue-400 uppercase";
  const boxTextClass = isPres ? "text-base text-slate-400 leading-relaxed font-medium" : "text-[10px] text-slate-500 leading-relaxed";

  return `
    <div class="space-y-6 animate-fade-in w-full">
      <h3 class="${titleClass}">
        Détails du Site Sélectionné
      </h3>
      
      <div class="${isPres ? 'space-y-5' : 'space-y-3'} w-full">
        <div class="${rowClass}">
          <span class="${labelClass}">Nom du site :</span>
          <span class="${valueClass}">${site.name}</span>
        </div>
        <div class="${rowClass}">
          <span class="${labelClass}">Zone / Région :</span>
          <span class="${valueClass} text-slate-300">${site.region}</span>
        </div>
        <div class="${rowClass}">
          <span class="${labelClass}">Postes Connectés :</span>
          <span class="${monoValueClass}">${site.usersCount} clients</span>
        </div>
        <div class="${rowClass}">
          <span class="${labelClass}">IP Passerelle WAN :</span>
          <span class="${ipClass}">${site.wanIP}</span>
        </div>
        <div class="${rowClass}">
          <span class="${labelClass}">Statut Tunnel VPN IPsec :</span>
          <span class="${statusClass}">
            <svg class="${isPres ? 'w-6 h-6' : 'w-3.5 h-3.5'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${isHub ? 'LOCAL (HUB)' : 'CONNECTÉ'}
          </span>
        </div>
        <div class="${rowClass}">
          <span class="${labelClass}">Modèle Pare-feu :</span>
          <span class="${monoValueClass}">${site.firewallModel}</span>
        </div>
      </div>

      <div class="border-t ${isPres ? 'border-white/10 pt-8 mt-8' : 'border-white/5 pt-4 mt-6'}">
        <div class="${boxClass}">
          <div class="${boxTitleClass}">Architecture de sécurité</div>
          <p class="${boxTextClass}">
            Chaque spoke est cloisonné. Les flux cliniques (VLAN 10) et d'administration (VLAN 99) transitent de manière chiffrée par VPN IPsec SD-WAN, interdisant tout accès latéral inter-laboratoires.
          </p>
        </div>
      </div>
    </div>
  `;
};

export function bindTechEvents(state) {
  const isPres = state.presentationMode;
  const detailsPanel = document.getElementById('site-details-panel');
  
  // Set default details (Strasbourg Hub)
  if (detailsPanel) {
    detailsPanel.innerHTML = renderDetails(state.spokesList[0], isPres);
  }

  // Code content default
  const codeBox = document.getElementById('code-content-box');
  const codePath = document.getElementById('code-file-path');
  if (codeBox) {
    codeBox.innerHTML = `<pre class="language-hcl"><code>${codeTerraform}</code></pre>`;
  }

  // Mouse hover listeners on spoke SVG groups
  const groups = document.querySelectorAll('.spoke-node-group');
  groups.forEach(group => {
    group.addEventListener('mouseenter', () => {
      const siteId = group.getAttribute('data-spoke-id');
      const site = state.spokesList.find(s => s.id === siteId);
      
      // Highlight SVG node line
      const line = document.getElementById(`line-${siteId}`);
      if (line) {
        line.setAttribute('stroke', '#10b981');
        line.setAttribute('stroke-width', isPres ? '3' : '2');
        line.setAttribute('stroke-dasharray', 'none');
      }

      // Update Details panel
      if (detailsPanel) {
        detailsPanel.innerHTML = renderDetails(site, isPres);
      }
    });

    group.addEventListener('mouseleave', () => {
      const siteId = group.getAttribute('data-spoke-id');
      
      // Reset line style
      const line = document.getElementById(`line-${siteId}`);
      if (line) {
        line.setAttribute('stroke', '#1e293b');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '4,4');
      }
    });
  });

  // Hover central Hub
  const hubNode = document.getElementById('hub-node');
  if (hubNode) {
    hubNode.addEventListener('mouseenter', () => {
      if (detailsPanel) {
        detailsPanel.innerHTML = renderDetails(state.spokesList[0], isPres);
      }
    });
  }

  // Code Tab toggles
  const btnTf = document.getElementById('btn-code-terraform');
  const btnAn = document.getElementById('btn-code-ansible');

  if (btnTf && btnAn && codeBox && codePath) {
    const btnActiveClass = isPres ? "px-6 py-2 rounded-lg font-bold transition bg-blue-600/20 text-blue-400" : "px-3 py-1 rounded-md font-medium transition bg-blue-600/10 text-blue-400";
    const btnInactiveClass = isPres ? "px-6 py-2 rounded-lg font-bold transition text-slate-400 hover:text-slate-200" : "px-3 py-1 rounded-md font-medium transition text-slate-400";

    btnTf.addEventListener('click', () => {
      btnTf.className = btnActiveClass;
      btnAn.className = btnInactiveClass;
      codeBox.innerHTML = `<pre class="language-hcl"><code>${codeTerraform}</code></pre>`;
      codePath.innerHTML = `<svg class="${isPres ? 'w-5 h-5' : 'hidden'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg> /Scripts/03_Proxmox_Provisioning.tf`;
    });

    btnAn.addEventListener('click', () => {
      btnAn.className = btnActiveClass;
      btnTf.className = btnInactiveClass;
      codeBox.innerHTML = `<pre class="language-yaml"><code>${codeAnsible}</code></pre>`;
      codePath.innerHTML = `<svg class="${isPres ? 'w-5 h-5' : 'hidden'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg> /Scripts/04_Server_Hardening.yml`;
    });
  }
}
