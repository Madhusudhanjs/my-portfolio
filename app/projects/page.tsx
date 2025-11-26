import ProjectsClient from "./ProjectsClient";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage?: string | null;
  pushed_at: string;
  fork: boolean;
};

const GITHUB_USERNAME = "Madhusudhanjs";

async function getRepos(): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`,
    {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  const data = await res.json();

  return data.filter(
    (repo: Repo) =>
      !repo.fork &&
      repo.name.toLowerCase() !== `${GITHUB_USERNAME.toLowerCase()}.github.io`
  );
}

export default async function ProjectsPage() {
  const repos = await getRepos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#02010A] via-[#050816] to-black text-slate-100 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back Home */}
        <div className="flex justify-between text-xs">
          <a
            href="/"
            className="px-3 py-1.5 border border-slate-700 rounded-full hover:border-white transition"
          >
            ← Back to Home
          </a>
        </div>

        {/* Heading */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">Projects</h1>
          <p className="text-sm text-slate-400">
            Auto-loaded from my GitHub.  
            Every project is a step toward product-based full stack roles.
          </p>
        </header>

        {/* Send to Client */}
        <ProjectsClient repos={repos} />

      </div>
    </main>
  );
}
