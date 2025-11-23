"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#e5edfb]">

      {/* HEADER PREMIUM */}
      <header
        className="
          sticky top-0 z-50 
          backdrop-blur-xl bg-white/70 
          border-b border-marial/30 
          shadow-sm
        "
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LOGO + TITRE */}
          <a href="/" className="flex flex-col select-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-marial/90 font-medium">
              Unité pastorale
            </span>
            <span className="text-lg font-semibold text-nuit relative">
              Gilly – Ransart
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-marial/40 rounded-full"></span>
            </span>
          </a>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {[
              ["Accueil", "/"],
              ["Horaires des messes", "/horaires"],
              ["Actualités", "/actualites"],
              ["Sacrements", "/sacrements"],
              ["Documents utiles", "/documents"],
              ["Contact", "/contact"],
            ].map(([label, link]) => (
              <a
                key={label}
                href={link}
                className="
                  relative text-nuit hover:text-marial transition
                "
              >
                {label}
                <span
                  className="
                    absolute left-0 -bottom-1 h-[2px] w-0 
                    bg-marial transition-all duration-300
                    hover:w-full
                  "
                ></span>
              </a>
            ))}
          </nav>

          {/* BURGER MENU MOBILE */}
          <button
            className="md:hidden p-2 rounded hover:bg-marial/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu mobile"
          >
            {!menuOpen ? (
              // ICÔNE BURGER
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-nuit"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              // ICÔNE CROIX
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-nuit"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* MENU MOBILE SLIDE */}
        {menuOpen && (
          <nav className="md:hidden bg-white/80 backdrop-blur-xl border-t border-marial/20">
            <div className="flex flex-col px-4 py-4 text-sm font-medium">
              {[
                ["Accueil", "/"],
                ["Horaires des messes", "/horaires"],
                ["Actualités", "/actualites"],
                ["Sacrements", "/sacrements"],
                ["Documents utiles", "/documents"],
                ["Contact", "/contact"],
              ].map(([label, link]) => (
                <a
                  key={label}
                  href={link}
                  onClick={() => setMenuOpen(false)}
                  className="
                    px-3 py-3 rounded-lg 
                    hover:bg-marial/10 hover:text-marial transition
                  "
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* PAGE */}
      <main className="flex-1">{children}</main>

      {/* FOOTER PREMIUM */}
      <footer className="border-t border-marial/20 mt-12 bg-[#d3ddf5]">
        <div className="max-w-5xl mx-auto px-4 py-8 text-[12px] text-gray-700 flex flex-col md:flex-row justify-between items-center gap-3">

          <span className="opacity-80">
            © {new Date().getFullYear()} Unité pastorale Gilly-Ransart — Tous droits réservés.
          </span>

          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="hover:text-marial transition font-semibold opacity-80 hover:opacity-100"
            >
              Espace équipe pastorale
            </a>

            <span className="text-gray-400 select-none">•</span>

            <a
              href="mailto:katalyst@live.be"
              className="opacity-50 hover:opacity-100 transition italic"
            >
              Webmaster : Mickael R.
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
