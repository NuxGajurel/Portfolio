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
          <div className="fixed inset-0 -z-10 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 animate-[moveDots_30s_linear_infinite]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl bg-white dark:bg-[#0a0a0a] border-x border-gray-100 dark:border-gray-800/50 px-4 sm:px-6 lg:px-8 min-h-screen transition-colors duration-500">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
