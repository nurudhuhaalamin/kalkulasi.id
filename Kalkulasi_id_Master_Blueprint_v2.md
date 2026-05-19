# Kalkulasi.id Master Blueprint
*Versi 2.0 — Revisi Kebijakan Istilah & Penamaan Tool*

---

## 1. Tujuan Dokumen

Dokumen ini adalah pedoman kerja utama untuk membangun **Kalkulasi.id**: situs kalkulator finansial gratis, artikel finansial yang kaya, dan fondasi teknis yang kuat untuk SEO, AI Search, keamanan, dan integrasi pihak ketiga.

Dokumen ini disusun agar bisa dipakai bersama oleh:
- Tim konten
- Tim developer
- Tim SEO
- Tim desain/UI
- Tim QA

---

## 2. Visi Produk

Kalkulasi.id harus menjadi:

1. **Library tools keuangan yang terpercaya**
2. **Knowledge hub finansial yang kaya dan saling terhubung**
3. **Website yang mudah dirayapi mesin pencari**
4. **Website yang siap untuk AI Search / generative search**
5. **Website yang aman, rapi, dan mudah dikembangkan**

Prinsip utama:
- Setiap halaman harus bermanfaat untuk manusia.
- Setiap tool harus punya nilai praktis dan penjelasan edukatif.
- Setiap konten harus punya struktur yang jelas.
- Setiap link internal dan outbound harus valid.
- Setiap data konten harus punya source of truth.

---

## 3. Prinsip Desain Sistem

### 3.1. Bukan sekadar kalkulator
Setiap tool bukan hanya mesin hitung. Setiap tool harus punya:
- Penjelasan konsep
- Formula matematika
- Cara penggunaan
- Contoh hitung
- Batasan asumsi
- FAQ
- Referensi
- Link internal terkait
- Link outbound yang valid

### 3.2. Tidak semua tool harus real-time
Ada dua mode:

**A. Mode interaktif**
- Input user berubah
- Hasil dihitung setelah tombol ditekan
- Cocok untuk tool KPR, cicilan, bunga majemuk, risiko trading, pajak, dan simulasi investasi

**B. Mode referensi / edukatif**
- Tool menampilkan contoh hasil
- Cocok untuk tool yang tidak perlu update data market secara langsung
- Bisa tampilkan hasil simulasi berdasarkan parameter default

Aturan:
- Jangan memaksakan "real-time" kalau tidak dibutuhkan.
- Hasil baru muncul setelah klik tombol seperti **Hitung**, **Tampilkan Hasil**, atau **Simulasikan**.

### 3.3. Kebijakan Istilah Bilingual *(baru)*

Kalkulasi.id menggunakan **bahasa Indonesia sebagai bahasa utama antarmuka dan konten**, namun **tidak semua istilah harus dilokalkan**. Ada tiga prinsip yang mengatur keputusan ini:

**Prinsip 1 — Prioritaskan search intent**
Jika istilah bahasa Inggris jauh lebih banyak dicari oleh target pengguna Indonesia daripada padanannya, gunakan istilah Inggris. Contoh: orang mencari "DCA calculator", bukan "kalkulator investasi berkala".

**Prinsip 2 — Istilah teknis yang tidak ada padanan natural**
Istilah teknis yang tidak memiliki padanan Indonesia yang natural dan dikenal luas boleh dipertahankan dalam bahasa Inggris. Contoh: "position sizing", "leverage", "stop loss".

**Prinsip 3 — Istilah yang sudah diserap dan tidak awkward**
Istilah yang sudah diserap ke dalam bahasa Indonesia dan tidak terdengar aneh boleh dilokalkan. Contoh: "amortisasi", "likuidasi", "portofolio".

**Keputusan akhir selalu mempertimbangkan:**
- Volume pencarian istilah Indonesia vs. Inggris
- Naturalness dalam konteks audiens Indonesia
- Konsistensi dengan komunitas pengguna (trader, investor, dll.)

Lihat **Section 24.9** untuk daftar keputusan istilah yang sudah ditetapkan.

---

## 4. Information Architecture

### 4.1. Struktur URL yang direkomendasikan

Gunakan pola URL yang konsisten:

- `/` → homepage
- `/kalkulator` → hub semua kalkulator dan tools
- `/kalkulator/[kategori]` → daftar tool per kategori
- `/kalkulator/[kategori]/[slug]` → halaman detail tool
- `/artikel` → hub semua artikel
- `/artikel/[kategori]` → daftar artikel per kategori
- `/artikel/[kategori]/[slug]` → halaman artikel detail
- `/kamus-istilah` → kamus istilah
- `/tentang`
- `/hubungi-kami`
- `/ajukan-tool`
- `/kebijakan-privasi`
- `/syarat-ketentuan`
- `/penafian`
- `/kebijakan-cookie`

> **Catatan perubahan dari v1:** `/alat-hitung` diubah menjadi `/kalkulator` karena volume pencarian "kalkulator [X]" secara konsisten lebih tinggi daripada "alat hitung [X]" di Indonesia. Slug ini juga lebih konsisten dengan nama domain dan brand Kalkulasi.id.

### 4.2. Standar penamaan halaman publik

Gunakan nama halaman yang natural untuk audiens Indonesia. Label navigasi, judul halaman, dan slug publik harus konsisten.

| Jenis Halaman | Label Navigasi | Slug Publik |
|---|---|---|
| Beranda | Beranda | `/` |
| Hub tools | Kalkulator | `/kalkulator` |
| Kategori tool | Nama kategori Indonesia | `/kalkulator/[kategori]` |
| Detail tool | Nama tool (bisa hybrid Indo-Inggris) | `/kalkulator/[kategori]/[slug]` |
| Hub artikel | Artikel | `/artikel` |
| Kategori artikel | Nama kategori Indonesia | `/artikel/[kategori]` |
| Detail artikel | Judul artikel | `/artikel/[kategori]/[slug]` |
| Kamus istilah | Kamus Istilah | `/kamus-istilah` |
| Tentang | Tentang | `/tentang` |
| Kontak | Hubungi Kami | `/hubungi-kami` |
| Ajukan tool | Ajukan Tool | `/ajukan-tool` |
| Kebijakan privasi | Kebijakan Privasi | `/kebijakan-privasi` |
| Syarat dan ketentuan | Syarat & Ketentuan | `/syarat-ketentuan` |
| Penafian | Penafian | `/penafian` |
| Kebijakan cookie | Kebijakan Cookie | `/kebijakan-cookie` |

Aturan tambahan:
- Gunakan bahasa Indonesia untuk label navigasi yang tampil ke pengguna.
- Slug publik harus singkat, jelas, dan memakai kebab-case.
- Istilah Inggris yang lebih umum dikenal boleh dipakai pada nama tool dan slug tool (contoh: `/kalkulator/trading/position-sizing`, bukan `/kalkulator/trading/ukuran-posisi`).
- Nama halaman, slug, metadata, breadcrumb, dan menu navigasi harus berasal dari registry yang sama.
- Keputusan penggunaan istilah harus mengacu ke **Section 24.9**.

### 4.3. Aturan penting URL
- Pakai **kebab-case**
- Satu URL = satu intent utama
- Jangan ada route yang tidak dipakai
- Jangan ada URL yang hanya muncul di sitemap tapi tidak bisa dinavigasi dari UI
- Hindari slug yang mirip tapi maknanya berbeda

---

## 5. Struktur Folder yang Disarankan

Contoh struktur repo Kalkulasi.id yang direkomendasikan:

```txt
app/
  (site)/
    page.tsx
    kalkulator/
      page.tsx
      [kategori]/
        page.tsx
        [slug]/
          page.tsx
          ToolClientWrapper.tsx
    artikel/
      page.tsx
      [kategori]/
        page.tsx
        [slug]/
          page.tsx
    kamus-istilah/
      page.tsx
    tentang/page.tsx
    hubungi-kami/page.tsx
    ajukan-tool/page.tsx
    kebijakan-privasi/page.tsx
    syarat-ketentuan/page.tsx
    penafian/page.tsx
    kebijakan-cookie/page.tsx
  api/
  robots.ts
  sitemap.ts
  layout.tsx
  not-found.tsx

content/
  kalkulator/
    trading-saham-kripto/
    perpajakan/
    investasi/
    keuangan-pribadi/
    kredit-properti/
    saham/
    kripto/
  artikel/
    investasi/
    pasar-saham/
    trading-saham-kripto/
    perpajakan/
    keuangan-pribadi/
    kripto/
  kamus-istilah/

lib/
  content/
    tool-registry.ts
    artikel-registry.ts
    kamus-istilah-registry.ts
  calculators/
    trading-saham-kripto.ts
    perpajakan.ts
    investasi.ts
    properti.ts
    keuangan-pribadi.ts
    saham-kripto.ts
  schema/
    article.schema.ts
    tool.schema.ts
    organization.schema.ts
  seo/
    metadata.ts
    canonical.ts
    internal-links.ts
  validators/
    tool-validator.ts
    article-validator.ts
    link-validator.ts
  constants/
    site.ts
    routes.ts

components/
  layout/
    Header.tsx
    Footer.tsx
    MobileMenu.tsx
  seo/
    JsonLd.tsx
    Breadcrumbs.tsx
    FAQSection.tsx
  content/
    ContentCallout.tsx
    QuoteBlock.tsx
    ReferenceList.tsx
    RelatedLinks.tsx
  charts/
    LineChart.tsx
    BarChart.tsx
    AmortizationChart.tsx
  calculators/
    CalculatorForm.tsx
    ResultsPanel.tsx
    ToggleAdvanced.tsx
    ScenarioTable.tsx
  ui/
    Button.tsx
    Card.tsx
    Tabs.tsx
    Accordion.tsx
    Table.tsx
    Badge.tsx

public/
  icons/
  og/
  images/
  llms.txt
  manifest.json
```

### 5.1. Aturan folder
- **app/** hanya untuk routing, metadata, dan page composition
- **content/** hanya untuk data konten
- **lib/** hanya untuk logic, schema, helper, registry, validator
- **components/** hanya untuk UI reusable
- **public/** hanya aset statis

---

## 6. Model Data Inti

### 6.1. Tool data minimal
Setiap tool harus punya field seperti ini:

```ts
{
  id,
  slug,
  nama,                  // nama resmi tool (bisa Indo-Inggris hybrid)
  namaAlternatif,        // alias nama lain yang umum dicari (array string)
  kategori,
  ringkasan,
  deskripsiPanjang,
  intent,
  keywords,              // keyword Indonesia
  searchKeywords,        // keyword Inggris dan variasi bilingual untuk metadata
  formula,
  variableDefinitions,
  caraPakai,
  contoh,
  batasan,
  faq,
  referensi,
  internalLinks,
  outboundLinks,
  schemaTypes,
  visualAssets,
  updatedAt,
  reviewedAt,
  status,
}
```

> **Catatan:** Field `namaAlternatif` dan `searchKeywords` ditambahkan untuk mendukung strategi keyword bilingual. Contoh: tool "Kalkulator DCA" dapat memiliki `searchKeywords: ["DCA calculator", "dollar cost averaging calculator", "kalkulator investasi berkala"]`.

### 6.2. Artikel data minimal
Setiap artikel harus punya:

```ts
{
  id,
  slug,
  kategori,
  judul,
  ringkasan,
  intro,
  isi,
  relatedTools,
  relatedArticles,
  faq,
  referensi,
  tags,
  author,
  publishedAt,
  updatedAt,
  reviewedAt,
  status,
}
```

### 6.3. Satu source of truth
Angka penting seperti:
- jumlah tools
- kategori
- slug
- route
- metadata
- link internal

harus diambil dari satu registry pusat, bukan ditulis manual di banyak file.

---

## 7. Template Halaman Tool

Setiap halaman tool detail harus mengikuti urutan ini (label menggunakan Inggris karena ini spesifikasi internal developer):

1. **Hero section**
   - Judul tool
   - Ringkasan satu kalimat
   - CTA utama: `Hitung` / `Tampilkan Hasil`
   - Quick highlights (3–4 poin manfaat)

2. **Calculator section**
   - Form input
   - Toggle basic / advanced
   - Tombol aksi
   - Area hasil
   - Export/salin hasil (opsional)

3. **Results interpretation section**
   - Arti angka yang dihasilkan
   - Skenario terbaik / moderat / ekstrem
   - Catatan risiko bila relevan

4. **Visual section**
   - Grafik / chart
   - Tabel
   - Ikon atau progress indicator
   - Quote callout

5. **Education section**
   - Cara pakai step-by-step
   - Formula dan penjelasan variabel
   - Contoh perhitungan manual
   - Sejarah singkat konsep (bila relevan)

6. **SEO section**
   - FAQ
   - Related tools
   - Related artikel
   - Internal links
   - Outbound references

7. **Trust section**
   - Disclaimer
   - Last updated
   - Reviewed by
   - Source notes

### 7.1. Tool yang wajib diimplementasikan kuat
Tool berikut harus menjadi standar kualitas tertinggi karena jadi anchor traffic dan brand:
- Kalkulator KPR
- Kalkulator Break Even
- Kalkulator DCA
- Kalkulator Position Sizing
- Kalkulator PPh 21
- Kalkulator Dana Darurat
- Kalkulator Bunga Majemuk
- Kalkulator Untung/Rugi

---

## 8. Template Halaman Artikel

Setiap artikel wajib memiliki:

1. Judul yang spesifik
2. Ringkasan yang jelas
3. Intro yang menjawab intent
4. Subjudul terstruktur
5. Contoh angka
6. Tabel atau visual
7. Link internal ke tool terkait
8. Link outbound ke sumber otoritatif
9. FAQ
10. Referensi
11. Related reading

Aturan artikel:
- Jangan menulis artikel tipis
- Jangan menduplikasi topik dengan sudut pandang yang sama
- Setiap artikel harus punya nilai tambah unik
- Artikel harus menjembatani problem user menuju tool

---

## 9. Strategi Link Internal

### 9.1. Link wajib
Setiap halaman tool dan artikel harus punya:
- link ke kategori induk
- link ke 2–6 halaman terkait
- link ke halaman kamus istilah bila ada istilah teknis
- link ke artikel yang mendukung tool
- link ke tool yang relevan

### 9.2. Aturan linking
- Gunakan anchor text deskriptif
- Jangan overlink
- Jangan pakai anchor generik seperti "klik di sini"
- Link internal harus valid dan ada route-nya
- Landing page kategori harus jadi hub utama

### 9.3. Contoh pola link
- Tool KPR → artikel bunga, amortisasi, DP, refinancing
- Tool trading → artikel risk management, position sizing, psikologi trading
- Tool pajak → artikel PPh 21, pajak investasi, UMKM
- Tool investasi → artikel DCA, compounding, reksa dana, obligasi

---

## 10. Strategi Outbound Link

Outbound link harus:
- relevan
- otoritatif
- aman
- benar-benar mendukung konteks
- tidak dibuat asal banyak

Sumber outbound yang disarankan:
- regulator (OJK, BI, DJP, Bappebti)
- lembaga keuangan resmi
- dokumentasi pajak/otoritas
- buku atau referensi konsep yang kredibel
- dokumentasi teknis jika membahas metode/rumus

Aturan:
- jangan link ke halaman yang sering berubah kalau tidak penting
- jangan pakai link mati
- jangan pakai sumber lemah hanya untuk mengejar jumlah

---

## 11. SEO dan AI Search Requirements

### 11.1. Prinsip konten
Konten harus:
- bermanfaat (*helpful*)
- bisa diverifikasi (*reliable*)
- mengutamakan manusia (*people-first*)
- unik
- lengkap
- mudah diverifikasi

### 11.2. Meta penting
Setiap halaman harus punya:
- title unik
- description unik
- canonical
- Open Graph
- Twitter card
- robots directive yang benar
- language/lang yang tepat

### 11.3. Structured data
Gunakan schema sesuai halaman:
- `WebSite`
- `Organization`
- `BreadcrumbList`
- `Article`
- `FAQPage`
- `SoftwareApplication` bila cocok untuk tool yang bersifat aplikasi/kalkulator
- `WebPage` bila perlu

Aturan schema:
- harus cocok dengan konten yang terlihat
- jangan markup berlebihan
- jangan memalsukan FAQ
- jangan memberi schema pada elemen yang tidak tampil

### 11.4. AI Search readiness
Untuk tampil baik di AI search:
- halaman harus menjawab intent dengan cepat
- definisi harus jelas
- struktur heading harus rapi
- fakta dan angka harus eksplisit
- referensi harus kuat
- internal link harus membantu navigasi topik
- konten harus punya kedalaman, bukan hanya permukaan

### 11.5. Strategi keyword bilingual *(baru)*
Pengguna Indonesia mencari dengan dua bahasa, terutama untuk topik investasi dan trading. Strategi ini wajib diimplementasikan:

**Di metadata (title, description, keywords):**
- Gunakan nama tool resmi (Indonesia/hybrid) sebagai title utama
- Sertakan alias Inggris di description bila natural
- Contoh: `<title>Kalkulator DCA — Simulasi Dollar Cost Averaging</title>`

**Di konten halaman:**
- Sebutkan nama Inggris di paragraf pembuka dan FAQ
- Contoh: "Kalkulator DCA ini membantu kamu menghitung *dollar cost averaging* secara otomatis."

**Di field `searchKeywords` registry:**
- Daftarkan semua variasi keyword yang mungkin dicari
- Contoh untuk Kalkulator Position Sizing: `["position sizing", "position sizing calculator", "kalkulator position sizing", "ukuran posisi trading", "cara hitung lot"]`

**Tool dengan keyword bilingual tinggi:**

| Tool | Keyword Indonesia | Keyword Inggris |
|---|---|---|
| Kalkulator DCA | kalkulator investasi berkala | DCA calculator, dollar cost averaging |
| Kalkulator Position Sizing | kalkulator ukuran posisi | position sizing calculator |
| Kalkulator Break Even | kalkulator titik impas | break even calculator, BEP |
| Kalkulator Net Worth | kalkulator kekayaan bersih | net worth calculator |
| Kalkulator Bunga Majemuk | bunga majemuk | compound interest calculator |
| Kalkulator Leverage | kalkulator leverage | leverage calculator, margin calculator |
| Kalkulator Likuidasi | kalkulator likuidasi | liquidation calculator, liq price |
| Kalkulator Stop Loss / Take Profit | kalkulator SL/TP | stop loss calculator, take profit calculator |

---

## 12. Sitemap dan Robots

### 12.1. Sitemap
Sitemap harus:
- dihasilkan dari registry konten
- hanya berisi URL canonical
- tidak memasukkan halaman yang tidak penting
- punya `lastModified` yang nyata, bukan asal setiap build
- mencerminkan status konten

### 12.2. Robots
Robots.txt harus:
- mengizinkan halaman publik
- memblokir area internal yang tidak perlu
- menyertakan sitemap location
- tidak dipakai sebagai satu-satunya mekanisme keamanan

### 12.3. Catatan penting
Robots.txt itu untuk mengatur crawling, bukan untuk mengamankan data rahasia.

---

## 13. Desain Visual Konten

Konten harus dibantu visual yang berguna:
- tabel
- chart
- step cards
- badges
- callout box
- quotes
- accordion FAQ
- toggle advanced/basic
- tab comparison

Aturan visual:
- visual harus menjelaskan angka
- jangan dekorasi kosong
- jangan terlalu banyak warna
- gunakan hierarki visual yang konsisten
- sediakan tampilan mobile yang nyaman

---

## 14. Keamanan

### 14.1. Wajib ada
- input validation
- output sanitization
- security headers
- CSP
- proteksi terhadap injection/XSS
- pembatasan third-party script
- environment variable yang rapi
- audit dependency

### 14.2. Third-party scripts
Semua script eksternal harus:
- dicatat
- dibatasi
- dipasang secara konsisten
- diuji dampaknya pada performa

### 14.3. Prinsip aman
- jangan simpan secret di repo
- jangan hardcode kunci API
- jangan render HTML mentah tanpa sanitasi
- jangan trust input user

---

## 15. Integrasi Pihak Ketiga

Sediakan layer integrasi terpisah untuk:
- Google Analytics
- Google Tag Manager
- Search Console verification
- Meta pixel
- consent banner
- email capture bila ada

Aturan:
- jangan campur kode analitik ke semua komponen
- buat satu file konfigurasi pusat
- semua script tracking harus mudah dimatikan
- dokumentasikan ID dan environment masing-masing

---

## 16. Naming Convention

### 16.1. File
- gunakan `kebab-case` untuk folder dan file non-komponen
- gunakan `PascalCase` untuk komponen React
- gunakan nama file yang sesuai isi

### 16.2. Slug
- singkat
- deskriptif
- konsisten
- tidak memakai angka acak
- tidak memakai sinonim yang membingungkan
- istilah Inggris yang lebih dikenal boleh dipakai dalam slug (contoh: `/position-sizing`, `/dca`, `/break-even`)

### 16.3. Branch git
- `feat/...`
- `fix/...`
- `refactor/...`
- `content/...`
- `seo/...`

---

## 17. Quality Gate Sebelum Publish

Setiap halaman baru harus lolos checklist ini:

- [ ] URL valid
- [ ] title unik
- [ ] description unik
- [ ] canonical benar
- [ ] schema valid
- [ ] internal links valid
- [ ] outbound links valid
- [ ] mobile layout aman
- [ ] page speed masuk akal
- [ ] copy tidak duplikat
- [ ] tidak ada typo kritis
- [ ] visual tidak rusak
- [ ] form/input tervalidasi
- [ ] metadata sosial lengkap
- [ ] robots/sitemap ter-update
- [ ] searchKeywords sudah diisi di registry *(tambahan)*
- [ ] nama tool sudah sesuai keputusan bilingual (Section 24.9) *(tambahan)*

---

## 18. Urutan Pengerjaan Blueprint dan Eksekusi

Bagian ini mengatur urutan kerja yang harus diikuti agar Kalkulasi.id dibangun dengan disiplin, tidak lompat-lompat, dan tidak menimbulkan rework besar.

### 18.1. Prinsip urutan kerja
Urutan kerja selalu dimulai dari:
1. definisi posisi brand,
2. penetapan taxonomy,
3. registry tool dan artikel,
4. template halaman,
5. sistem metadata dan schema,
6. keamanan dan indeksasi,
7. produksi konten,
8. QA dan peluncuran.

Aturan ini penting:
- jangan menulis konten sebelum taxonomy final,
- jangan membuat tool sebelum registry disepakati,
- jangan menambah route sebelum pola URL ditetapkan,
- jangan membuat artikel tanpa cluster tool pendukung,
- jangan mengandalkan penamaan spontan per halaman.

### 18.2. Phase 0 — Brand, positioning, dan target pasar
Tujuan:
- memastikan Kalkulasi.id punya arah yang jelas untuk pasar Indonesia,
- menetapkan bahasa utama, tone, dan ruang lingkup topik,
- membedakan Kalkulasi.id dari proyek lama.

Output wajib:
- pernyataan positioning brand,
- daftar persona pengguna,
- daftar problem utama pengguna Indonesia,
- prinsip bahasa dan gaya penulisan,
- batasan topik yang tidak masuk scope.

### 18.3. Phase 1 — Taxonomy, kategori, dan source of truth
Tujuan:
- merapikan struktur kategori,
- menetapkan nama tool inti,
- menetapkan route dan slug final,
- menyusun registry pusat.

Output wajib:
- master category map,
- tool registry (termasuk `searchKeywords` dan `namaAlternatif`),
- artikel registry,
- kamus istilah registry,
- route map,
- internal link map.

Keputusan yang harus final di fase ini:
- kategori utama,
- subkategori,
- istilah yang dipakai di navigasi,
- format penamaan tool,
- daftar tool prioritas tinggi,
- keputusan istilah bilingual (mengacu Section 24.9).

### 18.4. Phase 2 — Template halaman dan komponen reusable
Tujuan:
- membuat pola halaman yang konsisten,
- memastikan semua tool dan artikel memakai struktur yang sama,
- mengurangi variasi layout yang tidak perlu.

Output wajib:
- template halaman tool,
- template halaman artikel,
- template kategori,
- komponen FAQ,
- komponen referensi,
- komponen related links,
- komponen calculator form,
- komponen hasil.

### 18.5. Phase 3 — Sistem konten inti
Tujuan:
- mengisi tool prioritas tinggi,
- menulis artikel cluster pendukung,
- membangun koneksi internal antarhalaman.

Output wajib:
- halaman tool prioritas tinggi,
- artikel pendukung prioritas tinggi,
- FAQ per halaman,
- referensi outbound yang valid,
- internal link antarcluster.

### 18.6. Phase 4 — SEO, schema, dan indeksasi
Tujuan:
- memastikan halaman mudah dirayapi,
- metadata konsisten,
- schema sesuai isi,
- sitemap dan robots rapi.

Output wajib:
- metadata per halaman,
- schema JSON-LD,
- sitemap dinamis,
- robots.txt,
- canonical rules,
- audit indexability.

### 18.7. Phase 5 — Keamanan, analytics, dan kontrol kualitas
Tujuan:
- memastikan situs aman,
- tracking tertata,
- script pihak ketiga terkontrol,
- performa tidak terganggu.

Output wajib:
- security headers,
- CSP,
- audit third-party scripts,
- analytics configuration,
- consent banner bila diperlukan,
- checklist dependency.

### 18.8. Phase 6 — QA final dan publikasi
Tujuan:
- memastikan seluruh sistem siap dirilis,
- meminimalkan broken link, typo, dan mismatch data.

Output wajib:
- crawl internal,
- validasi 404,
- validasi mobile,
- validasi performa dasar,
- validasi title/description/canonical,
- validasi schema,
- checklist launch.

---

## 19. Pembagian Tugas Tim

### 19.1. Tim Konten
Bertanggung jawab atas:
- outline konten,
- penulisan tool copy,
- penulisan artikel,
- FAQ,
- referensi,
- mapping internal link,
- penyesuaian bahasa untuk audiens Indonesia,
- keputusan istilah per tool (mengacu Section 24.9).

### 19.2. Tim Developer
Bertanggung jawab atas:
- struktur folder,
- registry data (termasuk `searchKeywords` dan `namaAlternatif`),
- komponen UI,
- kalkulasi,
- metadata,
- sitemap/robots,
- integrasi analytics,
- security headers,
- route consistency.

### 19.3. Tim SEO
Bertanggung jawab atas:
- keyword mapping (Indonesia dan Inggris),
- search intent mapping,
- schema strategy,
- internal linking,
- canonical rules,
- indexation strategy,
- taxonomy validation,
- audit keyword bilingual per tool.

### 19.4. Tim QA
Bertanggung jawab atas:
- validasi route,
- validasi link,
- validasi formula,
- responsif layout,
- error handling,
- regression test,
- kesesuaian copy dengan brand Kalkulasi.id,
- kesesuaian nama tool dengan keputusan bilingual.

---

## 20. Definition of Done

Satu tool dianggap selesai bila:
- ada halaman detail yang lengkap,
- hasil dapat dihitung dengan benar,
- ada cara pakai,
- ada formula,
- ada FAQ,
- ada referensi,
- ada internal link,
- ada outbound link,
- ada schema yang sesuai,
- ada visual pendukung,
- `searchKeywords` sudah diisi di registry,
- nama tool sudah sesuai keputusan bilingual,
- lolos QA link dan metadata.

Satu artikel dianggap selesai bila:
- menjawab intent,
- unik,
- punya struktur heading rapi,
- punya link internal dan outbound,
- ada referensi,
- ada schema bila perlu,
- lolos review konten dan SEO.

---

## 21. Prioritas Rebuild Kalkulasi.id

Kalau harus dimulai dari nol secara bertahap, urutannya begini:

1. **Kunci brand, positioning, dan taxonomy**
2. **Tetapkan keputusan istilah bilingual** *(ditambahkan)*
3. **Bangun registry konten** (dengan `searchKeywords`)
4. **Buat template tool**
5. **Buat template artikel**
6. **Tambahkan schema dan metadata**
7. **Rapi-kan sitemap dan robots**
8. **Integrasi analytics dan security**
9. **Isi konten prioritas tinggi**
10. **QA dan launch**

---

## 22. Catatan Operasional

- Jangan tambah halaman baru tanpa registry.
- Jangan ubah slug tanpa update link map.
- Jangan update copy angka secara manual di banyak file.
- Jangan membuat tools baru sebelum template tool matang.
- Jangan mengejar jumlah konten sebelum kualitas struktur selesai.
- **Jangan memaksakan terjemahan Indonesia jika istilah Inggris lebih natural dan lebih banyak dicari** — selalu cek Section 24.9 sebelum menetapkan nama tool.
- Jangan mengubah kategori tanpa memperbarui registry dan internal link map.
- Jangan menerbitkan tool yang belum punya tujuan, fungsi, input, output, dan referensi yang jelas.

---

## 23. Lampiran: Output yang Harus Dibuat Tim

### Dokumen yang wajib ada
- master content map
- tool registry (termasuk `searchKeywords` dan `namaAlternatif`)
- artikel registry
- kamus istilah registry
- internal link map
- outbound link list
- schema map
- route map
- category map
- security checklist
- SEO checklist
- QA checklist
- **daftar keputusan istilah bilingual** *(tambahan)*

### File teknis yang wajib ada
- `robots.ts`
- `sitemap.ts`
- `manifest.json`
- `metadata` di layout/page
- JSON-LD component
- validator link
- validator slug
- reusable calculator components

---

## 24. Katalog Utama Tool Kalkulasi.id

Bagian ini wajib ada di blueprint karena menjadi sumber kebenaran untuk tim konten dan developer.
Setiap tool harus didaftarkan di sini sebelum dibuat di codebase.

Blueprint ini menggunakan **bahasa Indonesia sebagai default untuk kategori dan navigasi**, namun **nama tool mengikuti keputusan bilingual** — istilah Inggris dipertahankan jika lebih umum dicari atau lebih natural dalam konteks penggunaan.

### 24.1. Fungsi katalog tool
Katalog ini dipakai untuk:
- menentukan prioritas produksi,
- mencegah duplikasi tool,
- menjaga konsistensi nama dan slug,
- memetakan kebutuhan user ke solusi yang tepat,
- memastikan setiap tool punya tujuan yang jelas.

### 24.2. Struktur taxonomy utama
Kategori utama Kalkulasi.id harus stabil dan tidak sering berubah. Kategori awal yang disarankan:

1. **Kredit Properti & KPR**
   - kebutuhan rumah, cicilan, uang muka, refinancing, kelayakan KPR.

2. **Investasi & Portofolio**
   - DCA, bunga majemuk, nilai masa depan, pensiun/FIRE, pertumbuhan aset.

3. **Trading Saham & Kripto**
   - untung/rugi, break even, risiko, position sizing, leverage, likuidasi, stop loss/take profit.

4. **Keuangan Pribadi**
   - dana darurat, anggaran, target tabungan, utang, net worth.

5. **Perpajakan**
   - PPh 21, PPh 23, estimasi pajak, rincian beban pajak.

6. **Pinjaman & Cicilan**
   - pinjaman umum, bunga, angsuran, amortisasi.

7. **Konversi & Simulasi Finansial**
   - kurs, inflasi, persentase, rasio keuangan.

### 24.3. Prinsip penamaan tool
Nama tool mengikuti pola berikut:
- **Kalkulator [objek]** — untuk tool hitung utama
- **Simulasi [objek]** — untuk tool proyeksi/skenario
- **Perencana [objek]** — untuk tool perencanaan finansial
- **Konverter [objek]** — untuk tool konversi
- **Analisis [objek]** — bila memang bukan kalkulator murni

Aturan penamaan:
- singkat dan deskriptif,
- **utamakan istilah yang paling banyak dicari** — Indonesia atau Inggris,
- konsisten antara heading, slug, metadata, dan registry,
- jangan memaksakan terjemahan Indonesia jika padanannya tidak natural atau tidak dicari,
- hindari nama yang terdengar seperti artikel, bukan tool,
- **semua keputusan mengacu ke Section 24.9**.

### 24.4. Field yang wajib dicatat untuk setiap tool
Setiap tool harus memiliki informasi berikut:

- Nama tool *(sesuai keputusan bilingual)*
- Nama alternatif / alias
- Kategori utama
- Subkategori
- Fungsi utama
- Intent pengguna
- Output yang dihasilkan
- Mode penggunaan
- Rumus / metode
- Data input
- Data output
- Keywords Indonesia
- Search keywords Inggris / bilingual
- Internal link terkait
- Artikel pendukung
- Referensi outbound
- Status pengerjaan
- Prioritas
- Catatan khusus

### 24.5. Instruksi pembuatan tool
Satu tool baru hanya boleh dibuat jika seluruh syarat berikut terpenuhi:
- intent-nya jelas,
- ada kebutuhan nyata pengguna Indonesia,
- tidak duplikatif dengan tool lain,
- rumus/metode sudah disepakati,
- konten pendukung siap,
- internal link cluster sudah ada,
- nama tool sudah final (termasuk keputusan bilingual),
- kategori dan slug sudah final.

Urutan pembuatan tool:
1. tetapkan intent,
2. tetapkan kategori,
3. tetapkan nama tool (cek Section 24.9),
4. tetapkan input dan output,
5. tetapkan rumus atau metode,
6. siapkan penjelasan dan contoh,
7. siapkan FAQ dan referensi,
8. siapkan internal link,
9. siapkan schema,
10. isi `searchKeywords` dan `namaAlternatif` di registry,
11. baru implementasi halaman.

### 24.6. Format katalog yang disarankan

| Nama Tool | Alias / Nama Alternatif | Kategori | Fungsi | Intent | Mode | Output | Slug | Status |
|---|---|---|---|---|---|---|---|---|
| Kalkulator KPR | KPR Calculator, Mortgage Calculator | Kredit Properti & KPR | Simulasi angsuran, bunga, DP | Hitung cicilan KPR | Interaktif | Angsuran, total bunga, total bayar | `kpr` | Prioritas tinggi |
| Kalkulator Uang Muka | DP Calculator, Down Payment | Kredit Properti & KPR | Simulasi kebutuhan DP | Hitung uang muka ideal | Interaktif | Besaran DP dan skenario cicilan | `uang-muka` | Prioritas tinggi |
| Kalkulator Kelayakan KPR | KPR Eligibility | Kredit Properti & KPR | Estimasi kemampuan ambil KPR | Cek kelayakan pembiayaan rumah | Interaktif | Estimasi plafon dan cicilan aman | `kelayakan-kpr` | Prioritas tinggi |
| Kalkulator DCA | DCA Calculator, Kalkulator Investasi Berkala, Dollar Cost Averaging | Investasi & Portofolio | Simulasi pembelian aset rutin | Rencana investasi berkala bulanan | Interaktif | Total modal, jumlah unit, rata-rata harga | `dca` | Prioritas tinggi |
| Kalkulator Bunga Majemuk | Compound Interest Calculator, Compounding | Investasi & Portofolio | Hitung pertumbuhan berbunga | Pertumbuhan aset jangka panjang | Interaktif | Nilai akhir dan pertumbuhan | `bunga-majemuk` | Prioritas tinggi |
| Kalkulator Nilai Masa Depan | Future Value Calculator | Investasi & Portofolio | Proyeksi nilai aset | Perencanaan target keuangan | Interaktif | Nilai proyeksi aset | `nilai-masa-depan` | Prioritas tinggi |
| Kalkulator Pensiun / FIRE | Retirement Calculator, FIRE Calculator | Investasi & Portofolio | Simulasi dana pensiun | Target kebebasan finansial | Interaktif | Target dana pensiun | `pensiun-fire` | Prioritas tinggi |
| Kalkulator Untung/Rugi | Profit Loss Calculator, P&L Calculator | Trading Saham & Kripto | Hitung laba rugi transaksi | Cek hasil transaksi | Interaktif | Profit, loss, BEP, persen | `untung-rugi` | Prioritas tinggi |
| Kalkulator Break Even | Break Even Calculator, Kalkulator Titik Impas, BEP | Trading Saham & Kripto | Hitung harga impas | Menentukan level impas | Interaktif | Harga impas dan persentase | `break-even` | Prioritas tinggi |
| Kalkulator Position Sizing | Position Sizing Calculator, Kalkulator Ukuran Posisi | Trading Saham & Kripto | Hitung ukuran posisi aman | Manajemen risiko trading | Interaktif | Ukuran posisi yang disarankan | `position-sizing` | Prioritas tinggi |
| Kalkulator Risiko per Transaksi | Risk per Trade Calculator | Trading Saham & Kripto | Batasi risiko per entry | Mengatur loss maksimum | Interaktif | Nominal risiko per transaksi | `risiko-transaksi` | Prioritas tinggi |
| Kalkulator Leverage | Leverage Calculator, Margin Calculator | Trading Saham & Kripto | Simulasi efek leverage | Risiko margin | Interaktif | Exposure, margin, likuidasi | `leverage` | Prioritas tinggi |
| Kalkulator Likuidasi | Liquidation Calculator, Liq Price | Trading Saham & Kripto | Estimasi harga likuidasi | Cek risiko margin call | Interaktif | Harga likuidasi dan buffer risiko | `likuidasi` | Prioritas tinggi |
| Kalkulator Stop Loss / Take Profit | SL/TP Calculator, Stop Loss Calculator | Trading Saham & Kripto | Hitung level SL dan TP ideal | Manajemen risiko dan target profit | Interaktif | Level SL, TP, rasio risk/reward | `stop-loss-take-profit` | Prioritas tinggi |
| Kalkulator Dana Darurat | Emergency Fund Calculator | Keuangan Pribadi | Hitung dana darurat ideal | Perencanaan keamanan finansial | Interaktif | Target dana darurat | `dana-darurat` | Prioritas tinggi |
| Perencana Anggaran Bulanan | Budget Planner | Keuangan Pribadi | Susun alokasi pendapatan | Pengelolaan arus kas | Interaktif | Alokasi pos pengeluaran | `anggaran-bulanan` | Prioritas sedang |
| Kalkulator Target Tabungan | Savings Goal Calculator | Keuangan Pribadi | Hitung target menabung | Mencapai target pembelian | Interaktif | Nominal tabungan per periode | `target-tabungan` | Prioritas sedang |
| Kalkulator Pelunasan Utang | Debt Payoff Calculator | Keuangan Pribadi | Rencana bayar utang | Mempercepat bebas utang | Interaktif | Jadwal dan kebutuhan pembayaran | `pelunasan-utang` | Prioritas tinggi |
| Kalkulator Net Worth | Net Worth Calculator, Kalkulator Kekayaan Bersih | Keuangan Pribadi | Hitung aset dan liabilitas | Melihat posisi finansial | Interaktif | Nilai kekayaan bersih | `net-worth` | Prioritas sedang |
| Kalkulator PPh 21 | PPh 21 Calculator | Perpajakan | Simulasi pajak penghasilan | Estimasi kewajiban PPh 21 | Interaktif | Estimasi pajak dan potongan | `pph-21` | Prioritas tinggi |
| Kalkulator PPh 23 | PPh 23 Calculator | Perpajakan | Simulasi pemotongan pajak | Estimasi kewajiban PPh 23 | Interaktif | Estimasi potongan dan beban | `pph-23` | Prioritas sedang |
| Estimasi Pajak | Tax Estimator | Perpajakan | Simulasi beban pajak umum | Perkiraan kewajiban pajak | Interaktif | Estimasi total pajak | `estimasi-pajak` | Prioritas tinggi |
| Kalkulator Pinjaman | Loan Calculator | Pinjaman & Cicilan | Hitung pinjaman dan cicilan | Simulasi pembiayaan umum | Interaktif | Cicilan, tenor, bunga | `pinjaman` | Prioritas sedang |
| Kalkulator Angsuran | Installment Calculator | Pinjaman & Cicilan | Simulasi cicilan tetap | Menghitung pembayaran rutin | Interaktif | Besaran angsuran | `angsuran` | Prioritas sedang |
| Kalkulator Bunga Pinjaman | Loan Interest Calculator | Pinjaman & Cicilan | Hitung bunga pinjaman | Estimasi biaya pinjaman | Interaktif | Biaya bunga total | `bunga-pinjaman` | Prioritas sedang |
| Kalkulator Amortisasi | Amortization Calculator, Amortization Schedule | Pinjaman & Cicilan | Rincian pelunasan per periode | Melihat struktur cicilan | Interaktif | Tabel amortisasi | `amortisasi` | Prioritas sedang |
| Konverter Mata Uang | Currency Converter | Konversi & Simulasi Finansial | Konversi kurs antar mata uang | Hitung nilai tukar | Referensi / Interaktif | Nilai konversi | `konverter-mata-uang` | Prioritas sedang |
| Kalkulator Inflasi | Inflation Calculator | Konversi & Simulasi Finansial | Simulasi daya beli | Melihat dampak inflasi | Interaktif | Nilai riil dan penurunan daya beli | `inflasi` | Prioritas sedang |
| Kalkulator Persentase | Percentage Calculator | Konversi & Simulasi Finansial | Hitung persen sederhana | Kebutuhan hitung cepat | Interaktif | Nilai persentase | `persentase` | Prioritas tinggi |
| Kalkulator Rasio Keuangan | Financial Ratio Calculator | Konversi & Simulasi Finansial | Hitung rasio dasar keuangan | Analisis cepat finansial | Interaktif | Rasio dasar yang relevan | `rasio-keuangan` | Prioritas sedang |

### 24.7. Kriteria prioritas pengembangan
Prioritas tinggi diberikan pada tool yang:
- paling sering dicari (volume keyword tertinggi),
- paling kuat potensi traffic,
- paling sering dipakai secara praktis,
- paling penting untuk klaster konten,
- paling mudah dijelaskan dan diverifikasi.

Urutan prioritas awal yang disarankan:
1. Kalkulator KPR
2. Kalkulator DCA
3. Kalkulator Untung/Rugi
4. Kalkulator Position Sizing
5. Kalkulator PPh 21
6. Kalkulator Dana Darurat
7. Kalkulator Break Even
8. Kalkulator Bunga Majemuk
9. Kalkulator Pelunasan Utang
10. Kalkulator Persentase

### 24.8. Aturan evolusi katalog
- Katalog harus menjadi source of truth tunggal.
- Penambahan tool baru wajib masuk registry dulu sebelum coding.
- Perubahan nama tool wajib diikuti update slug, metadata, internal link, sitemap, dan copy halaman.
- Kategori tidak boleh berubah tanpa evaluasi dampak ke artikel, link, dan navigasi.
- Tool yang belum punya referensi atau penjelasan memadai jangan diprioritaskan.

### 24.9. Daftar Resmi Istilah Bilingual *(baru)*

Bagian ini adalah **tabel keputusan resmi** yang menentukan istilah mana yang dipertahankan dalam bahasa Inggris, mana yang dilokalkan, dan mana yang boleh hybrid. Ini adalah referensi wajib untuk tim konten, SEO, dan developer.

**Legenda:**
- ✅ Inggris — gunakan istilah Inggris (label, nama tool, slug)
- 🇮🇩 Indonesia — gunakan terjemahan Indonesia
- 🔀 Hybrid — nama Indonesia + alias Inggris di metadata dan konten

#### Istilah Trading

| Istilah Inggris | Keputusan | Alasan | Contoh Penggunaan |
|---|---|---|---|
| Position Sizing | ✅ Inggris | Tidak ada padanan natural; trader Indonesia selalu pakai ini | "Kalkulator Position Sizing" |
| Stop Loss | ✅ Inggris | Istilah universal trading; terjemahan tidak dikenal | "Stop Loss" dalam konten dan label |
| Take Profit | ✅ Inggris | Sama seperti Stop Loss | "Take Profit" dalam konten dan label |
| Break Even | ✅ Inggris | Lebih dicari dari "titik impas" di konteks trading | "Kalkulator Break Even" |
| Leverage | ✅ Inggris | Tidak ada terjemahan yang natural dan dikenal | "Kalkulator Leverage" |
| Margin Call | ✅ Inggris | Istilah teknis yang tidak bisa diterjemahkan | Sebut langsung sebagai "margin call" |
| Likuidasi | 🇮🇩 Indonesia | Sudah diserap, umum di komunitas kripto Indonesia | "Kalkulator Likuidasi" |
| Risk/Reward Ratio | ✅ Inggris | Dikenal luas sebagai "R:R" di komunitas trader | Sebut sebagai "risk/reward ratio" |
| Lot | ✅ Inggris | Satuan universal trading yang tidak diterjemahkan | "ukuran lot" diperbolehkan sebagai konteks |

#### Istilah Investasi

| Istilah Inggris | Keputusan | Alasan | Contoh Penggunaan |
|---|---|---|---|
| DCA / Dollar Cost Averaging | ✅ Inggris | Volume pencarian "DCA" dan "DCA calculator" jauh lebih tinggi | "Kalkulator DCA" — sebutkan kepanjangannya di konten |
| FIRE | ✅ Inggris | Tidak ada padanan Indonesia yang diterima komunitas | "Kalkulator Pensiun / FIRE" |
| Compound Interest | 🔀 Hybrid | "Bunga majemuk" dikenal tapi "compound interest" juga banyak dicari | Nama: "Kalkulator Bunga Majemuk"; alias: "Compound Interest Calculator" |
| Portofolio | 🇮🇩 Indonesia | Sudah diserap dan dikenal luas | "portofolio" |
| Return / ROI | ✅ Inggris | "Return investasi" lebih natural dari "imbal balik investasi" | "return investasi", "ROI" |
| Reksa Dana | 🇮🇩 Indonesia | Sudah istilah resmi Indonesia | "reksa dana" |

#### Istilah Keuangan Pribadi

| Istilah Inggris | Keputusan | Alasan | Contoh Penggunaan |
|---|---|---|---|
| Net Worth | ✅ Inggris | "Net worth" jauh lebih dicari dari "kekayaan bersih" | "Kalkulator Net Worth" |
| Budget / Budgeting | 🔀 Hybrid | "Anggaran" lebih natural di label, tapi "budget" umum | Nama: "Perencana Anggaran"; konteks: "budgeting" |
| Emergency Fund | 🔀 Hybrid | "Dana darurat" dikenal luas dan natural | Nama: "Kalkulator Dana Darurat"; alias: "Emergency Fund Calculator" |

#### Istilah Properti & Kredit

| Istilah Inggris | Keputusan | Alasan | Contoh Penggunaan |
|---|---|---|---|
| KPR | 🇮🇩 Indonesia | Ini sudah singkatan Indonesia (Kredit Pemilikan Rumah) | "Kalkulator KPR" |
| DP (Down Payment) | 🔀 Hybrid | "DP" sangat umum di Indonesia; "uang muka" juga dikenal | Nama: "Kalkulator Uang Muka (DP)" |
| Refinancing | ✅ Inggris | "Refinansiasi" tidak natural; "refinancing" sudah dipakai bankir | "refinancing KPR" |
| Amortisasi | 🇮🇩 Indonesia | Sudah diserap dan dipakai secara resmi | "Kalkulator Amortisasi" |

#### Istilah Perpajakan

| Istilah Inggris | Keputusan | Alasan | Contoh Penggunaan |
|---|---|---|---|
| PPh 21 / PPh 23 | 🇮🇩 Indonesia | Singkatan resmi Indonesia (Pajak Penghasilan) | "Kalkulator PPh 21" |
| Tax Deductible | 🔀 Hybrid | "Pengurangan pajak" dipakai, tapi "deductible" umum di keuangan | Gunakan keduanya tergantung konteks |

#### Istilah Teknis (Internal Dev — selalu Inggris)

| Istilah | Status |
|---|---|
| SEO, CSP, JSON-LD, Open Graph | Tetap Inggris (teknis) |
| canonical, sitemap, robots.txt | Tetap Inggris (teknis) |
| registry, schema, metadata | Tetap Inggris (teknis) |
| slug, route, breadcrumb | Tetap Inggris (teknis) |
| TypeScript, React, component | Tetap Inggris (teknis) |

---

## Penutup

Kalkulasi.id harus dibangun sebagai **sistem konten yang disiplin**, bukan kumpulan halaman acak.

Prinsip bahasa yang digunakan bukan tentang memilih Indonesia atau Inggris secara kaku — melainkan tentang **memilih bahasa yang paling tepat untuk pengguna**. Nama tool yang tidak dicari pengguna tidak ada gunanya meski sudah diterjemahkan dengan baik.

Kalau semua aturan di atas dijalankan, hasil akhirnya bukan hanya lebih cantik, tetapi juga lebih kuat untuk:
- user,
- search engine,
- AI search,
- maintenance jangka panjang,
- dan pengembangan fitur berikutnya.
