import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import CosmicBackground from "@/components/CosmicBackground";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <CosmicBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-auric-300 to-nova-500 rounded-md flex items-center justify-center shadow-[0_0_16px_rgba(220,181,95,0.5)]">
              <span className="text-background font-bold text-sm">Φ</span>
            </div>
            <span className="font-bold text-sm hidden sm:inline tracking-wide">PhysicsLab</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/classical-mechanics">Classical</NavLink>
            <NavLink to="/quantum">Quantum</NavLink>
            <NavLink to="/black-holes">Black Holes</NavLink>
            <NavLink to="/visual-math">Visual Math</NavLink>
            <NavLink to="/quantum-tunneling">Quantum Tunneling</NavLink>
            <NavLink to="/notes">Notes</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground px-4">
          <p>
            Built solo, topic by topic, mostly late at night.
          </p>
          <Link to="/notes" className="hover:text-foreground transition-colors">
            Changelog & credits
          </Link>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
    >
      {children}
    </Link>
  );
}
