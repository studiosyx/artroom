function activerAccordeon() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains("open");

      document.querySelectorAll(".accordion-content").forEach(c => {
        c.classList.remove("open");
      });

      if (!isOpen) {
        content.classList.add("open");
      }
    });
  });
}
