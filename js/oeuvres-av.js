<script>
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(response => response.text())
  .then(data => {
    const lignes = data.split("\n").slice(1);
    const accordion = document.querySelector(".accordion");
    accordion.innerHTML = "";

    const groupes = {};

    lignes.forEach(ligne => {
      const cols = ligne.split(",");

      if (cols.length < 7) return;

      const titre = cols[1];
      const categorie = cols[2];
      const annee = cols[3];
      const technique = cols[4];
      const intention = cols[5];
      const image = cols[6];

      if (categorie !== "Arts visuels") return;

      if (!groupes[technique]) groupes[technique] = [];
      groupes[technique].push({ titre, annee, intention, image });
    });

    for (const technique in groupes) {
      const btn = document.createElement("button");
      btn.className = "accordion-button";
      btn.textContent = technique;

      const content = document.createElement("div");
      content.className = "accordion-content";

      groupes[technique].forEach(o => {
        content.innerHTML += `
          <div class="oeuvre">
            <img src="${o.image}" alt="${o.titre}">
            <h3>${o.titre}</h3>
            <p><strong>Date :</strong> ${o.annee}</p>
            <p><strong>Technique :</strong> ${technique}</p>
            <p><strong>Intention artistique :</strong> ${o.intention}</p>
          </div>
        `;
      });

      accordion.appendChild(btn);
      accordion.appendChild(content);
    }
  });
</script>
