fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(response => response.text())
  .then(csv => {

    const lignes = csv.trim().split("\n").slice(1);
    const accordion = document.querySelector(".accordion");
    const sections = {};

    lignes.forEach(ligne => {

      // Nettoyage
      ligne = ligne.replace(/\r/g, "");

      // Découpe contrôlée (7 colonnes max)
      const cols = ligne.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

      if (cols.length < 7) return;

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

      sections[technique].push({ titre, annee, technique, intention, image });
    });

    // Création du HTML
    Object.keys(sections).forEach(technique => {

      const button = document.createElement("button");
      button.className = "accordion-button";
      button.textContent = technique;

      const content = document.createElement("div");
      content.className = "accordion-content";

      sections[technique].forEach(o => {
        content.innerHTML += `
          <div class="oeuvre">
            <img src="${o.image}" alt="${o.titre}">
            <h3>${o.titre}</h3>
            <p><strong>Date :</strong> ${o.annee}</p>
            <p><strong>Technique :</strong> ${o.technique}</p>
            <p><strong>Intention artistique :</strong> ${o.intention}</p>
          </div>
        `;
      });

      accordion.appendChild(button);
      accordion.appendChild(content);
    });

  })
  .catch(err => console.error("Erreur CSV :", err));
