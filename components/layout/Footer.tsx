import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { KATEGORI_LABELS } from "@/lib/constants/site";

const KATEGORI_ROUTES = Object.entries(KATEGORI_LABELS).map(([slug, label]) => ({
  href: `/kalkulator/${slug}`,
  label,
}));

const INFO_LINKS = [
  { href: ROUTES.tentang, label: "Tentang Kami" },
  { href: ROUTES.hubungiKami, label: "Hubungi Kami" },
  { href: ROUTES.ajukanTool, label: "Ajukan Tool" },
  { href: ROUTES.penafian, label: "Penafian" },
  { href: ROUTES.kebijakanPrivasi, label: "Kebijakan Privasi" },
  { href: ROUTES.syaratKetentuan, label: "Syarat & Ketentuan" },
  { href: ROUTES.kebijakanCookie, label: "Kebijakan Cookie" },
];

export function Footer() {
  return (
    <footer
      className="mt-20"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href={ROUTES.home}
              className="flex items-center gap-2 font-bold text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <BarChart2 className="h-4 w-4 text-white" />
              </div>
              Kalkulasi<span style={{ color: "var(--accent)" }}>.id</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Kalkulator finansial gratis untuk investor, trader, dan masyarakat Indonesia. 32+
              tools tanpa akun, tanpa biaya.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Hasil kalkulator bersifat estimasi dan bukan saran finansial profesional.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Kategori Kalkulator
            </h3>
            <ul className="space-y-2">
              {KATEGORI_ROUTES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-hover text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Informasi
            </h3>
            <ul className="space-y-2">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-hover text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Kalkulasi.id — Gratis untuk semua.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Dibuat untuk masyarakat Indonesia 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
