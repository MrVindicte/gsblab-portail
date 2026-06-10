# Refonte "Architecture Globale" (tech) → 3 slides — Carte de France & Focus Réseau

> Document de travail dédié à la scission de l'ancienne slide `tech` étape 1
> ("Topologie Réseau & SD-WAN" / "Architecture Globale") en **3 slides
> présentation distinctes**. À lire avec `GUIDE_SLIDES.md` (méthodologie
> générale de refonte des slides) et `ETAT_PROJET.md` (état technique global,
> journal de session détaillé). Mis à jour au **2026-06-10**.
>
> ⚠️ Ne pas confondre avec `PLAN_ORAL.md` §4.2 (3 nouvelles scènes A/B/C pour
> l'oral final — Anomalies CDC, refonte PRA, Conduite du Changement) :
> sujet totalement différent.

---

## 1. Objectif

Remplacer l'ancienne slide 1 de l'onglet `tech` (layout `grid-cols-3`, schéma
SVG hub-spoke générique + panneau de détails au clic) par **3 slides** :

| # | Slide | Contenu | Statut |
|---|---|---|---|
| 1 | **Carte de France — Réseau National** | Carte de l'Hexagone, 16 sites + hub Strasbourg, tooltip au survol | ✅ **FAIT** (V1→V6, ce document §2) |
| 2 | **Focus Siège** | Zoom animé sur le réseau interne du siège social (Strasbourg) | ⏳ **À FAIRE** (§3) |
| 3 | **Focus Centre de Prélèvement** | Zoom animé sur le réseau type d'un centre de prélèvement (site satellite) | ⏳ **À FAIRE** (§4) |

**Contrainte posée par l'utilisateur** : pour le moment, on travaille
uniquement le **design / la forme / le fond visuel**. Les données réseau
réelles (topologie détaillée du siège + des centres de prélèvement) sont en
cours de préparation **par Romain**, en parallèle. Slides 2 et 3 ne démarrent
pas tant que ces données ne sont pas disponibles (ou tant que l'utilisateur
ne donne pas le feu vert pour une version "design only" en attendant).

---

## 2. Slide 1 — "Carte de France — Réseau National" (✅ FAIT)

### 2.1 Concept retenu

Parmi 3 propositions soumises via `AskUserQuestion`, l'utilisateur a choisi
**"carte plein cadre + tooltip flottant"** : une silhouette SVG de l'Hexagone
en fond de carte, avec marqueurs de sites au survol.

### 2.2 Contenu de la slide

- **Bandeau KPI** (chiffres officiels `ETAT_PROJET.md`) : 27 sites · 333
  utilisateurs · 20 tunnels VPN IPsec.
- **Silhouette de l'Hexagone** : SVG `viewBox="0 0 480 445"`, contour à 30
  points dérivés de repères géographiques réels (Dunkerque, frontière belge,
  Ardennes, Alsace/Lauterbourg, Bâle, Jura, Genève, Mont-Blanc, Briançon,
  Tende, Menton, Saint-Tropez, Marseille, golfe du Lion, Cerbère, Andorre,
  Hendaye, Bayonne, Arcachon, Île de Ré, Saint-Nazaire, Lorient, pointe du
  Raz, Brest, Mont-Saint-Michel, Cherbourg, Caen/Le Havre, baie de Somme).
- **Hub Strasbourg (siège)** : marqueur bleu avec halo `animate-ping`, label
  "Strasbourg · Siège", positionné sur le "nez" alsacien (nord-est).
- **16 marqueurs de sites** répartis sur les grandes villes françaises
  (Lille, Caen, Rennes, Nantes, Tours, Paris, Reims, Dijon, Besançon, Lyon,
  Clermont-Ferrand, Bordeaux, Toulouse, Montpellier, Marseille, Nice).
- **Interaction au survol** (`mouseenter`/`mouseleave`) : connecteur en
  pointillés mis en évidence (vert émeraude), point agrandi, tooltip flottant
  positionné dynamiquement (`getBoundingClientRect`, bascule gauche/droite
  selon la moitié de la carte) affichant nom, région, postes, modèle pare-feu
  et statut VPN IPsec du site.

### 2.3 Formule de positionnement géographique

Pour garantir un alignement cohérent entre le contour ET les marqueurs, une
**formule unique** est appliquée partout :

```
x = (lon + 4.8) * 36.9
y = (51.1 - lat) * 50.6
```

(bbox France approximative : longitude -4.8°→8.2°, latitude 42.3°→51.1°,
mappée sur le viewBox 480×445).

### 2.4 Historique des itérations

| Version | Changement | Retour utilisateur déclencheur |
|---|---|---|
| V1 | 16 marqueurs sur un cercle de rayon 30px autour du hub (zone Alsace uniquement) | — (identifié proactivement : marqueurs totalement superposés, hover impossible) |
| V2 | Cercle élargi (rayon 58px), marqueurs/points redimensionnés | idem (suite) |
| V3 | 16 marqueurs répartis sur les grandes régions de France entière, reliés au hub par connecteurs traversant la carte | *"j'aurais aimé avoir une carte de la France entière, pas uniquement l'Alsace"* |
| V4 | Silhouette redessinée à partir de coordonnées géographiques approximatives (28 points) — Bretagne, Cotentin, Alpes, golfe du Lion, Pyrénées, "nez" alsacien reconnaissables | *"la map est celle de l'alsace mais pas la france"* |
| **V5** | Refonte complète avec la formule unique §2.3 (30 points de contour + 16 villes + hub recalculés de façon cohérente) ; ajustements manuels Marseille/Nice/Montpellier (côtières) et Lille (308,50, tombait au nord du contour) | *"les points ne sont pas placés aux bons endroits... les villes sont mal placées"* puis *"il y a un point hors de la France, au nord"* |
| **V6** | Titre réduit de `text-4xl md:text-5xl` à `text-3xl md:text-4xl` | *"le titre... est trop gros"* puis *"pas du tout raccord avec les autres titres"* |

Toutes les itérations ont été vérifiées par capture d'écran headless Chrome
(pas de Playwright/chromium-cli disponible dans l'environnement) — voir
méthodologie dans `ETAT_PROJET.md` (session 2026-06-10 suite 4).

### 2.5 ⚠️ Placeholder à remplacer dès que Romain fournit les données

Les **16 sites affichés** sont actuellement les sites **Alsace** de
`defaultData.js` (`spokesList.slice(1)`, ids 2-17 — Wolfisheim,
Mittelhausbergen, Strasbourg Robertsau, etc.), affichés aux 16 positions
nationales ci-dessus **uniquement pour la maquette visuelle**. Le contenu du
tooltip (nom/région/pare-feu) ne correspond donc **pas encore** à la position
géographique réelle du marqueur.

Quand Romain fournira la liste des **27 sites nationaux avec coordonnées
réelles** :
1. Mettre à jour `src/config/defaultData.js` avec les 27 sites réels (noms,
   régions, équipements).
2. Remplacer le tableau `mapPositions` dans `TechnicalWorkspace.js` par les
   27 positions réelles (recalculées avec la formule §2.3 si on a lon/lat,
   ou positionnées manuellement sinon).
3. Vérifier qu'aucun marqueur ne tombe hors du contour `franceMapPath`
   (cf. piège Lille V5 — nudger manuellement les sites côtiers/frontaliers
   si besoin).

### 2.6 État technique

- Fichier : `src/components/TechnicalWorkspace.js` (`?v=9`)
- Versions : `index.html` → `main.js?v=55`
- `presSlide2` (Cluster Proxmox) et `presSlide3` (Déploiement IaC) inchangées
- `PRES_MAX.tech` reste à **3** (édition en place de la slide 1)

---

## 3. Slide 2 — "Focus Siège" (⏳ À FAIRE)

### Concept (à définir/valider avec l'utilisateur)

Zoom/transition animée depuis le hub "Strasbourg" de la slide 1 vers un
schéma détaillé du réseau du **siège social** : topologie interne (firewall,
switches, VLANs, postes, serveurs/cluster Proxmox référencé par la slide
"Cluster Proxmox").

### Pré-requis bloquants

- **Données réseau du siège** (topologie, équipements, plan IP/VLAN) — en
  cours de préparation par Romain. **Non disponibles à ce jour.**
- Concept visuel non encore proposé/validé (pas de `AskUserQuestion` soumis).

### Statut

Pas commencé. Ne pas démarrer avant que les données soient disponibles, sauf
décision explicite de l'utilisateur de faire une version "design only" en
attendant (placeholder, comme pour la slide 1).

---

## 4. Slide 3 — "Focus Centre de Prélèvement" (⏳ À FAIRE)

### Concept (à définir/valider avec l'utilisateur)

Même logique que la slide 2, mais pour un **centre de prélèvement type**
(site satellite) : topologie type (firewall + switch + postes + tunnel IPsec
vers le siège), probablement présentée comme un "zoom" sur l'un des 16
marqueurs de la slide 1.

### Pré-requis bloquants

- **Données réseau type d'un centre de prélèvement** — en cours de
  préparation par Romain. **Non disponibles à ce jour.**
- Concept visuel non encore proposé/validé.

### Statut

Pas commencé. Mêmes conditions de démarrage que la slide 2 (§3).

---

## 5. Impact sur la numérotation (à appliquer lors de l'implémentation de 2 et 3)

Quand les slides "Focus Siège" et "Focus Centre de Prélèvement" seront
implémentées :

1. `data-pres-slide` actuels de l'onglet `tech` :
   - Slide 1 "Carte de France" reste `1`.
   - Nouvelle slide "Focus Siège" devient `2`.
   - Nouvelle slide "Focus Centre de Prélèvement" devient `3`.
   - "Cluster Proxmox" passe de `2` → `4`.
   - "Déploiement IaC" passe de `3` → `5`.
2. `PRES_MAX.tech` : `3` → `5` dans `src/main.js` (`PRES_TOTAL` se recalcule
   automatiquement).
3. Mettre à jour `ETAT_PROJET.md` (table des slides §PRES_MAX, journal de
   session) et `GUIDE_SLIDES.md` §4 (statut `tech`).
4. Cache-bust : `TechnicalWorkspace.js?v=N+1`, `main.js?v=N+1`,
   `index.html?v=N+1` (règle critique `CLAUDE.md`).
5. Vérification visuelle via le workflow capture d'écran headless Chrome
   (§2.4 / `ETAT_PROJET.md`).

---

## 6. Comment reprendre dans une nouvelle fenêtre

1. Lire ce fichier + `ETAT_PROJET.md` (session 2026-06-10 suite 4) +
   `GUIDE_SLIDES.md`.
2. Vérifier auprès de l'utilisateur si les données réseau (siège / centre de
   prélèvement) ont été fournies par Romain.
3. Si oui → commencer par §2.5 (remplacement des données placeholder de la
   slide 1), puis proposer un concept visuel pour la slide 2 (§3) via
   `AskUserQuestion`.
4. Si non → rester sur la slide 1 (ajustements visuels mineurs uniquement),
   ou demander à l'utilisateur s'il souhaite une version "design only" des
   slides 2/3 en attendant.
