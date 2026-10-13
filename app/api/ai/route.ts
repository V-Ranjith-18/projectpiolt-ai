import { NextResponse } from "next/server";

type OllamaResponse = {
  response?: string;
  error?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as {
    message?: string;
    workspaceTitle?: string;
    workspaceGoal?: string;
  };

  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json(
      { error: "Please enter a question for the AI assistant." },
      { status: 400 },
    );
  }

  const context = [
    "You are ProjectPilot, a patient coding mentor for a first-year B.Tech student.",
    "Explain concepts clearly and do not claim the student has professional experience.",
    "Give practical, safe, beginner-friendly steps.",
    `Current practice project: ${body.workspaceTitle || "Not specified"}.`,
    `Project goal: ${body.workspaceGoal || "Not specified"}.`,
    `Student question: ${message}`,
  ].join("\n\n");

  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5-coder:7b",
        prompt: context,
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 1800,
        },
      }),
    });

    const data = (await response.json()) as OllamaResponse;

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Ollama returned an error." },
        { status: 502 },
      );
    }

    if (!data.response) {
      return NextResponse.json(
        { error: "Ollama returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ response: data.response });
  } catch {
    return NextResponse.json(
      {
        error:
          "ProjectPilot could not connect to Ollama. Start Ollama and try again.",
      },
      { status: 503 },
    );
  }
}
