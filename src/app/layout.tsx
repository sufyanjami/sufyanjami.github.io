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

export const metadata: Metadata = {
  title: {
    default: `${INFO.main.name} — ${INFO.main.title}`,
    template: `%s | ${INFO.main.name}`,
  },
  description: INFO.homepage.description,
  authors: [{ name: INFO.main.name }],
  metadataBase: new URL("https://sufyanjami.github.io"),
  openGraph: {
    title: `${INFO.main.name} — ${INFO.main.title}`,
    description: INFO.homepage.description,
    siteName: INFO.main.name,
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
