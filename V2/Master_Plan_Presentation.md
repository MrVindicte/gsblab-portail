# 👑 Le "Master Plan" de la Soutenance GSBLAB (Version Détaillée)

Ce document est le guide de réalisation définitif. Il définit la philosophie, la scénarisation exacte, le design UI/UX de chaque slide, et le discours associé. 

---

## 🎯 Philosophie de l'Entonnoir & Design System

### 1. Le Principe Narratif (Les 5 Actes)
> *"GSBLAB est un patient malade. On pose le diagnostic, on prescrit le traitement, on l'administre, on prouve que le patient est guéri, et on chiffre l'ordonnance."*

L'entonnoir force le jury à valider chaque étape avant de passer à la suivante. Le budget (Acte 5) n'est dévoilé qu'à la toute fin, lorsque le jury a pris conscience de l'ampleur du travail technique.

### 2. Le Design System (UI/UX)
Le portail doit maintenir son esthétique "Premium IT" :
*   **Glassmorphism :** Panneaux semi-transparents (`bg-slate-900/60`, `backdrop-blur`), bordures très fines (`border-white/10`).
*   **Code Couleur Strict :** 
    *   🔴 Rouge/Ambre : Dette technique, risques, existant (VMware, Exchange 2013).
    *   🟢 Émeraude : Cible atteinte, HDS, économies, Proxmox.
    *   🔵 Indigo/Bleu : Composants réseau, tunnels IPsec, cloud.
*   **Animations :** Micro-interactions (`transition-all`), apparitions séquentielles (`data-reveal-at` avec `opacity-0` vers `opacity-1`) pour rythmer le discours de l'orateur sans noyer le jury de texte.
*   **Typographie :** Chiffres clés en police `monospace` très grasse, titres en `sans-serif` (Inter/Roboto).

---

## 📋 Le Scénario Détaillé (Slide par Slide)

### 🔭 ACTE 1 : L'Introduction & Le Contexte (Vue Satellite)
**🗣️ Orateur : Jérôme | ⏱️ Durée : 4 min**

| Slide | Composant | Visuel UI/UX | Message & Discours |
|:---|:---|:---|:---|
| **1.1. Titre & Équipe** | `ExecutiveSummary.js` | Grand titre centré, dégradé. 3 badges pour l'équipe. Halo lumineux. | *"Bonjour, nous sommes l'équipe 1. Notre mission : moderniser et sécuriser le SI de GSBLAB pour accompagner son hyper-croissance."* |
| **1.2. Périmètre (Avant/Après)** | `ExecutiveSummary.js` | 2 colonnes (2022 vs 2028). Apparition séquentielle des chiffres (130 → 380, 0% HDS → 100% HDS). Barre de contraintes en bas (450k€, HDS). | *"Le défi : passer de 7 à 27 sites, tripler les effectifs, et obtenir la certification HDS, tout en respectant un budget DAF strict de 450 000€."* |

---

### 🩺 ACTE 2 : Le Diagnostic (L'État des Lieux)
**🗣️ Orateur : Jérôme | ⏱️ Durée : 5 min**

| Slide | Composant | Visuel UI/UX | Message & Discours |
|:---|:---|:---|:---|
| **2.1. Cartographie Existant** | `techSlides.js` (Carte) | Carte de France. Points rouges. Connexions VPN statiques désordonnées. | *"Voici l'état actuel : 7 sites isolés, des VPN artisanaux, pas de segmentation."* |
| **2.2. Audit de la Dette** | ❌ **À créer** | 4 tuiles rouges style "Alertes" (OS, Virtu, Réseau, Mail). Icônes warning. | *"Le SI hérité est dangereux : serveurs WS2012R2 obsolètes, VMware ESXi 6 en fin de vie, Exchange 2013 vulnérable (ProxyShell)."* |
| **2.3. Les Anomalies du Sujet** | ❌ **À créer** | Composant "Radar" ou "Checklist critique". Exemples mis en avant avec badges "Corrigé". | L'argument massue : *"En tant qu'architectes, nous avons challengé le cahier des charges. Nous avons relevé 16 anomalies critiques (RAID 10 à 2 disques impossible, SAN exposé sur internet). Voici nos corrections."* |

---

### 🧱 ACTE 3 : La Prescription (Les Briques Techniques)
**🗣️ Orateur : Léo | ⏱️ Durée : 12-14 min**
*C'est le cœur de la soutenance. On déroule l'expertise pure.*

| Slide | Composant | Visuel UI/UX | Message & Discours |
|:---|:---|:---|:---|
| **3.1. Stratégie (4 Piliers)** | `ExecutiveSummary.js` | Les 4 piliers barrés/remplacés (ex: ~~ESXi 6.0~~ → Proxmox). | *"Voici notre plan d'attaque sur la virtu, le stockage, le réseau et le backup."* |
| **3.2. Virtu : VMware → Proxmox** | ❌ **À créer** | Tableau comparatif (coûts/fonctions). Grosse flèche de migration. | *"Nous quittons le vendor lock-in Broadcom. Migration P2V/V2V vers Proxmox VE 8.x. Économie sèche : 75 000€."* |
| **3.3. Cluster HA Proxmox** | `techSlides.js` (Slide 28) | Jauges vCPU/RAM/Ceph. Ajout de textes explicatifs sur les côtés. | *"Cluster HA à 4 nœuds. On recycle les R730 avec du SSD SAS. Secret technique : Profil CPU 'x86-64-v2-AES' pour garantir la Live Migration entre les Xeon 2023 et 2016 sans crash."* |
| **3.4. Assainissement OS** | ❌ **À créer** | Timeline de bascule WS2012R2 → WS2022. Icônes Active Directory. | *"Bascule des rôles FSMO, achat stratégique de CALs User/Device, et fermeture des failles zero-day."* |
| **3.5. Messagerie : Exchange → LTSC** | ❌ **À créer** | Comparatif M365 Business Premium vs (LTSC 2024 + EXO P1). | *"Pour maîtriser les coûts tout en étant légal (HDS), on opte pour Office LTSC perpétuel + Exchange Online HDS. Et on a supprimé le double comptage des laptops (−1 560€)."* |
| **3.6. Sauvegarde 3-2-1-1-0** | ❌ **À créer** | Schéma de flux en 4 étapes : Prod → PBS local → OVH HDS Cloud → Bandes LTO (Air-gap). | *"Le bastion anti-ransomware : 3 copies, 2 supports, 1 cloud, 1 air-gap physique inviolable. Snapshots immutables 'append-only'."* |
| **3.7. Cartographie Cible** | `techSlides.js` (Carte) | Carte de France. Points indigo. Réseau SD-WAN étoilé (Hub & Spoke). | *"Le résultat réseau : 27 sites interconnectés via des tunnels IPsec AES-256."* |
| **3.8. Focus Siège (Strasbourg)** | `techSlides.js` (Siège) | Schéma SVG et matrice IP. | *"Au siège : cluster FortiGate en HA pour absorber l'encryptage, et segmentation stricte VLAN 10/20/30/40/99."* |
| **3.9. Focus Labo & Centre** | `techSlides.js` (Labos) | Schéma SVG allégé. | *"Le modèle est packagé : UCG-Ultra + switch PoE + AP Wi-Fi 6. Standardisé partout."* |
| **3.10. IAM & PSSI** | ❌ **À créer** | Pyramide du Tiering Model. Logo MFA. | *"Sécurité logique : séparation stricte des comptes admins/users (Tiering Model), MFA obligatoire, journalisation Syslog."* |
| **3.11. Endpoints & Zero Trust** | ❌ **À créer** | Icône cadenas, smartphones Samsung, laptop chiffré. | *"Chiffrement BitLocker, MDM Knox pour la flotte mobile, et FortiClient VPN avec Posture Check (Antivirus à jour obligatoire)."* |
| **3.12. Déploiement IaC** | `techSlides.js` (Terminal) | Faux terminal style CI/CD. Animation de logs qui défilent. | *"Pour déployer les 27 sites sans erreur humaine : Terraform + Ansible. Infrastructure as Code reproductible."* |

---

### 🛡️ ACTE 4 : Les Garanties
**🗣️ Orateur : Romain | ⏱️ Durée : 5 min**
*Objectif : Prouver qu'on a anticipé les pires scénarios (le "Day 2").*

| Slide | Composant | Visuel UI/UX | Message & Discours |
|:---|:---|:---|:---|
| **4.1. Scénarios PRA / PCA** | ❌ **À créer** | Tableau des 3 scénarios (Hyperviseur, Ransomware, Incendie) avec RTO/RPO. | *"Que se passe-t-il quand ça casse ? Panne serveur : redémarrage 2min (HA). Ransomware : restauration PBS immutable 1h. Incendie : bascule sur site de secours 48h."* |
| **4.2. SOC & Incidents** | ❌ **À créer** | Diagramme de flux : Détection ESET → Isolation Switch (PortDown) → CNIL. | *"La riposte : si l'EDR ESET détecte un comportement suspect, le switch coupe le port physiquement. Et on a 72h pour prévenir la CNIL (Loi Santé)."* |
| **4.3. Cutover Exchange** | ❌ **À créer** | Timeline avec 4 jalons : J-30, J-7, Vendredi soir, Hypercare J+1. | *"Comment on migre sans perdre un mail ? Synchro hybride Entra Connect en amont, bascule DNS le vendredi soir, filet de sécurité (rollback garanti)."* |
| **4.4. Conduite du Changement** | ❌ **À créer** | Timeline de com (S-4 à J+0). Icônes hotline/formations. | *"L'IT ne sert à rien si les 250 collaborateurs n'adhèrent pas. Webinaires LTSC, ateliers cybersécurité, hotline VIP, gilets jaunes 'Hypercare' le jour J."* |

---

### 💰 ACTE 5 : Le Budget & Conclusion
**🗣️ Orateur : Romain | ⏱️ Durée : 4 min**
*Le clou du spectacle : tout ça rentre dans l'enveloppe.*

| Slide | Composant | Visuel UI/UX | Message & Discours |
|:---|:---|:---|:---|
| **5.1. Impact Budgétaire (TCO)** | `ExecutiveSummary.js` | Énorme chiffre "329 500€" en vert néon. | *"Le résultat financier de ces choix d'architecture : TCO divisé par 4. Gain net de 329 500€ sur 5 ans. ROI inférieur à 12 mois."* |
| **5.2. Chiffrage global** | `ConclusionWorkspace.js` | 3 boîtes : 398k€ dépensés, 51k€ réserve, 450k€ plafond. | *"Le budget CAPEX final est de 398 733€. Nous conservons 11% de réserve."* |
| **5.3. Bilan (Conclusion)** | `ConclusionWorkspace.js` | 4 gros chiffres (27 sites, 380 users, 5 VLANs, 4 phases). | *"Un SI guéri, prêt pour l'acquisition de 2029, 100% conforme HDS. Merci pour votre attention, nous sommes à votre écoute pour vos questions."* |

---

## 🛠️ Plan d'Action Code (Next Steps pour React)

Pour implémenter ce Master Plan dans `G:\Mon Drive\GSBLAB\gsblab-portail\src\components\`, voici le travail de développement précis :

1.  **Créer un nouveau fichier `presentationSlides.js`** (ou étendre `techSlides.js`) pour y coder les **12 slides marquées ❌**.
    *   *Techno :* Tailwind CSS (classes utilitaires), SVG pour les schémas, et logique `data-reveal-at` pour scripter les apparitions lors des clics sur "Espace".
2.  **Mettre à jour le gestionnaire d'état (`app.js` / EventListeners)**
    *   Créer une vraie séquence linéaire. Quand on est à la dernière étape de la slide 1.2 (Périmètre), la touche "Droite" doit charger la slide 2.1 (Audit de l'existant), au lieu de rester bloqué dans un workspace spécifique.
    *   Alternative : Tout basculer dans un `SuperPresentationWorkspace.js` qui `import` les slides des autres fichiers et les range dans un grand tableau `const allSlides = [slide1, slide2, slide3, ...]`.
3.  **Intégrer les données brutes**
    *   Traduire les 16 anomalies du `02b_Anomalies_Sujet_et_Resolutions.md` en une UI type "Radar" ou cartes.
    *   Traduire le Cutover Exchange du `07_Migration_Cutover_Rollback.md` en une belle timeline avec Tailwind.
    *   Traduire le PRA du `04_Architecture_PRA_et_Securite.md` en un tableau comparatif RTO/RPO.
