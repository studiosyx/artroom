fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv")
  .then(res => res.text())
  .then(csv => {

    const lignes = csv.trim().split("\n");
    const accordion = document.querySelector(".accordion");

    const sections = {};

    lignes.forEach((ligne, index) => {
      if (index === 0) return; // ignore l'entête si présente

      const cols = ligne.split(",");

      if (cols.length < 7) return;

      const titre = cols[1];
      const categorie = cols[2];
      const annee = cols[3];
      const technique = cols[4];
      const intention = cols[5];
      const image = cols[6];

      if (categorie !== "Arts visuels") return;

      if (!sections[technique]) sections[technique] = [];
      sections[technique].push({ titre, annee, intention, image });
    });

    Object.keys(sections).forEach(technique => {

      const btn = document.createElement("button");
      btn.className = "accordion-button";
      btn.textContent = technique;

      const content = document.createElement("div");
      content.className = "accordion-content";

      sections[technique].forEach(o => {
        const imgUrl = driveToImg(o.image);

        content.innerHTML += `
          <div class="oeuvre">
            <img src="${imgUrl}" alt="${o.titre}">
            <h3>${o.titre}</h3>
            <p><strong>Date :</strong> ${o.annee}</p>
            <p><strong>Intention artistique :</strong> ${o.intention}</p>
          </div>
        `;
      });

      accordion.appendChild(btn);
      accordion.appendChild(content);
    });
  });

function driveToImg(url) {
  const id = url.match(/\/d\/(.+?)\//);
  return id ? `https://drive.google.com/uc?export=view&id=${id[1]}` : url;
}
