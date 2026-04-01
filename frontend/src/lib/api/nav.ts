// lib/api/nav.ts
import type { TopNav, FooterData } from "@/types/nav";

// Define your navigation data locally
export const topNavData: TopNav = {
  logoLink: {
    text: "Checki",
    href: "/marketing",
    image: {
      url: "/img/logo.png",
      name: "Checki Logo",
      alternativeText: "Checki Logo"
    }
  },
  link: [
    { text: "Home", href: "/", external: false },
    { text: "Dashboard", href: "/dashboard", external: false },
    { text: "About", href: "/about", external: false }
  ],
  cta: {
    text: "Create Task",
    href: "/tasks",
    external: false
  }
};

export const footerData: FooterData = {
  
  copyright: "© {year} Checki. All rights reserved."
};

// Simple functions that return local data immediately
export async function getTopNav(): Promise<TopNav> {
  // Simulate a small delay if needed
  await new Promise(resolve => setTimeout(resolve, 0));
  return topNavData;
}

export async function getFooterData(): Promise<FooterData> {
  // Simulate a small delay if needed
  await new Promise(resolve => setTimeout(resolve, 0));
  return footerData;
}