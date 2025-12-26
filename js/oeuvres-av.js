fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(response => response.text())
  .then(csv => {
    console.log("CSV chargé");

    const lignes = csv.trim().split("\n").slice(1);
    console.log("Lignes :", lignes);

    const accordion = document.querySelector(".accordion");
    const sections = {};

    lignes.forEach(ligne => {
      const cols = ligne.split(",");

      const titre = cols[1];
      const categorie = cols[2];
      const annee = cols[3];
      const technique = cols[4];
      const intention = cols[5];
      const image = cols[6];

      if (categorie !== "Arts visuels") return;

      if (!sections[technique]) {
        sections[technique] = [];
      }

      sections[technique].push({
        titre,
        annee,
        technique,
        intention,
        image
      });
    });

    console.log("Sections :", sections);

    for (const technique in sections) {
      const bouton = document.createElement("button");
      bouton.className = "accordion-button";
      bouton.textContent = technique;

      const contenu = document.createElement("div");
      contenu.className = "accordion-content";

      sections[technique].forEach(o => {
        const div = document.createElement("div");
        div.className = "oeuvre";

        div.innerHTML = `
          <img src="${o.image}" alt="${o.titre}">
          <h3>${o.titre}</h3>
          <p><strong>Date :</strong> ${o.annee}</p>
          <p><strong>Technique :</strong> ${o.technique}</p>
          <p><strong>Intention :</strong> ${o.intention}</p>
        `;

        contenu.appendChild(div);
      });

      accordion.appendChild(bouton);
      accordion.appendChild(contenu);
    }
  })
  .catch(error => {
    console.error("Erreur :", error);
  });
