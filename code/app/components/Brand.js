import Link from "next/link";

export default function Brand({ className = "", href = "/" }) {
  return (
    <Link
      href={href}
      aria-label="DEVSTATIS home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="text-primary transition-transform duration-300 group-hover:scale-110"
      >
        <rect x="2.5" y="15" width="3.4" height="6.5" rx="1" />
        <rect x="8.3" y="11" width="3.4" height="10.5" rx="1" />
        <rect x="14.1" y="7" width="3.4" height="14.5" rx="1" />
        <rect x="19.9" y="2.5" width="3" height="19" rx="1" opacity="0.55" />
      </svg>
      <span className="text-[17px] font-bold tracking-[0.14em] text-foreground">
        DEVSTATIS
      </span>
    </Link>
  );
}
