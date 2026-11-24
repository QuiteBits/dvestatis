import Link from "next/link";
import Brand from "./Brand";
import { GithubIcon } from "./icons";

const links = [
  { name: "Product", href: "/#product" },
  { name: "Features", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1440px] px-6 py-6 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <Brand />
            <p className="text-[11px] text-subtle">
              GitHub Profile Analytics &amp; Developer Intelligence.
            </p>
          </div>

          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-[11px] text-subtle">
              © {new Date().getFullYear()} DEVSTATIS. All rights reserved.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="DEVSTATIS on GitHub"
              className="text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
