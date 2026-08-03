import type { EquationStep } from "@/components/EquationReveal";
import type { Application } from "@/components/TopicBlock";

export interface Topic {
  id: string;
  title: string;
  mode: "simulated" | "concept";
  narrative: string[];
  equations: EquationStep[];
  applications: Application[];
}

export const quantumTopics: Topic[] = [
  {
    id: "wave-mechanics",
    title: "Wave Mechanics",
    mode: "simulated",
    narrative: [
      "Quantum mechanics really kicked off when we stopped thinking of particles as tiny billiard balls and started seeing them as waves. Take a free particle—it doesn't just sit at one spot. It's more like a 'wave packet,' a mix of different momenta that naturally spreads out as time goes on. It's not just that our tools are messy; it's literally how the Schrödinger equation is built.",
    ],
    equations: [
      { label: "A Gaussian wave packet at t = 0", tex: "\\psi(x,0) = \\left(\\frac{1}{2\\pi\\sigma_0^2}\\right)^{1/4} e^{ik_0 x} e^{-x^2/4\\sigma_0^2}" },
      { label: "Free-particle time evolution (each plane-wave component picks up its own phase)", tex: "\\psi(x,t) = \\int \\phi(k)\\, e^{i(kx - \\omega(k) t)}\\, dk, \\qquad \\omega(k) = \\frac{\\hbar k^2}{2m}" },
      { label: "Resulting width growth — the packet spreads because different k's move at different phase speeds", tex: "\\sigma(t) = \\sigma_0\\sqrt{1 + \\left(\\frac{\\hbar t}{2m\\sigma_0^2}\\right)^2}" },
    ],
    applications: [
      { kind: "application", heading: "Why electron microscopes need short exposure and tight focusing", text: "If you try to squeeze a wave packet too tight (making σ₀ small), it just ends up spreading even faster. You see this trade-off all the time in electron-optics design, where you're constantly fighting to balance beam coherence with lens aberrations." },
    ],
  },
  {
    id: "schrodinger-equation",
    title: "Schrödinger Equation",
    mode: "concept",
    narrative: [
      "Think of the Schrödinger equation as the 'master rule' for how things move in the quantum world. We didn't really derive it from something deeper; we just kept using it because it works—every single experiment backs it up. Even something simple, like a particle stuck in a box, shows how weird things get: energy isn't continuous anymore, it comes in fixed steps.",
    ],
    equations: [
      { label: "Time-dependent Schrödinger equation", tex: "i\\hbar \\frac{\\partial \\Psi}{\\partial t} = \\hat{H}\\Psi = \\left(-\\frac{\\hbar^2}{2m}\\nabla^2 + V\\right)\\Psi" },
      { label: "Particle in a 1D box: boundary conditions force quantization", tex: "\\psi_n(x) = \\sqrt{\\tfrac{2}{L}}\\sin\\!\\left(\\tfrac{n\\pi x}{L}\\right), \\qquad E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}" },
    ],
    applications: [
      { kind: "invention", heading: "Quantum dots and LED color tuning", text: "Quantum dots are basically real-life 'particles in a box.' Because the size of the box dictates the energy levels, manufacturers can pick the exact color of an LED just by tweaking the dot's radius. That's how QLED TVs get those specific colors." },
    ],
  },
  {
    id: "operators",
    title: "Operators",
    mode: "concept",
    narrative: [
      "In the quantum realm, we don't just measure things with simple numbers. Instead, everything—position, momentum, energy—is handled by 'operators.' The results we actually see are the eigenvalues of these operators. If two operators don't 'commute,' you literally can't measure them both perfectly at once. That's the real math behind the uncertainty principle.",
    ],
    equations: [
      { label: "Position and momentum operators", tex: "\\hat{x}\\psi = x\\psi, \\qquad \\hat{p} = -i\\hbar\\frac{\\partial}{\\partial x}" },
      { label: "Canonical commutation relation", tex: "[\\hat{x},\\hat{p}] = \\hat x\\hat p - \\hat p \\hat x = i\\hbar" },
      { label: "Generalized uncertainty relation from any commutator", tex: "\\Delta A\\, \\Delta B \\ge \\frac{1}{2}\\left|\\langle[\\hat{A},\\hat{B}]\\rangle\\right| \\;\\Rightarrow\\; \\Delta x\\,\\Delta p \\ge \\frac{\\hbar}{2}" },
    ],
    applications: [
      { kind: "application", heading: "MRI", text: "MRI machines are basically giant magnets that mess with the spin operators of hydrogen atoms in your body. By using radio pulses and watching how those states evolve over time, we can build a picture of what's going on inside you." },
    ],
  },
  {
    id: "spin",
    title: "Spin",
    mode: "concept",
    narrative: [
      "Spin is one of those things that doesn't have a 'normal' world equivalent. It's not like a ball spinning; it's just a built-in property that particles have. Back in 1922, the Stern–Gerlach experiment proved this by showing silver atoms don't just smear out in a magnetic field—they snap into two very specific spots.",
    ],
    equations: [
      { label: "Spin-1/2 operators (Pauli matrices, up to ħ/2)", tex: "\\hat{S}_z = \\frac{\\hbar}{2}\\begin{pmatrix}1 & 0 \\\\ 0 & -1\\end{pmatrix}" },
      { label: "Only two possible measured values along any axis", tex: "\\hat{S}_z|\\!\\uparrow\\rangle = +\\tfrac{\\hbar}{2}|\\!\\uparrow\\rangle, \\qquad \\hat{S}_z|\\!\\downarrow\\rangle = -\\tfrac{\\hbar}{2}|\\!\\downarrow\\rangle" },
    ],
    applications: [
      { kind: "invention", heading: "The Stern–Gerlach apparatus", text: "That 1922 setup is still the classic way to show quantization. Modern versions of it are used to create spin-polarized electron beams for high-tech research and detectors." },
      { kind: "application", heading: "Hard drives (giant magnetoresistance)", text: "Your hard drive actually uses electron spin to read data, not just electric charge. The discovery of 'giant magnetoresistance' is what allowed us to pack terabytes of data into such small spaces." },
    ],
  },
  {
    id: "angular-momentum",
    title: "Angular Momentum",
    mode: "concept",
    narrative: [
      "Orbital angular momentum is quantized for the same reason energy is—it all comes down to the boundaries. If a wavefunction goes around in a circle, it has to end up exactly where it started. That only happens if you have integer multiples of ħ.",
    ],
    equations: [
      { label: "Quantized orbital angular momentum magnitude and projection", tex: "L^2|l,m\\rangle = \\hbar^2 l(l+1)|l,m\\rangle, \\qquad L_z|l,m\\rangle = \\hbar m|l,m\\rangle" },
      { label: "Addition of angular momenta (Clebsch–Gordan coupling, schematically)", tex: "|j_1 - j_2| \\le j \\le j_1+j_2" },
    ],
    applications: [
      { kind: "application", heading: "Atomic spectral line structure", text: "The tiny splits you see in atomic spectra—which we use for everything from atomic clocks to figuring out what stars are made of—come from how spin and orbital angular momentum interact with each other." },
    ],
  },
  {
    id: "perturbation-theory",
    title: "Perturbation Theory",
    mode: "concept",
    narrative: [
      "To be honest, we can only solve a tiny number of quantum problems exactly. For everything else, we use perturbation theory. We start with a simple system we understand, add a tiny 'nudge' or correction, and then calculate how much that shifts things without having to start from scratch.",
    ],
    equations: [
      { label: "Hamiltonian split into solvable part plus small perturbation", tex: "\\hat{H} = \\hat{H}_0 + \\lambda \\hat{H}'" },
      { label: "First-order energy correction", tex: "E_n^{(1)} = \\langle \\psi_n^{(0)} | \\hat{H}' | \\psi_n^{(0)} \\rangle" },
    ],
    applications: [
      { kind: "invention", heading: "The atomic clock", text: "Even the energy levels in a hydrogen atom need these tiny corrections to be accurate. We have to model these 'perturbations' perfectly to define the exact frequency of a cesium atom, which is what keeps GPS and global time in sync." },
    ],
  },
  {
    id: "quantum-field-theory",
    title: "Quantum Field Theory",
    mode: "concept",
    narrative: [
      "Quantum field theory takes things a step further. Instead of particles just flying through empty space, imagine the whole universe is filled with fields. What we call 'particles' are really just ripples in those fields. An electron is just a tiny wave in the electron field, and a photon is a ripple in the electromagnetic field.",
    ],
    equations: [
      { label: "Klein–Gordon equation for a scalar field (relativistic quantum wave equation)", tex: "\\left(\\Box + \\frac{m^2c^2}{\\hbar^2}\\right)\\phi = 0, \\qquad \\Box = \\frac{1}{c^2}\\frac{\\partial^2}{\\partial t^2} - \\nabla^2" },
      { label: "Field expanded in creation/annihilation operators", tex: "\\hat\\phi(x) = \\int \\frac{d^3k}{(2\\pi)^3}\\frac{1}{\\sqrt{2\\omega_k}}\\left(\\hat{a}_k e^{ikx} + \\hat{a}_k^\\dagger e^{-ikx}\\right)" },
    ],
    applications: [
      { kind: "invention", heading: "The Large Hadron Collider and the Higgs discovery", text: "Finding the Higgs boson in 2012 basically confirmed that there's a field everywhere that gives particles their mass. It was a QFT prediction from way back in the 60s that we finally managed to test." },
      { kind: "scifi", heading: "Vacuum energy propulsion", text: "QFT says even 'empty' space has some energy (the Casimir effect proves it). Sci-fi writers love the idea of using this 'vacuum energy' for space travel, though we don't actually know how to do that yet." },
    ],
  },
  {
    id: "quantum-information",
    title: "Quantum Information",
    mode: "concept",
    narrative: [
      "A normal bit is just a 0 or a 1. But a qubit? It can be both at the same time. And when you entangle two qubits, they share a connection that doesn't exist in the classical world. If you measure one, you instantly know what the other one is doing, no matter how far apart they are.",
    ],
    equations: [
      { label: "General qubit state", tex: "|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad |\\alpha|^2+|\\beta|^2=1" },
      { label: "A maximally entangled Bell pair", tex: "|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}\\left(|00\\rangle + |11\\rangle\\right)" },
      { label: "No-cloning theorem (why quantum information can't simply be copied)", tex: "\\nexists\\; U \\text{ such that } U(|\\psi\\rangle\\otimes|0\\rangle) = |\\psi\\rangle\\otimes|\\psi\\rangle \\;\\; \\forall |\\psi\\rangle" },
    ],
    applications: [
      { kind: "invention", heading: "Quantum key distribution (BB84)", text: "Thanks to the 'no-cloning theorem,' you can't spy on a quantum key without leaving a trace. It's a real-world security protocol that uses quantum physics to make encryption much harder to crack." },
    ],
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    mode: "simulated",
    narrative: [
      "You can picture a qubit's state as a point on a sphere—we call it the Bloch sphere. The poles are the 0s and 1s, and everything else is a superposition. Quantum computers work by rotating these points and entangling them so that the wrong answers cancel each other out and the right one stands out.",
    ],
    equations: [
      { label: "Bloch sphere coordinates from the qubit amplitudes", tex: "|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\tfrac{\\theta}{2}|1\\rangle" },
      { label: "Hadamard gate: rotates |0⟩ into equal superposition", tex: "H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}, \\qquad H|0\\rangle = \\frac{|0\\rangle+|1\\rangle}{\\sqrt{2}}" },
      { label: "Why quantum computers can outpace classical ones on specific problems", tex: "\\text{RSA factoring: } O\\!\\left(e^{(\\log N)^{1/3}}\\right) \\;\\xrightarrow{\\text{Shor's algorithm}}\\; O\\!\\left((\\log N)^3\\right)" },
    ],
    applications: [
      { kind: "application", heading: "Shor's algorithm and cryptography", text: "Shor's algorithm is famous because it could factor big numbers way faster than any normal computer. That's why experts are already working on 'post-quantum' security to stay ahead of the game." },
    ],
  },
  {
    id: "quantum-optics",
    title: "Quantum Optics",
    mode: "concept",
    narrative: [
      "Quantum optics is all about looking at light one photon at a time. When you get down to that level, the old rules for waves don't quite cut it anymore. We can even 'squeeze' light to reduce noise in one area, though it means we have to accept more noise somewhere else.",
    ],
    equations: [
      { label: "Photon number states of a quantized field mode", tex: "\\hat{a}^\\dagger|n\\rangle = \\sqrt{n+1}\\,|n+1\\rangle, \\qquad \\hat{a}|n\\rangle = \\sqrt{n}\\,|n-1\\rangle" },
      { label: "Standard quantum (shot-noise) limit for a coherent state", tex: "\\Delta n\\, \\Delta \\phi \\ge \\tfrac{1}{2}" },
    ],
    applications: [
      { kind: "invention", heading: "Squeezed light in gravitational-wave detectors", text: "LIGO actually uses 'squeezed' light to make its measurements even more precise. It's a pretty wild quantum trick that helps us detect gravitational waves from the far reaches of space." },
    ],
  },
];
