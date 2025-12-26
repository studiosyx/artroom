const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLLwANYSN1hibe1BuOgLEHyaIE0L7gkal9vJCqZD5EkdaBUTZ12vb-P1UmhVrCn8vOBVs6sJmlhgG/pub?output=csv";

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    buildAccordion(results.data);
    initAccordion(); // ⭐ IMPORTANT
  }
});

function buildAccordion(data) {
  const container = document.getElementById("accordion-av");
  container.innerHTML = "";

  const groups = {};

  data.forEach(r => {
    if (r["Catégorie"] !== "Arts visuels") return;

    const tech = r["Technique"] || "Autre";
    if (!groups[tech]) groups[tech] = [];
    groups[tech].push(r);
  });

  Object.keys(groups).forEach(technique => {
    const btn = document.createElement("button");
    btn.className = "accordion-button";
    btn.textContent = technique;

    const content = document.createElement("div");
    content.className = "accordion-content";

    groups[technique].forEach(o => {
      const img = o["Image"] || o["Lien image"] || "";

      content.innerHTML += `
        <div class="oeuvre">
          ${img ? `<img src="${img}" loading="lazy" onerror="this.style.display='none'">` : ""}
          <h3>${escapeHtml(o["Titre"] || "")}</h3>
          <p><strong>Date :</strong> ${escapeHtml(o["Année"] || "")}</p>
          <p><strong>Technique :</strong> ${escapeHtml(o["Technique"] || "")}</p>
          <p><strong>Intention :</strong> ${escapeHtml(o["Intention"] || "")}</p>
        </div>
      `;
    });

    container.append(btn, content);
  });
}

function escapeHtml(s){
  return (s||"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}
