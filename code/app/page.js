const features = [
  {
    number: "01",
    title: "Profile analysis",
    description:
      "Evaluate your GitHub profile, bio, activity, followers, and overall presentation.",
  },
  {
    number: "02",
    title: "Repository intelligence",
    description:
      "Inspect repositories, programming languages, documentation, and project quality.",
  },
  {
    number: "03",
    title: "Developer score",
    description:
      "Get a transparent score based on measurable aspects of your GitHub presence.",
  },
  {
    number: "04",
    title: "AI recommendations",
    description:
      "Get practical feedback and suggestions to improve your developer profile.",
  },
];

const metrics = [
  ["30%", "Repository quality"],
  ["20%", "Documentation"],
  ["15%", "Tech diversity"],
  ["15%", "Activity"],
  ["10%", "Community"],
  ["10%", "Profile completeness"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090d] text-white">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 font-bold text-white">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight">
            DEVSTATIS<span className="text-violet-400">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#methodology" className="transition hover:text-white">
            Methodology
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
        </div>

        <a
          href="#analyze"
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:border-violet-400/50 hover:bg-violet-500/10"
        >
          Get started <span className="text-violet-400">↗</span>
        </a>
      </nav>

      {/* Hero */}
      <section
        id="analyze"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-28 pt-24 text-center lg:px-10 lg:pt-32"
      >
        <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative z-10 mb-8 flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/5 px-4 py-2 text-xs text-violet-300">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          YOUR GITHUB, ANALYZED
        </div>

        <h1 className="relative z-10 max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Your GitHub.
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            Under the microscope.
          </span>
        </h1>

        <p className="relative z-10 mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
          Your repositories tell a story. Discover what your GitHub profile says
          about your development journey through intelligent analysis and
          actionable feedback.
        </p>

        <div className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#features"
            className="rounded-xl bg-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
          >
            Explore DEVSTATIS <span className="ml-2">→</span>
          </a>
          <a
            href="#methodology"
            className="rounded-xl border border-white/10 px-7 py-3.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
          >
            How scoring works
          </a>
        </div>

        <div className="relative z-10 mt-20 w-full max-w-3xl rounded-2xl border border-white/10 bg-[#111116] p-5 text-left shadow-2xl shadow-violet-950/20 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-xs text-zinc-500">ANALYSIS PREVIEW</p>
              <p className="mt-1 font-semibold">Developer report</p>
            </div>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
              Preview
            </span>
          </div>

          <div className="grid gap-8 py-8 sm:grid-cols-[1fr_1.5fr] sm:items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-[7px] border-violet-500/30">
                <div className="text-center">
                  <p className="text-5xl font-bold">--</p>
                  <p className="mt-1 text-xs text-zinc-500">OUT OF 100</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-400">Your developer score</p>
            </div>

            <div className="space-y-5">
              {[
                "Repositories",
                "Documentation",
                "Tech diversity",
                "Activity",
              ].map((item) => (
                <div key={item}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{item}</span>
                    <span className="text-zinc-600">Pending analysis</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-0 rounded-full bg-violet-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="border-t border-white/10 pt-4 text-center text-xs text-zinc-500">
            Illustrative preview · No real user data
          </p>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-white/5 bg-[#0d0d13] px-6 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-violet-400">
            WHAT WE ANALYZE
          </p>
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              More than just a GitHub profile viewer.
            </h2>
            <p className="max-w-md text-sm leading-7 text-zinc-400">
              A closer look at the projects, patterns, and practices behind your
              developer identity.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group rounded-2xl border border-white/10 bg-[#111116] p-6 transition hover:-translate-y-1 hover:border-violet-400/40"
              >
                <p className="text-sm font-medium text-violet-400">
                  / {feature.number}
                </p>
                <h3 className="mt-10 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-violet-400">
              TRANSPARENT SCORING
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Every point should have a reason.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-8 text-zinc-400">
              DEVSTATIS uses a structured scoring framework to evaluate
              different aspects of your GitHub presence. AI helps explain the
              findings and suggest improvements.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <h3 className="font-semibold">Scoring framework</h3>
              <span className="text-xs text-zinc-500">100 points total</span>
            </div>

            <div className="space-y-5">
              {metrics.map(([percentage, label]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{label}</span>
                    <span className="font-medium text-violet-300">
                      {percentage}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-1.5 rounded-full bg-violet-500"
                      style={{ width: percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-[#111116] px-6 py-16 text-center sm:px-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-violet-300">
            BUILT FOR DEVELOPERS
          </p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Understand your GitHub presence.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
            Built by QuiteBits to make developer profiles easier to understand,
            evaluate, and improve.
          </p>
          <a
            href="#features"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Discover the features →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>
            © 2026 DEVSTATIS. Built by{" "}
            <span className="text-zinc-300">QuiteBits</span>.
          </p>
          <p>Your GitHub. Under the microscope.</p>
        </div>
      </footer>
    </main>
  );
}
