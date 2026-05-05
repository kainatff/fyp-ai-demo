import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { system, messages } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast + cheap (good for demo)
      messages: [
        { role: "system", content: system },
        ...messages,
      ],
      max_tokens: 300,
    });

    const text = response.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}