// types/nav.ts

export interface NavImage {
  url: string;
  alternativeText: string | null;
  name: string;
}

export interface NavLink {
  text: string;
  href: string;
  external: boolean;
}

export interface NavCTA {
  text: string;
  href: string;
  external: boolean;
}

export interface TopNav {
  logoLink: {
    text: string;
    href: string;
    image: NavImage;
  };
  link: NavLink[];
  cta: NavCTA;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}



export interface FooterData {
  
  copyright: string;
}
