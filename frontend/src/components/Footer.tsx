
import Link from "next/link";
import Image from "next/image";
import type { FooterData } from "../types/nav";

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: Readonly<FooterProps>) {
  const { copyright } = data;

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 xl:px-8 py-12 lg:py-16">
        {/* ── Bottom bar ── */}
          <p className="text-xs text-slate-400 dark:text-slate-500 order-2 sm:order-1">
            {copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
        </div>
    </footer>
  );
}

