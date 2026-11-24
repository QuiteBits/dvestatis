import Link from "next/link";
import DashboardPreview from "./DashboardPreview";
import { ArrowRight } from "./icons";

export default function Hero() {
  return (
    <section
      id="product"
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-12 lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="absolute -right-24 top-6 h-[420px] w-[260px] rotate-[32deg] bg-gradient-to-b from-primary/[0.09] via-primary/[0.02] to-transparent blur-2xl" />
        <div className="absolute -left-32 top-1/3 h-[320px] w-[320px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              GitHub Profile Analytics
            </span>

            <h1 className="mt-6 text-[2.7rem] font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-[3.55rem]">
              Your GitHub activity.
              <br />
              <span className="text-primary">Decoded.</span>
            </h1>

            <p className="mt-6 max-w-[500px] text-base leading-7 text-muted">
              Turn your GitHub profile into meaningful insights. Explore your
              repositories, understand your development patterns, and see the
              bigger picture behind your code.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/analyze"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_var(--glow)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_38px_rgba(180,244,62,0.4)]"
              >
                Analyze your GitHub
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
              >
                Explore features
              </a>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
