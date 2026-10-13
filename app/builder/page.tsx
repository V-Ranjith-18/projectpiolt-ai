"use client";

import { FormEvent, useState } from "react";

export default function BuilderPage() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [implementation, setImplementation] = useState("");
  const [loading, setLoading] = useState(false);
  const [implementationLoading, setImplementationLoading] = useState(false);
  const [error, setError] = useState("");

  async function buildPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const project = description.trim();

    if (!project || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Analyze this unfamiliar software project and create a professional beginner-friendly implementation plan.

Existing project context:
- The project already exists at C:/Users/vijay/projectpilot-ai.
- It uses Next.js 16, TypeScript, Tailwind CSS, and the App Router.
- Existing routes include /, /analyze, /builder, /history, /portfolio, /profile, /review, and /workspace.
- Use the existing app directory and preserve existing functionality.
- Do not use the Pages Router.
- Do not suggest Chakra UI, Material UI, Jest, or other packages unless they are already installed or the plan explicitly asks for approval to install them.
- Do not recreate setup files or replace the existing home page without approval.

Project description:
${project}

Use these exact sections:
1. Plain-language overview
2. Core requirements
3. Recommended technology stack with reasons
4. System architecture
5. Suggested folder and file structure
6. Development milestones in dependency order
7. Testing and security considerations
8. Risks, assumptions, and missing information
9. What a beginner should learn first

Do not claim the project is ready for production. Do not write the full code yet. Explain technical terms briefly and identify questions that must be answered before development begins.`,
        }),
      });
      const data = (await response.json()) as {
        response?: string;
        error?: string;
      };

      if (!response.ok || !data.response) {
        throw new Error(data.error || "The AI could not create a project plan.");
      }

      setResult(data.response);
    } catch (builderError) {
      setError(
        builderError instanceof Error
          ? builderError.message
          : "The AI could not create a project plan.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function generateImplementation() {
    if (!description.trim() || implementationLoading) {
      return;
    }

    setImplementationLoading(true);
    setError("");
    setImplementation("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Create a safe starter implementation for the first milestone of this project.

Existing project context:
- The project already exists at C:/Users/vijay/projectpilot-ai.
- It uses Next.js 16, TypeScript, Tailwind CSS, and the App Router.
- Work only inside the existing app directory unless a new file is clearly necessary.
- Preserve existing routes and functionality.
- Do not import Chakra UI, Material UI, or any package that is not already installed.
- Do not overwrite app/page.tsx without explicit approval.

Project description:
${description.trim()}

Return:
1. The first milestone objective
2. A short explanation for a beginner
3. The exact files to create or edit
4. Complete code for only the first small file
5. Manual testing steps
6. What must be approved before continuing

Do not generate a complete production application. Do not include secrets, payment processing, production deployment, or destructive commands. Prefer a small, runnable first step and explain all assumptions.`,
        }),
      });
      const data = (await response.json()) as {
        response?: string;
        error?: string;
      };

      if (!response.ok || !data.response) {
        throw new Error(
          data.error || "The AI could not generate an implementation.",
        );
      }

      setImplementation(data.response);
    } catch (implementationError) {
      setError(
        implementationError instanceof Error
          ? implementationError.message
          : "The AI could not generate an implementation.",
      );
    } finally {
      setImplementationLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to home
          </a>
          <a
            href="/workspace"
            className="text-sm text-slate-400 hover:text-cyan-300"
          >
            Practice workspace
          </a>
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Project builder
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Understand an unfamiliar project
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Describe a project in your own words. ProjectPilot will explain the
          scope and create a development plan before any code is written.
        </p>

        <form onSubmit={buildPlan} className="mt-10 space-y-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-200"
          >
            Project description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            rows={12}
            placeholder="Paste a client brief or describe the application you want to build..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={loading || !description.trim()}
            className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Preparing project plan..." : "Create project plan"}
          </button>
        </form>

        {error && (
          <p className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            {error}
          </p>
        )}

        {result && (
          <section className="mt-10 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-cyan-400">
                  AI-generated plan
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Review before development
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(result)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
              >
                Copy plan
              </button>
              <button
                type="button"
                onClick={generateImplementation}
                disabled={implementationLoading}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
              >
                {implementationLoading
                  ? "Generating..."
                  : "Generate first milestone"}
              </button>
            </div>
            <pre className="mt-6 whitespace-pre-wrap font-sans leading-7 text-slate-300">
              {result}
            </pre>
          </section>
        )}

        {implementation && (
          <section className="mt-8 rounded-2xl border border-green-400/30 bg-slate-900 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-green-300">
                  Proposed implementation
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Review before using code
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(implementation)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
              >
                Copy implementation
              </button>
            </div>
            <p className="mt-4 text-sm text-amber-300">
              This generates guidance and code for review. It does not edit
              files or deploy anything automatically.
            </p>
            <pre className="mt-6 whitespace-pre-wrap font-sans leading-7 text-slate-300">
              {implementation}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
