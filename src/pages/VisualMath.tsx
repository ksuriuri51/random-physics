import FourierEpicycles from "@/components/FourierEpicycles";
import MandelbrotFractal from "@/components/MandelbrotFractal";
import EquationReveal from "@/components/EquationReveal";

export default function VisualMath() {
  return (
    <div className="container py-12">
      <span className="text-xs uppercase tracking-widest text-verdant-300 font-semibold">
        Playable mathematics
      </span>
      <h1 className="text-4xl font-bold mb-2 mt-1">Visual Math</h1>
      <p className="text-muted-foreground mb-8 font-narrative max-w-2xl">
        Two games, not just two demos: compose a target curve out of rotating circles with as few
        frequencies as you can get away with, then dive into the Mandelbrot set's boundary and see
        how far the self-similarity goes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-3">Signal Architect</h2>
          <p className="text-sm text-muted-foreground mb-4 font-narrative">
            Any periodic curve can be rebuilt as a sum of rotating circles (epicycles). Pick a
            target, then pull the harmonics slider down — the fewer circles you need for full
            marks, the better you've understood how a Fourier series converges. Switch to Freehand
            to decompose a shape of your own.
          </p>
          <FourierEpicycles width={520} height={420} />
          <div className="mt-5">
            <EquationReveal
              steps={[
                { label: "Discrete Fourier Transform of the target curve", tex: "c_k = \\frac{1}{N}\\sum_{n=0}^{N-1} \\big(x_n + iy_n\\big)\\, e^{-i2\\pi kn/N}" },
                { label: "Each harmonic is one epicycle: amplitude and phase", tex: "|c_k| = \\text{radius},\\qquad \\arg(c_k) = \\text{initial phase}" },
                { label: "Reconstruction improves as more terms are summed", tex: "z_K(t) = \\sum_{k=0}^{K} c_k\\, e^{i2\\pi k t} \\;\\xrightarrow{K\\to N}\\; z(t)" },
              ]}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Fractal Explorer</h2>
          <p className="text-sm text-muted-foreground mb-4 font-narrative">
            The Mandelbrot set's boundary is infinitely detailed: click anywhere to zoom in, and the
            same iteration re-renders the neighborhood at higher magnification. Keep zooming — real,
            named regions and near-copies of the whole set are waiting at specific depths.
          </p>
          <MandelbrotFractal width={520} height={520} />
          <div className="mt-5">
            <EquationReveal
              steps={[
                { label: "The iteration itself", tex: "z_{n+1} = z_n^2 + c, \\qquad z_0 = 0" },
                { label: "A point c belongs to the set if the orbit stays bounded", tex: "c \\in M \\iff \\sup_n |z_n| < \\infty" },
                { label: "In practice: escape-time coloring", tex: "\\text{color}(c) \\propto \\min\\{n : |z_n| > 2\\}" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
