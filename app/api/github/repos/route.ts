import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export interface RepoItem {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  React: "#61dafb",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

async function fetchPublicRepos(username: string): Promise<RepoItem[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: {
        "User-Agent": "nux-portfolio",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub REST API returned ${res.status}`);
  }

  const rawRepos = await res.json();
  if (!Array.isArray(rawRepos)) {
    return [];
  }

  return rawRepos
    .filter((repo: any) => {
      if (
        repo.name.toLowerCase() === username.toLowerCase() &&
        !repo.description &&
        !repo.language
      ) {
        return false;
      }
      return true;
    })
    .map((repo: any) => ({
      id: String(repo.id),
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stargazerCount: repo.stargazers_count || 0,
      forkCount: repo.forks_count || 0,
      pushedAt: repo.pushed_at,
      primaryLanguage: repo.language
        ? {
            name: repo.language,
            color: LANGUAGE_COLORS[repo.language] || "#888888",
          }
        : null,
    }))
    .sort((a, b) => b.stargazerCount - a.stargazerCount);
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "NuxGajurel";

  if (token && !token.startsWith("your_")) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(
            first: 100,
            ownerAffiliations: OWNER,
            orderBy: { field: STARGAZERS, direction: DESC }
          ) {
            totalCount
            nodes {
              id
              name
              description
              url
              stargazerCount
              forkCount
              pushedAt
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    `;

    try {
      const res = await fetch(GITHUB_GRAPHQL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "nux-portfolio",
        },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.errors || data.errors.length === 0) {
          const rawNodes = data.data?.user?.repositories?.nodes || [];

          const repos: RepoItem[] = rawNodes
            .filter((repo: RepoItem) => {
              if (
                repo.name.toLowerCase() === username.toLowerCase() &&
                !repo.description &&
                !repo.primaryLanguage
              ) {
                return false;
              }
              return true;
            })
            .map((repo: RepoItem) => ({
              id: repo.id || repo.name,
              name: repo.name,
              description: repo.description,
              url: repo.url,
              stargazerCount: repo.stargazerCount || 0,
              forkCount: repo.forkCount || 0,
              pushedAt: repo.pushedAt,
              primaryLanguage: repo.primaryLanguage,
            }));

          return NextResponse.json({
            repos,
            totalCount: repos.length,
            username,
          });
        }
      } else {
        console.warn(`GitHub GraphQL repos returned ${res.status}, using public REST fallback...`);
      }
    } catch (err) {
      console.warn("Failed GraphQL repos fetch, using fallback:", err);
    }
  }

  // Fallback to public GitHub REST API
  try {
    const repos = await fetchPublicRepos(username);
    return NextResponse.json({
      repos,
      totalCount: repos.length,
      username,
    });
  } catch (err) {
    console.error("Failed to fetch repositories (both GraphQL and fallback):", err);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
