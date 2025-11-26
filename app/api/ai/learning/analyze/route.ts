// app/api/learning-analysis/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // ignore parse errors for this test
  }

  const logsCount = Array.isArray(body.logs) ? body.logs.length : 0;
  const tasksCount = Array.isArray(body.tasks) ? body.tasks.length : 0;

  return NextResponse.json({
    text:
      `✅ AI mentor TEST route is working.\n\n` +
      `I received ${logsCount} log(s) and ${tasksCount} task(s).\n` +
      `Once you see this message in the UI, routing is correct and you can plug OpenAI back in.`,
  });
}
