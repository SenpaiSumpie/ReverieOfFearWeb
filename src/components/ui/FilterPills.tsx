"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterOption = { value: string; label?: string };

export type FilterPillsProps = {
  title: string;
  param: string; // query param key
  options: FilterOption[];
  multi?: boolean; // default true
};

function useQueryArray(param: string): [string[], (next: string[]) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = React.useMemo(() => {
    const raw = searchParams.get(param);
    if (!raw) return [];
    return raw.split(",").filter(Boolean);
  }, [searchParams, param]);

  const setSelected = React.useCallback(
    (next: string[]) => {
      const sp = new URLSearchParams(searchParams.toString());
      if (next.length) {
        sp.set(param, Array.from(new Set(next)).join(","));
      } else {
        sp.delete(param);
      }
      router.push(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, param]
  );

  return [selected, setSelected];
}

export default function FilterPills({ title, param, options, multi = true }: FilterPillsProps) {
  const [selected, setSelected] = useQueryArray(param);

  function toggle(value: string) {
    if (multi) {
      setSelected(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
    } else {
      setSelected(selected.includes(value) ? [] : [value]);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] tracking-widest uppercase text-[color:var(--rof-off)]/60">
        {title}
      </span>
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={
              "px-3 py-1.5 rounded-full border text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rof-cyan)] " +
              (active
                ? "border-[color:var(--rof-cyan)] text-[color:var(--rof-off)]"
                : "border-white/15 text-[color:var(--rof-off)]/80 hover:text-[color:var(--rof-off)] hover:border-white/30")
            }
            aria-pressed={active}
          >
            {opt.label ?? opt.value}
          </button>
        );
      })}
      {selected.length > 0 && (
        <button
          onClick={() => setSelected([])}
          className="ml-2 text-xs text-[color:var(--rof-off)]/60 hover:text-[color:var(--rof-off)]"
        >
          Clear
        </button>
      )}
    </div>
  );
}

