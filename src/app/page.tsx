import CarouselVHS from '@/components/ui/CarouselVHS';
import HeroFull from '@/components/HeroFull';
import PanelRow from '@/components/PanelRow';
import FeatureStrip from '@/components/FeatureStrip';

export default function Home() {
	return (
		<main>
			<HeroFull />

			<section className="py-20 mx-auto max-w-7xl px-6">
				<PanelRow />
			</section>

			<FeatureStrip
				title="Sets"
				subtitle="Scenario packs with unique rules"
				palette="cyan"
				ctaLabel="Browse Sets"
				ctaHref="/sets"
				bgImage="/art/sets.png"
			/>
			<FeatureStrip
				title="Characters"
				subtitle="Five horror archetypes to master"
				palette="amber"
				ctaLabel="Meet the Survivors"
				ctaHref="/characters"
				bgImage="/art/characters.png"
			/>
			<FeatureStrip
				title="Slashers"
				subtitle="Agendas, tells, and ruthless minions"
				palette="red"
				ctaLabel="Face the Slashers"
				ctaHref="/slashers"
				bgImage="/art/slashers.png"
			/>

			<section className="py-20 mx-auto max-w-7xl px-6">
				<CarouselVHS
					items={[
						{ id: '1', title: 'SET: NIGHTFALL' },
						{ id: '2', title: 'CHAR: OCCULTIST' },
						{ id: '3', title: 'SLASHER: THE VEIL' },
						{ id: '4', title: 'EVENT: BLACKOUT' },
						{ id: '5', title: 'SET: RUINED MALL' },
						{ id: '6', title: 'CHAR: DETECTIVE' },
						{ id: '7', title: 'SLASHER: THE BECKONER' },
						{ id: '8', title: 'LORE: TAPE 03' },
					]}
				/>
			</section>
		</main>
	);
}
