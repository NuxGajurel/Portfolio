import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export interface ProjectCommitData {
  id: string;
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranch: string;
  commit: {
    oid: string;
    shortOid: string;
    messageHeadline: string;
    message: string;
    committedDate: string;
    url: string;
    author?: {
      name: string;
      avatarUrl?: string;
    };
  } | null;
}

interface GraphQLRepoNode {
  id: string;
  name: string;
  description: string | null;
  url: string;
  isPrivate: boolean;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranchRef: {
    name: string;
    target: {
      history?: {
        nodes?: Array<{
          oid: string;
          messageHeadline: string;
          message: string;
          committedDate: string;
          url: string;
          author?: {
            name: string;
            avatarUrl?: string;
          };
        }>;
      };
    };
  } | null;
}

interface GraphQLResponse {
  data?: {
    user?: {
      repositories?: {
        nodes?: GraphQLRepoNode[];
      };
    };
  };
  errors?: { message: string }[];
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

async function fetchPublicRecentCommits(
  username: string
): Promise<ProjectCommitData[]> {
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=8`,
    {
      headers: {
        "User-Agent": "nux-portfolio",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!reposRes.ok) {
    throw new Error(`GitHub repos returned ${reposRes.status}`);
  }

  const rawRepos = await reposRes.json();
  if (!Array.isArray(rawRepos)) return [];

  const candidateRepos = rawRepos
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
    .slice(0, 5);

  const results = await Promise.allSettled(
    candidateRepos.map(async (repo: any) => {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
        {
          headers: {
            "User-Agent": "nux-portfolio",
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 60 },
        }
      );
      if (!commitsRes.ok) return null;
      const commits = await commitsRes.json();
      if (!Array.isArray(commits) || commits.length === 0) return null;

      const latest = commits[0];
      const commitDate =
        latest.commit?.author?.date ||
        latest.commit?.committer?.date ||
        repo.pushed_at;

      const project: ProjectCommitData & { _commitTime: number } = {
        id: String(repo.id),
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        pushedAt: repo.pushed_at,
        primaryLanguage: repo.language
          ? {
              name: repo.language,
              color: LANGUAGE_COLORS[repo.language] || "#888888",
            }
          : null,
        defaultBranch: repo.default_branch || "main",
        commit: {
          oid: latest.sha,
          shortOid: latest.sha.slice(0, 7),
          messageHeadline: (latest.commit?.message || "").split("\n")[0],
          message: latest.commit?.message || "",
          committedDate: commitDate,
          url: latest.html_url,
          author: {
            name:
              latest.commit?.author?.name ||
              latest.author?.login ||
              username,
            avatarUrl: latest.author?.avatar_url,
          },
        },
        _commitTime: new Date(commitDate).getTime(),
      };
      return project;
    })
  );

  const projects = results
    .filter(
      (
        r
      ): r is PromiseFulfilledResult<
        ProjectCommitData & { _commitTime: number }
      > => r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value)
    .sort((a, b) => b._commitTime - a._commitTime)
    .slice(0, 3)
    .map(({ _commitTime, ...item }) => item);

  return projects;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "NuxGajurel";

  if (token && !token.startsWith("your_")) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(
            first: 30,
            orderBy: { field: PUSHED_AT, direction: DESC },
            ownerAffiliations: OWNER
          ) {
            nodes {
              id
              name
              description
              url
              isPrivate
              pushedAt
              primaryLanguage {
                name
                color
              }
              defaultBranchRef {
                name
                target {
                  ... on Commit {
                    history(first: 1) {
                      nodes {
                        oid
                        messageHeadline
                        message
                        committedDate
                        url
                        author {
                          name
                          avatarUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "nux-portfolio",
        },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 60 },
      });

      if (response.ok) {
        const json: GraphQLResponse = await response.json();

        if (!json.errors || json.errors.length === 0) {
          const nodes = json.data?.user?.repositories?.nodes || [];
          const candidateProjects: (ProjectCommitData & { _commitTime: number })[] = [];

          for (const repo of nodes) {
            if (
              repo.name.toLowerCase() === username.toLowerCase() &&
              !repo.description &&
              !repo.primaryLanguage
            ) {
              continue;
            }

            const commitNode = repo.defaultBranchRef?.target?.history?.nodes?.[0];
            if (!commitNode || !commitNode.committedDate) continue;

            candidateProjects.push({
              id: repo.id || repo.name,
              name: repo.name,
              description: repo.description,
              url: repo.url,
              pushedAt: repo.pushedAt,
              primaryLanguage: repo.primaryLanguage,
              defaultBranch: repo.defaultBranchRef?.name || "main",
              commit: {
                oid: commitNode.oid,
                shortOid: commitNode.oid.slice(0, 7),
                messageHeadline: commitNode.messageHeadline,
                message: commitNode.message,
                committedDate: commitNode.committedDate,
                url: commitNode.url,
                author: commitNode.author,
              },
              _commitTime: new Date(commitNode.committedDate).getTime(),
            });
          }

          candidateProjects.sort((a, b) => b._commitTime - a._commitTime);

          const projectCommits: ProjectCommitData[] = candidateProjects
            .slice(0, 3)
            .map(({ _commitTime, ...item }) => item);

          return NextResponse.json({
            projects: projectCommits,
            username,
          });
        }
      } else {
        console.warn(`GitHub GraphQL recent-commits returned ${response.status}, using public REST fallback...`);
      }
    } catch (error) {
      console.warn("GraphQL recent-commits fetch error, using fallback:", error);
    }
  }

  // Fallback to public GitHub REST API
  try {
    const projects = await fetchPublicRecentCommits(username);
    return NextResponse.json({
      projects,
      username,
    });
  } catch (error) {
    console.error("Error fetching recent project commits (both GraphQL and fallback):", error);
    return NextResponse.json(
      { error: "Failed to fetch recent project commits" },
      { status: 500 }
    );
  }
}
