// Footer year (shared footer used on assignments)
document.getElementById('year').textContent = new Date().getFullYear();

// Product data (value uses id; displayed text uses name)
const products = [
  { id: 'triton-200',  name: 'Triton 200 Electric Toothbrush' },
  { id: 'aqua-bottle', name: 'Aqua Hydration Bottle 32oz' },
  { id: 'luma-lamp',   name: 'Luma Desk Lamp' },
  { id: 'ventra-fan',  name: 'Ventra Smart Fan' },
  { id: 'terra-pan',   name: 'Terra Nonstick Pan 10"' }
];

// Populate the select with options from the array
(function populateProducts() {
  const select = document.getElementById('product');
  if (!select) return;
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;        
    opt.textContent = p.name;
    select.appendChild(opt);
  });
})();

// (Optional) constrain install date to not be in the future
(function limitDate() {
  const input = document.getElementById('installDate');
  if (!input) return;
  input.max = new Date().toISOString().split('T')[0];
})();
