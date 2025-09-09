'use client';

import * as React from 'react';

export type StatMeterProps = {
	label: string;
	value: number;
	max: number;
	color?: 'red' | 'cyan' | 'amber';
};

export default function StatMeter({ label, value, max, color = 'cyan' }: StatMeterProps) {
	const pct = Math.max(0, Math.min(100, Math.round((value / Math.max(1, max)) * 100)));
	const bar =
		color === 'red'
			? 'bg-[color:var(--rof-red)]'
			: color === 'amber'
			? 'bg-[color:var(--rof-amber)]'
			: 'bg-[color:var(--rof-cyan)]';

	return (
		<div className="w-full">
			<div className="flex justify-between text-xs mb-1">
				<span className="text-[color:var(--rof-off)]/70">{label}</span>
				<span className="text-[color:var(--rof-off)]/50">
					{value} / {max}
				</span>
			</div>
			<div className="h-2 w-full rounded bg-white/10 overflow-hidden">
				<div
					className={`h-full ${bar}`}
					style={{ width: `${pct}%`, filter: 'var(--glow)' }}
				/>
			</div>
		</div>
	);
}
