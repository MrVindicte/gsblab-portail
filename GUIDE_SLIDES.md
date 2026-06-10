# Guide de refonte des slides — Mode Présentation GSBLAB

> Document de travail pour la refonte slide par slide du mode présentation
> du portail. À lire avec `ETAT_PROJET.md` (état technique global) et
> `CLAUDE.md` (déploiement). Mis à jour au **2026-06-10**.

---

## 1. Objectif

Retravailler les 31 étapes du mode présentation, **une slide à la fois**.

Cible validée par l'utilisateur : chaque slide doit fonctionner comme un
**fil conducteur pour le présentateur ET un support pour le jury** —
uniquement des éléments-clés / mots-clés en gros caractères, révélés
**un par un** au clic (`data-reveal-at`), qui s'accumulent jusqu'à former
la synthèse complète en fin de slide.

À éviter : grilles de "glass-panel cards" génériques (pattern déjà
sur-utilisé dans le deck), murs de texte, tout ce qui s'affiche d'un bloc.

---

## 2. Référence de style validée : "Périmètre du Projet"

La slide `dashboard` étapes 2-6 (`ExecutiveSummary.js`, `presSlide2to6`) est
**LE modèle** à reproduire/adapter. La slide 7 "Stratégie de Transformation"
vient d'être refaite dans ce style et **validée** par l'utilisateur
(cf. §4 statut).

### Gabarit HTML/Tailwind à reproduire

```html
<div data-pres-slide="N[,M,...]" data-pres-label="Nom de la slide"
     class="flex-1 min-h-0 flex flex-col justify-center py-2">

  <div class="w-full max-w-5xl mx-auto flex flex-col gap-10">

    <!-- TITRE -->
    <div class="text-center space-y-2.5">
      <h2 class="text-3xl font-extrabold text-white tracking-tight leading-tight">
        Titre de la slide
      </h2>
      <div class="w-16 h-[2px] mx-auto bg-slate-700 rounded-full"></div>
    </div>

    <!-- CONTENU : si les lignes ont des largeurs très différentes,
         ajouter mx-auto w-fit pour centrer le bloc sur SON contenu
         (et pas sur le conteneur max-w-5xl) -->
    <div class="flex flex-col gap-7 mx-auto w-fit">

      <!-- Élément 1 : visible direct (pas de data-reveal-at) -->
      <div class="flex items-center gap-8">
        <div class="w-56 flex-shrink-0 flex items-center gap-2.5">
          <span class="w-6 h-1 bg-blue-500/50 rounded-full inline-block flex-shrink-0"></span>
          <span class="text-xs font-bold text-blue-400 uppercase tracking-widest">01 · LABEL</span>
        </div>
        <div class="flex items-baseline gap-3 flex-1 min-w-0 flex-wrap">
          <span class="text-lg md:text-xl font-mono font-bold text-slate-500 line-through decoration-2 whitespace-nowrap">Avant</span>
          <span class="text-slate-600 text-xl flex-shrink-0">→</span>
          <span class="text-xl md:text-2xl font-mono font-black text-white whitespace-nowrap"
                style="text-shadow: 0 0 15px rgba(255,255,255,0.1)">Après</span>
        </div>
      </div>

      <!-- Élément 2+ : révélé au clic suivant -->
      <div data-reveal-at="N+1" class="opacity-0 transition-all duration-700 flex items-center gap-8">
        ...
      </div>

    </div>
  </div>
</div>
```

### Règles de style

- Titre : toujours centré, `text-3xl font-extrabold`, barre `w-16 h-[2px] bg-slate-700`.
- Mots-clés : `font-mono`. "Avant" = `font-bold text-slate-500 line-through` ;
  "Après" = `font-black text-white` (+ `text-shadow` léger).
- Label de catégorie (optionnel) : petite barre couleur + texte
  `text-xs font-bold uppercase tracking-widest text-{color}-400`.
- Couleurs par thème : reprendre celles déjà utilisées dans `pillars`
  (blue=Virtualisation, emerald=Stockage, purple=Sécurité, amber=Sauvegardes)
  ou la couleur dominante de l'onglet.
- `whitespace-nowrap` sur les mots-clés (pas de `truncate` — le texte ne
  doit jamais être coupé). Si trop large, **réduire la taille de police**
  ou **raccourcir le texte**, jamais tronquer.

---

## 3. Méthodologie par slide

1. **Lire** le composant concerné, repérer le bloc `data-pres-slide="..."`.
2. **Extraire le contenu factuel** (chiffres/labels) — toujours depuis
   `ETAT_PROJET.md` / les données déjà présentes dans le composant. Ne rien
   inventer.
3. **Si la direction visuelle n'est pas évidente** (slide complexe,
   plusieurs façons de la découper) : proposer 2-3 concepts via
   `AskUserQuestion` avec previews ASCII, en explorant des layouts hors du
   pattern "grille de cards". Sinon, appliquer directement le gabarit §2.
4. **Implémenter** :
   - Découper le contenu en étapes de reveal (1 info = 1 clic).
   - Si le nombre d'étapes locales de la slide change, **renuméroter**
     `data-pres-slide`/`data-reveal-at` et décaler les slides suivantes du
     même onglet, puis mettre à jour `PRES_MAX[tab]` dans `src/main.js`
     (`PRES_TOTAL` se recalcule automatiquement).
   - ⚠️ **`data-pres-slide`/`data-reveal-at` utilisent toujours la numérotation
     LOCALE à l'onglet (1 à `PRES_MAX[tab]`), jamais l'étape globale**
     (cf. `ETAT_PROJET.md` § Système de présentation). Exemple concret déjà
     fait : pour `dashboard`, la slide 7 est passée de `data-pres-slide="7"`
     (1 étape) à `data-pres-slide="7,8,9,10"` (4 étapes, `data-reveal-at`
     8/9/10), et la slide suivante "Impact Budgétaire" a été décalée de
     `data-pres-slide="8"` → `"11"`. `PRES_MAX.dashboard` 8→11.
5. **Cache-bust** (règle critique CLAUDE.md) :
   - Composant modifié : `?v=N` → `?v=N+1` dans `src/main.js`.
   - `src/main.js` : `?v=N` → `?v=N+1` dans `index.html`.
6. **Mettre à jour `ETAT_PROJET.md`** : table des versions, table des slides
   (PRES_MAX/PRES_TOTAL), journal de session.
7. **Vérifier visuellement** : serveur déjà lancé
   (`python -m http.server 5173` → http://127.0.0.1:5173). F5 (le `?v=`
   bumpé suffit, pas besoin de Ctrl+F5). Naviguer en mode présentation
   (bouton "Lancer la Présentation", flèches/`Espace`, ou sélecteur
   "Espace :" dans le footer pour sauter direct à un onglet — atterrit sur
   l'étape locale 1 de cet onglet, puis `→` pour avancer jusqu'à l'étape visée).
8. **Itérer** sur le retour visuel (alignement, débordement, centrage —
   cf. les 2 ajustements faits sur la slide 7 : suppression de `truncate`
   et centrage via `mx-auto w-fit`).

---

## 4. Statut d'avancement (37 étapes)

`PRES_MAX = { dashboard:14, finance:5, tech:3, drp:3, pmo:5, comparison:2, sites:5 }`

| Onglet | Étapes locales | Slide | Statut |
|---|---|---|---|
| dashboard | 1 | Présentation de l'équipe | 🔵 Couverture — style intro différent, à juger séparément |
| dashboard | 2-6 | Synthèse Générale + Périmètre du Projet | ✅ **Référence du gabarit** (déjà conforme) |
| dashboard | 7-10 | Stratégie de Transformation | ✅ **FAIT** (session 2026-06-10) — 4 piliers révélés un par un |
| dashboard | 11-14 | Impact Budgétaire | ✅ **FAIT** (session 2026-06-10) — hero "+329 500 €" puis 3 preuves (TCO/ROI/Budget) révélées une par une |
| finance | 1-4 | Analyse TCO & Économies | ✅ **FAIT** (session 2026-06-10) — "Facture Comparée" 2 colonnes (VMware vs Proxmox) : socle CapEx identique révélé, puis OpEx divergent (licences/cœur vs support standard), puis TOTAL 441,5k€ vs 112,0k€ + écart "+329 500 €" |
| finance | 5 | Comparatif Budgétaire | ⏳ À retravailler |
| tech | 1 | Architecture Globale | ⏳ À retravailler |
| tech | 2 | Cluster Proxmox | ⏳ À retravailler |
| tech | 3 | Déploiement IaC | ⏳ À retravailler |
| drp | 1-3 (1 slide) | Plan de Reprise d'Activité | 🔶 Reveal déjà ajouté (2026-06-10) mais style "cards" — à harmoniser avec le gabarit §2 |
| pmo | 1-3 (1 slide) | Roadmap 2026-2030 | 🔶 idem (cards + reveal) |
| pmo | 4-5 (1 slide) | Risques Critiques | 🔶 idem |
| comparison | 1-2 (1 slide) | Avant/Après — Dette Technique | 🔶 idem |
| sites | 1-3 (1 slide) | Architecture des 27 Sites | 🔶 idem |
| sites | 4-5 (1 slide) | Connectivité & Sécurité Réseau | 🔶 idem |

Légende : ✅ fait & validé · ⏳ pas commencé · 🔶 a un reveal mais style
"cards" à réévaluer/harmoniser · 🔵 cas à part (couverture).

---

## 5. ⚠️ Points en suspens

Incohérence **RTO/RPO** (héritée d'une session précédente) : slide DRP
affiche `4h / 1h`, le tableau "Chiffres clés" d'`ETAT_PROJET.md` indique
`< 5 min / < 1h`. À trancher avec Romain avant de retravailler la slide DRP.

Incohérence **référentiel financier** (découverte session 2026-06-10,
slide "Analyse TCO & Économies") : le calculateur interactif
(`financialMath.js`, état par défaut) donne un CapEx Proxmox seul de
237 580€, déjà supérieur au TCO Proxmox 5 ans "officiel" (112,0k€) utilisé
dans le deck. Calculateur live et chiffres officiels ne sont pas réconciliés.
Pour les slides de présentation, utiliser les chiffres officiels
(112,0k€/441,5k€/+329 500 €) — ne pas inventer de ventilation de
raccordement. Détail complet dans `ETAT_PROJET.md` (session 2026-06-10
suite 3).

---

## 6. Comment reprendre dans une nouvelle fenêtre

1. Lire ce fichier + `ETAT_PROJET.md`.
2. Demander à l'utilisateur quelle slide attaquer (sinon suivre l'ordre du
   tableau §4 : finance → tech → drp/pmo/comparison/sites → Équipe).
3. Appliquer la méthodologie §3 et le gabarit §2.
