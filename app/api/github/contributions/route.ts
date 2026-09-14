import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
  errors?: { message: string }[];
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return NextResponse.json(
      { error: "GitHub token or username not configured" },
      { status: 500 }
    );
  }

  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const from = oneYearAgo.toISOString();
  const to = now.toISOString();

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
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
      },
      body: JSON.stringify({ query, variables: { username, from, to } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const json: GraphQLResponse = await response.json();

    if (json.errors?.length) {
      return NextResponse.json(
        { error: json.errors[0].message },
        { status: 400 }
      );
    }

    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "No contribution data found" },
        { status: 404 }
      );
    }

    const days: ContributionDay[] = calendar.weeks.flatMap(
      (week) => week.contributionDays
    );

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      days,
    });
  } catch (err) {
    console.error("GitHub contributions fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
