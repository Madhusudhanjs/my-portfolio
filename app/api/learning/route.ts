// app/api/learning/analyze/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { logs = [], tasks = [] } = body as {
      logs: any[];
      tasks: any[];
    };

    const shortLogs = logs
      .slice(0, 40)
      .map((l) => ({
        date: l.date,
        time: l.time,
        duration: l.duration,
        category: l.category,
        topic: l.topic,
      }));

    const shortTasks = tasks.slice(0, 40);

    const userPrompt = `
You are an AI mentor for a software engineer learning Java, DSA and Full Stack.

Here is their recent learning data:

LOGS:
${JSON.stringify(shortLogs, null, 2)}

TASKS:
${JSON.stringify(shortTasks, null, 2)}

1. Give a short summary (3–4 lines) of their current focus and consistency.
2. Analyse balance between Java, DSA and projects.
3. Suggest a concrete 3-day plan with bullet points.
Use simple English and keep it under 300 words.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a friendly but honest coding mentor helping a student become an SDE-1 in a product company.",
        },
        { role: "user", content: userPrompt },
      ],
    });

    const text =
      completion.choices[0]?.message?.content?.trim() ||
      "AI could not generate a response this time.";

    return NextResponse.json({ text }, { status: 200 });
  } catch (err: any) {
    console.error("AI learning analyze error:", err);
    return NextResponse.json(
      {
        error:
          err?.message || "Something went wrong while analysing learning data.",
      },
      { status: 500 }
    );
  }
}
