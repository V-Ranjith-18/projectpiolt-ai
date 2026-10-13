import PortfolioNav from "../components/PortfolioNav";

const skillGroups = [
  {
    title: "Currently learning",
    description:
      "Technologies I am actively studying through coursework and practice projects.",
    skills: ["C++", "Python", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Basic familiarity",
    description:
      "Tools and technologies I have started exploring but am not presenting as professional expertise.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git and GitHub"],
  },
  {
    title: "Future learning goals",
    description:
      "Areas I plan to study after strengthening my programming and web-development foundations.",
    skills: [
      "Node.js and backend development",
      "SQL and database design",
      "Machine learning",
      "APIs and authentication",
      "Testing and deployment",
    ],
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <PortfolioNav />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/about" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to about
          </a>

          <a href="/" className="text-sm text-slate-400 hover:text-cyan-300">
            ProjectPilot home
          </a>
        </div>

        <header className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Technical skills
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Skills I am developing
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            This page reflects my current learning stage honestly. I am
            building fundamentals before presenting myself as a professional
            developer.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Foundation first", "Strong basics make advanced tools easier to understand."],
            ["02", "Practice often", "Small projects turn concepts into usable experience."],
            ["03", "Stay honest", "Clear skill levels build trust and guide the next step."],
          ].map(([number, title, description]) => (
            <article
              key={number}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <p className="text-sm font-bold text-cyan-400">{number}</p>
              <h2 className="mt-3 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold">{group.title}</h2>
                <span className="rounded-full bg-slate-950 px-2 py-1 text-xs text-slate-500">
                  {group.skills.length}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {group.description}
              </p>

              <ul className="mt-6 space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg bg-slate-950 px-4 py-3 text-sm text-slate-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Learning principle
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Build understanding before making promises
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            My goal is to build projects that demonstrate real understanding.
            I will update this page as I complete projects, learn new
            technologies, and receive meaningful feedback.
          </p>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/portfolio"
            className="rounded-xl bg-cyan-400 px-5 py-3 text-center font-semibold text-slate-950 hover:bg-cyan-300"
          >
            View portfolio
          </a>

          <a
            href="/about"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Back to about
          </a>
        </div>
      </div>
    </main>
  );
}