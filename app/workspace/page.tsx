"use client";

import { useEffect, useState } from "react";

type WorkspaceTask = {
  title: string;
  status: "Not started" | "In progress" | "Complete";
};

type Workspace = {
  title: string;
  goal: string;
  tasks: WorkspaceTask[];
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  provider?: "ollama" | "gemini";
};

const statuses: WorkspaceTask["status"][] = [
  "Not started",
  "In progress",
  "Complete",
];

function isWorkspace(value: unknown): value is Workspace {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as {
    title?: unknown;
    goal?: unknown;
    tasks?: unknown;
  };

  if (
    typeof candidate.title !== "string" ||
    typeof candidate.goal !== "string" ||
    !Array.isArray(candidate.tasks)
  ) {
    return false;
  }

  return candidate.tasks.every((task) => {
    if (!task || typeof task !== "object") {
      return false;
    }

    const candidateTask = task as {
      title?: unknown;
      status?: unknown;
    };

    return (
      typeof candidateTask.title === "string" &&
      typeof candidateTask.status === "string" &&
      statuses.includes(candidateTask.status as WorkspaceTask["status"])
    );
  });
}

export default function WorkspacePage() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [provider, setProvider] = useState<"ollama" | "gemini">("ollama");
  const [draftStatuses, setDraftStatuses] = useState<
    Record<number, WorkspaceTask["status"]>
  >({});
  const [confirmedTaskIndex, setConfirmedTaskIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const savedWorkspace = localStorage.getItem(
      "projectpilot-practice-workspace",
    );

    if (!savedWorkspace) {
      return;
    }

    try {
      const parsedWorkspace: unknown = JSON.parse(savedWorkspace);

      if (isWorkspace(parsedWorkspace)) {
        setWorkspace(parsedWorkspace);
        setDraftStatuses(
          Object.fromEntries(
            parsedWorkspace.tasks.map((task, index) => [index, task.status]),
          ),
        );
      } else {
        localStorage.removeItem("projectpilot-practice-workspace");
      }
    } catch {
      localStorage.removeItem("projectpilot-practice-workspace");
    }
  }, []);

  function selectTaskStatus(index: number, status: WorkspaceTask["status"]) {
    setDraftStatuses((current) => ({ ...current, [index]: status }));
    setConfirmedTaskIndex(null);
  }

  function finishTask(index: number) {
    if (!workspace) {
      return;
    }

    const status = draftStatuses[index] || workspace.tasks[index]?.status;

    if (!status) {
      return;
    }

    const tasks = workspace.tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, status } : task,
    );
    const updatedWorkspace = { ...workspace, tasks };
    setWorkspace(updatedWorkspace);
    localStorage.setItem(
      "projectpilot-practice-workspace",
      JSON.stringify(updatedWorkspace),
    );
    setDraftStatuses((current) => ({ ...current, [index]: status }));
    setConfirmedTaskIndex(index);
  }

  async function askAssistant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = message.trim();

    if (!workspace || !question || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setChat((current) => [...current, { role: "user", content: question }]);
    setMessage("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          workspaceTitle: workspace.title,
          workspaceGoal: workspace.goal,
          provider,
        }),
      });
      const data = (await response.json()) as {
        response?: string;
        error?: string;
      };

      if (!response.ok || !data.response) {
        throw new Error(data.error || "The AI assistant could not respond.");
      }

      setChat((current) => [
        ...current,
        { role: "assistant", content: data.response as string, provider },
      ]);
    } catch (assistantError) {
      setError(
        assistantError instanceof Error
          ? assistantError.message
          : "The AI assistant could not respond.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!workspace) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <a href="/analyze" className="text-sm text-cyan-400">
            ← Analyze an opportunity
          </a>
          <div className="mt-12 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-slate-400">
            Analyze an opportunity first to create a practice workspace.
          </div>
        </div>
      </main>
    );
  }

  const completedTasks = workspace.tasks.filter(
    (task) => task.status === "Complete",
  ).length;
  const progress =
    workspace.tasks.length === 0
      ? 0
      : Math.round((completedTasks / workspace.tasks.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/analyze" className="text-sm text-cyan-400">
            ← Back to analysis
          </a>
          <a
            href="/history"
            className="text-sm text-slate-400 hover:text-cyan-300"
          >
            View history
          </a>
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Practice workspace
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {workspace.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">
          {workspace.goal}
        </p>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Workspace progress</p>
              <p className="mt-1 text-2xl font-bold text-cyan-300">
                {completedTasks} of {workspace.tasks.length} milestones complete
              </p>
            </div>
            <span className="text-lg font-semibold text-slate-300">
              {progress}%
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <section className="mt-8 space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Step-by-step practice
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Implementation milestones
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Update each status as you complete and understand the work.
            </p>
          </div>

          {workspace.tasks.map((task, index) => (
            <article
              key={task.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Milestone {index + 1}</p>
                  <h3 className="mt-1 font-semibold">{task.title}</h3>
                </div>

                <select
                  value={draftStatuses[index] || task.status}
                  onChange={(event) =>
                    selectTaskStatus(
                      index,
                      event.target.value as WorkspaceTask["status"],
                    )
                  }
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-400"
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => finishTask(index)}
                  className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  Finish milestone
                </button>
                {confirmedTaskIndex === index && (
                  <span className="text-sm text-emerald-300">
                    Status saved successfully.
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Local AI mentor
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Ask for help with this project
          </h2>
          <p className="mt-3 text-slate-400">
            Ask about the next milestone, an error, or a coding concept.
            Choose local Ollama for private, offline help or Gemini for an
            optional cloud response.
          </p>

          <div className="mt-5">
            <label
              htmlFor="ai-provider"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              AI provider
            </label>
            <select
              id="ai-provider"
              value={provider}
              onChange={(event) =>
                setProvider(event.target.value as "ollama" | "gemini")
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="ollama">Local Ollama (private)</option>
              <option value="gemini">Gemini (API key required)</option>
            </select>
          </div>

          {chat.length > 0 && (
            <div className="mt-6 space-y-4">
              {chat.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`rounded-xl p-4 ${
                    item.role === "user"
                      ? "ml-6 bg-slate-800 text-slate-200"
                      : "mr-6 border border-slate-700 bg-slate-950 text-slate-300"
                  }`}
                >
                  <p className="mb-2 text-xs uppercase tracking-widest text-cyan-400">
                    {item.role === "user"
                      ? "You"
                      : item.provider === "gemini"
                        ? "ProjectPilot AI • Gemini"
                        : "ProjectPilot AI • Ollama"}
                  </p>
                  <p className="whitespace-pre-wrap leading-7">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={askAssistant} className="mt-6 space-y-3">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              placeholder="Example: Explain how I should start milestone 1."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Thinking..."
                : provider === "gemini"
                  ? "Ask Gemini"
                  : "Ask local AI"}
            </button>
          </form>

          {error && (
            <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
              {error}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}