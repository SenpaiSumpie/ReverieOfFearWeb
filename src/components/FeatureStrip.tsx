'use client';

type Props = {
	title: string;
	subtitle?: string;
	ctaLabel: string;
	ctaHref: string;
	side?: 'left' | 'right';
	palette?: 'red' | 'cyan' | 'amber';
	bgImage?: string;
};

import { motion } from 'framer-motion';

const PALETTE: Record<string, { from: string; to: string }> = {
	red: { from: 'rgba(255,46,99,.35)', to: 'rgba(11,14,20,.6)' },
	cyan: { from: 'rgba(36,209,242,.35)', to: 'rgba(11,14,20,.6)' },
	amber: { from: 'rgba(246,191,58,.35)', to: 'rgba(11,14,20,.6)' },
};

export default function FeatureStrip({
	title,
	subtitle,
	ctaLabel,
	ctaHref,
	side = 'left',
	palette = 'cyan',
	bgImage,
}: Props) {
	const grad = PALETTE[palette] ?? PALETTE.cyan;
	const justify = side === 'left' ? 'justify-start' : 'justify-end';
	const xFrom = side === 'left' ? -40 : 40;

	return (
		<section className="relative min-h-[60vh] w-full overflow-hidden">
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<div
				className="absolute inset-0"
				style={{ background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
			/>
			<div className={`relative z-10 max-w-7xl mx-auto px-6 py-20 flex ${justify}`}>
				<motion.div
					initial={{ opacity: 0, x: xFrom }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					viewport={{ once: true, amount: 0.35 }}
					className="max-w-lg"
				>
					<h3 className="font-display text-4xl text-[color:var(--rof-off)] text-glow">
						{title}
					</h3>
					{subtitle ? (
						<p className="mt-3 text-[color:var(--rof-off)]/80">{subtitle}</p>
					) : null}
					<motion.a
						whileHover={{ scale: 1.03 }}
						className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 ring-1 ring-white/20 hover:ring-white/40 transition text-[color:var(--rof-off)]"
						href={ctaHref}
					>
						{ctaLabel}
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
}
