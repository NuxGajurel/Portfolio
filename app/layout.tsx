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
  title: "Nux Gajurel | Portfolio",
  description: "Portfolio of Nux Gajurel, a passionate web developer from Nepal.",
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

