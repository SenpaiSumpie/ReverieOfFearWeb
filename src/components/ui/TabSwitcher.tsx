"use client";

import * as React from "react";

export type Tab = {
  id: string;
  label: string;
};

export type TabSwitcherProps = {
  tabs: Tab[];
  initialId?: string;
  onChange?: (id: string) => void;
};

export default function TabSwitcher({ tabs, initialId, onChange }: TabSwitcherProps) {
  const [current, setCurrent] = React.useState<string>(initialId ?? tabs[0]?.id);

  React.useEffect(() => {
    if (initialId && initialId !== current) setCurrent(initialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  function select(id: string) {
    setCurrent(id);
    onChange?.(id);
  }

  return (
    <div>
      <div role="tablist" aria-label="Sections" className="flex gap-2 border-b border-white/10">
        {tabs.map((t) => {
          const active = t.id === current;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => select(t.id)}
              className={
                "px-3 py-2 text-sm transition border-b-2 -mb-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rof-cyan)] " +
                (active
                  ? "border-[color:var(--rof-cyan)] text-[color:var(--rof-off)]"
                  : "border-transparent text-[color:var(--rof-off)]/70 hover:text-[color:var(--rof-off)]")
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {/* Consumers can conditionally render content based on current via onChange or by cloning children; keep minimal here */}
    </div>
  );
}

