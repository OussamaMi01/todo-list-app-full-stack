"use client";

import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { TopNav } from "../../types/nav";

interface DisclosureClientProps {
  topnav: TopNav;
}

export function DisclosureClient({ topnav }: Readonly<DisclosureClientProps>) {
  const { link: navigation, logoLink: logo, cta } = topnav;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Disclosure>
      {({ open, close }) => (
        <>
          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href={logo.href || "/"}
                className="group flex items-center gap-2.5"
                onClick={() => close()}
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

              {/* Mobile Menu Button */}
              <DisclosureButton
                aria-label={open ? "Close Menu" : "Open Menu"}
                className="p-2 text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:text-slate-400 transition-all duration-200"
              >
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute inset-0 transform transition-all duration-300 ${
                      open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </span>
                  <span
                    className={`absolute inset-0 transform transition-all duration-300 ${
                      open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </div>
              </DisclosureButton>
            </div>

            {/* Mobile Menu Panel */}
            <DisclosurePanel className="mt-4 pb-6">
              <nav className="flex flex-col gap-1">
                {navigation.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      target={item.external ? "_blank" : "_self"}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={() => close()}
                      className={`
                        relative px-4 py-2.5 text-sm rounded-lg transition-all duration-200
                        ${active
                          ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 font-medium"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        }
                      `}
                    >
                      <span className="flex items-center justify-between">
                        {item.text}
                        {item.external && (
                          <svg
                            className="w-3.5 h-3.5 opacity-60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        )}
                      </span>
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sky-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/dashboard"
                  onClick={() => close()}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-150"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span>Dashboard</span>
                </Link>

                <Link
                  href={cta.href}
                  target={cta.external ? "_blank" : "_self"}
                  rel={cta.external ? "noopener noreferrer" : undefined}
                  onClick={() => close()}
                  className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 rounded-lg shadow-sm shadow-sky-500/20 transition-all duration-150"
                >
                  {cta.text}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </DisclosurePanel>
          </div>

          {/* Desktop Navigation - Integrated directly */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Desktop Logo */}
            <Link
              href={logo.href || "/"}
              className="flex items-center gap-2.5 flex-shrink-0 group"
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

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-1">
              {navigation.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`
                      relative px-3.5 py-2 text-sm rounded-lg transition-all duration-200
                      ${active
                        ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    {item.text}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-sky-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-150"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>

              <Link
                href={cta.href}
                target={cta.external ? "_blank" : "_self"}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 rounded-lg shadow-sm shadow-sky-500/20 transition-all duration-150"
              >
                {cta.text}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}