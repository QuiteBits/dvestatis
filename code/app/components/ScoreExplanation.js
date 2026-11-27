"use client";

import { useState } from "react";
import { ShieldIcon } from "./icons";
import Link from "next/link";

const CATEGORIES = {
  repositoryQuality: {
    label: "Repository Quality",
    weight: 30,
    description:
      "Original project depth, descriptions, topics, and licensing. " +
      "Assesses the quality and completeness of repositories.",
  },
  documentationQuality: {
    label: "Documentation Quality",
    weight: 20,
    description:
      "README clarity, structure, setup instructions, and usefulness. " +
      "Evaluates how well documentation guides users and contributors.",
  },
  techDiversity: {
    label: "Tech Diversity",
    weight: 15,
    description:
      "Breadth and balance of programming languages across original work. " +
      "Measures diversity using Shannon entropy normalization.",
  },
  developmentActivity: {
    label: "Development Activity",
    weight: 15,
    description:
      "Commit recency, frequency, and consistency across recent work. " +
      "Based on commit activity in the last 365 days.",
  },
  communityEngagement: {
    label: "Community Engagement",
    weight: 10,
    description:
      "Visibility signals including stars, forks, and followers. " +
      "Note: This is a visibility metric, not a measurement of programming skill.",
  },
  profileCompleteness: {
    label: "Profile Completeness",
    weight: 10,
    description:
      "How clearly the profile communicates identity, work, and links. " +
      "Based on filled fields: name, bio, company, location, blog.",
  },
};

const SCORE_RANGES = {
  excellent: { min: 90, label: "Excellent", description: "Outstanding public profile with strong evidence across multiple categories." },
  good: { min: 75, label: "Good", description: "Solid profile with good evidence and reasonable scores across categories." },
  average: { min: 60, label: "Average", description: "Moderate profile with some evidence but room for improvement." },
  below: { min: 0, label: "Below Average", description: "Profile with limited public evidence or lower scores in key categories." },
};

export function getScoreRange(score) {
  if (score >= SCORE_RANGES.excellent.min) return SCORE_RANGES.excellent;
  if (score >= SCORE_RANGES.good.min) return SCORE_RANGES.good;
  if (score >= SCORE_RANGES.average.min) return SCORE_RANGES.average;
  return SCORE_RANGES.below;
}

export default function ScoreExplanation({ score }) {
  const range = getScoreRange(score);

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-5">
        <ShieldIcon size={18} className="text-primary" />
        <h2 className="flex-1 text-lg font-semibold tracking-[-0.01em] text-foreground">
          How DEVSTATIs scoring works
        </h2>
      </div>

      <div className="space-y-4">

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
          <h3 className="font-semibold tracking-[-0.01em] text-foreground">
            Score breakdown
          </h3>
          <p className="mt-1 text-[11px] text-muted">
            The overall score is a weighted average across 6 categories, blended from
            objective signals and optional AI review.
          </p>
          <div className="mt-3 space-y-2">
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <div key={key} className="flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-subtle">
                <span>{category.label}</span>
                <span>{category.weight}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
          <h3 className="font-semibold tracking-[-0.01em] text-foreground">
            Score ranges
          </h3>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className={`
              rounded px-2.5 py-1.5 text-[9px] font-medium ${score !== null && score >= 90 ? "bg-primary/20 text-primary" : "text-muted"}
            `}>
              90+
            </div>
            <div className={`
              rounded px-2.5 py-1.5 text-[9px] font-medium ${score !== null && score >= 75 ? "bg-primary/20 text-primary" : "text-muted"}
            `}>
              75-89
            </div>
            <div className={`
              rounded px-2.5 py-1.5 text-[9px] font-medium ${score !== null && score >= 60 ? "bg-primary/20 text-primary" : "text-muted"}
            `}>
              60-74
            </div>
            <div className={`
              rounded px-2.5 py-1.5 text-[9px] font-medium ${score !== null && score >= 0 ? "bg-primary/20 text-primary" : "text-muted"}
            `}>
              0-59
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
          <h3 className="font-semibold tracking-[-0.01em] text-foreground">
            How individual factors influence your score
          </h3>
          <p className="mt-1 text-[11px] text-muted">
            Each category contributes its weighted percentage to the final score. The
            six categories and their weights are:
          </p>
          <ul className="mt-3 space-y-1 text-[10px] leading-relaxed text-muted">
            <li>
              <span className="font-medium">Repository Quality</span> (30%) –
              Descriptions, topics, and license presence across original repositories
            </li>
            <li>
              <span className="font-medium">Documentation Quality</span> (20%) –
              README clarity, structure, setup instructions, and usefulness
            </li>
            <li>
              <span className="font-medium">Tech Diversity</span> (15%) –
              Breadth and balance of programming languages used
            </li>
            <li>
              <span className="font-medium">Development Activity</span> (15%) –
              Commit recency, frequency, and consistency in the last year
            </li>
            <li>
              <span className="font-medium">Community Engagement</span> (10%) –
              Stars, forks, and followers (visibility signals, not ability metrics)
            </li>
            <li>
              <span className="font-medium">Profile Completeness</span> (10%) –
              Filled profile fields: name, bio, company, location, blog
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
          <h3 className="font-semibold tracking-[-0.01em] text-foreground">
            Limitations of GitHub-based analytics
          </h3>
          <ul className="mt-3 space-y-2 text-[10px] leading-relaxed text-muted">
            <li>
              GitHub activity does not capture all aspects of programming ability,
              such as pair programming, code reviews, or software used outside
              GitHub.
            </li>
            <li>
              Metrics like stars and forks reflect popularity and visibility, not
              technical competence or code quality.
            </li>
            <li>
              README content is self-reported and may not accurately reflect
              actual documentation quality or practices.
            </li>
            <li>
              Commit frequency does not distinguish between meaningful contributions
              and trivial changes.
            </li>
            <li>
              The analysis only examines public data; private contributions,
              professional experience, or formal credentials are not considered.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
          <h3 className="font-semibold tracking-[-0.01em] text-foreground">
            Important disclaimer
          </h3>
          <p className="mt-2 text-[11px] leading-relaxed text-danger">
            <strong>
              The DEVSTATIs score is an analytical estimate based on public GitHub
              evidence, NOT a definitive measurement of someone's programming
              ability, intelligence, or professional competence.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}