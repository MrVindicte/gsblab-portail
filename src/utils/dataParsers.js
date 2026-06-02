/**
 * Parseur simple pour le CSV d'import d'utilisateurs
 */
export const parseCSVUsers = (csvText) => {
  try {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) {
      return { usersCount: 0, errorMessage: "Le fichier CSV est vide ou ne contient pas d'en-tête." };
    }
    
    // Déduction du nombre de lignes (hors en-tête)
    const count = lines.length - 1;
    return { usersCount: count };
  } catch (error) {
    return { usersCount: 0, errorMessage: "Échec de lecture du fichier CSV. " + error };
  }
};

/**
 * Parseur pour le fichier JSON d'import de budget devis
 * Gère deux formats :
 *   1. Format riche GSBLAB : { "parametres": { "utilisateurs_laptops": { "valeur": 321 }, ... }, "scenarios": [...] }
 *   2. Format plat simple  : { "usersCount": 300, "vmwareCorePrice": 300, ... }
 */
export const parseJSONBudget = (jsonText) => {
  try {
    const parsed = JSON.parse(jsonText);
    const result = {};

    // Format riche : section "parametres" avec structure { libelle, valeur, unite, min, max, pas }
    if (parsed.parametres && typeof parsed.parametres === 'object') {
      const p = parsed.parametres;
      if (p.utilisateurs_laptops?.valeur !== undefined)  result.usersCount      = p.utilisateurs_laptops.valeur;
      if (p.laboratoires_spokes?.valeur  !== undefined)  result.sitesCount      = p.laboratoires_spokes.valeur;
      if (p.serveurs_physiques_ha?.valeur !== undefined) result.serversCount    = p.serveurs_physiques_ha.valeur;
      if (p.abonnement_vmware_coeur?.valeur !== undefined) result.vmwareCorePrice = p.abonnement_vmware_coeur.valeur;
      if (p.hebergement_cloud_hds?.valeur !== undefined) result.cloudMonthlyCost = p.hebergement_cloud_hds.valeur;
      if (p.inflation_abonnements?.valeur !== undefined) result.inflationRate   = p.inflation_abonnements.valeur / 100;
    }

    // Format plat simple (priorité si les deux sont présents)
    if (typeof parsed.usersCount      === 'number') result.usersCount      = parsed.usersCount;
    if (typeof parsed.sitesCount      === 'number') result.sitesCount      = parsed.sitesCount;
    if (typeof parsed.serversCount    === 'number') result.serversCount    = parsed.serversCount;
    if (typeof parsed.vmwareCorePrice === 'number') result.vmwareCorePrice = parsed.vmwareCorePrice;
    if (typeof parsed.cloudMonthlyCost === 'number') result.cloudMonthlyCost = parsed.cloudMonthlyCost;
    if (typeof parsed.inflationRate   === 'number') result.inflationRate   = parsed.inflationRate;

    if (Object.keys(result).length === 0) {
      return { errorMessage: "Aucun paramètre valide détecté dans le fichier JSON. Exemple : { \"usersCount\": 300 }" };
    }

    return { data: result };
  } catch (error) {
    return { errorMessage: "Le format JSON est invalide. " + error };
  }
};
