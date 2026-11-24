"use client";

import { useEffect, useState } from "react";
import { scoreTone } from "@/lib/format";

export default function ScoreRing({
  score,
  size = 196,
  strokeWidth = 8,
  children,
}) {
  const hasScore = typeof score === "number" && Number.isFinite(score);
  const numericScore = hasScore
    ? Math.max(0, Math.min(100, score))
    : 0;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(numericScore), 180);

    return () => clearTimeout(timeout);
  }, [numericScore]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const tone = scoreTone(hasScore ? numericScore : NaN);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Overall score: ${
        hasScore ? numericScore : "not available"
      } out of 100`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={tone.text}
          style={{
            transition:
              "stroke-dashoffset 1.25s cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "drop-shadow(0 0 7px currentColor)",
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
