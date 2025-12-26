function initAccordion() {
  document.querySelectorAll(".accordion-button").forEach(btn => {
    btn.onclick = () => {
      btn.classList.toggle("active");
      const content = btn.nextElementSibling;
      content.style.maxHeight
        ? content.style.maxHeight = null
        : content.style.maxHeight = content.scrollHeight + "px";
    };
  });
}
