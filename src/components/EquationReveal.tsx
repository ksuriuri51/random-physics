import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { RotateCcw } from "lucide-react";
import Equation from "./Equation";

export interface EquationStep {
  /** Short label like "Newton's second law" or "Integrate over the horizon" */
  label?: string;
  /** LaTeX source for this step of the derivation */
  tex: string;
}

interface EquationRevealProps {
  steps: EquationStep[];
  /** ms between each step appearing */
  intervalMs?: number;
  className?: string;
  /** Raw hex color (not a Tailwind class) used for the replay icon, since this
   * is chosen dynamically per volume and dynamic Tailwind class names aren't
   * picked up by the build-time JIT scanner. */
  accentColor?: string;
}

/**
 * Reveals a chain of equations one step at a time, as though the derivation
 * is being computed live — rather than character-typing raw LaTeX (which
 * would render as broken syntax mid-string), each *complete* step fades and
 * slides in in sequence, with a blinking cursor on the newest line. This is
 * the mechanism behind "do not hide the math" across every simulation.
 */
export default function EquationReveal({
  steps,
  intervalMs = 650,
  className = "",
  accentColor = "#DCB55F",
}: EquationRevealProps) {
  const [revealed, setRevealed] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start the reveal once the block scrolls into view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (revealed >= steps.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), intervalMs);
    return () => clearTimeout(t);
  }, [started, revealed, steps.length, intervalMs]);

  const replay = () => {
    setRevealed(0);
    setStarted(true);
  };

  const done = revealed >= steps.length;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="space-y-2">
        {steps.slice(0, revealed).map((step, i) => {
          const isActive = i === revealed - 1 && !done;
          return (
            <div key={i} className="animate-fade-slide-up">
              {step.label && (
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                  {step.label}
                </div>
              )}
              <div
                className={`rounded-md px-3 py-2 bg-black/25 border ${
                  i === steps.length - 1 && done ? "border-white/20" : "border-transparent"
                } ${isActive ? "eq-cursor" : ""}`}
                style={isActive ? ({ "--eq-cursor-color": accentColor } as CSSProperties) : undefined}
              >
                <Equation tex={step.tex} display />
              </div>
            </div>
          );
        })}
      </div>

      {!started && (
        <div className="text-xs text-muted-foreground italic">Scroll to derive…</div>
      )}

      {done && steps.length > 0 && (
        <button
          onClick={replay}
          className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" style={{ color: accentColor }} /> Replay derivation
        </button>
      )}
    </div>
  );
}
