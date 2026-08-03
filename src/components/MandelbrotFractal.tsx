import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { mandelbrotIterations } from '@/lib/math';

interface MandelbrotFractalProps {
  width?: number;
  height?: number;
}

interface Badge {
  depth: number;
  name: string;
  blurb: string;
}

const BADGES: Badge[] = [
  { depth: 8, name: 'Left the shallows', blurb: 'The whole set no longer fits in one glance — you\'re inside the boundary now.' },
  { depth: 60, name: 'Seahorse Valley', blurb: 'Real explorers named this region for the seahorse-shaped spirals that appear here.' },
  { depth: 500, name: 'Elephant Valley', blurb: 'Deeper still — a region famous for trunk-like bulbs repeating outward.' },
  { depth: 5000, name: 'Mini-Mandelbrot sighted', blurb: 'At this depth, tiny near-copies of the whole set reappear — the boundary is self-similar at every scale.' },
];

export default function MandelbrotFractal({ width = 600, height = 600 }: MandelbrotFractalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [centerX, setCenterX] = useState(-0.5);
  const [centerY, setCenterY] = useState(0);
  const [maxIterations, setMaxIterations] = useState(100);
  const [unlocked, setUnlocked] = useState<Badge[]>([]);
  const [latestBadge, setLatestBadge] = useState<Badge | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const scale = 3.5 / zoom;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const x = centerX + (px - width / 2) * scale / width;
        const y = centerY + (py - height / 2) * scale / height;

        const iterations = mandelbrotIterations(x, y, maxIterations);
        const hue = 260 - (iterations / maxIterations) * 260; // violet -> gold sweep
        const saturation = 80;
        const lightness = iterations === maxIterations ? 4 : 42;

        const rgb = hslToRgb(hue, saturation, lightness);

        const index = (py * width + px) * 4;
        data[index] = rgb.r;
        data[index + 1] = rgb.g;
        data[index + 2] = rgb.b;
        data[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [zoom, centerX, centerY, width, height, maxIterations]);

  useEffect(() => {
    const newlyUnlocked = BADGES.filter((b) => zoom >= b.depth && !unlocked.includes(b));
    if (newlyUnlocked.length > 0) {
      setUnlocked((u) => [...u, ...newlyUnlocked]);
      setLatestBadge(newlyUnlocked[newlyUnlocked.length - 1]);
      const t = setTimeout(() => setLatestBadge(null), 4500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scale = 3.5 / zoom;
    const newCenterX = centerX + (x - width / 2) * scale / width;
    const newCenterY = centerY + (y - height / 2) * scale / height;

    setCenterX(newCenterX);
    setCenterY(newCenterY);
    setZoom((z) => z * 2.2);
  };

  const reset = () => {
    setZoom(1);
    setCenterX(-0.5);
    setCenterY(0);
    setUnlocked([]);
  };

  const c = { x: centerX, y: centerY };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleClick}
          className="border border-white/10 rounded-lg bg-black cursor-zoom-in w-full"
        />
        {latestBadge && (
          <div className="absolute bottom-3 left-3 right-3 glass-panel rounded-lg p-3 animate-fade-slide-up">
            <div className="text-xs uppercase tracking-wide text-nebula-300 font-semibold">Discovery unlocked</div>
            <div className="font-bold text-sm text-foreground">{latestBadge.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{latestBadge.blurb}</div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <button
          onClick={reset}
          className="px-3 py-1.5 border border-white/15 rounded-md hover:bg-white/5 transition-colors"
        >
          Reset
        </button>
        <label className="flex items-center gap-2 text-muted-foreground">
          Detail
          <input
            type="range"
            min={50}
            max={300}
            step={10}
            value={maxIterations}
            onChange={(e) => setMaxIterations(parseInt(e.target.value))}
          />
        </label>
        <div className="text-muted-foreground font-mono text-xs">
          zoom {zoom.toFixed(0)}x · c = {c.x.toFixed(4)} {c.y >= 0 ? '+' : '-'} {Math.abs(c.y).toFixed(4)}i
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {BADGES.map((b) => (
          <span
            key={b.name}
            className={`text-xs px-2 py-1 rounded-full border ${
              unlocked.includes(b) ? 'border-nebula-300 text-nebula-300' : 'border-white/10 text-muted-foreground/40'
            }`}
          >
            {unlocked.includes(b) ? '✓ ' : ''}{b.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l / 100 - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}
