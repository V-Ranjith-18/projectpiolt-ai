"use client";

import { useEffect, useState } from "react";

type SavedProject = {
  id: string;
  project: string;
  budget: string;
  deadline: string;
  matchScore: number;
  difficulty: string;
  createdAt: string;
};

export default function HistoryPage() {
  const [projects, setProjects] = useState<SavedProject[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projectpilot-projects");

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  function deleteProject(id: string) {
    const remainingProjects = projects.filter((project) => project.id !== id);
    setProjects(remainingProjects);
    localStorage.setItem(
      "projectpilot-projects",
      JSON.stringify(remainingProjects),
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
              ← Back to home
            </a>
            <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Project history
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Your analyzed opportunities
            </h1>
          </div>

          <a
            href="/analyze"
            className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Analyze another
          </a>
        </div>

        {projects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-slate-400">
            No analyzed projects yet. Analyze an opportunity and it will appear
            here automatically.
          </div>
        ) : (
          <div className="mt-12 space-y-5">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="text-sm text-slate-500">
                      {new Date(project.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-3 leading-7 text-slate-200">
                      {project.project}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteProject(project.id)}
                    className="text-sm text-red-300 hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-6 grid gap-4 text-sm text-slate-400 sm:grid-cols-3">
                  <p>
                    <span className="block text-slate-500">Skill match</span>
                    <strong className="mt-1 block text-cyan-300">
                      {project.matchScore}%
                    </strong>
                  </p>
                  <p>
                    <span className="block text-slate-500">Difficulty</span>
                    <strong className="mt-1 block text-slate-200">
                      {project.difficulty}
                    </strong>
                  </p>
                  <p>
                    <span className="block text-slate-500">Deadline</span>
                    <strong className="mt-1 block text-slate-200">
                      {project.deadline || "Not provided"}
                    </strong>
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
