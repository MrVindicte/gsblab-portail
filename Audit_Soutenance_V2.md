# Audit de la Présentation "Soutenance V2" (GSBLAB)

Ce document présente l'audit global de la structure, de l'architecture narrative, du design et du séquençage de la présentation "V2" (Safe Mode / Glassmorphism) pour la soutenance du Mastère.

---

## 1. Architecture Narrative (Le Flow)

La présentation est structurée en **5 Actes**, suivant une logique implacable de type "Entonnoir de Vente" (Problème ➡️ Solution ➡️ Réassurance ➡️ Clôture). C'est une excellente pratique pour un jury technique et exécutif.

### 🎭 Les 5 Actes :
1. **Acte 1 — Le Contexte (Slides 1.1 à 1.2)**
   - *Rôle* : Cadrage. Présentation de l'équipe G1 et du périmètre.
   - *Avis* : Très bien. Rapide et direct. Le jury n'a pas besoin qu'on lui lise le sujet pendant 10 minutes.

2. **Acte 2 — Le Diagnostic (Slides 2.1 à 2.2)**
   - *Rôle* : La douleur (Pain point). Audit de la dette technique et démonstration de l'esprit critique.
   - *Avis* : La slide "Esprit Critique (16 anomalies)" est un **coup de maître**. Elle montre au jury que vous n'êtes pas de simples exécutants, mais de véritables architectes capables de challenger un cahier des charges (ex: le RAID 10 à 2 disques).

3. **Acte 3 — La Prescription (Slides 3.1 à 3.6)**
   - *Rôle* : La solution technique de bout en bout.
   - *Avis* : C'est le cœur de la soutenance. La division en 4 piliers (Stockage/Virtu, Réseau, Cloud/Backup, Sécurité) est très claire. Le fait de justifier la *sortie de VMware* et d'assumer *Proxmox* montre une forte maturité face à l'actualité du marché (rachat Broadcom).

4. **Acte 4 — Les Garanties (Slides 4.1 à 4.3)**
   - *Rôle* : La réassurance (Risk Management).
   - *Avis* : Indispensable pour un DSI. Parler de RPO/RTO (PRA), du SOC et du scénario de bascule (Cutover Exchange) prouve que vous maîtrisez non seulement le "Build" (la construction) mais aussi le "Run" (l'exploitation en production).

5. **Acte 5 — Le Budget & TCO (Slides 5.1 à 5.3)**
   - *Rôle* : L'argumentaire financier (ROI).
   - *Avis* : Excellente idée de ne pas parler que du coût d'achat (CAPEX) mais de projeter sur 5 ans (TCO / OPEX). Le choix du *glassmorphism* pour mettre en avant l'économie de 329 500 € fera mouche. La conclusion vers 2030 ouvre parfaitement sur les questions/réponses.

---

## 2. Design et Ergonomie (UI/UX)

> [!TIP]
> **Le Design System V2 ("Glassmorphism & Dark Mode")**
> Le choix d'une interface très sombre avec des effets de flou (backdrop-blur), des bordures semi-transparentes et des halos de lumière (glows) donne une identité "Hyperviseur Cloud / Dashboard Cyber" extrêmement premium.

- **Points Forts :**
  - **Gestion de l'attention** : L'apparition séquentielle des éléments (`subSteps`) empêche le jury de lire la fin de la slide pendant que vous parlez du début.
  - **Aération** : Les textes ont été drastiquement raccourcis (punchlines) au profit de l'oralité. Le support visuel ne vole plus la vedette au conférencier.
  - **Stabilité Layout** : Grâce au système `opacity-0 invisible` / `opacity-100`, les éléments prennent leur place dans le DOM dès le chargement. Il n'y a **aucun layout shift** (saut d'écran) lors des animations.
  - **Sauvegarde d'État** : Le `sessionStorage` permet de rafraîchir la page (F5) ou de changer d'onglet sans perdre sa position ni son étape d'animation. C'est le parachute de secours parfait en direct.

---

## 3. Analyse du Contenu & Pédagogie

### Ce qui est brillant :
1. **L'approche "No Bullshit"** : Vous pointez directement du doigt les aberrations de la demande (ex: *Portables comptés deux fois*). Cela crée une relation d'égal à égal avec le jury.
2. **Le choix des mots** : Des termes comme *Vendor Lock-in*, *Hypercare*, *Cutover*, *Quorum Corosync*, *Zero Trust* sont utilisés à bon escient et montrent une réelle maîtrise du vocabulaire professionnel.
3. **Le découpage du Cutover Exchange** : C'est le cauchemar de tout sysadmin. L'avoir découpé jour par jour (Vendredi à Lundi) rassurera n'importe quel DSI dans le jury.

### Les (très) rares points de vigilance à l'oral :
> [!WARNING]
> **Attention à l'équilibre du temps de parole**
> L'Acte 3 (La Prescription) contient **6 slides**, c'est le double des autres Actes. Veillez à bien dynamiser cette partie à l'oral pour ne pas endormir l'audience. Ne lisez surtout pas les slides, survolez-les en donnant des cas d'usage (ex: "Concrètement, comment un médecin se connecte au SD-WAN...").

---

## 4. Bilan Global

La **Soutenance V2 (Safe Mode)** est techniquement irréprochable et visuellement "Wow". 
Elle coche toutes les cases d'un examen de niveau Mastère (Expertise / Architecture / Management des risques) tout en adoptant les codes du monde de l'entreprise (TCO, OPEX, PRA, Résilience).

**Note d'Audit : 10/10** — *Prêt pour la production et prêt pour le Jury.*
