export function initRain(canvas: HTMLCanvasElement) {
	if (typeof window === 'undefined') return () => {};
	const _ctx = canvas.getContext('2d');
	if (!_ctx) return () => {};
	const ctx = _ctx; // capture non-null in closures

	let raf = 0;
	let drops: { x: number; y: number; len: number; sp: number }[] = [];
	let w = 0;
	let h = 0;
	const DPR = Math.min(window.devicePixelRatio || 1, 2);

	function resize() {
		const rect = canvas.getBoundingClientRect();
		w = Math.max(1, rect.width);
		h = Math.max(1, rect.height);
		canvas.width = Math.floor(w * DPR);
		canvas.height = Math.floor(h * DPR);
		ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		initDrops();
	}

	function initDrops() {
		// Thinner + slower: fewer drops, shorter streaks, reduced speed
		const target = Math.min(90, Math.max(16, Math.floor((w * h) / 100000)));
		drops = new Array(target).fill(0).map(() => ({
			x: Math.random() * w,
			y: Math.random() * h,
			len: 5 + Math.random() * 10, // 5–15px
			sp: 80 + Math.random() * 140, // px/s
		}));
	}

	function step(last: number) {
		const now = performance.now();
		const dt = Math.min(50, now - last) / 1000; // s

		if (!document.hidden) {
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = 'screen';
			ctx.strokeStyle = 'rgba(200,230,255,0.10)';
			ctx.lineWidth = 0.7;
			ctx.beginPath();
			for (const d of drops) {
				const dx = -0.28 * d.len; // less angled
				ctx.moveTo(d.x, d.y);
				ctx.lineTo(d.x + dx, d.y + d.len);
				d.y += d.sp * dt;
				d.x += d.sp * dt * -0.22;
				if (d.y - d.len > h || d.x + d.len < -20) {
					d.x = Math.random() * w;
					d.y = -Math.random() * 50;
					d.len = 6 + Math.random() * 12;
					d.sp = 140 + Math.random() * 200;
				}
			}
			ctx.stroke();
			ctx.globalCompositeOperation = 'source-over';
		}

		raf = requestAnimationFrame(() => step(now));
	}

	const onVis = () => {};
	const onResize = () => resize();

	window.addEventListener('resize', onResize);
	document.addEventListener('visibilitychange', onVis);
	resize();
	raf = requestAnimationFrame(() => step(performance.now()));

	return () => {
		cancelAnimationFrame(raf);
		window.removeEventListener('resize', onResize);
		document.removeEventListener('visibilitychange', onVis);
	};
}
