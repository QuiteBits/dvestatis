import {
  AlertIcon,
  CheckIcon,
  SparklesIcon,
  TargetIcon,
} from "../icons";

function FeedbackList({
  title,
  description,
  items = [],
  icon: ListIcon,
  iconClassName,
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
      <div className="flex items-center gap-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] ${iconClassName}`}>
          <ListIcon size={14} />
        </span>
        <div>
          <h3 className="text-[12.5px] font-semibold text-foreground">{title}</h3>
          <p className="text-[10px] text-subtle">{description}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="mt-3.5 space-y-2.5">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-2 text-[11.5px] leading-relaxed text-muted"
            >
              <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current ${iconClassName}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3.5 text-[11.5px] leading-relaxed text-subtle">
          No evidence-based notes were generated for this section.
        </p>
      )}
    </div>
  );
}

export default function InsightSection({ insights }) {
  const strengths = insights?.strengths || [];
  const improvements = insights?.improvements || [];
  const recommendations = insights?.recommendations || [];

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-6 sm:p-8">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
        <SparklesIcon size={14} />
        AI review
      </div>
      <h2 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-foreground">
        What stands out
      </h2>
      <p className="mt-1 text-[12px] text-muted">
        Qualitative feedback grounded in the public evidence supplied to the
        model.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <FeedbackList
          title="Strengths"
          description="What is working well"
          items={strengths}
          icon={CheckIcon}
          iconClassName="text-primary"
        />
        <FeedbackList
          title="Growth areas"
          description="Where the profile can improve"
          items={improvements}
          icon={AlertIcon}
          iconClassName="text-warning"
        />
      </div>

      <div className="mt-4 rounded-xl border border-primary/15 bg-primary/[0.035] p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            <TargetIcon size={14} />
          </span>
          <div>
            <h3 className="text-[12.5px] font-semibold text-foreground">
              Recommended next steps
            </h3>
            <p className="text-[10px] text-subtle">
              Practical actions supported by this report
            </p>
          </div>
        </div>

        {recommendations.length > 0 ? (
          <ol className="mt-4 space-y-2.5">
            {recommendations.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-3 text-[11.5px] leading-relaxed text-muted"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-[9px] font-bold text-primary">
                  {index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-[11.5px] leading-relaxed text-subtle">
            No recommendations were generated for this profile.
          </p>
        )}
      </div>
    </section>
  );
}
