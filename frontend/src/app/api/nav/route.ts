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
    { text: "Features", href: "/marketing#features", external: false },
    { text: "About", href: "/about", external: false }
  ],
  cta: {
    text: "Create Task",
    href: "/tasks/new",
    external: false
  }
};

export const footerData: FooterData = {
 
  copyright: "© {year} Checki. All rights reserved."
};

export async function getTopNav(): Promise<TopNav> {
  return topNavData;
}

export async function getFooterData(): Promise<FooterData> {
  return footerData;
}