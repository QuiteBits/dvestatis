"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChartIcon,
  ClockIcon,
  FolderIcon,
  GithubIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  XIcon,
} from "./icons";

const RECENT_KEY = "devstatis:recent-reports";
const RECENT_EVENT = "devstatis:recent-updated";
const USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

const highlights = [
  {
    icon: ChartIcon,
    title: "Six-category score",
    description:
      "Repositories, docs, tech range, activity, community, and profile.",
  },
  {
    icon: SparklesIcon,
    title: "AI-written review",
    description:
      "A qualitative summary backed by the public evidence in your profile.",
  },
  {
    icon: FolderIcon,
    title: "Repository intelligence",
    description:
      "Language mix, stars, forks, documentation, and recent activity.",
  },
  {
    icon: TargetIcon,
    title: "Actionable next steps",
    description:
      "Specific strengths, gaps, and improvements you can act on.",
  },
];

function normalizeUsername(value) {
  let username = value.trim();
  username = username.replace(/^@/, "");
  username = username.replace(/^https?:\/\/(www\.)?github\.com\//i, "");
  username = username.split(/[/?#]/)[0];

  return username;
}

function parseRecent(raw) {
  try {
    const stored = JSON.parse(raw || "[]");

    if (!Array.isArray(stored)) return [];

    return stored
      .filter((item) => typeof item === "string" && USERNAME_PATTERN.test(item))
      .slice(0, 6);
  } catch {
    return [];
  }
}

function subscribeRecent(callback) {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(RECENT_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(RECENT_EVENT, handler);
  };
}

function getRecentSnapshot() {
  try {
    return localStorage.getItem(RECENT_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function getServerRecentSnapshot() {
  return "[]";
}

function saveRecent(entries) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event(RECENT_EVENT));
  } catch {
    return;
  }
}

export default function AnalyzeClient({ user = null }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [username, setUsername] = useState(user?.login || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const recentRaw = useSyncExternalStore(
    subscribeRecent,
    getRecentSnapshot,
    getServerRecentSnapshot
  );
  const recent = useMemo(() => parseRecent(recentRaw), [recentRaw]);

  useEffect(() => {
    if (!submitting) return;

    const timeout = setTimeout(() => setSubmitting(false), 4000);

    return () => clearTimeout(timeout);
  }, [submitting]);

  function remember(name) {
    const current = parseRecent(getRecentSnapshot());
    const next = [
      name,
      ...current.filter((item) => item.toLowerCase() !== name.toLowerCase()),
    ].slice(0, 6);

    saveRecent(next);
  }

  function clearRecent() {
    saveRecent([]);
  }

  function useMyProfile() {
    if (!user?.login) return;

    setUsername(user.login);
    setError("");
    inputRef.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const clean = normalizeUsername(username);

    if (!clean) {
      setError("Enter a GitHub username to analyze.");
      inputRef.current?.focus();
      return;
    }

    if (!USERNAME_PATTERN.test(clean)) {
      setError(
        "That doesn't look like a GitHub username. Use letters, numbers, and hyphens."
      );
      inputRef.current?.focus();
      return;
    }

    setError("");
    setSubmitting(true);
    remember(clean);
    router.push(`/results/${clean}`);
  }

  return (
    <div className="relative mx-auto max-w-[1120px] px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
          Profile Analyzer
        </span>

        <h1 className="mt-6 text-[2.35rem] font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl">
          Turn a GitHub profile into a{" "}
          <span className="text-primary">clear report.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Enter any public GitHub username. We review repositories,
          documentation, languages, and recent activity, then combine objective
          signals with an AI review.
        </p>
      </motion.div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-start justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-3.5 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt=""
                width={38}
                height={38}
                className="h-[38px] w-[38px] rounded-full border border-white/10 object-cover"
              />
            ) : (
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-primary/15 text-sm font-bold uppercase text-primary">
                {user.login.slice(0, 1)}
              </span>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Signed in as @{user.login}
              </p>
              <p className="text-[11px] text-muted">
                Your username is ready to analyze.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={useMyProfile}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/15 sm:w-auto"
          >
            Use my profile
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-2xl"
      >
        <div className="rounded-2xl border border-white/10 bg-card/70 p-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur transition-colors focus-within:border-primary/35">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label
              htmlFor="github-username"
              className="flex h-14 min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-black/25 px-4"
            >
              <GithubIcon size={18} className="text-muted" />
              <span className="hidden shrink-0 text-xs text-subtle sm:inline">
                github.com/
              </span>
              <input
                ref={inputRef}
                id="github-username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  if (error) setError("");
                }}
                placeholder="torvalds"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={120}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "username-error" : undefined}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_var(--glow)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_34px_rgba(180,244,62,0.35)] disabled:cursor-wait disabled:opacity-80"
            >
              <SearchIcon size={16} />
              {submitting ? "Opening report…" : "Analyze profile"}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-subtle">
          Works with any public GitHub account. No login required.
          {!user && (
            <>
              {" "}
              <Link
                href="/login?next=/analyze"
                className="font-medium text-primary/90 underline-offset-2 hover:underline"
              >
                Sign in to prefill your profile
              </Link>
              .
            </>
          )}
        </p>

        {error && (
          <p
            id="username-error"
            role="alert"
            className="mt-3 text-center text-[12px] text-danger"
          >
            {error}
          </p>
        )}

        {recent.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-subtle">
              Recent
            </span>
            {recent.map((name) => (
              <Link
                key={name}
                href={`/results/${name}`}
                onClick={() => remember(name)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary"
              >
                @{name}
              </Link>
            ))}
            <button
              type="button"
              onClick={clearRecent}
              aria-label="Clear recent reports"
              className="rounded-full p-1 text-subtle transition-colors hover:text-foreground"
            >
              <XIcon size={13} />
            </button>
          </div>
        )}
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-14 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {highlights.map((highlight) => {
          const HighlightIcon = highlight.icon;

          return (
            <div
              key={highlight.title}
              className="rounded-xl border border-white/[0.07] bg-card/50 p-4 transition-colors hover:border-primary/25 hover:bg-card"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.07] text-primary">
                <HighlightIcon size={18} />
              </span>
              <p className="mt-3.5 text-[13px] font-semibold text-foreground">
                {highlight.title}
              </p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
                {highlight.description}
              </p>
            </div>
          );
        })}
      </motion.div>

      <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
        <span className="mt-0.5 text-primary">
          <ClockIcon size={16} />
        </span>
        <p className="text-[11.5px] leading-relaxed text-muted">
          Analysis runs live against GitHub and usually takes 30–60 seconds.
          We only read public profile data — never your private repositories or
          write permissions.
        </p>
      </div>
    </div>
  );
}
