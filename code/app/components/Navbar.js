"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Brand from "./Brand";
import {
  ArrowRight,
  ChartIcon,
  ChevronDown,
  ExternalLinkIcon,
  GithubIcon,
  LogOutIcon,
} from "./icons";

const links = [
  { name: "Product", href: "/#product", chevron: true },
  { name: "Features", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
];

function Avatar({ user, size = 32, className = "" }) {
  if (user?.avatar) {
    return (
      <Image
        src={user.avatar}
        alt=""
        width={size}
        height={size}
        className={`rounded-full border border-white/10 object-cover ${className}`}
      />
    );
  }

  return (
    <span
      className={`flex items-center justify-center rounded-full bg-primary/15 text-xs font-bold uppercase text-primary ${className}`}
      style={{ width: size, height: size }}
    >
      {user?.login?.slice(0, 1) || "?"}
    </span>
  );
}

export default function Navbar({ user = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-14">
        <Brand />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.name}
              {link.chevron && (
                <ChevronDown
                  size={13}
                  className="text-subtle transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-muted"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="DEVSTATIS on GitHub"
            className="text-muted transition-colors duration-200 hover:text-foreground"
          >
            <GithubIcon size={20} />
          </a>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <Avatar user={user} size={28} />
                <span className="max-w-[120px] truncate text-[13px] font-medium text-foreground">
                  @{user.login}
                </span>
                <ChevronDown
                  size={13}
                  className={`text-muted transition-transform duration-200 ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <>
                    <button
                      type="button"
                      aria-hidden="true"
                      tabIndex={-1}
                      onClick={() => setAccountOpen(false)}
                      className="fixed inset-0 z-40 cursor-default"
                    />
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0f] p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]"
                    >
                      <div className="flex items-center gap-3 rounded-xl px-3 py-3">
                        <Avatar user={user} size={36} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {user.name}
                          </p>
                          <p className="truncate text-[11px] text-muted">
                            @{user.login}
                          </p>
                        </div>
                      </div>

                      <div className="my-1 h-px bg-white/[0.06]" />

                      <Link
                        href={`/results/${user.login}`}
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
                      >
                        <ChartIcon size={15} />
                        My report
                      </Link>
                      <Link
                        href="/analyze"
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
                      >
                        <ArrowRight size={15} />
                        Analyze a profile
                      </Link>
                      <a
                        href={user.url}
                        target="_blank"
                        rel="noreferrer"
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
                      >
                        <ExternalLinkIcon size={15} />
                        GitHub profile
                      </a>

                      <div className="my-1 h-px bg-white/[0.06]" />

                      <form action="/api/auth/logout" method="post">
                        <button
                          type="submit"
                          role="menuitem"
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-danger/90 transition-colors hover:bg-danger/[0.08] hover:text-danger"
                        >
                          <LogOutIcon size={15} />
                          Sign out
                        </button>
                      </form>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login?next=/analyze"
                className="px-1 py-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/analyze"
                className="group/cta inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[0_0_24px_var(--glow)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_34px_rgba(180,244,62,0.35)]"
              >
                Get started
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="rounded-lg p-2 text-foreground transition-colors duration-200 hover:bg-white/[0.04] md:hidden"
        >
          <div className="flex h-4 w-5 flex-col justify-center gap-[5px]">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={
                menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="h-0.5 w-5 rounded-full bg-current"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col px-6 pb-6 pt-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/[0.06] py-3.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {link.name}
                  {link.chevron && (
                    <ChevronDown size={14} className="text-subtle" />
                  )}
                </Link>
              ))}

              {user ? (
                <div className="mt-5">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                    <Avatar user={user} size={40} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-muted">
                        @{user.login}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/results/${user.login}`}
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground"
                    >
                      <ChartIcon size={15} />
                      My report
                    </Link>
                    <form action="/api/auth/logout" method="post">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-[13px] font-semibold text-muted transition-colors hover:text-foreground"
                      >
                        <LogOutIcon size={15} />
                        Sign out
                      </button>
                    </form>
                  </div>

                  <Link
                    href="/analyze"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
                  >
                    Analyze a profile
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/login?next=/analyze"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/25"
                  >
                    <GithubIcon size={17} />
                    Sign in with GitHub
                  </Link>
                  <Link
                    href="/analyze"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Get started
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
