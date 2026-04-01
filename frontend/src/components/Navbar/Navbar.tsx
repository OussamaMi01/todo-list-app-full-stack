// components/Navbar/Navbar.tsx
// Server component — fetches its own data internally

import Link from "next/link";
import Image from "next/image";
import { DisclosureClient } from "../DisclosureClient/DisclosureClient";
import { getTopNav } from "@/lib/api/nav";

export async function Navbar() {
  // Fetch data on the server
  const topnav = await getTopNav();
  const { link: navigation, logoLink: logo, cta } = topnav;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60" />

      <nav className="relative container mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center h-14 gap-6">

          {/* ── Left: Logo + Mobile Disclosure (client) ── */}
          <div className="flex-shrink-0 lg:hidden w-full">
            <DisclosureClient topnav={topnav} />
          </div>

          {/* ── Desktop: Logo ── */}
          <Link
            href={logo.href || "/"}
            className="hidden lg:flex items-center gap-2.5 flex-shrink-0 group"
          >
            <span className="relative flex items-center justify-center w-8 h-8">
              <span className="absolute inset-0 rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20 group-hover:bg-sky-500/20 transition-colors duration-200" />
              <Image
                src={logo.image.url}
                alt={logo.image.alternativeText ?? logo.image.name}
                width={20}
                height={20}
                className="relative z-10 w-5 h-5"
              />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {logo.text}
            </span>
          </Link>

          {/* ── Desktop: Center nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="relative px-3.5 py-1.5 text-sm text-slate-600 dark:text-slate-400 rounded-md hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-150 group"
              >
                {item.text}
                <span className="absolute bottom-0.5 left-3.5 right-3.5 h-px bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </Link>
            ))}
          </div>

          {/* ── Desktop: Right actions ── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/70 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-150"
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>

            <span className="w-px h-5 bg-slate-200 dark:bg-slate-700" />

            <Link
              href={cta.href}
              target={cta.external ? "_blank" : "_self"}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-lg shadow-sm shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-150"
            >
              {cta.text}
              <ArrowRight />
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}

// Icon helpers
function DashboardIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}