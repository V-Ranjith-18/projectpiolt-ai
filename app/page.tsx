const features = [
  {
    number: "01",
    title: "Discover",
    description:
      "Analyze real opportunities, understand requirements, and choose work that matches your current skills.",
    color: "text-cyan-300",
    border: "border-cyan-400/20",
    glow: "bg-cyan-400",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Turn unfamiliar projects into practical milestones, learning steps, and clear technical decisions.",
    color: "text-violet-300",
    border: "border-violet-400/20",
    glow: "bg-violet-400",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Use local AI guidance, code review, and a structured workspace to build with confidence.",
    color: "text-sky-300",
    border: "border-sky-400/20",
    glow: "bg-sky-400",
  },
];

const workspaceLinks = [
  ["Developer profile", "Manage your skills and learning stage.", "/profile", "◈"],
  ["Analyze a project", "Check project fit before you commit.", "/analyze", "⌁"],
  ["Project history", "Review opportunities and decisions.", "/history", "◷"],
  ["Project builder", "Break complex work into practical steps.", "/builder", "✦"],
  ["AI code review", "Understand issues without guessing.", "/review", "⌘"],
  ["Portfolio", "Present completed learning projects.", "/portfolio", "▦"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 text-lg font-black text-slate-950 shadow-lg shadow-cyan-400/20">
            P
          </span>
          <span className="text-lg font-semibold tracking-tight">
            ProjectPilot<span className="text-cyan-300">.ai</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <a href="#features" className="transition hover:text-white">How it works</a>
          <a href="/projects" className="transition hover:text-white">Projects</a>
          <a href="/contact" className="transition hover:text-white">Contact</a>
          <a href="/profile" className="rounded-xl border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300">
            Open workspace
          </a>
        </div>
      </nav>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pt-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#20d9c2]" />
              Your AI project partner
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              From opportunity
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                to confident delivery.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              ProjectPilot helps you find suitable work, prepare honest proposals,
              and build real software through clear AI-assisted guidance.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/analyze" className="rounded-xl bg-cyan-300 px-6 py-3.5 text-center font-semibold text-slate-950 shadow-xl shadow-cyan-400/20 transition hover:bg-cyan-200">
                Analyze a project <span className="ml-2">→</span>
              </a>
              <a href="#features" className="rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-center font-semibold text-slate-200 transition hover:border-violet-400/60 hover:text-white">
                See how it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span><b className="text-slate-200">01</b> Analyze</span>
              <span><b className="text-slate-200">02</b> Plan</span>
              <span><b className="text-slate-200">03</b> Build</span>
              <span className="text-emerald-300">● Local-first and private</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-violet-500/10 to-transparent blur-2xl" />
            <div className="relative rounded-3xl border border-slate-700/80 bg-[#0d1422] p-3 shadow-2xl shadow-cyan-950/30">
              <div className="rounded-2xl border border-slate-800 bg-[#101827] p-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <p className="text-xs text-slate-500">ProjectPilot workspace</p>
                    <p className="mt-1 text-sm font-semibold">Your next build</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300">LOCAL AI READY</span>
                </div>
                <div className="mt-5 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-cyan-400/5 p-5">
                  <p className="text-xs font-medium text-violet-200">CURRENT PRACTICE PROJECT</p>
                  <h2 className="mt-2 text-xl font-semibold">Responsive portfolio website</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Build, explain, and publish a project you can honestly present.</p>
                  <div className="mt-5 h-2 rounded-full bg-slate-800">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-500"><span>2 of 3 milestones</span><span className="text-cyan-300">67%</span></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ["01", "Analyze", "done", "bg-cyan-400"],
                    ["02", "Build", "active", "bg-violet-400"],
                    ["03", "Publish", "next", "bg-slate-600"],
                  ].map(([number, label, state, color]) => (
                    <div key={number} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                      <span className={`mb-3 block h-2 w-2 rounded-full ${color}`} />
                      <p className="text-[10px] text-slate-500">{number}</p>
                      <p className="mt-1 text-xs font-medium text-slate-200">{label}</p>
                      <p className="mt-1 text-[10px] capitalize text-slate-500">{state}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">A clearer way to build</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">One workspace. Three focused steps.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-500">Designed for honest progress—not pretending to know what you have not learned yet.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className={`rounded-2xl border ${feature.border} bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:bg-slate-900`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${feature.color}`}>{feature.number}</span>
                <span className={`h-2 w-8 rounded-full ${feature.glow}`} />
              </div>
              <h3 className="mt-8 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="rounded-3xl border border-slate-800 bg-[#0d1422] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Your toolkit</p>
              <h2 className="mt-2 text-2xl font-semibold">Everything stays organized.</h2>
            </div>
            <a href="/profile" className="text-sm text-cyan-300 hover:text-cyan-200">Open developer profile →</a>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workspaceLinks.map(([title, description, href, icon]) => (
              <a key={href} href={href} className="group flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300/20 to-violet-400/20 text-lg text-cyan-200">{icon}</span>
                <span><span className="block font-medium text-slate-200 group-hover:text-white">{title}</span><span className="mt-1 block text-sm leading-5 text-slate-500">{description}</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/80 px-6 py-8 text-center text-sm text-slate-500">
        Human-approved AI assistance for real-world software projects.
      </footer>
    </main>
  );
}
