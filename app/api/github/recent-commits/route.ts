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

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "NuxGajurel";

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 500 }
    );
  }

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
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const json: GraphQLResponse = await response.json();

    if (json.errors && json.errors.length > 0) {
      return NextResponse.json(
        { error: json.errors[0].message },
        { status: 400 }
      );
    }

    const nodes = json.data?.user?.repositories?.nodes || [];

    // Filter out profile README repos (named exact same as username without code) or repos with no commits
    const candidateProjects: (ProjectCommitData & { _commitTime: number })[] = [];

    for (const repo of nodes) {
      // If repo name is equal to username and has no description or primary language, skip it
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

    // Sort strictly by latest commit date descending so the most recently active projects are on top
    candidateProjects.sort((a, b) => b._commitTime - a._commitTime);

    const projectCommits: ProjectCommitData[] = candidateProjects
      .slice(0, 3)
      .map(({ _commitTime, ...item }) => item);

    return NextResponse.json({
      projects: projectCommits,
      username,
    });
  } catch (error) {
    console.error("Error fetching recent project commits:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent project commits" },
      { status: 500 }
    );
  }
}
