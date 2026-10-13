"use client";

import { FormEvent, useEffect, useState } from "react";

import PortfolioNav from "../components/PortfolioNav";

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
};

const storageKey = "projectpilot-portfolio";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const savedProjects = localStorage.getItem(storageKey);

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newProject: PortfolioProject = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      technologies: technologies.trim(),
      link: link.trim(),
    };
    const updatedProjects = [newProject, ...projects];

    setProjects(updatedProjects);
    localStorage.setItem(storageKey, JSON.stringify(updatedProjects));
    setTitle("");
    setDescription("");
    setTechnologies("");
    setLink("");
  }

  function deleteProject(id: string) {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem(storageKey, JSON.stringify(updatedProjects));
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <PortfolioNav />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to home
          </a>
          <a href="/profile" className="text-sm text-slate-400 hover:text-cyan-300">
            Developer profile
          </a>
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Portfolio
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Your project portfolio
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Record completed practice projects so you can track your progress and
          build credible evidence of your skills.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-300">
            {projects.length} {projects.length === 1 ? "project" : "projects"} saved
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-400">
            Saved only in this browser
          </span>
        </div>

        <form
          onSubmit={saveProject}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Project record
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Add a completed project
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Describe what you built and learned. Only add work you have
              actually completed and can explain.
            </p>
          </div>

          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Project title
            </label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              placeholder="Example: Responsive Professional Portfolio Website"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Project summary
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={4}
              placeholder="Describe what you built and what you learned."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="mb-2 block text-sm font-medium"
            >
              Technologies used
            </label>
            <input
              id="technologies"
              value={technologies}
              onChange={(event) => setTechnologies(event.target.value)}
              required
              placeholder="Example: HTML, CSS, JavaScript, React"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="link" className="mb-2 block text-sm font-medium">
              Project link (optional)
            </label>
            <input
              id="link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              type="url"
              placeholder="https://github.com/your-name/project"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Add to portfolio
          </button>
        </form>

        <section className="mt-10 space-y-5">
          <h2 className="text-xl font-semibold">Completed projects</h2>

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-6 text-slate-400">
              No projects added yet. Complete a practice project before
              presenting it as portfolio work.
            </div>
          ) : (
            projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <button
                    type="button"
                    onClick={() => deleteProject(project.id)}
                    className="text-sm text-red-300 hover:text-red-200"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-3 leading-7 text-slate-300">
                  {project.description}
                </p>
                <p className="mt-4 text-sm text-cyan-300">
                  {project.technologies}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    View project →
                  </a>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
