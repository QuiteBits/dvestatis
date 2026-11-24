export function Icon({
  children,
  size = 18,
  strokeWidth = 1.7,
  className = "",
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
}

export function GithubIcon({ size = 18, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = "", ...props }) {
  return (
    <Icon size={size} strokeWidth={2} className={className} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function ChevronDown({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} strokeWidth={2} className={className} {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function BarChartIcon({ size = 18, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M4 19V11" />
      <path d="M10 19V5" />
      <path d="M16 19v-5" />
      <path d="M22 19V8" />
    </Icon>
  );
}

export function CodeIcon({ size = 18, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13 5-2 14" />
    </Icon>
  );
}

export function PieIcon({ size = 18, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </Icon>
  );
}

export function BoltIcon({ size = 18, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Icon>
  );
}

export function CheckIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="m5 12 5 5L20 7" />
    </Icon>
  );
}

export function FolderIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </Icon>
  );
}

export function GlobeIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
    </Icon>
  );
}

export function ChartIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 3 3 5-6" />
    </Icon>
  );
}

export function GridIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Icon>
  );
}

export function SettingsIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </Icon>
  );
}

export function FileIcon({ size = 18, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </Icon>
  );
}

export function ArrowLeft({ size = 16, className = "", ...props }) {
  return (
    <Icon size={size} strokeWidth={2} className={className} {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Icon>
  );
}

export function StarIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
    </Icon>
  );
}

export function ForkIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 7v3a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V7" />
      <path d="M12 14v3" />
    </Icon>
  );
}

export function UsersIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  );
}

export function MapPinIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function BuildingIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21.5v-3h4v3" />
    </Icon>
  );
}

export function LinkIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Icon>
  );
}

export function CalendarIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </Icon>
  );
}

export function SparklesIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
      <path d="M5 14l.6 1.6L7 16l-1.4.4L5 18l-.6-1.6L3 16l1.4-.4L5 14Z" />
    </Icon>
  );
}

export function ShieldIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function AlertIcon({ size = 18, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </Icon>
  );
}

export function TargetIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </Icon>
  );
}

export function CopyIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </Icon>
  );
}

export function ShareIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.7 6.8-4.2M8.6 13.3l6.8 4.2" />
    </Icon>
  );
}

export function LogOutIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </Icon>
  );
}

export function ExternalLinkIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </Icon>
  );
}

export function ClockIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function BookIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M12 6.5C10.5 5 8.5 4.5 5 4.5v14c3.5 0 5.5.5 7 2 1.5-1.5 3.5-2 7-2v-14c-3.5 0-5.5.5-7 2Z" />
      <path d="M12 6.5v14" />
    </Icon>
  );
}

export function TrendingIcon({ size = 14, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </Icon>
  );
}

export function SearchIcon({ size = 16, className = "", ...props }) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  );
}

export function XIcon({ size = 16, className = "", ...props }) {
  return (
    <Icon size={size} strokeWidth={2} className={className} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
}

export function QuoteIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      {...props}
    >
      <path d="M9.5 5C6.5 6.6 4.6 9.3 4.6 12.7c0 3 1.7 5 4.1 5 2.1 0 3.7-1.5 3.7-3.6 0-2-1.4-3.4-3.3-3.4-.4 0-.8 0-1 .1.3-1.6 1.6-3.1 3.4-4L9.5 5Zm9 0c-3 1.6-4.9 4.3-4.9 7.7 0 3 1.7 5 4.1 5 2.1 0 3.7-1.5 3.7-3.6 0-2-1.4-3.4-3.3-3.4-.4 0-.8 0-1 .1.3-1.6 1.6-3.1 3.4-4L18.5 5Z" />
    </svg>
  );
}
