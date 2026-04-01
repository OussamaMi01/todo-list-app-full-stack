// components/Navbar/Navbar.tsx
"use client"; // Add this if you're using client-side data fetching

import Link from "next/link";
import Image from "next/image";
import { DisclosureClient } from "./DisclosureClient/DisclosureClient";
import type { TopNav } from "../types/nav";
import { useEffect, useState } from "react";

// Default navigation data
const defaultTopNav: TopNav = {
  logoLink: {
    text: "TodoApp",
    href: "/",
    image: {
      url: "/logo.png",
      name: "TodoApp Logo",
      alternativeText: "TodoApp Logo"
    }
  },
  link: [
    { text: "Home", href: "/", external: false },
    { text: "Features", href: "/features", external: false },
    { text: "Pricing", href: "/pricing", external: false },
    { text: "About", href: "/about", external: false }
  ],
  cta: {
    text: "Get Started",
    href: "/signup",
    external: false
  }
};

interface NavbarProps {
  topnav?: TopNav;
}

export function Navbar({ topnav: propTopnav }: Readonly<NavbarProps>) {
  const [topnav, setTopnav] = useState<TopNav>(propTopnav || defaultTopNav);
  const [loading, setLoading] = useState(!propTopnav);

  // Fetch data if not provided as prop
  useEffect(() => {
    if (!propTopnav) {
      fetchTopNav();
    }
  }, [propTopnav]);

  const fetchTopNav = async () => {
    try {
      const response = await fetch('/api/nav');
      const data = await response.json();
      if (data) {
        setTopnav(data);
      }
    } catch (error) {
      console.error('Error fetching navigation:', error);
      // Keep using default data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <NavbarSkeleton />;
  }

  const { link: navigation, logoLink: logo, cta } = topnav;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60" />

      <nav className="relative container mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center h-14 gap-6">

          {/* Mobile Menu */}
          <div className="flex-shrink-0 lg:hidden w-full">
            <DisclosureClient topnav={topnav} />
          </div>

          {/* Desktop: Logo */}
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

          {/* Desktop: Center nav links */}
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

          {/* Desktop: Right actions */}
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

// Skeleton component for loading state
function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60" />
      <nav className="relative container mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center h-14 gap-6 animate-pulse">
          <div className="flex-shrink-0 lg:hidden w-full">
            <div className="flex items-center justify-between">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2.5">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="hidden lg:flex flex-1 justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}

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