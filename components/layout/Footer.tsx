import Link from "next/link";
import { Calculator } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { KATEGORI_LABELS } from "@/lib/constants/site";

const KATEGORI_ROUTES_FOOTER = Object.entries(KATEGORI_LABELS).map(([slug, label]) => ({
  href: `/kalkulator/${slug}`,
  label,
}));

const LEGAL_LINKS = [
  { href: ROUTES.tentang, label: "Tentang" },
  { href: ROUTES.hubungiKami, label: "Hubungi Kami" },
  { href: ROUTES.ajukanTool, label: "Ajukan Tool" },
  { href: ROUTES.kebijakanPrivasi, label: "Kebijakan Privasi" },
  { href: ROUTES.syaratKetentuan, label: "Syarat & Ketentuan" },
  { href: ROUTES.penafian, label: "Penafian" },
  { href: ROUTES.kebijakanCookie, label: "Kebijakan Cookie" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href={ROUTES.home} className="flex items-center gap-2 font-bold text-gray-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <span>Kalkulasi.id</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kalkulator finansial gratis untuk investor, trader, dan masyarakat Indonesia.
            </p>
            <p className="text-xs text-gray-400">
              Hasil kalkulator bersifat estimasi dan bukan saran finansial.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Kategori Kalkulator</h3>
            <ul className="space-y-2">
              {KATEGORI_ROUTES_FOOTER.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Informasi</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Kalkulasi.id. Gratis untuk semua.
          </p>
          <p className="text-xs text-gray-400">
            Dibuat untuk masyarakat Indonesia 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
