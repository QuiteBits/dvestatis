import { ArrowLeft, ArrowRight, AlertIcon } from "@/app/components/icons";
import Link from "next/link";

export default function ResultsError({ username, title, message, detail }) {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 text-[12px] font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to analyzer
      </Link>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 text-center sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-warning/25 bg-warning/10 text-warning">
          <AlertIcon size={24} />
        </span>

        <h1 className="mt-5 text-2xl font-bold tracking-[-0.01em] text-foreground">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
          {message}
        </p>

        {detail && (
          <p className="mx-auto mt-4 max-w-md rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 text-[10.5px] leading-relaxed text-subtle">
            {detail}
          </p>
        )}

        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <a
            href={`/results/${encodeURIComponent(username)}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto"
          >
            Try again
            <ArrowRight size={14} />
          </a>
          <Link
            href="/analyze"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[12px] font-semibold text-foreground transition-colors hover:border-white/25 sm:w-auto"
          >
            Analyze another profile
          </Link>
        </div>
      </div>
    </div>
  );
}
