import { getSlasher } from '@/lib/content/loaders';
import StatMeter from '@/components/ui/StatMeter';

type PageProps = { params: { slug: string } };

export default function SlasherDetailPage({ params }: PageProps) {
	const s = getSlasher(params.slug);
	return (
		<main className="mx-auto max-w-7xl px-6 py-10">
			<div className="rounded-xl overflow-hidden border border-white/10 p-6 bg-[linear-gradient(135deg,rgba(255,46,99,.1),rgba(36,209,242,.08))]">
				<h1 className="font-display text-3xl text-[color:var(--rof-off)] [filter:var(--glow)]">
					{s?.name ?? params.slug}
				</h1>
				<p className="mt-3 text-[color:var(--rof-off)]/75">
					Agenda Timeline · Tells & Counters · Minions · Signature Events (sections coming
					soon)
				</p>
			</div>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div className="rounded-lg border border-white/10 p-4">
					<StatMeter
						label="Threat Tier"
						value={Number(s?.threatTier ?? 0)}
						max={5}
						color="red"
					/>
				</div>
			</div>
		</main>
	);
}
