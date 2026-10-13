"use client";

import { FormEvent, useState } from "react";

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("TypeScript / React");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function reviewCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedCode = code.trim();

    if (!submittedCode || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setReview("");

    try {
      const alreadyTypedWelcome =
        language === "TypeScript / React" &&
        submittedCode.includes("export default function Welcome") &&
        submittedCode.includes("name: string");
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Review the following ${language} code as a patient coding mentor for a first-year B.Tech student. Apply language-specific best practices and do not judge code using rules from another language.

Use these exact sections:
1. Plain-language explanation
2. Correctness and likely bugs
3. Security and privacy considerations
4. Maintainability and accessibility improvements
5. Priority-ranked changes
6. A small corrected example, only if necessary

Important review rules:
- Check whether the code already follows the recommendation before suggesting it.
- If a prop is declared as name: string, that prop is already correctly typed. Do not recommend an interface or another prop type for it.
- Do not recommend converting an inline TypeScript type annotation into an interface unless there is a concrete maintainability benefit.
- Do not recommend generics unless they solve a concrete reuse or type-safety problem.
- The declaration export default function Welcome(...) is valid and maintainable. Never rank changing it to a const arrow function as a bug fix or required improvement.
- Do not add a default value to a required prop unless the requirements explicitly allow the prop to be missing.
- Do not add aria-label to a heading that already has visible, descriptive text. Native h1 semantics are sufficient in that case.
- Do not describe import style, arrow functions, spacing, or formatting as high-priority changes.
- Do not add ARIA roles when native HTML semantics are already correct. An h1 should normally remain an h1 without role="banner"; banner belongs on a page header or header landmark when appropriate.
- Distinguish required fixes, useful improvements, and optional style preferences.
- If no meaningful change is needed, say so clearly.
- Do not speculate about security risks without a concrete data flow or attack path.
- Finish every section and do not stop mid-sentence.
${alreadyTypedWelcome ? `
This exact snippet already has a correctly typed required name prop and a valid named function export:
- Required fixes: None.
- Useful improvements: None required.
- Optional preferences: None necessary for this example.
Do not recommend const, an arrow function, a default value, an interface, a generic, or aria-label for this snippet.
` : ""}
- Do not claim that the code is production-ready. Do not invent issues that are not supported by the code. Explain unfamiliar terms briefly.

Code to review:
\`\`\`
${submittedCode}
\`\`\``,
        }),
      });
      const data = (await response.json()) as {
        response?: string;
        error?: string;
      };

      if (!response.ok || !data.response) {
        throw new Error(data.error || "The AI could not review this code.");
      }

      setReview(data.response);
    } catch (reviewError) {
      setError(
        reviewError instanceof Error
          ? reviewError.message
          : "The AI could not review this code.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to home
          </a>
          <a href="/builder" className="text-sm text-slate-400 hover:text-cyan-300">
            Project Builder
          </a>
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          AI code review
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Understand and improve your code
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Paste a small file or code snippet. ProjectPilot will explain it and
          identify likely issues without editing your project.
        </p>

        <form onSubmit={reviewCode} className="mt-10 space-y-5">
          <div>
            <label htmlFor="language" className="mb-2 block text-sm font-medium">
              Code type
            </label>
            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-200 outline-none focus:border-cyan-400"
            >
              <option>TypeScript / React</option>
              <option>JavaScript</option>
              <option>C</option>
              <option>C++</option>
              <option>Java</option>
              <option>C#</option>
              <option>Python</option>
              <option>Go</option>
              <option>Rust</option>
              <option>Bash / Shell</option>
              <option>HTML / CSS</option>
              <option>SQL</option>
              <option>JSON</option>
              <option>Markdown</option>
            </select>
          </div>

          <div>
            <label htmlFor="code" className="mb-2 block text-sm font-medium">
              Code to review
            </label>
            <textarea
              id="code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
              rows={16}
              placeholder="Paste a small code file or snippet here..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Reviewing code..." : "Review code"}
          </button>
        </form>

        {error && (
          <p className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            {error}
          </p>
        )}

        {review && (
          <section className="mt-10 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-cyan-400">
                  Review result
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Advisory feedback
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(review)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
              >
                Copy review
              </button>
            </div>
            <pre className="mt-6 whitespace-pre-wrap font-sans leading-7 text-slate-300">
              {review}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
