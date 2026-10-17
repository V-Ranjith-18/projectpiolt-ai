"use client";

import { useState } from "react";

const links = [
  ["Introduction", "/intro"],
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Roadmap", "/roadmap"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

export default function PortfolioNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-label="Portfolio navigation"
      className="mb-8 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 shadow-lg shadow-slate-950/20 backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <a
          href="/intro"
          className="text-sm font-bold tracking-wide text-white hover:text-cyan-300"
        >
          V.Ranjith&apos;s portfolio
        </a>
        <span className="text-sm font-medium text-slate-400 md:hidden">
          Portfolio menu
        </span>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="portfolio-menu"
          aria-label={isOpen ? "Close portfolio menu" : "Open portfolio menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xl leading-none text-slate-300 hover:border-cyan-400 hover:text-cyan-300 md:hidden"
        >
          <span aria-hidden="true">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>
      <div
        id="portfolio-menu"
        className={`${isOpen ? "flex" : "hidden"} mt-3 flex-col gap-1 md:mt-0 md:flex md:flex-row md:flex-wrap md:gap-2`}
      >
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
