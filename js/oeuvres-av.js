fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(response => response.text())
  .then(csv => {

    const lignes = csv.trim().split("\n").slice(1);
    const accordion = document.querySelector(".accordion");
    const sections = {};

    lignes.forEach(ligne => {
      ligne = ligne.replace("\r", "");

      const cols = ligne.split(",");

      if (cols.length < 7) return;

      const titre = cols[1];
      const categorie = cols[2];
      const annee = cols[3];
      const technique = cols[4];
      const intention = cols[5];
      let image = cols[6];

      if (categorie !== "Arts visuels") return;

      // 🔧 Transformation du lien Google Drive
      const match = image.match(/\/d\/([^\/]+)/);
      if (match) {
        image = "https://drive.google.com/uc?id=" + match[1];
      }

      if (!sections[technique]) {
        sections[technique] = [];
      }

      sections[technique].push({
        titre,
        annee,
        intention,
        image
      });
    });

    // Génération HTML
    for (const technique in sections) {

      const button = document.createElement("button");
      button.className = "accordion-button";
      button.textContent = technique;

      const content = document.createElement("div");
      content.className = "accordion-content";

      sections[technique].forEach(o => {
        const div = document.createElement("div");
        div.className = "oeuvre";
        div.innerHTML = `
          <img src="${o.image}" alt="${o.titre}">
          <h3>${o.titre}</h3>
          <p><strong>Date :</strong> ${o.annee}</p>
          <p><strong>Intention artistique :</strong> ${o.intention}</p>
        `;
        content.appendChild(div);
      });

      accordion.appendChild(button);
      accordion.appendChild(content);
    }
  })
  .catch(err => console.error("Erreur CSV :", err));
