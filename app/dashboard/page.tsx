import Link from "next/link";
import { FiBarChart2, FiActivity, FiCode, FiGitCommit } from "react-icons/fi";

export default function DashboardPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiBarChart2 className="text-blue-500" />
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Personal metrics, active statistics, and developer stats summary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <FiGitCommit size={20} />
              <span className="text-sm font-medium">GitHub Repos</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">25+</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <FiCode size={20} />
              <span className="text-sm font-medium">Primary Tech</span>
            </div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Full-Stack</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <FiActivity size={20} />
              <span className="text-sm font-medium">Status</span>
            </div>
            <p className="text-xl font-semibold text-emerald-500">Available for Work</p>
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
