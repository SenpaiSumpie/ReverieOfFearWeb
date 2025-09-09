'use client';

import { motion } from 'framer-motion';

export default function PanelRow() {
	const panels = [
		{ title: 'Co‑op Deckbuilder', text: 'Archetype synergy.' },
		{ title: 'Hidden Target', text: 'Identify the marked victim.' },
		{ title: 'Save or Perish', text: 'Health/sanity fail state.' },
	];

	const container = {
		hidden: { opacity: 0, y: 12 },
		show: {
			opacity: 1,
			y: 0,
			transition: { when: 'beforeChildren', staggerChildren: 0.12 },
		},
	};

	const item = {
		hidden: { opacity: 0, y: 16 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			className="grid grid-cols-1 md:grid-cols-3 gap-4"
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.2 }}
		>
			{panels.map((p) => (
				<motion.div
					key={p.title}
					variants={item}
					whileHover={{ y: -4, scale: 1.01 }}
					className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,.06)_inset] p-6 bg-[linear-gradient(135deg,rgba(255,46,99,.10),rgba(36,209,242,.08))]"
				>
					<div className="absolute inset-0 halftone pointer-events-none" />
					<h3 className="font-display text-xl text-[color:var(--rof-off)] text-glow">
						{p.title}
					</h3>
					<p className="mt-2 text-[color:var(--rof-off)]/75">{p.text}</p>
				</motion.div>
			))}
		</motion.div>
	);
}
