import { ShieldIcon } from "../icons";

export default function MethodCard({ scoringMethod, coverage }) {
  const objective = scoringMethod?.objectivePercentage ?? 40;
  const ai = scoringMethod?.aiPercentage ?? 60;
  const covered = Number.isFinite(coverage) ? Math.round(coverage) : 0;

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-5">
      <h2 className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
        <ShieldIcon size={15} className="text-primary" />
        Scoring method
      </h2>

      <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <span
          className="h-full bg-primary"
          style={{ width: `${objective}%` }}
        />
        <span
          className="h-full bg-white/25"
          style={{ width: `${ai}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[9.5px] uppercase tracking-[0.1em] text-subtle">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Objective {objective}%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          AI review {ai}%
        </span>
      </div>

      <p className="mt-3.5 text-[11px] leading-relaxed text-muted">
        Objective signals cover repository metadata, README structure, language
        distribution, commit activity, and profile completeness. The AI review
        evaluates the same evidence qualitatively.
      </p>

      <div className="mt-3.5 flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2">
        <span className="text-[9.5px] uppercase tracking-[0.12em] text-subtle">
          Weight covered
        </span>
        <span className="text-[12px] font-semibold text-foreground">
          {covered}%
        </span>
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-subtle">
        This is an evidence-based estimate, not an official certification or a
        complete measure of engineering ability.
      </p>
    </section>
  );
}
