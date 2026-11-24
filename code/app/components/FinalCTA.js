import Link from "next/link";
import { ArrowRight } from "./icons";

export default function FinalCTA() {
  return (
    <section id="analyze" className="pb-12 pt-0 sm:pb-8">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0f]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-primary/[0.07] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-32 w-3/4 bg-[repeating-linear-gradient(135deg,rgba(180,244,62,0.22)_0px,rgba(180,244,62,0.22)_1px,transparent_1px,transparent_9px)] opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]"
          />

          <div className="relative flex flex-col items-start justify-between gap-6 px-6 py-7 sm:flex-row sm:items-center sm:px-10">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-foreground sm:text-[1.75rem]">
              Your GitHub has more to tell.
            </h2>

            <Link
              href="/analyze"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_var(--glow)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_34px_rgba(180,244,62,0.38)]"
            >
              Analyze your profile
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
