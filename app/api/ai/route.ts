import { NextResponse } from "next/server";

type OllamaResponse = {
  response?: string;
  error?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: { message?: string };
};

export async function POST(request: Request) {
  const body = (await request.json()) as {
    message?: string;
    workspaceTitle?: string;
    workspaceGoal?: string;
    provider?: "ollama" | "gemini";
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
    "The student is working in an existing Next.js App Router project, not a plain HTML project.",
    "Do not tell the student to create a separate portfolio-website folder, index.html, about.html, portfolio.html, or styles.css.",
    "Refer to the existing app routes and files when giving coding instructions. If exact file context is unavailable, say that clearly and ask which file the student wants to work on.",
    `Current practice project: ${body.workspaceTitle || "Not specified"}.`,
    `Project goal: ${body.workspaceGoal || "Not specified"}.`,
    `Student question: ${message}`,
  ].join("\n\n");

  if (body.provider === "gemini") {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini is not configured. Add GEMINI_API_KEY to .env.local and restart the development server.",
        },
        { status: 503 },
      );
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: context }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1800,
            },
          }),
        },
      );

      const data = (await response.json()) as GeminiResponse;
      const geminiText = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

      if (!response.ok || !geminiText) {
        return NextResponse.json(
          { error: data.error?.message || "Gemini returned an empty response." },
          { status: 502 },
        );
      }

      return NextResponse.json({ response: geminiText, provider: "gemini" });
    } catch {
      return NextResponse.json(
        { error: "ProjectPilot could not connect to Gemini. Check your internet connection and try again." },
        { status: 503 },
      );
    }
  }

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

    return NextResponse.json({ response: data.response, provider: "ollama" });
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
