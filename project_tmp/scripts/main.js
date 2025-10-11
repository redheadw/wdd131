/* ---------- Helpers ---------- */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

/* ---------- Footer dates ---------- */
function initFooterDates(){
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  const lm = $('#lastmod'); if (lm) lm.textContent = `Last modified: ${document.lastModified}`;
}

/* ---------- Lazy loading (progressive) ---------- */
function initLazyImages(){
  if (!('IntersectionObserver' in window)) return; // fallback to loading="lazy"
  const imgs = $$('img[data-src]');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  }, {rootMargin: '200px 0px'});
  imgs.forEach(img=>io.observe(img));
}

/* ---------- Types: data + tabs + render ---------- */
const PROCESS_DATA = [
  { id:'mig', name:'MIG (GMAW)', best:'General fabrication, production', pros:['Faster','Easier to learn','Thin–medium steel'], cons:['Wind sensitive'], img:'images/mig.webp' },
  { id:'tig', name:'TIG (GTAW)', best:'Precision, thin metals, aluminum/stainless', pros:['Clean','Strong','Precise control'], cons:['Slower','Higher skill'], img:'images/tig.webp' },
  { id:'stick', name:'Stick (SMAW)', best:'Outdoor/field, thicker materials', pros:['Portable','Handles rusty steel'], cons:['More cleanup','Hard on thin'], img:'images/stick.webp' },
  { id:'fcaw', name:'Flux-Cored (FCAW)', best:'Heavy fabrication, structural steel', pros:['High deposition','Good outdoors'], cons:['More spatter','Wire cost'], img:'images/fcaw.webp' }
];

function initProcessTabs(){
  const tabs = $$('.process-tab');
  const container = $('.process');
  if(!tabs.length || !container) return;

  function renderProcess(id){
    const p = PROCESS_DATA.find(x=>x.id===id);
    if(!p) return;
    container.innerHTML = `
      <h2>${p.name}</h2>
      <ul>
        <li><strong>Best for:</strong> ${p.best}</li>
        <li><strong>Pros:</strong> ${p.pros.join(', ')}</li>
        <li><strong>Cons:</strong> ${p.cons.join(', ')}</li>
      </ul>
      <div class="process-gallery">
        <figure class="figure">
          <picture>
            <source type="image/webp" srcset="${p.img}">
            <img alt="${p.name} example" width="800" height="533" loading="lazy" decoding="async">
          </picture>
          <figcaption>${p.name} — example setup</figcaption>
        </figure>
      </div>
    `;
  }

  function activate(btn){
    tabs.forEach(b=>b.setAttribute('aria-pressed', b===btn ? 'true':'false'));
    renderProcess(btn.dataset.target.slice(1));
  }

  tabs.forEach(btn=>btn.addEventListener('click', ()=>activate(btn)));
  activate(tabs[0]); // default
}

/* ---------- Careers: render from array + filters ---------- */
const JOBS = [
  {title:'Welder/Fabricator', industry:'Manufacturing', level:'Entry', certs:['1G-4G Plate']},
  {title:'Pipe Welder', industry:'Construction', level:'Intermediate', certs:['6G Pipe']},
  {title:'Welding Inspector', industry:'Various', level:'Advanced', certs:['CWI (advanced)']},
  {title:'Maintenance Welder', industry:'Automotive', level:'Entry', certs:['MIG Plate']}
];

function renderJobs(filterLevel='All'){
  const root = $('.jobs'); if(!root) return;
  const list = JOBS
    .filter(j => filterLevel==='All' ? true : j.level===filterLevel)
    .sort((a,b)=>a.title.localeCompare(b.title))
    .map(j => `
      <article class="job">
        <h3>${j.title}</h3>
        <p><strong>Industry:</strong> ${j.industry}</p>
        <p><strong>Level:</strong> ${j.level}</p>
        <p><strong>Certs:</strong> ${j.certs.join(', ')}</p>
      </article>
    `).join('');
  root.innerHTML = list;
}

function initJobFilters(){
  const sel = $('#jobFilter');
  if(!sel) return;
  renderJobs(sel.value);
  sel.addEventListener('change', ()=>renderJobs(sel.value));
}

/* ---------- Request Info Form (localStorage + validation) ---------- */
function initInfoForm(){
  const form = $('#infoForm'); if(!form) return;
  const status = $('#formStatus');
  const clearBtn = $('#clearStorage');

  // Prefill
  const saved = JSON.parse(localStorage.getItem('weldpathInfo')||'null');
  if (saved) {
    for (const [k,v] of Object.entries(saved)) { if (form.elements[k]) form.elements[k].value = v; }
    if (status) status.textContent = 'Loaded saved info from this device.';
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    if (!data.name || !data.email) {
      status.textContent = 'Please complete the required fields.';
      return;
    }
    localStorage.setItem('weldpathInfo', JSON.stringify(data));
    status.textContent = `Thanks, ${data.name}! We saved your request locally.`;
    form.reset();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', ()=>{
      localStorage.removeItem('weldpathInfo');
      if (status) status.textContent = 'Saved info cleared.';
    });
  }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initFooterDates();
  initLazyImages();
  initProcessTabs();
  initJobFilters();
  initInfoForm();
});
