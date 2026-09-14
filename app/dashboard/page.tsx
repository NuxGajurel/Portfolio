import GitHubContributions from "@/components/github-contributions";
import RecentProjectCommits from "@/components/recent-project-commits";
import GitHubAchievements from "@/components/github-achievements";
import AllProjectsTable from "@/components/all-projects-table";

import { projects } from "@/data/projects";

export const metadata = {
  title: "Dashboard | Nux Gajurel",
  description: "Personal metrics, GitHub activity, and developer stats for Nux Gajurel.",
};

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
}

async function getGitHubStats(): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "NuxGajurel";

  if (!token) return { totalRepos: 24, totalStars: 20 };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "nux-portfolio",
      },
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              repositories(first: 100, ownerAffiliations: OWNER) {
                totalCount
                nodes {
                  stargazerCount
                }
              }
            }
          }
        `,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return { totalRepos: 24, totalStars: 20 };
    const json = await res.json();
    const repos = json.data?.user?.repositories?.nodes || [];
    const totalStars = repos.reduce(
      (sum: number, repo: { stargazerCount?: number }) =>
        sum + (repo.stargazerCount || 0),
      0
    );
    const totalRepos = json.data?.user?.repositories?.totalCount ?? 24;

    return { totalRepos, totalStars };
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
    return { totalRepos: 24, totalStars: 20 };
  }
}

export default async function DashboardPage() {
  const stats = await getGitHubStats();
  const projectCount = projects.length;

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Personal metrics, active statistics, and developer stats summary.
          </p>
        </div>

        {/* Top 3 Metrics Cards */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Card 1: Projects & Repos */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex flex-col justify-between min-h-[140px]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                Projects &amp; Repos
              </span>
              <p className="text-3xl sm:text-4xl font-bold font-mono text-gray-900 dark:text-white my-2">
                {stats.totalRepos}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {stats.totalRepos} on GitHub • {projectCount} featured
              </span>
            </div>

            {/* Card 2: Total Stars */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex flex-col justify-between min-h-[140px]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                Total Stars
              </span>
              <p className="text-3xl sm:text-4xl font-bold font-mono text-gray-900 dark:text-white my-2 flex items-baseline gap-1.5">
                {stats.totalStars}
                <span className="text-base font-normal text-amber-500">★</span>
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Earned across repositories
              </span>
            </div>

            {/* Card 3: GitHub Achievements */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex flex-col justify-between min-h-[140px]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                Achievements
              </span>
              <p className="text-3xl sm:text-4xl font-bold font-mono text-gray-900 dark:text-white my-2">
                3
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Pull Shark, YOLO, Quickdraw
              </span>
            </div>
          </div>

          {/* Sub-bar line matching screenshot */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 px-1 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Live synced from GitHub</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>Real-time developer metrics</span>
          </div>
        </div>

        {/* GitHub Achievements Badges */}
        <GitHubAchievements />

        {/* GitHub Contribution Graph */}
        <GitHubContributions />

        {/* Top 3 Project Recent Commits */}
        <RecentProjectCommits />

        {/* All Projects & Repositories Table */}
        <AllProjectsTable />
      </div>
    </main>
  );
}
