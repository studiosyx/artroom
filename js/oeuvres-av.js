fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(res => res.text())
  .then(csv => {

    const lignes = csv
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .slice(1); // on enlève l’en-tête

    const accordion = document.querySelector(".accordion");
    const sections = {};

    lignes.forEach(ligne => {

      // Nettoyage des retours chariot
      ligne = ligne.replace(/\r/g, "");

      const cols = ligne.split(",");

      if (cols.length < 7) {
        console.warn("Ligne ignorée :", ligne);
        return;
      }

      const titre = cols[1];
      const categorie = cols[2];
      const annee = cols[3];
      const technique = cols[4];
      const intention = cols[5];
      const imageDrive = cols[6];

      if (categorie !== "Arts visuels") return;

      // Transformation lien Drive → image directe
      const imageId = imageDrive.match(/\/d\/([^/]+)/);
      if (!imageId) return;

      const image = `https://drive.google.com/uc?id=${imageId[1]}`;

      if (!sections[technique]) sections[technique] = [];
      sections[technique].push({ titre, annee, intention, image });
    });

    // Génération HTML
    for (const technique in sections) {

      const btn = document.createElement("button");
      btn.className = "accordion-button";
      btn.textContent = technique;

      const content = document.createElement("div");
      content.className = "accordion-content";

      sections[technique].forEach(o => {
        content.innerHTML += `
          <div class="oeuvre">
            <img src="${o.image}" alt="${o.titre}">
            <h3>${o.titre}</h3>
            <p><strong>Date :</strong> ${o.annee}</p>
            <p><strong>Intention :</strong> ${o.intention}</p>
          </div>
        `;
      });

      accordion.appendChild(btn);
      accordion.appendChild(content);
    }
  })
  .catch(err => console.error("Erreur CSV :", err));
