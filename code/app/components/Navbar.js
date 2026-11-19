
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  {
    name: "Features",
    href: "#features",
    icon: (
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
    ),
  },
  {
    name: "Methodology",
    href: "#methodology",
    icon: (
      <>
        <path d="M4 5h6v6H4zM14 13h6v6h-6z" />
        <path d="M14 5h6M17 5v4M7 11v4h7" />
      </>
    ),
  },
  {
    name: "About",
    href: "#about",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
  },
];

function Icon({ children, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

const buttonIcon = (
  <>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-4 4" />
  </>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">

        {/* Main Navbar */}
        <motion.div
          whileHover={{
            borderColor: "rgba(167, 139, 250, 0.4)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.3), 0 0 25px rgba(139,92,246,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.3 }}
          className="group/nav relative flex items-center justify-between overflow-hidden rounded-2xl border border-[rgba(167,139,250,0.25)] bg-[var(--background)]/60 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.25),0_0_22px_rgba(139,92,246,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:px-7"
        >

          {/* Glass shine */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-1000 group-hover/nav:translate-x-full" />

          {/* Brand */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            className="relative z-10 text-xl font-bold tracking-tight text-[var(--foreground)] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          >
            <span className="text-[var(--primary)]">DEV</span>STATIS
          </motion.a>

          {/* Desktop Navigation */}
          <div className="relative z-10 hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
className="group/link flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[var(--muted)] transition-all duration-300 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.12)]"              >
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.15 }}
                  className="text-[var(--secondary)] transition-all duration-300 group-hover/link:drop-shadow-[0_0_7px_var(--primary)]"
                >
                  <Icon>{link.icon}</Icon>
                </motion.span>

                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Analyze Profile CTA */}
          <motion.a
            href="#analyze"
            whileHover={{ scale: 1.045, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group/cta relative z-10 hidden items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-[0_0_28px_rgba(139,92,246,0.42)] md:flex"
          >
            {/* CTA light sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />

            <Icon size={17}>{buttonIcon}</Icon>
            <span className="relative">Analyze Profile</span>
          </motion.a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="relative z-10 rounded-lg border border-[var(--border)] p-2 text-[var(--foreground)] transition-all duration-300 hover:border-[var(--primary)] hover:bg-white/[0.06] md:hidden"
          >
            <div className="flex h-5 w-5 flex-col justify-center gap-[5px]">
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: 45, y: 3.5 }
                    : { rotate: 0, y: 0 }
                }
                className="h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: -3.5 }
                    : { rotate: 0, y: 0 }
                }
                className="h-0.5 w-5 rounded-full bg-current"
              />
            </div>
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]/85 p-5 shadow-xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-3">

                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setMenuOpen(false)}
className="group/mobile flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--muted)] transition-all duration-300 hover:bg-white/[0.05] hover:text-white"                  >
                    <span className="text-[var(--secondary)] transition-transform duration-300 group-hover/mobile:scale-110">
                      <Icon>{link.icon}</Icon>
                    </span>
                    {link.name}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <motion.a
                  href="#analyze"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMenuOpen(false)}
                  className="group/mobile-cta relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-[0_0_28px_rgba(139,92,246,0.42)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/mobile-cta:translate-x-full" />

                  <Icon size={17}>{buttonIcon}</Icon>
                  <span className="relative">Analyze Profile</span>
                </motion.a>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  );
}
