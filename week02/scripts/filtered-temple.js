// data
const temples = [
  { name: "Laie Hawaii Temple", location: "Laie, Hawaii, USA", dedicated: "1919-11-27", area: 42300, imageUrl: "images/512px-LDS_Laie_Hawaii_Temple_front_view.jpg" },
  { name: "San Diego California Temple", location: "San Diego, California, USA", dedicated: "1993-04-25", area: 72000, imageUrl: "images/512px-San_Diego_Temple.jpg" },
  { name: "Bentonville Arkansas Temple", location: "Bentonville, Arkansas, USA", dedicated: "2023-09-17", area: 25245, imageUrl: "images/512px-Bentonville_Arkansas_Temple_20230619_0928.jpg" },
  { name: "St. George Utah Temple", location: "St. George, Utah, USA", dedicated: "1877-04-06", area: 142000, imageUrl: "images/512px-St._George_Utah_Temple,_a_temple_of_the_Church_of_Jesus_Christ_of_Latter-Day_Saints_(LDS_Church)_in_St._George,_Utah.jpg" },
  { name: "Idaho Falls Idaho Temple", location: "Idaho Falls, Idaho, USA", dedicated: "1945-09-23", area: 92000, imageUrl: "images/512px-The_Church_of_Jesus_Christ_of_Latter-day_Saints_-_Idaho_Falls.jpg" },
  { name: "Kansas City Missouri Temple", location: "Kansas City, Missouri, USA", dedicated: "2012-05-06", area: 32325, imageUrl: "images/512px-Kansas_City_Temple.jpg" },
  { name: "Philadelphia Pennsylvania Temple", location: "Philadelphia, Pennsylvania, USA", dedicated: "2016-09-18", area: 61800, imageUrl: "images/512px-Philadelphia_Temple.jpg" },
  { name: "Washington D.C. Temple", location: "Kensington, Maryland, USA", dedicated: "1974-11-19", area: 156558, imageUrl: "images/512px-Washington_DC_Temple.jpg" },
  { name: "Jordan River Utah Temple", location: "South Jordan, Utah, USA", dedicated: "1981-11-16", area: 148236, imageUrl: "images/temples/jordanriver.jpg" },

  // +3 new
  { name: "Salt Lake Temple", location: "Salt Lake City, Utah, USA", dedicated: "1893-04-06", area: 382207, imageUrl: "https://cdn.churchofjesuschrist.org/temples/salt-lake-temple/exterior.jpg" },
  { name: "Rome Italy Temple", location: "Rome, Italy", dedicated: "2019-03-10", area: 41010, imageUrl: "https://cdn.churchofjesuschrist.org/temples/rome-italy-temple/exterior.jpg" },
  { name: "Freiberg Germany Temple", location: "Freiberg, Germany", dedicated: "1985-06-29", area: 21500, imageUrl: "https://cdn.churchofjesuschrist.org/temples/freiberg-germany-temple/exterior.jpg" },
];

// helpers
const $ = (sel, root = document) => root.querySelector(sel);

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function byFilter(option) {
  switch (option) {
    case "old": return t => new Date(t.dedicated).getFullYear() < 1900;
    case "new": return t => new Date(t.dedicated).getFullYear() > 2000;
    default: return () => true;
  }
}

function bySize(option) {
  switch (option) {
    case "large": return t => t.area > 90000;
    case "small": return t => t.area < 10000;
    default: return () => true;
  }
}

// render
const cards = $("#cards");

function render(list) {
  cards.innerHTML = "";
  if (!list.length) {
    cards.innerHTML = `<p style="color:#e2e8f0;margin:.5rem 0;">No temples match this filter.</p>`;
    return;
  }

  const frag = document.createDocumentFragment();
  list.forEach(t => {
    const fig = document.createElement("figure");

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.loading = "lazy";
    img.width = 800;
    img.height = 600;
    img.alt = `${t.name} exterior`;

    const cap = document.createElement("figcaption");
    cap.innerHTML = `
      <strong>${t.name}</strong><br>
      <span>${t.location}</span><br>
      <span>Dedicated: ${formatDate(t.dedicated)}</span><br>
      <span>Total area: ${t.area.toLocaleString()} sq ft</span>
    `;

    fig.append(img, cap);
    frag.append(fig);
  });

  cards.append(frag);
}

// filters/nav
function applyFromURL() {
  const params = new URLSearchParams(location.search);
  const filter = params.get("filter"); // old | new
  const size = params.get("size");     // large | small
  const list = temples.filter(byFilter(filter)).filter(bySize(size));
  render(list);
}

function wireNav() {
  const menuBtn = $("#menuButton");
  const nav = $("#mainNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  document.getElementById("mainNav")?.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const filter = a.dataset.filter || null;
    const size = a.dataset.size || null;

    e.preventDefault();
    const params = new URLSearchParams();
    if (filter) params.set("filter", filter);
    if (size) params.set("size", size);

    const newURL = `${location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
    history.replaceState(null, "", newURL);
    nav?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    applyFromURL();
  });
}

// footer
function updateFooter() {
  const yearEl = $("#year");
  const modEl = $("#lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = `Last modified: ${document.lastModified}`;
}

document.addEventListener("DOMContentLoaded", () => {
  wireNav();
  applyFromURL();
  updateFooter();
});
