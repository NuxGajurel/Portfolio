import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";

import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuxgajurel.com"),
  title: {
    default: "Nux Gajurel | Full-Stack Developer from Nepal",
    template: "%s | Nux Gajurel",
  },
  description:
    "Nawaraj Gajurel (Nux Gajurel) — Full-Stack Web Developer from Biratnagar, Morang, Nepal. Specializing in React, Next.js, Node.js & TypeScript. Available for freelance projects.",
  keywords: [
    "Nux Gajurel",
    "Nawaraj Gajurel",
    "Gajurel",
    "nuxgajurel",
    "web developer Nepal",
    "full stack developer Nepal",
    "developer in Nepal",
    "Nepal developer",
    "Biratnagar developer",
    "developer in Biratnagar",
    "Morang developer",
    "developer in Morang",
    "React developer Nepal",
    "Next.js developer Nepal",
    "freelance developer Nepal",
    "portfolio Nepal",
    "software developer Biratnagar",
    "web developer Biratnagar",
    "web developer Morang",
    "Nawaraj Gajurel developer",
    "Nux Gajurel portfolio",
  ],
  authors: [{ name: "Nawaraj Gajurel", url: "https://nuxgajurel.com" }],
  creator: "Nawaraj Gajurel",
  publisher: "Nawaraj Gajurel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nuxgajurel.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuxgajurel.com",
    siteName: "Nux Gajurel",
    title: "Nux Gajurel | Full-Stack Developer from Nepal",
    description:
      "Nawaraj Gajurel (Nux Gajurel) — Full-Stack Web Developer from Biratnagar, Morang, Nepal. React, Next.js, Node.js specialist. Available for freelance.",
    images: [
      {
        url: "/Nuxgajurel.jpg",
        width: 1200,
        height: 630,
        alt: "Nux Gajurel — Full-Stack Developer from Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nux Gajurel | Full-Stack Developer from Nepal",
    description:
      "Nawaraj Gajurel (Nux Gajurel) — Full-Stack Web Developer from Biratnagar, Morang, Nepal.",
    images: ["/Nuxgajurel.jpg"],
    creator: "@nuxgajurel",
  },
  category: "technology",
  verification: {
    google: "mqw0MiXLjInXa6NbLVnSBP7XgIsrGZvnKI7mLNEc6Ao",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* JSON-LD Person Schema — Google Rich Results */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Nawaraj Gajurel",
                alternateName: ["Nux Gajurel", "nuxgajurel"],
                url: "https://nuxgajurel.com",
                image: "https://nuxgajurel.com/Nuxgajurel.jpg",
                jobTitle: "Full-Stack Web Developer",
                description:
                  "Nawaraj Gajurel, also known as Nux Gajurel, is a Full-Stack Web Developer from Biratnagar, Morang, Nepal. Specializes in React.js, Next.js, Node.js, TypeScript, and modern web technologies.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Biratnagar",
                  addressRegion: "Morang",
                  addressCountry: "NP",
                },
                sameAs: [
                  "https://github.com/NuxGajurel",
                  "https://www.instagram.com/nuxgajurel/",
                  "https://www.linkedin.com/in/nux-gajurel-355962348/",
                  "https://app.daily.dev/nuxgajurel",
                ],
                knowsAbout: [
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "JavaScript",
                  "Tailwind CSS",
                  "Full-Stack Web Development",
                  "Freelance Web Development",
                ],
              }),
            }}
          />
          <meta name="geo.region" content="NP-4" />
          <meta name="geo.placename" content="Biratnagar, Morang, Nepal" />
          <meta name="geo.position" content="26.4525;87.2718" />
          <meta name="ICBM" content="26.4525, 87.2718" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} relative antialiased bg-[#fafafa] dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-gray-200 dark:selection:bg-gray-800`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* Full-site background */}
            <div className="fixed inset-0 z-0 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-500" />

            {/* Dot pattern — full site background everywhere */}
            <div className="dot-bg z-0" />

            <div className="relative z-10 min-h-screen flex flex-col bg-transparent transition-colors duration-500">
              <Navbar />
              <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8">{children}</main>
              <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8">
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

