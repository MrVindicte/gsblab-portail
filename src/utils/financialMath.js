export const HARDWARE_BASELINE = (2 * 20000) + (2 * 2500) + 8000 + 3400; // Dell R760s, CBS350, PBS, SSD upgrades R730
export const ESN_SERVICES_BASELINE = 65000;
export const OFFICE_LTSC_UNIT_PRICE = 260;

/**
 * Calcul complet des budgets CapEx et OpEx pour les 3 scénarios
 */
export const calculateFinancials = (
  usersCount,
  sitesCount,
  serversCount,
  vmwareCorePrice,
  cloudMonthlyCost
) => {
  // Licences Office LTSC Standard
  const officeLicences = usersCount * OFFICE_LTSC_UNIT_PRICE;

  // --- SCÉNARIO A : PROXMOX HA (LA CIBLE) ---
  const capexProxmox = {
    hardware: HARDWARE_BASELINE,
    software: officeLicences,
    security: (2 * 4000) + (sitesCount * 800), // Firewalls Strasbourg HA + Spokes
    integration: ESN_SERVICES_BASELINE,
    total: 0
  };
  capexProxmox.total = capexProxmox.hardware + capexProxmox.software + capexProxmox.security + capexProxmox.integration;

  const opexProxmox = {
    hypervisorSupport: serversCount * 2 * 450, // Standard Proxmox support (8 sockets)
    cloudHosting: 0,
    messagerieSaas: usersCount * 4.5 * 12, // Exchange Online
    networkAndWan: (sitesCount * 250) + (sitesCount * 80 * 12), // FortiCare + WAN links
    miscellaneous: 1500, // Bandes LTO, consommables
    total: 0
  };
  opexProxmox.total = opexProxmox.hypervisorSupport + opexProxmox.cloudHosting + opexProxmox.messagerieSaas + opexProxmox.networkAndWan + opexProxmox.miscellaneous;

  // --- SCÉNARIO B : VMWARE BROADCOM ---
  const capexVmware = {
    ...capexProxmox // CapEx initial identique
  };

  const totalCores = serversCount * 2 * 16; // Min 16 cœurs par socket
  const opexVmware = {
    hypervisorSupport: totalCores * vmwareCorePrice, // Broadcom licensing per core
    cloudHosting: 0,
    messagerieSaas: opexProxmox.messagerieSaas,
    networkAndWan: opexProxmox.networkAndWan,
    miscellaneous: 1500,
    total: 0
  };
  opexVmware.total = opexVmware.hypervisorSupport + opexVmware.cloudHosting + opexVmware.messagerieSaas + opexVmware.networkAndWan + opexVmware.miscellaneous;

  // --- SCÉNARIO C : CLOUD PUBLIC HDS ---
  const capexCloud = {
    hardware: (2 * 2500), // Seuls switches locaux au siège
    software: officeLicences,
    security: (2 * 4000) + (sitesCount * 800), // Pare-feux locaux requis
    integration: ESN_SERVICES_BASELINE + 20000, // Prestations cloud supplémentaires
    total: 0
  };
  capexCloud.total = capexCloud.hardware + capexCloud.software + capexCloud.security + capexCloud.integration;

  const opexCloud = {
    hypervisorSupport: 0,
    cloudHosting: (cloudMonthlyCost * 12) + 8000, // VMs HDS + stockage & sauvegardes
    messagerieSaas: opexProxmox.messagerieSaas,
    networkAndWan: opexProxmox.networkAndWan + (sitesCount * 25 * 12), // VPN Gateway HDS
    miscellaneous: 0,
    total: 0
  };
  opexCloud.total = opexCloud.hypervisorSupport + opexCloud.cloudHosting + opexCloud.messagerieSaas + opexCloud.networkAndWan + opexCloud.miscellaneous;

  return {
    proxmox: { capex: capexProxmox, opex: opexProxmox },
    vmware: { capex: capexVmware, opex: opexVmware },
    cloud: { capex: capexCloud, opex: opexCloud }
  };
};

/**
 * Génère les projections cumulées de TCO sur 5 ans
 */
export const generateTcoProjections = (
  usersCount,
  sitesCount,
  serversCount,
  vmwareCorePrice,
  cloudMonthlyCost,
  inflationRate
) => {
  const data = calculateFinancials(usersCount, sitesCount, serversCount, vmwareCorePrice, cloudMonthlyCost);
  const projections = [];

  // Année 1 = CapEx + OpEx
  let proxmoxSum = data.proxmox.capex.total + data.proxmox.opex.total;
  let vmwareSum = data.vmware.capex.total + data.vmware.opex.total;
  let cloudSum = data.cloud.capex.total + data.cloud.opex.total;

  projections.push({
    year: 1,
    proxmoxTco: Math.round(proxmoxSum),
    vmwareTco: Math.round(vmwareSum),
    cloudTco: Math.round(cloudSum)
  });

  // Années 2 à 5
  for (let y = 2; y <= 5; y++) {
    const inflationMultiplier = Math.pow(1 + inflationRate, y - 1);
    
    proxmoxSum += data.proxmox.opex.total * inflationMultiplier;
    vmwareSum += data.vmware.opex.total * inflationMultiplier;
    cloudSum += data.cloud.opex.total * inflationMultiplier;

    projections.push({
      year: y,
      proxmoxTco: Math.round(proxmoxSum),
      vmwareTco: Math.round(vmwareSum),
      cloudTco: Math.round(cloudSum)
    });
  }

  return projections;
};
