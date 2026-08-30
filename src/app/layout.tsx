import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { NavBar } from "@/components/site/nav-bar";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { INFO } from "@/content/portfolio";

import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Generated into public/ at build time by scripts/generate-og.mjs. */
const OG_IMAGE = "/og.png";
const OG_ALT = `${INFO.main.name}, ${INFO.main.title}`;

export const metadata: Metadata = {
  title: {
    default: `${INFO.main.name} | ${INFO.main.title}`,
    template: `%s | ${INFO.main.name}`,
  },
  description: INFO.homepage.description,
  authors: [{ name: INFO.main.name }],
  creator: INFO.main.name,
  metadataBase: new URL(INFO.main.site),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${INFO.main.name} | ${INFO.main.title}`,
    description: INFO.homepage.description,
    siteName: INFO.main.name,
    url: "/",
    locale: "en_CA",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${INFO.main.name} | ${INFO.main.title}`,
    description: INFO.homepage.description,
    images: [{ url: OG_IMAGE, alt: OG_ALT }],
  },
};

/** Person schema, so search engines can tie the site to a named human. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: INFO.main.name,
  jobTitle: INFO.main.title,
  email: `mailto:${INFO.main.email}`,
  url: INFO.main.site,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  sameAs: INFO.socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href),
  knowsAbout: Object.values(INFO.techStack).flat(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link id="favicon" rel="icon" href="/sj-darkmode.png" />
        <link rel="apple-touch-icon" href="/sj-darkmode.png" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground flex min-h-full flex-col"
      >
        <ThemeProvider>
          <TooltipProvider>
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
