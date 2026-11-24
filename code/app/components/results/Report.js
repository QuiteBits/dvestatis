import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldIcon } from "../icons";
import ActivityCard from "./ActivityCard";
import CategoryGrid from "./CategoryGrid";
import InsightSection from "./InsightSection";
import LanguageCard from "./LanguageCard";
import MethodCard from "./MethodCard";
import ProfileHeader from "./ProfileHeader";
import RepositoryList from "./RepositoryList";
import ScorePanel from "./ScorePanel";
import StatsStrip from "./StatsStrip";

export default function Report({ data }) {
  const username = data.profile.username;

  return (
    <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 text-[12px] font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Analyze another profile
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[10px] text-subtle">
          <ShieldIcon size={11} className="text-primary/80" />
          Based on public GitHub data
        </span>
      </div>

      <div className="mt-4">
        <ProfileHeader profile={data.profile} />
      </div>

      <div className="mt-4">
        <StatsStrip profile={data.profile} statistics={data.statistics} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(290px,1fr)]">
        <div className="min-w-0 space-y-5">
          <ScorePanel data={data} />
          <CategoryGrid data={data} />
          <InsightSection
            insights={data.insights}
            aiAvailable={data.aiAvailable !== false}
          />
          <RepositoryList
            username={username}
            repositories={data.repositories}
          />
        </div>

        <aside className="min-w-0 space-y-5">
          <ActivityCard activity={data.activity} />
          <LanguageCard languages={data.statistics?.languages || []} />
          <MethodCard
            scoringMethod={data.scoringMethod}
            coverage={data.coverage}
          />
        </aside>
      </div>

      <section className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/[0.08] via-primary/[0.03] to-transparent p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Compare another developer
          </h2>
          <p className="mt-1 text-[12px] text-muted">
            Generate a fresh report for any public GitHub profile.
          </p>
        </div>
        <Link
          href="/analyze"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[12px] font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-hover"
        >
          Analyze a profile
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </section>

      <p className="mx-auto mt-6 max-w-3xl text-center text-[10.5px] leading-relaxed text-subtle">
        DEVSTATIS reports are generated from public GitHub evidence and model
        review. Scores may vary as profiles change and are not an official
        assessment of technical ability.
      </p>
    </div>
  );
}
