"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { BarChart2, Menu, X, Sun, Moon } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { KATEGORI_LABELS } from "@/lib/constants/site";

const NAV_LINKS = [
  { href: ROUTES.kalkulator, label: "Kalkulator" },
  { href: ROUTES.artikel, label: "Artikel" },
  { href: ROUTES.kamisIstilah, label: "Kamus Istilah" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <BarChart2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg">
            Kalkulasi<span style={{ color: "var(--accent)" }}>.id</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle tema"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle tema"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div
          className="border-t px-4 py-3 md:hidden"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <p
            className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Tools
          </p>
          <nav className="mb-3 flex flex-col gap-0.5">
            {Object.entries(KATEGORI_LABELS).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/kalkulator/${slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div
            className="mb-3 border-t"
            style={{ borderColor: "var(--border)" }}
          />
          <p
            className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Artikel
          </p>
          <nav className="mb-3 flex flex-col gap-0.5">
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
