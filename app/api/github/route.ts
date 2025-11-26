import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Madhusudhanjs";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status, res.statusText);
      return NextResponse.json(
        { error: "Failed to fetch repositories from GitHub" },
        { status: 500 }
      );
    }

    const repos = (await res.json()) as any[];

    const simplified = repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        pushed_at: repo.pushed_at,
      }));

    return NextResponse.json({ repos: simplified }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error while fetching GitHub repos:", error);
    return NextResponse.json(
      { error: "Unexpected error while fetching repositories" },
      { status: 500 }
    );
  }
}
