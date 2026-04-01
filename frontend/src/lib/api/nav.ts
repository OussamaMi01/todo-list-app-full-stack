// lib/api/nav.ts
import type { TopNav, FooterData } from "@/types/nav";

// Define your navigation data locally
export const topNavData: TopNav = {
  logoLink: {
    text: "Checki",
    href: "/",
    image: {
      url: "/img/logo.png",
      name: "Checki Logo",
      alternativeText: "Checki Logo"
    }
  },
  link: [
    { text: "Home", href: "/", external: false },
    { text: "My Tasks", href: "/tasks", external: false },
    { text: "Dashboard", href: "/dashboard", external: false },
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
    href: "/",
    image: {
      url: "/img/logo.png",
      name: "Checki Logo",
      alternativeText: "Checki Logo"
    }
  },
  tagline: "Manage your tasks efficiently and stay productive with our todo list manager.",
  columns: [
    {
      heading: "Product",
      links: [
        { text: "Features", href: "/features", external: false },
        { text: "Tasks", href: "/tasks", external: false },
        { text: "Dashboard", href: "/dashboard", external: false }
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
        { text: "API", href: "/api", external: false }
      ]
    }
  ],
  social: [
    { platform: "twitter", href: "https://twitter.com/todoapp" },
    { platform: "github", href: "https://github.com/todoapp" },
    { platform: "linkedin", href: "https://linkedin.com/company/todoapp" }
  ],
  legal: [
    { text: "Privacy Policy", href: "/privacy", external: false },
    { text: "Terms of Service", href: "/terms", external: false }
  ],
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