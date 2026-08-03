import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DoublePendulumCanvas from "@/components/DoublePendulumCanvas";

const doodles = [
  { text: "E = mc²", top: "8%", left: "4%", rot: -8, size: "text-lg" },
  { text: "∇×B = μ₀J", top: "18%", left: "82%", rot: 6, size: "text-sm" },
  { text: "ψ(x,t)", top: "68%", left: "88%", rot: -5, size: "text-base" },
  { text: "Gμν = 8πG/c⁴ Tμν", top: "80%", left: "6%", rot: 4, size: "text-xs" },
  { text: "iħ∂Ψ/∂t = ĤΨ", top: "4%", left: "45%", rot: -3, size: "text-xs" },
  { text: "S = k_B ln Ω", top: "88%", left: "48%", rot: 7, size: "text-sm" },
];

const volumes = [
  {
    title: "Classical Physics",
    label: "Vol. 1 · 12 topics",
    description:
      "I've put together everything from rolling motion to coupled oscillators here. There's even a double pendulum you can mess around with—full derivations included.",
    to: "/classical-mechanics",
    accent: "auric" as const,
    span: "lg:col-span-7",
  },
  {
    title: "Black Hole Physics",
    label: "Vol. 3 · 14 topics",
    description:
      "This one dives into Einstein's field equations and event horizons. I even added a slider so you can see how gravitational lensing actually bends light.",
    to: "/black-holes",
    accent: "nebula" as const,
    span: "lg:col-span-5",
  },
  {
    title: "Quantum Physics",
    label: "Vol. 2 · 10 topics",
    description:
      "Check out how a wave packet spreads in real time, or explore the Bloch sphere. I've also laid out Shor's algorithm step by step.",
    to: "/quantum",
    accent: "verdant" as const,
    span: "lg:col-span-4",
  },
  {
    title: "Signal Architect & Fractal Explorer",
    label: "Visual Math",
    description:
      "Two little games I built: one where you rebuild curves using rotating circles, and another where you can zoom into the Mandelbrot set until things get weird.",
    to: "/visual-math",
    accent: "verdant" as const,
    span: "lg:col-span-4",
  },
  {
    title: "Quantum Tunneling",
    label: "+ AI rediscovers Kepler",
    description:
      "Watch an AI model figure out Kepler's third law from scratch, then see particles tunnel through barriers they really shouldn't be able to cross.",
    to: "/quantum-tunneling",
    accent: "auric" as const,
    span: "lg:col-span-4",
  },
];

const accentStyles = {
  auric: { border: "hover:border-auric-300/60", text: "group-hover:text-auric-300", tag: "text-auric-300" },
  verdant: { border: "hover:border-verdant-300/60", text: "group-hover:text-verdant-300", tag: "text-verdant-300" },
  nebula: { border: "hover:border-nebula-300/60", text: "group-hover:text-nebula-100", tag: "text-nebula-300" },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Floating equation doodles — the "chaotic science" texture */}
        {doodles.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`hidden md:block absolute font-mono text-auric-300/20 select-none pointer-events-none ${d.size}`}
            style={{ top: d.top, left: d.left, transform: `rotate(${d.rot}deg)` }}
          >
            {d.text}
          </span>
        ))}

        <div className="container relative">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <span className="text-xs uppercase tracking-widest text-auric-300 font-semibold">
                36 topics · 3 volumes · derived live, not just stated
              </span>
              <h1 className="text-5xl font-bold mb-4 mt-2 leading-tight text-balance">
                Every simulation here shows you the <span className="text-auric-300">math</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 font-narrative">
                I didn't want to just show animations—I wanted to show how they work. No simulation starts 
                until its governing equation has finished typing itself out. Take the double pendulum 
                below: its chaos and the Lagrangian behind it are right there for you to see.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Link to="/classical-mechanics">
                  <Button className="bg-auric-300 text-nebula-900 hover:opacity-90 px-6 py-3">
                    Start with Classical Mechanics
                  </Button>
                </Link>
                <Link to="/notes" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-white/20">
                  or see how I built this →
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="rounded-2xl glass-panel p-3 shadow-[0_0_50px_-15px_rgba(220,181,95,0.3)]">
                <DoublePendulumCanvas width={380} height={380} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-2">Pick a volume</h2>
          <p className="text-muted-foreground mb-10 font-narrative max-w-xl">
            You can jump in anywhere. Classical mechanics is probably the easiest place to start, 
            while the black hole section gets into some pretty heavy tensor math.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {volumes.map((v) => (
              <NavCard key={v.to} {...v} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function NavCard({
  title,
  label,
  description,
  to,
  accent,
  span,
}: {
  title: string;
  label: string;
  description: string;
  to: string;
  accent: keyof typeof accentStyles;
  span: string;
}) {
  const s = accentStyles[accent];
  return (
    <Link
      to={to}
      className={`group block p-6 rounded-lg glass-panel border border-white/10 ${s.border} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 ${span}`}
    >
      <span className={`text-xs uppercase tracking-wide font-semibold ${s.tag}`}>{label}</span>
      <h3 className={`text-xl font-bold mt-1 mb-2 transition-colors ${s.text}`}>{title}</h3>
      <p className="text-sm text-muted-foreground font-narrative">{description}</p>
      <span className={`inline-block mt-3 text-xs font-semibold ${s.tag} opacity-0 group-hover:opacity-100 transition-opacity`}>
        Enter →
      </span>
    </Link>
  );
}
