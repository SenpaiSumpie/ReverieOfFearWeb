export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[color:rgb(11_14_20/.6)]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-[color:var(--rof-off)]/70 text-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p>
            <span className="font-display tracking-wide text-[color:var(--rof-off)]">Reverie of Fear</span> — Save the living. Unmask the target. Outlast the night.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[color:var(--rof-off)]">Newsletter</a>
            <a href="#" className="hover:text-[color:var(--rof-off)]">Discord</a>
            <a href="#" className="hover:text-[color:var(--rof-off)]">Twitter</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-[color:var(--rof-off)]/50">© {new Date().getFullYear()} Reverie of Fear. All rights reserved.</div>
      </div>
    </footer>
  );
}

