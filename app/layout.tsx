import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Full-site background */}
          <div className="fixed inset-0 -z-20 bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-500" />

          {/* Dot pattern — full site background */}
          <div className="dot-bg" />

          <div className="relative z-10 min-h-screen transition-colors duration-500">
            <Navbar />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
