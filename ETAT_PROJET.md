# GSBLAB Portail — État du projet

> Document de référence mis à jour au **2026-06-10**.
> À conserver dans le repo. Mettre à jour après chaque session de travail significative.

> 🎯 **Refonte des slides en cours** → voir [`GUIDE_SLIDES.md`](./GUIDE_SLIDES.md)
> pour la méthodologie, le gabarit visuel validé et le statut slide par slide.

---

## L'équipe

| Prénom | Rôle |
|---|---|
| Romain | Chiffrage & PMO |
| Jérôme | Portail décisionnel & Documentation |
| Léo | Architecture & IaC |

Mastère 2IC — Groupe 1 — Soutenance 2026.

---

## Contexte métier (GSBLAB)

GSBLAB = entreprise de santé fictive, 27 laboratoires (1 hub Strasbourg + 26 spokes).
5 nouveaux labos en expansion. Obligation légale **HDS v2**.

**Dette technique actuelle** : ESXi 6.0 EOL · SAN SAS SPOF · réseau flat sans FW · sauvegardes LTO manuelles.

**Décision retenue** : migration vers **Proxmox VE HA** (Scénario A).

### Chiffres clés à retenir

| Indicateur | Valeur |
|---|---|
| Utilisateurs | 333 (plateau 380 en 2028) |
| Sites (Spokes) | 27 — 20 VPN IPsec actifs |
| Serveurs HA | 4 — 2× Dell R760 + 2× Dell R730 |
| Compute | 256 vCPUs · 1,5 To RAM · 48 To Ceph SSD |
| RTO / RPO | < 5 min / < 1 heure |
| TCO Proxmox (5 ans) | 112 000 € |
| TCO VMware (5 ans) | 441 500 € |
| Gain net | **+329 500 €** · ROI < 12 mois · −74% licences |
| Budget total projet | **440 794 €** / enveloppe 450 000 € → réserve 9 206 € (2%) |
| Remises négociées | 49 532 € |
| HDS v2 | 95% — Activités 1 à 6 certifiées · DPA Microsoft à signer |

### Matrice de transition

| # | Domaine | Avant (dette) | Après (cible) |
|---|---|---|---|
| 01 | Virtualisation | ESXi 6.0 | Proxmox VE HA |
| 02 | Stockage | SAN SAS (SPOF) | Cluster Ceph 3× |
| 03 | Sécurité | Flat Net sans FW | VLANs + FortiGate |
| 04 | Sauvegardes | Bandes LTO manuelles | PBS Immuable 3-2-1-1-0 |

---

## Architecture du codebase

**Stack** : Vanilla JS ES6 (modules natifs) · Tailwind CSS CDN v3 · Chart.js CDN · Zero bundler.

### Fichiers principaux

| Fichier | Rôle |
|---|---|
| `index.html` | Point d'entrée — config Tailwind custom, CDN, `main.js?v=38` |
| `src/main.js` | Orchestrateur — `window.appState`, `renderApp()`, système présentation (37 slides) |
| `src/index.css` | Styles custom (`?v=2`) — `.glass-panel`, animations, `@media print`, `.livrable-export-mode` |
| `src/components/ExecutiveSummary.js` | Synthèse — 14 slides présentation (v21) |
| `src/components/FinanceWorkspace.js` | Chiffrage & TCO — sliders, "Facture Comparée" + Comparatif Budgétaire, 5 slides présentation (v14) |
| `src/components/TechnicalWorkspace.js` | Architecture réseau — SVG hub-spoke, carte de France, IaC, 3 slides (v7) |
| `src/components/DrpSimulator.js` | Simulateur PRA — ransomware + sinistre, 1 slide/3 reveals (v5) |
| `src/components/PmoWorkspace.js` | PMO — risques, roadmap 2026-2030, 2 slides/5 reveals (v6) |
| `src/components/BeforeAfterSlider.js` | Comparaison avant/après, 1 slide/2 reveals (v5) |
| `src/components/SitesWorkspace.js` | 27 sites — phases de déploiement, 2 slides/5 reveals (v5) |
| `src/components/Sidebar.js` | Navigation latérale (v4) |
| `src/config/defaultData.js` | Données — 27 spokes, liste risques (v3) |
| `src/utils/financialMath.js` | Calculs TCO/ROI 3 scénarios |

### Système de présentation (mode PowerPoint)

Mécanisme à deux niveaux (tous les onglets sont passés sur ce système) :

1. **Sélection de slide** — `data-pres-slide="N"` (ou liste `"N,M,..."`) sur le
   conteneur racine de chaque vue présentation. `N` est l'**étape LOCALE à
   l'onglet** (1 à `PRES_MAX[onglet]`, remise à 1 à chaque changement
   d'onglet — cf. `globalToLocal()` dans `main.js`), **pas** l'étape globale
   (1 à `PRES_TOTAL`, qui sert uniquement au compteur/à la barre de
   progression). `updatePresentationDOM()` active (`pres-slide-active`) la
   slide dont la liste contient `appState.presentationStep` (= étape locale
   courante).
   ⚠️ Exemple : onglet `finance` → `PRES_OFFSET.finance = 14` → son étape
   locale 1 correspond à l'étape globale 15, mais le HTML porte bien
   `data-pres-slide="1"` (jamais `"15"`).
2. **Révélation progressive** — `data-reveal-at="N"` sur des sous-éléments
   *à l'intérieur* de la slide active : `opacity-100` dès que
   `presentationStep >= N` (N = étape **locale**), sinon `opacity-0`.
3. `data-pres-label="..."` affiche le nom de la slide dans le footer.

Navigation : `Espace`/`→` avance · `←` recule · `Échap` quitte · sélecteur
« Espace : » (`pres-page-select`, footer) pour sauter directement à un onglet.

`PRES_MAX = { dashboard:14, finance:5, tech:3, drp:3, pmo:5, comparison:2, sites:5 }`
→ **PRES_TOTAL = 37 slides/étapes**

| Onglet | N | Détail |
|---|---|---|
| dashboard | 14 | 1 Équipe · 2-6 Synthèse + Périmètre du Projet (reveal 3→6) · 7-10 Stratégie de Transformation (4 piliers révélés un par un) · 11-14 Impact Budgétaire (hero "+329 500 €" puis 3 preuves TCO/ROI/Budget révélées une par une) |
| finance | 5 | 1-4 Analyse TCO & Économies, « Facture Comparée » 2 colonnes VMware/Proxmox (CapEx identique reveal 2 → OpEx divergent reveal 3 → TOTAL 441,5k€ vs 112,0k€ + écart "+329 500 €" reveal 4) · 5 Comparatif budgétaire |
| tech | 3 | 1 Architecture globale · 2 Cluster Proxmox · 3 Déploiement IaC |
| drp | 3 | 1 slide « PRA » : KPIs fixes → scénarios (reveal 2) → chaîne PBS (reveal 3) |
| pmo | 5 | Slides 1-3 « Roadmap 2026-2030 » (2026 fixe → +2027/28 reveal 2 → +2029/30 reveal 3) · Slides 4-5 « Risques critiques » (top2 fixes → risques 3-4 reveal 5) |
| comparison | 2 | 1 slide « Avant/Après » : avant seul → delta+après (reveal 2) |
| sites | 5 | Slides 1-3 « Architecture 27 sites » (Siège fixe → Labos reveal 2 → Centres reveal 3) · Slides 4-5 « Connectivité réseau » (Topo fixe → palette VLAN reveal 5) |

> Note : des blocs `data-pres-step="N"` (ancien mécanisme) subsistent dans le
> rendu **mode normal** de SitesWorkspace/PmoWorkspace — ils n'ont aucun effet
> en mode présentation (ignorés par `main.js`), à nettoyer à l'occasion.

### Tailwind config custom (dans index.html)

- `blue` remappé sur indigo/saphir (400=#818cf8, 500=#6366f1)
- `slate` fond sombre (900=#0e0f12, 950=#07080a)
- `emerald` vert médical (500=#10b981)
- `indigo`, `amber`, `purple`, `red` : valeurs Tailwind par défaut

---

## Ce qui a été fait

### Session 2026-06-10 (suite 3) — Slide "Analyse TCO & Économies" repensée en "Facture Comparée"

Ancienne slide 1 de l'onglet `finance` : cartes KPI (économies/ROI) + bloc
"conseil" + canvas Chart.js (graphe TCO 5 ans empilé), 1 étape locale,
statique. Jugée trop proche du gabarit "cards" déjà vu plusieurs fois dans
le deck — demande explicite : un effet "wow" marketing, visuellement
distinct, mais professionnel.

Concept retenu (parmi 3 propositions soumises via `AskUserQuestion`) : **la
Facture Comparée** — mise en scène "ticket de caisse" en 2 colonnes
face-à-face (VMware Broadcom vs Proxmox VE HA) :

- En-têtes visibles direct : `01 · Statu quo / VMware Broadcom` vs
  `02 · Cible retenue / Proxmox VE HA`.
- **Reveal 2** — ligne "Socle technique (CapEx)" : strictement identique
  pour les deux scénarios (vérifié dans `financialMath.js` :
  `capexVmware = {...capexProxmox}`) — démontre que ce n'est pas le matériel
  qui coûte cher.
- **Reveal 3** — ligne OpEx divergente : `Licences cœur Broadcom`
  (facturation par cœur, driver qualitatif vérifié dans `financialMath.js` :
  `opexVmware.hypervisorSupport = totalCores * vmwareCorePrice`) vs
  `Support standard inclus` (forfait fixe, aucun coût/cœur).
- **Reveal 4** — TOTAL TCO 5 ans : `441,5k€` vs `112,0k€` + bandeau écart
  final `+ 329 500 €`.

La slide passe de **1 à 4 étapes locales** (1→1,2,3,4) ; "Comparatif
Budgétaire" est décalée de l'étape locale 2 → 5. Le canvas Chart.js
(`tco-chart-canvas`) n'existe désormais plus dans aucune slide de
présentation de l'onglet finance — `bindFinanceEvents` détruit proprement
`chartInstance` (et le remet à `null`) si le canvas est absent, pour éviter
toute fuite mémoire en navigant entre slides.

⚠️ **Incohérence référentielle résolue** (Option C retenue) : la slide 5 "Comparatif
Budgétaire" affiche désormais un badge explicite "Simulateur Interactif Live"
et une note de bas de page précisant que les valeurs calculées dynamiquement
peuvent différer du scénario officiel (TCO 112,0k€). Cela clarifie la transition
avec la slide "Analyse TCO" qui, elle, affiche les chiffres figés de l'ETAT_PROJET.md.
Point ouvert de même nature que l'incohérence RTO/RPO (cf. GUIDE_SLIDES.md §5).

Impact : `PRES_MAX.finance` 2 → **5**, slide "Comparatif Budgétaire" décalée
de l'étape locale 2 → 5, `PRES_TOTAL` 34 → **37**.

Versions : `index.html` → `main.js?v=52` · `FinanceWorkspace.js?v=28`

### Session 2026-06-10 (suite 2) — Slide "Impact Budgétaire" repensée (clôture)

Dernière slide du dashboard (étape locale 11, ex-bloc TCO statique sans
reveal). Refonte dans le même gabarit que "Périmètre du Projet" /
"Stratégie de Transformation", avec un angle "marketing" assumé pour la
clôture de la présentation :

- **Hero chiffre choc**, visible dès l'arrivée sur la slide :
  `+ 329 500 €` (`text-6xl md:text-7xl font-mono font-black text-emerald-400`)
  + sous-titre "économisés sur 5 ans · TCO global du projet".
- Puis **3 lignes-preuves révélées une par une** (`data-reveal-at`),
  même style `font-mono` avant→après que les piliers :
  1. `01 · TCO 5 ans` — `441,5k€` (barré) → `112,0k€`
  2. `02 · ROI` — `< 12 mois` · `-74% licences`
  3. `03 · Budget` — `450 000€` → `440 794€` (réserve 2%)

La slide passe de **1 à 4 étapes locales** (11→11,12,13,14).

Impact : `PRES_MAX.dashboard` 11 → **14**, `PRES_TOTAL` 31 → **34**.

Versions : `index.html` → `main.js?v=36` · `ExecutiveSummary.js?v=21`

### Session 2026-06-10 (suite) — Slide "Stratégie de Transformation" repensée

L'ancienne slide 7 (grille 2×2 de cartes glass-panel, statique) était jugée
générique et trop dense pour l'oral. Refonte dans le style "Périmètre du
Projet" (même fond/fonctionnement) :

- Titre centré + barre, puis les 4 piliers (Virtualisation, Stockage,
  Sécurité, Sauvegardes) affichés en grandes lignes `font-mono font-black`
  (`AVANT` barré gris → `APRÈS` en blanc/gras).
- Révélation **un pilier à la fois** via `data-reveal-at` : le 1er est visible
  d'entrée, les 3 suivants apparaissent aux clics suivants. À la fin, les 4
  lignes empilées forment la synthèse pour le jury.
- La slide passe de **1 à 4 étapes locales** (7→8,9,10).

Impact : `PRES_MAX.dashboard` 8 → **11**, slide "Impact Budgétaire" décalée de
l'étape locale 8 → 11, `PRES_TOTAL` 28 → **31**.

Versions : `index.html` → `main.js?v=35` · `ExecutiveSummary.js?v=20`

> Ajustement : `truncate` retiré (texte coupé sur "Bandes LTO Manuelles →
> PBS Immuable (DRP)"), conteneur `max-w-4xl→max-w-5xl`, police légèrement
> réduite (`text-lg/xl` avant, `text-xl/2xl` après) + `whitespace-nowrap`.

### Session 2026-06-10 — Mode présentation : DRP, Comparison, PMO, Sites

Les 4 onglets restants (qui utilisaient l'ancien mécanisme `data-pres-step`,
cassé en mode présentation) sont passés au format slide plein écran
`data-pres-slide`, dans le style Synthèse/Finance/Tech :

- **DrpSimulator** : 1 slide — KPIs RTO/RPO/27 sites + 2 cartes scénarios
  (ransomware / sinistre physique) + chaîne de sauvegarde PBS
- **BeforeAfterSlider** : 1 slide — comparatif 3 colonnes avant / delta / après
- **PmoWorkspace** : 2 slides — roadmap 5 phases (2026→2030) + top-4 risques critiques
- **SitesWorkspace** : 2 slides — vue d'ensemble 27 sites + topologie hub-and-spoke/VLAN

Puis ajout de la révélation progressive (`data-reveal-at`) sur ces 4 onglets,
même mécanisme que le bloc « Périmètre du Projet » de la Synthèse.

`PRES_MAX` : 19 → **28 slides/étapes au total** (drp 1→3, pmo 2→5,
comparison 1→2, sites 2→5).

Versions : `index.html` → `main.js?v=32` · `BeforeAfterSlider.js?v=5` ·
`DrpSimulator.js?v=5` · `PmoWorkspace.js?v=6` · `SitesWorkspace.js?v=5`

> ⚠️ **Incohérence à vérifier** : la nouvelle slide DRP affiche
> **RTO 4h / RPO 1h**, alors que le tableau "Chiffres clés" de ce document
> indique **RTO < 5 min / RPO < 1h**. À trancher avec Romain (chiffrage)
> avant l'oral — la valeur retenue doit être identique partout (slide,
> 09_PRA_PCA_BIA, 09b_DRP_Runbook).

### Session 2026-06-03 — Page Synthèse — Refonte complète

Problèmes résolus :
- **Ne tenait pas sur une page** → layout `flex-col h-full` avec `overflow-hidden` sur `<main>`
- **Format trop basique** → nouveau layout 3 zones style PowerPoint

Structure du slide Synthèse :
```
HEADER STRIP    — Titre + badge 2IC/GRP.01 + check budget + bouton "Livrable PDF"
────────────────────────────────────────────────────────
COL. GAUCHE (5fr)  │  COL. DROITE (6fr)
  KPIs 2×2         │  Budget TCO hero (441,5k€ → 112k€)
  (333/27/4/95%)   │  ─────────────────────────────────
  ─────────────── │  Cluster HA  │  SLAs PRA
  Matrice          │  256v/1.5T  │  <5'/<1h
  Transition       │  ─────────────────────────────────
  (4 piliers 2×2)  │  HDS Compliance (6 items)
────────────────────────────────────────────────────────
FOOTER HERO STRIP  — 440 794€ │ 95% HDS │ <12 mois │ 27 sites
```

Technique fit-to-viewport :
- `<main class="flex-1 overflow-hidden flex flex-col">` pour le dashboard
- `<div class="flex-1 min-h-0 max-w-7xl mx-auto w-full flex flex-col">` wrapper interne
- `min-h-0` sur tous les éléments flex qui doivent se comprimer
- Typographie `clamp()` en inline style pour s'adapter à la résolution

Versions après refonte : `index.html` → `main.js?v=12` → `ExecutiveSummary.js?v=7`

---

## Serveur local (développement)

```bash
# Démarrer (depuis Git Bash, à la racine du projet)
cd "/c/Users/SKZ/Desktop/git-gsblab/gsblab-portail"
python -m http.server 5173 --bind 127.0.0.1 &

# Accès
http://127.0.0.1:5173

# Arrêter
pkill -f "http.server"
```

> Les ES modules (`type="module"`) ne fonctionnent pas en `file://` — toujours passer par HTTP.

---

## Règle critique — Cache-bust ES modules

**À chaque modification d'un fichier JS**, incrémenter `?v=X` à DEUX endroits :

1. L'import dans `src/main.js` : `import Foo from './components/Foo.js?v=N'` → `?v=N+1`
2. L'import dans `index.html` si `main.js` a changé : `main.js?v=N` → `?v=N+1`

Sans ça, le navigateur sert l'ancienne version même après Ctrl+F5.

---

## Backlog — Ce qui reste à faire

### Court terme
- [ ] Résoudre l'incohérence RTO/RPO (slide DRP "4h/1h" vs tableau "<5min/<1h", cf. session 2026-06-10)
- [ ] Tester le parcours complet des 28 slides sur projecteur 1080p (timing des `data-reveal-at`)
- [x] Appliquer le même traitement PowerPoint / fit-to-viewport aux 7 onglets (fait 2026-06-10)
- [ ] Mode Export livrable : actuellement bouton "Export PDF" (`btn-export-livrable` /
      `.livrable-export-mode`) limité à la Synthèse — étendre aux autres onglets si besoin
- [ ] Améliorer la transition intro slide → dashboard (actuellement instantanée)

### Nettoyage
- [ ] Retirer les blocs `data-pres-step="N"` obsolètes (mode normal de
      SitesWorkspace, PmoWorkspace) — sans effet depuis le passage à `data-pres-slide`
- [ ] SitesWorkspace : vérifier la cohérence des 27 sites avec les données réelles

### Infrastructure
- [ ] Créer un `.claude/skills/run/SKILL.md` pour lancer le serveur automatiquement
- [ ] Vérifier que la sync automatique (timer 2 min) fonctionne après le push

---

## Déploiement (rappel)

```
VM Linux 192.168.1.10
  nginx :80 → proxy_pass Minikube :30080
  3× Pod nginx:alpine (image gsblab-web:latest)
  Sync automatique : git pull toutes les 2 min (gsblab-sync.timer)
```

Pour déployer : `git add . && git commit -m "..." && git push`
La VM récupère le changement automatiquement en < 2 minutes.

Repo GitHub : https://github.com/MrVindicte/gsblab-portail
