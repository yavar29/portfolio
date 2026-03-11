import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Playfair_Display, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yavar Khan | AI & Software Engineer",
  description:
    "Portfolio of Yavar Khan — AI/ML Engineer bridging Software Engineering and Artificial Intelligence to build intelligent, scalable systems. MS CS (AI/ML) from SUNY Buffalo.",
  keywords: [
    "Yavar Khan",
    "AI Engineer",
    "Software Engineer",
    "Machine Learning",
    "GenAI",
    "LangChain",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: "Yavar Khan" }],
  openGraph: {
    title: "Yavar Khan | AI & Software Engineer",
    description:
      "Building intelligent systems at the intersection of AI/ML and Software Engineering.",
    type: "website",
    locale: "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yavar Khan",
  jobTitle: "AI & Software Engineer",
  url: "https://yavarkhan.dev",
  email: "yavarkhan1997@gmail.com",
  sameAs: [
    "https://github.com/yavar29",
    "https://linkedin.com/in/yavar-khan29",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University at Buffalo, SUNY",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Amity University",
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Generative AI",
    "Software Engineering",
    "LangChain",
    "RAG",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
