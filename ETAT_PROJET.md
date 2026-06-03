# GSBLAB Portail — État du projet

> Document de référence mis à jour au **2026-06-03**.
> À conserver dans le repo. Mettre à jour après chaque session de travail significative.

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
| `index.html` | Point d'entrée — config Tailwind custom, CDN, `main.js?v=12` |
| `src/main.js` | Orchestrateur — `window.appState`, `renderApp()`, système présentation |
| `src/index.css` | Styles custom — `.glass-panel`, animations, `@media print` |
| `src/components/ExecutiveSummary.js` | Synthèse — slide PowerPoint, 8 steps (v7) |
| `src/components/FinanceWorkspace.js` | Chiffrage & TCO — sliders, Chart.js (v7) |
| `src/components/TechnicalWorkspace.js` | Architecture réseau — SVG hub-spoke, IaC (v3) |
| `src/components/DrpSimulator.js` | Simulateur PRA — ransomware + incendie (v3) |
| `src/components/PmoWorkspace.js` | PMO — risques, roadmap 2026-2030 (v4) |
| `src/components/BeforeAfterSlider.js` | Comparaison avant/après — slider (v3) |
| `src/components/SitesWorkspace.js` | 27 sites — phases de déploiement (v3) |
| `src/config/defaultData.js` | Données — 27 spokes, liste risques (v3) |
| `src/utils/financialMath.js` | Calculs TCO/ROI 3 scénarios |

### Système de présentation (mode PowerPoint)

- `PRES_MAX = { dashboard:8, finance:6, tech:4, drp:2, pmo:4, comparison:3, sites:4 }` → **31 steps total**
- Navigation : `Espace` / `→` avance · `←` recule · `Échap` quitte
- Chaque élément HTML avec `data-pres-step="N"` est révélé progressivement
- `data-pres-label="..."` affiche le nom de l'étape dans le footer de présentation

### Tailwind config custom (dans index.html)

- `blue` remappé sur indigo/saphir (400=#818cf8, 500=#6366f1)
- `slate` fond sombre (900=#0e0f12, 950=#07080a)
- `emerald` vert médical (500=#10b981)
- `indigo`, `amber`, `purple`, `red` : valeurs Tailwind par défaut

---

## Ce qui a été fait (session 2026-06-03)

### Page Synthèse — Refonte complète

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
- [ ] Tester le fit-to-viewport sur résolution 1280×800 (laptops)
- [ ] Vérifier le rendu en mode présentation sur projecteur 1080p
- [ ] Mode Export livrable complet : rendu dédié "document A4" (état `appState.exportMode`)
- [ ] Améliorer la transition intro slide → dashboard (actuellement instantanée)

### Autres onglets (à traiter)
- [ ] Appliquer le même traitement PowerPoint / fit-to-viewport aux autres tabs
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
