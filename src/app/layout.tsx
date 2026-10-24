import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { WhatsAppLauncher } from "@/components/layout/WhatsAppLauncher";
import { siteConfig } from "@/config/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Srivofy helps businesses automate customer conversations, streamline operations, process documents and build better digital experiences with practical AI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.website),
  title: {
    default: "Srivofy | AI Automation for Business",
    template: "%s | Srivofy",
  },
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Srivofy | AI Automation for Business",
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#101d36",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-navy px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <UtilityBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppLauncher />
      </body>
    </html>
  );
}
