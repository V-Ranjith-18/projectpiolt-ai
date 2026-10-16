"use client";

import { FormEvent, useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [rate, setRate] = useState("");
  const [projectTypes, setProjectTypes] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("projectpilot-profile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setName(profile.name || "");
      setSkills(profile.skills || "");
      setExperience(profile.experience || "");
      setRate(profile.rate || "");
      setProjectTypes(profile.projectTypes || "");
    }
  }, []);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedSkills = skills.trim();

    if (!trimmedName || !trimmedSkills) {
      setSaved(false);
      setError("Name and skills are required before saving your profile.");
      return;
    }

    localStorage.setItem(
      "projectpilot-profile",
      JSON.stringify({
        name: trimmedName,
        skills: trimmedSkills,
        experience,
        rate,
        projectTypes,
      }),
    );

    setError("");
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
          ← Back to home
        </a>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Developer profile
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Tell ProjectPilot about you
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Save your professional information once so future proposals can
            use it automatically.
          </p>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <p className="text-sm font-semibold text-cyan-300">
              Profile guidance
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Describe your current learning stage honestly. ProjectPilot uses
              this information to personalize practice guidance and proposal
              drafts; it does not publish your profile automatically.
            </p>
          </div>
        </div>

        <form
          onSubmit={saveProfile}
          className="mt-10 space-y-7 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30 md:p-8"
        >
          <div>
            <label htmlFor="name" className="mb-3 block text-sm font-medium">
              Your name
            </label>

            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Example: V.Ranjith"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="skills" className="mb-3 block text-sm font-medium">
              Skills
            </label>

            <textarea
              id="skills"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              required
              rows={5}
              placeholder="Example: HTML, CSS, JavaScript, React, Next.js, Node.js..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              className="mb-3 block text-sm font-medium"
            >
              Experience and background
            </label>

            <textarea
              id="experience"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              rows={5}
              placeholder="Describe your education, experience, projects, or current learning goals..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="rate" className="mb-3 block text-sm font-medium">
              Preferred rate or budget
            </label>

            <input
              id="rate"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              placeholder="Example: Learning projects only; discuss scope first"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="projectTypes"
              className="mb-3 block text-sm font-medium"
            >
              Preferred project types
            </label>

            <textarea
              id="projectTypes"
              value={projectTypes}
              onChange={(event) => setProjectTypes(event.target.value)}
              rows={4}
              placeholder="Example: Business websites, dashboards, SaaS applications, AI chatbots..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-400 px-6 py-4 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Save developer profile
          </button>

          {error && (
            <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
              {error}
            </p>
          )}

          {saved && (
            <p className="rounded-xl border border-green-400/30 bg-green-400/10 p-4 text-green-300">
              Profile saved on this computer.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}