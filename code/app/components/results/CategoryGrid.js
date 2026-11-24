import { scoreTone } from "@/lib/format";
import { CATEGORIES } from "./categories";

export default function CategoryGrid({ data }) {
  const breakdown = data?.breakdown || {};
  const categoryInsights = data?.insights?.categoryInsights || {};

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
            Category breakdown
          </h2>
          <p className="mt-1 text-[12px] text-muted">
            Each category blends objective signals with the AI review.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium text-subtle">
          6 weighted categories
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((category) => {
          const item = breakdown[category.key];
          const insight = categoryInsights[category.key];
          const score = item?.score;
          const tone = scoreTone(score);
          const CategoryIcon = category.icon;

          return (
            <article
              key={category.key}
              className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-white/[0.12]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted">
                    <CategoryIcon size={15} />
                  </span>
                  <p className="truncate text-[12.5px] font-semibold text-foreground">
                    {category.label}
                  </p>
                </div>
                <span className={`text-lg font-bold leading-none ${tone.text}`}>
                  {Number.isFinite(score) ? Math.round(score) : "—"}
                </span>
              </div>

              <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ${tone.bar}`}
                  style={{
                    width: `${
                      Number.isFinite(score)
                        ? Math.max(0, Math.min(100, score))
                        : 0
                    }%`,
                  }}
                />
              </div>

              <div className="mt-2 flex items-center gap-3 text-[9px] uppercase tracking-[0.12em] text-subtle">
                <span>Objective {item?.objectiveScore ?? "—"}</span>
                <span>AI {item?.aiScore ?? "—"}</span>
                <span className="ml-auto">Weight {item?.weight ?? "—"}%</span>
              </div>

              <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
                {insight?.reasoning || category.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
