export function safeNextPath(value, fallback = "/analyze") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (value.includes("://")) return fallback;
  if (value.startsWith("/api/")) return fallback;
  if (value === "/login" || value.startsWith("/login?")) return fallback;
  if (/[\r\n]/.test(value)) return fallback;

  return value;
}
