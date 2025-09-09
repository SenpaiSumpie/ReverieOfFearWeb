"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/sets", label: "Sets" },
  { href: "/characters", label: "Characters" },
  { href: "/slashers", label: "Slashers" },
  { href: "/media", label: "Media" },
  { href: "/roadmap", label: "Roadmap" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-[color:rgb(11_14_20/.6)]">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide text-[color:var(--rof-off)] [filter:var(--glow)]">
          REVERIE <span className="text-[color:var(--rof-red)]">OF</span> FEAR
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "relative text-sm text-[color:var(--rof-off)]/80 hover:text-[color:var(--rof-off)] transition-colors" +
                  (active ? " after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-[color:var(--rof-cyan)]" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

