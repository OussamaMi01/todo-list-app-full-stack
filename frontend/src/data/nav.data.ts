// data/nav.data.ts
// Central config — swap these values to rebrand entirely.

import type { TopNav, FooterData } from "../types/nav";

export const topnav: TopNav = {
  logoLink: {
    text: "TaskFlow",
    href: "/",
    image: {
      url: "/img/logo.svg",
      alternativeText: "TaskFlow logo",
      name: "logo.svg",
    },
  },
  link: [
    { text: "Features",  href: "/#features",  external: false },
    { text: "Showcase",  href: "/showcase",   external: false },
    { text: "Docs",      href: "/docs",       external: false },
    { text: "Blog",      href: "/blog",       external: false },
  ],
  cta: {
    text: "Get Started",
    href: "/signup",
    external: false,
  },
};

export const footerData: FooterData = {
  logoLink: {
    text: "Checki",
    href: "/",
    image: {
      url: "/img/logo.svg",
      alternativeText: "Checki logo",
      name: "logo.svg",
    },
  },
  tagline:
    "A GraphQL-powered task manager built for teams who care about clarity, speed, and great developer experience.",
  columns: [
    {
      heading: "Product",
      links: [
        { text: "Features",   href: "/#features",  external: false },
        { text: "Showcase",   href: "/showcase",   external: false },
       
        { text: "Changelog",  href: "/changelog",  external: false },
        { text: "Roadmap",    href: "/roadmap",    external: false },
      ],
    },
    {
      heading: "Developers",
      links: [
        { text: "Documentation", href: "/docs",                                        external: false },
        { text: "GraphQL API",   href: "/docs/api",                                    external: false },
        { text: "GitHub",        href: "https://github.com/your-org/taskflow",         external: true  },
        { text: "Status",        href: "https://status.taskflow.dev",                  external: true  },
      ],
    },
    {
      heading: "Company",
      links: [
        { text: "About",   href: "/about",   external: false },
        { text: "Blog",    href: "/blog",    external: false },
        { text: "Careers", href: "/careers", external: false },
        { text: "Contact", href: "/contact", external: false },
      ],
    },
  ],
  social: [
    { platform: "twitter",  href: "https://twitter.com/taskflow"  },
    { platform: "github",   href: "https://github.com/taskflow"   },
    { platform: "discord",  href: "https://discord.gg/taskflow"   },
    { platform: "linkedin", href: "https://linkedin.com/company/taskflow" },
  ],
  legal: [
    { text: "Privacy", href: "/privacy", external: false },
    { text: "Terms",   href: "/terms",   external: false },
    { text: "Cookies", href: "/cookies", external: false },
  ],
  // {year} is replaced at render time
  copyright: "© {year} TaskFlow. All rights reserved.",
};
