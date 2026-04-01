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
  logoLink: {
    text: "Checki",
    href: "/marketing",
    image: {
      url: "/img/logo.png",
      name: "Checki Logo",
      alternativeText: "Checki Logo"
    }
  },
  tagline: "Manage your tasks efficiently and stay productive with Checki.",
  columns: [
    {
      heading: "Product",
      links: [
        { text: "Features", href: "/marketing#features", external: false },
      
      
      ]
    },
    {
      heading: "Company",
      links: [
        { text: "About", href: "/about", external: false },
        { text: "Blog", href: "/blog", external: false },
        { text: "Contact", href: "/contact", external: false }
      ]
    },
    {
      heading: "Resources",
      links: [
        { text: "Documentation", href: "/docs", external: false },
        { text: "Support", href: "/support", external: false },
        { text: "API", href: "/api", external: false },
        { text: "Status", href: "/status", external: false }
      ]
    }
  ],
  
  legal: [
    { text: "Privacy Policy", href: "/privacy", external: false },
    { text: "Terms of Service", href: "/terms", external: false }
  ],
  copyright: "© {year} Checki. All rights reserved."
};

export async function getTopNav(): Promise<TopNav> {
  return topNavData;
}

export async function getFooterData(): Promise<FooterData> {
  return footerData;
}