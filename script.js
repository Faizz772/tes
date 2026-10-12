/* ================= SewaBot Panel - Script ================= */

/* ---------- Toast helper (dipakai inline onsubmit juga) ---------- */
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- Navbar burger (mobile) ---------- */
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
if (burger && navMenu) {
  burger.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
  );
}

/* ---------- Demo action buttons (data-demo) ---------- */
document.querySelectorAll('[data-demo]').forEach(el => {
  el.addEventListener('click', e => {
    if (el.getAttribute('href') === '#') e.preventDefault();
    toast('🚧 Fitur "' + el.dataset.demo + '" segera hadir!');
  });
});

/* ---------- Tombol nyalakan/aktifkan bot (demo toggle) ---------- */
document.querySelectorAll('[data-toggle-bot]').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    const stCell = row.querySelector('.badge-st');
    const isOn = stCell.classList.contains('st-aktif');
    if (isOn) {
      stCell.className = 'badge-st st-off';
      stCell.textContent = '🔴 Offline';
      btn.dataset.toggleBot = 'Nyalakan';
      btn.textContent = 'Nyalakan';
      btn.className = 'btn btn-wa btn-sm';
      toast('🤖 Bot dimatikan (demo)');
    } else {
      stCell.className = 'badge-st st-aktif';
      stCell.textContent = '🟢 Aktif';
      btn.dataset.toggleBot = 'Matikan';
      btn.textContent = 'Matikan';
      btn.className = 'btn btn-ghost border btn-sm';
      toast('⚡ Bot dinyalakan (demo)');
    }
  });
});

/* ---------- Line chart: pesan masuk vs keluar (SVG) ---------- */
const chartEl = document.getElementById('chart');
if (chartEl) {
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const masuk  = [820, 640, 900, 760, 1450, 980, 520];
  const keluar = [610, 480, 720, 590, 1150, 760, 410];

  const W = 700, H = 280, padL = 46, padR = 16, padT = 16, padB = 34;
  const maxV = 1600, gridLines = 4;
  const x = i => padL + (i * (W - padL - padR)) / (days.length - 1);
  const y = v => padT + (1 - v / maxV) * (H - padT - padB);
  const pts = arr => arr.map((v, i) => x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');

  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik pesan 7 hari">`;
  // grid + sumbu Y
  for (let g = 0; g <= gridLines; g++) {
    const gy = padT + (g * (H - padT - padB)) / gridLines;
    const val = maxV - (g * maxV) / gridLines;
    svg += `<line x1="${padL}" y1="${gy}" x2="${W - padR}" y2="${gy}" stroke="#e2e8f0" stroke-dasharray="4 4"/>`;
    svg += `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#94a3b8">${val}</text>`;
  }
  // sumbu X + label hari
  days.forEach((d, i) => {
    svg += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="12" fill="#64748b" font-weight="600">${d}</text>`;
  });
  // area gradient di bawah garis masuk
  svg += `<defs>
    <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10b981" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </linearGradient></defs>`;
  svg += `<polygon points="${padL},${y(0)} ${pts(masuk)} ${x(days.length - 1)},${y(0)}" fill="url(#gIn)"/>`;
  // garis pesan keluar (biru)
  svg += `<polyline points="${pts(keluar)}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  keluar.forEach((v, i) => { svg += `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="#2563eb"/>`; });
  // garis pesan masuk (hijau)
  svg += `<polyline points="${pts(masuk)}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  masuk.forEach((v, i) => {
    svg += `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="#10b981"/>`;
    svg += `<text x="${x(i)}" y="${y(v) - 10}" text-anchor="middle" font-size="10.5" fill="#059669" font-weight="700">${v}</text>`;
  });
  svg += `</svg>`;
  chartEl.innerHTML = svg;
}

/* ---------- Tabs halaman Kelola Bot ---------- */
const tabs = document.getElementById('tabs');
if (tabs) {
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
}

/* ---------- Auto Reply: tambah / edit / hapus ---------- */
const kwBody = document.getElementById('kwBody');
const kwInput = document.getElementById('kwInput');
const kwReply = document.getElementById('kwReply');
const kwAdd = document.getElementById('kwAdd');

function kwActionsCell() {
  const td = document.createElement('td');
  const edit = document.createElement('button');
  edit.className = 'btn btn-ghost border btn-sm';
  edit.textContent = 'Edit';
  edit.dataset.kwEdit = '';
  const del = document.createElement('button');
  del.className = 'btn btn-ghost border btn-sm';
  del.textContent = 'Hapus';
  del.dataset.kwDel = '';
  td.append(edit, document.createTextNode(' '), del);
  return td;
}

if (kwAdd && kwBody) {
  kwAdd.addEventListener('click', () => {
    const k = kwInput.value.trim(), r = kwReply.value.trim();
    if (!k || !r) { toast('⚠️ Isi kata kunci & balasan dulu!'); return; }
    const tr = document.createElement('tr');
    const tdK = document.createElement('td');
    tdK.innerHTML = '<strong></strong>';
    tdK.querySelector('strong').textContent = k;
    const tdR = document.createElement('td');
    tdR.textContent = '"' + r + '"';
    tr.append(tdK, tdR, kwActionsCell());
    kwBody.appendChild(tr);
    kwInput.value = ''; kwReply.value = '';
    toast('✅ Auto reply ditambahkan');
  });
}

if (kwBody) {
  kwBody.addEventListener('click', e => {
    const del = e.target.closest('[data-kw-del]');
    if (del) { del.closest('tr').remove(); toast('🗑️ Auto reply dihapus'); return; }
    const edit = e.target.closest('[data-kw-edit]');
    if (edit) {
      const tr = edit.closest('tr');
      const oldR = tr.cells[1].textContent.replace(/^"|"$/g, '');
      const val = prompt('Ubah balasan otomatis:', oldR);
      if (val && val.trim()) {
        tr.cells[1].textContent = '"' + val.trim() + '"';
        toast('✏️ Balasan diperbarui');
      }
    }
  });
}

/* ---------- Switch pengaturan: toast demo ---------- */
document.querySelectorAll('.switch input').forEach(sw => {
  sw.addEventListener('change', () => {
    toast(sw.checked ? '✅ Fitur diaktifkan' : '⏸️ Fitur dinonaktifkan');
  });
});
