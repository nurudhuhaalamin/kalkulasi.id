// Kamus istilah bilingual — keputusan resmi sesuai Section 24.9 blueprint

export type StatusIstilah = "inggris" | "indonesia" | "hybrid";

export interface KamusIstilah {
  istilah: string;
  definisi: string;
  status: StatusIstilah;
  padananIndonesia?: string;
  contohPenggunaan: string;
  kategori: string;
}

export const KAMUS: KamusIstilah[] = [
  // Trading
  {
    istilah: "Position Sizing",
    definisi: "Proses menentukan berapa besar modal yang dialokasikan untuk setiap transaksi trading, berdasarkan risiko yang bersedia ditanggung.",
    status: "inggris",
    contohPenggunaan: "Kalkulator Position Sizing membantu trader menentukan ukuran lot yang tepat.",
    kategori: "trading",
  },
  {
    istilah: "Stop Loss",
    definisi: "Order otomatis untuk menutup posisi ketika harga mencapai level kerugian tertentu, membatasi kerugian maksimum.",
    status: "inggris",
    contohPenggunaan: "Pasang Stop Loss di Rp 4.750 untuk membatasi kerugian.",
    kategori: "trading",
  },
  {
    istilah: "Take Profit",
    definisi: "Order otomatis untuk menutup posisi ketika harga mencapai level keuntungan yang ditargetkan.",
    status: "inggris",
    contohPenggunaan: "Take Profit di Rp 5.500 memberikan risk/reward 1:2.",
    kategori: "trading",
  },
  {
    istilah: "Break Even",
    definisi: "Titik di mana pendapatan sama persis dengan biaya — tidak ada profit maupun loss. Dalam trading, harga di mana posisi tidak rugi dan tidak untung setelah biaya transaksi.",
    status: "inggris",
    padananIndonesia: "Titik Impas",
    contohPenggunaan: "Kalkulator Break Even menghitung harga jual minimum agar tidak merugi.",
    kategori: "trading",
  },
  {
    istilah: "Leverage",
    definisi: "Fasilitas yang memungkinkan trader mengendalikan posisi lebih besar dari modal yang dimiliki menggunakan dana pinjaman dari broker.",
    status: "inggris",
    contohPenggunaan: "Leverage 10x berarti modal Rp 1 juta bisa membuka posisi Rp 10 juta.",
    kategori: "trading",
  },
  {
    istilah: "Likuidasi",
    definisi: "Penutupan paksa posisi oleh exchange atau broker ketika margin tidak mencukupi untuk menanggung kerugian yang terjadi.",
    status: "indonesia",
    contohPenggunaan: "Kalkulator Likuidasi membantu mengestimasi harga likuidasi posisi futures.",
    kategori: "trading",
  },
  {
    istilah: "Risk/Reward Ratio",
    definisi: "Perbandingan antara potensi kerugian (risiko) dan potensi keuntungan (reward) dalam satu transaksi. Disebut juga R:R ratio.",
    status: "inggris",
    contohPenggunaan: "Risk/Reward 1:2 berarti risiko Rp 1 untuk potensi profit Rp 2.",
    kategori: "trading",
  },
  // Investasi
  {
    istilah: "DCA (Dollar Cost Averaging)",
    definisi: "Strategi investasi dengan membeli aset dalam jumlah nominal tetap secara berkala, terlepas dari harga pasar saat itu. Meratakan harga beli rata-rata.",
    status: "inggris",
    contohPenggunaan: "Kalkulator DCA mensimulasikan strategi investasi berkala.",
    kategori: "investasi",
  },
  {
    istilah: "FIRE (Financial Independence, Retire Early)",
    definisi: "Gerakan keuangan di mana seseorang mengumpulkan aset yang cukup untuk hidup dari hasil investasi tanpa perlu bekerja. Target: 25× pengeluaran tahunan.",
    status: "inggris",
    contohPenggunaan: "Kalkulator Pensiun / FIRE membantu merencanakan target kebebasan finansial.",
    kategori: "investasi",
  },
  {
    istilah: "Bunga Majemuk",
    definisi: "Metode penghitungan bunga di mana bunga yang diperoleh ikut menghasilkan bunga baru pada periode berikutnya. Disebut juga compound interest.",
    status: "hybrid",
    contohPenggunaan: "Kalkulator Bunga Majemuk (Compound Interest Calculator) mensimulasikan pertumbuhan investasi jangka panjang.",
    kategori: "investasi",
  },
  {
    istilah: "Portofolio",
    definisi: "Kumpulan aset investasi yang dimiliki seseorang, dapat berupa saham, obligasi, reksa dana, properti, atau aset lainnya.",
    status: "indonesia",
    contohPenggunaan: "Diversifikasi portofolio mengurangi risiko investasi.",
    kategori: "investasi",
  },
  // Keuangan Pribadi
  {
    istilah: "Net Worth",
    definisi: "Total aset dikurangi total liabilitas (utang). Mengukur kekayaan bersih seseorang pada satu titik waktu.",
    status: "inggris",
    contohPenggunaan: "Kalkulator Net Worth membantu menghitung kekayaan bersih secara menyeluruh.",
    kategori: "keuangan-pribadi",
  },
  {
    istilah: "Dana Darurat",
    definisi: "Tabungan likuid yang disiapkan khusus untuk keadaan darurat (kehilangan pekerjaan, sakit, kecelakaan) tanpa harus menjual aset investasi.",
    status: "indonesia",
    contohPenggunaan: "Dana darurat ideal adalah 3–12 bulan pengeluaran, tergantung profil risiko.",
    kategori: "keuangan-pribadi",
  },
  // Properti
  {
    istilah: "KPR",
    definisi: "Kredit Pemilikan Rumah — fasilitas pinjaman dari bank untuk membeli properti residensial dengan jaminan properti yang dibeli.",
    status: "indonesia",
    contohPenggunaan: "Kalkulator KPR mensimulasikan cicilan bulanan dan total biaya KPR.",
    kategori: "properti",
  },
  {
    istilah: "Amortisasi",
    definisi: "Proses pelunasan utang secara bertahap melalui serangkaian pembayaran yang mencakup pokok dan bunga. Tabel amortisasi menunjukkan rincian per periode.",
    status: "indonesia",
    contohPenggunaan: "Kalkulator Amortisasi menampilkan jadwal pelunasan pinjaman secara detail.",
    kategori: "properti",
  },
  // Perpajakan
  {
    istilah: "PPh 21",
    definisi: "Pajak Penghasilan Pasal 21 — pajak yang dipotong dari penghasilan orang pribadi berupa gaji, upah, honorarium, dan tunjangan.",
    status: "indonesia",
    contohPenggunaan: "Kalkulator PPh 21 mengestimasi pajak yang dipotong dari gaji bulanan.",
    kategori: "perpajakan",
  },
  {
    istilah: "PTKP",
    definisi: "Penghasilan Tidak Kena Pajak — batas penghasilan yang tidak dikenakan PPh. Besarnya tergantung status perkawinan dan tanggungan.",
    status: "indonesia",
    contohPenggunaan: "PTKP TK/0 adalah Rp 54 juta per tahun untuk lajang tanpa tanggungan.",
    kategori: "perpajakan",
  },
];

export function getIstilahByKategori(kategori: string): KamusIstilah[] {
  return KAMUS.filter((k) => k.kategori === kategori);
}

export function searchIstilah(query: string): KamusIstilah[] {
  const q = query.toLowerCase();
  return KAMUS.filter(
    (k) =>
      k.istilah.toLowerCase().includes(q) ||
      k.definisi.toLowerCase().includes(q) ||
      k.padananIndonesia?.toLowerCase().includes(q)
  );
}
