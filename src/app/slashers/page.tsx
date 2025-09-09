import Link from 'next/link';
import { getSlashers } from '@/lib/content/loaders';
import FilterPills from '@/components/ui/FilterPills';

export default function SlashersPage({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const slashers = getSlashers();
	const getArr = (v: unknown) =>
		typeof v === 'string'
			? v.split(',').filter(Boolean)
			: Array.isArray(v)
			? v.flatMap((x) => (typeof x === 'string' ? x.split(',') : []))
			: [];
	const selectedTier = getArr(searchParams?.tier);
	const selectedSpeed = getArr(searchParams?.speed);

	const tierOptions = Array.from(new Set(slashers.map((s) => s.threatTier).filter(Boolean))).map(
		(t) => ({ value: String(t), label: `Tier ${t}` })
	);
	const speedOptions = Array.from(
		new Set(slashers.map((s) => s.agendaSpeed).filter(Boolean))
	).map((a) => ({ value: String(a), label: String(a) }));

	const filteredSlashers = slashers.filter((s) => {
		const passTier = selectedTier.length ? selectedTier.includes(String(s.threatTier)) : true;
		const passSpeed = selectedSpeed.length
			? selectedSpeed.includes(String(s.agendaSpeed))
			: true;
		return passTier && passSpeed;
	});

	return (
		<main className="mx-auto max-w-7xl px-6 py-10">
			<h1 className="font-display text-3xl text-[color:var(--rof-off)] [filter:var(--glow)]">
				Slashers
			</h1>
			<p className="mt-3 text-[color:var(--rof-off)]/75">
				Browse antagonists. Filters and grid coming soon.
			</p>
			{/* Filters */}
			<div className="mt-6 flex flex-col gap-3">
				<FilterPills title="Threat Tier" param="tier" options={tierOptions} />
				<FilterPills title="Agenda Speed" param="speed" options={speedOptions} />
			</div>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filteredSlashers.map((s) => (
					<Link
						key={s.slug}
						href={`/slashers/${s.slug}`}
						className="rounded-lg border border-white/10 p-5 bg-[color:rgb(13_42_52/.4)] block hover:border-white/20 transition"
					>
						<div className="font-semibold text-[color:var(--rof-off)]">{s.name}</div>
						<div className="text-sm text-[color:var(--rof-off)]/70">
							Tier {s.threatTier ?? '?'} · {s.agendaSpeed ?? '?'}
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
