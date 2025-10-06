// js/products.js

// Provided/expected product data source
const products = [
  { id: "fc-1888", name: "Flux Capacitor" },
  { id: "fc-2050", name: "Flux Capacitor Plus" },
  { id: "ak-9000", name: "Arc Reactor 9000" },
  { id: "ak-9001", name: "Arc Reactor 9001" },
  { id: "r2-42", name: "R2 Helper Droid" },
  { id: "hv-700", name: "Hover Board 700" },
  // add or adjust to match your course’s exact array if they provided one
];

function populateProducts() {
  const select = document.getElementById("product");
  if (!select) return;

  // Clear any existing dynamic options (keeps the placeholder)
  // Start at index 1 to keep the disabled "Select a Product ..." option
  while (select.options.length > 1) {
    select.remove(1);
  }

  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;        // value = id (per assignment spec)
    opt.textContent = p.name; // visible text = name
    select.appendChild(opt);
  });
}

// Optional: footer year fill (nice touch)
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  populateProducts();
  setYear();
});

