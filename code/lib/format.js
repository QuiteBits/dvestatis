export function formatNumber(value) {
  if (value === null || value === undefined) return "—";

  const number = Number(value);

  if (!Number.isFinite(number)) return "—";

  if (Math.abs(number) >= 1_000_000) {
    return `${(number / 1_000_000)
      .toFixed(number >= 10_000_000 ? 0 : 1)
      .replace(/\.0$/, "")}m`;
  }

  if (Math.abs(number) >= 1_000) {
    return `${(number / 1_000)
      .toFixed(number >= 10_000 ? 0 : 1)
      .replace(/\.0$/, "")}k`;
  }

  return number.toLocaleString("en-US");
}

export function formatDate(value, options = {}) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatRelative(value) {
  const timestamp = Date.parse(value);

  if (!Number.isFinite(timestamp)) return "—";

  const difference = Date.now() - timestamp;

  if (difference < 0) return "just now";

  const days = Math.floor(difference / 86_400_000);

  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;

  return `${(days / 365).toFixed(1).replace(/\.0$/, "")}y ago`;
}

export function getGrade(score) {
  if (!Number.isFinite(score)) return "—";
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 85) return "A-";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "B-";
  if (score >= 65) return "C+";
  if (score >= 60) return "C";
  if (score >= 50) return "C-";
  if (score >= 40) return "D";
  return "E";
}

export function scoreTone(score) {
  if (!Number.isFinite(score)) {
    return {
      text: "text-muted",
      bar: "bg-white/20",
      badge: "border-white/10 bg-white/[0.04] text-muted",
    };
  }

  if (score >= 80) {
    return {
      text: "text-primary",
      bar: "bg-primary",
      badge: "border-primary/25 bg-primary/10 text-primary",
    };
  }

  if (score >= 60) {
    return {
      text: "text-warning",
      bar: "bg-warning",
      badge: "border-warning/25 bg-warning/10 text-warning",
    };
  }

  return {
    text: "text-danger",
    bar: "bg-danger",
    badge: "border-danger/25 bg-danger/10 text-danger",
  };
}

export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4f5d95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Dart: "#00b4ab",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Lua: "#000080",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Scala: "#c22d40",
  R: "#198ce7",
  Dockerfile: "#384d54",
};

export function languageColor(name) {
  return LANGUAGE_COLORS[name] || "#b4f43e";
}
