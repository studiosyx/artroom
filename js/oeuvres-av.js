fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(response => response.text())
  .then(text => {
    console.log("CSV BRUT 👇");
    console.log(text);

    const lignes = text.split("\n");
    console.log("LIGNES 👇");
    console.log(lignes);

    const premiereLigne = lignes[1];
    console.log("LIGNE 1 👇");
    console.log(premiereLigne);

    const colonnes = premiereLigne.split(",");
    console.log("COLONNES 👇");
    console.log(colonnes);
  });
