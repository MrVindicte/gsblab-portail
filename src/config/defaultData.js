// Liste des 17 sites (Strasbourg Hub + 16 Centres d'Alsace)
export const defaultSpokes = [
  { id: '1', name: 'Siège Strasbourg', region: 'Alsace Hub', usersCount: 56, hasLaptops: true, wanIP: '154.32.23.154', vpnStatus: 'up', firewallModel: 'FortiGate 80F' },
  { id: '2', name: 'Wolfisheim', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.1.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '3', name: 'Mittelhausbergen', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.2.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '4', name: 'Strasbourg Robertsau', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.3.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '5', name: 'Strasbourg Neuhof', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.4.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '6', name: 'Colmar Centre', region: 'Alsace Haut-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.5.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '7', name: 'Mulhouse Gare', region: 'Alsace Haut-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.6.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '8', name: 'Haguenau Nord', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.7.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '9', name: 'Sélestat Est', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.8.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '10', name: 'Saint-Louis Frontière', region: 'Alsace Haut-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.9.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '11', name: 'Illkirch Sud', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.10.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '12', name: 'Saverne Ouest', region: 'Alsace Bas-Rhin', usersCount: 16, hasLaptops: true, wanIP: '172.16.11.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '13', name: 'Labo Expansion 1 (Bischheim)', region: 'Nouvelle Expansion', usersCount: 15, hasLaptops: true, wanIP: '172.16.12.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '14', name: 'Labo Expansion 2 (Ostwald)', region: 'Nouvelle Expansion', usersCount: 15, hasLaptops: true, wanIP: '172.16.13.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '15', name: 'Labo Expansion 3 (Lingolsheim)', region: 'Nouvelle Expansion', usersCount: 15, hasLaptops: true, wanIP: '172.16.14.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '16', name: 'Labo Expansion 4 (Schiltigheim)', region: 'Nouvelle Expansion', usersCount: 15, hasLaptops: true, wanIP: '172.16.15.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' },
  { id: '17', name: 'Labo Expansion 5 (Cronenbourg)', region: 'Nouvelle Expansion', usersCount: 15, hasLaptops: true, wanIP: '172.16.16.1', vpnStatus: 'up', firewallModel: 'FortiGate 40F' }
];

// Registre des 8 risques du projet
export const defaultRisks = [
  {
    id: 'R-01',
    category: 'Organisationnel',
    title: 'Retard Fibre Strasbourg',
    description: "Retard de raccordement de la fibre FTTO sur le siège par l'opérateur.",
    probability: 3,
    impact: 4,
    criticality: 12,
    mitigation: "Maintien des liens cuivre existants (SDSL), mise en place d'un routeur 4G/5G de secours frontal pour la bascule de messagerie.",
    owner: "Chef de Projet ESN"
  },
  {
    id: 'R-02',
    category: 'Organisationnel',
    title: 'Indisponibilité Éditeur SGL',
    description: "Non-coopération ou indisponibilité de l'éditeur Medoc pendant la phase de migration de base SQL.",
    probability: 2,
    impact: 5,
    criticality: 10,
    mitigation: "Contractualisation d'un ticket d'assistance dédié le week-end du Cutover. Réalisation de tests à blanc 15 jours avant la bascule.",
    owner: "Directeur Projet GSBLAB"
  },
  {
    id: 'R-03',
    category: 'Sécurité',
    title: 'Ransomware pendant transition',
    description: "Infection due à la cohabitation d'anciens serveurs Windows 2012 et du nouveau réseau.",
    probability: 2,
    impact: 5,
    criticality: 10,
    mitigation: "Déploiement immédiat des agents EDR ESET en mode audit, isolement strict des WS2012 dans un VLAN dédié temporaire.",
    owner: "RSSI GSBLAB"
  },
  {
    id: 'R-04',
    category: 'Finance',
    title: 'Dépassement budget DAF',
    description: "Dépassement du plafond budgétaire de 450 000 € HT suite aux corrections techniques.",
    probability: 3,
    impact: 3,
    criticality: 9,
    mitigation: "Optimisation des achats via le calculateur interactif TCO, réduction de la marge de réserve de 10% à 5%.",
    owner: "DAF GSBLAB"
  },
  {
    id: 'R-05',
    category: 'Humain',
    title: 'Résistance des biologistes',
    description: "Rejet des nouveaux outils M365 et de la double authentification par le personnel médical.",
    probability: 4,
    impact: 2,
    criticality: 8,
    mitigation: "Campagne de communication, désignation de 'Key Users' formés en priorité, assistance Hypercare sur site le jour J.",
    owner: "Responsable Conduite Changement"
  },
  {
    id: 'R-06',
    category: 'Technique',
    title: 'Incompatibilité Live Migration',
    description: "Crash système lors de la migration à chaud entre Dell R760 (Xeon 2023) et R730 (Xeon 2016).",
    probability: 3,
    impact: 3,
    criticality: 9,
    mitigation: "Configuration obligatoire du profil CPU virtuel 'x86-64-v2-AES' dans Proxmox pour masquer les instructions incompatibles.",
    owner: "Architecte Infrastructure"
  },
  {
    id: 'R-07',
    category: 'Technique',
    title: 'Retard approvisionnement matériel',
    description: "Retards de livraison des serveurs et switches dus aux tensions d'approvisionnement.",
    probability: 2,
    impact: 4,
    criticality: 8,
    mitigation: "Commandes passées dès le GO du projet. Travail sur châssis Dell reconditionnés certifiés en option de repli.",
    owner: "Chef de Projet ESN"
  },
  {
    id: 'R-08',
    category: 'Sécurité',
    title: 'Non-conformité HDS OneDrive',
    description: "Stockage accidentel de données de santé non anonymisées sur les espaces OneDrive personnels.",
    probability: 2,
    impact: 4,
    criticality: 8,
    mitigation: "Politiques DLP strictes, blocage de l'export de fichiers non anonymisés, chiffrement obligatoire BitLocker des laptops.",
    owner: "RSSI GSBLAB"
  }
];

// Matrice RACI interactive
export const defaultRaci = [
  {
    phase: 'Cadrage & Audit',
    task: 'Validation finale du budget cible (sous 450k€)',
    roles: { sponsor: 'A', dirProjetClient: 'R', chefProjetEsn: 'R', rssiGSB: 'I', adminEsn: 'I', techSpokes: 'I', editeurSgl: 'I' }
  },
  {
    phase: 'Cadrage & Audit',
    task: "Audit technique détaillé de l'existant (Laptops/LAN)",
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'C', adminEsn: 'R', techSpokes: 'R', editeurSgl: 'I' }
  },
  {
    phase: 'Cadrage & Audit',
    task: 'Rédaction de la PSSI cible (HDS / RGPD)',
    roles: { sponsor: 'I', dirProjetClient: 'C', chefProjetEsn: 'I', rssiGSB: 'A', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'I' }
  },
  {
    phase: 'Infrastructure & Virtualisation',
    task: 'Installation physique des Dell R760 (Strasbourg)',
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'I', adminEsn: 'R', techSpokes: 'R', editeurSgl: 'I' }
  },
  {
    phase: 'Infrastructure & Virtualisation',
    task: 'Configuration du cluster Proxmox VE HA & Ceph',
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'C', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'I' }
  },
  {
    phase: 'Infrastructure & Virtualisation',
    task: 'Déploiement et durcissement de Proxmox Backup Server',
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'R', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'I' }
  },
  {
    phase: 'Réseau & Sécurité',
    task: 'Configuration du cluster FortiGate Siège (Strasbourg)',
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'R', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'I' }
  },
  {
    phase: 'Réseau & Sécurité',
    task: 'Déploiement des FortiGate Spokes dans les 17 centres',
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'I', adminEsn: 'R', techSpokes: 'R', editeurSgl: 'I' }
  },
  {
    phase: 'Migration Applicative',
    task: 'Migration des boîtes mails vers Exchange Online (M365)',
    roles: { sponsor: 'I', dirProjetClient: 'I', chefProjetEsn: 'A', rssiGSB: 'C', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'I' }
  },
  {
    phase: 'Migration Applicative',
    task: 'Migration de la base SQL SGL (Medoc) sur Proxmox',
    roles: { sponsor: 'I', dirProjetClient: 'C', chefProjetEsn: 'A', rssiGSB: 'C', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'R' }
  },
  {
    phase: 'Bascule & Recette',
    task: 'Déclenchement du plan de bascule (Cutover) le week-end',
    roles: { sponsor: 'I', dirProjetClient: 'A', chefProjetEsn: 'R', rssiGSB: 'C', adminEsn: 'R', techSpokes: 'R', editeurSgl: 'R' }
  },
  {
    phase: 'Bascule & Recette',
    task: 'Tests de secours du PRA (Simulation de sinistres)',
    roles: { sponsor: 'I', dirProjetClient: 'C', chefProjetEsn: 'A', rssiGSB: 'R', adminEsn: 'R', techSpokes: 'I', editeurSgl: 'I' }
  }
];
