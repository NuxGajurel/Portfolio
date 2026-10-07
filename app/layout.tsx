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
    default: "Nux Gajurel | Best Developer & Freelancer from Biratchowk, Nepal",
    template: "%s | Nux Gajurel — Developer from Biratchowk Nepal",
  },
  description:
    "Nawaraj Gajurel (Nux Gajurel) — Best Full-Stack Web Developer & Freelancer from Biratchowk, Morang, Nepal. Top-rated developer in Biratchowk. Specializing in React, Next.js, Node.js & TypeScript. Available for freelance projects worldwide.",
  keywords: [
    // Name variations
    "Nux Gajurel",
    "Nawaraj Gajurel",
    "Nawaraj Gajurel Biratchowk",
    "Nux Gajurel Nepal",
    "nuxgajurel",
    "Gajurel developer",
    "Nux Gajurel portfolio",
    "Nawaraj Gajurel developer",
    "Nux Gajurel freelancer",
    // Location: Biratchowk (primary target)
    "Biratchowk developer",
    "developer from Biratchowk",
    "best developer Biratchowk",
    "best developer in Biratchowk Nepal",
    "web developer Biratchowk",
    "freelancer Biratchowk",
    "software developer Biratchowk",
    "Biratchowk Nepal developer",
    "Biratchowk web developer",
    "Biratchowk programmer",
    "full stack developer Biratchowk",
    // Location: Biratnagar / Morang
    "Biratnagar developer",
    "developer in Biratnagar",
    "Morang developer",
    "developer in Morang",
    "software developer Biratnagar",
    "web developer Biratnagar",
    "web developer Morang",
    // Nepal-wide
    "best developer Nepal",
    "best freelancer Nepal",
    "best web developer Nepal",
    "top developer Nepal",
    "top freelancer Nepal",
    "Nepal developer",
    "web developer Nepal",
    "full stack developer Nepal",
    "developer in Nepal",
    "React developer Nepal",
    "Next.js developer Nepal",
    "freelance developer Nepal",
    "portfolio Nepal",
    "Nepal freelancer",
    "best Nepal developer",
    "Nepal programmer",
    // Tech stack
    "React developer Nepal",
    "Next.js developer Nepal",
    "Node.js developer Nepal",
    "TypeScript developer Nepal",
    "JavaScript developer Nepal",
    "Tailwind CSS developer Nepal",
    "full stack developer Nepal",
    // General
    "nuxgajurel.com",
    "Nux Gajurel website",
    "Nawaraj Gajurel website",
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
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://nuxgajurel.com",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://nuxgajurel.com",
    siteName: "Nux Gajurel — Developer from Biratchowk Nepal",
    title: "Nux Gajurel | Best Developer & Freelancer from Biratchowk, Nepal",
    description:
      "Nawaraj Gajurel (Nux Gajurel) — Best Full-Stack Web Developer & Freelancer from Biratchowk, Morang, Nepal. React, Next.js, Node.js specialist. Available for freelance worldwide.",
    images: [
      {
        url: "/Nuxgajurel.jpg",
        width: 1200,
        height: 630,
        alt: "Nux Gajurel — Best Developer & Freelancer from Biratchowk, Nepal",
        type: "image/jpeg",
      },
      {
        url: "/nux.png",
        width: 800,
        height: 800,
        alt: "Nawaraj Gajurel (Nux Gajurel) — Portfolio Photo",
        type: "image/png",
      },
      {
        url: "/about.png",
        width: 1200,
        height: 800,
        alt: "Nux Gajurel Portfolio — About Page",
        type: "image/png",
      },
    ],
    firstName: "Nawaraj",
    lastName: "Gajurel",
    username: "nuxgajurel",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nux Gajurel | Best Developer & Freelancer from Biratchowk Nepal",
    description:
      "Nawaraj Gajurel (Nux Gajurel) — Best Full-Stack Web Developer & Freelancer from Biratchowk, Morang, Nepal.",
    images: ["/Nuxgajurel.jpg"],
    creator: "@nuxgajurel",
    site: "@nuxgajurel",
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
          {/* JSON-LD #1: Person Schema — Google Knowledge Panel & Rich Results */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://nuxgajurel.com/#person",
                name: "Nawaraj Gajurel",
                alternateName: ["Nux Gajurel", "nuxgajurel", "Nawaraj Gajurel Biratchowk"],
                url: "https://nuxgajurel.com",
                image: {
                  "@type": "ImageObject",
                  url: "https://nuxgajurel.com/Nuxgajurel.jpg",
                  width: 1200,
                  height: 630,
                  caption: "Nawaraj Gajurel (Nux Gajurel) — Best Developer from Biratchowk Nepal",
                },
                jobTitle: "Full-Stack Web Developer & Freelancer",
                description:
                  "Nawaraj Gajurel, also known as Nux Gajurel, is the best Full-Stack Web Developer and Freelancer from Biratchowk, Morang, Nepal. Specializes in React.js, Next.js, Node.js, TypeScript, and modern web technologies.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Biratchowk",
                  addressLocality: "Biratchowk",
                  addressRegion: "Morang",
                  addressCountry: "NP",
                  postalCode: "56700",
                },
                birthPlace: {
                  "@type": "Place",
                  name: "Biratchowk, Morang, Nepal",
                },
                nationality: {
                  "@type": "Country",
                  name: "Nepal",
                },
                sameAs: [
                  "https://github.com/NuxGajurel",
                  "https://www.instagram.com/nuxgajurel/",
                  "https://www.linkedin.com/in/nux-gajurel-355962348/",
                  "https://app.daily.dev/nuxgajurel",
                  "https://nuxgajurel.com",
                  "https://nuxgajurel.com/about",
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
                  "Express.js",
                  "MySQL",
                  "PostgreSQL",
                  "Git",
                  "REST API",
                ],
                hasOccupation: {
                  "@type": "Occupation",
                  name: "Full-Stack Web Developer",
                  occupationLocation: {
                    "@type": "City",
                    name: "Biratchowk, Morang, Nepal",
                  },
                  description: "Best Full-Stack Web Developer and Freelancer from Biratchowk Nepal",
                },
                worksFor: {
                  "@type": "Organization",
                  name: "Avyanta Tech",
                  url: "https://avyantatech.com/np",
                },
                mainEntityOfPage: {
                  "@type": "ProfilePage",
                  "@id": "https://nuxgajurel.com/about",
                },
              }),
            }}
          />

          {/* JSON-LD #2: WebSite Schema — Enables Google Sitelinks + SearchBox */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://nuxgajurel.com/#website",
                name: "Nux Gajurel — Best Developer from Biratchowk Nepal",
                url: "https://nuxgajurel.com",
                description:
                  "Official portfolio website of Nawaraj Gajurel (Nux Gajurel), the best Full-Stack Developer and Freelancer from Biratchowk, Morang, Nepal.",
                author: {
                  "@type": "Person",
                  "@id": "https://nuxgajurel.com/#person",
                  name: "Nawaraj Gajurel",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://nuxgajurel.com/?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                about: {
                  "@type": "Person",
                  name: "Nawaraj Gajurel",
                  alternateName: "Nux Gajurel",
                },
              }),
            }}
          />

          {/* JSON-LD #3: ProfilePage Schema — Google Profile Overview Panel */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "@id": "https://nuxgajurel.com/#profilepage",
                url: "https://nuxgajurel.com",
                name: "Nux Gajurel — Best Developer & Freelancer from Biratchowk Nepal",
                dateCreated: "2025-01-01T00:00:00+05:45",
                dateModified: new Date().toISOString(),
                mainEntity: {
                  "@type": "Person",
                  "@id": "https://nuxgajurel.com/#person",
                  name: "Nawaraj Gajurel",
                  alternateName: ["Nux Gajurel", "nuxgajurel"],
                  description:
                    "Best Full-Stack Web Developer & Freelancer from Biratchowk, Morang, Nepal. Specializing in React, Next.js, Node.js.",
                  image: "https://nuxgajurel.com/Nuxgajurel.jpg",
                  url: "https://nuxgajurel.com",
                  sameAs: [
                    "https://github.com/NuxGajurel",
                    "https://www.instagram.com/nuxgajurel/",
                    "https://www.linkedin.com/in/nux-gajurel-355962348/",
                  ],
                },
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Nux Gajurel",
                      item: "https://nuxgajurel.com",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "About",
                      item: "https://nuxgajurel.com/about",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Projects",
                      item: "https://nuxgajurel.com/projects",
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "Blogs",
                      item: "https://nuxgajurel.com/blogs",
                    },
                    {
                      "@type": "ListItem",
                      position: 5,
                      name: "Photos",
                      item: "https://nuxgajurel.com/photos",
                    },
                    {
                      "@type": "ListItem",
                      position: 6,
                      name: "Contact",
                      item: "https://nuxgajurel.com/contact",
                    },
                    {
                      "@type": "ListItem",
                      position: 7,
                      name: "Dashboard",
                      item: "https://nuxgajurel.com/dashboard",
                    },
                    {
                      "@type": "ListItem",
                      position: 8,
                      name: "Guestbook",
                      item: "https://nuxgajurel.com/guestbook",
                    },
                  ],
                },
              }),
            }}
          />

          {/* JSON-LD #4: ImageObject Collection — Helps Photos show in Google Images */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Nux Gajurel — Portfolio Photos & Projects",
                description: "Photos, portfolio, and project screenshots of Nawaraj Gajurel (Nux Gajurel), best developer from Biratchowk Nepal",
                url: "https://nuxgajurel.com/photos",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "ImageObject",
                      name: "Nawaraj Gajurel (Nux Gajurel) — Profile Photo",
                      description: "Profile photo of Nawaraj Gajurel, best developer from Biratchowk Nepal",
                      url: "https://nuxgajurel.com/Nuxgajurel.jpg",
                      contentUrl: "https://nuxgajurel.com/Nuxgajurel.jpg",
                      thumbnailUrl: "https://nuxgajurel.com/Nuxgajurel.jpg",
                      width: 1200,
                      height: 630,
                      author: { "@type": "Person", name: "Nawaraj Gajurel" },
                      representativeOfPage: true,
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "ImageObject",
                      name: "Nux Gajurel — Portfolio Homepage",
                      description: "Portfolio homepage screenshot of Nux Gajurel, full-stack developer from Biratchowk Nepal",
                      url: "https://nuxgajurel.com/homepage.png",
                      contentUrl: "https://nuxgajurel.com/homepage.png",
                      thumbnailUrl: "https://nuxgajurel.com/homepage.png",
                      author: { "@type": "Person", name: "Nawaraj Gajurel" },
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@type": "ImageObject",
                      name: "Nux Gajurel — About Page",
                      description: "About page of Nux Gajurel (Nawaraj Gajurel), freelancer from Biratchowk Nepal",
                      url: "https://nuxgajurel.com/about.png",
                      contentUrl: "https://nuxgajurel.com/about.png",
                      thumbnailUrl: "https://nuxgajurel.com/about.png",
                      author: { "@type": "Person", name: "Nawaraj Gajurel" },
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@type": "ImageObject",
                      name: "Nux Gajurel — Projects Portfolio",
                      description: "Projects built by Nawaraj Gajurel (Nux Gajurel), top developer from Biratchowk Nepal",
                      url: "https://nuxgajurel.com/project.png",
                      contentUrl: "https://nuxgajurel.com/project.png",
                      thumbnailUrl: "https://nuxgajurel.com/project.png",
                      author: { "@type": "Person", name: "Nawaraj Gajurel" },
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    item: {
                      "@type": "ImageObject",
                      name: "Nux Gajurel — Developer Photo Nepal",
                      description: "Nawaraj Gajurel (Nux Gajurel) developer photo, Biratchowk Nepal",
                      url: "https://nuxgajurel.com/nux.png",
                      contentUrl: "https://nuxgajurel.com/nux.png",
                      thumbnailUrl: "https://nuxgajurel.com/nux.png",
                      author: { "@type": "Person", name: "Nawaraj Gajurel" },
                    },
                  },
                ],
              }),
            }}
          />

          {/* Geo meta tags — Biratchowk, Morang */}
          <meta name="geo.region" content="NP-4" />
          <meta name="geo.placename" content="Biratchowk, Morang, Nepal" />
          <meta name="geo.position" content="26.5000;87.3000" />
          <meta name="ICBM" content="26.5000, 87.3000" />
          <meta name="author" content="Nawaraj Gajurel (Nux Gajurel)" />
          <meta name="subject" content="Full-Stack Web Developer & Freelancer from Biratchowk Nepal" />
          <meta name="classification" content="Developer Portfolio" />
          <meta name="rating" content="general" />
          <meta name="revisit-after" content="3 days" />
          <meta name="language" content="English" />
          <meta name="copyright" content="Nawaraj Gajurel" />
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

