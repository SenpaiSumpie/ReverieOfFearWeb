export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl text-[color:var(--rof-off)] [filter:var(--glow)]">Style Guide</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {["rof-red","rof-cyan","rof-teal","rof-ink","rof-amber","rof-off"].map((token) => (
          <div key={token} className="rounded-lg border border-white/10 p-4">
            <div className={`h-12 w-full rounded bg-[color:var(--${token})]`} />
            <div className="mt-2 text-xs text-[color:var(--rof-off)]/70">--{token}</div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="font-display text-xl text-[color:var(--rof-off)]">Typography</h2>
        <p className="mt-2 font-display text-3xl">Display — Bebas Neue</p>
        <p className="mt-1 font-sans">Body — Inter</p>
        <p className="mt-1 font-mono text-sm">Mono — JetBrains Mono</p>
      </div>
      <div className="mt-8">
        <h2 className="font-display text-xl text-[color:var(--rof-off)]">Buttons</h2>
        <div className="mt-3 flex gap-3">
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-black bg-[color:var(--rof-red)]">Primary</button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-[color:var(--rof-cyan)] border border-[color:var(--rof-cyan)]/60">Secondary</button>
        </div>
      </div>
    </main>
  );
}

