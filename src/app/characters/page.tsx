import Link from 'next/link';
import { getCharacters } from '@/lib/content/loaders';
import FilterPills from '@/components/ui/FilterPills';

export default function CharactersPage({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const characters = getCharacters();
	const getArr = (v: unknown) =>
		typeof v === 'string'
			? v.split(',').filter(Boolean)
			: Array.isArray(v)
			? v.flatMap((x) => (typeof x === 'string' ? x.split(',') : []))
			: [];
	const selectedArchetype = getArr(searchParams?.archetype);
	const selectedComplexity = getArr(searchParams?.complexity);

	const archetypeOptions = Array.from(
		new Set(characters.map((c) => c.archetype).filter(Boolean))
	).map((a) => ({ value: String(a), label: String(a) }));
	const complexityOptions = Array.from(
		new Set(characters.map((c) => c.complexity).filter(Boolean))
	).map((d) => ({ value: String(d), label: String(d) }));

	const filteredCharacters = characters.filter((c) => {
		const passArc = selectedArchetype.length
			? selectedArchetype.includes(String(c.archetype))
			: true;
		const passCx = selectedComplexity.length
			? selectedComplexity.includes(String(c.complexity))
			: true;
		return passArc && passCx;
	});

	return (
		<main className="mx-auto max-w-7xl px-6 py-10">
			<h1 className="font-display text-3xl text-[color:var(--rof-off)] [filter:var(--glow)]">
				Characters
			</h1>
			<p className="mt-3 text-[color:var(--rof-off)]/75">
				Browse character archetypes. Filters and grid coming soon.
			</p>
			{/* Filters */}
			<div className="mt-6 flex flex-col gap-3">
				<FilterPills title="Archetype" param="archetype" options={archetypeOptions} />
				<FilterPills title="Complexity" param="complexity" options={complexityOptions} />
			</div>

			<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{filteredCharacters.map((c) => (
					<Link
						key={c.slug}
						href={`/characters/${c.slug}`}
						className="rounded-lg border border-white/10 p-5 bg-[color:rgb(13_42_52/.4)] block hover:border-white/20 transition"
					>
						<div className="font-semibold text-[color:var(--rof-off)]">{c.name}</div>
						<div className="text-sm text-[color:var(--rof-off)]/70">
							{c.archetype} · {c.complexity ?? 'Normal'}
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
