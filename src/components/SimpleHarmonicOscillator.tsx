import { useEffect, useRef, useState } from "react";

const STARLIGHT = "#F1ECE3";
const MUTED = "#9EA4B8";
const GOLD = "#DCB55F";
const BRONZE = "#6F4E37";

interface Props {
  width?: number;
  height?: number;
}

/**
 * A mass on a spring, driven by the exact analytic SHM solution
 * x(t) = A cos(omega0 t), so the animation never drifts numerically.
 * A live bar shows kinetic vs potential energy trading back and forth,
 * which is the entire physical content of "simple harmonic motion".
 */
export default function SimpleHarmonicOscillator({ width = 480, height = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const [running, setRunning] = useState(true);
  const [k, setK] = useState(4); // spring constant (N/m, illustrative units)
  const [m] = useState(1); // mass (kg)
  const [kePct, setKePct] = useState(0);

  const A = 90; // amplitude in px
  const omega0 = Math.sqrt(k / m);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (running) tRef.current += dt;

      const t = tRef.current;
      const x = A * Math.cos(omega0 * t);
      const v = -A * omega0 * Math.sin(omega0 * t);

      const KE = 0.5 * m * v * v;
      const PE = 0.5 * k * x * x;
      const total = KE + PE || 1;
      setKePct(Math.round((KE / total) * 100));

      ctx.clearRect(0, 0, width, height);

      const wallX = 40;
      const centerY = height * 0.42;
      const massX = wallX + 150 + x;

      // wall
      ctx.fillStyle = STARLIGHT;
      ctx.fillRect(wallX - 12, centerY - 50, 12, 100);

      // spring (zigzag)
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const coils = 14;
      const springLen = massX - wallX;
      ctx.moveTo(wallX, centerY);
      for (let i = 1; i < coils; i++) {
        const px = wallX + (springLen * i) / coils;
        const py = centerY + (i % 2 === 0 ? -10 : 10);
        ctx.lineTo(px, py);
      }
      ctx.lineTo(massX, centerY);
      ctx.stroke();

      // equilibrium marker
      ctx.strokeStyle = MUTED + "55";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(wallX + 150, centerY - 60);
      ctx.lineTo(wallX + 150, centerY + 60);
      ctx.stroke();
      ctx.setLineDash([]);

      // mass
      ctx.fillStyle = GOLD;
      ctx.strokeStyle = BRONZE;
      ctx.lineWidth = 2;
      ctx.fillRect(massX - 20, centerY - 20, 40, 40);
      ctx.strokeRect(massX - 20, centerY - 20, 40, 40);

      // energy bars
      const barY = height - 56;
      const barW = width - 80;
      ctx.fillStyle = MUTED + "33";
      ctx.fillRect(40, barY, barW, 18);
      ctx.fillStyle = BRONZE;
      ctx.fillRect(40, barY, (barW * KE) / total, 18);
      ctx.fillStyle = STARLIGHT;
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillText("KE", 40, barY - 6);
      ctx.fillText("PE", 40 + barW - 20, barY - 6);

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [running, k, m, width, height]);

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-white/10 rounded-lg bg-black/30 w-full"
      />
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-2 bg-auric-300 text-nebula-900 rounded-md hover:opacity-90 transition-opacity font-semibold"
        >
          {running ? "Pause" : "Play"}
        </button>
        <label className="flex items-center gap-2 text-muted-foreground">
          Spring constant k
          <input
            type="range"
            min={1}
            max={12}
            step={0.5}
            value={k}
            onChange={(e) => setK(parseFloat(e.target.value))}
          />
        </label>
        <div className="text-muted-foreground font-mono text-xs">
          KE {kePct}% · PE {100 - kePct}%
        </div>
      </div>
    </div>
  );
}
