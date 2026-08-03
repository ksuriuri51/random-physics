import { useEffect } from "react";

const changelog = [
  {
    tag: "current",
    title: "Signal Architect & Fractal Explorer",
    text:
      "I turned Visual Math from a couple of static demos into two actual games. Now you can try to hit 3 stars on a curve using as few circles as possible, or hunt for cool spots like Seahorse Valley in the Mandelbrot set.",
  },
  {
    tag: "fix",
    title: "The black-canvas bug",
    text:
      "A bunch of my canvas components were breaking because they were trying to read colors the wrong way at runtime. It meant things like the double pendulum were just showing up as solid black. I've swapped those out for fixed colors so it won't happen again.",
  },
  
  {
    tag: "added",
    title: "Black Hole Physics, volume 3",
    text:
      "Added fourteen new topics, covering everything from Hawking radiation to gravitational waves. This is definitely the most advanced section I've built so far.",
  },
  {
    tag: "started",
    title: "Three university-level simulations",
    text:
      "This whole thing actually started as a single HTML file with just a few lab experiments—like Rolling Motion and Kater's Pendulum—that I wanted to be able to play with instead of just reading about in a textbook.",
  },
];

const roadmap = [
  "Working on a fourth volume for statistical mechanics and thermo—just need to finish the actual coursework first!",
  "Thinking about adding a way to export the math derivations as PDFs for anyone who wants to keep them.",
  "Need to add a save-state for the Fractal Explorer so you don't lose your progress when you refresh.",
  "Still tweaking the mobile layout for topic pages; those equation panels can be a bit of a squeeze on smaller screens.",
];

export default function Notes() {
  useEffect(() => {
    console.log(
      "%cfound the easter egg — the double pendulum's Lagrangian is in src/lib/physics.ts",
      "color:#DCB55F"
    );
  }, []);

  return (
    <div className="container py-16 max-w-3xl">
      <span className="text-xs uppercase tracking-widest text-auric-300 font-semibold">Notes</span>
      <h1 className="text-4xl font-bold mt-2 mb-4">How I built this</h1>
      <p className="text-muted-foreground font-narrative mb-14 leading-relaxed">
        This is just a solo project I've been working on. I'm a physics engineering student, and I really 
        just wanted to see the equations I was learning come to life. No big team or agency behind this—just 
        me keeping a running list of what I've changed and why, keeping it as honest as I can.
      </p>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">Changelog</h2>
        <ol className="relative border-l border-white/10 pl-6 space-y-8">
          {changelog.map((entry, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[1.65rem] top-1 w-2.5 h-2.5 rounded-full bg-auric-300" />
              <span className="text-xs uppercase tracking-wide text-auric-300 font-semibold">{entry.tag}</span>
              <h3 className="text-lg font-semibold mt-1 mb-1">{entry.title}</h3>
              <p className="text-sm text-muted-foreground font-narrative leading-relaxed">{entry.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">What's next</h2>
        <ul className="space-y-3">
          {roadmap.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground font-narrative">
              <span className="text-verdant-300 font-mono mt-0.5">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Credits</h2>
        <p className="text-sm text-muted-foreground font-narrative leading-relaxed">
          The equations are rendered using{" "}
          <a href="https://katex.org" target="_blank" rel="noreferrer" className="text-auric-300 hover:underline">
            KaTeX
          </a>
          . The site itself is built with React, TypeScript, and Vite. I've checked the physics against 
          the same textbooks I use for my classes—any mistakes are definitely mine, not the sources'. 
          If you find one, please open an issue on the repo!
        </p>
      </section>
    </div>
  );
}
