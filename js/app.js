// ---------- მენიუ ----------
(function () {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('menuClose');

  function setMenu(open) {
    menu.hidden = !open;
    overlay.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', () => setMenu(menu.hidden));
  closeBtn.addEventListener('click', () => setMenu(false));
  overlay.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
})();

// ---------- ფოტოს გადიდება ----------
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
function openPhoto(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.hidden = false;
}
function closePhoto() {
  lightbox.hidden = true;
  lbImg.src = '';
}
document.getElementById('lbClose').addEventListener('click', closePhoto);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closePhoto(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePhoto(); });

// ---------- ფერები (პარკირება) ----------
(function renderColors() {
  const wrap = document.getElementById('colors');
  PARKING_COLORS.forEach(c => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML =
      '<div class="color-head"><span class="pill" style="' + c.style + '">' + c.label + '</span><b>' + c.name + '</b></div>' +
      '<p>' + c.desc + '</p>';
    if (c.img) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'photo-btn';
      b.setAttribute('aria-label', c.alt + ' — გადიდება');
      b.innerHTML = '<img src="' + c.img + '" alt="' + c.alt + '" loading="lazy">';
      b.addEventListener('click', () => openPhoto(c.img, c.alt));
      card.appendChild(b);
    } else {
      const ph = document.createElement('div');
      ph.className = 'photo-empty';
      ph.textContent = 'ფოტო დაემატება';
      card.appendChild(ph);
    }
    wrap.appendChild(card);
  });
})();

// ---------- ლექსიკონი (გასაშლელი) ----------
function renderDict(id, items) {
  const wrap = document.getElementById(id);
  items.forEach(d => {
    const det = document.createElement('details');
    det.className = 'acc-item';
    det.innerHTML =
      '<summary><span><b class="es">' + d.es + '</b><span>' + d.ka + '</span></span><span class="plus" aria-hidden="true">+</span></summary>' +
      '<div class="acc-body"><p>' + d.body + '</p></div>';
    wrap.appendChild(det);
  });
}
renderDict('dictRoad', DICT_ROAD);
renderDict('dictSpain', DICT_SPAIN);
renderDict('dictPolice', DICT_POLICE);
renderDict('dictAccident', DICT_ACCIDENT);

// ---------- სტატუსი (ვიტორიის OTA) ----------
(function otaStatus() {
  const now = new Date();
  const dow = now.getDay();
  const hr = now.getHours() + now.getMinutes() / 60;
  const freeDay = dow === 0 || now.getMonth() === 7;
  const inWindow = dow === 6
    ? (hr >= 10 && hr < 14)
    : ((hr >= 10 && hr < 14) || (hr >= 16 && hr < 20));
  const paid = !freeDay && inWindow;
  document.getElementById('otaStatus').textContent =
    paid ? 'ამ დროებში პარკირება ექვემდებარება გადახდას' : 'პარკირება ამ დროს უფასოა';
})();
