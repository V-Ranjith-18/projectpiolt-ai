import PortfolioNav from "../components/PortfolioNav";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <PortfolioNav />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/intro" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to introduction
          </a>

          <a href="/" className="text-sm text-slate-400 hover:text-cyan-300">
            ProjectPilot home
          </a>
        </div>

        <header className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            About and education
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            My learning journey
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            I am a first-year B.Tech student building a strong foundation in
            programming, web development, and artificial intelligence.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                My approach
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Learn it, build it, explain it
              </h2>
            </div>
            <span className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300">
              First-year B.Tech student
            </span>
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            I learn best by turning concepts into small applications, testing
            what I build, and documenting what I understand. This helps me
            grow step by step instead of rushing into tools I cannot yet
            explain.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              About me
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Learning through practice
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              I am currently learning the fundamentals of software
              development. My goal is to understand how real applications are
              planned, built, tested, and improved.
            </p>

            <p className="mt-4 leading-7 text-slate-400">
              I am focusing on honest progress instead of claiming professional
              experience. Every project I build helps me understand a new
              concept and improve my practical skills.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Education
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Bachelor of Technology
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              First-year B.Tech student
            </p>

            <p className="mt-2 leading-7 text-slate-400">
              Currently developing foundational knowledge in programming,
              computer science, web technologies, and AI/ML concepts.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Current focus areas
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-950 p-4 transition hover:bg-slate-800">
              <h3 className="font-semibold">Programming</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Learning problem-solving and programming fundamentals.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 transition hover:bg-slate-800">
              <h3 className="font-semibold">Web development</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Practicing HTML, CSS, JavaScript, React, and Next.js.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 transition hover:bg-slate-800">
              <h3 className="font-semibold">AI and ML</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Exploring Python, data, and machine-learning fundamentals.
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 transition hover:bg-slate-800">
              <h3 className="font-semibold">Project building</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Turning concepts into small, testable, and documented projects.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/portfolio"
            className="rounded-xl bg-cyan-400 px-5 py-3 text-center font-semibold text-slate-950 hover:bg-cyan-300"
          >
            View portfolio
          </a>

          <a
            href="/intro"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Back to introduction
          </a>
        </div>
      </div>
    </main>
  );
}