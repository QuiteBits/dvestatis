"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ShareIcon } from "../icons";

export default function CopyButton({ className = "", label = "Copy link" }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-semibold text-muted transition-colors hover:border-white/25 hover:text-foreground ${className}`}
    >
      {copied ? (
        <CheckIcon size={14} className="text-primary" />
      ) : (
        <ShareIcon size={14} />
      )}
      {copied ? "Link copied" : label}
    </button>
  );
}
