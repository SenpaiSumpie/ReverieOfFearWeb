'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { initRain } from '@/lib/rain';
import { motion } from 'framer-motion';

export default function HeroFull() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const c = canvasRef.current;
		if (!c) return;
		const stop = initRain(c);
		return () => stop?.();
	}, []);

	return (
		<section className="relative min-h-[calc(100svh-4rem)] w-full overflow-hidden">
			{/* Desktop hero */}
			<Image
				src="/hero/rof-hero-desktop.png"
				alt=""
				fill
				priority
				sizes="100vw"
				className="object-cover hidden md:block"
			/>
			{/* Mobile hero */}
			<Image
				src="/hero/rof-hero-mobile.png"
				alt=""
				fill
				priority
				sizes="100vw"
				className="object-cover md:hidden"
			/>
			<div className="absolute inset-0 scrim" />
			<canvas
				id="rain"
				ref={canvasRef}
				className="absolute inset-0 w-full h-full"
				aria-hidden
			></canvas>
			<div className="grain-bg absolute inset-0 pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 md:pb-16 h-full flex items-end">
				<div>
					<h1 className="font-display text-5xl md:text-8xl text-[color:var(--rof-off)] text-glow tracking-tight">
						REVERIE OF FEAR
					</h1>
					<p className="mt-4 max-w-xl text-[color:var(--rof-off)]/80">
						Save the living. Unmask the target. Outlast the night.
					</p>
					<div className="mt-8 flex gap-3">
						<motion.a
							href="/sets"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.98 }}
							className="px-5 py-3 rounded-2xl bg-[color:var(--rof-red)] text-[color:var(--rof-ink)] font-semibold box-glow shadow-[0_10px_30px_-10px_rgba(255,46,99,.45)]"
						>
							View Sets
						</motion.a>
						<motion.a
							href="/slashers"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.98 }}
							className="px-5 py-3 rounded-2xl ring-2 ring-[color:var(--rof-cyan)] text-[color:var(--rof-off)]/90 shadow-[0_10px_30px_-10px_rgba(36,209,242,.45)]"
						>
							Meet the Slashers
						</motion.a>
					</div>
				</div>
			</div>
		</section>
	);
}
