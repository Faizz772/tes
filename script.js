/* ===================== DATA ===================== */
const products = [
  { name: "Ban IRC NR77",            cat: "Ban & Velg",       brand: "IRC",      price: 185000, rating: 4.8, sold: 320, emoji: "🛞", stock: "ada" },
  { name: "Oli Yamalube 1L",         cat: "Mesin & Oli",      brand: "Yamalube", price: 65000,  rating: 4.9, sold: 580, emoji: "🛢️", stock: "ada" },
  { name: "Kampas Rem FDR",          cat: "Rem & Kopling",    brand: "FDR",      price: 45000,  rating: 4.7, sold: 210, emoji: "🛑", stock: "ada" },
  { name: "Busi NGK CR8E",           cat: "Mesin & Oli",      brand: "NGK",      price: 35000,  rating: 4.9, sold: 440, emoji: "⚡", stock: "ada" },
  { name: "Filter Udara K&N",        cat: "Filter",           brand: "K&N",      price: 120000, rating: 4.6, sold: 190, emoji: "🌀", stock: "ada" },
  { name: "Lampu LED H4 60W",        cat: "Kelistrikan",      brand: "Philips",  price: 95000,  rating: 4.8, sold: 350, emoji: "💡", stock: "ada" }
];

const priceList = [
  { no: "001", name: "Ban IRC NR77 70/90-17",     cat: "Ban & Velg",    brand: "IRC",      price: 185000, status: "ada" },
  { no: "002", name: "Ban FDR Sport XR 80/90-17", cat: "Ban & Velg",    brand: "FDR",      price: 175000, status: "ada" },
  { no: "003", name: "Oli Yamalube 20W-50 1L",    cat: "Mesin & Oli",   brand: "Yamalube", price: 65000,  status: "ada" },
  { no: "004", name: "Oli Federal Matic 0.8L",    cat: "Mesin & Oli",   brand: "Federal",  price: 55000,  status: "ada" },
  { no: "005", name: "Kampas Rem Depan FDR",      cat: "Rem & Kopling", brand: "FDR",      price: 45000,  status: "ada" },
  { no: "006", name: "Kampas Kopling Set",        cat: "Rem & Kopling", brand: "TDR",      price: 125000, status: "tipis" },
  { no: "007", name: "Busi NGK CR8E",             cat: "Mesin & Oli",   brand: "NGK",      price: 35000,  status: "ada" },
  { no: "008", name: "Lampu LED H4 60/55W",       cat: "Kelistrikan",   brand: "Philips",  price: 95000,  status: "ada" },
  { no: "009", name: "Filter Udara K&N",          cat: "Filter",        brand: "K&N",      price: 120000, status: "ada" },
  { no: "010", name: "Aki Yuasa YTZ5S",           cat: "Kelistrikan",   brand: "Yuasa",    price: 285000, status: "habis" }
];

const sales = [
  { d: "Sen", v: 42 }, { d: "Sel", v: 28 }, { d: "Rab", v: 45 },
  { d: "Kam", v: 35 }, { d: "Jum", v: 92 }, { d: "Sab", v: 60 }, { d: "Min", v: 18 }
];

const rupiah = n => "Rp " + n.toLocaleString("id-ID");

/* ===================== RENDER PRODUK ===================== */
const grid = document.getElementById("productGrid");
grid.innerHTML = products.map(p => `
  <article class="product-card">
    <div class="p-img">${p.emoji}</div>
    <div class="p-body">
      <div class="p-name">${p.name}</div>
      <div class="p-meta"><span>⭐ ${p.rating}</span><span>|</span><span>Terjual ${p.sold}</span></div>
      <div class="p-price">${rupiah(p.price)}</div>
      <button class="p-cart" data-name="${p.name}">+ Keranjang</button>
    </div>
  </article>`).join("");

/* ===================== TABEL HARGA ===================== */
const statusMap = {
  ada:   '<span class="badge-status st-ada">✅ Ada</span>',
  tipis: '<span class="badge-status st-tapis">⚠️ Tipis</span>',
  habis: '<span class="badge-status st-habis">❌ Habis</span>'
};

const priceBody = document.getElementById("priceBody");
function renderPrice(cat = "all") {
  const rows = priceList.filter(p => cat === "all" || p.cat === cat);
  priceBody.innerHTML = rows.map(p => `
    <tr class="${p.status === "habis" ? "no-stock" : ""}">
      <td>${p.no}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.cat}</td>
      <td>${p.brand}</td>
      <td><strong>${rupiah(p.price)}</strong></td>
      <td>${statusMap[p.status]}</td>
    </tr>`).join("");
}
renderPrice();

document.getElementById("filterBar").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  renderPrice(btn.dataset.cat);
});

/* Kategori -> filter tabel harga + scroll */
document.querySelectorAll(".kat").forEach(k => {
  k.addEventListener("click", () => {
    const cat = k.dataset.filter;
    const match = [...document.querySelectorAll(".chip")]
      .find(c => c.dataset.cat === cat);
    const chip = match || document.querySelector('.chip[data-cat="all"]');
    chip.click();
    document.getElementById("harga").scrollIntoView({ behavior: "smooth" });
  });
});

/* ===================== GRAFIK PENJUALAN ===================== */
const chart = document.getElementById("chart");
const max = Math.max(...sales.map(s => s.v));
chart.innerHTML = sales.map(s => `
  <div class="bar-col">
    <span class="bar-val">${s.v}</span>
    <div class="bar" style="--h:${Math.round((s.v / max) * 100)}%" title="${s.d}: ${s.v} pesanan"></div>
    <span class="bar-label">${s.d}</span>
  </div>`).join("");

/* ===================== KERANJANG ===================== */
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

let cart = 0;
document.addEventListener("click", e => {
  const btn = e.target.closest(".p-cart");
  if (!btn) return;
  cart++;
  showToast(`✅ ${btn.dataset.name} masuk keranjang (${cart})`);
});

/* ===================== NAVBAR ===================== */
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");
burger.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu.addEventListener("click", e => {
  if (e.target.tagName === "A") navMenu.classList.remove("open");
});

/* Active link saat scroll */
const sections = [...document.querySelectorAll("section[id]")];
window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  let current = "";
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  document.querySelectorAll(".nav-menu a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}, { passive: true });
