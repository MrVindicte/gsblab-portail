# Walkthrough : Master Plan Soutenance V2 (Safe Mode)

## Résumé du Déploiement

Nous avons implémenté avec succès le mode **Soutenance V2** ("Le Nouveau PowerPoint") pour le portail GSBLAB, selon une architecture modulaire et parfaitement sécurisée. 

L'objectif de cette implémentation était de doter l'équipe (Jérôme, Léo, Romain) d'un diaporama narratif de très haut vol pour l'oral, sans aucun risque de casser le portail V1 existant.

### Stratégie Zéro Risque (Isolation)
- Un bouton **SOUTENANCE FINALE** a été ajouté en haut à droite du portail.
- Lorsqu'on clique dessus, l'application bloque le rendu normal et charge un composant totalement autonome (`SoutenanceController.js`).
- La V1 (l'ancienne présentation) reste accessible via l'ancien bouton et fonctionne exactement comme avant.

## La Structure Narrative (Les 5 Actes)

Nous avons injecté **13 slides** inédites, réparties en 5 fichiers distincts pour faciliter la maintenance d'ici l'oral. Le code se trouve dans le dossier `src/components/soutenanceV2/`.

1. **Act1_Intro.js**
   - L'Équipe (G1)
   - Le Périmètre (130 → 380 users)

2. **Act2_Diagnostic.js**
   - L'Audit de la dette technique (OS obsolètes, VMware, Réseau plat).
   - L'Esprit Critique : Les 4 anomalies majeures du sujet corrigées par l'équipe.

3. **Act3_Prescription.js**
   - La stratégie des 4 piliers.
   - La sortie de VMware vers Proxmox VE (75 000€ d'économie).
   - L'architecture du Cluster HA et l'astuce de la *Live Migration*.
   - Le Bastion de sauvegarde Anti-Ransomware (3-2-1-1-0).
   - Le réseau SD-WAN Fortinet et le Zero Trust.

4. **Act4_Garanties.js**
   - Le PRA (RTO 4h / RPO 1h) et le scénario d'incendie.
   - La riposte du SOC face à un Ransomware (Timeline T=0 à T+15).
   - Le Cutover Exchange (La bascule du week-end).

5. **Act5_Budget.js**
   - Le CAPEX (Budget validé à ~395k€ pour un plafond de 450k€).
   - Le TCO (Les économies cumulées de 329 500€).
   - La conclusion de la soutenance.

## Tests & Validation

- [x] L'état global (`isSoutenanceV2`) bascule correctement sans polluer la V1.
- [x] Les contrôles au clavier (Espace, Flèches Droite/Gauche) ont été reroutés pour contrôler la V2.
- [x] La jauge de progression s'anime dynamiquement à chaque slide en bas de l'écran.
- [x] Les designs "Glassmorphism" utilisent TailwindCSS et ont un rendu exceptionnel en plein écran sombre (`#08090c`).

---
> **Si vous devez faire une modification de dernière minute avant l'oral :** Ne touchez plus à `main.js`. Ouvrez simplement le fichier de l'acte correspondant (ex: `src/components/soutenanceV2/Act3_Prescription.js`) et modifiez le texte HTML à l'intérieur. La structure est isolée pour que cela ne casse absolument rien.
