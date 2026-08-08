# Frontend - Post Article Dashboard (Sharing Vision Pretest 2023)

Halo, ini bagian frontend dari submission saya untuk technical test Sharing Vision 2023, use case **Post Article**. Dashboard React buat kelola artikel, komunikasi ke backend lewat REST API, sesuai soal yang diberikan.

> Repo backend-nya terpisah, dicantumkan di form submission yang sama.

## Halaman-halaman

| Route              | Halaman        | Keterangan                                                        |
| ------------------ | -------------- | -------------------------------------------------------------------|
| `/posts`            | All Posts      | Tab Published / Drafts / Trashed, tabel dengan action edit + trash |
| `/posts/new`         | Add New        | Form (Title, Content, Category) dengan tombol **Publish** / **Draft** |
| `/posts/:id/edit`    | Edit Article   | Form yang sama, sudah terisi, tombol **Publish** / **Draft** buat ubah status |
| `/preview`           | Preview        | Halaman blog publik, nampilin artikel yang published, ada pagination |
| `/preview/:id`       | Preview detail | Tampilan lengkap satu artikel yang published                       |

## Yang perlu disiapkan

- Node.js 18+ (saya develop pakai Node 24)
- Backend API-nya harus sudah jalan duluan (lihat repo backend)

## Cara menjalankan

```bash
npm install
copy .env.example .env      # isi VITE_API_URL sesuai alamat backend-nya
npm run dev
```

Aplikasinya jalan di `http://localhost:5173`.

## Build untuk production

```bash
npm run build      # hasilnya file statis di dist/
npm run preview     # coba jalankan hasil build-nya secara lokal
```

`dist/` adalah situs statis murni , bisa dihosting di mana saja.

## Konfigurasi

| Variable        | Default                 | Keterangan                        |
| --------------- | ------------------------ | ------------------------------- |
| `VITE_API_URL`  | `http://localhost:8080`  | URL backend API (ganti sesuai alamat repo backend yang jalan/di-deploy) |
