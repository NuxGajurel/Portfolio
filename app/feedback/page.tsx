import Link from "next/link";
import { FiThumbsUp, FiSend } from "react-icons/fi";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiThumbsUp className="text-amber-500" />
            Feedback
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Have thoughts or suggestions? Reach out directly via the contact page.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 text-center space-y-4">
          <FiSend size={36} className="mx-auto text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Share Your Feedback</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            I appreciate feedback on my projects and portfolio design! You can send me a message directly anytime.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition-all"
            >
              Go to Contact Form
            </Link>
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
