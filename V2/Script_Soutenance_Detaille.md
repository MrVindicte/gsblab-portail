# Script Détaillé de la Soutenance (Le Téléprompteur)

Ce document contient le script complet, mot pour mot, pour présenter la solution "GSBLAB" en 20 minutes chrono. Les textes en *italique* sont des notes de mise en scène.

---

## Acte 1 — Le Contexte (2 minutes)

### Slide 1.1 : Titre & Équipe
> "Bonjour à tous et merci de nous recevoir. Nous sommes l'équipe G1, composée d'architectes cloud, systèmes et réseaux. Aujourd'hui, nous allons vous présenter le résultat de notre refonte totale de l'infrastructure de GSBLAB, avec pour objectif principal de la rendre certifiable HDS tout en maîtrisant les coûts sur 5 ans."

### Slide 1.2 : Le Périmètre
> "Pour rappel très rapide, le périmètre que nous devons couvrir aujourd'hui s'étend sur 4 sites : un siège social et 3 cliniques de recherche. Ces sites doivent échanger des données de santé à caractère personnel de manière fluide, performante et surtout, hautement sécurisée. Mais avant de construire la nouvelle solution, nous avons dû regarder sous le capot de l'infrastructure actuelle. Et voici ce que nous avons trouvé."
> *(Clic pour passer à l'Acte 2)*

---

## Acte 2 — Le Diagnostic (3 minutes)

### Slide 2.1 : L'Audit de l'Existant (La Dette Technique)
> "Notre audit de l'existant est sans appel : le système d'information de GSBLAB souffre d'une grave dette technique. Les systèmes d'exploitation sont en fin de vie avec du Windows Server 2012 R2. La virtualisation VMware est vieillissante. Le réseau manque de segmentation pour isoler les flux critiques, et la messagerie locale Exchange 2016 n'est plus adaptée aux standards de haute disponibilité. En l'état, la certification HDS est tout simplement impossible."

### Slide 2.2 : L'Esprit Critique (Anomalies du cahier des charges)
> "Mais notre rôle d'architecte n'est pas d'appliquer un cahier des charges aveuglément. Nous l'avons audité, et nous y avons relevé 16 anomalies critiques que nous avons dû corriger pour viabiliser le projet. 
> Par exemple, le cahier des charges prévoyait de conserver des bornes Wi-Fi obsolètes de 2015, ce qui bloque immédiatement toute certification HDS. Il prévoyait également d'exposer la baie de stockage SAN directement sur le LAN, une faille de sécurité majeure. Pire encore, sur le plan financier, les licences pour les PC portables étaient facturées en double. Nous avons rectifié l'ensemble de ces aberrations pour vous proposer un socle sain."
> *(Transition)* "Maintenant que les fondations sont assainies, voici la solution que nous avons construite."

---

## Acte 3 — La Prescription (7 minutes)

### Slide 3.1 : Stratégie (4 Piliers)
> "Notre architecture repose sur 4 piliers indissociables : une virtualisation hyperconvergée, un réseau maillé, une sauvegarde inaltérable, et une sécurité de type Zero Trust."

### Slide 3.2 : Sortie de VMware
> "Le choix technique le plus fort de notre solution concerne la virtualisation. Avec le rachat de VMware par Broadcom et le passage forcé à des licences par cœur très coûteuses, nous avons pris la décision stratégique de sortir de VMware. Nous basculons sur **Proxmox VE**, une solution hyperconvergée, open-source, robuste, et sans coût de licence prohibitif. Cela nous permet d'investir le budget dans la sécurité matérielle plutôt que dans la licence logicielle."

### Slide 3.3 : Haute Disponibilité (Cluster 4 Nœuds)
> "Concrètement, notre socle repose sur un Cluster de 4 nœuds. Pourquoi 4 ? Pour éviter le syndrome du 'Split Brain' grâce à un quorum strict. De plus, nous n'utilisons plus de baie de stockage SAN centralisée, qui représente un point de défaillance unique (SPOF). À la place, nous utilisons Ceph, qui distribue la donnée sur l'ensemble des serveurs en temps réel. Si un serveur brûle, l'infrastructure continue de tourner sans la moindre coupure."

### Slide 3.4 : Systèmes & Licences
> "Sur la partie matérielle, nous avons dimensionné les serveurs avec du stockage Full NVMe pour des temps de réponse quasi instantanés, indispensables pour les bases de données médicales. Côté licences utilisateurs, nous avons fait le choix de la pérennité : des licences Office LTSC 2024 perpétuelles couplées à Exchange Online Plan 1, ce qui évite l'abonnement mensuel de l'offre E3 ou E5 qui aurait explosé le budget."

### Slide 3.5 : Le Bastion (Sauvegarde 3-2-1-1-0)
> *(Changer de ton, plus grave)* "La question aujourd'hui n'est plus de savoir SI nous serons attaqués, mais QUAND. 
> Pour garantir la survie de GSBLAB, nous avons implémenté la règle d'or de la sauvegarde : le 3-2-1-1-0. 
> Concrètement, comment ça se passe ? Les données des 17 cliniques (y compris les nouveaux labos comme Nantes) remontent toutes au siège à Strasbourg via notre SD-WAN. À Strasbourg, Proxmox Backup Server crée 3 copies de la donnée. Il les stocke sur 2 supports différents : d'abord sur l'ancienne baie VNX que nous avons recyclée en stockage SAS pur, puis sur des bandes magnétiques physiques.
> Ensuite, 1 copie part chaque nuit de manière chiffrée chez OVHcloud en France, un hébergeur certifié HDS.
> Le deuxième '1', c'est l'Air-Gap : les bandes magnétiques sont sorties du robot et stockées physiquement dans un coffre bancaire à Strasbourg, totalement déconnectées du réseau.
> Enfin, le '0', c'est 0 erreur de restauration. Proxmox Backup Server vérifie l'intégrité de chaque bloc automatiquement, et les sauvegardes sont immuables. Même si un pirate devient administrateur du réseau, il ne peut mathématiquement pas supprimer nos sauvegardes."

### Slide 3.6 : Réseau SD-WAN & Sécurité
> "Enfin, pour relier les cliniques au siège, nous déployons une architecture 100% Ubiquiti UniFi avec des passerelles UCG-Ultra. Cela nous permet d'activer un SD-WAN 'Magic Site-to-Site' très simple à gérer, qui chiffre tous les échanges de bout en bout (IPsec AES-256) sans aucun coût de licence récurrent. En interne, la segmentation réseau par VLAN isole la R&D, l'administration et les serveurs pour bloquer toute propagation de virus."

---

## Acte 4 — Les Garanties (5 minutes)

### Slide 4.1 : PRA (Plan de Reprise d'Activité)
> "L'architecture est robuste, mais en tant que DSI, vous avez besoin de garanties face au pire scénario. Si le Datacenter principal brûle, notre Plan de Reprise d'Activité est prêt. Nous nous engageons sur un RPO (perte de données) maximal de 1 heure, et un RTO (temps de reprise) de 4 heures. Toute notre infrastructure (IaC) est codée sous Terraform, ce qui nous permet de redéployer instantanément les serveurs virtuels chez OVHCloud en cas de destruction totale du site physique."

### Slide 4.2 : Riposte Incident SOC
> "Face aux menaces cyber, les pare-feux ne suffisent plus. Nous avons intégré un SOC (Security Operations Center) basé sur Wazuh. Ce système écoute le réseau en permanence. S'il détecte le comportement d'un ransomware sur un PC de la clinique, il ne se contente pas d'envoyer une alerte : il isole automatiquement la machine du réseau en moins d'une minute, sauvant ainsi le reste du système."

### Slide 4.3 : Le Cutover Exchange
> "L'autre grande angoisse d'une refonte, c'est la coupure de service pour les utilisateurs. C'est pourquoi la migration de vos 380 boîtes mails vers le Cloud Microsoft se fera en douceur lors du 'Cutover'. Nous lancerons la synchronisation en tâche de fond dès le samedi matin. Le dimanche, nous basculerons les flux DNS. Le lundi matin, vos collaborateurs se connecteront sur le nouveau système de manière transparente, sans perdre un seul email, avec notre équipe sur place en support Hypercare."

---

## Acte 5 — Le Budget & Conclusion (3 minutes)

### Slide 5.1 : Respect du Plafond DAF
> "Toutes ces technologies de pointe (SD-WAN, Hyperconvergence, SOC) ont évidemment un coût. Mais nous avons pris nos responsabilités budgétaires. Le plafond fixé par la DAF était de 1 000 000 €. Notre projet global s'élève à 410 240 € (CAPEX et OPEX initiaux), en gardant une marge de sécurité de 55 000 € pour les imprévus de chantier."

### Slide 5.2 : TCO & Économies sur 5 ans
> "Mais le vrai métier d'un architecte est d'évaluer le coût sur 5 ans (le TCO). Nos décisions fortes, notamment de refuser le modèle de licence VMware et de contourner les abonnements Microsoft 365 E5 complets, génèrent aujourd'hui une économie massive de 329 500 € en fonctionnement sur 5 ans. C'est du budget récupéré pour l'entreprise."

### Slide 5.3 : Conclusion Finale
> *(Texte d'intro)* "Pour résumer : nous laissons à GSBLAB une infrastructure souveraine, hautement disponible et certifiable HDS pour les 5 prochaines années."
> 
> *(Click - Objectif Atteint)* "Notre mission de mise aux normes est remplie. L'horizon 2026 sera celui du transfert total de compétences vers vos équipes. La vision 2030 permettra d'y greffer de l'IA souveraine locale en toute sécurité."
> 
> *(Click - Fin)* "Merci de votre attention. L'Équipe G1 se tient prête pour la phase d'entretiens individuels."
