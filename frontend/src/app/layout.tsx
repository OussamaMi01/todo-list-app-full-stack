// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { footerData } from "../lib/api/nav";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Checki - Todo List Manager",
  description: "The ultimate task management solution that helps you organize, prioritize, and accomplish your goals.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Providers>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer data={footerData} />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}