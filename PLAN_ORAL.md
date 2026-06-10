# Plan de Présentation Orale — GSBLAB

> Document de planification du **contenu** pour l'oral blanc (20 min) et
> l'oral final (30 min). Croise le portail actuel (`ETAT_PROJET.md`,
> `GUIDE_SLIDES.md`) avec les 19 livrables écrits (`Livrables_Documentation/`)
> et le cahier des charges client (`Documents_Fournis/`).
> Mis à jour au **2026-06-10**. Aucune slide n'a été modifiée pour produire
> ce document — c'est une étape de planification pure.

---

## ⚠️ 1. Points bloquants à trancher avant l'oral

Deux incohérences chiffrées, visibles par un jury qui clique séquentiellement
dans le portail. À régler **avec Romain** (chiffrage) avant toute nouvelle
slide — sinon elles se retrouveront aussi dans le contenu ajouté.

### 1.1 — NOUVEAU : "Comparatif Budgétaire" contredit "Analyse TCO" / "Impact Budgétaire"

- `finance` étapes 1-4 ("Analyse TCO & Économies") et `dashboard` étapes 11-14
  ("Impact Budgétaire") affichent les **chiffres officiels figés** :
  Proxmox 5 ans = **112,0k€**, VMware 5 ans = **441,5k€**, écart = **+329 500€**.
- `finance` étape 5 ("Comparatif Budgétaire", `budget-table-body`) affiche un
  tableau **calculé en live** par `calculateFinancials()`/`generateTcoProjections()`
  à partir de l'état par défaut du simulateur (333/27/4/300€/4500€/5%).
  Avec ces paramètres, `financialMath.js` donne un **CapEx Proxmox seul de
  237 580€** — déjà supérieur au "112,0k€" affiché 1 slide plus tôt.
- **Conséquence concrète** : en cliquant `→` de l'étape locale 4 à 5 (finance),
  le jury voit deux totaux "TCO 5 ans Proxmox" différents pour le même
  scénario, sur deux slides consécutives.

**Options de résolution (à trancher, pas de chiffre à inventer ici)** :

| Option | Principe | Qui décide |
|---|---|---|
| A | Aligner les paramètres par défaut du simulateur (`defaultData.js` /
    `financialMath.js`) pour que `calculateFinancials()` reproduise
    112,0k€/441,5k€ | Romain (chiffrage) — implique de revoir la formule ou
    les constantes |
| B | Donner un chiffre "officiel" Cloud HDS et figer les 3 totaux du tableau
    "Comparatif Budgétaire" comme pour les 2 autres slides (cohérence visuelle,
    perd l'aspect "simulateur live") | Romain |
| C | Garder le calcul live mais **étiqueter explicitement** la différence :
    "Analyse TCO" = scénario retenu et chiffré (figé), "Comparatif Budgétaire"
    = simulateur interactif (les valeurs bougent avec les curseurs — normal
    qu'elles diffèrent du scénario de référence) | Décision de présentation,
    pas de chiffrage |

### 1.2 — HÉRITÉ : Incohérence RTO/RPO

- `drp` (slide "PRA") affiche **RTO 4h / RPO 1h**.
- `dashboard` "Périmètre du Projet"/"chiffres clés" affiche **RTO < 5 min / RPO < 1h**.
- `09_PRA_PCA_BIA.md` documente en réalité un **tableau à 3 niveaux de service**,
  aucun des deux ne correspond exactement :

  | Service | RTO | RPO |
  |---|---|---|
  | SGL "Medoc" + base de données | < 1h | < 15 min |
  | AD & DNS | < 2h | < 1h |
  | CRM Sage / RH / fichiers | < 8h | < 24h |
  | Messagerie M365 | N/A (SLA Microsoft 99,9%) | N/A |

- Piste de résolution proposée en §4.2.B : remplacer le couple unique "4h/1h"
  du DRP par ce tableau réel. Le "< 5 min" du dashboard pourrait alors être
  reformulé comme le temps de **bascule HA infrastructure** (panne hyperviseur,
  scénario 1 du BIA : 2-4 min), distinct du RTO **applicatif** par service —
  mais cette reformulation est **à valider par Romain**, ce n'est pas un fait
  déjà écrit noir sur blanc dans les livrables.

---

## 2. Cadrage temps

Le portail compte aujourd'hui **15 scènes / 37 étapes** (`PRES_TOTAL=37`).
À ~30 sec/étape en moyenne (certaines révélations sont un mot-clé rapide,
d'autres un commentaire plus long), 37 étapes ≈ **18-19 min** — soit
quasiment le budget de l'**oral blanc (20 min)**.

→ **Oral blanc = le deck actuel quasiment tel quel** (§3). Le rodage servira
surtout à vérifier ce minutage réel et la résolution de §1.1/§1.2.

→ **Oral final (30 min) = oral blanc + ~10 min**, répartis en :
- 2 nouvelles scènes ciblées (§4.2) ≈ **+3-4 min**
- Refonte DRP avec tableau BIA 3 niveaux (§1.2 / §4.2.B) ≈ **+1 min**
- 4 démos POC du document `11_Maquettes_et_POC.md` intercalées ≈ **+5-6 min**

Estimation finale : **17 scènes / ~47 étapes** (à affiner lors de
l'implémentation, cf. §6).

---

## 3. Plan — Oral Blanc (20 min, deck actuel)

| # | Onglet | Scène (`data-pres-label`) | Étapes locales | Contenu clé | Statut |
|---|---|---|---|---|---|
| 1 | dashboard | Présentation de l'équipe | 1 | Romain (Chiffrage/PMO), Jérôme (Portail/Doc), Léo (Archi/IaC) — Mastère 2IC Grp.01 | 🔵 cas à part |
| 2 | dashboard | Périmètre du Projet | 2-6 | 130→380 collab. · 7→27 sites · 0%→100% HDS · bandeau 450k€/HDS-RGPD/2026-2028/3 équipiers | ✅ |
| 3 | dashboard | Stratégie de Transformation | 7-10 | 4 piliers Avant→Après : Virtualisation, Stockage, Sécurité Flux, Sauvegardes | ✅ |
| 4 | dashboard | Impact Budgétaire | 11-14 | Hero **+329 500€** puis TCO/ROI/Budget | ✅ |
| 5 | finance | Analyse TCO & Économies | 1-4 | Facture comparée VMware vs Proxmox (CapEx identique → OpEx divergent → totaux) | ✅ |
| 6 | finance | Comparatif Budgétaire | 5 | Tableau 3 scénarios Proxmox/VMware/Cloud HDS | ⚠️ cf §1.1 |
| 7 | tech | Architecture Globale | 1 | Topologie hub-and-spoke | ⏳ |
| 8 | tech | Cluster Proxmox | 2 | 4 nœuds HA (2×R760 + 2×R730), Ceph | ⏳ |
| 9 | tech | Déploiement IaC | 3 | Automatisation déploiement | ⏳ |
| 10 | drp | PRA | 1-3 | KPIs RTO/RPO + 2 scénarios (ransomware/sinistre) + chaîne PBS | ⚠️ cf §1.2 |
| 11 | pmo | Roadmap 2026-2030 | 1-3 | 2026 (5 labos) → 2027-28 (15 centres) → 2029-30 (rachat) | ✅ |
| 12 | pmo | Risques Critiques | 4-5 | Top risques du registre | 🔶 |
| 13 | comparison | Avant/Après — Dette Technique | 1-2 | Audit existant (ESXi EOL, Exchange EOL, réseau flat...) | 🔶 |
| 14 | sites | Architecture 27 Sites | 1-3 | Siège → Labos 2026 → Centres 2027-28 | 🔶 |
| 15 | sites | Connectivité & Sécurité Réseau | 4-5 | Topologie + palette VLAN | 🔶 |

**Note** : si §1.1 n'est pas réglé à temps, prévoir de passer rapidement sur
la scène 6 ("voir le détail en annexe") plutôt que de s'attarder sur un
tableau contradictoire.

---

## 4. Plan — Oral Final (30 min)

### 4.1 Vue d'ensemble des ajouts

Le plan ci-dessus (§3) reste la colonne vertébrale. On y ajoute :

| Ajout | Type | Position proposée | Détail |
|---|---|---|---|
| **A. "Anomalies du Cahier des Charges"** | Nouvelle scène | `comparison`, après "Avant/Après — Dette Technique" | §4.2.A |
| **B. Refonte "PRA" → BIA 3 niveaux** | Refonte de la scène 10 (`drp`) | remplace `drp` 1-3 | §4.2.B — règle aussi §1.2 |
| **C. "Conduite du Changement & Bascule Messagerie"** | Nouvelle scène | `pmo`, après "Risques Critiques" | §4.2.C |
| 4 démos live (doc 11) | Intercalées dans des scènes existantes | voir §4.3 | — |

Ces emplacements respectent l'ordre actuel des onglets
(`dashboard → finance → tech → drp → pmo → comparison → sites`) — aucune
réorganisation structurelle proposée ici. Une réorganisation de l'ordre des
onglets serait une décision séparée, non traitée dans ce plan.

### 4.2 Briefs de contenu pour les 3 nouvelles/refondues scènes

#### A. "Anomalies du Cahier des Charges" — esprit critique

**Source** : `02b_Anomalies_Sujet_et_Resolutions.md` (16 anomalies recensées).
**Objectif** : montrer au jury qu'on a fiabilisé le dossier client avant de
concevoir, avec un impact budgétaire chiffré et tracé.

4 anomalies candidates (les plus parlantes, mix sécurité/technique/finance) :

1. **Faille sécurité critique** — la baie SAN et le robot de sauvegarde
   (`Backup01`) étaient exposés directement sur le routeur connecté à
   internet → corrigé par isolation VLAN.
2. **RAID10 impossible avec 2 disques** (les R730 n'avaient que 2 disques
   dans l'inventaire fourni) → ajout de 4× SSD SAS 3,84To/serveur, **+3 400€**.
3. **Exchange Online mal calibré** dans le chiffrage initial (montée en
   charge 215→292→380 utilisateurs mal moyennée) → recalcul à 333 users
   en moyenne, **+3 140€**.
4. **Doublons matériel** : 92 laptops comptés en double → 86 réels,
   licences Office LTSC ajustées 237→231, **économie de 1 560€**.

(Le total net et les 12 autres anomalies restent disponibles dans
`02b_Anomalies_Sujet_et_Resolutions.md` pour répondre aux questions du jury.)

#### B. Refonte "PRA" — tableau BIA à 3 niveaux

**Source** : `09_PRA_PCA_BIA.md` + `09b_DRP_Runbook_Operationnel.md`.
**Remplace** : l'actuel KPI unique "RTO 4h / RPO 1h".

Contenu proposé (en reveal progressif) :
1. Tableau 3 lignes (cf. §1.2) : SGL <1h/<15min · AD <2h/<1h · CRM/Fichiers <8h/<24h
2. Scénario "panne hyperviseur" — HA Corosync, 2-4 min, 0 perte de données
3. Scénario "ransomware" — isolation → restauration PBS immuable, 1-3h, perte <1h
4. Scénario "sinistre Strasbourg" — bascule OVH HDS / LTO, 48-72h, mode dégradé papier

#### C. "Conduite du Changement & Bascule Messagerie"

**Source** : `10_Conduite_Changement.md` + `07_Migration_Cutover_Rollback.md` +
`14_Sequence_Migration_Exchange.md`.
**Objectif** : montrer le volet humain (250 collaborateurs) et le moment le
plus risqué du planning (bascule Exchange).

Contenu proposé (en reveal progressif) :
1. **250 collaborateurs concernés** — timeline communication : S-4 (annonce
   DG/DSI) → S-2 ("Guide de Survie IT") → J-3 (rappel) → J (Hypercare,
   techniciens identifiables sur site)
2. **Formation** — utilisateurs : 1h Office/OWA + 1h cybersécurité/MFA ·
   IT : 2j Proxmox/PBS + 1j FortiGate + 0,5j ESET
3. **Bascule messagerie J-30 → J+7** — jalon clé : cutover MX
   **vendredi 17/07 à 19h** (TTL DNS abaissé à 300s en amont)
4. **Plan de retour arrière** — serveur Exchange 2013 intact jusqu'à J+7,
   rollback MX possible sans perte de mail

### 4.3 Placement des 4 démos live (`11_Maquettes_et_POC.md`)

| Démo | Format | Placement proposé | Durée |
|---|---|---|---|
| Live Migration Proxmox VE HA (cluster 2 nœuds, `ping -t` sans coupure) | **Live** | Pendant/après scène 8 "Cluster Proxmox" | ~2 min |
| Proxmox Backup Server — restauration fichier unique depuis VM 50Go | Captures annotées | Pendant scène B (refonte PRA), point "ransomware" | ~1,5 min |
| Réseau/sécurité — VLANs + tunnel IPsec site-à-site (GNS3/EVE-NG/pfSense) | Captures annotées | Pendant scène 7 "Architecture Globale" ou scène 15 "Connectivité réseau" | ~1,5 min |
| Console EDR (ESET Protect/Crowdstrike/Sophos) — inventaire + conformité | Capture annotée | Pendant scène C "Conduite du Changement" (volet sécurité poste de travail) | ~1 min |

Placements à valider avec Léo (qui prépare ces POC).

---

## 5. Backlog non retenu pour les slides (réponses aux questions du jury)

Ces livrables restent **disponibles tels quels** (imprimés ou en annexe
numérique) pour répondre aux questions, sans slide dédiée :

| Livrable | Contenu | Pourquoi pas en slide |
|---|---|---|
| `12b_Registre_Risques_RACI.md` | Matrice RACI complète (5 phases × 7 rôles) | Détail de gouvernance, public restreint |
| `15_Plan_Baie_Physique.md` | Implantation 42U datacenter Strasbourg | Visuel utile mais secondaire vs l'archi logique déjà montrée |
| `12_Planning_Detaille_2026.md` / `13_Diagramme_Gantt.md` / `GSBLAB_Planning_Migration_3pers.gan` | Planning semaine par semaine (S23-S38) | La "Roadmap 2026-2030" (pmo) couvre la vision stratégique ; le détail d'exécution est trop fin pour l'oral |
| `08_Politique_Securite_SI_PSSI.md` | Classification données, MFA, chiffrement, notif. CNIL 72h | Le KPI "Conformité HDS 95%" en synthèse sert de proxy ; détail en annexe |
| `06_Architecture_IP_Nommage.md` | Convention de nommage, plan IP/VLAN détaillé site par site | L'archi logique (sites/tech) montre le principe ; le détail IP est une annexe technique |

---

## 6. Prochaines étapes (une fois ce plan validé)

1. Trancher §1.1 et §1.2 avec Romain.
2. Mettre à jour `GUIDE_SLIDES.md` §4 : ajouter les entrées
   `comparison` → "Anomalies du Cahier des Charges" (⏳ à créer),
   `pmo` → "Conduite du Changement & Bascule Messagerie" (⏳ à créer),
   et marquer `drp` "PRA" → 🔄 à refondre (BIA 3 niveaux).
3. Traiter chaque scène une par une selon la méthodologie `GUIDE_SLIDES.md` §3
   (renumérotation `data-pres-slide`/`data-reveal-at`, `PRES_MAX`/`PRES_TOTAL`,
   cache-bust, mise à jour `ETAT_PROJET.md`).
4. Caler les 4 démos avec Léo (§4.3).
5. Répétition chronométrée : valider le minutage réel de §3 (oral blanc) puis
   de §4 (oral final), ajuster si dépassement.
