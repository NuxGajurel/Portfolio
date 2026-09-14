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

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    if (data.errors && data.errors.length > 0) {
      return NextResponse.json(
        { error: data.errors[0].message },
        { status: 400 }
      );
    }

    const rawNodes = data.data?.user?.repositories?.nodes || [];

    // Filter out profile README repository (named exact same as username without code/description)
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
  } catch (err) {
    console.error("Failed to fetch all repositories:", err);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
