
const dimensions = [
  {
    number: "01",
    title: "Repository Quality",
    description:
      "Evaluate repository structure, consistency, project quality, and engineering practices.",
  },
  {
    number: "02",
    title: "Documentation",
    description:
      "Understand how clearly projects communicate their purpose, setup, and usage.",
  },
  {
    number: "03",
    title: "Technology Diversity",
    description:
      "Measure the range of technologies and languages demonstrated across repositories.",
  },
  {
    number: "04",
    title: "Development Activity",
    description:
      "Examine contribution patterns, project updates, and development consistency.",
  },
  {
    number: "05",
    title: "Community Engagement",
    description:
      "Assess public collaboration signals and participation in the GitHub ecosystem.",
  },
  {
    number: "06",
    title: "Profile Completeness",
    description:
      "Review how effectively a developer presents their work and technical identity.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter a GitHub username",
    description:
      "Start with any public GitHub profile. No account connection is required for a public analysis.",
  },
  {
    number: "02",
    title: "We analyze the evidence",
    description:
      "DEVSTATIS examines repositories, languages, activity, documentation, and profile signals.",
  },
  {
    number: "03",
    title: "Explore your report",
    description:
      "Get a structured evaluation with category scores and insights into your developer portfolio.",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function GithubIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.6 10.6 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">
      <span className="h-px w-7 bg-violet-500" />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08080d] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-1/2 top-[-350px] h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute right-[-250px] top-[900px] h-[500px] w-[500px] rounded-full bg-indigo-700/10 blur-[140px]" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 border-b border-white/[0.07]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 font-bold text-white shadow-lg shadow-violet-600/20">
              D
            </div>
            <span className="text-lg font-bold tracking-tight">
              DEV<span className="text-violet-400">STATIS</span>
            </span>
          </a>

          <div className="hidden items-center gap-9 text-sm text-zinc-400 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#methodology" className="transition hover:text-white">
              Methodology
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
          </div>

          <a
            href="#analyze"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-violet-100"
          >
            Analyze profile <ArrowIcon />
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="analyze"
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 pb-28 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-36 lg:pt-32"
      >
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-4 py-2 text-xs font-medium text-violet-300">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            A new perspective on your GitHub portfolio
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Your GitHub tells a story.
            <span className="mt-2 block bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              We help you understand it.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            DEVSTATIS analyzes your public GitHub portfolio and turns
            development evidence into a structured, understandable report.
            Discover what your profile communicates — and where it can improve.
          </p>

          <form
            action="/analyze"
            method="GET"
            className="mt-10 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#111118] p-2 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <GithubIcon size={21} />
              <input
                type="text"
                name="username"
                placeholder="Enter GitHub username"
                aria-label="GitHub username"
                required
                pattern="[A-Za-z0-9-]+"
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >
              Analyze profile <ArrowIcon />
            </button>
          </form>

          <p className="mt-4 text-xs text-zinc-600">
            Public GitHub profiles · Structured evaluation · No account
            connection required
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.07] pt-7">
            <div>
              <p className="text-xl font-bold">06</p>
              <p className="mt-1 text-xs text-zinc-500">Evaluation dimensions</p>
            </div>
            <div className="h-9 w-px bg-white/10" />
            <div>
              <p className="text-xl font-bold">01</p>
              <p className="mt-1 text-xs text-zinc-500">Unified report</p>
            </div>
            <div className="h-9 w-px bg-white/10" />
            <div>
              <p className="text-xl font-bold">AI + Data</p>
              <p className="mt-1 text-xs text-zinc-500">Evaluation approach</p>
            </div>
          </div>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-5 rounded-[2rem] bg-violet-600/10 blur-3xl" />

          <div className="relative rounded-2xl border border-white/10 bg-[#101016] p-5 shadow-2xl shadow-black/50 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
              <div>
                <p className="text-sm font-semibold">Developer overview</p>
                <p className="mt-1 text-xs text-zinc-500">Sample report preview</p>
              </div>
              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[10px] font-medium text-violet-300">
                DEMO
              </span>
            </div>

            <div className="flex items-center gap-4 py-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xl font-bold">
                D
              </div>
              <div>
                <p className="font-semibold">Developer Profile</p>
                <p className="mt-1 text-sm text-zinc-500">@github-username</p>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-400">DEVSTATIS SCORE</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight">
                    82<span className="text-lg text-zinc-500">/100</span>
                  </p>
                </div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-violet-500/20">
                  <div className="absolute inset-[-6px] rounded-full border-[6px] border-transparent border-t-violet-400 border-r-violet-400 border-b-violet-400 rotate-[-35deg]" />
                  <span className="text-sm font-bold">82%</span>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-400">
                Illustrative score for the landing-page preview. Actual scores
                are calculated from analyzed profile evidence.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {[
                ["Repository Quality", 88],
                ["Documentation", 76],
                ["Technology Diversity", 91],
                ["Development Activity", 72],
                ["Community Engagement", 68],
                ["Profile Completeness", 95],
              ].map(([name, value]) => (
                <div key={name}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-zinc-400">{name}</span>
                    <span className="font-medium text-zinc-200">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-400"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5 text-xs">
              <span className="text-zinc-500">Evaluation preview</span>
              <span className="font-medium text-violet-300">
                Explore methodology →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 border-y border-white/[0.07] bg-white/[0.015] px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>What we evaluate</SectionLabel>

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                More than just
                <span className="block text-zinc-500">a GitHub number.</span>
              </h2>
              <p className="mt-6 max-w-md leading-7 text-zinc-400">
                A developer portfolio contains multiple signals. DEVSTATIS
                organizes those signals into six evaluation dimensions to
                provide a clearer picture of your public work.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {dimensions.map((item) => (
                <div
                  key={item.number}
                  className="group rounded-2xl border border-white/[0.07] bg-[#101016] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30"
                >
                  <p className="text-xs font-semibold tracking-widest text-violet-400">
                    {item.number}
                  </p>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <SectionLabel>The process</SectionLabel>

        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            From profile to perspective.
          </h2>
          <p className="mt-5 leading-7 text-zinc-400">
            A straightforward process that turns public GitHub data into
            information you can actually use.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/[0.07] bg-[#101016] p-7"
            >
              <span className="text-sm font-semibold text-violet-400">
                STEP {step.number}
              </span>
              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section
        id="methodology"
        className="relative z-10 border-y border-white/[0.07] bg-[#0d0d14] px-6 py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>Our approach</SectionLabel>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Evidence first.
              <span className="block text-violet-400">Insights second.</span>
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-zinc-400">
              DEVSTATIS combines measurable GitHub profile signals with
              AI-assisted evaluation. The goal is to explain what the available
              evidence suggests, not to claim that a single score defines a
              developer's actual engineering ability.
            </p>
            <a
              href="/methodology"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
            >
              Explore our methodology <ArrowIcon />
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-7 sm:p-9">
            <p className="text-sm font-semibold">Evaluation principles</p>
            <div className="mt-7 space-y-6">
              {[
                ["Observable signals", "Use evidence available from public GitHub data."],
                ["Multiple dimensions", "Avoid reducing an entire portfolio to one metric."],
                ["Explainable results", "Make category-level evaluation understandable."],
                ["Room for improvement", "Use findings to identify practical next steps."],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xs text-violet-300">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-28 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-xl shadow-violet-600/20">
            <GithubIcon size={27} />
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your next improvement
            <span className="block text-violet-400">starts with insight.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-zinc-400">
            See what your GitHub portfolio communicates. Understand your
            strengths, identify gaps, and make your next move with evidence.
          </p>
          <a
            href="#analyze"
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-violet-600 px-7 py-4 text-sm font-semibold transition hover:bg-violet-500"
          >
            Analyze your GitHub profile <ArrowIcon />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <a href="/" className="text-sm font-bold tracking-tight">
            DEV<span className="text-violet-400">STATIS</span>
          </a>

          <p className="text-center text-xs text-zinc-600">
            An independent developer portfolio analysis project by QuiteBits.
          </p>

          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#methodology" className="transition hover:text-white">
              Methodology
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
