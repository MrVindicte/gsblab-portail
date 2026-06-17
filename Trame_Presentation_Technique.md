# Trame de Présentation Technique — Soutenance GSBLAB

> **Équipe :** Léo, Romain & SKZ (prestataires externes / consultants)
> **Budget :** 450 000 € HT sur 5 ans
> **Objectif :** Démontrer au jury une maîtrise technique complète au-delà du simple chiffrage financier.

---

## État des lieux — Ce que le portail couvre déjà vs. ce qu'il manque

### ✅ Déjà couvert dans le portail (slides existantes)
| Thème | Slides portail | Composant |
|:------|:---------------|:----------|
| Cartographie SD-WAN France (Avant/Après) | Slide 1 (presSlide1) | `techSlides.js` |
| Focus Siège Strasbourg (schéma réseau, VLANs, fiches) | Slides 2-3 (presSlide2/3) | `techSlides.js` |
| Finance / TCO / Chiffrage | Workspace dédié | `FinanceWorkspace.js` |
| Sites multi-sites (déploiement) | Workspace dédié | `SitesWorkspace.js` |
| Simulateur DRP | Workspace dédié | `DrpSimulator.js` |
| Executive Summary | Workspace dédié | `ExecutiveSummary.js` |
| PMO / Planning | Workspace dédié | `PmoWorkspace.js` |

### ❌ Manquant — Slides techniques à ajouter
Les sujets ci-dessous sont **documentés dans vos livrables .md** mais **absents de la présentation portail**. Chacun mérite sa propre slide pour une soutenance complète.

---

## 🧱 Bloc 1 : Architecture Système & Hyperconvergence

### Slide T1 : Serveurs & Cluster Haute Disponibilité (Proxmox VE HA)
- **Objectif :** Montrer comment on garantit le zéro coupure de service.
- **Contenu Technique :**
    - Grappe à 4 nœuds : 2 serveurs Dell R760 neufs (Maîtres/Production, Xeon Silver 4416+, 256 Go RAM, SSD NVMe) + 2 Dell R730 recyclés (Esclaves/Secours, rééquipés en SSD SAS RAID 10).
    - Stockage partagé distribué (Ceph) permettant le partage des disques virtuels entre tous les nœuds.
    - Configuration du profil CPU unifié (`x86-64-v2-AES`) pour autoriser la **Live Migration** entre générations de processeurs différentes sans crash.
    - Quorum Corosync : en cas de panne d'un R760, les VMs redémarrent automatiquement sur un autre nœud en 2-4 minutes.
- **Message Clé :** Résilience totale + économie en recyclant les anciens serveurs.
- **Source :** [04_Architecture_PRA_et_Securite.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/04_Architecture_PRA_et_Securite.md), [03_Objectifs_et_SI_Cible.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/03_Objectifs_et_SI_Cible.md)

### Slide T2 : Sortie du Vendor Lock-in — VMware → Proxmox (Virtualisation)
- **Objectif :** Justifier l'abandon de VMware et le passage à l'open-source.
- **Contenu Technique :**
    - VMware ESXi actuel en fin de support, nouvelle tarification Broadcom intenable (~75 000 € sur 5 ans).
    - Migration P2V / V2V : conversion des disques virtuels (format VMware → `qcow2` Proxmox).
    - Proxmox VE 8.x : hyperviseur libre, HA intégré, Live Migration, snapshots, intégration native avec PBS.
    - Plan de rollback : les datastores VMware d'origine ne sont **pas écrasés** pendant la migration (RTO rollback < 5 min).
- **Message Clé :** 75 000 € économisés sans perte fonctionnelle. Démonstration POC à l'appui.
- **Source :** [03_Objectifs_et_SI_Cible.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/03_Objectifs_et_SI_Cible.md), [07_Migration_Cutover_Rollback.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/07_Migration_Cutover_Rollback.md)

### Slide T3 : Assainissement des Systèmes d'Exploitation (OS)
- **Objectif :** Traiter la "dette technique" logicielle et montrer le chemin de migration AD.
- **Contenu Technique :**
    - Windows Server 2012 R2 (fin de support octobre 2023) → **Windows Server 2022** pour les contrôleurs de domaine AD et le CRM Sage.
    - Windows Server 2016 (fin de support étendu janvier 2027) → bascule planifiée fin 2026 pour les serveurs de fichiers et l'application métier "Medoc".
    - Transfert des rôles FSMO (Active Directory) avec plan de rollback via snapshot PBS.
    - Achat d'un mix pertinent de **CAL User / CAL Device** Windows Server 2022 selon les sites.
- **Message Clé :** Fermeture des failles béantes sur les OS, conformité HDS restaurée.
- **Source :** [02_Audit_et_Existant.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/02_Audit_et_Existant.md), [05_Planning_et_Deploiement.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/05_Planning_et_Deploiement.md)

---

## 🛡️ Bloc 2 : Stratégie de Sauvegarde & Résilience (Le Bastion Anti-Ransomware)

### Slide T4 : La Règle "3-2-1-1-0" et l'Air-Gap Physique
- **Objectif :** Rassurer sur la protection absolue des données médicales HDS.
- **Contenu Technique :**
    1. **Local (RTO/RPO court) :** Proxmox Backup Server (PBS) branché sur l'ancienne baie Dell VNX recyclée avec 12 disques neufs SATA/SAS haute capacité (via iSCSI). Sauvegardes incrémentales, déduplication, restauration granulaire file-level.
    2. **Cloud (Externalisation) :** Synchronisation continue et chiffrée vers une enclave **OVHcloud certifiée HDS** en France (Cold Archive).
    3. **L'Air-Gap (Coffre-fort) :** Exportation mensuelle sur bandes magnétiques **LTO-6** via le robot Dell PowerVault 114X existant. Les bandes sont physiquement déconnectées et stockées dans un coffre-fort bancaire externalisé.
    4. **Immuabilité :** Snapshots PBS configurés en mode *Append-only* (écriture seule) : un ransomware exécuté sur une VM Windows ne peut pas chiffrer les sauvegardes.
- **Message Clé :** Protection totale contre les ransomwares (Air-Gap physique intouchable) + rétention légale de 20-30 ans sur bandes magnétiques.
- **Source :** [04_Architecture_PRA_et_Securite.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/04_Architecture_PRA_et_Securite.md), [09b_DRP_Runbook_Operationnel.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/09b_DRP_Runbook_Operationnel.md)

### Slide T5 : PRA / PCA — Scénarios de Sinistre et Business Impact Analysis (BIA)
- **Objectif :** Prouver la capacité de reprise face à 3 niveaux de catastrophe.
- **Contenu Technique :**
    - **BIA (tableau RTO/RPO) :**
        | Service | RTO | RPO | Solution |
        |:--------|:----|:----|:---------|
        | SGL "Medoc" & Base de données | < 1h | < 15 min | Proxmox HA + réplication |
        | Active Directory & DNS | < 2h | < 1h | Multi-DC (Strasbourg + Nantes) |
        | ERP Compta / Fichiers | < 8h | < 24h | Restauration PBS quotidienne |
        | Messagerie M365 | N/A | N/A | SLA Microsoft 99,9% |
    - **Scénario 1 (Panne hyperviseur) :** Failover HA automatique → coupure 2-4 min.
    - **Scénario 2 (Ransomware massif) :** Isolation réseau → restauration PBS immutable → reconstruction en 1-3h.
    - **Scénario 3 (Incendie/destruction du siège) :** Bascule vers site de secours Nantes, récupération depuis OVH HDS ou bandes LTO-6 → PRA sous 48-72h.
    - **Test annuel obligatoire** : simulation de coupure un dimanche d'août.
- **Message Clé :** Un PRA non testé n'existe pas. Trois scénarios couverts, trois niveaux de réponse.
- **Source :** [09_PRA_PCA_BIA.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/09_PRA_PCA_BIA.md), [09b_DRP_Runbook_Operationnel.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/09b_DRP_Runbook_Operationnel.md)

---

## 🌐 Bloc 3 : Ingénierie Réseau & Scalabilité Multi-Sites

### Slide T6 : Plan IP, Nommage et Topologie Scalable
- **Objectif :** Montrer la préparation à l'hyper-croissance (5 labos 2026, 15 relais 2027-28, rachat 2029).
- **Contenu Technique :**
    - Fin du "réseau à plat" dangereux (`10.2.1.0/24` unique).
    - Matrice IP scalable en `/16` par site :
        - `10.10.x.x` → Strasbourg (Siège)
        - `10.20.x.x` → Lille, `10.30.x.x` → Lyon, `10.40.x.x` → Marseille, etc.
        - `10.90.x.x` → **Réservé** pour l'acquisition du concurrent en 2029 (anti-collision d'IP).
    - Sous-découpage en `/24` par VLAN (10=Management, 20=Prod, 30=Médical HDS, 40=Users, 99=Guest).
    - Convention de nommage stricte et automatisable : `[TYPE]-[SITE]-[ROLE]-[NUMÉRO]` (ex: `FW-STR-EDGE-01`, `SRV-STR-PBS-01`).
- **Message Clé :** Infrastructure préparée pour une expansion sans douleur ni collision.
- **Source :** [06_Architecture_IP_Nommage.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/06_Architecture_IP_Nommage.md)

### Slide T7 : SD-WAN, Segmentation VLAN et Sécurité Périmétrique
- **Objectif :** Détailler l'architecture réseau physique et logique (Hub & Spoke).
- **Contenu Technique :**
    - Topologie Hub (Strasbourg) & Spoke (labos/centres) reliée par **tunnels IPsec AES-256-GCM / IKEv2**.
    - Siège : cluster FortiGate 80F/100F en HA (charge cryptographique de 26 tunnels).
    - Agences : FortiGate 40F (empêchant la contamination latérale).
    - Segmentation stricte par VLAN : VLAN 10 (Management IT exclusif), VLAN 30 (Médical HDS isolé), VLAN 40 (Users), VLAN 99 (Guest WiFi — Internet seul).
    - Remplacement des switchs obsolètes : Cisco SF200 → **CBS250** en 2026. Conservation temporaire des SG350XG (supportant le 802.1Q) jusqu'en 2027.
    - Bornes Wi-Fi : Ubiquiti U6+ (Wi-Fi 6, PoE).
- **Message Clé :** Étanchéité totale des flux, impossible de passer du réseau Guest au réseau Médical.
- **Source :** [03_Objectifs_et_SI_Cible.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/03_Objectifs_et_SI_Cible.md), [06_Architecture_IP_Nommage.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/06_Architecture_IP_Nommage.md)

---

## 🔐 Bloc 4 : Politique de Sécurité des SI (PSSI), Identités & Licences

### Slide T8 : Licences, Messagerie & Bureautique — La fin d'Exchange On-Premise
- **Objectif :** Présenter la stratégie licensing et la migration de messagerie.
- **Contenu Technique :**
    - **Fermeture d'Exchange 2013 On-Premise** (vulnérabilités ProxyShell, Hafnium — plus aucun correctif depuis avril 2023).
    - Stratégie de remplacement : **Office LTSC Standard 2024** (licence perpétuelle, pas d'abonnement) + **Exchange Online Plan 1** avec option HDS.
    - Économie vs. M365 Business Premium : coût maîtrisé tout en garantissant la conformité Cloud.
    - Cutover planifié un vendredi soir : baisse TTL DNS → synchronisation hybride Entra Connect → bascule MX → Hypercare J+1 à J+3.
    - Rollback : remise des enregistrements MX vers l'ancien Exchange (non détruit avant J+7).
    - Correction du double comptage laptops : 231 licences au lieu de 237 → **1 560 € HT économisés**.
- **Message Clé :** Messagerie sécurisée et légale (HDS Cloud) sans le coût exorbitant du tout-M365.
- **Source :** [03_Objectifs_et_SI_Cible.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/03_Objectifs_et_SI_Cible.md), [07_Migration_Cutover_Rollback.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/07_Migration_Cutover_Rollback.md)

### Slide T9 : Gestion des Identités, Privilèges (IAM) et Tiering Model
- **Objectif :** Présenter l'hygiène Active Directory et le contrôle des accès.
- **Contenu Technique :**
    - **Tiering Model :** Séparation stricte des comptes bureautiques et des comptes d'administration (ex: `l.dupont` pour le quotidien, `a_l.dupont` pour l'administration des serveurs critiques).
    - **MFA obligatoire** pour tout accès distant (VPN Fortinet, Webmail M365) via Microsoft Authenticator.
    - Accès hyperviseur Proxmox et FortiGate **restreint au VLAN 10** (Management IT exclusif).
    - Postes partagés (labo médical) : sessions AD nominatives + verrouillage automatique après 2 min d'inactivité (*Fast User Switching*) → traçabilité HDS.
    - Journalisation : tout acte d'escalade de privilège loggé dans un **serveur Syslog déporté**.
    - Classification de la donnée en 4 niveaux (Publique, Interne, Confidentielle, HDS/Critique).
- **Message Clé :** Contrôle absolu sur "qui accède à quoi" — conformité ANSSI et HDS.
- **Source :** [08_Politique_Securite_SI_PSSI.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/08_Politique_Securite_SI_PSSI.md)

### Slide T10 : Zero Trust, Endpoints, Flotte Mobile & Cryptographie
- **Objectif :** Sécuriser la mobilité (visiteurs médicaux, télétravail) et les terminaux.
- **Contenu Technique :**
    - **Postes de travail :** Conservation des 40 HP Z440 (2018) sains → pragmatisme budgétaire. Sécurisation logicielle (BitLocker, EDR ESET).
    - **Laptops :** Tous chiffrés par **BitLocker** (clés récupérables via AD).
    - **Flotte mobile :** Remplacement des iPhone 6S obsolètes par **Samsung Galaxy A16 5G** (support jusqu'en 2030). Enrôlement MDM **Knox Manage** pour forcer MFA et conformité.
    - **VPN Client Zero Trust partiel :** FortiClient VPN avec **Posture Check** (le tunnel ne se monte QUE si BitLocker est actif ET l'antivirus à jour).
    - **Chiffrement au repos :** ZFS natif ou LUKS sur les datastores Proxmox hébergeant des bases de données de santé.
    - **Chiffrement en transit :** IPsec AES-256-GCM inter-sites, TLS 1.2 minimum (TLS 1.3 recommandé) pour tous les services web internes.
- **Message Clé :** La donnée de santé est chiffrée partout — au repos, en transit, sur le serveur comme sur le téléphone du commercial.
- **Source :** [08_Politique_Securite_SI_PSSI.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/08_Politique_Securite_SI_PSSI.md), [03_Objectifs_et_SI_Cible.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/03_Objectifs_et_SI_Cible.md)

### Slide T11 : Réponse aux Incidents (SOC interne) & Obligations Légales
- **Objectif :** Prouver la capacité de réaction face à une cyberattaque.
- **Contenu Technique :**
    - **Détection :** EDR ESET Protect sur tous les endpoints → alerte en cas de comportement suspect (fichiers `.locked`, exfiltration).
    - **Confinement automatisé :** Isolation instantanée du poste compromis par la console ESET Protect + *PortDown* sur le switch Cisco (coupure du câble réseau logiquement).
    - **Cellule de crise :** Évaluation de la fuite de données de santé.
    - **Notification réglementaire :** Déclaration obligatoire à la **CNIL et à l'ARS sous 72h** (conformité RGPD/HDS).
    - **Restauration :** Utilisation des sauvegardes PBS immutables (Air-Gap LTO-6 si nécessaire).
- **Message Clé :** Une procédure structurée pour ne pas paniquer le jour J.
- **Source :** [08_Politique_Securite_SI_PSSI.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/08_Politique_Securite_SI_PSSI.md), [09b_DRP_Runbook_Operationnel.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/09b_DRP_Runbook_Operationnel.md)

---

## 🎓 Bloc 5 : Pilotage de Projet & Valeur Ajoutée

### Slide T12 : Migration Exchange — Le Cutover Pas-à-Pas
- **Objectif :** Montrer la maîtrise opérationnelle d'une migration critique sans perte de mail.
- **Contenu Technique :**
    - **J-30 :** Validation Tenant M365, installation Entra Connect, baisse TTL DNS à 300s.
    - **J-7 :** Lots de migration hybride (90% du volume copié en arrière-plan, transparent pour les utilisateurs).
    - **J-0 (Vendredi soir) :** Bascule MX vers `gsblab-fr.mail.protection.outlook.com`, delta sync final, extinction Exchange On-Prem.
    - **J+1 à J+3 :** Hypercare (re-connexion Outlook, validation MFA smartphone).
    - **J+7 :** Dé-commissionnement définitif des serveurs Exchange locaux.
    - **Rollback :** Remise des MX vers l'ancien serveur (non détruit avant J+7).
- **Message Clé :** Un planning chirurgical, un filet de sécurité (rollback), zéro mail perdu.
- **Source :** [07_Migration_Cutover_Rollback.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/07_Migration_Cutover_Rollback.md)

### Slide T13 : Conduite du Changement & Formations
- **Objectif :** Montrer que la technique ne suffit pas — il faut embarquer les 250 utilisateurs.
- **Contenu Technique :**
    - **Communication :** S-4 (annonce DG), S-2 (Guide de Survie IT), J-3 (rappel maintenance), J+0 (Hypercare physique avec gilets distinctifs).
    - **Formations utilisateurs :** Webinaire Office LTSC & OWA (1h) + Atelier cybersécurité/MFA obligatoire (1h).
    - **Transferts de compétences vers la DSI interne :**
        - Proxmox VE & PBS (2 jours)
        - FortiGate / FortiOS (1 jour)
        - ESET Endpoint Security (½ journée)
    - **Hotline de transition :** Numéro VIP + raccourci Teams prioritaire pour les problèmes post-migration.
- **Message Clé :** On ne livre pas une infra, on accompagne une transformation humaine.
- **Source :** [10_Conduite_Changement.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/10_Conduite_Changement.md)

### Slide T14 : Anomalies du Sujet — Notre Esprit Critique (Valeur Ajoutée Jury)
- **Objectif :** Démontrer une posture d'architecte senior : on ne subit pas un cahier des charges, on le challenge.
- **Contenu Technique (exemples marquants) :**
    - **RAID 10 à 2 disques** (impossibilité mathématique) → remplacé par 4× SSD SAS en vrai RAID 10.
    - **Double comptage des laptops** → économie de 1 560 € HT.
    - **Switch SG350XG-24 dans les centres** (ports SFP+ 10G pour des PC en RJ45 1G) → aberration physique corrigée.
    - **Baie SAN câblée directement sur le routeur internet** → faille de sécurité majeure corrigée.
    - **Live Migration inter-générations CPU** → crash garanti sans profil CPU unifié → résolu.
    - **16 anomalies documentées au total** avec résolutions techniques et impacts budgétaires.
- **Message Clé :** Prouver au jury qu'on a une vraie expertise terrain, pas juste une application aveugle du sujet.
- **Source :** [02b_Anomalies_Sujet_et_Resolutions.md](file:///g:/Mon Drive/M2S Formation/MASTERE 2IC 2027/GSBLAB/Livrables_Documentation/02b_Anomalies_Sujet_et_Resolutions.md)

---

## 📋 Récapitulatif — Les 14 Slides Techniques

| # | Slide | Bloc | Priorité |
|:-:|:------|:-----|:---------|
| T1 | Cluster HA Proxmox (Serveurs & Compute) | Système | 🔴 Haute |
| T2 | Sortie VMware → Proxmox (Virtualisation) | Système | 🔴 Haute |
| T3 | Assainissement OS (WS2012R2 → WS2022) | Système | 🔴 Haute |
| T4 | Sauvegarde 3-2-1-1-0 & Air-Gap | Sauvegarde | 🔴 Haute |
| T5 | PRA / PCA / BIA (Scénarios sinistres) | Sauvegarde | 🔴 Haute |
| T6 | Plan IP, Nommage & Topologie Scalable | Réseau | 🟡 Moyenne (partiellement couvert) |
| T7 | SD-WAN, VLANs & Sécurité périmétrique | Réseau | 🟡 Moyenne (partiellement couvert) |
| T8 | Licences, Messagerie & Bureautique | PSSI | 🔴 Haute |
| T9 | IAM, Tiering Model & Privilèges | PSSI | 🔴 Haute |
| T10 | Zero Trust, Endpoints & Cryptographie | PSSI | 🟡 Moyenne |
| T11 | Réponse aux Incidents (SOC interne) | PSSI | 🟡 Moyenne |
| T12 | Migration Exchange (Cutover pas-à-pas) | Pilotage | 🔴 Haute |
| T13 | Conduite du Changement & Formations | Pilotage | 🔴 Haute |
| T14 | Anomalies du Sujet (Esprit Critique) | Pilotage | 🔴 Haute |
