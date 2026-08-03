import { useEffect, useRef, useState, useMemo } from 'react';
import { computeEpicycles, reconstructFromEpicycles } from '@/lib/math';
import type { Epicycle, Point } from '@/lib/math';
import { levels } from '@/lib/targetShapes';

const VOID = '#0B0B14';
const STARLIGHT = '#F1ECE3';
const GOLD = '#DCB55F';
const TEAL = '#89DEC6';
const MAUVE = '#8C86A0';
const NOVA = '#E0637C';

interface FourierEpicyclesProps {
  width?: number;
  height?: number;
}

/**
 * "Signal Architect" — a Fourier epicycle puzzle game. Pick a target shape,
 * then dial the harmonic count down to the fewest circles that still trace
 * it accurately: a hands-on demonstration that a Fourier series converges to
 * any periodic curve, one added frequency at a time.
 */
export default function FourierEpicycles({ width = 600, height = 460 }: FourierEpicyclesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const trailRef = useRef<Point[]>([]);

  const [mode, setMode] = useState<'game' | 'sandbox'>('game');
  const [levelIndex, setLevelIndex] = useState(0);
  const [harmonics, setHarmonics] = useState(6);
  const [best, setBest] = useState<Record<string, number>>({});

  // Sandbox (freehand) state
  const [, setIsDrawing] = useState(false);
  const [freePath, setFreePath] = useState<Point[]>([]);
  const [freeEpicycles, setFreeEpicycles] = useState<Epicycle[]>([]);

  const level = levels[levelIndex];

  const target = useMemo(() => level.shape(), [level]);
  const targetEpicycles = useMemo(() => computeEpicycles(target, 40), [target]);
  const maxHarmonics = Math.max(1, targetEpicycles.length);

  useEffect(() => {
    setHarmonics(Math.min(6, maxHarmonics));
  }, [levelIndex, maxHarmonics]);

  // Accuracy score for the current harmonic count
  const accuracy = useMemo(() => {
    if (mode !== 'game') return 0;
    const used = targetEpicycles.slice(0, harmonics);
    const N = target.length;
    let sumSq = 0;
    let scale = 0;
    for (let n = 0; n < N; n++) {
      const t = (n / N) * Math.PI * 2;
      const p = reconstructFromEpicycles(used, t);
      const dx = p.x - target[n].x;
      const dy = p.y - target[n].y;
      sumSq += dx * dx + dy * dy;
      scale += target[n].x * target[n].x + target[n].y * target[n].y;
    }
    const rms = Math.sqrt(sumSq / N);
    const norm = Math.sqrt(scale / N) || 1;
    return Math.max(0, Math.min(100, 100 * (1 - rms / norm)));
  }, [mode, target, targetEpicycles, harmonics]);

  const stars = accuracy >= 97 ? 3 : accuracy >= 88 ? 2 : accuracy >= 70 ? 1 : 0;

  useEffect(() => {
    if (stars > (best[level.id] || 0)) {
      setBest((b) => ({ ...b, [level.id]: stars }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stars, level.id]);

  // Sandbox freehand drawing handlers
  useEffect(() => {
    if (mode !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const toLocal = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left - width / 2, y: e.clientY - rect.top - height / 2 };
    };
    const down = (e: MouseEvent) => {
      setIsDrawing(true);
      setFreeEpicycles([]);
      setFreePath([toLocal(e)]);
    };
    const move = (e: MouseEvent) => {
      setIsDrawing((drawing) => {
        if (drawing) setFreePath((p) => [...p, toLocal(e)]);
        return drawing;
      });
    };
    const up = () => {
      setIsDrawing(false);
      setFreePath((p) => {
        if (p.length > 10) setFreeEpicycles(computeEpicycles(p, 40));
        return p;
      });
    };

    canvas.addEventListener('mousedown', down);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      canvas.removeEventListener('mousedown', down);
      canvas.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [mode, width, height]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    trailRef.current = [];

    const activeEpicycles = mode === 'game' ? targetEpicycles.slice(0, harmonics) : freeEpicycles;

    const draw = () => {
      ctx.fillStyle = VOID;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // faint target outline in game mode
      if (mode === 'game') {
        ctx.strokeStyle = MAUVE;
        ctx.globalAlpha = 0.35;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        target.forEach((p, i) => {
          if (i === 0) ctx.moveTo(centerX + p.x, centerY + p.y);
          else ctx.lineTo(centerX + p.x, centerY + p.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      } else if (freePath.length > 1) {
        ctx.strokeStyle = MAUVE;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        freePath.forEach((p, i) => {
          if (i === 0) ctx.moveTo(centerX + p.x, centerY + p.y);
          else ctx.lineTo(centerX + p.x, centerY + p.y);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // epicycle chain
      let x = 0;
      let y = 0;
      const t = timeRef.current;
      for (const e of activeEpicycles) {
        const angle = e.frequency * t + e.phase;
        const nx = x + e.amplitude * Math.cos(angle);
        const ny = y + e.amplitude * Math.sin(angle);

        ctx.strokeStyle = TEAL;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX + x, centerY + y, e.amplitude, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.strokeStyle = STARLIGHT;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + x, centerY + y);
        ctx.lineTo(centerX + nx, centerY + ny);
        ctx.stroke();

        x = nx;
        y = ny;
      }

      // comet trail of the traced point
      trailRef.current.push({ x, y });
      if (trailRef.current.length > 400) trailRef.current.shift();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      trailRef.current.forEach((p, i) => {
        if (i === 0) ctx.moveTo(centerX + p.x, centerY + p.y);
        else ctx.lineTo(centerX + p.x, centerY + p.y);
      });
      ctx.stroke();

      ctx.fillStyle = NOVA;
      ctx.beginPath();
      ctx.arc(centerX + x, centerY + y, 4, 0, Math.PI * 2);
      ctx.fill();

      timeRef.current = (timeRef.current + 0.012) % (Math.PI * 2);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mode, target, targetEpicycles, harmonics, freeEpicycles, freePath, width, height]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode('game')}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${mode === 'game' ? 'bg-verdant-700/50 border-verdant-500 text-verdant-100' : 'border-white/15 text-muted-foreground hover:bg-white/5'}`}
        >
          Signal Architect
        </button>
        <button
          onClick={() => setMode('sandbox')}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${mode === 'sandbox' ? 'bg-verdant-700/50 border-verdant-500 text-verdant-100' : 'border-white/15 text-muted-foreground hover:bg-white/5'}`}
        >
          Freehand Sandbox
        </button>
      </div>

      {mode === 'game' && (
        <div className="flex flex-wrap gap-2">
          {levels.map((lvl, i) => (
            <button
              key={lvl.id}
              onClick={() => setLevelIndex(i)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                i === levelIndex ? 'border-auric-300 text-auric-300' : 'border-white/15 text-muted-foreground hover:border-white/30'
              }`}
            >
              {lvl.name} {best[lvl.id] ? '★'.repeat(best[lvl.id]) : ''}
            </button>
          ))}
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-white/10 rounded-lg bg-black cursor-crosshair w-full"
      />

      {mode === 'game' ? (
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground w-24">Harmonics</span>
            <input
              type="range"
              min={1}
              max={maxHarmonics}
              value={harmonics}
              onChange={(e) => setHarmonics(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono w-10 text-right">{harmonics}</span>
          </label>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Accuracy: <span className="font-mono text-foreground">{accuracy.toFixed(1)}%</span>
            </span>
            <span className="text-auric-300 text-lg tracking-wider">
              {'★'.repeat(stars)}{'☆'.repeat(3 - stars)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Try to earn 3 stars with as few harmonics as possible — par for this shape is around{' '}
            {level.parHarmonics}.
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {freeEpicycles.length === 0
            ? 'Draw any closed shape — the algorithm decomposes it into rotating circles live.'
            : `Reconstructing your drawing from ${freeEpicycles.length} epicycles.`}
        </p>
      )}
    </div>
  );
}
