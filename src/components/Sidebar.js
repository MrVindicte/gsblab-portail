const icons = {
  dashboard:  `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
  finance:    `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
  tech:       `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M12 8v8M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path></svg>`,
  drp:        `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
  pmo:        `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  comparison: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  sites:      `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  conclusion: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
};

export const menuSections = [
  {
    title: 'Vision &amp; Contexte',
    items: [
      { id: 'dashboard',  name: 'Synthèse Exécutive',       icon: 'dashboard'  },
      { id: 'comparison', name: 'Dette Technique vs Cible',  icon: 'comparison' },
      { id: 'sites',      name: 'Cartographie des Sites',    icon: 'sites'      }
    ]
  },
  {
    title: 'Ingénierie &amp; Solutions',
    items: [
      { id: 'tech', name: 'Architecture Infrastructure',      icon: 'tech' },
      { id: 'drp',  name: 'Simulateur PRA &amp; Résilience', icon: 'drp'  }
    ]
  },
  {
    title: 'Gouvernance &amp; Finances',
    items: [
      { id: 'finance', name: 'Ingénierie Financière — TCO',   icon: 'finance' },
      { id: 'pmo',     name: 'Registre PMO &amp; RACI',       icon: 'pmo'     }
    ]
  },
  {
    title: 'Clôture du Projet',
    items: [
      { id: 'conclusion', name: 'Conclusion &amp; Bilan',     icon: 'conclusion' }
    ]
  }
];

const SB_MIN = 220;
const SB_MAX = 420;
const SB_DEFAULT = 290;

export default function Sidebar(activeTab) {
  let globalIndex = 0;

  const renderedSections = menuSections.map(section => {
    const renderedItems = section.items.map(item => {
      globalIndex++;
      const num = globalIndex;
      const isActive = activeTab === item.id;
      return `
        <button
          data-tab="${item.id}"
          class="sidebar-nav-btn nav-item-base ${
            isActive
              ? 'nav-item-active'
              : 'nav-item-inactive'
          }"
        >
          ${isActive ? '<div class="absolute left-0 top-2 bottom-2 w-[3px] bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>' : ''}
          <span class="flex-shrink-0 font-mono text-xs font-bold mt-0.5 w-5 text-right leading-none ${isActive ? 'text-blue-400/80' : 'text-slate-600 group-hover:text-slate-500'}">${num}.</span>
          <span class="flex-shrink-0 mt-0.5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}">${icons[item.icon]}</span>
          <span class="relative z-10 leading-snug">${item.name}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="mb-5 last:mb-0">
        <h3 class="nav-section-title">
          <span class="w-3 h-px bg-slate-700 rounded-full"></span>
          ${section.title}
        </h3>
        <div class="flex flex-col gap-0.5">
          ${renderedItems}
        </div>
      </div>
    `;
  }).join('');

  return `
    <aside
      id="sidebar-el"
      class="hidden md:flex flex-col bg-[#0a0c10] border-r border-white/5 p-4 no-print md:h-full overflow-y-auto relative flex-shrink-0"
      style="width:${SB_DEFAULT}px; min-width:${SB_MIN}px; max-width:${SB_MAX}px;"
    >
      <nav class="flex-1 flex flex-col pt-1">
        ${renderedSections}
      </nav>

      <div class="mt-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
        <div class="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
          Statut environnement
        </div>
        <div class="flex items-center gap-3 text-xs font-medium">
          <div class="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <span class="text-slate-300">Cluster HA Strasbourg Sain</span>
        </div>
        <div class="flex items-center gap-3 text-xs font-medium">
          <div class="w-2.5 h-2.5 bg-emerald-500 rounded-full flex-shrink-0 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
          <span class="text-slate-300">17 Tunnels IPsec Actifs</span>
        </div>
      </div>

      <!-- Resize handle -->
      <div
        id="sb-resize-handle"
        class="absolute top-0 right-0 w-1.5 h-full cursor-col-resize group flex items-center justify-center z-50"
        title="Glisser pour redimensionner"
      >
        <div class="w-0.5 h-12 rounded-full bg-white/5 group-hover:bg-blue-500/60 group-active:bg-blue-500 transition-all duration-150"></div>
      </div>
    </aside>
  `;
}

export function bindSidebarEvents(renderApp) {
  // Nav links
  document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.appState.activeTab = btn.getAttribute('data-tab');
      renderApp();
    });
  });

  // Resizable sidebar
  const sidebar = document.getElementById('sidebar-el');
  const handle  = document.getElementById('sb-resize-handle');
  if (!sidebar || !handle) return;

  let startX = 0;
  let startW = 0;
  let dragging = false;

  handle.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX;
    startW = sidebar.offsetWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const delta = e.clientX - startX;
    const newW  = Math.min(SB_MAX, Math.max(SB_MIN, startW + delta));
    sidebar.style.width = newW + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}
