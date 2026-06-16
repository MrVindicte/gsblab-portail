// ══════════════════════════════════════════════════════════════════════════════
// techRenderers.js — Fonctions de rendu réutilisables (tooltips, détails, VLANs)
// ══════════════════════════════════════════════════════════════════════════════

export const renderDetails = (site, isPres) => {
  const isHub = site.id === '1';
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
      <h3 class="${titleClass}">Détails du Site Sélectionné</h3>
      <div class="${isPres ? 'space-y-5' : 'space-y-3'} w-full">
        <div class="${rowClass}"><span class="${labelClass}">Nom du site :</span><span class="${valueClass}">${site.name}</span></div>
        <div class="${rowClass}"><span class="${labelClass}">Zone / Région :</span><span class="${valueClass} text-slate-300">${site.region}</span></div>
        <div class="${rowClass}"><span class="${labelClass}">Postes Connectés :</span><span class="${monoValueClass}">${site.usersCount} clients</span></div>
        <div class="${rowClass}"><span class="${labelClass}">IP Passerelle WAN :</span><span class="${ipClass}">${site.wanIP}</span></div>
        <div class="${rowClass}"><span class="${labelClass}">Statut Tunnel VPN :</span><span class="${statusClass}"><svg class="${isPres ? 'w-6 h-6' : 'w-3.5 h-3.5'}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>${isHub ? 'LOCAL (HUB)' : 'CONNECTÉ'}</span></div>
        <div class="${rowClass}"><span class="${labelClass}">Modèle Pare-feu :</span><span class="${monoValueClass}">${site.firewallModel}</span></div>
      </div>
      <div class="border-t ${isPres ? 'border-white/10 pt-8 mt-8' : 'border-white/5 pt-4 mt-6'}">
        <div class="${boxClass}"><div class="${boxTitleClass}">Architecture de sécurité</div><p class="${boxTextClass}">Chaque spoke est cloisonné. Les flux cliniques (VLAN 10) et d'administration (VLAN 99) transitent de manière chiffrée par VPN IPsec SD-WAN, interdisant tout accès latéral inter-laboratoires.</p></div>
      </div>
    </div>
  `;
};

export const renderMapTooltip = (site, isHub) => `
  <div class="bg-[#0d0e13]/95 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-2xl w-56 space-y-1.5">
    <div class="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-1">
      <span class="text-sm font-extrabold text-white truncate">${site.name}</span>
      ${isHub ? '<span class="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-1.5 py-0.5 uppercase tracking-wider flex-shrink-0">Hub</span>' : ''}
    </div>
    <div class="flex justify-between text-xs"><span class="text-slate-400">Région</span><span class="font-semibold text-slate-200">${site.region}</span></div>
    <div class="flex justify-between text-xs"><span class="text-slate-400">Postes</span><span class="font-mono font-semibold text-slate-200">${site.usersCount}</span></div>
    <div class="flex justify-between text-xs"><span class="text-slate-400">Pare-feu</span><span class="font-mono font-semibold text-slate-200">${site.firewallModel}</span></div>
    <div class="flex justify-between items-center text-xs"><span class="text-slate-400">VPN IPsec</span><span class="font-bold text-emerald-400 flex items-center gap-1">${isHub ? 'LOCAL' : 'ACTIF'}<svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></span></div>
  </div>
`;

export function vlanGridHTML(sid, legacy) {
  const v10cidr = legacy ? `10.${sid}.1.0/24` : `10.${sid}.10.0/24`;
  const vlans = [
    {v:10, n:'Administration / Serveurs', s:v10cidr,            p:'Isolé — accès IT uniquement',      clr:'#c7d2fe', bg:'#0c1235'},
    {v:20, n:'Postes administratifs',     s:`10.${sid}.20.0/24`, p:'Internet + applications métier',    clr:'#818cf8', bg:'#0f1440'},
    {v:30, n:'Analyse médicale',          s:`10.${sid}.30.0/24`, p:'Isolement strict — données de santé', clr:'#34d399', bg:'#0a2020', hds:true},
    {v:40, n:'Wi-Fi / Invités',           s:`10.${sid}.40.0/24`, p:'Internet uniquement · isolé du LAN',  clr:'#d97706', bg:'#1a1000'},
    {v:99, n:'Management réseau',         s:`10.${sid}.99.0/24`, p:'Équipements UniFi — IT uniquement',    clr:'#64748b', bg:'#121820'},
  ];
  return vlans.map(v => `<div style="border-radius:8px;border:1.5px solid ${v.clr}40;background:${v.bg};padding:9px 11px;border-top:3px solid ${v.clr}"><div style="font-family:monospace;font-size:10px;font-weight:600;letter-spacing:.06em;color:${v.clr}99">VLAN ${v.v}</div><div style="font-weight:700;font-size:12px;color:#e2e8f0;margin:2px 0 3px">${v.n}${v.hds ? ' <span style="background:#0a2020;color:#34d399;border:1px solid #05966960;border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700">HDS</span>' : ''}</div><div style="font-family:monospace;font-size:11px;color:${v.clr}">${v.s}</div><div style="font-size:10px;color:#475569;margin-top:4px;line-height:1.4">${v.p}</div></div>`).join('');
}
