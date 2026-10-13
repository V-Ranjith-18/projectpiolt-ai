"use client";

import { useEffect, useState } from "react";

import PortfolioNav from "../components/PortfolioNav";

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projectpilot-portfolio");

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <PortfolioNav />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/roadmap" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to roadmap
          </a>

          <a href="/portfolio" className="text-sm text-slate-400 hover:text-cyan-300">
            Manage portfolio
          </a>
        </div>

        <header className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Selected projects
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Work I have completed
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            A record of projects completed during my learning journey. Each
            project represents practical work, not an unsupported claim of
            professional experience.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-300">
            {projects.length} {projects.length === 1 ? "project" : "projects"} published
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-400">
            Built while learning
          </span>
        </div>

        {projects.length === 0 ? (
          <section className="mt-10 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8">
            <h2 className="text-xl font-semibold">No projects published yet</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Complete a practice project, test it, and add it through the
              Portfolio page before presenting it here.
            </p>
            <a
              href="/portfolio"
              className="mt-6 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Add a project
            </a>
          </section>
        ) : (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold">{project.title}</h2>
                  <span className="shrink-0 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Completed
                  </span>
                </div>
                <p className="mt-4 leading-7 text-slate-300">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.split(",").map((technology) => (
                    <span
                      key={technology.trim()}
                      className="rounded-md bg-slate-950 px-3 py-1 text-xs text-cyan-300"
                    >
                      {technology.trim()}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    View project →
                  </a>
                )}
              </article>
            ))}
          </section>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/intro"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Introduction
          </a>
          <a
            href="/skills"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Technical skills
          </a>
        </div>
      </div>
    </main>
  );
}
