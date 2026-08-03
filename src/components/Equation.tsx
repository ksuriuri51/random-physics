import { useEffect, useRef } from "react";

interface EquationProps {
  tex: string;
  display?: boolean;
  className?: string;
}

/**
 * Renders one LaTeX expression via KaTeX (loaded globally from a CDN script
 * in index.html — see the typography note there for why it's not an npm
 * dependency). Falls back to showing the raw source if KaTeX hasn't finished
 * loading yet, then re-renders once it has.
 */
export default function Equation({ tex, display = true, className = "" }: EquationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryRender = () => {
      if (cancelled || !ref.current) return;
      if (window.katex) {
        try {
          window.katex.render(tex, ref.current, {
            throwOnError: false,
            displayMode: display,
            strict: false,
          });
        } catch {
          if (ref.current) ref.current.textContent = tex;
        }
      } else if (attempts < 40) {
        attempts += 1;
        setTimeout(tryRender, 100);
      }
    };

    tryRender();
    return () => {
      cancelled = true;
    };
  }, [tex, display]);

  return <div ref={ref} className={className}>{tex}</div>;
}
