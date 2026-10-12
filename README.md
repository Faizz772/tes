# SewaBot Panel ⚡ — Layanan Sewa Bot Otomatis

Website layanan sewa bot otomatis (WhatsApp, Telegram, Discord) — statis (HTML + CSS + JavaScript, tanpa framework), siap deploy di Vercel.

## Halaman

- **`index.html`** — Landing page:
  - Navbar (logo SewaBot ⚡, menu Beranda/Layanan/Harga/Panel/Kontak, tombol Login Panel & Daftar Sekarang)
  - Hero "Sewa Bot Otomatis Terbaik & Terpercaya" (gradasi hijau-biru, mock chat bot)
  - Stats bar: 500+ Bot Aktif | 2.000+ Pelanggan | Uptime 99.9% | Support 24/7
  - Pilih Jenis Bot (WhatsApp, Telegram, Discord, Toko Online, Broadcast, Custom)
  - Paket Sewa Bot: Starter Rp50rb / Bisnis Rp150rb (⭐ Populer) / Pro Rp350rb per bulan
  - Tabel Perbandingan Lengkap Paket (12 fitur)
  - Kontak & Support (WhatsApp 24 jam)
  - Semua tombol sewa/paket terhubung langsung ke WhatsApp (`wa.me/6289698988955`)
- **`panel.html`** — Panel Kontrol Bot (admin):
  - Sidebar: Dashboard, Bot Saya, Statistik, Broadcast, Pengaturan, Langganan, Tiket Support, Logout
  - Kartu ringkasan: Bot Aktif 3/5, 4.230 pesan/hari, 128 user, Uptime 99.8%
  - Daftar Bot Saya (5 bot, status & aksi kelola)
  - Grafik pesan 7 hari (SVG line chart: masuk vs keluar)
  - Broadcast terjadwal, Tiket support, Info langganan (Perpanjang/Upgrade via WA)
- **`kelola.html`** — Halaman kelola bot (Bot Toko Baju):
  - Tab: Info Bot, Auto Reply (CRUD demo), Broadcast, Log Pesan, Pengaturan (switch)

## Menjalankan

```bash
python3 -m http.server 8000   # buka http://localhost:8000
```

## Deploy Vercel

Sudah dikonfigurasi via `vercel.json` (clean URLs, cache asset, security headers). Import repo ini di https://vercel.com/new — atau push ke Git untuk auto-deploy.

## Struktur

```
motoshop/
├── index.html    # landing page
├── panel.html    # panel kontrol admin
├── kelola.html   # detail pengaturan bot
├── style.css     # styling + responsif
├── script.js     # chart SVG, tabs, auto-reply demo, toast
├── vercel.json   # konfigurasi deploy Vercel
└── README.md
```

© 2024 SewaBot. All rights reserved.
