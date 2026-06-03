const icons = {
  dashboard: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
  finance: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
  tech: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M12 8v8M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path></svg>`,
  drp: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
  pmo: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  comparison: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  sites: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
};

export default function Sidebar(activeTab) {
  const menuItems = [
    { id: 'dashboard', name: 'Synthese Generale', icon: 'dashboard' },
    { id: 'finance', name: 'Espace Chiffrage & TCO', icon: 'finance' },
    { id: 'tech', name: 'Technique & Architecture', icon: 'tech' },
    { id: 'drp', name: 'Simulateur PRA / DRP', icon: 'drp' },
    { id: 'pmo', name: 'PMO : Risques & RACI', icon: 'pmo' },
    { id: 'comparison', name: 'Dette : Avant / Apres', icon: 'comparison' },
    { id: 'sites', name: 'Présentation des Sites', icon: 'sites' }
  ];

  const renderedItems = menuItems.map(item => {
    const isActive = activeTab === item.id;
    return `
      <button
        data-tab="${item.id}"
        class="sidebar-nav-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left border ${
          isActive
            ? 'bg-blue-500/15 border-blue-500/35 text-blue-300 font-semibold shadow-[inset_3px_0_0_#6366f1]'
            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent'
        }"
      >
        <span class="${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}">${icons[item.icon]}</span>
        ${item.name}
        ${isActive ? '<span class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#818cf8]"></span>' : ''}
      </button>
    `;
  }).join('');

  return `
    <aside class="w-full md:w-72 bg-slate-900 border-r border-white/5 p-6 flex flex-col gap-6 no-print md:h-full overflow-y-auto">
      <div class="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3">
        Espaces Projet
      </div>
      
      <nav class="flex flex-col gap-1">
        ${renderedItems}
      </nav>
      
      <div class="mt-auto bg-slate-950/50 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
        <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          Statut de l'environnement
        </div>
        <div class="flex items-center gap-2 text-xs">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span class="text-slate-300">Cluster Strasbourg Sain</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span class="text-slate-300">17 VPN Spokes Actifs</span>
        </div>
      </div>
    </aside>
  `;
}

export function bindSidebarEvents(renderApp) {
  const buttons = document.querySelectorAll('.sidebar-nav-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      window.appState.activeTab = tabId;
      renderApp();
    });
  });
}
