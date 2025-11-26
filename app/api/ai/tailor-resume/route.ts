// app/api/ai/tailor-resume/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const jobTitle = (body.jobTitle ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();

  const title = jobTitle || "your role";

  const result = `
🔧 Tailored Summary for ${title}

• Strong foundation in Java, Data Structures & Algorithms, and backend logic.
• Experience building full-stack projects with clean structure and readable code.
• Excited to contribute to real-world product teams and keep improving problem-solving skills.

🎯 Why You’re a Match
Based on the job description you provided, focus on:
1) Writing clean, maintainable code
2) Owning features end-to-end
3) Learning quickly and adapting to new tools

You can highlight:
- Your GitHub projects and what real problems they solve
- Your consistency in learning (Java, DSA, full stack)
- Your goal to grow into a strong SDE-1 in a product company.
  `.trim();

  return NextResponse.json({ result }, { status: 200 });
}

// Optional GET handler, just to see it's alive if you hit it in browser
export async function GET() {
  return NextResponse.json(
    { message: "Use POST /api/ai/tailor-resume with jobTitle + jobDescription." },
    { status: 200 }
  );
}
