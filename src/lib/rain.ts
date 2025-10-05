export function initRain(canvas: HTMLCanvasElement) {
	if (typeof window === 'undefined') return () => {};
	const _ctx = canvas.getContext('2d');
	if (!_ctx) return () => {};
	const ctx = _ctx; // capture non-null in closures

	let raf = 0;
	let drops: { x: number; y: number; len: number; sp: number }[] = [];
	let w = 0;
	let h = 0;
	let ro: ResizeObserver | null = null;
	const DPR = Math.min(window.devicePixelRatio || 1, 2);

	function resize() {
		// Prefer observed content box; fallback to parent/client rects
		let rect = canvas.getBoundingClientRect();
		let ww = rect.width;
		let hh = rect.height;
		if (ww < 2 || hh < 2) {
			const p = canvas.parentElement as HTMLElement | null;
			if (p) {
				const pr = p.getBoundingClientRect();
				ww = pr.width || p.clientWidth;
				hh = pr.height || p.clientHeight;
			}
		}
		w = Math.max(1, ww);
		h = Math.max(1, hh);
		canvas.width = Math.floor(w * DPR);
		canvas.height = Math.floor(h * DPR);
		ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		initDrops();
	}

	function initDrops() {
		// Thicker + reversed direction: more drops, longer streaks, moderate speed
		const target = Math.min(220, Math.max(40, Math.floor((w * h) / 60000)));
		drops = new Array(target).fill(0).map(() => ({
			x: Math.random() * w,
			y: Math.random() * h,
			len: 10 + Math.random() * 14, // 10–24px
			sp: 120 + Math.random() * 120, // px/s
		}));
	}

	function step(last: number) {
		const now = performance.now();
		const dt = Math.min(50, now - last) / 1000; // s

		if (!document.hidden) {
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = 'screen';
			ctx.strokeStyle = 'rgba(200,230,255,0.16)';
			ctx.lineWidth = 1.1;
			ctx.beginPath();
			for (const d of drops) {
				const dx = 0.35 * d.len; // reversed direction (leans right)
				ctx.moveTo(d.x, d.y);
				ctx.lineTo(d.x + dx, d.y + d.len);
				d.y += d.sp * dt;
				d.x += d.sp * dt * 0.24; // drift right
				if (d.y - d.len > h || d.x - d.len > w + 20) {
					d.x = -Math.random() * 50; // respawn just left of view
					d.y = -Math.random() * 50;
					d.len = 10 + Math.random() * 14;
					d.sp = 120 + Math.random() * 120;
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
	// Observe layout changes to keep canvas covering the full hero
	ro = new ResizeObserver(() => resize());
	ro.observe(canvas);
	resize();
	raf = requestAnimationFrame(() => step(performance.now()));

	return () => {
		cancelAnimationFrame(raf);
		window.removeEventListener('resize', onResize);
		document.removeEventListener('visibilitychange', onVis);
		if (ro) ro.disconnect();
	};
}
