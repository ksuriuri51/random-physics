import { useEffect, useRef, useState } from "react";

const STARLIGHT = "#F1ECE3";
const NEBULA_TONE = "#8C86A0";
const TEAL = "#89DEC6";

interface Props {
  width?: number;
  height?: number;
}

/**
 * Renders |psi(x,t)|^2 for a free-particle Gaussian wave packet using the
 * exact closed-form solution (see the Wave Mechanics equations panel):
 *   sigma(t) = sigma0 * sqrt(1 + (hbar t / 2 m sigma0^2)^2)
 * Rescaled into illustrative simulation units so the spreading is visible
 * over a few seconds rather than a physically realistic (and imperceptible) time.
 */
export default function SchrodingerWavePacket({ width = 480, height = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const [running, setRunning] = useState(true);
  const [sigma0, setSigma0] = useState(18); // px, initial width

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let last = performance.now();
    const spreadRate = 0.9; // illustrative "hbar/2m" in px^2/s units

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (running) tRef.current += dt;
      const t = tRef.current;

      const sigma = sigma0 * Math.sqrt(1 + Math.pow((spreadRate * t) / (sigma0 * sigma0), 2));
      const k0 = 0.15; // carrier wavenumber, illustrative
      const groupSpeed = 40; // px/s, packet drifts to the right

      ctx.clearRect(0, 0, width, height);

      const baseline = height * 0.72;
      const centerX = 60 + ((groupSpeed * t) % (width - 100));

      // axis
      ctx.strokeStyle = NEBULA_TONE + "44";
      ctx.beginPath();
      ctx.moveTo(0, baseline);
      ctx.lineTo(width, baseline);
      ctx.stroke();

      // probability density envelope |psi|^2 (Gaussian)
      const peakHeight = height * 0.5 * (sigma0 / sigma);
      ctx.strokeStyle = TEAL;
      ctx.fillStyle = TEAL + "22";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px <= width; px++) {
        const envelope = peakHeight * Math.exp(-((px - centerX) ** 2) / (2 * sigma * sigma));
        const y = baseline - envelope;
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.lineTo(width, baseline);
      ctx.lineTo(0, baseline);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // real part of psi, oscillating inside the envelope (the "carrier wave")
      ctx.strokeStyle = NEBULA_TONE;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let px = 0; px <= width; px++) {
        const envelope = peakHeight * Math.exp(-((px - centerX) ** 2) / (2 * sigma * sigma));
        const phase = k0 * px - 3 * t;
        const y = baseline - envelope * Math.cos(phase) * 0.9;
        if (px === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = STARLIGHT;
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillText(`sigma(t) = ${sigma.toFixed(1)} px  (sigma0 = ${sigma0})`, 12, 20);

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [running, sigma0, width, height]);

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
          Initial confinement σ₀
          <input
            type="range"
            min={8}
            max={30}
            step={1}
            value={sigma0}
            onChange={(e) => {
              setSigma0(parseFloat(e.target.value));
              tRef.current = 0;
            }}
          />
        </label>
        <span className="text-xs text-muted-foreground">Tighter confinement spreads faster</span>
      </div>
    </div>
  );
}
