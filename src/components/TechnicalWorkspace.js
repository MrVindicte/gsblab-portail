export default function TechnicalWorkspace(state) {
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
    <g class="spoke-node-group" data-spoke-id="${spoke.id}">
      <circle
        cx="${spoke.x}"
        cy="${spoke.y}"
        r="10"
        fill="#131b2e"
        stroke="#1e293b"
        stroke-width="2"
        class="cursor-pointer hover:stroke-emerald-400 transition"
      />
      <text 
        x="${spoke.x}" 
        y="${spoke.y + 20}" 
        text-anchor="middle" 
        fill="#64748b" 
        font-size="7" 
        class="pointer-events-none font-sans"
      >
        ${spoke.name.replace('Labo Expansion ', 'E-').replace('Strasbourg ', 'S-').split(' ')[0]}
      </text>
    </g>
  `).join('');

  return `
    <div class="space-y-6">
      
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
        <div data-pres-step="1" class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Topologie Réseau Hub & Spoke (Interactif)
          </h3>
          
          <div class="bg-slate-950/60 rounded-lg p-4 flex items-center justify-center overflow-x-auto">
            <svg width="500" height="360" viewBox="0 0 500 360" class="w-full max-w-[500px]">
              
              <!-- Draw lines -->
              ${svgLines}

              <!-- Strasbourg Hub Node -->
              <circle
                id="hub-node"
                cx="${hubX}"
                cy="${hubY}"
                r="24"
                fill="#1e293b"
                stroke="#3b82f6"
                stroke-width="3"
                class="cursor-pointer hover:stroke-blue-400 transition"
              />
              <text x="${hubX}" y="${hubY + 4}" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" class="pointer-events-none font-sans">
                HUB
              </text>
              <text x="${hubX}" y="${hubY + 38}" text-anchor="middle" fill="#94a3b8" font-size="8" font-weight="semibold" class="pointer-events-none font-sans">
                Strasbourg
              </text>

              <!-- Spoke Nodes -->
              ${svgNodes}

            </svg>
          </div>
          <div class="text-[10px] text-slate-500 mt-2 text-center">
            * Survolez un nœud du schéma pour inspecter ses configurations de pare-feu et d'adressage IP.
          </div>
        </div>

        <!-- Details Column -->
        <div data-pres-step="2" class="lg:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between" id="site-details-panel">
          <!-- Populated in bind -->
        </div>

      </div>

      <!-- Hardware gauges & Code Viewer -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Resources gauges -->
        <div data-pres-step="3" class="lg:col-span-1 glass-panel rounded-xl p-6 space-y-5 flex flex-col justify-between">
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
        <div data-pres-step="4" class="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
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

    </div>
  `;
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

const renderDetails = (site) => {
  const isHub = site.id === '1';
  return `
    <div class="space-y-4 animate-fade-in">
      <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-wider border-b border-white/5 pb-2">
        Détails du Site Sélectionné
      </h3>
      
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-xs text-slate-500">Nom du site :</span>
          <span class="text-xs font-bold text-white">${site.name}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-slate-500">Zone / Région :</span>
          <span class="text-xs font-semibold text-slate-300">${site.region}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-slate-500">Postes Connectés :</span>
          <span class="text-xs font-mono font-semibold text-slate-300">${site.usersCount} clients</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-slate-500">IP Passerelle WAN :</span>
          <span class="text-xs font-mono font-semibold text-blue-400">${site.wanIP}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-slate-500">Statut Tunnel VPN IPsec :</span>
          <span class="text-xs font-semibold flex items-center gap-1 text-emerald-400">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${isHub ? 'LOCAL (HUB)' : 'CONNECTÉ'}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-slate-500">Modèle Pare-feu Cible :</span>
          <span class="text-xs font-mono font-semibold text-slate-300">${site.firewallModel}</span>
        </div>
      </div>

      <div class="border-t border-white/5 pt-4 mt-6">
        <div class="bg-slate-900/50 rounded-lg p-3 space-y-2">
          <div class="text-[10px] font-bold text-blue-400 uppercase">Architecture de sécurité</div>
          <p class="text-[10px] text-slate-500 leading-relaxed">
            Chaque spoke est cloisonné. Les flux cliniques (VLAN 10) et d'administration (VLAN 99) transitent de manière chiffrée par VPN IPsec SD-WAN, interdisant tout accès latéral inter-laboratoires.
          </p>
        </div>
      </div>
    </div>
  `;
};

export function bindTechEvents(state) {
  const detailsPanel = document.getElementById('site-details-panel');
  
  // Set default details (Strasbourg Hub)
  detailsPanel.innerHTML = renderDetails(state.spokesList[0]);

  // Code content default
  const codeBox = document.getElementById('code-content-box');
  const codePath = document.getElementById('code-file-path');
  codeBox.innerHTML = `<pre>${codeTerraform}</pre>`;

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
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', 'none');
      }

      // Highlight SVG circle node
      const circle = group.querySelector('circle');
      if (circle) {
        circle.setAttribute('fill', '#10b981');
        circle.setAttribute('stroke', '#fff');
      }

      // Update Details panel
      detailsPanel.innerHTML = renderDetails(site);
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

      // Reset circle style
      const circle = group.querySelector('circle');
      if (circle) {
        circle.setAttribute('fill', '#131b2e');
        circle.setAttribute('stroke', '#1e293b');
      }
    });
  });

  // Hover central Hub
  const hubNode = document.getElementById('hub-node');
  hubNode.addEventListener('mouseenter', () => {
    detailsPanel.innerHTML = renderDetails(state.spokesList[0]);
  });

  // Code Tab toggles
  const btnTf = document.getElementById('btn-code-terraform');
  const btnAn = document.getElementById('btn-code-ansible');

  btnTf.addEventListener('click', () => {
    btnTf.className = "px-3 py-1 rounded-md font-medium transition bg-blue-600/10 text-blue-400";
    btnAn.className = "px-3 py-1 rounded-md font-medium transition text-slate-400";
    codeBox.innerHTML = `<pre>${codeTerraform}</pre>`;
    codePath.innerText = "Chemin : /Scripts/03_Proxmox_Provisioning.tf";
  });

  btnAn.addEventListener('click', () => {
    btnAn.className = "px-3 py-1 rounded-md font-medium transition bg-blue-600/10 text-blue-400";
    btnTf.className = "px-3 py-1 rounded-md font-medium transition text-slate-400";
    codeBox.innerHTML = `<pre>${codeAnsible}</pre>`;
    codePath.innerText = "Chemin : /Scripts/04_Server_Hardening.yml";
  });
}
