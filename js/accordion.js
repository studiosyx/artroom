function initAccordion() {
  const acc = document.getElementsByClassName("accordion-button");
  
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      // Alterne entre l'ajout et la suppression de la classe "active"
      this.classList.toggle("active");

      // Affiche ou cache le panneau suivant
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}
