import { buildDashboardHTML } from './tech/techDashboard.js';
import { buildPresHTML } from './tech/techSlides.js';
import { renderDetails } from './tech/techRenderers.js';
import { initFranceMap } from './tech/techFranceMap.js';
import { codeTerraform, codeAnsible } from './tech/techData.js';
import { vlanGridHTML } from './tech/techRenderers.js';

export default function TechnicalWorkspace(state) {
  const isPres = state.presentationMode;

  if (!isPres) {
    return buildDashboardHTML(state);
  }
  
  return buildPresHTML(state);
}

export function bindTechEvents(state) {
  const isPres = state.presentationMode;
  const detailsPanel = document.getElementById('site-details-panel');
  if (detailsPanel) {
    detailsPanel.innerHTML = renderDetails(state.spokesList[0], isPres);
  }

  const codeBox  = document.getElementById('code-content-box');
  const codePath = document.getElementById('code-file-path');
  if (codeBox) codeBox.innerHTML = `<pre class="language-hcl"><code>${codeTerraform}</code></pre>`;

  // Hub-spoke hover (non-pres)
  const groups = document.querySelectorAll('.spoke-node-group');
  groups.forEach(group => {
    group.addEventListener('mouseenter', () => {
      const site = state.spokesList.find(s => s.id === group.getAttribute('data-spoke-id'));
      const line = document.getElementById(`line-${site.id}`);
      if (line) { line.setAttribute('stroke','#10b981'); line.setAttribute('stroke-width', isPres ? '3' : '2'); line.setAttribute('stroke-dasharray','none'); }
      if (detailsPanel) detailsPanel.innerHTML = renderDetails(site, isPres);
    });
    group.addEventListener('mouseleave', () => {
      const siteId = group.getAttribute('data-spoke-id');
      const line = document.getElementById(`line-${siteId}`);
      if (line) { line.setAttribute('stroke','#1e293b'); line.setAttribute('stroke-width','1'); line.setAttribute('stroke-dasharray','4,4'); }
    });
  });

  const hubNode = document.getElementById('hub-node');
  if (hubNode) hubNode.addEventListener('mouseenter', () => { if (detailsPanel) detailsPanel.innerHTML = renderDetails(state.spokesList[0], isPres); });

  // Code tabs (slides 3 & 6)
  const btnTf = document.getElementById('btn-code-terraform');
  const btnAn = document.getElementById('btn-code-ansible');
  if (btnTf && btnAn && codeBox && codePath) {
    const btnActiveClass   = isPres ? "px-6 py-2 rounded-lg font-bold transition bg-blue-600/20 text-blue-400" : "px-3 py-1 rounded-md font-medium transition bg-blue-600/10 text-blue-400";
    const btnInactiveClass = isPres ? "px-6 py-2 rounded-lg font-bold transition text-slate-400 hover:text-slate-200" : "px-3 py-1 rounded-md font-medium transition text-slate-400";
    btnTf.addEventListener('click', () => { btnTf.className = btnActiveClass; btnAn.className = btnInactiveClass; codeBox.innerHTML = `<pre class="language-hcl"><code>${codeTerraform}</code></pre>`; codePath.innerHTML = `<svg class="${isPres ? 'w-5 h-5' : 'hidden'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg> /Scripts/03_Proxmox_Provisioning.tf`; });
    btnAn.addEventListener('click', () => { btnAn.className = btnActiveClass; btnTf.className = btnInactiveClass; codeBox.innerHTML = `<pre class="language-yaml"><code>${codeAnsible}</code></pre>`; codePath.innerHTML = `<svg class="${isPres ? 'w-5 h-5' : 'hidden'}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg> /Scripts/04_Server_Hardening.yml`; });
  }

  // Populate VLAN grids
  const siegeVlans  = document.getElementById('siegeVlans');
  const laboVlans   = document.getElementById('laboVlans');
  const centreVlans = document.getElementById('centreVlans');
  if (siegeVlans)  siegeVlans.innerHTML  = vlanGridHTML(2, true);
  if (laboVlans)   laboVlans.innerHTML   = vlanGridHTML(10);
  if (centreVlans) centreVlans.innerHTML = vlanGridHTML(20);

  // Initialise la carte de France et les animations
  initFranceMap();
}
