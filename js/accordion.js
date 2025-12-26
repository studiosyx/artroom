// accordion.js
function initAccordion() {
  const buttons = document.querySelectorAll('.accordion-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}
