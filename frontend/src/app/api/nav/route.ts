// app/api/nav/route.ts (for App Router)
import { NextResponse } from 'next/server';

const defaultNavData = {
  logoLink: {
    text: "TodoApp",
    href: "/",
    image: {
      url: "/logo.png",
      name: "TodoApp Logo",
      alternativeText: "TodoApp Logo"
    }
  },
  link: [
    { text: "Home", href: "/", external: false },
    { text: "Features", href: "/features", external: false },
    { text: "Pricing", href: "/pricing", external: false },
    { text: "About", href: "/about", external: false }
  ],
  cta: {
    text: "Get Started",
    href: "/signup",
    external: false
  }
};

export async function GET() {
  try {
     const response = await fetch('http://localhost:4000/graphql', {
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    query: `query { topnav { logoLink { text href image { url alternativeText name } } link { text href external } cta { text href external } } }`
       })
     });
     const data = await response.json();
     return NextResponse.json(data.data.topnav);

  } catch (error) {
    console.error('Error fetching nav data:', error);
    return NextResponse.json(defaultNavData);
  }
}