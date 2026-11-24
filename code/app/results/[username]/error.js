"use client";

import Link from "next/link";
import { AlertIcon, ArrowLeft } from "@/app/components/icons";

export default function ResultsErrorBoundary({ error, reset }) {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 text-[12px] font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to analyzer
      </Link>

      <div className="mt-5 rounded-2xl border border-white/10 bg-card/60 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-danger/25 bg-danger/10 text-danger">
          <AlertIcon size={24} />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-foreground">
          Something went wrong
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
          The report could not be displayed. This is usually temporary.
        </p>
        <p className="mx-auto mt-3 max-w-md break-words rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 text-[10.5px] text-subtle">
          {error?.message || "Unknown rendering error."}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/analyze"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-[12px] font-semibold text-foreground transition-colors hover:border-white/25 sm:w-auto"
          >
            Analyze another profile
          </Link>
        </div>
      </div>
    </div>
  );
}
