#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  GSBLAB — Fusion des 3 branches dev dans main
#  Lance ce script UNE FOIS quand Romain, Léo et Jérôme ont
#  tous pushé leurs modifications sur leur branche respective.
#  Usage : bash merge.sh
# ─────────────────────────────────────────────────────────────

set -e
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${CYAN}[•]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo -e "\n${CYAN}${BOLD}══ Fusion des branches dev → main ══${NC}\n"

info "Passage sur main et récupération..."
git checkout main
git pull origin main

BRANCHES=("dev-romain" "dev-leo" "dev-jerome")

for branch in "${BRANCHES[@]}"; do
    info "Fusion de $branch..."
    git fetch origin "$branch"
    git merge "origin/$branch" --no-edit || {
        err "Conflit sur $branch — résous les conflits puis relance : git merge --continue && bash merge.sh"
    }
    ok "$branch fusionné"
done

info "Push du résultat vers GitHub..."
git push origin main

echo ""
ok "Les 3 branches sont fusionnées dans main."
echo -e "   Les VMs se mettent à jour automatiquement dans ${CYAN}< 2 minutes${NC}."
echo ""
echo -e "   Branches disponibles pour la prochaine session :"
echo -e "   ${CYAN}git checkout dev-romain${NC}  /  ${CYAN}dev-leo${NC}  /  ${CYAN}dev-jerome${NC}"
