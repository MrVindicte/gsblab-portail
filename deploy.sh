#!/bin/bash
set -eo pipefail

# ==============================================================================
#  CONFIGURATION — À MODIFIER AVANT DE PARTAGER
#  Mets l'URL de votre dépôt GitHub (ex: https://github.com/ton-groupe/gsblab)
#  Laisse vide ("") pour utiliser le zip local dans /root/Desktop/Partage/
# ==============================================================================
REPO_URL="https://github.com/MrVindicte/gsblab-portail.git"
# ==============================================================================

# ─── Couleurs ─────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

info()    { echo -e "${BLUE}[•]${NC} $1"; }
success() { echo -e "${GREEN}[✓]${NC} $1"; }
warn()    { echo -e "${YELLOW}[!]${NC} $1"; }
error()   { echo -e "${RED}[✗]${NC} $1"; exit 1; }
step()    { echo -e "\n${CYAN}${BOLD}══ $1 ══${NC}"; }

banner() {
echo -e "${CYAN}${BOLD}"
cat << 'BANNER'
 ██╗  ██╗ █████╗ ███████╗
 ██║ ██╔╝██╔══██╗██╔════╝
 █████╔╝ ╚█████╔╝███████╗
 ██╔═██╗ ██╔══██╗╚════██║
 ██║  ██╗╚█████╔╝███████║
 ╚═╝  ╚═╝ ╚════╝ ╚══════╝
   GSBLAB — Déploiement Web 3 Répliques K8s
BANNER
echo -e "${NC}"
}

# ─── OS check ─────────────────────────────────────────────
check_os() {
    [[ "$(uname -s)" == "Linux" ]] || error "Script prévu pour Linux uniquement."
    [[ "$(uname -m)" == "x86_64" ]] || error "Architecture x86_64 requise."
}

# ─── Docker ───────────────────────────────────────────────
install_docker() {
    step "Docker"
    if command -v docker &>/dev/null && docker info &>/dev/null; then
        success "Docker déjà installé et actif"
        return
    fi
    info "Installation de Docker..."
    apt-get update -qq
    apt-get install -y -qq ca-certificates curl gnupg lsb-release
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg 2>/dev/null || \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
        | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    if grep -qi kali /etc/os-release; then
        echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/debian bookworm stable" \
            > /etc/apt/sources.list.d/docker.list
    else
        echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/$(. /etc/os-release && echo "$ID") \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
            > /etc/apt/sources.list.d/docker.list
    fi
    apt-get update -qq
    apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin
    systemctl enable docker --now
    success "Docker installé"
}

# ─── kubectl ──────────────────────────────────────────────
install_kubectl() {
    step "kubectl"
    if command -v kubectl &>/dev/null; then
        success "kubectl déjà présent"
        return
    fi
    info "Téléchargement de kubectl..."
    KUBE_VER=$(curl -Ls https://dl.k8s.io/release/stable.txt)
    curl -LsO "https://dl.k8s.io/release/${KUBE_VER}/bin/linux/amd64/kubectl"
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    rm -f kubectl
    success "kubectl ${KUBE_VER} installé"
}

# ─── Minikube ─────────────────────────────────────────────
install_minikube() {
    step "Minikube"
    if command -v minikube &>/dev/null; then
        success "Minikube déjà présent"
        return
    fi
    info "Téléchargement de Minikube..."
    curl -LsO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    install minikube-linux-amd64 /usr/local/bin/minikube
    rm -f minikube-linux-amd64
    success "Minikube installé"
}

# ─── Démarrage Minikube ───────────────────────────────────
start_minikube() {
    step "Démarrage du cluster"
    if minikube status 2>/dev/null | grep -q "Running"; then
        success "Cluster déjà actif"
        return
    fi
    info "Démarrage de Minikube (driver=docker)..."
    minikube start \
        --driver=docker \
        --force \
        --cpus=2 \
        --memory=2048 \
        --kubernetes-version=stable \
        2>&1 | grep -v "^$" | sed 's/^/  /'
    success "Cluster Kubernetes démarré"
}

# ─── Récupération du code source ─────────────────────────
fetch_source() {
    step "Récupération du code source"
    mkdir -p /opt/gsblab/k8s
    apt-get install -y -qq git unzip 2>/dev/null || true

    if [[ -n "$REPO_URL" ]]; then
        # ── Mode Git (recommandé pour le travail en groupe) ──
        info "Source : dépôt Git → $REPO_URL"
        if [[ -d /opt/gsblab/app/.git ]]; then
            git -C /opt/gsblab/app pull --ff-only 2>&1 | sed 's/^/  /' || true
        else
            rm -rf /opt/gsblab/app
            git clone "$REPO_URL" /opt/gsblab/app 2>&1 | sed 's/^/  /'
        fi
        # Vérifier que le clone a atterri
        [[ -f /opt/gsblab/app/index.html ]] || error "Le clone Git a échoué — /opt/gsblab/app/index.html absent. Vérifie l'URL du dépôt et ton accès réseau."
        info "Commit actuel : $(git -C /opt/gsblab/app log -1 --oneline)"
    else
        # ── Mode Zip (fallback local) ─────────────────────────
        info "Source : zip local (REPO_URL non défini)"
        ZIP=$(find /root/Desktop/Partage -name "*.zip" 2>/dev/null | head -1)
        [[ -z "$ZIP" ]] && error "Aucun zip dans /root/Desktop/Partage/ et REPO_URL est vide."
        info "Zip trouvé : $ZIP"
        rm -rf /opt/gsblab/app && mkdir -p /opt/gsblab/app
        unzip -q -o "$ZIP" -d /opt/gsblab/app/
        SUBDIR=$(find /opt/gsblab/app -mindepth 1 -maxdepth 1 -type d | head -1)
        [[ -n "$SUBDIR" ]] && mv "$SUBDIR"/* /opt/gsblab/app/ && rmdir "$SUBDIR"
    fi

    info "Fichiers : $(ls /opt/gsblab/app | tr '\n' ' ')"
    success "Code source prêt dans /opt/gsblab/app/"
}

# ─── Build image Docker ───────────────────────────────────
build_docker_image() {
    step "Build image Docker (portail GSBLAB)"

    # Dockerfile minimal (idempotent — sera ignoré s'il existe déjà dans le repo)
    [[ ! -f /opt/gsblab/app/Dockerfile ]] && cat > /opt/gsblab/app/Dockerfile << 'DEOF'
FROM nginx:alpine
COPY . /usr/share/nginx/html/
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/lancer_portail.ps1 \
          /usr/share/nginx/html/lancer_portail_windows.bat
DEOF

    # Pointer le daemon Docker vers Minikube (évite que l'image soit construite dans le mauvais contexte)
    eval $(minikube docker-env) || error "Impossible d'accéder au daemon Docker de Minikube. Réessaie : minikube start"
    info "Build en cours (première fois : ~1-2 min pour télécharger nginx:alpine)..."
    docker build -t gsblab-web:latest /opt/gsblab/app/ 2>&1 | sed 's/^/  /'
    success "Image gsblab-web:latest construite dans Minikube"
}

# ─── (supprimé) ───────────────────────────────────────────
_write_html_legacy() {
    cat > /dev/null << 'HTMLEOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GSBLAB - Plateforme Décisionnelle TCO & ROI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --bg-main: #0b0f19; --bg-card: #131b2e; --bg-sidebar: #0f172a;
            --border-color: rgba(255,255,255,0.05); --border-hover: rgba(59,130,246,0.3);
            --text-main: #f1f5f9; --text-muted: #94a3b8;
            --accent-blue: #3b82f6; --accent-green: #10b981;
            --accent-red: #ef4444; --accent-purple: #8b5cf6;
            --font-main: 'Inter', sans-serif; --font-mono: 'JetBrains Mono', monospace;
            --shadow-glow-green: 0 0 20px rgba(16,185,129,0.15);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-main); background-color: var(--bg-main); color: var(--text-main); line-height: 1.5; min-height: 100vh; }
        header { background: linear-gradient(180deg,rgba(15,23,42,0.9) 0%,rgba(11,15,25,0.8) 100%); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-color); padding: 1.25rem 2rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
        .logo-container { display: flex; align-items: center; gap: 0.75rem; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg,var(--accent-blue) 0%,var(--accent-green) 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 1.25rem; box-shadow: 0 0 15px rgba(59,130,246,0.4); }
        .logo-text h1 { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.025em; background: linear-gradient(to right,#fff,var(--text-muted)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .logo-text p { font-size: 0.75rem; color: var(--accent-green); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .header-meta { display: flex; align-items: center; gap: 1rem; }
        .badge-hds { background-color: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: var(--accent-green); padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 0.35rem; }
        .badge-hds::before { content: ""; display: inline-block; width: 6px; height: 6px; background-color: var(--accent-green); border-radius: 50%; box-shadow: 0 0 8px var(--accent-green); }
        .btn-print { background-color: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s ease; }
        .btn-print:hover { background-color: rgba(255,255,255,0.1); }
        .app-container { display: grid; grid-template-columns: 360px 1fr; min-height: calc(100vh - 73px); }
        .sidebar { background-color: var(--bg-sidebar); border-right: 1px solid var(--border-color); padding: 2rem; overflow-y: auto; max-height: calc(100vh - 73px); }
        .sidebar-section { margin-bottom: 2rem; }
        .sidebar-section h3 { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 1.25rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); }
        .control-group { margin-bottom: 1.5rem; }
        .control-label { display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        .control-value { font-family: var(--font-mono); font-weight: 700; color: var(--accent-blue); font-size: 0.9rem; background-color: rgba(59,130,246,0.1); padding: 0.1rem 0.5rem; border-radius: 4px; }
        input[type="range"] { -webkit-appearance: none; width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 9999px; outline: none; margin-bottom: 0.25rem; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent-blue); cursor: pointer; box-shadow: 0 0 10px rgba(59,130,246,0.5); transition: transform 0.1s ease; }
        input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .control-desc { font-size: 0.75rem; color: var(--text-muted); }
        .dashboard-content { padding: 2rem; overflow-y: auto; max-height: calc(100vh - 73px); display: flex; flex-direction: column; gap: 2rem; }
        .kpis-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
        .kpi-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; transition: all 0.3s ease; }
        .kpi-card::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 4px; }
        .kpi-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
        .kpi-card.proxmox::before { background: linear-gradient(90deg,var(--accent-blue) 0%,var(--accent-green) 100%); }
        .kpi-card.vmware::before { background-color: var(--accent-red); }
        .kpi-card.cloud::before { background-color: var(--accent-purple); }
        .kpi-card.savings::before { background-color: var(--accent-green); }
        .kpi-card.savings { background: linear-gradient(135deg,rgba(16,185,129,0.05) 0%,rgba(13,27,46,0.5) 100%); box-shadow: var(--shadow-glow-green); border-color: rgba(16,185,129,0.2); }
        .kpi-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 600; }
        .kpi-value { font-family: var(--font-mono); font-size: 1.6rem; font-weight: 700; margin-bottom: 0.5rem; white-space: nowrap; }
        .kpi-card.proxmox .kpi-value { color: var(--text-main); }
        .kpi-card.vmware .kpi-value { color: var(--accent-red); }
        .kpi-card.cloud .kpi-value { color: var(--accent-purple); }
        .kpi-card.savings .kpi-value { color: var(--accent-green); }
        .kpi-footer { font-size: 0.75rem; color: var(--text-muted); }
        .visuals-section { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .card-visual { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; }
        .card-visual h3 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .chart-container { position: relative; width: 100%; height: 320px; }
        .advisory-box { background: rgba(15,23,42,0.4); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.25rem; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
        .advisory-status { padding: 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; line-height: 1.4; }
        .status-ok { background-color: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); color: var(--accent-green); }
        .status-warning { background-color: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: var(--accent-red); animation: pulse-border 2s infinite; }
        @keyframes pulse-border { 0%{border-color:rgba(239,68,68,0.2)}50%{border-color:rgba(239,68,68,0.6)}100%{border-color:rgba(239,68,68,0.2)} }
        .advisory-text { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; flex-grow: 1; line-height: 1.6; }
        .advisory-metrics { border-top: 1px solid var(--border-color); padding-top: 0.75rem; font-size: 0.75rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.35rem; }
        .advisory-metrics span { display: flex; justify-content: space-between; }
        .advisory-metrics strong { color: var(--text-main); }
        .table-section { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; overflow-x: auto; }
        .table-section h3 { font-size: 1rem; font-weight: 600; margin-bottom: 1.25rem; }
        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
        th, td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); }
        th { color: var(--text-muted); font-weight: 600; background-color: rgba(15,23,42,0.3); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
        tr:hover td { background-color: rgba(255,255,255,0.02); }
        .sub-header { font-weight: 600; color: var(--text-main); background-color: rgba(15,23,42,0.2); }
        .row-total { font-weight: 700; background-color: rgba(15,23,42,0.4); font-size: 0.9rem; }
        .col-proxmox { color: var(--text-main); font-weight: 500; }
        .col-vmware { color: var(--accent-red); }
        .col-cloud { color: var(--accent-purple); }
        .val-mono { font-family: var(--font-mono); font-size: 0.85rem; }
        footer { color: var(--text-muted); font-size: 0.75rem; border-top: 1px solid var(--border-color); background-color: var(--bg-sidebar); display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
        .footer-rights { font-weight: 500; }
        .footer-logo { font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 0.35rem; }
        .footer-logo-dot { width: 6px; height: 6px; background-color: var(--accent-blue); border-radius: 50%; }
        @media (max-width: 1024px) { .app-container { grid-template-columns: 1fr; } .visuals-section { grid-template-columns: 1fr; } .kpis-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px) { .kpis-grid { grid-template-columns: 1fr; } }
        @media print {
            body { background-color: #fff !important; color: #0f172a !important; }
            .no-print { display: none !important; }
            .app-container { display: block; }
            .dashboard-content { padding: 0; gap: 1.5cm; max-height: none; overflow: visible; }
            .kpi-card, .card-visual, .table-section { background-color: #f8fafc !important; border: 1px solid #cbd5e1 !important; box-shadow: none !important; break-inside: avoid; }
            .kpi-value, .col-vmware, .col-cloud { color: #0f172a !important; }
            th { background-color: #f1f5f9 !important; color: #475569 !important; }
            header { background: #fff !important; border-bottom: 2px solid #0f172a !important; }
            .logo-text h1 { -webkit-text-fill-color: initial !important; color: #0f172a !important; }
        }
    </style>
</head>
<body>
    <header>
        <div class="logo-container">
            <div class="logo-icon">G</div>
            <div class="logo-text">
                <h1>GSBLAB PLATEFORME DÉCISIONNELLE</h1>
                <p>Analyse Stratégique & Financière (TCO / ROI)</p>
            </div>
        </div>
        <div class="header-meta">
            <div class="badge-hds">Conforme HDS v2 & RGPD</div>
            <button class="btn-print no-print" onclick="window.print()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Exporter en PDF / Imprimer
            </button>
        </div>
    </header>
    <div class="app-container">
        <aside class="sidebar no-print">
            <div class="sidebar-section">
                <h3>Dimensionnement SI</h3>
                <div class="control-group">
                    <div class="control-label"><span>Utilisateurs / Laptops</span><span class="control-value" id="val-users">333</span></div>
                    <input type="range" id="input-users" min="100" max="500" value="333" step="1">
                    <div class="control-desc">Base d'utilisateurs Exchange Online et licences Office LTSC.</div>
                </div>
                <div class="control-group">
                    <div class="control-label"><span>Laboratoires (Spokes)</span><span class="control-value" id="val-sites">17</span></div>
                    <input type="range" id="input-sites" min="5" max="25" value="17" step="1">
                    <div class="control-desc">Sites distants équipés d'un pare-feu FortiGate et d'un lien WAN sécurisé.</div>
                </div>
                <div class="control-group">
                    <div class="control-label"><span>Serveurs Physiques HA</span><span class="control-value" id="val-servers">4</span></div>
                    <input type="range" id="input-servers" min="2" max="8" value="4" step="1">
                    <div class="control-desc">Hôtes (bi-CPU) du cluster HA du siège (2 existants + 2 achetés).</div>
                </div>
            </div>
            <div class="sidebar-section">
                <h3>Paramètres Financiers</h3>
                <div class="control-group">
                    <div class="control-label"><span>Licence VMware / cœur</span><span class="control-value" id="val-vmware-core">300 €</span></div>
                    <input type="range" id="input-vmware-core" min="150" max="500" value="300" step="10">
                    <div class="control-desc">Coût annuel estimé par cœur d'abonnement VMware vSphere.</div>
                </div>
                <div class="control-group">
                    <div class="control-label"><span>Hébergement Cloud HDS</span><span class="control-value" id="val-cloud-monthly">4 500 €</span></div>
                    <input type="range" id="input-cloud-monthly" min="2000" max="8000" value="4500" step="250">
                    <div class="control-desc">Coût mensuel estimé pour les VMs HDS (Azure/AWS).</div>
                </div>
                <div class="control-group">
                    <div class="control-label"><span>Inflation Abonnements</span><span class="control-value" id="val-inflation">5 %</span></div>
                    <input type="range" id="input-inflation" min="0" max="15" value="5" step="1">
                    <div class="control-desc">Augmentation annuelle des abonnements logiciels, Cloud et réseaux.</div>
                </div>
            </div>
        </aside>
        <main class="dashboard-content">
            <section class="kpis-grid">
                <div class="kpi-card proxmox">
                    <div class="kpi-title">TCO 5 ans - Cible Proxmox HA</div>
                    <div class="kpi-value val-mono" id="kpi-tco-proxmox">-- €</div>
                    <div class="kpi-footer"><span>Solution préconisée</span></div>
                </div>
                <div class="kpi-card vmware">
                    <div class="kpi-title">TCO 5 ans - VMware Broadcom</div>
                    <div class="kpi-value val-mono" id="kpi-tco-vmware">-- €</div>
                    <div class="kpi-footer" id="kpi-pct-vmware"><span>--% de surcoût</span></div>
                </div>
                <div class="kpi-card cloud">
                    <div class="kpi-title">TCO 5 ans - Cloud HDS Azure/AWS</div>
                    <div class="kpi-value val-mono" id="kpi-tco-cloud">-- €</div>
                    <div class="kpi-footer" id="kpi-pct-cloud"><span>--% de surcoût</span></div>
                </div>
                <div class="kpi-card savings">
                    <div class="kpi-title">Économies Cumulées Nettes</div>
                    <div class="kpi-value val-mono" id="kpi-savings">-- €</div>
                    <div class="kpi-footer"><span style="color:var(--accent-green);">Par rapport au statu quo VMware</span></div>
                </div>
            </section>
            <section class="visuals-section">
                <div class="card-visual">
                    <h3>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        Évolution Cumulative des Coûts sur 5 ans (TCO Cumulé)
                    </h3>
                    <div class="chart-container"><canvas id="tcoChart"></canvas></div>
                </div>
                <div class="card-visual">
                    <h3>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        Avis de l'Architecte & RSSI
                    </h3>
                    <div class="advisory-box">
                        <div class="advisory-status status-ok" id="budget-status">✅ Budget Initial de démarrage Conforme</div>
                        <div class="advisory-text" id="advisory-comment"></div>
                        <div class="advisory-metrics">
                            <span>ROI Proxmox vs VMware : <strong id="adv-roi-vmware">Immédiat</strong></span>
                            <span>CapEx de départ Cible : <strong id="adv-capex-target">-- € HT</strong></span>
                            <span>OpEx récurrent (An 1) : <strong id="adv-opex-target">-- € HT / an</strong></span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="table-section">
                <h3>Répartition Détaillée des Coûts (HT)</h3>
                <table>
                    <thead>
                        <tr><th>Rubriques Financières</th><th>Cible Proxmox HA</th><th>VMware Broadcom</th><th>Cloud Public HDS</th></tr>
                    </thead>
                    <tbody>
                        <tr class="sub-header"><td colspan="4">Dépenses d'Investissement (CapEx)</td></tr>
                        <tr><td>Équipements Physiques (Serveurs cluster, Stockage, Réseau local)</td><td class="val-mono col-proxmox" id="tab-capex-hw-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-capex-hw-vmware">-- €</td><td class="val-mono col-cloud" id="tab-capex-hw-cloud">-- €</td></tr>
                        <tr><td>Sécurité & Périphériques (Firewalls siège & spokes, Laptops)</td><td class="val-mono col-proxmox" id="tab-capex-sec-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-capex-sec-vmware">-- €</td><td class="val-mono col-cloud" id="tab-capex-sec-cloud">-- €</td></tr>
                        <tr><td>Licences Logicielles Bureautique & Systèmes (Office LTSC)</td><td class="val-mono col-proxmox" id="tab-capex-sw-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-capex-sw-vmware">-- €</td><td class="val-mono col-cloud" id="tab-capex-sw-cloud">-- €</td></tr>
                        <tr><td>Prestations ESN d'Intégration & Conduite du changement</td><td class="val-mono col-proxmox" id="tab-capex-srv-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-capex-srv-vmware">-- €</td><td class="val-mono col-cloud" id="tab-capex-srv-cloud">-- €</td></tr>
                        <tr class="row-total"><td>TOTAL CAPEX INITIAL</td><td class="val-mono col-proxmox" id="tab-capex-total-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-capex-total-vmware">-- €</td><td class="val-mono col-cloud" id="tab-capex-total-cloud">-- €</td></tr>
                        <tr class="sub-header"><td colspan="4">Abonnements et Dépenses Opérationnelles Annuelles (OpEx - Année 1)</td></tr>
                        <tr><td>Souscriptions & Support Hyperviseurs</td><td class="val-mono col-proxmox" id="tab-opex-hyp-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-opex-hyp-vmware">-- €</td><td class="val-mono col-cloud" id="tab-opex-hyp-cloud">-- €</td></tr>
                        <tr><td>Hébergement Cloud Managé (VMs, Stockage, Sauvegardes HDS)</td><td class="val-mono col-proxmox" id="tab-opex-cloud-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-opex-cloud-vmware">-- €</td><td class="val-mono col-cloud" id="tab-opex-cloud-cloud">-- €</td></tr>
                        <tr><td>Messagerie & Outils Collaboratifs (M365 Exchange Online)</td><td class="val-mono col-proxmox" id="tab-opex-saas-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-opex-saas-vmware">-- €</td><td class="val-mono col-cloud" id="tab-opex-saas-cloud">-- €</td></tr>
                        <tr><td>Maintenance Réseau (FortiCare UTM) & Abonnements Liens WAN</td><td class="val-mono col-proxmox" id="tab-opex-net-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-opex-net-vmware">-- €</td><td class="val-mono col-cloud" id="tab-opex-net-cloud">-- €</td></tr>
                        <tr class="row-total"><td>TOTAL OPEX RÉCURRENT (AN 1)</td><td class="val-mono col-proxmox" id="tab-opex-total-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-opex-total-vmware">-- €</td><td class="val-mono col-cloud" id="tab-opex-total-cloud">-- €</td></tr>
                        <tr class="sub-header"><td colspan="4">Coût Total de Possession (TCO Cumulé)</td></tr>
                        <tr><td>TCO Cumulé à 1 an</td><td class="val-mono col-proxmox" id="tab-tco-1y-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-tco-1y-vmware">-- €</td><td class="val-mono col-cloud" id="tab-tco-1y-cloud">-- €</td></tr>
                        <tr><td>TCO Cumulé à 3 ans</td><td class="val-mono col-proxmox" id="tab-tco-3y-proxmox">-- €</td><td class="val-mono col-vmware" id="tab-tco-3y-vmware">-- €</td><td class="val-mono col-cloud" id="tab-tco-3y-cloud">-- €</td></tr>
                        <tr class="row-total" style="background-color:rgba(16,185,129,0.15)"><td>TCO Cumulé à 5 ans</td><td class="val-mono col-proxmox" id="tab-tco-5y-proxmox" style="color:var(--accent-green)">-- €</td><td class="val-mono col-vmware" id="tab-tco-5y-vmware">-- €</td><td class="val-mono col-cloud" id="tab-tco-5y-cloud">-- €</td></tr>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
    <footer>
        <div class="footer-rights">Projet Fin d'Année Mastère 2IC 2027 - GSBLAB ESN Consulting</div>
        <div class="footer-logo"><span>GSBLAB</span><div class="footer-logo-dot"></div><span>Architecture Cible</span></div>
    </footer>
    <script>
        let tcoChartInstance = null;
        const fmt = (v) => new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v);
        const updateCalculations = () => {
            const users = +document.getElementById('input-users').value;
            const sites = +document.getElementById('input-sites').value;
            const servers = +document.getElementById('input-servers').value;
            const vmCP = +document.getElementById('input-vmware-core').value;
            const cloudM = +document.getElementById('input-cloud-monthly').value;
            const inf = +document.getElementById('input-inflation').value / 100;
            document.getElementById('val-users').innerText = users;
            document.getElementById('val-sites').innerText = sites;
            document.getElementById('val-servers').innerText = servers;
            document.getElementById('val-vmware-core').innerText = vmCP + " €";
            document.getElementById('val-cloud-monthly').innerText = fmt(cloudM);
            document.getElementById('val-inflation').innerText = Math.round(inf*100) + " %";
            const hw = (2*20000)+(2*2500)+8000+3400;
            const sw = users*260;
            const esn = 65000;
            const secP = (2*4000)+(sites*800);
            const capP = hw+secP+sw+esn;
            const opHypP = servers*2*450;
            const opM365 = users*4.5*12;
            const opNet = (sites*250)+(sites*80*12);
            const opP = opHypP+opM365+opNet+1500;
            const capV = capP;
            const opHypV = servers*2*16*vmCP;
            const opV = opHypV+opM365+opNet+1500;
            const capC = (2*2500)+secP+sw+(esn+20000);
            const opCloud = cloudM*12+8000;
            const opNetC = opNet+(sites*25*12);
            const opC = opCloud+opM365+opNetC;
            let tP=[capP+opP], tV=[capV+opV], tC=[capC+opC];
            for(let i=1;i<5;i++){const m=Math.pow(1+inf,i);tP.push(tP[i-1]+opP*m);tV.push(tV[i-1]+opV*m);tC.push(tC[i-1]+opC*m);}
            const fP=tP[4],fV=tV[4],fC=tC[4],sav=fV-fP;
            document.getElementById('kpi-tco-proxmox').innerText=fmt(fP);
            document.getElementById('kpi-tco-vmware').innerText=fmt(fV);
            document.getElementById('kpi-tco-cloud').innerText=fmt(fC);
            document.getElementById('kpi-savings').innerText=fmt(sav);
            document.getElementById('kpi-pct-vmware').innerHTML=`<span style="color:var(--accent-red);font-weight:600;">+${((fV-fP)/fP*100).toFixed(1)}% de surcoût</span>`;
            document.getElementById('kpi-pct-cloud').innerHTML=`<span style="color:var(--accent-purple);font-weight:600;">+${((fC-fP)/fP*100).toFixed(1)}% de surcoût</span>`;
            [[`tab-capex-hw`,hw,hw,2*2500],[`tab-capex-sec`,secP,secP,secP],[`tab-capex-sw`,sw,sw,sw],[`tab-capex-srv`,esn,esn,esn+20000],[`tab-capex-total`,capP,capV,capC],[`tab-opex-hyp`,opHypP,opHypV,0],[`tab-opex-cloud`,0,0,opCloud],[`tab-opex-saas`,opM365,opM365,opM365],[`tab-opex-net`,opNet,opNet,opNetC],[`tab-opex-total`,opP,opV,opC],[`tab-tco-1y`,tP[0],tV[0],tC[0]],[`tab-tco-3y`,tP[2],tV[2],tC[2]],[`tab-tco-5y`,fP,fV,fC]].forEach(([id,p,v,c])=>{document.getElementById(id+'-proxmox').innerText=fmt(p);document.getElementById(id+'-vmware').innerText=fmt(v);document.getElementById(id+'-cloud').innerText=fmt(c);});
            document.getElementById('adv-capex-target').innerText=fmt(capP)+" HT";
            document.getElementById('adv-opex-target').innerText=fmt(opP)+" HT";
            const bs=document.getElementById('budget-status');
            if(capP>450000){bs.className="advisory-status status-warning";bs.innerText="⚠️ DÉPASSEMENT BUDGET INITIAL (Limite DAF 450k€)";document.getElementById('advisory-comment').innerHTML=`<strong>Alerte PMO :</strong> CapEx à <strong>${fmt(capP)} HT</strong>, dépasse l'enveloppe de 450 000 € HT.`;}
            else{bs.className="advisory-status status-ok";bs.innerText="✅ Enveloppe Initiale Validée (< 450k€ HT)";document.getElementById('advisory-comment').innerHTML=`<strong>Note de l'Architecte :</strong> La migration sur <strong>Proxmox HA</strong> sur site permet d'économiser <strong>${fmt(sav)}</strong> sur 5 ans vs Broadcom — levier financier majeur pour financer la mise à niveau HDS des ${sites} firewalls.`;}
            if(tcoChartInstance){tcoChartInstance.data.datasets[0].data=tP;tcoChartInstance.data.datasets[1].data=tV;tcoChartInstance.data.datasets[2].data=tC;tcoChartInstance.update();}
        };
        const initChart = () => {
            tcoChartInstance = new Chart(document.getElementById('tcoChart').getContext('2d'),{type:'line',data:{labels:['Année 1','Année 2','Année 3','Année 4','Année 5'],datasets:[{label:'Cible Proxmox VE HA',data:[0,0,0,0,0],borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,0.05)',borderWidth:3,fill:true,tension:0.15},{label:'Option VMware Broadcom',data:[0,0,0,0,0],borderColor:'#ef4444',borderDash:[5,5],borderWidth:2,tension:0.15},{label:'Alternative Public Cloud HDS',data:[0,0,0,0,0],borderColor:'#8b5cf6',borderWidth:2,tension:0.15}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{color:'#94a3b8',font:{family:'Inter',size:11},usePointStyle:true,padding:15}},tooltip:{backgroundColor:'#1e293b',titleColor:'#f8fafc',bodyColor:'#f1f5f9',borderColor:'rgba(255,255,255,0.1)',borderWidth:1,callbacks:{label:(ctx)=>`${ctx.dataset.label}: ${fmt(ctx.parsed.y)}`}}},scales:{y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'#94a3b8',font:{family:'Inter',size:10},callback:(v)=>v/1000+' k€'}},x:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'#94a3b8',font:{family:'Inter',size:11}}}}}});
        };
        document.addEventListener('DOMContentLoaded',()=>{initChart();updateCalculations();['input-users','input-sites','input-servers','input-vmware-core','input-cloud-monthly','input-inflation'].forEach(id=>document.getElementById(id).addEventListener('input',updateCalculations));});
    </script>
</body>
</html>
HTMLEOF
    success "Page HTML GSBLAB écrite dans /opt/gsblab/index.html"
}

# ─── Manifests Kubernetes ─────────────────────────────────
create_manifests() {
    step "Création des manifests Kubernetes"
    mkdir -p /opt/gsblab/k8s

    cat > /opt/gsblab/k8s/deployment.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-deployment
  namespace: default
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: gsblab-web:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "32Mi"
            cpu: "25m"
          limits:
            memory: "64Mi"
            cpu: "100m"
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 3
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
EOF

    cat > /opt/gsblab/k8s/service.yaml << 'EOF'
apiVersion: v1
kind: Service
metadata:
  name: web-service
  namespace: default
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30080
EOF

    success "Manifests créés dans /opt/gsblab/k8s/"
}

# ─── Déploiement ──────────────────────────────────────────
deploy() {
    step "Déploiement"
    info "Application des manifests..."
    kubectl apply -f /opt/gsblab/k8s/deployment.yaml
    kubectl apply -f /opt/gsblab/k8s/service.yaml
    info "Attente que les 3 pods soient prêts..."
    kubectl rollout status deployment/web-deployment --timeout=180s
    success "Déploiement effectué avec succès"
}

# ─── Nginx reverse proxy ──────────────────────────────────
setup_nginx() {
    step "Nginx (reverse proxy)"
    apt-get install -y -qq nginx

    # Désactiver Apache s'il est présent (évite le conflit sur le port 80)
    systemctl stop apache2 2>/dev/null || true
    systemctl disable apache2 2>/dev/null || true

    cat > /etc/nginx/sites-available/gsblab << 'EOF'
server {
    listen 80 default_server;
    listen 30080 default_server;
    server_name _;
    location / {
        proxy_pass         http://192.168.49.2:30080;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 30s;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
}
EOF

    ln -sf /etc/nginx/sites-available/gsblab /etc/nginx/sites-enabled/gsblab
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl enable nginx --now
    systemctl restart nginx
    success "Nginx actif sur ports 80 et 30080"
}

# ─── Service systemd (persistance au reboot) ──────────────
setup_systemd_service() {
    step "Service systemd (démarrage automatique + sync Git)"

    # ── Script de démarrage initial ──────────────────────────
    cat > /usr/local/bin/gsblab-start.sh << SCRIPT
#!/bin/bash
export HOME=/root
export KUBECONFIG=/root/.kube/config
REPO_URL="${REPO_URL}"

log() { logger -t gsblab "\$1"; echo "\$1"; }

# Démarrer Minikube si arrêté
if ! minikube status 2>/dev/null | grep -q "Running"; then
    log "Démarrage de Minikube..."
    minikube start --driver=docker --force --cpus=2 --memory=2048 2>&1 | logger -t gsblab
fi

# Attendre que kubectl soit prêt
until kubectl get nodes 2>/dev/null | grep -q "Ready"; do sleep 5; done

# Récupérer le code source
git config --global --add safe.directory /opt/gsblab/app 2>/dev/null || true
eval \$(minikube docker-env)
if [[ -n "\$REPO_URL" ]]; then
    if [[ -d /opt/gsblab/app/.git ]]; then
        git -C /opt/gsblab/app pull --ff-only 2>&1 | logger -t gsblab
    else
        git clone "\$REPO_URL" /opt/gsblab/app 2>&1 | logger -t gsblab
    fi
else
    ZIP=\$(find /root/Desktop/Partage -name "*.zip" 2>/dev/null | head -1)
    if [[ -n "\$ZIP" ]]; then
        rm -rf /opt/gsblab/app && mkdir -p /opt/gsblab/app
        unzip -q -o "\$ZIP" -d /opt/gsblab/app/
        SUBDIR=\$(find /opt/gsblab/app -mindepth 1 -maxdepth 1 -type d | head -1)
        [[ -n "\$SUBDIR" ]] && mv "\$SUBDIR"/* /opt/gsblab/app/ && rmdir "\$SUBDIR"
    fi
fi

[[ ! -f /opt/gsblab/app/Dockerfile ]] && cat > /opt/gsblab/app/Dockerfile << 'DEOF'
FROM nginx:alpine
COPY . /usr/share/nginx/html/
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/lancer_portail.ps1 /usr/share/nginx/html/lancer_portail_windows.bat
DEOF

docker build -t gsblab-web:latest /opt/gsblab/app/ 2>&1 | logger -t gsblab
kubectl apply -f /opt/gsblab/k8s/deployment.yaml 2>&1 | logger -t gsblab
kubectl apply -f /opt/gsblab/k8s/service.yaml    2>&1 | logger -t gsblab
kubectl rollout status deployment/web-deployment --timeout=180s 2>&1 | logger -t gsblab
systemctl is-active nginx || systemctl start nginx
log "GSBLAB démarré."
SCRIPT
    chmod +x /usr/local/bin/gsblab-start.sh

    # ── Script de sync Git (lancé toutes les 2 min) ──────────
    cat > /usr/local/bin/gsblab-sync.sh << SYNCSCRIPT
#!/bin/bash
export HOME=/root
export KUBECONFIG=/root/.kube/config
REPO_URL="${REPO_URL}"

[[ -z "\$REPO_URL" ]] && exit 0
[[ ! -d /opt/gsblab/app/.git ]] && exit 0

git config --global --add safe.directory /opt/gsblab/app 2>/dev/null || true
BEFORE=\$(git -C /opt/gsblab/app rev-parse HEAD 2>/dev/null)
git -C /opt/gsblab/app pull --ff-only --quiet 2>&1 | logger -t gsblab-sync
AFTER=\$(git -C /opt/gsblab/app rev-parse HEAD 2>/dev/null)

if [[ "\$BEFORE" != "\$AFTER" ]]; then
    logger -t gsblab-sync "Nouveau commit détecté (\${AFTER:0:7}), rebuild en cours..."
    eval \$(minikube docker-env)
    docker build -t gsblab-web:latest /opt/gsblab/app/ 2>&1 | logger -t gsblab-sync
    kubectl rollout restart deployment/web-deployment 2>&1 | logger -t gsblab-sync
    logger -t gsblab-sync "Redéploiement terminé."
fi
SYNCSCRIPT
    chmod +x /usr/local/bin/gsblab-sync.sh

    # ── Unité systemd principale ─────────────────────────────
    cat > /etc/systemd/system/gsblab.service << 'UNIT'
[Unit]
Description=GSBLAB — Kubernetes Web Cluster (3 répliques)
After=network-online.target docker.service
Wants=network-online.target
Requires=docker.service

[Service]
Type=simple
ExecStart=/usr/local/bin/gsblab-start.sh
Restart=on-failure
RestartSec=15
User=root
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
UNIT

    # ── Timer systemd : sync toutes les 2 minutes ────────────
    cat > /etc/systemd/system/gsblab-sync.service << 'UNIT'
[Unit]
Description=GSBLAB — Sync Git & redéploiement automatique
After=gsblab.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/gsblab-sync.sh
User=root
UNIT

    cat > /etc/systemd/system/gsblab-sync.timer << 'UNIT'
[Unit]
Description=GSBLAB — Vérifie les mises à jour Git toutes les 2 minutes

[Timer]
OnBootSec=3min
OnUnitActiveSec=2min
Unit=gsblab-sync.service

[Install]
WantedBy=timers.target
UNIT

    systemctl daemon-reload
    systemctl enable gsblab.service
    systemctl enable gsblab-sync.timer
    [[ -n "$REPO_URL" ]] && systemctl start gsblab-sync.timer
    success "Service gsblab activé (reboot + sync Git auto toutes les 2 min)"
}

# ─── Résumé final ─────────────────────────────────────────
show_summary() {
    HOST_IP=$(ip route get 8.8.8.8 2>/dev/null | grep -oP 'src \K\S+' || hostname -I | awk '{print $1}')
    echo ""
    echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}${BOLD}║           DÉPLOIEMENT RÉUSSI  ✓              ║${NC}"
    echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BOLD}  Pods actifs :${NC}"
    kubectl get pods -l app=web -o wide 2>/dev/null | sed 's/^/    /'
    echo ""
    echo -e "${BOLD}  Service :${NC}"
    kubectl get service web-service 2>/dev/null | sed 's/^/    /'
    echo ""
    echo -e "${CYAN}${BOLD}  ► Accès web : http://${HOST_IP}${NC}         (port 80)"
    echo -e "${CYAN}${BOLD}  ► Accès web : http://${HOST_IP}:30080${NC}   (port alternatif)"
    echo ""
    echo -e "${YELLOW}  Commandes utiles :${NC}"
    echo "    kubectl get pods -w                                   # surveillance temps réel"
    echo "    kubectl delete pod <nom>                              # tuer un pod (redémarre seul)"
    echo "    kubectl scale deployment web-deployment --replicas=5  # scaler"
    echo "    systemctl status gsblab nginx gsblab-sync.timer       # état des services"
    echo "    systemctl restart gsblab                              # redémarrer tout"
    echo "    journalctl -u gsblab -f                               # logs démarrage"
    echo "    journalctl -u gsblab-sync -f                          # logs sync Git"
    echo "    systemctl list-timers gsblab-sync.timer               # prochain sync"
    echo ""
    if [[ -n "$REPO_URL" ]]; then
        echo -e "${GREEN}  Workflow de mise à jour :${NC}"
        echo "    1. Modifier le code sur n'importe quelle VM"
        echo "    2. git add . && git commit -m 'ma modif' && git push"
        echo "    3. Toutes les VMs se mettent à jour en < 2 minutes automatiquement"
        echo ""
    fi
}

# ─── Point d'entrée ───────────────────────────────────────
main() {
    banner
    [[ "$EUID" -ne 0 ]] && error "Lance le script en root : sudo bash deploy.sh"
    check_os
    install_docker
    install_kubectl
    install_minikube
    start_minikube
    fetch_source
    build_docker_image
    create_manifests
    deploy
    setup_nginx
    setup_systemd_service
    show_summary
}

main
