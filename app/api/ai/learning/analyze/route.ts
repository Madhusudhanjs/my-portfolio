// app/api/ai/learning-analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs"; // make sure we use Node runtime

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set on the server." },
        { status: 500 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { logs = [], tasks = [] } = body as {
      logs: any[];
      tasks: any[];
    };

    const prompt = `
You are a strict but supportive learning coach for a Java + DSA + Full Stack developer.

User's learning data (JSON):
- Logs (sessions): ${JSON.stringify(logs, null, 2)}
- Tasks: ${JSON.stringify(tasks, null, 2)}

1. Briefly summarise their recent learning pattern (max 4 lines).
2. Comment on balance between Java, DSA, and projects.
3. Point out 2–3 mistakes or gaps they might have (honest but kind).
4. Give a 3-day action plan in bullet points (with concrete tasks).
5. End with one short motivational line (not cringe).
Use simple English and keep it within ~200–250 words.
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // or "gpt-4.1" if your key supports it
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a focused learning mentor for a beginner SDE preparing for 10+ LPA roles.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0].message.content || "";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("AI learning-analyze error:", err);
    return NextResponse.json(
      { error: "Failed to generate AI analysis. Check server logs." },
      { status: 500 }
    );
  }
}
