'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { motion } from 'framer-motion';

type Item = {
	id: string;
	title: string;
	img?: string; // placeholder for future key art
};

export type CarouselVHSProps = {
	items: Item[];
	options?: EmblaOptionsType;
};

export default function CarouselVHS({ items, options }: CarouselVHSProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
		skipSnaps: false,
		containScroll: 'trimSnaps',
		...options,
	});

	React.useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (!emblaApi) return;
			if (e.key === 'ArrowRight') emblaApi.scrollNext();
			if (e.key === 'ArrowLeft') emblaApi.scrollPrev();
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [emblaApi]);

	return (
		<div className="group">
			<div className="flex items-center justify-between mb-3">
				<h2 className="font-display tracking-wide text-[color:var(--rof-off)]/90">
					Gallery
				</h2>
				<div className="hidden sm:flex gap-2">
					<button
						onClick={() => emblaApi?.scrollPrev()}
						className="px-3 py-1.5 text-xs rounded border border-white/15 text-[color:var(--rof-off)]/80 hover:text-[color:var(--rof-off)] hover:border-white/30"
					>
						←
					</button>
					<button
						onClick={() => emblaApi?.scrollNext()}
						className="px-3 py-1.5 text-xs rounded border border-white/15 text-[color:var(--rof-off)]/80 hover:text-[color:var(--rof-off)] hover:border-white/30"
					>
						→
					</button>
				</div>
			</div>

			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex gap-3">
					{items.map((item) => (
						<motion.div
							key={item.id}
							whileHover={{ y: -8, rotate: -0.8 }}
							whileTap={{ scale: 0.98 }}
							tabIndex={0}
							className="shrink-0 w-[160px] sm:w-[180px] md:w-[200px] aspect-[3/4] rounded-md overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,46,99,.25),rgba(36,209,242,.18))] relative focus:outline-none focus:ring-2 focus:ring-[color:var(--rof-cyan)]/50"
						>
							{/* VHS spine label */}
							<div className="absolute left-0 top-0 h-full w-8 bg-[color:var(--rof-ink)]/70 border-r border-white/10 flex items-center justify-center rotate-180 [writing-mode:vertical-rl]">
								<span className="font-mono text-[10px] tracking-widest text-[color:var(--rof-off)]/70">
									{item.title}
								</span>
							</div>
							{/* Thumb placeholder */}
							<div className="absolute inset-0 ml-8 grid place-items-center text-[color:var(--rof-off)]/60 text-xs">
								Key Art
							</div>
						</motion.div>
					))}
				</div>
			</div>
			<p className="mt-2 text-[10px] text-[color:var(--rof-off)]/50">
				Tip: Use arrow keys to navigate.
			</p>
		</div>
	);
}
