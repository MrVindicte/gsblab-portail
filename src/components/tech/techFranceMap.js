// ══════════════════════════════════════════════════════════════════════════════
// techFranceMap.js — Carte de France interactive et animation des ères (mode pres)
// ══════════════════════════════════════════════════════════════════════════════

import { SIEGE_PT, CENTRES_EXIST, LABS, CENTRES_NEW, ERA_DATA } from './techData.js';

export function initFranceMap() {
  const fmapLinks = document.getElementById('fmapLinks');
  const fmapSites = document.getElementById('fmapSites');
  if (!fmapLinks || !fmapSites) return;

  const NS = 'http://www.w3.org/2000/svg';

  function fmapCurve(x1,y1,x2,y2,k=0.13){
    const mx=(x1+x2)/2, my=(y1+y2)/2, dx=x2-x1, dy=y2-y1;
    return `M${x1},${y1} Q${(mx-dy*k).toFixed(1)},${(my+dx*k).toFixed(1)} ${x2},${y2}`;
  }
  
  function mkEl(tag, attrs, parent){
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // Tooltip
  const sdwanTip = document.getElementById('sdwanTip');
  function showSDWanTip(e, s, kind){
    const labels = {siege:'Hub SD-WAN · concentrateur des 26 tunnels', labo:'Laboratoire régional (phase 2026)', centre:'Centre de prélèvement'};
    const sub = {siege:'site 02 · GSBLAB-STR-DC', labo:`site ${s.sid||'02'} · GSBLAB-LAB-${(s.name||'').toUpperCase().slice(0,4)}`, centre:s.existing?'site historique — réseau renouvelé':`rattaché à ${LABS.find(l=>l.id===s.parent)?.name||''}`};
    if (!sdwanTip) return;
    sdwanTip.innerHTML = `<b class="font-bold text-white font-sans">${s.name}</b><br><span class="text-slate-400 text-xs">${labels[kind]||''}</span><br><span class="font-mono text-indigo-300 text-[10px]">${sub[kind]||''}</span>`;
    sdwanTip.style.left = Math.min(e.clientX+16, window.innerWidth-240)+'px';
    sdwanTip.style.top  = Math.min(e.clientY+16, window.innerHeight-100)+'px';
    sdwanTip.classList.add('opacity-100'); sdwanTip.classList.remove('opacity-0');
  }
  function hideSDWanTip(){ if (sdwanTip) { sdwanTip.classList.remove('opacity-100'); sdwanTip.classList.add('opacity-0'); } }

  function wireMap(g, site, kind){
    g.addEventListener('click', () => {});
    g.addEventListener('mousemove', e => showSDWanTip(e, site, kind));
    g.addEventListener('mouseleave', hideSDWanTip);
  }

  function buildFMap(){
    // Links avant
    CENTRES_EXIST.forEach(c => mkEl('path', {d:fmapCurve(c.x,c.y,SIEGE_PT.x,SIEGE_PT.y), class:'fmap-link legacy only-avant'}, fmapLinks));
    // SD-WAN links après
    CENTRES_EXIST.forEach(c => mkEl('path', {d:fmapCurve(c.x,c.y,SIEGE_PT.x,SIEGE_PT.y), class:'fmap-link sdwan only-apres'}, fmapLinks));
    LABS.forEach(l => mkEl('path', {d:fmapCurve(l.x,l.y,SIEGE_PT.x,SIEGE_PT.y,0.16), class:'fmap-link sdwan only-apres'}, fmapLinks));
    CENTRES_NEW.forEach(c => mkEl('path', {d:fmapCurve(c.x,c.y,SIEGE_PT.x,SIEGE_PT.y,0.10), class:'fmap-link sdwan to-centre only-apres'}, fmapLinks));
    mkEl('path', {d:fmapCurve(SIEGE_PT.x,SIEGE_PT.y,315,38,-0.18), class:'fmap-link backup only-apres'}, fmapLinks);

    // New centre markers
    CENTRES_NEW.forEach(c => {
      const g = mkEl('g', {class:'fmap-site only-apres', tabindex:0, role:'button'}, fmapSites);
      mkEl('circle', {cx:c.x,cy:c.y,r:4.5,fill:'#0d1117',stroke:'#818cf8','stroke-width':2}, g);
      wireMap(g, c, 'centre');
    });
    // Existing centres
    CENTRES_EXIST.forEach(c => {
      const g = mkEl('g', {class:'fmap-site', tabindex:0, role:'button'}, fmapSites);
      mkEl('circle', {cx:c.x,cy:c.y,r:4.5,fill:'#475569',stroke:'#1e293b','stroke-width':1.6}, g);
      wireMap(g, c, 'centre');
    });
    // Labs
    LABS.forEach(l => {
      const g = mkEl('g', {class:'fmap-site only-apres', tabindex:0, role:'button'}, fmapSites);
      mkEl('circle', {cx:l.x,cy:l.y,r:7,fill:'#6366f1',stroke:'#e0e7ff','stroke-width':2.2}, g);
      const t = mkEl('text', {x:l.x+l.lx,y:l.y+l.ly,class:'fmap-label major','text-anchor':l.anchor}, g);
      t.textContent = l.name;
      wireMap(g, l, 'labo');
    });
    // Siege
    const sg = mkEl('g', {class:'fmap-site', tabindex:0, role:'button'}, fmapSites);
    mkEl('circle', {cx:SIEGE_PT.x,cy:SIEGE_PT.y,r:14,fill:'none',stroke:'#818cf8','stroke-width':1.4,class:'fmap-halo'}, sg);
    mkEl('rect', {x:SIEGE_PT.x-8,y:SIEGE_PT.y-8,width:16,height:16,rx:3,fill:'#6366f1',stroke:'#e0e7ff','stroke-width':2.2,transform:`rotate(45 ${SIEGE_PT.x} ${SIEGE_PT.y})`}, sg);
    const st = mkEl('text', {x:SIEGE_PT.x-5,y:SIEGE_PT.y-16,class:'fmap-label major','text-anchor':'end'}, sg);
    st.textContent = 'Siège · Strasbourg';
    wireMap(sg, SIEGE_PT, 'siege');
  }

  function tweenEl(el, to){
    if (!el) return;
    const from = parseInt(el.textContent,10)||0;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches){ el.textContent=to; return; }
    const t0=performance.now(), dur=650;
    (function frame(t){ const p=Math.min((t-t0)/dur,1), ease=1-Math.pow(1-p,3);
      el.textContent=Math.round(from+(to-from)*ease);
      if(p<1) requestAnimationFrame(frame);
    })(t0);
  }

  function setEra(era){
    const toggle = document.getElementById('eraToggle');
    const eraState = document.getElementById('eraState');
    if (!toggle || !eraState) return;
    eraState.dataset.era = era;
    // Move pill
    const pill = document.getElementById('eraPill');
    if (pill) {
      if (era==='avant'){ pill.style.left='4px'; pill.style.background='rgba(239,68,68,0.08)'; pill.style.borderColor='rgba(239,68,68,0.15)'; }
      else             { pill.style.left='calc(50%)'; pill.style.background='rgba(16,185,129,0.08)'; pill.style.borderColor='rgba(16,185,129,0.15)'; }
    }
    // Update button labels
    const apresLabel = document.getElementById('eraBtnApresLabel');
    if (apresLabel) apresLabel.style.color = era==='apres' ? '#34d399' : '#94a3b8';
    // KPIs
    const d = ERA_DATA[era];
    tweenEl(document.getElementById('kSites'),  d.sites);
    tweenEl(document.getElementById('kPostes'), d.postes);
    tweenEl(document.getElementById('kUsers'),  d.users);
    tweenEl(document.getElementById('kVlan'),   d.vlan);
    const kVlanEl = document.getElementById('kVlan');
    const kpiVlan = document.getElementById('kpiVlan');
    const kVlanL  = document.getElementById('kVlanL');
    if (kVlanEl)  kVlanEl.style.color = d.vlanColor;
    if (kVlanL)   kVlanL.textContent  = d.vlanL;
    if (kpiVlan){ kpiVlan.style.borderColor = era==='avant' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'; }
    // Map era label
    const fmapEraLabel = document.getElementById('fmapEraLabel');
    if (fmapEraLabel) {
      if (era === 'avant') {
        fmapEraLabel.textContent = '2026 — Avant migration';
        fmapEraLabel.style.color = 'rgb(251,146,60)';
        fmapEraLabel.style.background = 'rgba(120,53,15,0.35)';
        fmapEraLabel.style.borderColor = 'rgba(239,68,68,0.3)';
      } else {
        fmapEraLabel.textContent = '2030 — Cible SD-WAN';
        fmapEraLabel.style.color = 'rgb(52,211,153)';
        fmapEraLabel.style.background = 'rgba(6,78,59,0.3)';
        fmapEraLabel.style.borderColor = 'rgba(52,211,153,0.3)';
      }
    }
    // Panels
    const pAvant = document.getElementById('fmapPanelAvant');
    const pApres = document.getElementById('fmapPanelApres');
    if (pAvant) pAvant.classList.toggle('hidden', era !== 'avant');
    if (pApres) pApres.classList.toggle('hidden', era !== 'apres');
  }

  // Era toggle listeners
  document.querySelectorAll('[data-era-btn]').forEach(b => {
    b.addEventListener('click', () => setEra(b.dataset.eraBtn));
  });

  buildFMap();

  // Listen for step changes to automate era toggle
  if (!window._techStepListener) {
    window.addEventListener('presentationStepChange', (e) => {
      if (e.detail.tab === 'tech') {
        const step = e.detail.step;

        if (step >= 5 && step <= 8) {
          const btnApres = document.querySelector('[data-era-btn="apres"]');
          if (btnApres && document.getElementById('eraState')?.dataset.era !== 'apres') {
            btnApres.click();
          }
        } else if (step < 6) {
          const btnAvant = document.querySelector('[data-era-btn="avant"]');
          if (btnAvant && document.getElementById('eraState')?.dataset.era !== 'avant') {
            btnAvant.click();
          }
        }
      }
    });
    window._techStepListener = true;
  }
}
