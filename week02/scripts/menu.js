const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('#primary-nav');

menuBtn.addEventListener('click', () => {
  // Fill the three blanks in the starter:
  // 1) ______.toggle('open')
  // 2) ______.toggle('open')
  // 3) set aria-expanded based on whether nav is open

  const isOpen = nav.classList.toggle('open');          // nav.classList
  menuBtn.classList.toggle('open');                     // menuBtn.classList (optional cosmetic)
  menuBtn.setAttribute('aria-expanded', isOpen);        // keep a11y state in sync
});
