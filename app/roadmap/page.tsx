import PortfolioNav from "../components/PortfolioNav";

const roadmapStages = [
  {
    number: "01",
    title: "Programming foundations",
    status: "Current priority",
    description:
      "Build strong problem-solving ability and understand how programs work before focusing on complex frameworks.",
    topics: [
      "C++ syntax and control flow",
      "Functions, arrays, strings, and pointers",
      "Object-oriented programming",
      "Data structures and algorithms",
    ],
  },
  {
    number: "02",
    title: "Web-development fundamentals",
    status: "Next stage",
    description:
      "Learn how websites are structured, styled, and made interactive across different screen sizes.",
    topics: [
      "Semantic HTML",
      "CSS layout and responsive design",
      "JavaScript fundamentals",
      "Forms, events, and browser APIs",
    ],
  },
  {
    number: "03",
    title: "Modern frontend development",
    status: "Planned",
    description:
      "Build maintainable user interfaces with reusable components and typed application code.",
    topics: [
      "React components and state",
      "Next.js App Router",
      "TypeScript fundamentals",
      "Tailwind CSS and accessibility",
    ],
  },
  {
    number: "04",
    title: "Backend and data systems",
    status: "Planned",
    description:
      "Understand how applications store data, expose APIs, validate input, and manage users securely.",
    topics: [
      "Node.js and REST APIs",
      "SQL and relational databases",
      "Authentication and authorization",
      "Input validation and error handling",
    ],
  },
  {
    number: "05",
    title: "AI and machine learning",
    status: "Long-term goal",
    description:
      "Develop the mathematical, Python, and data foundations needed to build useful AI and ML features responsibly.",
    topics: [
      "Python programming",
      "Statistics and linear algebra",
      "Data preparation and visualization",
      "Machine-learning model fundamentals",
    ],
  },
  {
    number: "06",
    title: "Professional delivery",
    status: "Long-term goal",
    description:
      "Learn how to test, document, deploy, secure, and communicate about software projects professionally.",
    topics: [
      "Automated and manual testing",
      "Git workflows and code review",
      "Deployment and monitoring",
      "Requirements, estimation, and client communication",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <PortfolioNav />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/skills" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to skills
          </a>

          <a href="/" className="text-sm text-slate-400 hover:text-cyan-300">
            ProjectPilot home
          </a>
        </div>

        <header className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Learning roadmap
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            A structured path for growth
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            This roadmap is designed to build capability in the correct order.
            Each stage should be supported by practice projects and honest
            self-assessment.
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Learning progress
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Building the foundation before moving to advanced work.
              </p>
            </div>
            <span className="text-2xl font-bold text-cyan-300">1 / 6</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[16.67%] rounded-full bg-cyan-400" />
          </div>
        </div>

        <section className="mt-12 space-y-6">
          {roadmapStages.map((stage) => (
            <article
              key={stage.number}
              className={`rounded-2xl border p-6 transition md:p-8 ${
                stage.status === "Current priority"
                  ? "border-cyan-400/50 bg-cyan-400/5 shadow-lg shadow-cyan-950/20"
                  : "border-slate-800 bg-slate-900 hover:border-slate-700"
              }`}
            >
              <div className="flex flex-col gap-5 md:flex-row">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                    stage.status === "Current priority"
                      ? "bg-cyan-400 text-slate-950"
                      : "bg-slate-800 text-cyan-300"
                  }`}
                >
                  {stage.number}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold">{stage.title}</h2>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                        stage.status === "Current priority"
                          ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                          : "border-slate-700 bg-slate-950 text-slate-400"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                    {stage.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {stage.topics.map((topic) => (
                      <div
                        key={topic}
                        className="rounded-lg bg-slate-950 px-4 py-3 text-sm text-slate-300"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Progress principle
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Build, document, reflect, and improve
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Do not rush through the stages. Complete small projects, document
            what you learned, review your mistakes, and move forward when you
            can explain the fundamentals clearly.
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
            href="/skills"
            className="rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 hover:border-cyan-400"
          >
            Back to skills
          </a>
        </div>
      </div>
    </main>
  );
}