# Chrono & Déroulé de Soutenance (20 Minutes)

La soutenance V2 est conçue pour durer exactement **20 minutes**, ce qui correspond à un rythme de présentation dynamique (type "Pitch Comex"). La clé est de ne pas s'attarder sur le contexte pour libérer un maximum de temps sur la valeur ajoutée de l'équipe (Audit, Prescription, Garanties).

---

## ⏱️ Acte 1 — Le Contexte (2 min max)
*Le jury a déjà lu le dossier. Le but est de briser la glace et de poser le cadre très rapidement.*

- **Slide 1.1 (Titre & Équipe)** : (30 sec) Présentation de l'équipe G1.
- **Slide 1.2 (Périmètre)** : (1 min 30) "Voici le réseau actuel de GSBLAB (3 centres, 1 siège). On passe directement à l'analyse de l'existant."

---

## ⏱️ Acte 2 — Le Diagnostic (3 minutes)
*C'est ici que l'équipe montre qu'elle ne fait pas qu'exécuter, mais qu'elle a une vraie vision critique.*

- **Slide 2.1 (Dette Technique)** : (1 min) "Le SI est obsolète, les OS sont en fin de vie, la certification HDS est impossible en l'état."
- **Slide 2.2 (Esprit Critique / Anomalies)** : (2 min) **Point crucial.** Mettez en avant vos corrections. "On a refusé le RAID 10 à 2 disques, on a repéré le double comptage budgétaire, on a sécurisé le SAN."

---

## ⏱️ Acte 3 — La Prescription (7 minutes)
*C'est le cœur technique de l'infrastructure. Avancez avec un bon rythme, ne lisez pas les slides, expliquez "pourquoi" ces choix ont été faits.*

- **Slide 3.1 & 3.2 (Stratégie & VMware)** : (2 min) "La stratégie repose sur 4 piliers. Le choix de Proxmox nous permet de fuir la politique tarifaire de Broadcom/VMware tout en gardant des performances de niveau Entreprise."
- **Slide 3.3, 3.4 & 3.5 (HA & Serveurs & Backup)** : (3 min) "Nous avons un cluster de 4 nœuds. Le stockage est géré via Ceph (sans baie SAN centralisée = pas de SPOF). Nos sauvegardes respectent la règle de l'air-gap immuable (3-2-1-1-0) via Proxmox Backup Server, OVHcloud et votre robot à bandes LTO conservé."
- **Slide 3.6 (Réseau & Sécu)** : (2 min) "Le SD-WAN Fortinet relie les cliniques de manière chiffrée, et nous avons mis en place une segmentation stricte (VLANs)."

---

## ⏱️ Acte 4 — Les Garanties (5 minutes)
*C'est l'Acte de réassurance. Le moment où vous parlez à un DSI inquiet des risques potentiels.*

- **Slide 4.1 (PRA)** : (1 min 30) "Si le pire arrive (incendie) : RPO d'1h, RTO de 4h. Nous sommes capables de redéployer l'infrastructure chez OVH via Terraform."
- **Slide 4.2 (SOC / Riposte)** : (1 min 30) "Face à un ransomware, notre SOC Wazuh réagit en moins d'une minute pour isoler la machine infectée."
- **Slide 4.3 (Cutover Exchange)** : (2 min) "La migration de 380 boîtes vers Exchange Online est l'opération la plus sensible. Voici le planning heure par heure de la bascule du week-end pour garantir zéro perte de mail lundi matin."

---

## ⏱️ Acte 5 — Le Budget & Conclusion (3 minutes)
*Finir sur une note très professionnelle : le ROI (Retour sur Investissement) et l'avenir.*

- **Slide 5.1 & 5.2 (Plafond & TCO)** : (2 min) "Non seulement nous respectons l'enveloppe budgétaire initiale, mais nos choix architecturaux et de licences (Proxmox, Office LTSC) génèrent une économie de 329 500 € sur 5 ans."
- **Slide 5.3 (Conclusion Finale)** : (1 min) "Objectif atteint : infrastructure certifiable HDS. Une première étape claire pour 2026, et une infrastructure prête pour la vision 2030 (SD-WAN global, IA locale)."

---

## 💡 Conseils pour l'oral
> [!IMPORTANT]
> **Ne lisez jamais les slides !** 
> L'écran est un support visuel avec des mots-clés forts. C'est vous, à l'oral, qui faites le lien et racontez l'histoire (Storytelling).

> [!TIP]
> **Répartition du temps de parole :**
> Si vous êtes plusieurs, assurez-vous que les passages de relais se font aux moments clés (par exemple, passage de témoin entre le "Diagnostic" et la "Prescription technique", puis de nouveau vers le "Financier/Budget").
