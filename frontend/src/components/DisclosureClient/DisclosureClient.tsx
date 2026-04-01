// components/DisclosureClient/DisclosureClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, PlusCircle } from "lucide-react";
import type { TopNav } from "@/types/nav";

interface DisclosureClientProps {
  topnav: TopNav;
}

export function DisclosureClient({ topnav }: Readonly<DisclosureClientProps>) {
  const { link: navigation, logoLink: logo, cta } = topnav;
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Disclosure>
      {({ open, close }) => (
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link
              href={logo.href || "/"}
              className="flex items-center gap-2.5 group"
              onClick={() => close()}
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

            <DisclosureButton className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all duration-200">
              {open ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </DisclosureButton>
          </div>

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
                      flex items-center gap-3 px-4 py-3 text-base rounded-lg transition-all duration-200
                      ${active
                        ? "bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30 text-sky-600 dark:text-sky-400 font-medium"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      }
                    `}
                  >
                    <span className="flex-1">{item.text}</span>
                    {item.external && (
                      <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/dashboard"
                onClick={() => close()}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-150"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                href={cta.href}
                target={cta.external ? "_blank" : "_self"}
                rel={cta.external ? "noopener noreferrer" : undefined}
                onClick={() => close()}
                className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg hover:from-sky-600 hover:to-indigo-600 shadow-md transition-all duration-150"
              >
                <PlusCircle className="w-4 h-4" />
                {cta.text}
              </Link>
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}