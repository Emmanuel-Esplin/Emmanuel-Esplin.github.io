// "Data streams": a seeded particle flow field drawn behind the hero.
// Particles follow a smooth noise field and leave fading trails, like
// records moving through a pipeline. Pauses when off-screen or hidden and
// renders a single still frame when the user prefers reduced motion.

const COLORS = ['#22d3ee', '#3b82f6', '#a78bfa'];

// Small seeded PRNG so the pattern is the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Cheap smooth pseudo-noise built from layered sines (no dependency needed).
function field(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.0021 + t) * 1.4 +
    Math.cos(y * 0.0027 - t * 0.7) * 1.2 +
    Math.sin((x + y) * 0.0013 + t * 0.4)
  );
}

interface Particle {
  x: number;
  y: number;
  color: string;
  life: number;
}

export function startFlowField(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = mulberry32(1998);
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let t = 0;
  let running = false;
  let frame = 0;

  const spawn = (): Particle => ({
    x: rand() * width,
    y: rand() * height,
    color: COLORS[Math.floor(rand() * COLORS.length)],
    life: 80 + rand() * 220,
  });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(900, Math.floor((width * height) / 1800));
    particles = Array.from({ length: count }, spawn);
    ctx!.fillStyle = '#07080d';
    ctx!.fillRect(0, 0, width, height);
  }

  function step() {
    ctx!.fillStyle = 'rgba(7, 8, 13, 0.06)';
    ctx!.fillRect(0, 0, width, height);
    ctx!.lineWidth = 1.3;
    for (const p of particles) {
      const angle = field(p.x, p.y, t);
      const nx = p.x + Math.cos(angle) * 1.3;
      const ny = p.y + Math.sin(angle) * 1.3;
      ctx!.strokeStyle = p.color;
      ctx!.globalAlpha = 0.8;
      ctx!.beginPath();
      ctx!.moveTo(p.x, p.y);
      ctx!.lineTo(nx, ny);
      ctx!.stroke();
      p.x = nx;
      p.y = ny;
      if (--p.life < 0 || nx < 0 || nx > width || ny < 0 || ny > height) Object.assign(p, spawn());
    }
    ctx!.globalAlpha = 1;
    t += 0.0025;
  }

  function loop() {
    if (!running) return;
    step();
    frame = requestAnimationFrame(loop);
  }

  function setRunning(on: boolean) {
    if (on === running) return;
    running = on;
    if (on) loop();
    else cancelAnimationFrame(frame);
  }

  resize();

  if (reduceMotion) {
    // Pre-run the simulation so the still frame shows full trails.
    for (let i = 0; i < 160; i++) step();
    return;
  }

  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    setRunning(visible && !document.hidden);
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => setRunning(visible && !document.hidden));

  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    // Mobile browsers fire resize when the address bar hides; only reset on width changes.
    resizeTimer = window.setTimeout(() => canvas.clientWidth !== width && resize(), 150);
  });

  setRunning(true);
}
