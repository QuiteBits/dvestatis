import {
  ForkIcon,
  FolderIcon,
  StarIcon,
  UsersIcon,
} from "../icons";
import { formatNumber } from "@/lib/format";

export default function StatsStrip({ profile, statistics }) {
  const stats = [
    {
      label: "Public repositories",
      value: statistics?.totalRepositories,
      icon: FolderIcon,
    },
    {
      label: "Total stars",
      value: statistics?.totalStars,
      icon: StarIcon,
    },
    {
      label: "Total forks",
      value: statistics?.totalForks,
      icon: ForkIcon,
    },
    {
      label: "Followers",
      value: profile?.followers,
      icon: UsersIcon,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
        const StatIcon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.07] bg-card/40 p-4 transition-colors hover:border-white/[0.12]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.06] text-primary">
              <StatIcon size={15} />
            </span>
            <p className="mt-3 text-xl font-bold tracking-[-0.01em] text-foreground">
              {formatNumber(stat.value)}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-subtle">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
