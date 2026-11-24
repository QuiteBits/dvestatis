import Image from "next/image";
import {
  BuildingIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkIcon,
  MapPinIcon,
  UsersIcon,
} from "../icons";
import { formatDate, formatNumber } from "@/lib/format";
import CopyButton from "./CopyButton";

export default function ProfileHeader({ profile }) {
  if (!profile) return null;

  const displayName = profile.name || `@${profile.username}`;
  const blog = profile.blog
    ? /^https?:\/\//i.test(profile.blog)
      ? profile.blog
      : `https://${profile.blog}`
    : null;
  const blogLabel = profile.blog?.replace(/^https?:\/\//i, "");

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 -top-16 h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative shrink-0">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={`${displayName} avatar`}
                width={88}
                height={88}
                priority
                className="h-[72px] w-[72px] rounded-2xl border border-white/10 object-cover shadow-[0_0_30px_rgba(180,244,62,0.08)] sm:h-[88px] sm:w-[88px]"
              />
            ) : (
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-primary/10 text-2xl font-bold uppercase text-primary sm:h-[88px] sm:w-[88px]">
                {profile.username?.slice(0, 1)}
              </span>
            )}
            <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground">
              <GithubIcon size={12} />
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-primary">
              Developer report
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                {displayName}
              </h1>
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-muted transition-colors hover:text-primary"
              >
                @{profile.username}
                <ExternalLinkIcon size={11} />
              </a>
            </div>

            {profile.bio && (
              <p className="mt-2.5 max-w-2xl text-[12.5px] leading-relaxed text-muted">
                {profile.bio}
              </p>
            )}

            <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-subtle">
              {profile.company && (
                <span className="flex items-center gap-1.5">
                  <BuildingIcon size={12} />
                  {profile.company}
                </span>
              )}
              {profile.location && (
                <span className="flex items-center gap-1.5">
                  <MapPinIcon size={12} />
                  {profile.location}
                </span>
              )}
              {blog && (
                <a
                  href={blog}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <LinkIcon size={12} />
                  {blogLabel}
                </a>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarIcon size={12} />
                Joined {formatDate(profile.createdAt)}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-4 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <UsersIcon size={12} className="text-subtle" />
                <strong className="font-semibold text-foreground">
                  {formatNumber(profile.followers)}
                </strong>
                followers
              </span>
              <span className="flex items-center gap-1.5">
                <strong className="font-semibold text-foreground">
                  {formatNumber(profile.following)}
                </strong>
                following
              </span>
              <span className="flex items-center gap-1.5">
                <strong className="font-semibold text-foreground">
                  {formatNumber(profile.publicRepos)}
                </strong>
                public repos
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 max-lg:flex-row lg:flex-col lg:items-stretch">
          <CopyButton />
          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground shadow-[0_0_20px_var(--glow)] transition-all duration-300 hover:bg-primary-hover"
          >
            View on GitHub
            <ExternalLinkIcon size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
