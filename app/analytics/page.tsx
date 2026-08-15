import Link from "next/link";
import { FiTrendingUp, FiEye, FiGlobe, FiClock } from "react-icons/fi";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiTrendingUp className="text-emerald-500" />
            Analytics
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Overview of traffic, visitors, and portfolio interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <FiEye size={20} />
              <span className="text-sm font-medium">Monthly Views</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">1.2K+</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <FiGlobe size={20} />
              <span className="text-sm font-medium">Top Region</span>
            </div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Asia / Global</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <FiClock size={20} />
              <span className="text-sm font-medium">Uptime</span>
            </div>
            <p className="text-xl font-semibold text-emerald-500">99.9%</p>
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
