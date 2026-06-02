/**
 * Parseur simple pour le CSV d'import d'utilisateurs
 */
export const parseCSVUsers = (csvText) => {
  try {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) {
      return { usersCount: 0, errorMessage: "Le fichier CSV est vide ou ne contient pas d'en-tête." };
    }
    const count = lines.length - 1;
    return { usersCount: count };
  } catch (error) {
    return { usersCount: 0, errorMessage: "Échec de lecture du fichier CSV. " + error };
  }
};

/**
 * Parseur pour le fichier JSON d'import de budget
 * Gère trois formats :
 *   1. Format prévisionnel pluriannuel (trajectoire_budgetaire[])
 *   2. Format riche GSBLAB (parametres.{clé}.valeur + scenarios)
 *   3. Format plat simple { usersCount, sitesCount, ... }
 */
export const parseJSONBudget = (jsonText) => {
  try {
    const parsed = JSON.parse(jsonText);
    const result = {};

    // ── Format prévisionnel pluriannuel ──────────────────────────────────────
    if (Array.isArray(parsed.trajectoire_budgetaire)) {
      const anneesCible = parsed.trajectoire_budgetaire.filter(a => !a.hors_enveloppe_migration);
      const cible = anneesCible[anneesCible.length - 1];
      const growth = parsed.parametres_croissance || {};
      const synthese = parsed.synthese?.projet_migration_2026_2030 || {};

      if (cible) {
        if (cible.effectifs !== undefined) result.usersCount = cible.effectifs;
        if (cible.nb_sites  !== undefined) result.sitesCount = cible.nb_sites;
      }
      if (growth.inflation_abonnements_pct !== undefined)
        result.inflationRate = growth.inflation_abonnements_pct / 100;

      result._label   = parsed.meta?.document || 'Budget prévisionnel';
      result._horizon = parsed.meta?.horizon  || '';
      result._totalHT = synthese.total_projet_ht;
      result._plafond = synthese.budget_plafond_ht || parsed.meta?.budget_plafond_ht;
      result._reserve = synthese.reserve_disponible_ht;
      result._isPrevisionnel = true;
    }

    // ── Format riche GSBLAB (parametres.{clé}.valeur) ────────────────────────
    if (parsed.parametres && typeof parsed.parametres === 'object') {
      const p = parsed.parametres;
      if (p.utilisateurs_laptops?.valeur  !== undefined) result.usersCount      = p.utilisateurs_laptops.valeur;
      if (p.laboratoires_spokes?.valeur   !== undefined) result.sitesCount      = p.laboratoires_spokes.valeur;
      if (p.serveurs_physiques_ha?.valeur !== undefined) result.serversCount    = p.serveurs_physiques_ha.valeur;
      if (p.abonnement_vmware_coeur?.valeur !== undefined) result.vmwareCorePrice = p.abonnement_vmware_coeur.valeur;
      if (p.hebergement_cloud_hds?.valeur !== undefined) result.cloudMonthlyCost = p.hebergement_cloud_hds.valeur;
      if (p.inflation_abonnements?.valeur !== undefined) result.inflationRate   = p.inflation_abonnements.valeur / 100;
    }

    // ── Format plat simple ────────────────────────────────────────────────────
    if (typeof parsed.usersCount       === 'number') result.usersCount      = parsed.usersCount;
    if (typeof parsed.sitesCount       === 'number') result.sitesCount      = parsed.sitesCount;
    if (typeof parsed.serversCount     === 'number') result.serversCount    = parsed.serversCount;
    if (typeof parsed.vmwareCorePrice  === 'number') result.vmwareCorePrice = parsed.vmwareCorePrice;
    if (typeof parsed.cloudMonthlyCost === 'number') result.cloudMonthlyCost = parsed.cloudMonthlyCost;
    if (typeof parsed.inflationRate    === 'number') result.inflationRate   = parsed.inflationRate;

    const params = ['usersCount','sitesCount','serversCount','vmwareCorePrice','cloudMonthlyCost','inflationRate'];
    if (!params.some(k => result[k] !== undefined)) {
      return { errorMessage: "Aucun paramètre valide détecté dans le fichier JSON. Exemple : { \"usersCount\": 300 }" };
    }

    return { data: result };
  } catch (error) {
    return { errorMessage: "Le format JSON est invalide. " + error };
  }
};
