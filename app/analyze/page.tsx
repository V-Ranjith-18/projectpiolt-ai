"use client";

import { FormEvent, useEffect, useState } from "react";

type Analysis = {
  matchScore: number;
  difficulty: string;
  recommendation: string;
  recommendationTone: string;
  roadmap: string[];
  practiceProject: {
    title: string;
    goal: string;
    features: string[];
    milestones: string[];
  };
  summary: string;
  requirements: string[];
  questions: string[];
};

type SavedProject = {
  id: string;
  project: string;
  budget: string;
  deadline: string;
  matchScore: number;
  difficulty: string;
  createdAt: string;
};

export default function AnalyzePage() {
  const [project, setProject] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [proposal, setProposal] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("projectpilot-profile");

    if (!savedProfile) {
      return;
    }

    try {
      const profile = JSON.parse(savedProfile);
      setProfileName(profile.name || "");
      setSkills(profile.skills || "");
    } catch {
      setProfileName("");
    }
  }, []);

  function analyzeOpportunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const projectText = project.toLowerCase();
    const skillsText = skills.toLowerCase();
    const keywords = [
      "react",
      "next.js",
      "nextjs",
      "javascript",
      "typescript",
      "node",
      "python",
      "ai",
      "machine learning",
      "database",
      "postgresql",
      "api",
      "dashboard",
      "admin",
    ];

    const matchingSkills = keywords.filter(
      (keyword) =>
        projectText.includes(keyword) && skillsText.includes(keyword),
    );
    const projectKeywords = keywords.filter((keyword) =>
      projectText.includes(keyword),
    );
    const matchScore =
      projectKeywords.length === 0
        ? 50
        : Math.min(
            95,
            Math.round((matchingSkills.length / projectKeywords.length) * 100),
          );
    const difficulty =
      projectText.includes("ai") ||
      projectText.includes("machine learning") ||
      projectText.includes("payment")
        ? "Advanced"
        : projectText.includes("dashboard") ||
            projectText.includes("admin") ||
            projectText.includes("api")
          ? "Intermediate"
          : "Beginner to intermediate";
    const recommendation =
      matchScore >= 70 && difficulty === "Beginner to intermediate"
        ? "Suitable for practice"
        : matchScore >= 45 && difficulty !== "Advanced"
          ? "Learn first, then consider"
          : "Not suitable yet";
    const recommendationTone =
      recommendation === "Suitable for practice"
        ? "border-green-400/30 bg-green-400/10 text-green-300"
        : recommendation === "Learn first, then consider"
          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
          : "border-red-400/30 bg-red-400/10 text-red-300";
    const roadmap =
      difficulty === "Advanced"
        ? [
            "Strengthen JavaScript, TypeScript, and backend fundamentals.",
            "Build a small full-stack project with authentication and a database.",
            "Learn testing, security basics, deployment, and the advanced project technology.",
          ]
        : difficulty === "Intermediate"
          ? [
              "Build a smaller version of the main feature first.",
              "Practice APIs, forms, validation, and database basics.",
              "Add tests and deploy the practice project before accepting client work.",
            ]
          : [
              "Create a simple version with a clear page structure.",
              "Practice responsive HTML, CSS, and JavaScript interactions.",
              "Publish the project as a portfolio example and improve it from feedback.",
            ];
    const practiceProject =
      difficulty === "Advanced"
        ? {
            title: "Foundational Full-Stack Task Management Application",
            goal: "Develop the core engineering fundamentals required before undertaking an advanced production project.",
            features: [
              "Task creation and structured task listing",
              "Task status management",
              "Local data persistence using browser storage or a JSON data source",
            ],
            milestones: [
              "Implement the responsive user interface and task components",
              "Add form handling, validation, and client-side interactions",
              "Implement basic data access and validate the primary user workflow",
            ],
          }
        : difficulty === "Intermediate"
          ? {
              title: "Personal Learning Progress Dashboard",
              goal: "Build practical experience with dashboard architecture, form workflows, and structured data management.",
              features: [
                "Subject and learning-progress management",
                "Study-task creation and removal workflows",
                "Progress summary and status visualization",
              ],
              milestones: [
                "Implement the responsive dashboard interface",
                "Add state management, form validation, and user interactions",
                "Integrate a basic API or client-side persistence layer",
              ],
            }
          : {
              title: "Responsive Professional Portfolio Website",
              goal: "Create and publish a portfolio-quality project using your current foundational web-development skills.",
              features: [
                "Professional introduction and value proposition section",
                "Project portfolio and technical-skills sections",
                "Contact information and responsive mobile presentation",
              ],
              milestones: [
                "Define the information architecture and implement the page structure",
                "Apply responsive styling for mobile and desktop breakpoints",
                "Publish the website and iterate based on structured feedback",
              ],
            };

    setAnalysis({
      matchScore,
      difficulty,
      recommendation,
      recommendationTone,
      roadmap,
      practiceProject,
      summary: `This project appears to be a ${difficulty.toLowerCase()} opportunity with an estimated skill match of ${matchScore}%.`,
      requirements: [
        "Review the complete project description with the client.",
        budget.trim()
          ? `Confirm whether the stated budget of ${budget} covers all requested features.`
          : "Ask the client to confirm the available budget.",
        deadline.trim()
          ? `Confirm whether the deadline of ${deadline} is realistic.`
          : "Ask the client to confirm the expected deadline.",
      ],
      questions: [
        "What features are essential for the first release?",
        "Who will provide the content, designs, and project access?",
        "How will the client review and approve completed work?",
      ],
    });

    setProposal(`Hello,

I am interested in helping you build this project.

Based on the requirements, I understand that you need:

${project.trim()}

My relevant skills and experience include:

${skills.trim()}

I can help break the work into clear milestones, develop the core features, test the application, and provide regular progress updates.

The proposed budget is ${budget.trim() || "to be discussed"} and the expected deadline is ${deadline.trim() || "to be discussed"}.

Before we begin, I would be happy to discuss the essential features, project access, timeline, and final budget.

Thank you for considering my proposal. I look forward to learning more about your project.

Best regards,
${profileName || "Your Name"}`);

    const savedProjects = JSON.parse(
      localStorage.getItem("projectpilot-projects") || "[]",
    ) as SavedProject[];

    const savedProject: SavedProject = {
      id: crypto.randomUUID(),
      project: project.trim(),
      budget: budget.trim(),
      deadline: deadline.trim(),
      matchScore,
      difficulty,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "projectpilot-projects",
      JSON.stringify([savedProject, ...savedProjects]),
    );
    const nextTasks: Array<{
      title: string;
      status: "Not started" | "In progress" | "Complete";
    }> = practiceProject.milestones.map((milestone) => ({
      title: milestone,
      status: "Not started",
    }));

    try {
      const existingWorkspace = JSON.parse(
        localStorage.getItem("projectpilot-practice-workspace") || "null",
      ) as {
        tasks?: Array<{ title?: unknown; status?: unknown }>;
      } | null;

      if (Array.isArray(existingWorkspace?.tasks)) {
        for (const task of nextTasks) {
          const existingTask = existingWorkspace.tasks.find(
            (savedTask) => savedTask.title === task.title,
          );

          if (
            existingTask &&
            (existingTask.status === "Not started" ||
              existingTask.status === "In progress" ||
              existingTask.status === "Complete")
          ) {
            task.status = existingTask.status;
          }
        }
      }
    } catch {
      // Invalid old workspace data is replaced by the new valid workspace.
    }

    localStorage.setItem(
      "projectpilot-practice-workspace",
      JSON.stringify({
        title: practiceProject.title,
        goal: practiceProject.goal,
        tasks: nextTasks,
      }),
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
          ← Back to home
        </a>
        <a
        href="/history"
        className="ml-5 text-sm text-slate-400 hover:text-cyan-300"
        >
        View history
        </a>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Project analysis
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Tell us about the project
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            Enter the opportunity details to receive an initial match report
            and proposal draft.
          </p>
        </div>

        <form onSubmit={analyzeOpportunity} className="mt-10 space-y-8">
          <div>
            <label htmlFor="project" className="mb-3 block text-sm font-medium">
              Project description
            </label>
            <textarea
              id="project"
              value={project}
              onChange={(event) => setProject(event.target.value)}
              rows={9}
              required
              placeholder="Paste the job or project description here..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="skills" className="mb-3 block text-sm font-medium">
              Your skills and experience
            </label>
            <textarea
              id="skills"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              rows={6}
              required
              placeholder="Example: React, Next.js, Node.js, Python..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="budget" className="mb-3 block text-sm font-medium">
                Approximate budget
              </label>
              <input
                id="budget"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                type="text"
                placeholder="Example: $500 - $1,500"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="mb-3 block text-sm font-medium"
              >
                Expected deadline
              </label>
              <input
                id="deadline"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                type="text"
                placeholder="Example: 4 weeks"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Analyze opportunity
          </button>
        </form>

        {analysis && (
          <section className="mt-10 space-y-6 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-cyan-400">
                Initial analysis
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                {analysis.matchScore}% skill match
              </h2>
              <p className="mt-3 text-slate-300">{analysis.summary}</p>
            </div>

            <div
              className={`rounded-xl border p-4 ${analysis.recommendationTone}`}
            >
              <p className="text-sm uppercase tracking-widest opacity-80">
                Beginner guidance
              </p>
              <p className="mt-2 text-lg font-semibold">
                {analysis.recommendation}
              </p>
              <p className="mt-2 text-sm opacity-80">
                This is guidance for learning and planning, not a guarantee
                that you can deliver the project professionally.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Suggested learning roadmap</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-400 marker:text-cyan-400">
                {analysis.roadmap.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-5">
              <p className="text-sm uppercase tracking-widest text-cyan-400">
                Recommended practice project
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {analysis.practiceProject.title}
              </h3>
              <p className="mt-2 text-slate-300">
                {analysis.practiceProject.goal}
              </p>

              <h4 className="mt-5 font-semibold">Features to build</h4>
              <ul className="mt-2 space-y-2 text-slate-400">
                {analysis.practiceProject.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <h4 className="mt-5 font-semibold">Milestones</h4>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-slate-400 marker:text-cyan-400">
                {analysis.practiceProject.milestones.map((milestone) => (
                  <li key={milestone}>{milestone}</li>
                ))}
              </ol>
              <a
                href="/workspace"
                className="mt-6 inline-block rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
              >
                Open practice workspace
              </a>
            </div>
            <div>
              <h3 className="font-semibold">Difficulty</h3>
              <p className="mt-2 text-slate-400">{analysis.difficulty}</p>
            </div>
            <div>
              <h3 className="font-semibold">Important requirements</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                {analysis.requirements.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Questions for the client</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                {analysis.questions.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {proposal && (
          <section className="mt-8 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-cyan-400">
                  Proposal draft
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Ready for your review
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(proposal)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
              >
                Copy proposal
              </button>
            </div>
            <textarea
              value={proposal}
              onChange={(event) => setProposal(event.target.value)}
              rows={18}
              className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 leading-7 text-slate-300 outline-none focus:border-cyan-400"
            />
          </section>
        )}
      </div>
    </main>
  );
}
