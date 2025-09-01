"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <header className="header" role="banner" aria-label="Primary">
        <div className="container header-row">
          <Link href="/" className="brand" aria-label="AI Tools Hub (Home)">
            <Sparkles size={18} style={{ marginRight: 8, verticalAlign: -3 }} />
            AI Workflow Toolkit
          </Link>
          <nav className="nav" role="navigation" aria-label="Main">
            {links.map((l) => {
              const active =
                pathname === l.href ||
                (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={active ? "is-active" : ""}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main" className="container main" role="main">
        {children}
      </main>

      <footer className="footer" role="contentinfo">
        <div className="container">
          Built with Next.js · Turborepo ·{" "}
          <a
            className="link"
            href="https://github.com/mattc-27/aiworkflowtoolkit"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          ·{" "}
          <a className="link" href="mattc927.dev@gmail.com">
            Contact
          </a>
        </div>
      </footer>
    </>
  );
}
