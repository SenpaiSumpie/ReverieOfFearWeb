import Link from 'next/link';
import { getSets } from '@/lib/content/loaders';
import FilterPills from '@/components/ui/FilterPills';

export default function SetsPage({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const sets = getSets();
	const getArr = (v: unknown) =>
		typeof v === 'string'
			? v.split(',').filter(Boolean)
			: Array.isArray(v)
			? v.flatMap((x) => (typeof x === 'string' ? x.split(',') : []))
			: [];
	const selectedDifficulty = getArr(searchParams?.difficulty);
	const selectedTheme = getArr(searchParams?.theme);

	const themeOptions = Array.from(new Set(sets.flatMap((s) => s.theme ?? []))).map((t) => ({
		value: String(t),
		label: String(t),
	}));
	const difficultyOptions = Array.from(
		new Set(sets.map((s) => s.difficulty).filter(Boolean))
	).map((d) => ({ value: String(d), label: String(d) }));

	const filteredSets = sets.filter((s) => {
		const passDiff = selectedDifficulty.length
			? selectedDifficulty.includes(String(s.difficulty))
			: true;
		const passTheme = selectedTheme.length
			? (s.theme ?? []).some((t) => selectedTheme.includes(String(t)))
			: true;
		return passDiff && passTheme;
	});

	return (
		<main className="mx-auto max-w-7xl px-6 py-10">
			<h1 className="font-display text-3xl text-[color:var(--rof-off)] [filter:var(--glow)]">
				Sets
			</h1>
			<p className="mt-3 text-[color:var(--rof-off)]/75">
				Browse content sets. Filters and card grid coming soon.
			</p>
			{/* Filters */}
			<div className="mt-6 flex flex-col gap-3">
				<FilterPills title="Difficulty" param="difficulty" options={difficultyOptions} />
				<FilterPills title="Theme" param="theme" options={themeOptions} />
			</div>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filteredSets.map((s) => (
					<Link
						key={s.slug}
						href={`/sets/${s.slug}`}
						className="rounded-lg border border-white/10 p-5 bg-[color:rgb(13_42_52/.4)] block hover:border-white/20 transition"
					>
						<div className="font-mono text-xs text-[color:var(--rof-off)]/60 mb-2">
							{s.release ?? 'TBA'} · {s.difficulty ?? 'Normal'}
						</div>
						<div className="font-semibold text-[color:var(--rof-off)]">{s.title}</div>
						<div className="text-sm text-[color:var(--rof-off)]/70 truncate">
							{(s.theme ?? []).join(', ')}
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
