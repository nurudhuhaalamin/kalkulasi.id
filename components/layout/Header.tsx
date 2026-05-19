"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, Menu, X } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const navLinks = [
  { href: ROUTES.kalkulator, label: "Kalkulator" },
  { href: ROUTES.artikel, label: "Artikel" },
  { href: ROUTES.kamisIstilah, label: "Kamus Istilah" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex items-center gap-2 font-bold text-gray-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Calculator className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg">Kalkulasi.id</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ROUTES.ajukanTool}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Ajukan Tool
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ROUTES.ajukanTool}
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Ajukan Tool
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
