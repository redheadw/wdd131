// Provided product array (id used as value, name displayed in dropdown)
const products = [
{ id: 'triton-200', name: 'Triton 200 Electric Toothbrush' },
{ id: 'aqua-bottle', name: 'Aqua Hydration Bottle 32oz' },
{ id: 'luma-lamp', name: 'Luma Desk Lamp' },
{ id: 'ventra-fan', name: 'Ventra Smart Fan' },
{ id: 'terra-pan', name: 'Terra Nonstick Pan 10"' }
];


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