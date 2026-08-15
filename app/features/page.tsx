import Link from "next/link";
import { FiStar, FiCheckCircle } from "react-icons/fi";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiStar className="text-indigo-500" />
            Features & Highlights
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Overview of features integrated into this portfolio website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 font-semibold">
              <FiCheckCircle /> Next.js 16 App Router
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with server-side rendering, server actions, and full React 19 support.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 font-semibold">
              <FiCheckCircle /> Modern Styling & Dark Mode
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tailwind CSS, Framer Motion animations, and custom theme switching.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 font-semibold">
              <FiCheckCircle /> Resend Email Integration
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Direct message delivery with server actions and Resend email API.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 font-semibold">
              <FiCheckCircle /> Responsive Layout
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fully optimized for mobile, tablet, and desktop viewports.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
