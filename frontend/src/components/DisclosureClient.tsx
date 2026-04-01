"use client";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import type { TopNav } from "./types/nav";

interface DisclosureClientProps {
  topnav: TopNav;
}

export function DisclosureClient({ topnav }: Readonly<DisclosureClientProps>) {
  const { link: navigation, logoLink: logo, cta } = topnav;

  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
          {/* Logo */}
          <Link href={logo.href || "/"} className="group flex items-center gap-2.5">
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

          {/* Mobile toggle */}
          <DisclosureButton
            aria-label="Toggle Menu"
            className="p-1.5 ml-auto text-slate-500 rounded-md lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:text-slate-400 transition-colors duration-150"
          >
            <svg
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </DisclosureButton>

          {/* Mobile panel */}
          <DisclosurePanel className="w-full mt-4 pb-4 border-t border-slate-100 dark:border-slate-800 lg:hidden">
            <nav className="flex flex-col gap-0.5 mt-3">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors duration-150"
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150"
              >
                <span>Dashboard</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Link>
              <Link
                href={cta.href}
                target={cta.external ? "_blank" : "_self"}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors duration-150"
              >
                {cta.text}
              </Link>
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
