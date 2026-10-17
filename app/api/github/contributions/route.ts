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

function mapLevel(
  level: number
): "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE" {
  switch (level) {
    case 1:
      return "FIRST_QUARTILE";
    case 2:
      return "SECOND_QUARTILE";
    case 3:
      return "THIRD_QUARTILE";
    case 4:
      return "FOURTH_QUARTILE";
    default:
      return "NONE";
  }
}

async function fetchPublicContributions(username: string) {
  const fallbackRes = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    {
      headers: { "User-Agent": "nux-portfolio" },
      next: { revalidate: 3600 },
    }
  );

  if (!fallbackRes.ok) {
    throw new Error(`Fallback contributions API returned ${fallbackRes.status}`);
  }

  const data = await fallbackRes.json();
  const days: ContributionDay[] = (data.contributions || []).map((c: { date: string; count: number; level: number }) => ({
    date: c.date,
    contributionCount: c.count,
    contributionLevel: mapLevel(c.level),
  }));

  const totalContributions =
    data.total?.lastYear ??
    days.reduce((sum, d) => sum + d.contributionCount, 0);

  return { totalContributions, days };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "NuxGajurel";

  // If token is provided, try GitHub GraphQL API first
  if (token && !token.startsWith("your_")) {
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
          "User-Agent": "nux-portfolio",
        },
        body: JSON.stringify({ query, variables: { username, from, to } }),
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const json: GraphQLResponse = await response.json();

        if (!json.errors?.length) {
          const calendar =
            json.data?.user?.contributionsCollection?.contributionCalendar;

          if (calendar) {
            const days: ContributionDay[] = calendar.weeks.flatMap(
              (week) => week.contributionDays
            );

            return NextResponse.json({
              totalContributions: calendar.totalContributions,
              days,
            });
          }
        }
      } else {
        console.warn(`GitHub GraphQL returned ${response.status}, attempting fallback...`);
      }
    } catch (err) {
      console.warn("GraphQL contributions fetch failed, trying fallback:", err);
    }
  }

  // Fallback: public contributions API
  try {
    const fallbackData = await fetchPublicContributions(username);
    return NextResponse.json(fallbackData);
  } catch (err) {
    console.error("GitHub contributions fetch error (both GraphQL and fallback failed):", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
