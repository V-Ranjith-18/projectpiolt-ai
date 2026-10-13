import PortfolioNav from "../components/PortfolioNav";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <PortfolioNav />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/projects" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to projects
          </a>

          <a href="/" className="text-sm text-slate-400 hover:text-cyan-300">
            ProjectPilot home
          </a>
        </div>

        <header className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Contact
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s connect
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            I am currently focused on learning and building practical projects.
            For educational collaboration, feedback, or beginner-friendly
            opportunities, you can connect with me through the links below.
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Email
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Start a conversation</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Add a public email address only when you are ready to share one.
              Use an address created for professional or learning
              communication.
            </p>
            <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-500">
              Public email link will appear here when configured.
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Collaboration
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Learning together
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              I am open to student collaborations, constructive feedback, and
              opportunities that match my current learning stage.
            </p>
          </article>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Share learning", "Discuss projects, ideas, and useful resources."],
            ["Give feedback", "Suggest improvements to projects and documentation."],
            ["Build together", "Explore beginner-friendly educational collaboration."],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            Privacy reminder
          </p>
          <p className="mt-3 leading-7 text-slate-300">
            Do not publish your phone number, home address, passwords, API
            keys, or other private information on a public portfolio.
          </p>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/intro"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Introduction
          </a>
          <a
            href="/portfolio"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Portfolio manager
          </a>
        </div>
      </div>
    </main>
  );
}
