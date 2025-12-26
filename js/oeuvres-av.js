const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv";

fetch(url)
  .then(response => response.text())
  .then(csv => {

    console.log("CSV brut :", csv);

    const lignes = csv.split("\n");
    console.log("Nombre de lignes :", lignes.length);

    const container = document.querySelector(".accordion");
    console.log("Accordion trouvé ?", container);

    const sections = {};

    // On saute la première ligne (en-têtes)
    lignes.slice(1).forEach((ligne, index) => {

      console.log(`Ligne ${index + 1} :`, ligne);

      // ⚠️ split simple MAIS avec nettoyage
      const cols = ligne.split(",");

      if (cols.length < 7) {
        console.warn("Ligne ignorée (pas assez de colonnes)");
        return;
      }

      const titre = cols[1]?.trim();
      const categorie = cols[2]?.trim();
      const annee = cols[3]?.trim();
      const technique = cols[4]?.trim();
      const intention = cols[5]?.trim();
      const image = cols[6]?.trim();

      console.log({ titre, categorie, technique });

      if (categorie !== "Arts visuels") return;

      if (!sections[technique]) {
        sections[technique] = [];
      }

      sections[technique].push({ titre, annee, intention, imag
