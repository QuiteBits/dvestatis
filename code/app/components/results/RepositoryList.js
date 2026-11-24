import {
  formatNumber,
  formatRelative,
  languageColor,
} from "@/lib/format";
import {
  BookIcon,
  ExternalLinkIcon,
  ForkIcon,
  FolderIcon,
  StarIcon,
} from "../icons";

export default function RepositoryList({ username, repositories = [] }) {
  const featured = [...repositories]
    .sort(
      (a, b) =>
        Number(a.isFork) - Number(b.isFork) ||
        b.stars - a.stars ||
        Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    )
    .slice(0, 6);

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
            Repository highlights
          </h2>
          <p className="mt-1 text-[12px] text-muted">
            The most visible work from {repositories.length} public
            repositories.
          </p>
        </div>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-primary"
        >
          View all
          <ExternalLinkIcon size={12} />
        </a>
      </div>

      {featured.length > 0 ? (
        <div className="mt-5 space-y-2.5">
          {featured.map((repo) => (
            <a
              key={repo.fullName}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 transition-colors hover:border-primary/25 hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <FolderIcon size={14} className="text-primary/80" />
                    <span className="truncate text-[13px] font-semibold text-foreground transition-colors group-hover:text-primary">
                      {repo.name}
                    </span>
                    {repo.isFork && (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[8.5px] font-medium uppercase tracking-[0.08em] text-subtle">
                        Fork
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-muted">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[10px] text-subtle">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: languageColor(repo.language),
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <StarIcon size={11} />
                      {formatNumber(repo.stars)}
                    </span>
                    <span className="flex items-center gap-1">
                      <ForkIcon size={11} />
                      {formatNumber(repo.forks)}
                    </span>
                    <span>Updated {formatRelative(repo.updatedAt)}</span>
                    {repo.hasReadme && (
                      <span className="flex items-center gap-1 text-primary/80">
                        <BookIcon size={11} />
                        README
                      </span>
                    )}
                  </div>
                </div>

                <ExternalLinkIcon
                  size={14}
                  className="mt-1 shrink-0 text-subtle transition-colors group-hover:text-primary"
                />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-[12px] leading-relaxed text-muted">
          No public repositories were found for this profile.
        </p>
      )}
    </section>
  );
}
