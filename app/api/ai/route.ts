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

const groundedFallback = (workspaceTitle: string) =>
  [
    "Your project already uses Next.js App Router, so do not create a `pages` folder or separate HTML files.",
    "",
    "The next useful task is to improve the existing About page.",
    "",
    "Edit this file:",
    "`app/about/page.tsx`",
    "",
    "Add or refine a short introduction, your learning approach, and the technologies you are currently studying. Keep the existing shared navigation and Tailwind styling. Then open `/about` in the browser and check the layout on both desktop and mobile widths.",
    "",
    `This advice is for the existing "${workspaceTitle || "Responsive Professional Portfolio Website"}" workspace.`,
  ].join("\n");

const groundResponse = (response: string, workspaceTitle: string) => {
  const hallucinatedProjectStructure =
    /\bpages[\\/](index|about|portfolio|contact)\.(js|jsx|ts|tsx)\b/i.test(
      response,
    ) ||
    /\b(index|about|portfolio|contact)\.html\b/i.test(response) ||
    /\b(styles\.css|tailwind\.config\.(js|ts))\b/i.test(response) ||
    /create (a )?new (portfolio|project) folder/i.test(response) ||
    /add (a )?(brief )?(description|summary).{0,80}(each|every) project/i.test(
      response,
    ) ||
    /add (a )?(repository|repo|live demo) link/i.test(response) ||
    /add (a )?(small )?(image|icon).{0,80}project/i.test(response);

  return hallucinatedProjectStructure
    ? groundedFallback(workspaceTitle)
    : response;
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
    "The real project uses these existing files: app/intro/page.tsx, app/about/page.tsx, app/skills/page.tsx, app/roadmap/page.tsx, app/projects/page.tsx, app/contact/page.tsx, app/workspace/page.tsx, and app/components/PortfolioNav.tsx.",
    "Already completed: app/intro/page.tsx has a polished hero section, project and learning-journey links, and Learn/Build/Improve cards; app/components/PortfolioNav.tsx already has responsive navigation and a mobile menu; the portfolio pages already use responsive Tailwind styling.",
    "Already completed: app/projects/page.tsx already reads saved projects from localStorage, displays each project's title, description, technologies, completion badge, optional project link, responsive cards, and an empty-state action. Do not recommend adding those features again.",
    "Do not recommend adding a hero section, creating navigation, installing Tailwind, or rebuilding features that are already present. Suggest an incremental improvement to an existing page instead.",
    "When the user asks for a coding task, name one file from that list. Never invent a pages directory or files outside this project map.",
    "If exact file context is unavailable, say that clearly instead of inventing a project structure.",
    "Before answering, check every path you mention against the project map. Answer in this format: Next task, File to edit, Changes, How to test.",
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

      return NextResponse.json({
        response: groundResponse(geminiText, body.workspaceTitle || ""),
        provider: "gemini",
      });
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

    return NextResponse.json({
      response: groundResponse(data.response, body.workspaceTitle || ""),
      provider: "ollama",
    });
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
