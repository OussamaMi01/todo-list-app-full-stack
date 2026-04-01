// components/Footer/Footer.tsx
// Server component — no client interactivity needed.

import Link from "next/link";
import Image from "next/image";
import type { FooterData, SocialLink } from "../types/nav";

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: Readonly<FooterProps>) {
  const { logoLink, tagline, columns, social, legal, copyright } = data;

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 xl:px-8 py-12 lg:py-16">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-12">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-5">
            <Link href={logoLink.href || "/"} className="group inline-flex items-center gap-2.5 w-fit">
              <span className="relative flex items-center justify-center w-8 h-8">
                <span className="absolute inset-0 rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20 group-hover:bg-sky-500/20 transition-colors duration-200" />
                <Image
                  src={logoLink.image.url}
                  alt={logoLink.image.alternativeText ?? logoLink.image.name}
                  width={20}
                  height={20}
                  className="relative z-10 w-5 h-5"
                />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
                {logoLink.text}
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs">
              {tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {social.map((item) => (
                <SocialButton key={item.platform} item={item} />
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="col-span-2 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150 group"
                      >
                        {link.text}
                        {link.external && (
                          <svg
                            className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150"
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 order-2 sm:order-1">
            {copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>

          <nav className="flex items-center gap-4 order-1 sm:order-2">
            {legal.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-150"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ── Social button ─────────────────────────────────────────────────────────────

function SocialButton({ item }: { item: SocialLink }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.platform}
      className="flex items-center justify-center w-8 h-8 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-150"
    >
      <SocialIcon platform={item.platform} />
    </a>
  );
}

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  const cls = "w-4 h-4 fill-current";

  switch (platform) {
    case "twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "discord":
      return (
        <svg className={cls} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
      );
  }
}
