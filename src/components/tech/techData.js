// ══════════════════════════════════════════════════════════════════════════════
// techData.js — Constantes et données statiques du workspace Technique
// ══════════════════════════════════════════════════════════════════════════════

// ── Blocs de code IaC ──────────────────────────────────────────────────────

export const codeTerraform = `# ==============================================================================
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

export const codeAnsible = `# ==============================================================================
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

// ── Carte de France (positions non-pres) ────────────────────────────────────

export const mapHub = { x: 452, y: 133 };

export const mapPositions = [
  {x:308,y:50},{x:164,y:97},{x:115,y:151},{x:120,y:196},{x:203,y:188},{x:264,y:114},
  {x:326,y:93},{x:363,y:191},{x:399,y:195},{x:356,y:270},{x:291,y:269},{x:156,y:317},
  {x:230,y:380},{x:318,y:372},{x:368,y:382},{x:440,y:365}
];

export const franceMapPath = "M271,1 L332,40 L391,81 L472,106 L478,108 L463,128 L454,178 L418,228 L403,248 L431,267 L425,314 L456,359 L454,370 L421,396 L376,395 L314,390 L294,438 L235,435 L112,391 L122,385 L131,326 L126,258 L96,193 L53,169 L0,154 L30,132 L122,127 L117,74 L181,81 L227,53 Z";

// ── France map (pres slide 1) — données de sites ────────────────────────────

export const SIEGE_PT  = {id:'siege', name:'Strasbourg', x:500, y:180};

export const CENTRES_EXIST = [
  {id:'colmar',   name:'Colmar',   x:486, y:206},
  {id:'mulhouse', name:'Mulhouse', x:484, y:224},
  {id:'nancy',    name:'Nancy',    x:451, y:170},
  {id:'metz',     name:'Metz',     x:451, y:147},
  {id:'reims',    name:'Reims',    x:369, y:139},
  {id:'dijon',    name:'Dijon',    x:408, y:243}
].map(c => Object.assign(c, {existing:true}));

export const LABS = [
  {id:'toulouse',  name:'Toulouse',  sid:10, x:269, y:441, lx:0,   ly:19, anchor:'middle'},
  {id:'marseille', name:'Marseille', sid:11, x:417, y:450, lx:-13, ly:4,  anchor:'end'},
  {id:'nantes',    name:'Nantes',    sid:12, x:153, y:248, lx:14,  ly:4,  anchor:'start'},
  {id:'lyon',      name:'Lyon',      sid:13, x:399, y:326, lx:-14, ly:4,  anchor:'end'},
  {id:'lille',     name:'Lille',     sid:14, x:328, y:74,  lx:-14, ly:4,  anchor:'end'}
];

export const CENTRES_NEW = [
  {id:'montauban',    name:'Montauban',       sid:20, x:265, y:419, parent:'toulouse'},
  {id:'albi',         name:'Albi',            sid:21, x:296, y:424, parent:'toulouse'},
  {id:'carcassonne',  name:'Carcassonne',     sid:22, x:304, y:462, parent:'toulouse'},
  {id:'aix',          name:'Aix-en-Provence', sid:23, x:427, y:441, parent:'marseille'},
  {id:'toulon',       name:'Toulon',          sid:24, x:438, y:459, parent:'marseille'},
  {id:'avignon',      name:'Avignon',         sid:25, x:399, y:422, parent:'marseille'},
  {id:'angers',       name:'Angers',          sid:26, x:192, y:235, parent:'nantes'},
  {id:'stnazaire',    name:'Saint-Nazaire',   sid:27, x:134, y:248, parent:'nantes'},
  {id:'laroche',      name:'La Roche-sur-Yon',sid:28, x:158, y:277, parent:'nantes'},
  {id:'grenoble',     name:'Grenoble',        sid:29, x:434, y:356, parent:'lyon'},
  {id:'stetienne',    name:'Saint-Étienne',   sid:30, x:382, y:343, parent:'lyon'},
  {id:'valence',      name:'Valence',         sid:31, x:402, y:370, parent:'lyon'},
  {id:'arras',        name:'Arras',           sid:32, x:320, y:84,  parent:'lille'},
  {id:'valenciennes', name:'Valenciennes',    sid:33, x:349, y:81,  parent:'lille'},
  {id:'amiens',       name:'Amiens',          sid:34, x:302, y:106, parent:'lille'}
];

// ── Données du toggle Avant / Après ─────────────────────────────────────────

export const ERA_DATA = {
  avant:{sites:7, postes:92,  users:130, vlan:0, vlanL:'VLAN déployé',           vlanColor:'#f87171', kpiClass:'border-red-500/20'},
  apres:{sites:27,postes:242, users:380, vlan:5, vlanL:'VLAN / site (802.1Q)',    vlanColor:'#34d399', kpiClass:'border-emerald-500/20'}
};
