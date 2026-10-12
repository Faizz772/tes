# MotoShop ⚙️ — Website Store Sparepart Motor

Website e-commerce sparepart motor statis (HTML + CSS + JavaScript, tanpa framework).

## Fitur

- **Navbar** — logo, menu (Beranda, Produk, Harga, Dashboard, Kontak), tombol Login/Daftar
- **Hero** — judul, subjudul, tombol "Belanja Sekarang" & "Lihat Katalog", background gradasi hijau-biru
- **Stats Bar** — 2.500+ produk, 10.000+ pelanggan, rating 4.9, pengiriman cepat
- **Kategori Produk** — 6 kategori (Ban & Velg, Mesin & Oli, Rem & Kopling, dll) dengan filter interaktif
- **Produk Terlaris** — 6 kartu produk (gambar, rating, terjual, harga, tombol + Keranjang)
- **Daftar Harga** — tabel harga 10 produk dengan filter kategori & status stok
- **Dashboard Admin** — kartu ringkasan (omset, produk, pesanan, pelanggan), grafik penjualan mingguan, pesanan terbaru, produk stok menipis
- **Footer** — 4 kolom (brand, navigasi, kategori, kontak)
- Keranjang belanja + notifikasi toast, form kontak, tampilan responsif (mobile-friendly)

## Cara Menjalankan

Buka `index.html` di browser, atau jalankan server statis:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Struktur

```
motoshop/
├── index.html   # halaman utama (semua section)
├── style.css    # styling lengkap + responsif
└── script.js    # data produk, filter, keranjang, grafik
```

© 2024 MotoShop. All rights reserved.
