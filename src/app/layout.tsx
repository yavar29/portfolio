import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { certifications } from "@/lib/data";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "AI Engineer",
  url: SITE.url,
  email: SITE.email,
  worksFor: { "@type": "Organization", name: "Aerveil" },
  address: { "@type": "PostalAddress", addressLocality: "San Jose", addressRegion: "CA", addressCountry: "US" },
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University at Buffalo, SUNY" },
    { "@type": "CollegeOrUniversity", name: "Amity University" },
  ],
  hasCredential: certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert.title,
    recognizedBy: { "@type": "Organization", name: cert.issuer },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${schibsted.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
