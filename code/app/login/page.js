import Link from "next/link";
import { redirect } from "next/navigation";
import Brand from "@/app/components/Brand";
import {
  AlertIcon,
  ArrowLeft,
  ArrowRight,
  BarChartIcon,
  GithubIcon,
  ShieldIcon,
  SparklesIcon,
} from "@/app/components/icons";
import { getSession } from "@/lib/session";
import { safeNextPath } from "@/lib/redirect";

export const metadata = {
  title: "Sign in",
  description: "Sign in to DEVSTATIS with GitHub.",
};

const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
).replace(/\/+$/, "");
const CALLBACK_URL = `${APP_ORIGIN}/api/auth/github/callback`;

const ERROR_MESSAGES = {
  access_denied: "GitHub sign-in was cancelled.",
  invalid_state: "Your sign-in link expired. Please try again.",
  oauth_failed:
    "GitHub sign-in could not be completed. Check the GitHub App client ID, client secret, and callback URL, then try again.",
  not_configured:
    "GitHub sign-in is not configured yet. Add your OAuth client ID and secret to continue.",
};

const REASON_MESSAGES = {
  redirect_uri_mismatch: `GitHub rejected the callback URL. Set the GitHub App callback URL to exactly ${CALLBACK_URL}, then try again.`,
  incorrect_client_credentials:
    "GitHub rejected the client credentials. Check GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env.local.",
  bad_verification_code:
    "The GitHub sign-in code expired or was already used. Start the sign-in again.",
  token_exchange_failed:
    "GitHub did not return an access token. Check the GitHub App settings and try again.",
  user_fetch_failed:
    "GitHub accepted the sign-in but the profile request failed. Try again in a moment.",
  no_profile:
    "GitHub did not return a profile for this account. Try signing in again.",
  invalid_state:
    "Your sign-in link expired. Make sure cookies are enabled, then try again.",
  not_configured:
    "GitHub sign-in is not configured. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to .env.local.",
  oauth_failed:
    "GitHub sign-in could not be completed. Check the GitHub App settings and try again.",
};

const benefits = [
  {
    icon: ShieldIcon,
    title: "Public data only",
    description: "We read your public profile and repositories. No write access.",
  },
  {
    icon: BarChartIcon,
    title: "Evidence-based scoring",
    description: "Six categories blended from objective signals and AI review.",
  },
  {
    icon: SparklesIcon,
    title: "Insights you can use",
    description: "Strengths, blind spots, and concrete next steps.",
  },
];

export default async function LoginPage({ searchParams }) {
  const user = await getSession();
  const params = (await searchParams) || {};
  const next = safeNextPath(params.next);

  if (user) {
    redirect(next);
  }

  const error = REASON_MESSAGES[params.reason] || ERROR_MESSAGES[params.error];
  const oauthHref = `/api/auth/github?next=${encodeURIComponent(next)}`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-14">
          <Brand />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[130px]" />
          <div className="absolute -right-24 top-1/3 h-[420px] w-[280px] rotate-[28deg] bg-gradient-to-b from-primary/[0.08] to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1040px] px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-card/50 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-11">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.08] blur-3xl"
                />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                    GitHub Profile Intelligence
                  </span>

                  <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl">
                    Your code has a story.
                    <br />
                    <span className="text-primary">See it clearly.</span>
                  </h1>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                    Sign in to analyze your public GitHub footprint with
                    evidence-based scoring and AI-written insights built for
                    developers.
                  </p>

                  <ul className="mt-7 space-y-4">
                    {benefits.map((benefit) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <li key={benefit.title} className="flex items-start gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.07] text-primary">
                            <BenefitIcon size={17} />
                          </span>
                          <div>
                            <p className="text-[13px] font-semibold text-foreground">
                              {benefit.title}
                            </p>
                            <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">
                              {benefit.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="relative mt-8 rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-subtle">
                      Sample report
                    </span>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                      A+
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-4">
                    <div className="text-4xl font-bold leading-none text-primary">
                      92
                      <span className="ml-0.5 text-[11px] font-medium text-subtle">
                        /100
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[
                        ["Documentation", 88],
                        ["Repository quality", 94],
                      ].map(([label, score]) => (
                        <div key={label}>
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-muted">{label}</span>
                            <span className="text-foreground">{score}</span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-[#86efac]"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-surface/40 p-7 sm:p-9 lg:p-11">
                <div className="mx-auto max-w-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <GithubIcon size={24} />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold tracking-[-0.01em] text-foreground">
                    Welcome to DEVSTATIS
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Sign in with GitHub to analyze your profile in one click and
                    keep your reports together.
                  </p>

                  {error && (
                    <div
                      role="alert"
                      className="mt-5 flex items-start gap-2.5 rounded-xl border border-danger/25 bg-danger/[0.08] p-3 text-[11.5px] leading-relaxed text-danger"
                    >
                      <AlertIcon size={15} className="mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <a
                    href={oauthHref}
                    className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_28px_var(--glow)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_38px_rgba(180,244,62,0.4)]"
                  >
                    <GithubIcon size={18} />
                    Continue with GitHub
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>

                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    <span className="text-[9px] uppercase tracking-[0.22em] text-subtle">
                      or
                    </span>
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <Link
                    href="/analyze"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
                  >
                    Analyze a public profile
                  </Link>

                  <p className="mt-6 text-[11px] leading-relaxed text-subtle">
                    By continuing you agree to have your public GitHub profile
                    analyzed. We never request write access to your
                    repositories.
                  </p>

                  <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-[11px] leading-relaxed text-muted">
                    <ShieldIcon size={15} className="mt-0.5 text-primary" />
                    <span>
                      Your session is secured with a signed, http-only cookie.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
