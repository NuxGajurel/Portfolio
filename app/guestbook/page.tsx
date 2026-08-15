import Link from "next/link";
import { FiBookOpen, FiMessageSquare } from "react-icons/fi";

export default function GuestbookPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiBookOpen className="text-purple-500" />
            Guestbook
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Leave a message or signature for visitors of this portfolio.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 text-center space-y-4">
          <FiMessageSquare size={36} className="mx-auto text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Guestbook Coming Soon</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            Interactive guestbook comments feature is currently under construction. Check back soon!
          </p>
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
