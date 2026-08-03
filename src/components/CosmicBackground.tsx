import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: "warm" | "cool" | "neutral";
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

/**
 * A realistic-feeling deep-space backdrop built entirely from code (canvas +
 * CSS), rather than an embedded photo — this keeps the visual atmosphere of
 * the reference moodboard (dense starfields, drifting nebula color) without
 * reproducing any of its source images. Mounted once in Layout so it persists
 * behind all six pages without re-initializing on navigation.
 */
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((window.innerWidth * window.innerHeight) / 3200);
      const hues: Star["hue"][] = ["warm", "cool", "neutral", "neutral"];
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const starColor = (hue: Star["hue"], alpha: number) => {
      if (hue === "warm") return `rgba(220, 181, 95, ${alpha})`;
      if (hue === "cool") return `rgba(137, 222, 198, ${alpha})`;
      return `rgba(241, 236, 227, ${alpha})`;
    };

    let frame = 0;

    const maybeSpawnShootingStar = () => {
      if (Math.random() < 0.004 && shootingRef.current.length < 2) {
        const fromLeft = Math.random() < 0.5;
        const y = Math.random() * window.innerHeight * 0.5;
        shootingRef.current.push({
          x: fromLeft ? -20 : window.innerWidth + 20,
          y,
          vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 4),
          vy: 2 + Math.random() * 2,
          life: 0,
          maxLife: 40,
        });
      }
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const s of starsRef.current) {
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.4 + 0.6 * twinkle);
        ctx.beginPath();
        ctx.fillStyle = starColor(s.hue, alpha);
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      maybeSpawnShootingStar();
      shootingRef.current = shootingRef.current.filter((sh) => sh.life < sh.maxLife);
      for (const sh of shootingRef.current) {
        const alpha = 1 - sh.life / sh.maxLife;
        ctx.strokeStyle = `rgba(241, 236, 227, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 4, sh.y - sh.vy * 4);
        ctx.stroke();
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="cosmic-bg" aria-hidden="true">
      <div className="nebula-blob auric" />
      <div className="nebula-blob verdant" />
      <div className="nebula-blob nebula" />
      <canvas ref={canvasRef} />
    </div>
  );
}
