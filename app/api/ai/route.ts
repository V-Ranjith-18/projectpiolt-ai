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
    "The next useful task is to make the learning roadmap progress data-driven.",
    "",
    "Edit this file:",
    "`app/roadmap/page.tsx`",
    "",
    "Replace the hard-coded `1 / 6` progress text and `w-[16.67%]` progress-bar width with values calculated from the roadmap stages. Keep the existing stage content, shared navigation, and responsive Tailwind styling. Then open `/roadmap` and check the progress display on desktop and mobile widths.",
    "",
    `This advice is for the existing "${workspaceTitle || "Responsive Professional Portfolio Website"}" workspace.`,
  ].join("\n");

const roadmapFallback = (workspaceTitle: string) =>
  [
    "The roadmap page already contains its title, six roadmap stages, descriptions, topic lists, progress principle, navigation, and responsive Tailwind styling.",
    "",
    "Make only this targeted change in `app/roadmap/page.tsx`:",
    "",
    "1. Add a current-stage position near the component by finding the stage whose status is `\"Current priority\"`; use its zero-based index plus one, with a safe fallback of 1.",
    "2. Calculate `progressPercentage` from that current-stage position and `roadmapStages.length`.",
    "3. Replace the hard-coded `1 / 6` text with `${currentStagePosition} / ${roadmapStages.length}`.",
    "4. Replace the hard-coded `w-[16.67%]` class with an inline `style={{ width: `${progressPercentage}%` }}`.",
    "",
    "Do not add a `Complete` property, change `Current priority` to `Complete`, create React state, call `setRoadmapStages`, mutate the static stage data, replace the page, create a new milestone list, or add another roadmap section. Test `/roadmap` at desktop and mobile widths.",
    "",
    `This advice is for the existing "${workspaceTitle || "Responsive Professional Portfolio Website"}" workspace.`,
  ].join("\n");

const contactFallback = (workspaceTitle: string) =>
  [
    "The Contact page already has collaboration guidance, a GitHub profile link, a privacy reminder, and a safe placeholder for a public email.",
    "",
    "The next useful improvement is to make the existing public-email placeholder clearer without adding an external form service.",
    "",
    "Edit this file:",
    "`app/contact/page.tsx`",
    "",
    "If you choose to publish a separate professional email, replace only the placeholder with a `mailto:` link. Do not add a form, Formspree, a backend endpoint, or a private email address unless you explicitly decide to provide one. Test the link and confirm that no private information is displayed.",
    "",
    `This advice is for the existing "${workspaceTitle || "Responsive Professional Portfolio Website"}" workspace.`,
  ].join("\n");

const profileFallback = (workspaceTitle: string) =>
  [
    "The next useful improvement is to make the existing developer profile easier to review before saving.",
    "",
    "Edit this file:",
    "`app/profile/page.tsx`",
    "",
    "Add a small character or length hint below the Skills and Experience fields, and disable or guard the save action when the required fields contain only whitespace. Keep the existing localStorage behavior, form fields, and responsive styling. Test saving valid data, refreshing the page, and submitting incomplete data.",
    "",
    `This advice is for the existing "${workspaceTitle || "Responsive Professional Portfolio Website"}" workspace.`,
  ].join("\n");

const groundResponse = (
  response: string,
  workspaceTitle: string,
  message: string,
) => {
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
    /add (a )?(small )?(image|icon).{0,80}project/i.test(response) ||
    /add (a )?(brief )?(section|paragraph).{0,80}(educational background|certifications|hobbies|interests|personal quote)/i.test(
      response,
    ) ||
    /add (a )?(technical )?skills? section/i.test(response) ||
    /add (icons?|skill list).{0,80}(skills?|technical)/i.test(response) ||
    /use tailwind css for styling/i.test(response) ||
    /add (a )?(roadmap )?section title/i.test(response) ||
    /create (a )?(list|list of) (roadmap )?milestones/i.test(response) ||
    /add descriptions? to each milestone/i.test(response) ||
    /const roadmappage\s*=\s*\(\)\s*=>/i.test(response) ||
    /stage\.progress|progress:\s*\d+|renderprogress|progress indicator|roadmapdata|studentprogress|completed:\s*(true|false)|complete.{0,40}(property|status)|setroadmapstages|updatedstages|status.{0,40}complete/i.test(
      response,
    );

  const contactFormRecommendation =
    /add (a )?(contact|email) form/i.test(response) ||
    /formspree|placeholder email service|backend server/i.test(response) ||
    /fields? for (name|email|message)/i.test(response);

  const genericNextTask = /what should i improve next/i.test(message);
  const repeatedRoadmapAdvice =
    /current-stage position|progresspercentage|hard-coded `?1 \/ 6|learning roadmap progress/i.test(
      response,
    );

  const roadmapRewrite =
    /add (a )?(roadmap )?section title/i.test(response) ||
    /create (a )?(list|list of) (roadmap )?milestones/i.test(response) ||
    /add descriptions? to each milestone/i.test(response) ||
    /const roadmappage\s*=\s*\(\)\s*=>/i.test(response) ||
    /stage\.progress|progress:\s*\d+|renderprogress|progress indicator|roadmapdata|studentprogress|completed:\s*(true|false)|complete.{0,40}(property|status)|setroadmapstages|updatedstages|status.{0,40}complete/i.test(
      response,
    );

  return genericNextTask && repeatedRoadmapAdvice
    ? profileFallback(workspaceTitle)
    : contactFormRecommendation
    ? contactFallback(workspaceTitle)
    : roadmapRewrite
    ? roadmapFallback(workspaceTitle)
    : hallucinatedProjectStructure
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
    "Already completed: app/about/page.tsx already contains the student's learning journey, first-year B.Tech education, learning approach, honest-progress explanation, and four current focus areas. Do not recommend adding another education section, certifications, hobbies, or a personal quote unless the student explicitly provides truthful details and asks to add them.",
    "Already completed: app/skills/page.tsx already has three skill-level groups (currently learning, basic familiarity, and future learning goals), skill lists, responsive cards, learning principles, descriptions, and Tailwind styling. Do not recommend adding a technical-skills section, skill list, icons, or Tailwind styling again.",
    "Already completed: app/roadmap/page.tsx already has its roadmap title, six static stages with descriptions and topics, learning progress panel, progress principle, navigation, and responsive Tailwind styling. Its stages currently use statuses such as `Current priority`, `Next stage`, `Planned`, and `Long-term goal`; there is no `Complete` property, React state, or setRoadmapStages function. Never recommend changing a status to `Complete` or mutating the static stage data. If asked for exact code changes, provide only a targeted patch for the hard-coded progress values using the existing `Current priority` status.",
    "Already completed: app/contact/page.tsx already has collaboration guidance, a safe public-email placeholder, a GitHub profile link, collaboration cards, navigation, and a privacy reminder. Do not recommend adding a contact form, Formspree, a backend email service, or publishing private contact information unless the student explicitly asks for that scope and provides safe public details.",
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
        response: groundResponse(
          geminiText,
          body.workspaceTitle || "",
          message,
        ),
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
      response: groundResponse(
        data.response,
        body.workspaceTitle || "",
        message,
      ),
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
