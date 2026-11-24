import { formatRelative, getGrade, scoreTone } from "@/lib/format";
import { SparklesIcon } from "../icons";
import ScoreRing from "./ScoreRing";

export default function ScorePanel({ data }) {
  const score = data?.score;
  const grade = getGrade(score);
  const tone = scoreTone(score);
  const method = data?.scoringMethod || {};
  const objective = method.objectivePercentage ?? 40;
  const ai = method.aiPercentage ?? 60;
  const coverage = Number.isFinite(data?.coverage)
    ? Math.round(data.coverage)
    : 0;
  const evaluated = Object.values(data?.breakdown || {}).filter(
    (item) => item?.score !== null && item?.score !== undefined
  ).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-card/60">
      <div className="relative grid gap-7 p-6 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl"
        />

        <div className="relative flex flex-col items-center justify-center">
          <ScoreRing score={score} size={200} strokeWidth={8}>
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-subtle">
              Overall
            </span>
            <span
              className={`mt-1 text-[3.25rem] font-bold leading-none ${tone.text}`}
            >
              {Number.isFinite(score) ? Math.round(score) : "—"}
            </span>
            <span className="mt-1 text-[10px] text-muted">out of 100</span>
          </ScoreRing>

          <span
            className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-[0.08em] ${tone.badge}`}
          >
            {grade} grade
          </span>
        </div>

        <div className="relative min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            <SparklesIcon size={14} />
            AI verdict
          </div>

          <p className="mt-3 text-[13.5px] leading-7 text-foreground/90">
            {data?.insights?.summary ||
              "Not enough public evidence was available to generate a summary."}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              ["Weight covered", `${coverage}%`],
              ["Categories", `${evaluated}/6`],
              ["Hybrid split", `${objective}/${ai}`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/[0.07] bg-black/20 px-3 py-2.5"
              >
                <p className="text-[9px] uppercase tracking-[0.14em] text-subtle">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[10.5px] leading-relaxed text-subtle">
            Weighted from {objective}% objective evidence and {ai}% AI review.
            Scores are estimates based on public data, not a certification.
            Generated {formatRelative(data?.generatedAt)}.
          </p>
        </div>
      </div>
    </section>
  );
}
