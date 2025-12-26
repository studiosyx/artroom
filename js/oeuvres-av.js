/* ======================================================
   CONFIG
====================================================== */
const CSV_URL = "TON_LIEN_CSV_GOOGLE_SHEETS_ICI";

/* ======================================================
   LOAD CSV
====================================================== */
Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    const oeuvres = results.data
      .map(o => sanitize(o))
      .filter(o => o.Catégorie === "Arts visuels");

    renderAccordion(oeuvres);
  },
  error: function(err){
    console.error("Erreur CSV", err);
  }
});

/* ======================================================
   SANITIZE
====================================================== */
function sanitize(o){
  return {
    Titre: (o.Titre || "").trim(),
    Année: (o.Année || "").trim(),
    Technique: (o.Technique || "").trim(),
    Intention: (o.Intention || "").trim(),
    Image: (o.Image || "").trim()
  };
}

/* ======================================================
   RENDER ACCORDION
====================================================== */
function renderAccordion(oeuvres){
  const container = document.querySelector(".accordion");
  container.innerHTML = "";

  const groupes = {};

  oeuvres.forEach(o => {
    if (!groupes[o.Technique]) groupes[o.Technique] = [];
    groupes[o.Technique].push(o);
  });

  Object.keys(groupes).forEach(technique => {
    const btn = document.createElement("button");
    btn.className = "accordion-button";
    btn.textContent = technique;

    const content = document.createElement("div");
    content.className = "accordion-content";

    groupes[technique].forEach(o => {
      content.innerHTML += `
        <div class="oeuvre">
          <img src="${o.Image}" alt="${o.Titre}" loading="lazy"
               onerror="this.style.display='none'">
          <h3>${escapeHtml(o.Titre)}</h3>
          <p><strong>Date :</strong> ${escapeHtml(o.Année)}</p>
          <p><strong>Intention :</strong> ${escapeHtml(o.Intention)}</p>
        </div>
      `;
    });

    container.appendChild(btn);
    container.appendChild(content);
  });
}

/* ======================================================
   UTILS
====================================================== */
function escapeHtml(s){
  return s
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}
