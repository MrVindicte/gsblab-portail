# GSBLAB — Contexte pour assistant IA

## Projet

Portail décisionnel interactif développé dans le cadre d'un projet de fin d'année Mastère 2IC.
Il compare trois scénarios d'infrastructure IT (Proxmox HA, VMware Broadcom, Cloud HDS) sur un TCO 5 ans.
Le portail tourne sur Kubernetes (3 pods répliqués) sur une VM Linux, accessible depuis le réseau local.

**Repo GitHub** : https://github.com/MrVindicte/gsblab-portail  
**Accès web** : http://192.168.1.10 (port 80) ou http://192.168.1.10:30080

---

## Architecture de déploiement

```
[Navigateur réseau local]
        │ HTTP :80
        ▼
[VM Linux 192.168.1.10]
  nginx (reverse proxy)
        │ proxy_pass :30080
        ▼
[Minikube — réseau interne 192.168.49.2]
  NodePort Service :30080
        │
  ┌─────┴──────┐
  Pod 1      Pod 2      Pod 3
  nginx:alpine  nginx:alpine  nginx:alpine
  (image gsblab-web:latest)
```

- **Minikube** tourne avec le driver Docker (`minikube start --driver=docker`)
- L'image Docker est construite **dans le daemon Minikube** (`eval $(minikube docker-env)`) avec `imagePullPolicy: Never`
- **nginx** sur l'hôte est un reverse proxy vers `192.168.49.2:30080`
- Les headers `Cache-Control: no-cache, no-store` sont envoyés par nginx pour éviter le cache navigateur des ES modules

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `deploy.sh` | Script d'installation complète (à la racine du repo, copie sur /root/Desktop/) |
| `index.html` | Point d'entrée HTML — charge `src/main.js?v=X` (le `?vX` casse le cache ES module) |
| `src/main.js` | Orchestrateur principal — importe tous les composants avec `?v=X` |
| `src/components/FinanceWorkspace.js` | Espace Chiffrage & TCO — contient le carrousel graphe/tableau |
| `src/components/Sidebar.js` | Panneau gauche avec les sliders de paramètres |
| `src/utils/financialMath.js` | Calculs TCO/ROI |
| `/opt/gsblab/k8s/deployment.yaml` | Manifest K8s — 3 replicas, RollingUpdate |
| `/opt/gsblab/k8s/service.yaml` | NodePort :30080 |
| `/etc/nginx/sites-available/gsblab` | Config nginx reverse proxy |
| `/usr/local/bin/gsblab-start.sh` | Script de démarrage systemd |
| `/usr/local/bin/gsblab-sync.sh` | Script de sync Git (lancé toutes les 2 min par timer) |

## Services systemd

| Service | Rôle |
|---|---|
| `gsblab.service` | Démarre Minikube + build image + déploie K8s au boot |
| `gsblab-sync.timer` | Déclenche `gsblab-sync.service` toutes les 2 minutes |
| `gsblab-sync.service` | `git pull` → si nouveau commit → `docker build` + `kubectl rollout restart` |
| `nginx.service` | Reverse proxy hôte |

---

## Workflow de mise à jour du code

1. Modifier un fichier source dans `/opt/gsblab/app/`
2. **Incrémenter le `?v=X`** dans `index.html` ET dans tous les imports de `src/main.js` (évite le cache navigateur des ES modules — piège classique)
3. `git add . && git commit -m "description" && git push`
4. Toutes les VMs du groupe récupèrent le changement automatiquement en < 2 minutes

> **Attention cache ES modules** : les imports `type="module"` sont agressivement cachés par les navigateurs. Si une modification JS n'est pas visible malgré un hard refresh, il faut incrémenter le numéro de version (`?v=2` → `?v=3`) dans `index.html` et dans tous les `import` de `src/main.js`.

---

## Commandes utiles

```bash
# État général
kubectl get pods -l app=web -o wide
systemctl status gsblab nginx gsblab-sync.timer

# Logs
journalctl -u gsblab -f           # démarrage/reboot
journalctl -u gsblab-sync -f      # sync Git automatique

# Forcer une sync maintenant
systemctl start gsblab-sync.service

# Vérifier le prochain déclenchement du timer
systemctl list-timers gsblab-sync.timer

# Redéployer manuellement après un changement
eval $(minikube docker-env)
docker build -t gsblab-web:latest /opt/gsblab/app/
kubectl rollout restart deployment/web-deployment
kubectl rollout status deployment/web-deployment

# Scaler les pods
kubectl scale deployment web-deployment --replicas=5

# Tuer un pod pour tester la résilience (il redémarre seul)
kubectl delete pod <nom-du-pod>
```

---

## Pièges connus et solutions

| Problème | Cause | Solution |
|---|---|---|
| Page pas mise à jour malgré push | Cache ES module navigateur | Incrémenter `?v=X` dans `index.html` et `src/main.js` |
| `imagePullPolicy` erreur | Image construite hors Minikube | Toujours `eval $(minikube docker-env)` avant `docker build` |
| Port 80 occupé | Apache2 préinstallé sur la VM | `systemctl stop apache2 && systemctl disable apache2` |
| `kubectl` ne répond pas | Minikube pas démarré | `minikube start --driver=docker --force` |
| `git: dubious ownership` | Dossier `/opt/gsblab/app` appartient à un autre user | `git config --global --add safe.directory /opt/gsblab/app` |
| Sync ne détecte pas les changements | Remote URL en HTTPS sans credentials | Utiliser SSH : `git remote set-url origin git@github.com:MrVindicte/gsblab-portail.git` |

---

## Installation sur une nouvelle VM (1 commande)

```bash
sudo bash deploy.sh
```

Prérequis : Linux x86_64, accès internet, droits root.
Le script installe automatiquement : Docker, kubectl, Minikube, git, nginx.
Il clone le repo GitHub, build l'image, déploie les 3 pods et configure la sync automatique.
