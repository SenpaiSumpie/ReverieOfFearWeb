import { getCharacter } from '@/lib/content/loaders';
import TabSwitcher from '@/components/ui/TabSwitcher';

type PageProps = { params: { slug: string } };

export default function CharacterDetailPage({ params }: PageProps) {
	const c = getCharacter(params.slug);
	return (
		<main className="mx-auto max-w-7xl px-6 py-10">
			<div className="rounded-xl overflow-hidden border border-white/10 p-6 bg-[linear-gradient(135deg,rgba(255,46,99,.1),rgba(36,209,242,.08))]">
				<h1 className="font-display text-3xl text-[color:var(--rof-off)] [filter:var(--glow)]">
					{c?.name ?? params.slug}
				</h1>
				<p className="mt-3 text-[color:var(--rof-off)]/75">
					Kit · Signature Cards · Build Ideas · Lore (tabs coming soon)
				</p>
			</div>

			<div className="mt-6">
				<TabSwitcher
					tabs={[
						{ id: 'kit', label: 'Kit' },
						{ id: 'signatures', label: 'Signature Cards' },
						{ id: 'builds', label: 'Build Ideas' },
						{ id: 'lore', label: 'Lore' },
					]}
				/>
			</div>
		</main>
	);
}
