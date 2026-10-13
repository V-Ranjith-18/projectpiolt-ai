const features = [
  {
    title: "Find better projects",
    description:
      "Analyze opportunities and discover projects that match your skills and goals.",
  },
  {
    title: "Create better proposals",
    description:
      "Prepare personalized proposals and connection messages in less time.",
  },
  {
    title: "Build with confidence",
    description:
      "Turn accepted projects into clear tasks, milestones, and technical plans.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-bold tracking-tight">
          ProjectPilot<span className="text-cyan-400">.ai</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/profile"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            Profile
          </a>
          <a
            href="/history"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            History
          </a>
          <a
            href="/portfolio"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            Portfolio
          </a>
          <a
            href="/builder"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            Project Builder
          </a>
          <a
            href="/review"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            Code Review
          </a>
          <a
            href="/projects"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            Projects
          </a>
          <a
            href="/contact"
            className="text-sm text-slate-400 hover:text-cyan-400"
          >
            Contact
          </a>
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400 hover:text-cyan-400">
            Sign in
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:pt-24">
        <div className="mx-auto mb-6 w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          Your AI freelance project partner
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Find projects. Win clients.{" "}
          <span className="text-cyan-400">Build faster.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          ProjectPilot helps you discover suitable opportunities, create
          personalized proposals, and plan real-world software projects with
          AI-assisted guidance.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/analyze"
            className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Analyze a project
          </a>
          <a
            href="#features"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:border-slate-500"
          >
            View how it works
          </a>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          <a
            href="/profile"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Developer Profile
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Manage your skills
            </span>
          </a>

          <a
            href="/analyze"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Analyze a Project
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Check project fit
            </span>
          </a>

          <a
            href="/history"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Project History
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Review saved projects
            </span>
          </a>

          <a
            href="/portfolio"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Portfolio
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Show completed work
            </span>
          </a>

          <a
            href="/builder"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Project Builder
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Understand unfamiliar projects
            </span>
          </a>

          <a
            href="/review"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              AI Code Review
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Understand and improve code
            </span>
          </a>

          <a
            href="/projects"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Projects
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Showcase completed work
            </span>
          </a>

          <a
            href="/contact"
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400"
          >
            <span className="block text-sm font-semibold text-slate-200">
              Contact
            </span>
            <span className="mt-1 block text-sm text-slate-500">
              Connect safely
            </span>
          </a>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3"
      >
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <div className="mb-5 h-2 w-12 rounded-full bg-cyan-400" />
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="mt-3 leading-7 text-slate-400">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        Human-approved AI assistance for real-world software projects.
      </footer>
    </main>
  );
}
