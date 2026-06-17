# Structure de l'Oral — Soutenance GSBLAB

> **Principe directeur : L'Entonnoir**
> On part du plus large (le "pourquoi") et on zoome progressivement dans le détail (le "comment").
> Le jury ne doit jamais se demander "pourquoi il me parle de ça maintenant ?".

---

## Diagnostic de la présentation actuelle

### Ce qui ne va pas aujourd'hui

**1. Le budget arrive trop tôt.** On annonce +329 500€ d'économie avant d'avoir montré un seul détail technique. Le jury pense *"OK, mais comment ?"* et doit attendre 15 slides pour avoir un début de réponse.

**2. La partie technique = 100% réseau.** Carte de France, VLANs, schémas réseau... mais rien sur les serveurs, l'OS, le stockage, les licences, la sécurité, les sauvegardes, le PRA. Ce sont pourtant les sujets les plus lourds du projet.

**3. Pas de fil conducteur.** On passe d'un workspace à l'autre sans lien. Chaque section est un silo. Le jury perd le fil.

**4. L'audit et les anomalies sont absents.** Le document des 16 anomalies du sujet (RAID 10 impossible, SAN exposé sur internet...) est votre argument massue devant le jury. Il n'apparaît nulle part.

**5. Les sujets manquants.** Rien sur : sortie VMware, assainissement OS, stratégie de licences, sauvegardes 3-2-1-1-0, PSSI/IAM, endpoints/Zero Trust, conduite du changement, migration Exchange.

---

## La nouvelle structure : L'Entonnoir en 5 niveaux de zoom

### Fil conducteur médical

> *"GSBLAB est un patient malade. On pose le diagnostic, on prescrit le traitement brique par brique, on s'assure qu'il ne retombera pas malade, et on chiffre l'ordonnance."*

Ce fil conducteur colle au contexte (laboratoires de santé) et donne un repère permanent au jury.

---

### 🔭 Niveau 1 — Vue Satellite (5 min)
*"Qui, quoi, pourquoi — en 3 slides le jury comprend tout."*

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **Titre** | L'équipe (Romain, Jérôme, Léo), le rôle de prestataires externes | 30s | ✅ |
| **Le Contexte** | GSBLAB, labo de santé en Alsace. 130 collaborateurs, 7 sites, hyper-croissance prévue (380 users, 27 sites, rachat en 2029). Budget 450 000€ HT. | 2 min | ✅ |
| **Le Constat** | Avant → Après. 0% HDS → 100%. Réseau à plat → segmenté. Exchange 2013 → Cloud. VMware → Proxmox. | 2 min | ✅ |

**Ce que le jury retient :** *"OK, c'est un gros chantier de modernisation d'un SI de santé avec un budget serré."*

**Transition :** *"Maintenant, regardons de plus près ce qu'on a trouvé en arrivant."*

---

### 🔍 Niveau 2 — L'État des Lieux (5-7 min)
*"On zoome sur ce qui est cassé, dangereux et illégal."*

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **Audit de l'existant** | Les grandes familles de dette technique : serveurs obsolètes (WS 2012 R2), virtualisation en fin de support (VMware ESXi 6), Exchange 2013 sans correctifs, réseau à plat sans VLAN, sauvegardes manuelles sur bandes vieillissantes. | 3 min | ❌ À créer |
| **Anomalies du sujet** | Notre esprit critique d'architecte : 16 erreurs identifiées dans le cahier des charges du prof. RAID 10 impossible à 2 disques, switch 10G SFP+ pour des PC en RJ45, SAN câblé direct sur le routeur internet, double comptage des laptops... | 2 min | ❌ À créer |
| **Carte SD-WAN (Avant)** | La carte de France en mode "Existant 2026" — réseau rouge, 0 VLAN, 7 sites, VPN artisanaux. | 1 min | ✅ (presSlide1, moitié "avant") |

**Ce que le jury retient :** *"Effectivement, c'est le chaos. Et en plus ils ont trouvé des erreurs dans le sujet, bien vu."*

**Transition :** *"Le diagnostic est posé. Voici notre plan de traitement, qu'on va dérouler brique par brique."*

---

### 🧱 Niveau 3 — Les Briques Techniques (12-15 min)
*"On zoome dans chaque domaine d'infrastructure. Une slide = un problème résolu."*

L'ordre suit une logique de construction : on pose les fondations (serveurs) avant les murs (réseau) avant le toit (sécurité).

#### A. Les fondations — Système & Virtualisation

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **Sortie VMware → Proxmox** | Abandon VMware/Broadcom (75 000€ économisés). Migration P2V/V2V. Cluster open-source Proxmox VE 8.x. Rollback garanti (VMware non écrasé). | 2 min | ❌ À créer |
| **Cluster HA Proxmox** | 4 nœuds (2× R760 neufs + 2× R730 recyclés). Ceph, Live Migration, profil CPU unifié. Barres capacitaires (vCPU, RAM, Stockage). | 2 min | ⚠️ Partiel (presSlide8 = juste les barres) |
| **Assainissement OS** | WS 2012 R2 → WS 2022. Transfert FSMO. CALs User/Device. Planification de la bascule de "Medoc" fin 2026. | 1 min | ❌ À créer |
| **Licences & Messagerie** | Fin d'Exchange 2013 (ProxyShell/Hafnium). Office LTSC 2024 + Exchange Online Plan 1 HDS. Économie vs M365 Business. Correction double comptage (−1 560€). | 2 min | ❌ À créer |

#### B. Le coffre-fort — Stockage & Sauvegardes

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **Sauvegarde 3-2-1-1-0** | PBS local (baie recyclée) + OVH HDS Cloud + Air-Gap LTO-6 au coffre. Immuabilité append-only. Rétention 20-30 ans. | 2 min | ❌ À créer |

#### C. Les murs — Réseau & Connectivité

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **Carte SD-WAN (Après)** | La carte de France en mode "Cible 2030" — 27 sites, 26 tunnels IPsec, OVH HDS. | 1 min | ✅ (presSlide1, moitié "après") |
| **Plan IP & VLANs** | Matrice /16 par site, nommage, segmentation VLAN 10/20/30/40/99. | 1 min | ✅ (presSlide2-3) |
| **Focus Siège** | Schéma réseau Strasbourg, fiche réseau détaillée. | 1 min | ✅ (presSlide2-3) |
| **Focus Labo type** | Architecture standard d'un laboratoire régional. | 30s | ✅ (presSlide4-5) |
| **Focus Centre type** | Architecture standard d'un centre de prélèvement. | 30s | ✅ (presSlide6-7) |

#### D. Le toit — Sécurité & PSSI

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **IAM & PSSI** | Tiering Model, MFA forcé, classification données (4 niveaux), Syslog, verrouillage postes partagés. | 1.5 min | ❌ À créer |
| **Endpoints & Zero Trust** | Conservation HP Z440, BitLocker, Knox MDM (Samsung A16), VPN Posture Check, chiffrement ZFS/LUKS. | 1.5 min | ❌ À créer |

#### E. L'automatisation — IaC

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **IaC Terraform + Ansible** | Terminal CI/CD, provisioning automatique, hardening CIS L1, reproductibilité ×27 sites. | 1 min | ✅ (presSlide9) |

**Ce que le jury retient :** *"Ils ont couvert tous les domaines d'infrastructure. C'est complet et méthodique."*

**Transition :** *"L'infrastructure est modernisée. Mais comment garantir qu'elle résistera dans le temps ?"*

---

### 🛡️ Niveau 4 — Les Garanties (5-7 min)
*"On zoome sur la résilience, la migration et l'accompagnement humain."*

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **PRA / PCA / BIA** | Tableau RTO/RPO. 3 scénarios : panne hyperviseur (2-4 min), ransomware (1-3h), incendie siège (48-72h). Test annuel obligatoire. | 2 min | ⚠️ `DrpSimulator.js` existe mais pas dans le flux linéaire |
| **Réponse aux incidents** | Chaîne EDR ESET → PortDown switch → cellule de crise → CNIL/ARS 72h. | 1 min | ❌ À créer |
| **Migration Exchange** | Le cutover pas-à-pas : J-30 (prep) → J-7 (sync hybride) → J-0 (bascule MX vendredi soir) → J+7 (décommissionnement). Rollback garanti. | 1.5 min | ❌ À créer |
| **Conduite du changement** | Communication (S-4 à J+0), formations (webinaire + atelier MFA), transferts de compétences DSI (Proxmox 2j, FortiGate 1j, ESET ½j), hotline VIP. | 1.5 min | ❌ À créer |

**Ce que le jury retient :** *"Le projet ne s'arrête pas au déploiement. Ils ont pensé à la suite."*

**Transition :** *"Tout cela a un coût. Regardons les chiffres."*

---

### 💰 Niveau 5 — Le Prix (3-5 min)
*"Le budget arrive en dernier, quand le jury comprend pourquoi chaque euro est dépensé."*

| Slide | Contenu | Durée | Existe ? |
|:------|:--------|:-----:|:---------|
| **Impact budgétaire** | +329 500€ économisés. TCO 5 ans : 441,5k€ → 112k€. ROI < 12 mois. Budget 398 733€ / 450 000€ (réserve 11,4%). | 2 min | ✅ |
| **Chiffrage détaillé** | Tableaux du workspace Finance. | 1-2 min | ✅ |
| **Planning & RACI** | Gantt, registre PMO. | 1 min | ✅ |

**Ce que le jury retient :** *"Ils sont en dessous du budget avec 11% de réserve. Et ils économisent 329 500€ de licences."*

---

### 🏁 La Conclusion (1-2 min)

| Slide | Contenu | Existe ? |
|:------|:--------|:---------|
| **Bilan + Merci** | 27 sites, 380 users, 5 VLANs/site, 398 733€. Les 3 piliers : SD-WAN unifié, Conformité HDS, Infrastructure IaC. "Merci — Questions ?" | ✅ |

---

## Pourquoi cette structure fonctionne

### L'effet entonnoir en image

```
┌─────────────────────────────────────────────┐
│         NIVEAU 1 — Vue Satellite            │  "Qui, quoi, pourquoi ?"
│      (Contexte, périmètre, contraintes)     │
├──────────────────────────────────────┐      │
│       NIVEAU 2 — État des Lieux     │      │  "Qu'est-ce qui est cassé ?"
│    (Audit, anomalies, carte Avant)  │      │
├───────────────────────────────┐     │      │
│    NIVEAU 3 — Les Briques     │     │      │  "Comment on répare ?"
│  (Serveurs, OS, Réseau, Sécu) │     │      │
├────────────────────────┐      │     │      │
│  NIVEAU 4 — Garanties  │      │     │      │  "Comment ça tient ?"
│  (PRA, SOC, Formation)  │      │     │      │
├─────────────────┐       │      │     │      │
│ NIVEAU 5 — Prix │       │      │     │      │  "Combien ça coûte ?"
│ (TCO, ROI, Gantt)│       │      │     │      │
└─────────────────┘       │      │     │      │
                          └──────┘     └──────┘
```

### Les 3 règles respectées

1. **On ne parle jamais d'un détail avant d'avoir posé le cadre.** Le jury comprend toujours *pourquoi* on lui montre quelque chose.
2. **Le budget arrive en dernier.** Quand le jury entend "329 500€ économisés", il a vu les 15 slides techniques qui l'expliquent.
3. **Chaque transition est une question.** "Qu'est-ce qui est cassé ?" → "Comment on répare ?" → "Comment ça tient ?" → "Combien ça coûte ?". Le jury suit le raisonnement naturellement.

---

## Les phrases de transition (à dire à l'oral)

| Passage | Phrase |
|:--------|:-------|
| Intro → Diagnostic | *"Maintenant, regardons de plus près ce qu'on a trouvé en arrivant chez GSBLAB."* |
| Diagnostic → Briques | *"Le diagnostic est posé. Voici notre plan de traitement, brique par brique."* |
| Briques → Garanties | *"L'infrastructure est modernisée. Mais comment garantir qu'elle résistera dans le temps ?"* |
| Garanties → Budget | *"Tout cela a un coût. Regardons les chiffres."* |
| Budget → Conclusion | *"En résumé : un SI modernisé, sécurisé, conforme HDS, pour 398 733€ sur un budget de 450 000€."* |

---

## Répartition suggérée par orateur

| Orateur | Niveaux | Durée |
|:--------|:--------|:------|
| **Jérôme** | Niveau 1 (Vue Satellite) + Niveau 2 (État des Lieux) | ~8 min |
| **Léo** | Niveau 3 (Briques Techniques) | ~12 min |
| **Romain** | Niveau 4 (Garanties) + Niveau 5 (Prix) + Conclusion | ~8 min |

**Total :** ~28 min de contenu parlé → confortable sur un créneau de 30-35 min.

---

## Récapitulatif des slides à créer

| # | Slide manquante | Niveau | Priorité |
|:-:|:----------------|:-------|:--------:|
| 1 | Audit de l'existant | 2 | 🔴 |
| 2 | Anomalies du sujet (16 erreurs) | 2 | 🔴 |
| 3 | Sortie VMware → Proxmox | 3 | 🔴 |
| 4 | Assainissement OS (WS2022) | 3 | 🔴 |
| 5 | Licences & Messagerie (LTSC + EXO) | 3 | 🔴 |
| 6 | Sauvegarde 3-2-1-1-0 | 3 | 🔴 |
| 7 | IAM & PSSI | 3 | 🟡 |
| 8 | Endpoints & Zero Trust | 3 | 🟡 |
| 9 | Réponse aux incidents (SOC) | 4 | 🔴 |
| 10 | Conduite du changement | 4 | 🔴 |
