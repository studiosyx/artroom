const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv";

fetch(csvUrl)
  .then(res => res.text())
  .then(csv => {
    const lignes = csv.trim().split("\n").slice(1);
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

      sections[technique].push({ titre, annee, intention, image });
    });

    const accordion = document.querySelector(".accordion");

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

      accordion.append(btn, content);
    }

    // ✅ ACTIVATION DE L’ACCORDION APRÈS CRÉATION
    initAccordion();
  });

function initAccordion() {
  document.querySelectorAll(".accordion-button").forEach(button => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const content = button.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });
}
