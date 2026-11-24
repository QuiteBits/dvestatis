import {
  ChartIcon,
  CheckIcon,
  ChevronDown,
  FolderIcon,
  GlobeIcon,
  GridIcon,
  SettingsIcon,
} from "./icons";

const heatLevels = [
  "bg-white/[0.05]",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary/90",
];

const heatmap = Array.from({ length: 168 }, (_, i) => {
  const column = Math.floor(i / 7);
  const row = i % 7;
  const noise =
    Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1;
  if (noise > 0.84) return 4;
  if (noise > 0.64) return 3;
  if (noise > 0.4) return 2;
  if (noise > 0.18) return 1;
  return 0;
});

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const languages = [
  { name: "Python", value: "37.7%", color: "#b4f43e" },
  { name: "JavaScript", value: "29.9%", color: "#d8ff80" },
  { name: "C++", value: "18.4%", color: "#7b7f87" },
  { name: "Other", value: "13.9%", color: "#3a3d45" },
];

const sidebarItems = [
  { label: "Overview", icon: GridIcon, active: true },
  { label: "Repositories", icon: FolderIcon },
  { label: "Languages", icon: GlobeIcon },
  { label: "Insights", icon: ChartIcon },
  { label: "Settings", icon: SettingsIcon },
];

const stats = [
  { label: "Overall Score", value: "92", suffix: "/100" },
  { label: "Repositories", value: "128" },
  { label: "Contributions", value: "12.5k" },
];

function Donut() {
  return (
    <svg
      viewBox="0 0 42 42"
      className="h-14 w-14 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="21"
        cy="21"
        r="15.9155"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="5.5"
      />
      <g transform="rotate(-90 21 21)">
        <circle
          cx="21"
          cy="21"
          r="15.9155"
          fill="none"
          stroke="#b4f43e"
          strokeWidth="5.5"
          strokeDasharray="37.7 62.3"
          strokeDashoffset="25"
        />
        <circle
          cx="21"
          cy="21"
          r="15.9155"
          fill="none"
          stroke="#d8ff80"
          strokeWidth="5.5"
          strokeDasharray="29.9 70.1"
          strokeDashoffset="-12.7"
        />
        <circle
          cx="21"
          cy="21"
          r="15.9155"
          fill="none"
          stroke="#7b7f87"
          strokeWidth="5.5"
          strokeDasharray="18.4 81.6"
          strokeDashoffset="-42.6"
        />
        <circle
          cx="21"
          cy="21"
          r="15.9155"
          fill="none"
          stroke="#3a3d45"
          strokeWidth="5.5"
          strokeDasharray="14 86"
          strokeDashoffset="-61"
        />
      </g>
    </svg>
  );
}

function RepositoryChart() {
  return (
    <svg
      viewBox="0 0 160 44"
      preserveAspectRatio="none"
      className="mt-1 h-11 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="repoFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b4f43e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#b4f43e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 38 C10 34 18 30 28 32 C40 35 46 20 58 22 C70 24 76 14 88 18 C100 22 108 10 120 13 C134 16 142 8 160 11 L160 44 L0 44 Z"
        fill="url(#repoFill)"
      />
      <path
        d="M0 38 C10 34 18 30 28 32 C40 35 46 20 58 22 C70 24 76 14 88 18 C100 22 108 10 120 13 C134 16 142 8 160 11"
        fill="none"
        stroke="#b4f43e"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DashboardPreview() {
  return (
    <div className="relative min-w-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[32px] bg-primary/[0.07] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0f] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9),0_0_40px_rgba(180,244,62,0.05)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#f87171]/60" />
            <span className="h-2 w-2 rounded-full bg-[#fbbf24]/60" />
            <span className="h-2 w-2 rounded-full bg-[#34d399]/60" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[9px] text-muted">
            Last year
            <ChevronDown size={10} />
          </div>
        </div>

        <div className="flex">
          <aside className="hidden w-[88px] shrink-0 flex-col gap-0.5 border-r border-white/[0.06] p-2.5 md:flex">
            <div className="mb-2 flex items-center gap-1.5 px-2 py-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
              <span className="text-[9px] font-bold tracking-wider text-foreground">
                DS
              </span>
            </div>
            {sidebarItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[8.5px] ${
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted"
                  }`}
                >
                  <ItemIcon size={11} />
                  {item.label}
                </div>
              );
            })}
          </aside>

          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="flex items-center gap-2.5">
              <div
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#68a80c] text-[11px] font-bold text-primary-foreground"
              >
                T
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[11px] font-semibold text-foreground">
                    torvalds
                  </span>
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckIcon size={8} strokeWidth={3} />
                  </span>
                </div>
                <p className="truncate text-[8px] text-muted">
                  Developer · Open Source Enthusiast
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-lg border border-primary/25 bg-primary/[0.07] px-2.5 py-2">
                <p className="text-xl font-bold leading-none text-primary">
                  A+
                </p>
                <p className="mt-1 text-[8px] text-muted">Developer Grade</p>
              </div>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2"
                >
                  <p className="text-xl font-bold leading-none text-foreground">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-[10px] font-medium text-subtle">
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-[8px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-semibold text-foreground">
                  Contribution Activity
                </p>
                <div className="hidden items-center gap-1 text-[7px] text-subtle sm:flex">
                  Less
                  <span className="ml-0.5 flex gap-[2px]">
                    {heatLevels.slice(0, 4).map((level) => (
                      <span
                        key={level}
                        className={`h-[6px] w-[6px] rounded-[1px] ${level}`}
                      />
                    ))}
                  </span>
                  More
                </div>
              </div>

              <div className="mt-2">
                <div className="mb-1 flex justify-between text-[6.5px] text-subtle">
                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
                <div
                  aria-hidden="true"
                  className="grid grid-flow-col grid-rows-7 gap-[2.5px]"
                >
                  {heatmap.map((level, index) => (
                    <span
                      key={index}
                      className={`h-[6px] w-[6px] rounded-[1px] sm:h-[7px] sm:w-[7px] ${heatLevels[level]}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
                <p className="text-[9px] font-semibold text-foreground">
                  Top Languages
                </p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <Donut />
                  <ul className="min-w-0 flex-1 space-y-1">
                    {languages.map((language) => (
                      <li
                        key={language.name}
                        className="flex items-center justify-between gap-2 text-[7.5px]"
                      >
                        <span className="flex min-w-0 items-center gap-1.5 text-muted">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: language.color }}
                          />
                          <span className="truncate">{language.name}</span>
                        </span>
                        <span className="font-medium text-foreground">
                          {language.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-foreground">
                    Repository Activity
                  </p>
                  <span className="flex items-center gap-1 text-[7px] text-subtle">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Commits
                  </span>
                </div>
                <RepositoryChart />
                <div className="flex justify-between text-[6.5px] text-subtle">
                  <span>Jan</span>
                  <span>Apr</span>
                  <span>Jul</span>
                  <span>Oct</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
