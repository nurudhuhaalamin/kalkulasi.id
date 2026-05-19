import type { Tool } from "@/lib/validators/tool-validator";

export const TOOLS: Tool[] = [
  // ─── KREDIT PROPERTI & KPR ────────────────────────────────────────────────

  {
    id: "kpr",
    slug: "kpr",
    nama: "Kalkulator KPR",
    namaAlternatif: ["KPR Calculator", "Mortgage Calculator", "Kalkulator Cicilan Rumah"],
    kategori: "kredit-properti-kpr",
    ringkasan: "Simulasikan angsuran bulanan, total bunga, dan jadwal amortisasi KPR kamu.",
    deskripsiPanjang:
      "Kalkulator KPR membantu kamu menghitung estimasi cicilan bulanan berdasarkan harga properti, uang muka, suku bunga, dan tenor. Dilengkapi tabel amortisasi lengkap agar kamu tahu berapa pokok dan bunga yang dibayar setiap bulan.",
    intent: "Hitung cicilan KPR bulanan dan total biaya pemilikan rumah",
    keywords: ["kalkulator kpr", "cicilan rumah", "simulasi kpr", "angsuran kpr"],
    searchKeywords: ["kpr calculator", "mortgage calculator", "simulasi kpr", "cicilan kpr", "kalkulator cicilan rumah"],
    formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    variableDefinitions: {
      M: "Angsuran bulanan",
      P: "Pokok pinjaman (harga - uang muka)",
      r: "Suku bunga bulanan (bunga tahunan / 12)",
      n: "Jumlah bulan (tenor × 12)",
    },
    caraPakai: [
      "Masukkan harga properti yang ingin dibeli",
      "Masukkan persentase atau nominal uang muka (DP)",
      "Masukkan suku bunga KPR per tahun",
      "Masukkan tenor (lama cicilan) dalam tahun",
      "Klik Hitung untuk melihat angsuran bulanan dan tabel amortisasi",
    ],
    contoh:
      "Harga rumah Rp 500 juta, DP 20% (Rp 100 juta), suku bunga 9% per tahun, tenor 20 tahun → angsuran ~Rp 3,6 juta/bulan",
    batasan: [
      "Perhitungan menggunakan suku bunga tetap (flat rate)",
      "Tidak memperhitungkan biaya KPR lain seperti asuransi jiwa, asuransi kebakaran, provisi",
      "Suku bunga floating bank dapat berubah setiap periode",
      "Hasil adalah estimasi; angka final ditentukan oleh bank pemberi KPR",
    ],
    faq: [
      {
        pertanyaan: "Berapa DP minimal untuk KPR?",
        jawaban:
          "Secara umum, DP minimal KPR rumah pertama adalah 10–15% dari harga properti sesuai ketentuan OJK dan masing-masing bank.",
      },
      {
        pertanyaan: "Apakah suku bunga KPR bisa berubah?",
        jawaban:
          "Ya. Sebagian besar KPR di Indonesia menggunakan suku bunga fixed di awal (1–3 tahun pertama), lalu berubah menjadi floating mengikuti BI Rate.",
      },
      {
        pertanyaan: "Apa itu amortisasi KPR?",
        jawaban:
          "Amortisasi adalah rincian pembayaran cicilan per bulan yang menunjukkan berapa bagian yang merupakan pokok pinjaman dan berapa yang merupakan bunga.",
      },
    ],
    referensi: [
      {
        judul: "Ketentuan Loan to Value (LTV) OJK",
        url: "https://www.ojk.go.id/id/regulasi/otoritas-jasa-keuangan/peraturan-ojk/Pages/POJK-Nomor-20-POJK.03.2021.aspx",
        sumber: "OJK",
      },
    ],
    internalLinks: [
      { label: "Kalkulator Uang Muka (DP)", href: "/kalkulator/kredit-properti-kpr/uang-muka" },
      { label: "Kalkulator Kelayakan KPR", href: "/kalkulator/kredit-properti-kpr/kelayakan-kpr" },
      { label: "Kalkulator Amortisasi", href: "/kalkulator/pinjaman-cicilan/amortisasi" },
    ],
    outboundLinks: [
      { label: "Simulasi KPR Bank Indonesia", href: "https://www.bi.go.id" },
    ],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "uang-muka",
    slug: "uang-muka",
    nama: "Kalkulator Uang Muka",
    namaAlternatif: ["DP Calculator", "Down Payment Calculator", "Kalkulator DP Rumah"],
    kategori: "kredit-properti-kpr",
    ringkasan: "Hitung besaran uang muka ideal dan dampaknya terhadap cicilan KPR kamu.",
    deskripsiPanjang:
      "Kalkulator Uang Muka membantu kamu menentukan berapa DP yang perlu disiapkan untuk membeli properti, serta melihat bagaimana besar DP memengaruhi cicilan bulanan dan total bunga yang harus dibayar.",
    intent: "Hitung kebutuhan uang muka dan skenario cicilan KPR",
    keywords: ["kalkulator dp rumah", "uang muka kpr", "dp properti", "kalkulator uang muka"],
    searchKeywords: ["dp calculator", "down payment calculator", "dp rumah", "berapa dp kpr"],
    caraPakai: [
      "Masukkan harga properti",
      "Masukkan persentase DP yang diinginkan (10%, 20%, 30%, dll.)",
      "Kalkulator akan menampilkan besaran nominal DP dan estimasi cicilan untuk masing-masing skenario",
    ],
    contoh:
      "Rumah Rp 600 juta: DP 10% = Rp 60 juta (cicilan ~Rp 4,9 juta/bln), DP 30% = Rp 180 juta (cicilan ~Rp 3,5 juta/bln)",
    batasan: [
      "Estimasi cicilan menggunakan suku bunga default 9% per tahun dan tenor 20 tahun",
      "DP minimal yang berlaku tergantung kebijakan masing-masing bank",
    ],
    faq: [
      {
        pertanyaan: "Apakah DP lebih besar selalu lebih baik?",
        jawaban:
          "Tidak selalu. DP besar menurunkan cicilan dan total bunga, tapi menguras likuiditas. Pertimbangkan dana darurat dan kebutuhan investasi lain sebelum memutuskan.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator KPR", href: "/kalkulator/kredit-properti-kpr/kpr" },
      { label: "Kalkulator Dana Darurat", href: "/kalkulator/keuangan-pribadi/dana-darurat" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "kelayakan-kpr",
    slug: "kelayakan-kpr",
    nama: "Kalkulator Kelayakan KPR",
    namaAlternatif: ["KPR Eligibility Calculator", "Mortgage Affordability"],
    kategori: "kredit-properti-kpr",
    ringkasan: "Estimasi plafon KPR yang bisa kamu dapatkan berdasarkan penghasilan dan pengeluaran.",
    deskripsiPanjang:
      "Kalkulator ini membantu kamu memperkirakan seberapa besar KPR yang bisa disetujui bank berdasarkan penghasilan bulanan dan rasio cicilan terhadap penghasilan (DTI / Debt-to-Income ratio).",
    intent: "Cek kelayakan dan kapasitas pengambilan KPR",
    keywords: ["kelayakan kpr", "berapa kpr yang bisa saya ambil", "simulasi plafon kpr"],
    searchKeywords: ["kpr eligibility", "mortgage affordability", "berapa cicilan aman kpr"],
    caraPakai: [
      "Masukkan penghasilan bersih bulanan",
      "Masukkan total cicilan utang yang sudah ada (jika ada)",
      "Masukkan suku bunga dan tenor yang diinginkan",
      "Kalkulator akan menampilkan estimasi plafon KPR dan cicilan aman",
    ],
    contoh:
      "Gaji bersih Rp 10 juta/bln, tidak ada cicilan lain → plafon KPR estimasi ~Rp 350–400 juta (cicilan max 30% gaji)",
    batasan: [
      "Hasil adalah estimasi berdasarkan rasio DTI 30–35% yang umum dipakai bank",
      "Keputusan persetujuan KPR sepenuhnya ada di tangan bank setelah verifikasi dokumen",
    ],
    faq: [
      {
        pertanyaan: "Berapa persen cicilan KPR yang aman dari penghasilan?",
        jawaban:
          "Umumnya bank mensyaratkan total cicilan tidak melebihi 30–35% dari penghasilan bersih bulanan. Angka 25–30% dianggap paling aman untuk finansial jangka panjang.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator KPR", href: "/kalkulator/kredit-properti-kpr/kpr" },
      { label: "Kalkulator Dana Darurat", href: "/kalkulator/keuangan-pribadi/dana-darurat" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  // ─── INVESTASI & PORTOFOLIO ───────────────────────────────────────────────

  {
    id: "dca",
    slug: "dca",
    nama: "Kalkulator DCA",
    namaAlternatif: ["DCA Calculator", "Dollar Cost Averaging Calculator", "Kalkulator Investasi Berkala"],
    kategori: "investasi-portofolio",
    ringkasan: "Simulasikan strategi Dollar Cost Averaging: hitung rata-rata harga beli dan nilai portofolio kamu.",
    deskripsiPanjang:
      "Kalkulator DCA (Dollar Cost Averaging) membantu kamu mensimulasikan strategi investasi berkala — membeli aset dalam jumlah tetap setiap periode. Lihat bagaimana DCA meratakan risiko volatilitas harga dan membangun portofolio secara konsisten.",
    intent: "Simulasi dan perencanaan strategi investasi berkala (DCA)",
    keywords: ["kalkulator dca", "dollar cost averaging", "investasi berkala", "simulasi dca"],
    searchKeywords: ["DCA calculator", "dollar cost averaging calculator", "dca saham", "dca crypto", "investasi rutin bulanan"],
    formula: "Rata-rata harga = Total modal ÷ Total unit yang diperoleh",
    variableDefinitions: {
      "Total modal": "Jumlah seluruh investasi yang sudah dikeluarkan",
      "Total unit": "Jumlah unit/lembar aset yang dimiliki",
      "Rata-rata harga": "Harga beli rata-rata per unit",
    },
    caraPakai: [
      "Masukkan jumlah investasi per periode (misalnya Rp 500.000/bulan)",
      "Masukkan harga aset pada periode pertama",
      "Masukkan variasi harga atau gunakan mode otomatis dengan skenario naik/turun",
      "Klik Simulasikan untuk melihat total unit, rata-rata harga, dan nilai portofolio",
    ],
    contoh:
      "Investasi Rp 1 juta/bulan selama 12 bulan dengan harga berfluktuasi antara Rp 5.000–Rp 8.000 → total 12 juta, rata-rata harga ~Rp 6.200, total unit ~1.935",
    batasan: [
      "Simulasi menggunakan asumsi harga yang dimasukkan, bukan data pasar real-time",
      "Tidak memperhitungkan pajak atas keuntungan investasi",
      "Cocok untuk saham, reksa dana, atau kripto — tidak memperhitungkan dividen",
    ],
    faq: [
      {
        pertanyaan: "Apa itu DCA (Dollar Cost Averaging)?",
        jawaban:
          "DCA adalah strategi investasi dengan membeli aset dalam jumlah nominal tetap secara berkala (misalnya setiap bulan), terlepas dari kondisi harga pasar. Tujuannya meratakan harga beli rata-rata dan mengurangi risiko timing pasar.",
      },
      {
        pertanyaan: "DCA cocok untuk instrumen investasi apa?",
        jawaban:
          "DCA paling efektif untuk aset yang volatil namun memiliki tren naik jangka panjang, seperti saham indeks, reksa dana saham, atau kripto unggulan (Bitcoin, Ethereum).",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Bunga Majemuk", href: "/kalkulator/investasi-portofolio/bunga-majemuk" },
      { label: "Kalkulator Nilai Masa Depan", href: "/kalkulator/investasi-portofolio/nilai-masa-depan" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "bunga-majemuk",
    slug: "bunga-majemuk",
    nama: "Kalkulator Bunga Majemuk",
    namaAlternatif: ["Compound Interest Calculator", "Compounding Calculator", "Kalkulator Compounding"],
    kategori: "investasi-portofolio",
    ringkasan: "Hitung pertumbuhan investasi dengan efek bunga berbunga (compound interest).",
    deskripsiPanjang:
      "Kalkulator Bunga Majemuk menunjukkan kekuatan compounding — bagaimana investasi awal dan kontribusi rutin tumbuh secara eksponensial seiring waktu. Cocok untuk perencanaan investasi jangka panjang.",
    intent: "Simulasi pertumbuhan aset jangka panjang dengan bunga majemuk",
    keywords: ["bunga majemuk", "kalkulator bunga majemuk", "compound interest", "compounding investasi"],
    searchKeywords: ["compound interest calculator", "compounding calculator", "bunga berbunga", "pertumbuhan investasi"],
    formula: "A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]",
    variableDefinitions: {
      A: "Nilai akhir investasi",
      P: "Modal awal",
      r: "Suku bunga tahunan (desimal)",
      n: "Frekuensi penggabungan bunga per tahun",
      t: "Lama investasi (tahun)",
      PMT: "Kontribusi rutin per periode",
    },
    caraPakai: [
      "Masukkan modal awal investasi",
      "Masukkan kontribusi rutin (opsional)",
      "Masukkan estimasi return per tahun (%)",
      "Pilih frekuensi compounding (bulanan, tahunan, dll.)",
      "Masukkan jangka waktu investasi",
      "Klik Hitung untuk melihat proyeksi nilai akhir",
    ],
    contoh:
      "Modal Rp 10 juta + kontribusi Rp 1 juta/bln, return 12%/tahun selama 10 tahun → nilai akhir ~Rp 243 juta",
    batasan: [
      "Return investasi adalah estimasi dan tidak dijamin",
      "Tidak memperhitungkan inflasi secara otomatis",
      "Tidak memperhitungkan pajak atas keuntungan",
    ],
    faq: [
      {
        pertanyaan: "Mengapa bunga majemuk disebut 'keajaiban dunia ke-8'?",
        jawaban:
          "Karena bunga majemuk menghasilkan pertumbuhan eksponensial: bunga yang diperoleh ikut menghasilkan bunga baru, sehingga nilai investasi tumbuh semakin cepat seiring waktu.",
      },
      {
        pertanyaan: "Berapa return investasi yang realistis untuk compounding?",
        jawaban:
          "Reksa dana saham Indonesia rata-rata memberikan return 10–15% per tahun jangka panjang. Indeks S&P 500 historis sekitar 10% per tahun. Gunakan angka konservatif (8–10%) untuk proyeksi yang realistis.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator DCA", href: "/kalkulator/investasi-portofolio/dca" },
      { label: "Kalkulator Pensiun / FIRE", href: "/kalkulator/investasi-portofolio/pensiun-fire" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "nilai-masa-depan",
    slug: "nilai-masa-depan",
    nama: "Kalkulator Nilai Masa Depan",
    namaAlternatif: ["Future Value Calculator", "FV Calculator"],
    kategori: "investasi-portofolio",
    ringkasan: "Proyeksikan berapa nilai uang atau aset kamu di masa depan.",
    deskripsiPanjang:
      "Kalkulator Nilai Masa Depan membantu kamu memproyeksikan nilai investasi atau tabungan di masa mendatang berdasarkan modal awal, return yang diharapkan, dan jangka waktu.",
    intent: "Proyeksi nilai aset untuk perencanaan target keuangan",
    keywords: ["nilai masa depan", "future value", "proyeksi investasi", "kalkulator fv"],
    searchKeywords: ["future value calculator", "FV calculator", "nilai uang masa depan", "proyeksi tabungan"],
    formula: "FV = PV × (1 + r)^n",
    variableDefinitions: {
      FV: "Nilai masa depan",
      PV: "Nilai sekarang (present value)",
      r: "Return per periode",
      n: "Jumlah periode",
    },
    caraPakai: [
      "Masukkan nilai investasi saat ini (present value)",
      "Masukkan estimasi return per tahun",
      "Masukkan jangka waktu investasi",
      "Klik Hitung untuk melihat proyeksi nilai masa depan",
    ],
    contoh: "Rp 50 juta diinvestasikan selama 10 tahun dengan return 10%/tahun → Rp ~129,7 juta",
    batasan: [
      "Mengasumsikan return konstan — padahal return investasi bervariasi setiap tahun",
      "Tidak memperhitungkan inflasi",
    ],
    faq: [
      {
        pertanyaan: "Apa bedanya Future Value dan Present Value?",
        jawaban:
          "Present Value (PV) adalah nilai uang saat ini. Future Value (FV) adalah nilai uang tersebut di masa depan setelah memperoleh return atau bunga. FV selalu lebih besar dari PV karena efek waktu dan return.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Bunga Majemuk", href: "/kalkulator/investasi-portofolio/bunga-majemuk" },
      { label: "Kalkulator DCA", href: "/kalkulator/investasi-portofolio/dca" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "pensiun-fire",
    slug: "pensiun-fire",
    nama: "Kalkulator Pensiun / FIRE",
    namaAlternatif: ["Retirement Calculator", "FIRE Calculator", "Financial Independence Calculator"],
    kategori: "investasi-portofolio",
    ringkasan: "Hitung target dana pensiun dan kapan kamu bisa mencapai kebebasan finansial (FIRE).",
    deskripsiPanjang:
      "Kalkulator Pensiun / FIRE membantu kamu merencanakan target dana pensiun berdasarkan pengeluaran yang diinginkan saat pensiun, usia pensiun target, dan asumsi return investasi. Mendukung skenario FIRE (Financial Independence, Retire Early).",
    intent: "Perencanaan dana pensiun dan kebebasan finansial jangka panjang",
    keywords: ["kalkulator pensiun", "dana pensiun", "fire calculator", "kebebasan finansial"],
    searchKeywords: ["retirement calculator", "FIRE calculator", "financial independence", "early retirement", "berapa dana pensiun"],
    caraPakai: [
      "Masukkan pengeluaran bulanan yang diinginkan saat pensiun",
      "Masukkan usia saat ini dan target usia pensiun",
      "Masukkan estimasi return investasi per tahun",
      "Kalkulator akan menampilkan target dana pensiun dan berapa yang harus ditabung setiap bulan",
    ],
    contoh:
      "Pengeluaran pensiun Rp 10 juta/bln, target pensiun usia 55, return 8%/thn → dana pensiun yang dibutuhkan ~Rp 3 miliar",
    batasan: [
      "Menggunakan aturan 4% withdrawal rate sebagai default (FIRE standard)",
      "Tidak memperhitungkan BPJS Ketenagakerjaan atau program pensiun lain",
      "Inflasi dapat mengikis daya beli; gunakan return riil (return - inflasi) untuk akurasi lebih baik",
    ],
    faq: [
      {
        pertanyaan: "Apa itu FIRE (Financial Independence, Retire Early)?",
        jawaban:
          "FIRE adalah gerakan kebebasan finansial di mana seseorang mengumpulkan aset yang cukup untuk hidup dari hasil investasi tanpa perlu bekerja. Target umumnya adalah 25× pengeluaran tahunan.",
      },
      {
        pertanyaan: "Berapa dana pensiun yang dibutuhkan?",
        jawaban:
          "Aturan umum: kamu butuh 25× pengeluaran tahunan jika menggunakan withdrawal rate 4%. Contoh: pengeluaran Rp 120 juta/tahun → butuh dana Rp 3 miliar.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Bunga Majemuk", href: "/kalkulator/investasi-portofolio/bunga-majemuk" },
      { label: "Kalkulator DCA", href: "/kalkulator/investasi-portofolio/dca" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  // ─── TRADING SAHAM & KRIPTO ───────────────────────────────────────────────

  {
    id: "untung-rugi",
    slug: "untung-rugi",
    nama: "Kalkulator Untung/Rugi",
    namaAlternatif: ["Profit Loss Calculator", "P&L Calculator", "Kalkulator Profit Loss"],
    kategori: "trading-saham-kripto",
    ringkasan: "Hitung profit atau loss transaksi saham dan kripto, termasuk biaya transaksi.",
    deskripsiPanjang:
      "Kalkulator Untung/Rugi membantu trader menghitung hasil bersih setiap transaksi — berapa profit atau loss setelah memperhitungkan harga beli, harga jual, jumlah lot/unit, dan biaya transaksi (fee broker).",
    intent: "Cek hasil bersih transaksi saham atau kripto",
    keywords: ["kalkulator profit loss", "untung rugi saham", "profit trading", "hitung keuntungan saham"],
    searchKeywords: ["profit loss calculator", "P&L calculator", "trading profit calculator", "hitung untung saham", "unrealized profit"],
    formula: "P/L = (Harga Jual - Harga Beli) × Jumlah Unit - Biaya Transaksi",
    variableDefinitions: {
      "P/L": "Profit atau Loss",
      "Harga Jual": "Harga saat menjual aset",
      "Harga Beli": "Harga saat membeli aset",
      "Jumlah Unit": "Jumlah unit/lembar saham/koin",
      "Biaya Transaksi": "Fee broker beli + jual",
    },
    caraPakai: [
      "Masukkan harga beli per unit/lembar",
      "Masukkan harga jual per unit/lembar",
      "Masukkan jumlah unit (lot untuk saham, koin untuk kripto)",
      "Masukkan persentase fee broker (beli dan jual)",
      "Klik Hitung untuk melihat profit/loss dan persentase return",
    ],
    contoh:
      "Beli 10 lot BBCA @ Rp 9.000, jual @ Rp 9.500, fee 0,15%/0,25% → profit bersih ~Rp 4.662.500 (5,18%)",
    batasan: [
      "Untuk saham Indonesia: 1 lot = 100 lembar",
      "Tidak memperhitungkan pajak dividen atau PPh atas transaksi saham (0,1% dari nilai jual)",
      "Fee broker bervariasi; masukkan sesuai broker yang digunakan",
    ],
    faq: [
      {
        pertanyaan: "Apakah ada pajak saat menjual saham?",
        jawaban:
          "Ya. Di Indonesia, setiap penjualan saham di bursa dikenakan PPh Final 0,1% dari nilai penjualan bruto, dipotong langsung oleh broker.",
      },
      {
        pertanyaan: "Apa itu unrealized profit/loss?",
        jawaban:
          "Unrealized profit/loss adalah keuntungan atau kerugian yang ada di atas kertas — belum terealisasi karena posisi belum ditutup (saham belum dijual).",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Break Even", href: "/kalkulator/trading-saham-kripto/break-even" },
      { label: "Kalkulator Position Sizing", href: "/kalkulator/trading-saham-kripto/position-sizing" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "break-even",
    slug: "break-even",
    nama: "Kalkulator Break Even",
    namaAlternatif: ["Break Even Calculator", "Kalkulator Titik Impas", "BEP Calculator"],
    kategori: "trading-saham-kripto",
    ringkasan: "Hitung harga break even posisi trading kamu setelah memperhitungkan biaya transaksi.",
    deskripsiPanjang:
      "Kalkulator Break Even membantu trader mengetahui berapa harga jual minimum yang dibutuhkan agar transaksi tidak rugi (break even) setelah memperhitungkan fee broker beli dan jual.",
    intent: "Tentukan level harga impas untuk posisi trading",
    keywords: ["break even trading", "harga impas", "kalkulator bep", "titik impas saham"],
    searchKeywords: ["break even calculator", "BEP calculator", "break even point trading", "harga break even saham"],
    formula: "Break Even Price = Harga Beli × (1 + fee_beli) / (1 - fee_jual)",
    variableDefinitions: {
      "Break Even Price": "Harga jual minimum agar tidak rugi",
      "Harga Beli": "Harga entry posisi",
      fee_beli: "Fee saat membeli (desimal)",
      fee_jual: "Fee saat menjual (desimal)",
    },
    caraPakai: [
      "Masukkan harga beli per unit",
      "Masukkan persentase fee broker saat membeli",
      "Masukkan persentase fee broker saat menjual",
      "Klik Hitung untuk melihat harga break even dan persentase kenaikan yang dibutuhkan",
    ],
    contoh:
      "Beli @ Rp 10.000, fee beli 0,15%, fee jual 0,25% → break even @ ~Rp 10.040 (naik 0,4%)",
    batasan: [
      "Untuk saham Indonesia, tambahkan PPh 0,1% ke fee jual",
      "Tidak memperhitungkan biaya tambahan seperti levy atau VAT",
    ],
    faq: [
      {
        pertanyaan: "Mengapa break even bukan sama dengan harga beli?",
        jawaban:
          "Karena ada biaya transaksi (fee broker) saat beli dan jual. Harga jual harus menutup kedua biaya itu agar posisi tidak merugi.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Untung/Rugi", href: "/kalkulator/trading-saham-kripto/untung-rugi" },
      { label: "Kalkulator Stop Loss / Take Profit", href: "/kalkulator/trading-saham-kripto/stop-loss-take-profit" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "position-sizing",
    slug: "position-sizing",
    nama: "Kalkulator Position Sizing",
    namaAlternatif: ["Position Sizing Calculator", "Kalkulator Ukuran Posisi", "Kalkulator Lot Trading"],
    kategori: "trading-saham-kripto",
    ringkasan: "Hitung ukuran posisi yang tepat berdasarkan modal dan batas risiko per transaksi.",
    deskripsiPanjang:
      "Kalkulator Position Sizing membantu trader menentukan berapa besar posisi yang boleh dibuka agar risiko kerugian tidak melebihi batas yang ditetapkan. Fondasi manajemen risiko trading yang profesional.",
    intent: "Manajemen risiko: tentukan ukuran posisi trading yang aman",
    keywords: ["position sizing", "kalkulator position sizing", "ukuran lot trading", "manajemen risiko trading"],
    searchKeywords: ["position sizing calculator", "position sizing trading", "lot calculator forex", "cara hitung lot trading", "risk management calculator"],
    formula: "Ukuran Posisi = (Modal × % Risiko) ÷ (|Harga Entry - Stop Loss|)",
    variableDefinitions: {
      "Ukuran Posisi": "Jumlah unit/lot yang boleh dibeli",
      Modal: "Total modal trading",
      "% Risiko": "Persentase modal yang siap dirisikoper transaksi (biasanya 1–2%)",
      "Harga Entry": "Harga masuk posisi",
      "Stop Loss": "Harga stop loss yang sudah ditentukan",
    },
    caraPakai: [
      "Masukkan total modal trading",
      "Masukkan persentase risiko per transaksi (disarankan 1–2%)",
      "Masukkan harga entry yang direncanakan",
      "Masukkan harga stop loss",
      "Klik Hitung untuk melihat ukuran posisi yang disarankan",
    ],
    contoh:
      "Modal Rp 10 juta, risiko 2%, entry Rp 5.000, stop loss Rp 4.750 → risiko per saham Rp 250 → posisi = Rp 200.000 ÷ Rp 250 = 800 lembar (8 lot)",
    batasan: [
      "Untuk saham Indonesia, bulatkan ke kelipatan 100 lembar (1 lot)",
      "Hasil bisa berbeda untuk futures, forex, atau kripto yang menggunakan leverage",
      "Pastikan stop loss sudah ditetapkan sebelum menghitung position sizing",
    ],
    faq: [
      {
        pertanyaan: "Berapa persen risiko per transaksi yang disarankan?",
        jawaban:
          "Mayoritas trader profesional merekomendasikan 1–2% per transaksi. Dengan risiko 2%, kamu bisa mengalami 50 loss berturut-turut sebelum modal habis — memberikan cukup ruang untuk recovery.",
      },
      {
        pertanyaan: "Apa itu position sizing?",
        jawaban:
          "Position sizing adalah proses menentukan berapa besar modal yang dialokasikan untuk setiap transaksi, berdasarkan risiko yang bersedia ditanggung per transaksi.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Risiko per Transaksi", href: "/kalkulator/trading-saham-kripto/risiko-transaksi" },
      { label: "Kalkulator Stop Loss / Take Profit", href: "/kalkulator/trading-saham-kripto/stop-loss-take-profit" },
      { label: "Kalkulator Untung/Rugi", href: "/kalkulator/trading-saham-kripto/untung-rugi" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "risiko-transaksi",
    slug: "risiko-transaksi",
    nama: "Kalkulator Risiko per Transaksi",
    namaAlternatif: ["Risk per Trade Calculator", "Kalkulator Risiko Trading"],
    kategori: "trading-saham-kripto",
    ringkasan: "Hitung nominal risiko per transaksi berdasarkan posisi dan stop loss.",
    deskripsiPanjang:
      "Kalkulator ini membantu trader menghitung berapa rupiah yang dipertaruhkan dalam satu transaksi berdasarkan ukuran posisi, harga entry, dan level stop loss.",
    intent: "Mengetahui nominal kerugian maksimum per transaksi",
    keywords: ["risiko per transaksi", "kalkulator risiko trading", "risk per trade"],
    searchKeywords: ["risk per trade calculator", "trading risk calculator", "berapa risiko per trade"],
    formula: "Risiko = (Harga Entry - Stop Loss) × Jumlah Unit",
    variableDefinitions: {
      Risiko: "Nominal kerugian maksimum",
      "Harga Entry": "Harga masuk posisi",
      "Stop Loss": "Harga stop loss",
      "Jumlah Unit": "Jumlah unit/lot yang dibeli",
    },
    caraPakai: [
      "Masukkan harga entry",
      "Masukkan level stop loss",
      "Masukkan jumlah unit/lot",
      "Klik Hitung untuk melihat nominal risiko dan persentase dari modal",
    ],
    contoh: "Entry Rp 10.000, stop loss Rp 9.500, 10 lot (1.000 lembar) → risiko Rp 500.000",
    batasan: ["Tidak memperhitungkan slippage atau gap harga saat stop loss tereksekusi"],
    faq: [
      {
        pertanyaan: "Apakah stop loss selalu tereksekusi di harga yang ditentukan?",
        jawaban:
          "Tidak selalu. Dalam kondisi pasar yang sangat volatile atau saat ada gap harga (opening gap), stop loss bisa tereksekusi di harga yang lebih buruk dari yang ditentukan (slippage).",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Position Sizing", href: "/kalkulator/trading-saham-kripto/position-sizing" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "leverage",
    slug: "leverage",
    nama: "Kalkulator Leverage",
    namaAlternatif: ["Leverage Calculator", "Margin Calculator", "Kalkulator Margin"],
    kategori: "trading-saham-kripto",
    ringkasan: "Simulasikan efek leverage terhadap profit, loss, dan risiko margin call.",
    deskripsiPanjang:
      "Kalkulator Leverage membantu trader memahami efek penggunaan leverage — bagaimana leverage memperbesar potensi keuntungan sekaligus kerugian, serta di titik berapa margin call dapat terjadi.",
    intent: "Pahami risiko leverage sebelum membuka posisi margin",
    keywords: ["kalkulator leverage", "leverage trading", "margin call", "efek leverage"],
    searchKeywords: ["leverage calculator", "margin calculator", "leverage trading crypto", "margin call calculator"],
    caraPakai: [
      "Masukkan modal yang digunakan",
      "Pilih leverage (2x, 5x, 10x, dst.)",
      "Masukkan harga entry",
      "Kalkulator akan menampilkan exposure total, harga likuidasi, dan margin yang dibutuhkan",
    ],
    contoh:
      "Modal Rp 1 juta, leverage 10x → exposure Rp 10 juta. Penurunan harga 10% → kerugian Rp 1 juta (modal habis)",
    batasan: [
      "Leverage tersedia di pasar futures, CFD, dan kripto margin — tidak di saham spot Indonesia",
      "Leverage sangat berisiko; gunakan dengan pemahaman risiko penuh",
    ],
    faq: [
      {
        pertanyaan: "Apa itu leverage dalam trading?",
        jawaban:
          "Leverage adalah fasilitas dari broker yang memungkinkan trader mengendalikan posisi lebih besar dari modal yang dimiliki. Leverage 10x artinya dengan modal Rp 1 juta kamu bisa membuka posisi senilai Rp 10 juta.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Likuidasi", href: "/kalkulator/trading-saham-kripto/likuidasi" },
      { label: "Kalkulator Position Sizing", href: "/kalkulator/trading-saham-kripto/position-sizing" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "likuidasi",
    slug: "likuidasi",
    nama: "Kalkulator Likuidasi",
    namaAlternatif: ["Liquidation Calculator", "Liq Price Calculator", "Kalkulator Harga Likuidasi"],
    kategori: "trading-saham-kripto",
    ringkasan: "Estimasi harga likuidasi posisi kripto margin sebelum modal terkena forced liquidation.",
    deskripsiPanjang:
      "Kalkulator Likuidasi membantu trader kripto menghitung di harga berapa posisi mereka akan dilikuidasi paksa oleh exchange, serta berapa buffer risiko yang tersisa dari harga saat ini.",
    intent: "Cek risiko likuidasi posisi margin/futures kripto",
    keywords: ["kalkulator likuidasi", "harga likuidasi kripto", "liquidation price", "liq price"],
    searchKeywords: ["liquidation calculator", "liq price calculator", "crypto liquidation calculator", "binance liquidation", "bybit liquidation"],
    caraPakai: [
      "Pilih arah posisi (long atau short)",
      "Masukkan harga entry",
      "Masukkan leverage yang digunakan",
      "Masukkan margin maintenance rate exchange",
      "Klik Hitung untuk melihat harga likuidasi dan jarak dari harga saat ini",
    ],
    contoh:
      "Long BTC @ $30.000 dengan 10x leverage, maintenance margin 0,5% → harga likuidasi ~$27.000 (turun 10%)",
    batasan: [
      "Formula likuidasi berbeda antar exchange (Binance, Bybit, OKX, dll.)",
      "Funding rate dapat memengaruhi harga likuidasi aktual di posisi futures perpetual",
      "Hasil adalah estimasi; selalu pantau harga likuidasi di dashboard exchange",
    ],
    faq: [
      {
        pertanyaan: "Apa yang terjadi saat posisi dilikuidasi?",
        jawaban:
          "Ketika harga menyentuh level likuidasi, exchange akan menutup posisi secara paksa. Seluruh margin yang digunakan untuk posisi tersebut akan hilang.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Leverage", href: "/kalkulator/trading-saham-kripto/leverage" },
      { label: "Kalkulator Position Sizing", href: "/kalkulator/trading-saham-kripto/position-sizing" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "stop-loss-take-profit",
    slug: "stop-loss-take-profit",
    nama: "Kalkulator Stop Loss / Take Profit",
    namaAlternatif: ["SL/TP Calculator", "Stop Loss Calculator", "Take Profit Calculator"],
    kategori: "trading-saham-kripto",
    ringkasan: "Hitung level stop loss dan take profit optimal berdasarkan risk/reward ratio yang diinginkan.",
    deskripsiPanjang:
      "Kalkulator ini membantu trader menetapkan level stop loss dan take profit yang konsisten dengan strategi manajemen risiko, berdasarkan risk/reward ratio yang ditargetkan.",
    intent: "Tentukan level SL dan TP berdasarkan risk/reward ratio",
    keywords: ["stop loss take profit", "kalkulator sl tp", "risk reward ratio", "level stop loss"],
    searchKeywords: ["stop loss calculator", "take profit calculator", "SL TP calculator", "risk reward calculator", "R:R ratio calculator"],
    formula: "TP = Entry + (Entry - SL) × R:R Ratio (untuk long)",
    variableDefinitions: {
      TP: "Level Take Profit",
      Entry: "Harga masuk posisi",
      SL: "Level Stop Loss",
      "R:R Ratio": "Risk/Reward Ratio yang diinginkan",
    },
    caraPakai: [
      "Pilih arah posisi (long/buy atau short/sell)",
      "Masukkan harga entry",
      "Masukkan level stop loss",
      "Masukkan target risk/reward ratio (misalnya 1:2 atau 1:3)",
      "Klik Hitung untuk melihat level take profit dan nominal P/L per skenario",
    ],
    contoh:
      "Long entry Rp 5.000, SL Rp 4.800 (risiko Rp 200), R:R 1:2 → TP Rp 5.400 (profit Rp 400)",
    batasan: [
      "Risk/reward ratio tinggi tidak menjamin profitabilitas tanpa win rate yang memadai",
      "Level SL dan TP harus didukung analisis teknikal, bukan hanya perhitungan matematis",
    ],
    faq: [
      {
        pertanyaan: "Berapa risk/reward ratio yang disarankan?",
        jawaban:
          "Minimum 1:2 — artinya setiap Rp 1 yang dirisikkan, target profit minimal Rp 2. Dengan win rate 50% dan R:R 1:2, strategi sudah profitable.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Position Sizing", href: "/kalkulator/trading-saham-kripto/position-sizing" },
      { label: "Kalkulator Risiko per Transaksi", href: "/kalkulator/trading-saham-kripto/risiko-transaksi" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  // ─── KEUANGAN PRIBADI ─────────────────────────────────────────────────────

  {
    id: "dana-darurat",
    slug: "dana-darurat",
    nama: "Kalkulator Dana Darurat",
    namaAlternatif: ["Emergency Fund Calculator", "Kalkulator Emergency Fund"],
    kategori: "keuangan-pribadi",
    ringkasan: "Hitung berapa dana darurat ideal yang perlu kamu siapkan berdasarkan kondisi finansial kamu.",
    deskripsiPanjang:
      "Kalkulator Dana Darurat membantu kamu menentukan target dana darurat yang sesuai dengan situasi keuangan — pengeluaran bulanan, jumlah tanggungan, dan stabilitas penghasilan.",
    intent: "Perencanaan keamanan finansial jangka pendek",
    keywords: ["dana darurat", "kalkulator dana darurat", "emergency fund", "berapa dana darurat ideal"],
    searchKeywords: ["emergency fund calculator", "dana darurat ideal", "berapa dana darurat", "emergency fund Indonesia"],
    caraPakai: [
      "Masukkan total pengeluaran bulanan wajib (kebutuhan pokok, cicilan, tagihan)",
      "Pilih status pekerjaan (karyawan tetap, freelancer, wirausaha)",
      "Masukkan jumlah tanggungan",
      "Kalkulator akan merekomendasikan target dana darurat (3, 6, atau 12 bulan pengeluaran)",
    ],
    contoh:
      "Pengeluaran Rp 5 juta/bln, karyawan tetap, 2 tanggungan → dana darurat ideal 6 bulan = Rp 30 juta",
    batasan: [
      "Dana darurat sebaiknya disimpan di instrumen likuid dan aman (tabungan, deposito, reksa dana pasar uang)",
      "Jumlah tanggungan dan stabilitas penghasilan sangat memengaruhi jumlah ideal",
    ],
    faq: [
      {
        pertanyaan: "Berapa bulan pengeluaran yang harus jadi dana darurat?",
        jawaban:
          "Karyawan tetap: minimal 3–6 bulan. Freelancer/wirausaha: 6–12 bulan. Semakin tidak stabil penghasilan, semakin besar dana darurat yang dibutuhkan.",
      },
      {
        pertanyaan: "Di mana menyimpan dana darurat?",
        jawaban:
          "Dana darurat harus mudah dicairkan dan aman. Rekomendasi: tabungan bank, reksa dana pasar uang, atau deposito. Hindari saham atau kripto untuk dana darurat.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Net Worth", href: "/kalkulator/keuangan-pribadi/net-worth" },
      { label: "Perencana Anggaran Bulanan", href: "/kalkulator/keuangan-pribadi/anggaran-bulanan" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "anggaran-bulanan",
    slug: "anggaran-bulanan",
    nama: "Perencana Anggaran Bulanan",
    namaAlternatif: ["Budget Planner", "Kalkulator Anggaran", "Monthly Budget Planner"],
    kategori: "keuangan-pribadi",
    ringkasan: "Susun alokasi pendapatan bulanan dan lihat apakah keuangan kamu sudah sehat.",
    deskripsiPanjang:
      "Perencana Anggaran Bulanan membantu kamu mengalokasikan pendapatan ke berbagai pos pengeluaran menggunakan framework 50/30/20 atau alokasi kustom, dan melihat apakah pengeluaran sudah seimbang.",
    intent: "Pengelolaan arus kas dan perencanaan keuangan bulanan",
    keywords: ["anggaran bulanan", "budget planner", "perencanaan keuangan", "alokasi gaji"],
    searchKeywords: ["budget planner", "monthly budget calculator", "50 30 20 rule", "alokasi gaji bulanan", "kalkulator pengeluaran"],
    caraPakai: [
      "Masukkan total pendapatan bersih bulanan",
      "Masukkan pengeluaran di setiap kategori (kebutuhan, keinginan, tabungan)",
      "Pilih framework alokasi (50/30/20, 70/20/10, atau kustom)",
      "Lihat apakah alokasi sudah sesuai target dan berapa surplus/defisit",
    ],
    contoh:
      "Gaji Rp 8 juta, framework 50/30/20: kebutuhan Rp 4 juta, keinginan Rp 2,4 juta, tabungan/investasi Rp 1,6 juta",
    batasan: [
      "Framework 50/30/20 adalah panduan umum, bukan aturan kaku",
      "Kondisi keuangan setiap orang berbeda; sesuaikan dengan kebutuhan",
    ],
    faq: [
      {
        pertanyaan: "Apa itu aturan 50/30/20?",
        jawaban:
          "50% pendapatan untuk kebutuhan (makan, tempat tinggal, transportasi), 30% untuk keinginan (hiburan, makan di luar), dan 20% untuk tabungan dan investasi.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Dana Darurat", href: "/kalkulator/keuangan-pribadi/dana-darurat" },
      { label: "Kalkulator Target Tabungan", href: "/kalkulator/keuangan-pribadi/target-tabungan" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "target-tabungan",
    slug: "target-tabungan",
    nama: "Kalkulator Target Tabungan",
    namaAlternatif: ["Savings Goal Calculator", "Kalkulator Menabung"],
    kategori: "keuangan-pribadi",
    ringkasan: "Hitung berapa yang harus ditabung setiap bulan untuk mencapai target finansial kamu.",
    deskripsiPanjang:
      "Kalkulator Target Tabungan membantu kamu menghitung berapa nominal yang perlu disisihkan setiap bulan untuk mencapai target keuangan tertentu dalam jangka waktu yang ditentukan.",
    intent: "Perencanaan tabungan untuk mencapai target pembelian atau tujuan keuangan",
    keywords: ["target tabungan", "kalkulator menabung", "berapa harus nabung", "savings goal"],
    searchKeywords: ["savings goal calculator", "savings calculator", "berapa nabung per bulan", "rencana tabungan"],
    formula: "Tabungan bulanan = (Target - Modal awal) ÷ Jumlah bulan",
    variableDefinitions: {
      Target: "Nominal yang ingin dicapai",
      "Modal awal": "Tabungan yang sudah ada",
      "Jumlah bulan": "Jangka waktu pencapaian",
    },
    caraPakai: [
      "Masukkan target nominal yang ingin dicapai",
      "Masukkan tabungan yang sudah ada (jika ada)",
      "Masukkan jangka waktu (dalam bulan atau tahun)",
      "Opsional: masukkan return tabungan/investasi per tahun",
      "Klik Hitung untuk melihat berapa yang perlu ditabung per bulan",
    ],
    contoh: "Target Rp 100 juta dalam 24 bulan, tabungan awal Rp 10 juta → nabung Rp 3,75 juta/bulan",
    batasan: ["Tidak memperhitungkan inflasi secara default"],
    faq: [
      {
        pertanyaan: "Haruskah target tabungan memperhitungkan inflasi?",
        jawaban:
          "Sebaiknya ya, terutama untuk tujuan jangka panjang (5+ tahun). Inflasi Indonesia rata-rata 3–5% per tahun dapat mengikis nilai target secara signifikan.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Dana Darurat", href: "/kalkulator/keuangan-pribadi/dana-darurat" },
      { label: "Kalkulator Bunga Majemuk", href: "/kalkulator/investasi-portofolio/bunga-majemuk" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "pelunasan-utang",
    slug: "pelunasan-utang",
    nama: "Kalkulator Pelunasan Utang",
    namaAlternatif: ["Debt Payoff Calculator", "Kalkulator Bebas Utang"],
    kategori: "keuangan-pribadi",
    ringkasan: "Rencanakan strategi pelunasan utang dan lihat kapan kamu bisa bebas dari utang.",
    deskripsiPanjang:
      "Kalkulator Pelunasan Utang membantu kamu membuat rencana pembayaran utang yang terstruktur — berapa lama untuk lunas, berapa bunga yang bisa dihemat jika membayar lebih dari minimum, dan perbandingan strategi avalanche vs. snowball.",
    intent: "Perencanaan pelunasan utang secara sistematis",
    keywords: ["pelunasan utang", "kalkulator utang", "bebas utang", "debt payoff"],
    searchKeywords: ["debt payoff calculator", "debt snowball calculator", "debt avalanche calculator", "cara lunasi utang cepat"],
    caraPakai: [
      "Masukkan total saldo utang",
      "Masukkan suku bunga per tahun",
      "Masukkan pembayaran minimum bulanan",
      "Optionally tambah pembayaran ekstra per bulan",
      "Klik Hitung untuk melihat jadwal pelunasan dan total bunga yang dibayar",
    ],
    contoh:
      "Utang Rp 50 juta, bunga 12%/tahun, bayar Rp 1,5 juta/bln → lunas dalam 41 bulan, bunga Rp 11,5 juta",
    batasan: ["Tidak memperhitungkan penalti pelunasan dipercepat (jika ada)"],
    faq: [
      {
        pertanyaan: "Apa bedanya strategi Avalanche dan Snowball?",
        jawaban:
          "Avalanche: lunasi utang dengan bunga tertinggi dulu (menghemat lebih banyak bunga). Snowball: lunasi utang terkecil dulu (motivasi psikologis lebih kuat). Pilih sesuai prioritas kamu.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Dana Darurat", href: "/kalkulator/keuangan-pribadi/dana-darurat" },
      { label: "Kalkulator Pinjaman", href: "/kalkulator/pinjaman-cicilan/pinjaman" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "net-worth",
    slug: "net-worth",
    nama: "Kalkulator Net Worth",
    namaAlternatif: ["Net Worth Calculator", "Kalkulator Kekayaan Bersih"],
    kategori: "keuangan-pribadi",
    ringkasan: "Hitung kekayaan bersih kamu dari total aset dikurangi total liabilitas.",
    deskripsiPanjang:
      "Kalkulator Net Worth membantu kamu menghitung posisi finansial bersih dengan menjumlahkan semua aset (tabungan, investasi, properti) dan menguranginya dengan semua kewajiban/utang.",
    intent: "Mengetahui posisi finansial bersih saat ini",
    keywords: ["net worth", "kekayaan bersih", "kalkulator net worth", "hitung aset liabilitas"],
    searchKeywords: ["net worth calculator", "kalkulator kekayaan bersih", "net worth Indonesia", "cara hitung net worth"],
    caraPakai: [
      "Masukkan semua aset: tabungan, investasi, properti, kendaraan, dll.",
      "Masukkan semua liabilitas: KPR, cicilan, kartu kredit, pinjaman, dll.",
      "Kalkulator otomatis menghitung net worth = total aset - total liabilitas",
    ],
    contoh:
      "Aset: tabungan Rp 30 juta + saham Rp 50 juta + rumah Rp 800 juta = Rp 880 juta. Liabilitas: KPR sisa Rp 400 juta. Net Worth = Rp 480 juta",
    batasan: ["Nilai aset seperti properti dan kendaraan adalah estimasi — gunakan nilai pasar terkini"],
    faq: [
      {
        pertanyaan: "Berapa net worth yang baik di usia 30?",
        jawaban:
          "Tidak ada angka universal. Satu panduan umum: net worth ideal di usia X = (usia × penghasilan tahunan) ÷ 10. Tapi kondisi setiap orang berbeda.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Dana Darurat", href: "/kalkulator/keuangan-pribadi/dana-darurat" },
      { label: "Perencana Anggaran Bulanan", href: "/kalkulator/keuangan-pribadi/anggaran-bulanan" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  // ─── PERPAJAKAN ───────────────────────────────────────────────────────────

  {
    id: "pph-21",
    slug: "pph-21",
    nama: "Kalkulator PPh 21",
    namaAlternatif: ["PPh 21 Calculator", "Kalkulator Pajak Penghasilan", "Income Tax Calculator"],
    kategori: "perpajakan",
    ringkasan: "Simulasikan PPh 21 yang dipotong dari gaji berdasarkan status PTKP dan penghasilan.",
    deskripsiPanjang:
      "Kalkulator PPh 21 membantu karyawan dan pemberi kerja mengestimasi pajak penghasilan yang harus dipotong dari gaji bulanan, berdasarkan penghasilan bruto, PTKP (Penghasilan Tidak Kena Pajak), dan lapisan tarif progresif.",
    intent: "Estimasi kewajiban PPh 21 dan take-home pay",
    keywords: ["kalkulator pph 21", "pajak penghasilan", "pph 21", "simulasi pajak gaji"],
    searchKeywords: ["PPh 21 calculator", "kalkulator pajak gaji", "hitung pph 21", "income tax Indonesia", "tax calculator Indonesia"],
    caraPakai: [
      "Masukkan penghasilan bruto per bulan (gaji pokok + tunjangan)",
      "Pilih status PTKP (TK/0, K/0, K/1, K/2, K/3)",
      "Masukkan iuran BPJS yang ditanggung (jika ada)",
      "Klik Hitung untuk melihat penghasilan neto, PKP, PPh terutang, dan take-home pay",
    ],
    contoh:
      "Gaji bruto Rp 10 juta/bln, TK/0 (PTKP Rp 54 juta/tahun) → PPh 21 ~Rp 362.500/bln, take-home pay ~Rp 9,6 juta",
    batasan: [
      "Menggunakan tarif PPh dan PTKP yang berlaku; cek DJP untuk pembaruan tarif terbaru",
      "Tidak memperhitungkan biaya jabatan secara default (silakan aktifkan di pengaturan lanjutan)",
      "Untuk skema TER (Tarif Efektif Rata-rata) yang berlaku mulai 2024, gunakan mode TER",
    ],
    faq: [
      {
        pertanyaan: "Apa itu PTKP?",
        jawaban:
          "PTKP (Penghasilan Tidak Kena Pajak) adalah batas penghasilan yang tidak dikenakan pajak. Untuk TK/0 (tidak kawin, tanpa tanggungan) adalah Rp 54 juta/tahun atau Rp 4,5 juta/bulan.",
      },
      {
        pertanyaan: "Siapa yang wajib memotong PPh 21?",
        jawaban:
          "Pemberi kerja (perusahaan) wajib memotong, menyetor, dan melaporkan PPh 21 karyawan setiap bulan ke DJP.",
      },
    ],
    referensi: [
      {
        judul: "Peraturan PPh 21 — Direktorat Jenderal Pajak",
        url: "https://www.pajak.go.id/id/pph-pasal-21",
        sumber: "DJP",
      },
    ],
    internalLinks: [
      { label: "Kalkulator PPh 23", href: "/kalkulator/perpajakan/pph-23" },
      { label: "Estimasi Pajak", href: "/kalkulator/perpajakan/estimasi-pajak" },
    ],
    outboundLinks: [
      { label: "Informasi PTKP — DJP", href: "https://www.pajak.go.id" },
    ],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "pph-23",
    slug: "pph-23",
    nama: "Kalkulator PPh 23",
    namaAlternatif: ["PPh 23 Calculator", "Kalkulator Pajak Jasa"],
    kategori: "perpajakan",
    ringkasan: "Hitung PPh 23 yang dipotong dari pembayaran jasa, sewa, atau royalti.",
    deskripsiPanjang:
      "Kalkulator PPh 23 membantu menghitung potongan pajak yang berlaku untuk transaksi jasa, sewa, dividen, bunga, dan royalti antara badan hukum atau badan dengan orang pribadi.",
    intent: "Estimasi kewajiban PPh 23 atas penghasilan jasa dan sewa",
    keywords: ["pph 23", "kalkulator pph 23", "pajak jasa", "potongan pph 23"],
    searchKeywords: ["PPh 23 calculator", "hitung pph 23", "withholding tax Indonesia"],
    caraPakai: [
      "Masukkan nilai bruto transaksi",
      "Pilih jenis penghasilan (jasa, sewa, dividen, bunga, royalti)",
      "Kalkulator akan menampilkan tarif yang berlaku dan jumlah pajak yang dipotong",
    ],
    contoh: "Jasa konsultasi Rp 10 juta, penyedia ber-NPWP → PPh 23 = 2% × Rp 10 juta = Rp 200.000",
    batasan: [
      "Tarif 2% untuk yang ber-NPWP, 4% untuk yang tidak ber-NPWP",
      "Tidak semua jenis jasa dikenakan PPh 23; lihat daftar jenis jasa yang diatur DJP",
    ],
    faq: [
      {
        pertanyaan: "Apa bedanya PPh 21 dan PPh 23?",
        jawaban:
          "PPh 21 dipotong dari penghasilan orang pribadi (gaji karyawan). PPh 23 dipotong dari penghasilan badan atau orang pribadi atas jasa, sewa, dividen, bunga, dan royalti.",
      },
    ],
    referensi: [
      {
        judul: "PPh Pasal 23 — DJP",
        url: "https://www.pajak.go.id/id/pph-pasal-23",
        sumber: "DJP",
      },
    ],
    internalLinks: [
      { label: "Kalkulator PPh 21", href: "/kalkulator/perpajakan/pph-21" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "estimasi-pajak",
    slug: "estimasi-pajak",
    nama: "Estimasi Pajak",
    namaAlternatif: ["Tax Estimator", "Kalkulator Pajak Umum"],
    kategori: "perpajakan",
    ringkasan: "Simulasikan perkiraan total beban pajak dari berbagai sumber penghasilan.",
    deskripsiPanjang:
      "Estimasi Pajak membantu individu atau usaha kecil memperkirakan total kewajiban pajak dari berbagai sumber penghasilan dalam satu tahun pajak, termasuk gaji, usaha, dan investasi.",
    intent: "Perkiraan total kewajiban pajak tahunan",
    keywords: ["estimasi pajak", "kalkulator pajak", "perkiraan pajak", "simulasi pajak"],
    searchKeywords: ["tax estimator", "tax calculator Indonesia", "estimasi pajak tahunan"],
    caraPakai: [
      "Masukkan semua sumber penghasilan (gaji, usaha, investasi)",
      "Masukkan pengurang (PTKP, biaya jabatan, iuran pensiun)",
      "Kalkulator menampilkan estimasi total PPh terutang",
    ],
    contoh: "Gaji Rp 150 juta/tahun + dividen Rp 20 juta → total pajak diestimasi",
    batasan: ["Hanya estimasi; untuk kepastian konsultasi dengan konsultan pajak atau DJP"],
    faq: [
      {
        pertanyaan: "Kapan batas lapor SPT Tahunan?",
        jawaban:
          "Untuk orang pribadi: 31 Maret tahun berikutnya. Untuk badan: 30 April tahun berikutnya.",
      },
    ],
    referensi: [
      { judul: "Portal Pajak Indonesia", url: "https://www.pajak.go.id", sumber: "DJP" },
    ],
    internalLinks: [
      { label: "Kalkulator PPh 21", href: "/kalkulator/perpajakan/pph-21" },
      { label: "Kalkulator PPh 23", href: "/kalkulator/perpajakan/pph-23" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  // ─── PINJAMAN & CICILAN ───────────────────────────────────────────────────

  {
    id: "pinjaman",
    slug: "pinjaman",
    nama: "Kalkulator Pinjaman",
    namaAlternatif: ["Loan Calculator", "Kalkulator Kredit"],
    kategori: "pinjaman-cicilan",
    ringkasan: "Hitung cicilan pinjaman, total bunga, dan total pembayaran untuk berbagai skenario.",
    deskripsiPanjang:
      "Kalkulator Pinjaman membantu menghitung cicilan bulanan, total bunga, dan total pembayaran untuk pinjaman umum (KTA, pinjaman bank, pinjaman online) berdasarkan pokok, suku bunga, dan tenor.",
    intent: "Simulasi cicilan pinjaman umum",
    keywords: ["kalkulator pinjaman", "cicilan pinjaman", "simulasi kredit", "hitung cicilan bank"],
    searchKeywords: ["loan calculator", "kredit calculator", "cicilan pinjaman", "simulasi pinjaman bank"],
    formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    variableDefinitions: {
      M: "Cicilan bulanan",
      P: "Pokok pinjaman",
      r: "Suku bunga bulanan",
      n: "Jumlah bulan",
    },
    caraPakai: [
      "Masukkan jumlah pinjaman",
      "Masukkan suku bunga per tahun",
      "Masukkan tenor (bulan atau tahun)",
      "Klik Hitung untuk melihat cicilan dan total pembayaran",
    ],
    contoh: "Pinjaman Rp 50 juta, bunga 12%/tahun, tenor 24 bulan → cicilan ~Rp 2,35 juta/bln",
    batasan: ["Tidak memperhitungkan biaya admin atau asuransi pinjaman"],
    faq: [
      {
        pertanyaan: "Apa bedanya bunga flat dan bunga efektif?",
        jawaban:
          "Bunga flat dihitung dari pokok pinjaman awal setiap bulan. Bunga efektif dihitung dari sisa pokok yang belum dibayar. Bunga efektif lebih adil dan menghasilkan total bunga yang lebih rendah.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Amortisasi", href: "/kalkulator/pinjaman-cicilan/amortisasi" },
      { label: "Kalkulator KPR", href: "/kalkulator/kredit-properti-kpr/kpr" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "angsuran",
    slug: "angsuran",
    nama: "Kalkulator Angsuran",
    namaAlternatif: ["Installment Calculator", "Kalkulator Cicilan Tetap"],
    kategori: "pinjaman-cicilan",
    ringkasan: "Hitung besaran angsuran tetap dan jadwal pembayaran cicilan.",
    deskripsiPanjang:
      "Kalkulator Angsuran menghitung besaran pembayaran cicilan tetap per bulan untuk pembiayaan konsumen seperti kendaraan bermotor, elektronik, atau kebutuhan lain.",
    intent: "Simulasi cicilan tetap untuk pembiayaan konsumen",
    keywords: ["kalkulator angsuran", "cicilan tetap", "simulasi angsuran", "hitung angsuran"],
    searchKeywords: ["installment calculator", "cicilan kendaraan", "angsuran motor", "angsuran mobil"],
    caraPakai: [
      "Masukkan harga barang",
      "Masukkan uang muka",
      "Masukkan suku bunga",
      "Pilih tenor",
      "Klik Hitung untuk melihat angsuran per bulan",
    ],
    contoh: "Kendaraan Rp 200 juta, DP Rp 40 juta, bunga 9%/tahun, tenor 36 bulan → angsuran ~Rp 5,09 juta/bln",
    batasan: ["Menggunakan metode anuitas; untuk flat rate hasil akan berbeda"],
    faq: [],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Pinjaman", href: "/kalkulator/pinjaman-cicilan/pinjaman" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "bunga-pinjaman",
    slug: "bunga-pinjaman",
    nama: "Kalkulator Bunga Pinjaman",
    namaAlternatif: ["Loan Interest Calculator", "Kalkulator Biaya Bunga"],
    kategori: "pinjaman-cicilan",
    ringkasan: "Hitung total biaya bunga yang dibayar selama masa pinjaman.",
    deskripsiPanjang:
      "Kalkulator Bunga Pinjaman membantu kamu membandingkan total biaya bunga untuk berbagai skenario pinjaman — tenor lebih panjang vs pendek, bunga flat vs efektif.",
    intent: "Estimasi biaya bunga pinjaman untuk perbandingan skenario",
    keywords: ["bunga pinjaman", "kalkulator bunga", "total biaya pinjaman", "biaya kredit"],
    searchKeywords: ["loan interest calculator", "total interest paid", "biaya bunga pinjaman", "perbandingan tenor pinjaman"],
    caraPakai: [
      "Masukkan pokok pinjaman",
      "Masukkan suku bunga per tahun",
      "Masukkan tenor",
      "Pilih jenis bunga (flat atau efektif)",
      "Klik Hitung untuk melihat total bunga dan total pembayaran",
    ],
    contoh: "Pinjaman Rp 100 juta, bunga efektif 10%/tahun, tenor 5 tahun → total bunga Rp ~27,5 juta",
    batasan: ["Bunga flat dan efektif menghasilkan angka yang berbeda"],
    faq: [],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Pinjaman", href: "/kalkulator/pinjaman-cicilan/pinjaman" },
      { label: "Kalkulator Amortisasi", href: "/kalkulator/pinjaman-cicilan/amortisasi" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "amortisasi",
    slug: "amortisasi",
    nama: "Kalkulator Amortisasi",
    namaAlternatif: ["Amortization Calculator", "Amortization Schedule", "Jadwal Amortisasi"],
    kategori: "pinjaman-cicilan",
    ringkasan: "Lihat jadwal amortisasi lengkap — rincian pokok dan bunga per bulan untuk pinjaman kamu.",
    deskripsiPanjang:
      "Kalkulator Amortisasi menghasilkan tabel amortisasi lengkap yang menunjukkan rincian pembayaran setiap bulan: berapa yang mengurangi pokok pinjaman dan berapa yang merupakan bunga.",
    intent: "Melihat struktur cicilan dan jadwal pelunasan pinjaman secara detail",
    keywords: ["amortisasi", "jadwal amortisasi", "tabel amortisasi", "kalkulator amortisasi"],
    searchKeywords: ["amortization calculator", "amortization schedule", "jadwal cicilan kpr", "tabel pelunasan pinjaman"],
    caraPakai: [
      "Masukkan pokok pinjaman",
      "Masukkan suku bunga per tahun",
      "Masukkan tenor (bulan)",
      "Klik Tampilkan Jadwal untuk melihat tabel amortisasi lengkap",
    ],
    contoh: "Pinjaman Rp 200 juta, bunga 9%/tahun, tenor 120 bulan → tabel 120 baris rincian pokok + bunga",
    batasan: ["Menggunakan metode anuitas (angsuran tetap)"],
    faq: [
      {
        pertanyaan: "Mengapa bunga di awal pinjaman lebih besar dari pokok?",
        jawaban:
          "Karena di awal saldo pokok pinjaman masih sangat besar, sehingga bunga yang dihitung juga besar. Seiring waktu, saldo berkurang dan porsi bunga mengecil sementara porsi pokok membesar.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator KPR", href: "/kalkulator/kredit-properti-kpr/kpr" },
      { label: "Kalkulator Pinjaman", href: "/kalkulator/pinjaman-cicilan/pinjaman" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  // ─── KONVERSI & SIMULASI FINANSIAL ───────────────────────────────────────

  {
    id: "konverter-mata-uang",
    slug: "konverter-mata-uang",
    nama: "Konverter Mata Uang",
    namaAlternatif: ["Currency Converter", "Kalkulator Kurs", "Kalkulator Nilai Tukar"],
    kategori: "konversi-simulasi",
    ringkasan: "Konversi nilai antar mata uang menggunakan kurs referensi.",
    deskripsiPanjang:
      "Konverter Mata Uang membantu mengkonversi nilai antara mata uang yang berbeda berdasarkan kurs referensi. Mode referensi menggunakan kurs Bank Indonesia atau kurs tengah BI.",
    intent: "Hitung nilai tukar antar mata uang",
    keywords: ["konverter mata uang", "kurs rupiah", "nilai tukar", "kalkulator kurs"],
    searchKeywords: ["currency converter", "kurs rupiah dollar", "IDR USD", "konversi mata uang", "kalkulator kurs hari ini"],
    caraPakai: [
      "Pilih mata uang asal",
      "Pilih mata uang tujuan",
      "Masukkan jumlah yang akan dikonversi",
      "Lihat hasil konversi berdasarkan kurs referensi",
    ],
    contoh: "USD 100 → IDR berdasarkan kurs tengah BI",
    batasan: [
      "Kurs yang ditampilkan adalah referensi, bukan kurs transaksi bank atau money changer",
      "Kurs aktual bervariasi tergantung bank dan waktu transaksi",
    ],
    faq: [
      {
        pertanyaan: "Apa itu kurs tengah BI?",
        jawaban:
          "Kurs tengah Bank Indonesia adalah rata-rata antara kurs beli dan kurs jual yang ditetapkan BI sebagai referensi. Kurs transaksi bank bisa berbeda dari kurs tengah BI.",
      },
    ],
    referensi: [
      { judul: "Kurs Referensi Bank Indonesia", url: "https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/default.aspx", sumber: "Bank Indonesia" },
    ],
    internalLinks: [
      { label: "Kalkulator Inflasi", href: "/kalkulator/konversi-simulasi/inflasi" },
    ],
    outboundLinks: [
      { label: "Kurs BI", href: "https://www.bi.go.id" },
    ],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "inflasi",
    slug: "inflasi",
    nama: "Kalkulator Inflasi",
    namaAlternatif: ["Inflation Calculator", "Kalkulator Daya Beli", "CPI Calculator"],
    kategori: "konversi-simulasi",
    ringkasan: "Simulasikan dampak inflasi terhadap nilai uang dan daya beli kamu dari waktu ke waktu.",
    deskripsiPanjang:
      "Kalkulator Inflasi membantu memahami bagaimana inflasi mengikis daya beli uang dari waktu ke waktu, dan berapa nilai riil uang kamu jika disesuaikan dengan tingkat inflasi.",
    intent: "Memahami dampak inflasi terhadap nilai uang dan perencanaan",
    keywords: ["kalkulator inflasi", "dampak inflasi", "daya beli", "nilai riil uang"],
    searchKeywords: ["inflation calculator", "purchasing power calculator", "inflasi Indonesia", "nilai uang setelah inflasi"],
    formula: "Nilai Riil = Nilai Nominal ÷ (1 + inflasi)^tahun",
    variableDefinitions: {
      "Nilai Riil": "Nilai uang setelah disesuaikan inflasi",
      "Nilai Nominal": "Nilai uang saat ini",
      inflasi: "Tingkat inflasi tahunan (desimal)",
      tahun: "Jangka waktu",
    },
    caraPakai: [
      "Masukkan jumlah uang",
      "Masukkan tingkat inflasi per tahun (default: inflasi rata-rata Indonesia ~3-4%)",
      "Masukkan jangka waktu",
      "Klik Hitung untuk melihat nilai riil dan penurunan daya beli",
    ],
    contoh: "Rp 100 juta hari ini dengan inflasi 3,5%/tahun → dalam 10 tahun setara Rp 70,9 juta (daya beli turun ~29%)",
    batasan: ["Inflasi aktual bervariasi setiap tahun; gunakan rata-rata historis sebagai estimasi"],
    faq: [
      {
        pertanyaan: "Berapa rata-rata inflasi Indonesia?",
        jawaban: "Inflasi Indonesia dalam 10 tahun terakhir rata-rata sekitar 3–5% per tahun. Data resmi dari BPS Indonesia.",
      },
    ],
    referensi: [
      { judul: "Data Inflasi BPS", url: "https://www.bps.go.id", sumber: "BPS" },
    ],
    internalLinks: [
      { label: "Kalkulator Bunga Majemuk", href: "/kalkulator/investasi-portofolio/bunga-majemuk" },
    ],
    outboundLinks: [
      { label: "Data Inflasi BPS", href: "https://www.bps.go.id" },
    ],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },

  {
    id: "persentase",
    slug: "persentase",
    nama: "Kalkulator Persentase",
    namaAlternatif: ["Percentage Calculator", "Kalkulator Persen"],
    kategori: "konversi-simulasi",
    ringkasan: "Hitung berbagai jenis persentase: berapa persen, persen dari angka, kenaikan/penurunan persen.",
    deskripsiPanjang:
      "Kalkulator Persentase yang serba guna — hitung berapa persen suatu angka dari angka lain, berapa hasil dari X% angka tertentu, atau berapa persentase perubahan antara dua angka.",
    intent: "Hitung persen cepat untuk berbagai kebutuhan sehari-hari",
    keywords: ["kalkulator persen", "kalkulator persentase", "hitung persen", "berapa persen"],
    searchKeywords: ["percentage calculator", "percent calculator", "hitung persentase", "berapa persen dari", "kenaikan persen"],
    caraPakai: [
      "Pilih jenis perhitungan: (1) X% dari Y = ?, (2) X adalah berapa % dari Y?, (3) % perubahan dari X ke Y",
      "Masukkan angka yang diperlukan",
      "Klik Hitung untuk melihat hasil",
    ],
    contoh: "15% dari Rp 500.000 = Rp 75.000 | Rp 75.000 adalah 15% dari Rp 500.000 | Naik dari Rp 500k ke Rp 575k = naik 15%",
    batasan: [],
    faq: [
      {
        pertanyaan: "Bagaimana menghitung kenaikan persentase?",
        jawaban: "% Kenaikan = (Nilai Baru - Nilai Lama) ÷ Nilai Lama × 100%",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Untung/Rugi", href: "/kalkulator/trading-saham-kripto/untung-rugi" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "tinggi",
  },

  {
    id: "rasio-keuangan",
    slug: "rasio-keuangan",
    nama: "Kalkulator Rasio Keuangan",
    namaAlternatif: ["Financial Ratio Calculator", "Kalkulator Rasio Finansial"],
    kategori: "konversi-simulasi",
    ringkasan: "Hitung rasio keuangan dasar untuk analisis cepat kondisi finansial.",
    deskripsiPanjang:
      "Kalkulator Rasio Keuangan membantu menghitung rasio keuangan umum yang digunakan untuk analisis investasi dan kesehatan keuangan pribadi maupun perusahaan.",
    intent: "Analisis cepat kondisi keuangan menggunakan rasio finansial",
    keywords: ["rasio keuangan", "kalkulator rasio", "financial ratio", "analisis keuangan"],
    searchKeywords: ["financial ratio calculator", "P/E ratio calculator", "debt to equity ratio", "rasio keuangan perusahaan"],
    caraPakai: [
      "Pilih jenis rasio (P/E, Debt-to-Equity, Current Ratio, dll.)",
      "Masukkan angka yang diperlukan",
      "Klik Hitung untuk melihat nilai rasio dan interpretasinya",
    ],
    contoh: "Harga saham Rp 1.000, EPS Rp 100 → P/E Ratio = 10x",
    batasan: ["Rasio harus diinterpretasikan dalam konteks industri dan kondisi pasar"],
    faq: [
      {
        pertanyaan: "Apa itu P/E Ratio?",
        jawaban:
          "P/E (Price-to-Earnings) Ratio adalah harga saham dibagi laba per saham (EPS). Menunjukkan berapa kali investor bersedia membayar untuk setiap rupiah laba perusahaan.",
      },
    ],
    referensi: [],
    internalLinks: [
      { label: "Kalkulator Untung/Rugi", href: "/kalkulator/trading-saham-kripto/untung-rugi" },
    ],
    outboundLinks: [],
    schemaTypes: ["SoftwareApplication", "FAQPage", "BreadcrumbList"],
    updatedAt: "2025-05-01",
    status: "aktif",
    prioritas: "sedang",
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByKategori(kategori: string): Tool[] {
  return TOOLS.filter((t) => t.kategori === kategori);
}

export function getToolsByPrioritas(prioritas: Tool["prioritas"]): Tool[] {
  return TOOLS.filter((t) => t.prioritas === prioritas);
}

export function getActiveTools(): Tool[] {
  return TOOLS.filter((t) => t.status === "aktif");
}

export function getAllKategori(): string[] {
  return [...new Set(TOOLS.map((t) => t.kategori))];
}
