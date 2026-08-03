import { useEffect, useRef, useState } from "react";

const STARLIGHT = "#F1ECE3";
const MUTED = "#9EA4B8";
const NEBULA_TONE = "#8C86A0";
const GOLD = "#DCB55F";
const TEAL = "#89DEC6";

interface Props {
  width?: number;
  height?: number;
}

type Mode = "beats" | "standing";

/**
 * Draws two component waves faintly and their live superposition boldly.
 * "beats" mode: two traveling waves of slightly different frequency.
 * "standing" mode: a wave and its own reflection, forming fixed nodes.
 */
export default function WaveInterference({ width = 480, height = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const [mode, setMode] = useState<Mode>("beats");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let last = performance.now();
    const midY = height / 2;
    const ampScale = height / 6;

    const f1 = 1.0;
    const f2 = mode === "beats" ? 1.15 : 1.0;

    const drawWave = (fn: (x: number) => number, color: string, alpha: number, lw: number) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lw;
      ctx.beginPath();
      for (let px = 0; px <= width; px++) {
        const y = midY + fn(px);
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (running) tRef.current += dt;
      const t = tRef.current;

      ctx.clearRect(0, 0, width, height);

      // axis
      ctx.strokeStyle = MUTED + "44";
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      const k = 0.04; // spatial wavenumber (px^-1), same for both components

      if (mode === "beats") {
        const w1 = (x: number) => ampScale * Math.sin(k * x - 2 * Math.PI * f1 * t);
        const w2 = (x: number) => ampScale * Math.sin(k * x - 2 * Math.PI * f2 * t);
        drawWave(w1, MUTED, 0.35, 1.5);
        drawWave(w2, NEBULA_TONE, 0.35, 1.5);
        drawWave((x) => w1(x) + w2(x), TEAL, 1, 2.5);
      } else {
        // standing wave: incident + reflected wave of equal frequency
        const inc = (x: number) => ampScale * Math.sin(k * x - 2 * Math.PI * f1 * t);
        const refl = (x: number) => ampScale * Math.sin(-k * x - 2 * Math.PI * f1 * t);
        drawWave(inc, MUTED, 0.3, 1.5);
        drawWave(refl, NEBULA_TONE, 0.3, 1.5);
        const sum = (x: number) => inc(x) + refl(x);
        drawWave(sum, TEAL, 1, 2.5);

        // mark nodes: zeros of sin(kx) => x = n*pi/k
        ctx.fillStyle = STARLIGHT;
        for (let n = 0; n * Math.PI / k < width; n++) {
          const nx = (n * Math.PI) / k;
          ctx.beginPath();
          ctx.arc(nx, midY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mode, running, width, height]);

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-white/10 rounded-lg bg-black/30 w-full"
      />
      <div className="flex flex-wrap gap-3 items-center text-sm">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-2 bg-auric-300 text-nebula-900 rounded-md hover:opacity-90 transition-opacity font-semibold"
        >
          {running ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setMode((m) => (m === "beats" ? "standing" : "beats"))}
          className="px-4 py-2 border border-white/15 rounded-md hover:bg-white/5 transition-colors"
        >
          Mode: {mode === "beats" ? "Beats" : "Standing wave"}
        </button>
        <span className="text-xs text-muted-foreground">
          {mode === "beats" ? "Two close frequencies → slow amplitude envelope" : "Dots mark fixed nodes"}
        </span>
      </div>
    </div>
  );
}
