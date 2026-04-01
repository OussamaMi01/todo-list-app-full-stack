// components/Navbar/Navbar.tsx
// Server component with modern design

import Link from "next/link";
import Image from "next/image";
import { DisclosureClient } from "../DisclosureClient/DisclosureClient";
import { getTopNav } from "@/lib/api/nav";

export async function Navbar() {
  const topnav = await getTopNav();
  const { link: navigation, logoLink: logo, cta } = topnav;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60" />

      <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Mobile & Desktop */}
          <Link
            href={logo.href || "/home"}
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <span className="relative flex items-center justify-center w-8 h-8">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-500/10 to-indigo-500/10 ring-1 ring-sky-500/20 group-hover:ring-sky-500/40 transition-all duration-200" />
              <Image
                src={logo.image.url}
                alt={logo.image.alternativeText ?? logo.image.name}
                width={20}
                height={20}
                className="relative z-10 w-5 h-5"
              />
            </span>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {logo.text}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-200"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              href={cta.href}
              target={cta.external ? "_blank" : "_self"}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg hover:from-sky-600 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-200"
            >
              {cta.text}
            </Link>
          </div>

          {/* Mobile Menu Button & Client Component */}
          <div className="lg:hidden">
            <DisclosureClient topnav={topnav} />
          </div>
        </div>
      </nav>
    </header>
  );
}