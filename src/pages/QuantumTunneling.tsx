import KeplersLawRegression from "@/components/KeplersLawRegression";
import EquationReveal from "@/components/EquationReveal";
import TopicBlock from "@/components/TopicBlock";

export default function QuantumTunneling() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-2">Quantum Tunneling</h1>
      <p className="text-muted-foreground mb-8 font-narrative max-w-2xl">
        Two ways a physical result can seem impossible until you follow the mathematics: a machine
        learning algorithm rediscovering Kepler's law from raw data with no physics built in, and a
        particle passing through a barrier it classically could never cross.
      </p>

      <div className="max-w-4xl mb-4">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <h2 className="text-2xl font-bold">AI Discovers Kepler's Third Law</h2>
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-verdant-300/50 text-verdant-300">
            Live simulation
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-6 font-narrative">
          Kepler's Third Law states that the square of a planet's orbital period is proportional to
          the cube of its semi-major axis: T² ∝ a³. Run the regression below and watch a power-law
          fitting algorithm analyze planetary data and derive that relationship from scratch — the
          same kind of pattern-discovery that modern ML-for-science pipelines use to find laws no one
          has written down yet.
        </p>
        <KeplersLawRegression width={700} height={500} />

        <div className="mt-6">
          <EquationReveal
            steps={[
              { label: "Model: fit a power law to the data", tex: "T = a \\cdot x^{\\,b}" },
              { label: "Linearize by taking logarithms", tex: "\\log T = \\log a + b\\,\\log x" },
              { label: "Ordinary least squares on the linearized data", tex: "b = \\frac{\\sum (\\log x_i - \\overline{\\log x})(\\log T_i - \\overline{\\log T})}{\\sum (\\log x_i - \\overline{\\log x})^2}" },
              { label: "Recovered exponent converges to Kepler's value", tex: "b \\;\\longrightarrow\\; 1.5 = \\tfrac{3}{2}" },
            ]}
          />
        </div>
      </div>

      <TopicBlock
        id="quantum-tunneling-concept"
        title="Quantum Tunneling"
        mode="concept"
        accent="verdant"
        narrative={[
          "Classically, a ball without enough energy to clear a hill simply rolls back down. Quantum mechanically, a particle's wavefunction doesn't stop dead at a barrier — it decays exponentially inside it but can emerge on the other side with reduced but nonzero amplitude. There is a real, calculable probability of finding the particle where classical physics says it's forbidden to be.",
        ]}
        equations={[
          { label: "Schrödinger equation inside a barrier of height V₀ > E", tex: "-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + V_0\\psi = E\\psi" },
          { label: "Solution decays rather than oscillates inside the barrier", tex: "\\psi(x) = Ce^{-\\kappa x}, \\qquad \\kappa = \\frac{\\sqrt{2m(V_0-E)}}{\\hbar}" },
          { label: "Transmission probability through a barrier of width L (WKB approximation)", tex: "T \\approx e^{-2\\kappa L} = \\exp\\!\\left(-\\frac{2L}{\\hbar}\\sqrt{2m(V_0-E)}\\right)" },
        ]}
        applications={[
          { kind: "invention", heading: "The scanning tunneling microscope", text: "The STM (1981 Nobel Prize) measures the exponentially sensitive tunneling current between a sharp tip and a surface just angstroms away — sensitive enough to image, and even move, individual atoms." },
          { kind: "application", heading: "Alpha decay and stellar fusion", text: "Alpha particles escape a nucleus by tunneling through the strong-force barrier (explaining decay rates that classical physics couldn't); the Sun's core similarly relies on protons tunneling through their mutual electrostatic repulsion to fuse at temperatures otherwise too low to allow it." },
        ]}
      />
    </div>
  );
}
