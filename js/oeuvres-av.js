Papa.parse("data/oeuvres-arts-visuels.csv", {
  download: true,
  header: true,
  complete: function(results) {
    genererAccordeon(results.data, "accordion-av");
  }
});

function genererAccordeon(oeuvres, containerId) {
  const container = document.getElementById(containerId);
  const categories = {};

  oeuvres.forEach(oeuvre => {
    if (!oeuvre.categorie) return;
    if (!categories[oeuvre.categorie]) {
      categories[oeuvre.categorie] = [];
    }
    categories[oeuvre.categorie].push(oeuvre);
  });

  for (const categorie in categories) {
    const section = document.createElement("section");
    section.className = "accordion-item";

    const header = document.createElement("button");
    header.className = "accordion-header";
    header.textContent = categorie;

    const content = document.createElement("div");
    content.className = "accordion-content";

    categories[categorie].forEach(oeuvre => {
      const article = document.createElement("article");
      article.className = "oeuvre";

      article.innerHTML = `
        <img src="${oeuvre.image}" alt="${oeuvre.titre}">
        <h3>${oeuvre.titre} (${oeuvre.annee})</h3>
        <p class="technique">${oeuvre.technique}</p>
        <p class="description">${oeuvre.description}</p>
      `;

      content.appendChild(article);
    });

    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
  }

  activerAccordeon();
}
