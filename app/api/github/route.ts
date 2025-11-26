export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/Madhusudhanjs/repos", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/vnd.github+json",
      },
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "GitHub API failed" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // body will contain { logs, tasks } from the frontend
    const prompt = `
You are a strict but supportive learning mentor for a software developer.

Analyse this JSON data and answer in 4 clear sections:

1. Summary of what the student actually did.
2. Strengths (max 4 bullet points).
3. Weaknesses / gaps (max 4 bullet points).
4. Concrete plan for the next 3 days (bullet list, with topic + rough time).

Student data (logs + tasks):
${JSON.stringify(body, null, 2)}
`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent" +
        `?key=${process.env.AIzaSyCutSBhSOlDZwFCIg2Aw2ji20JzXi8lR-o}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini error:", errorText);
      return NextResponse.json(
        { error: "Gemini API error", detail: errorText },
        { status: 500 }
      );
    }

    const data = await res.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "AI response was empty.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Analyze route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
