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
 */
export const parseJSONBudget = (jsonText) => {
  try {
    const parsed = JSON.parse(jsonText);
    
    // Simple validation et construction de l'objet
    const result = {};
    if (typeof parsed.usersCount === 'number') result.usersCount = parsed.usersCount;
    if (typeof parsed.sitesCount === 'number') result.sitesCount = parsed.sitesCount;
    if (typeof parsed.serversCount === 'number') result.serversCount = parsed.serversCount;
    if (typeof parsed.vmwareCorePrice === 'number') result.vmwareCorePrice = parsed.vmwareCorePrice;
    if (typeof parsed.cloudMonthlyCost === 'number') result.cloudMonthlyCost = parsed.cloudMonthlyCost;
    if (typeof parsed.inflationRate === 'number') result.inflationRate = parsed.inflationRate;

    if (Object.keys(result).length === 0) {
      return { errorMessage: "Aucun paramètre valide détecté dans le fichier JSON. Exemple : { \"usersCount\": 300 }" };
    }

    return { data: result };
  } catch (error) {
    return { errorMessage: "Le format JSON est invalide. " + error };
  }
};
