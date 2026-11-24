import { formatRelative, scoreTone } from "@/lib/format";
import { BoltIcon } from "../icons";

export default function ActivityCard({ activity }) {
  const data = activity || {};
  const score = data.score;
  const tone = scoreTone(score);
  const commits = [...(data.latestCommits || [])].sort(
    (a, b) =>
      Date.parse(b.latestCommitDate) - Date.parse(a.latestCommitDate)
  );

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <BoltIcon size={15} className="text-primary" />
            Recent activity
          </h2>
          <p className="mt-1 text-[10.5px] text-subtle">
            Sampled from original repositories
          </p>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${tone.badge}`}
        >
          {Number.isFinite(score) ? Math.round(score) : "—"}
        </span>
      </div>

      {data.analyzedRepositories > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["≤ 90 days", `${data.activeWithin90Days}/${data.sampledRepositories}`],
              ["≤ 1 year", `${data.activeWithin365Days}/${data.sampledRepositories}`],
              ["Coverage", `${data.coverage ?? 0}%`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/[0.06] bg-black/20 px-2.5 py-2"
              >
                <p className="text-[8.5px] uppercase tracking-[0.12em] text-subtle">
                  {label}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-4 space-y-3">
            {commits.slice(0, 4).map((commit) => {
              const repoName = commit.repository?.split("/")[1] || commit.repository;

              return (
                <li
                  key={commit.repository}
                  className="border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-[11.5px] font-medium text-foreground">
                      {repoName}
                    </span>
                    <span className="shrink-0 text-[10px] text-subtle">
                      {formatRelative(commit.latestCommitDate)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-subtle">
                    {commit.commitsWithin365Days} sampled commits ·{" "}
                    {commit.activeMonths} active months
                  </p>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] leading-relaxed text-subtle">
            Commit samples can be truncated. Activity is not a measure of code
            quality.
          </p>
        </>
      ) : (
        <p className="mt-4 text-[11.5px] leading-relaxed text-muted">
          No recent commit data was found in the sampled repositories.
        </p>
      )}
    </section>
  );
}
