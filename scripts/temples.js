// Footer: current year
document.getElementById('year').textContent = new Date().getFullYear();

// Footer: last modified 
document.getElementById('lastModified').textContent =
  `Last modified: ${document.lastModified}`;

// Mobile hamburger toggle
const menuBtn = document.getElementById('menuButton');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
