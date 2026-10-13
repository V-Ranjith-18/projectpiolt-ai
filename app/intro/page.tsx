import PortfolioNav from "../components/PortfolioNav";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <PortfolioNav />
        <div className="w-full">
          <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-8 shadow-2xl shadow-cyan-950/20 md:p-14">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Student developer • Building in public
              </p>

              <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
                Learning to build useful software.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Hello, I&apos;m V.Ranjith — a first-year B.Tech student exploring
                web development, artificial intelligence, and practical
                project building.
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                This portfolio shows my progress honestly: what I am learning,
                what I have practiced, and what I plan to improve next.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/projects"
                  className="rounded-xl bg-cyan-400 px-5 py-3 text-center font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  Explore my projects
                </a>

                <a
                  href="/about"
                  className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
                >
                  My learning journey
                </a>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Learn", "Strengthen programming and web fundamentals."],
              ["02", "Build", "Turn concepts into small, testable projects."],
              ["03", "Improve", "Use feedback to make each project better."],
            ].map(([number, title, description]) => (
              <article
                key={number}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <p className="text-sm font-bold text-cyan-400">{number}</p>
                <h2 className="mt-3 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
            <span>Currently focused on React, Next.js, Python, and AI/ML.</span>
            <a href="/" className="text-cyan-400 hover:text-cyan-300">
              Open ProjectPilot →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}