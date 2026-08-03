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

export const classicalTopics: Topic[] = [
  {
    id: "mechanics",
    title: "Mechanics",
    mode: "simulated",
    narrative: [
      "The double pendulum you see below is probably the best way to show that just because we know the rules doesn't mean we can predict the outcome. It's just two arms and two weights, but if you start them even a tiny bit differently, they'll be doing completely different things in a matter of seconds.",
      "Newton's laws are still in charge here—there's no magic involved. The chaos just comes from how the two arms pull on each other. That nonlinear 'sine' term in the math makes everything beautifully messy.",
    ],
    equations: [
      { label: "Lagrangian of the system", tex: "\\mathcal{L} = T - V = \\tfrac{1}{2}(m_1+m_2)L_1^2\\dot\\theta_1^2 + \\tfrac{1}{2}m_2L_2^2\\dot\\theta_2^2 + m_2L_1L_2\\dot\\theta_1\\dot\\theta_2\\cos(\\theta_1-\\theta_2) + (m_1+m_2)gL_1\\cos\\theta_1 + m_2gL_2\\cos\\theta_2" },
      { label: "Euler–Lagrange equation, applied per coordinate", tex: "\\frac{d}{dt}\\frac{\\partial \\mathcal{L}}{\\partial \\dot\\theta_i} - \\frac{\\partial \\mathcal{L}}{\\partial \\theta_i} = 0" },
      { label: "Resulting angular acceleration of arm 1", tex: "\\ddot\\theta_1 = \\frac{-g(2m_1+m_2)\\sin\\theta_1 - m_2 g \\sin(\\theta_1-2\\theta_2) - 2\\sin(\\theta_1-\\theta_2)m_2(\\dot\\theta_2^2 L_2 + \\dot\\theta_1^2 L_1\\cos(\\theta_1-\\theta_2))}{L_1(2m_1+m_2-m_2\\cos(2\\theta_1-2\\theta_2))}" },
      { label: "Integrated numerically with 4th-order Runge–Kutta", tex: "y_{n+1} = y_n + \\tfrac{1}{6}(k_1+2k_2+2k_3+k_4)\\,\\Delta t" },
    ],
    applications: [
      { kind: "application", heading: "Why simulations use RK4, not Euler's method", text: "If we used a simple Euler method, the pendulum would slowly gain or lose energy until it looked completely wrong. RK4 is way more accurate, which is why the simulation stays realistic for a long time." },
      { kind: "application", heading: "Chaos theory beyond the lab bench", text: "This same 'sensitivity' is why weather forecasts are great for a few days but useless for months. It's not that we don't know the physics; it's just that there are so many variables pulling on each other, just like our pendulum." },
    ],
  },
  {
    id: "rotational-motion",
    title: "Rotational Motion",
    mode: "concept",
    narrative: [
      "Rotational motion is basically a mirror of normal movement: force becomes torque, mass becomes inertia, and speed becomes angular velocity. It all works because angular momentum stays the same as long as nothing from the outside is twisting the system.",
      "This is why a spinning skater speeds up when they pull their arms in, and why a bicycle is much easier to keep upright when you're actually moving.",
    ],
    equations: [
      { label: "Torque as the rotational analogue of force", tex: "\\vec{\\tau} = \\vec{r} \\times \\vec{F} = I\\vec{\\alpha}" },
      { label: "Angular momentum", tex: "\\vec{L} = I\\vec\\omega, \\qquad \\frac{d\\vec{L}}{dt} = \\vec\\tau_{\\text{ext}}" },
      { label: "Conservation when net external torque vanishes", tex: "\\vec\\tau_{\\text{ext}} = 0 \\;\\Rightarrow\\; I_1\\omega_1 = I_2\\omega_2" },
    ],
    applications: [
      { kind: "invention", heading: "The gyrocompass", text: "A spinning rotor really hates changing its direction. We use this 'rigidity' to build gyrocompasses that point to true north without needing magnets—essential for ships and planes even today." },
      { kind: "application", heading: "Flywheel energy storage", text: "Some systems store energy just by spinning a heavy wheel really fast. It's a clean way to hold onto power and release it almost instantly when needed." },
    ],
  },
  {
    id: "gravitation",
    title: "Gravitation",
    mode: "concept",
    narrative: [
      "Newton's gravity law is pretty simple, but it's powerful enough to explain everything from falling apples to the orbits of distant planets. Kepler had already spotted the patterns, but Newton was the one who showed that a single 'inverse-square' rule makes all those patterns fall into place.",
    ],
    equations: [
      { label: "Newton's law of universal gravitation", tex: "F = \\frac{Gm_1m_2}{r^2}" },
      { label: "Kepler's third law, derived from circular-orbit balance", tex: "\\frac{Gm_1m_2}{r^2} = \\frac{m_2 v^2}{r} = m_2\\omega^2 r \\;\\Rightarrow\\; T^2 = \\frac{4\\pi^2}{Gm_1}a^3" },
      { label: "Orbital (escape) velocity", tex: "v_{\\text{esc}} = \\sqrt{\\frac{2Gm_1}{r}}" },
    ],
    applications: [
      { kind: "application", heading: "GPS orbit design", text: "GPS satellites are parked at a very specific altitude so they orbit the Earth exactly twice a day. It's a direct use of Kepler's third law to make sure the satellites are always where we expect them to be." },
      { kind: "invention", heading: "The slingshot (gravity assist)", text: "Space probes like Voyager use a planet's gravity to gain speed for free. It's a clever trick that only works because gravity is a conservative force that acts over long distances." },
    ],
  },
  {
    id: "oscillations",
    title: "Oscillations",
    mode: "simulated",
    narrative: [
      "Almost any stable system will oscillate if you give it a little nudge. That's because near a stable point, most forces look like a simple spring. The mass-on-a-spring you see here is the classic example, but the same math works for a guitar string or even atoms vibrating in a crystal.",
    ],
    equations: [
      { label: "Hooke's law restoring force", tex: "F = -kx" },
      { label: "Newton's second law gives the SHM differential equation", tex: "m\\ddot{x} = -kx \\;\\;\\Longrightarrow\\;\\; \\ddot{x} + \\omega_0^2 x = 0, \\quad \\omega_0 = \\sqrt{k/m}" },
      { label: "General solution", tex: "x(t) = A\\cos(\\omega_0 t + \\phi)" },
      { label: "With damping and driving added", tex: "\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = \\frac{F_0}{m}\\cos(\\omega t)" },
    ],
    applications: [
      { kind: "invention", heading: "The quartz oscillator", text: "Quartz crystals have a super stable mechanical vibration. We use them in almost every clock and computer to keep time perfectly by dividing that fast vibration down to seconds." },
      { kind: "application", heading: "Resonance and structural design", text: "Engineers have to be careful that buildings and bridges don't have a 'natural frequency' that matches the wind or footsteps. If they do, the oscillations can grow until the whole thing collapses." },
    ],
  },
  {
    id: "waves",
    title: "Waves",
    mode: "simulated",
    narrative: [
      "A wave is just energy traveling through space without taking the matter with it. The coolest part is 'superposition'—when two waves meet, they just add together. That's how we get things like interference, standing waves, and those 'beats' you hear when tuning a guitar.",
      "The panel shows how two waves of slightly different frequencies create a beat pattern. It's the same physics that lets you tune an instrument just by listening.",
    ],
    equations: [
      { label: "The wave equation", tex: "\\partial^2 y / \\partial t^2 = v^2 \\partial^2 y / \\partial x^2" },
      { label: "Superposition of two waves of nearly equal frequency", tex: "y = A\\sin(k_1x - \\omega_1 t) + A\\sin(k_2x-\\omega_2t) = 2A\\cos\\!\\left(\\tfrac{\\Delta\\omega}{2}t\\right)\\sin(\\bar{k}x - \\bar\\omega t)" },
      { label: "Beat frequency, from the envelope term", tex: "f_{\\text{beat}} = |f_1 - f_2|" },
      { label: "Standing wave from a wave and its reflection", tex: "y = 2A\\sin(kx)\\cos(\\omega t), \\qquad \\text{nodes at } x = \\tfrac{n\\lambda}{2}" },
    ],
    applications: [
      { kind: "application", heading: "Tuning by beats", text: "Musicians listen for that 'wah-wah' sound to slow down and disappear when they're tuning. When the beats stop, you know the two notes are perfectly in sync." },
      { kind: "invention", heading: "Ultrasound and sonar", text: "Both of these rely on waves bouncing off objects. By measuring how long it takes for the wave to come back and how its frequency changed, we can figure out distance and speed." },
    ],
  },
  {
    id: "fluid-mechanics",
    title: "Fluid Mechanics",
    mode: "concept",
    narrative: [
      "Fluids follow the same rules as everything else—mass and energy don't just vanish. But the way we track them is different. Bernoulli's equation is really just energy conservation for a flowing liquid: if it speeds up, the pressure has to drop.",
    ],
    equations: [
      { label: "Continuity (mass conservation) for incompressible flow", tex: "A_1 v_1 = A_2 v_2" },
      { label: "Bernoulli's equation", tex: "P + \\tfrac{1}{2}\\rho v^2 + \\rho g h = \\text{const}" },
    ],
    applications: [
      { kind: "invention", heading: "Airfoil lift (in part)", text: "Air moves faster over the top of a wing, which drops the pressure. That pressure difference, along with the air being pushed down, is what keeps a heavy plane in the sky." },
      { kind: "invention", heading: "The carburetor and Venturi meter", text: "By narrowing a pipe, you force the fluid to speed up and drop its pressure. We use this trick to draw fuel into an engine or to measure how fast a liquid is flowing." },
    ],
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    mode: "concept",
    narrative: [
      "Thermodynamics was actually figured out by people trying to build better steam engines long before we knew about atoms. The laws are basically bookkeeping: the first law says you can't create energy, and the second law says some things only happen in one direction.",
    ],
    equations: [
      { label: "First law of thermodynamics", tex: "\\Delta U = Q - W" },
      { label: "Efficiency of an ideal (Carnot) heat engine", tex: "\\eta_{\\max} = 1 - \\frac{T_C}{T_H}" },
      { label: "Second law, in entropy form", tex: "\\Delta S_{\\text{universe}} \\ge 0" },
    ],
    applications: [
      { kind: "invention", heading: "The steam engine and Carnot's limit", text: "Carnot figured out there's a hard limit on how efficient any engine can be. No matter how good your engineering is, you can't beat this theoretical ceiling." },
      { kind: "application", heading: "Refrigeration", text: "A fridge is just a heat engine running in reverse. It uses work to force heat to move from cold to hot, which is the only way to beat the second law's natural direction." },
    ],
  },
  {
    id: "statistical-mechanics",
    title: "Statistical Mechanics",
    mode: "concept",
    narrative: [
      "Statistical mechanics explains the 'why' behind thermodynamics. Entropy increases not because of some hidden force, but just because it's overwhelmingly more likely. There are just way more ways for a system to be messy than to be organized.",
    ],
    equations: [
      { label: "Boltzmann's entropy formula", tex: "S = k_B \\ln \\Omega" },
      { label: "Boltzmann distribution over energy states", tex: "P(E_i) = \\frac{e^{-E_i/k_BT}}{Z}, \\qquad Z = \\sum_i e^{-E_i/k_BT}" },
    ],
    applications: [
      { kind: "application", heading: "Semiconductor doping", text: "We use these distributions to predict how many electrons can move through a silicon chip at a certain temperature. It's the basic math that makes every transistor work." },
      { kind: "application", heading: "Why S = k_B ln Ω reappears at black hole horizons", text: "This same logic—that entropy counts hidden possibilities—is what physicists used to understand black holes. It's a bridge between the very small and the very large." },
    ],
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    mode: "concept",
    narrative: [
      "Maxwell's four equations managed to pull electricity, magnetism, and light all into one single theory. He even predicted that light is just a wave of electric and magnetic fields traveling through space at a speed that matched what people were measuring in labs.",
    ],
    equations: [
      { label: "Maxwell's equations (differential form)", tex: "\\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\epsilon_0}, \\quad \\nabla\\cdot\\vec{B}=0, \\quad \\nabla\\times\\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}, \\quad \\nabla\\times\\vec{B} = \\mu_0\\vec{J} + \\mu_0\\epsilon_0\\frac{\\partial\\vec{E}}{\\partial t}" },
      { label: "Wave equation for E in vacuum, and the speed it predicts", tex: "\\nabla^2\\vec{E} = \\mu_0\\epsilon_0 \\frac{\\partial^2\\vec{E}}{\\partial t^2} \\;\\Rightarrow\\; c = \\frac{1}{\\sqrt{\\mu_0\\epsilon_0}}" },
    ],
    applications: [
      { kind: "invention", heading: "Radio and wireless communication", text: "Once we knew these waves existed, it was only a matter of time before we used them for radio, Wi-Fi, and mobile networks. Every wireless gadget you own is basically just an application of Maxwell's math." },
    ],
  },
  {
    id: "circuits",
    title: "Circuits",
    mode: "concept",
    narrative: [
      "Circuit theory is just a simplified version of electromagnetism for when everything is stuck in wires. Kirchhoff's laws are really just ways to say that charge and energy are conserved as they flow through a network.",
    ],
    equations: [
      { label: "Kirchhoff's current law", tex: "\\sum_{\\text{node}} I_{\\text{in}} = \\sum_{\\text{node}} I_{\\text{out}}" },
      { label: "Kirchhoff's voltage law", tex: "\\sum_{\\text{loop}} V = 0" },
      { label: "RC charging transient", tex: "V(t) = V_0\\left(1 - e^{-t/RC}\\right)" },
    ],
    applications: [
      { kind: "invention", heading: "The RC low-pass filter", text: "Audio crossovers and power supplies use RC networks to smooth out fast voltage spikes. It's the same math that describes how a capacitor charges up over time." },
      { kind: "application", heading: "Every digital clock signal", text: "Transistors don't switch instantly—they follow these same charging curves. This limits how fast a computer chip can run without losing data." },
    ],
  },
  {
    id: "optics",
    title: "Optics",
    mode: "concept",
    narrative: [
      "Optics is all about how light behaves when it hits things like lenses or mirrors. While light is technically a wave, we can often treat it as simple rays. Fermat's principle says light always takes the path that takes the least amount of time, which explains why it bends when it enters glass.",
    ],
    equations: [
      { label: "Snell's law of refraction", tex: "n_1\\sin\\theta_1 = n_2\\sin\\theta_2" },
      { label: "Thin lens equation", tex: "\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}" },
    ],
    applications: [
      { kind: "invention", heading: "Fiber optics", text: "By using 'total internal reflection,' we can trap light inside a thin glass fiber and send data across the ocean at incredible speeds. It's the backbone of the modern internet." },
    ],
  },
  {
    id: "special-relativity",
    title: "Special Relativity",
    mode: "concept",
    narrative: [
      "Einstein's Special Relativity shows us that time and space aren't fixed. If you move fast enough, time slows down and objects get shorter. It all comes from one simple fact: the speed of light is always the same for everyone, no matter how fast they're moving.",
    ],
    equations: [
      { label: "Lorentz factor", tex: "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}" },
      { label: "Time dilation", tex: "\\Delta t' = \\gamma \\Delta t" },
      { label: "Mass-energy equivalence", tex: "E = mc^2" },
    ],
    applications: [
      { kind: "application", heading: "Particle accelerators", text: "In places like CERN, we push particles so close to the speed of light that their 'mass' effectively increases and time slows down for them. We have to use Einstein's math to keep the machines working correctly." },
    ],
  },
];
