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

export const blackholeTopics: Topic[] = [
  {
    id: "general-relativity",
    title: "General Relativity",
    mode: "simulated",
    narrative: [
      "Einstein's big idea was that gravity isn't really a force pulling on things. Instead, it's just the way spacetime itself curves. Objects in free fall aren't being 'pulled'; they're just following the straightest path they can through a bent geometry. Basically, mass tells space how to curve, and that curve tells mass how to move.",
      "You can see this for yourself on the grid: drop a mass and watch how the fabric dips, exactly like the Schwarzschild solution predicts below.",
    ],
    equations: [
      { label: "The Einstein field equations", tex: "G_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}" },
      { label: "In words: geometry on the left, matter and energy on the right", tex: "\\underbrace{G_{\\mu\\nu}}_{\\text{spacetime curvature}} = \\underbrace{\\frac{8\\pi G}{c^4}}_{\\text{coupling constant}} \\underbrace{T_{\\mu\\nu}}_{\\text{mass-energy density}}" },
    ],
    applications: [
      { kind: "application", heading: "Confirmed by Mercury's orbit", text: "Back in 1915, General Relativity correctly predicted a tiny wobble in Mercury's orbit that Newton's old laws just couldn't explain. It was one of the first big proofs that Einstein was onto something." },
    ],
  },
  {
    id: "einstein-field-equations",
    title: "Einstein Field Equations",
    mode: "concept",
    narrative: [
      "These equations look pretty simple on paper, but they're hiding a ton of complexity. The Gμν part describes the geometry of spacetime, while the Tμν part tracks all the energy, pressure, and momentum at any given point. It's a massive balancing act between space and matter.",
    ],
    equations: [
      { label: "The Einstein tensor from curvature", tex: "G_{\\mu\\nu} = R_{\\mu\\nu} - \\tfrac{1}{2}g_{\\mu\\nu}R" },
      { label: "With the cosmological constant included", tex: "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}" },
    ],
    applications: [
      { kind: "scifi", heading: "The Alcubierre 'warp drive' metric", text: "In 1994, Miguel Alcubierre showed that these equations technically allow for a 'warp drive' that shrinks space in front of a ship and expands it behind. We'd need 'negative energy' to make it work—something we don't know how to get—but it's a favorite for hard sci-fi fans." },
    ],
  },
  {
    id: "schwarzschild-black-holes",
    title: "Schwarzschild Black Holes",
    mode: "concept",
    narrative: [
      "Karl Schwarzschild found this solution in 1916 while he was serving on the front lines of WWI. It describes the space around a simple, non-rotating mass. If you look at where the time component hits zero, you find the event horizon—the point of no return.",
    ],
    equations: [
      { label: "The Schwarzschild metric", tex: "ds^2 = -\\left(1-\\frac{2GM}{c^2r}\\right)c^2dt^2 + \\left(1-\\frac{2GM}{c^2r}\\right)^{-1}dr^2 + r^2d\\Omega^2" },
      { label: "Horizon located where the time component vanishes", tex: "1 - \\frac{2GM}{c^2 r_s} = 0 \\;\\Rightarrow\\; r_s = \\frac{2GM}{c^2}" },
    ],
    applications: [
      { kind: "application", heading: "Sizing real black holes", text: "Using this formula, you can figure out that if you crushed the Earth into a black hole, it would be about 9 millimeters wide. The Sun would be about 3 kilometers. Even the giant black hole at the center of our galaxy is smaller than Mercury's orbit." },
    ],
  },
  {
    id: "kerr-black-holes",
    title: "Kerr Black Holes",
    mode: "concept",
    narrative: [
      "In the real world, almost every black hole is spinning because the stars they came from were spinning too. Roy Kerr figured out the math for this in 1963. A spinning black hole actually drags spacetime along with it—a weird effect called 'frame dragging'—and creates a region called the ergosphere where you literally can't stand still.",
    ],
    equations: [
      { label: "Kerr metric horizon radius (spin parameter a = J/Mc)", tex: "r_\\pm = \\frac{GM}{c^2} \\pm \\sqrt{\\left(\\frac{GM}{c^2}\\right)^2 - a^2}" },
      { label: "Frame-dragging angular velocity at radius r", tex: "\\omega(r) = \\frac{2GMar}{(r^2+a^2)^2 - a^2\\Delta \\sin^2\\theta}" },
    ],
    applications: [
      { kind: "application", heading: "Gravity Probe B", text: "NASA actually sent a satellite called Gravity Probe B to measure this frame-dragging effect around Earth. Even though it's way weaker than what you'd find near a black hole, it confirmed that Einstein's predictions were spot on." },
    ],
  },
  {
    id: "reissner-nordstrom-black-holes",
    title: "Reissner–Nordström Black Holes",
    mode: "concept",
    narrative: [
      "If you take a non-rotating black hole and give it an electric charge, you get a Reissner–Nordström black hole. Most black holes in space are probably neutral, but this solution is interesting because it shows how charge can create multiple horizons—or even none at all.",
    ],
    equations: [
      { label: "Reissner–Nordström horizon radii", tex: "r_\\pm = \\frac{GM}{c^2} \\pm \\sqrt{\\left(\\frac{GM}{c^2}\\right)^2 - \\frac{GQ^2}{4\\pi\\epsilon_0 c^4}}" },
    ],
    applications: [
      { kind: "scifi", heading: "The naked singularity", text: "If a black hole has enough charge, the horizons might vanish entirely, leaving a 'naked singularity' exposed. Some physicists think this is impossible, but it's a popular idea in speculative stories about the limits of physics." },
    ],
  },
  {
    id: "kerr-newman-black-holes",
    title: "Kerr–Newman Black Holes",
    mode: "concept",
    narrative: [
      "This is the most general version of a stationary black hole, combining both spin and charge. The famous 'no-hair theorem' says that these three numbers—mass, spin, and charge—are all you need to describe a black hole. Once something falls in, the black hole 'forgets' everything else about it.",
    ],
    equations: [
      { label: "No-hair theorem — a black hole is fully specified by three numbers", tex: "\\text{Black hole} \\;\\longleftrightarrow\\; (M, J, Q) \\quad \\text{only}" },
      { label: "Kerr–Newman horizon radius", tex: "r_+ = \\frac{GM}{c^2} + \\sqrt{\\left(\\frac{GM}{c^2}\\right)^2 - a^2 - \\frac{GQ^2}{4\\pi\\epsilon_0 c^4}}" },
    ],
    applications: [
      { kind: "scifi", heading: "Erasing information as a plot device", text: "The idea that black holes 'forget' information is at the heart of a huge debate in physics. Sci-fi writers often use this as a way to have black holes act as one-way gateways that wipe away any evidence of what went through." },
    ],
  },
  {
    id: "event-horizons",
    title: "Event Horizons",
    mode: "simulated",
    narrative: [
      "The event horizon isn't a solid wall or anything you'd feel if you crossed it. It's just a boundary in the geometry of space where every path leads inward. You can see how gravity bends light from background stars as it passes near the horizon—a cool effect called gravitational lensing.",
    ],
    equations: [
      { label: "Light deflection angle for a ray passing at impact parameter b", tex: "\\delta\\phi \\approx \\frac{4GM}{c^2 b}" },
      { label: "Photon sphere: the radius where light can orbit in a circle", tex: "r_{\\text{photon}} = \\frac{3GM}{c^2} = \\tfrac{3}{2}r_s" },
    ],
    applications: [
      { kind: "application", heading: "The Event Horizon Telescope image", text: "That famous 2019 photo of the M87* black hole's shadow is exactly what this math predicts. We had to link up telescopes all over the world to get a clear enough view to see that characteristic silhouette." },
    ],
  },
  {
    id: "geodesics",
    title: "Geodesics",
    mode: "concept",
    narrative: [
      "A geodesic is basically the curved-space version of a straight line. When nothing is pushing on an object—like a planet in orbit or a falling apple—it's just following a geodesic. Gravity isn't really a force here; it's just the shape of the path.",
    ],
    equations: [
      { label: "The geodesic equation", tex: "\\frac{d^2x^\\mu}{d\\tau^2} + \\Gamma^{\\mu}_{\\alpha\\beta}\\frac{dx^\\alpha}{d\\tau}\\frac{dx^\\beta}{d\\tau} = 0" },
    ],
    applications: [
      { kind: "application", heading: "Mercury's perihelion precession", text: "By using geodesics in curved space instead of Newton's simple orbits, we finally explained why Mercury's orbit wobbles the way it does. It was a huge win for General Relativity." },
    ],
  },
  {
    id: "hawking-radiation",
    title: "Hawking Radiation",
    mode: "concept",
    narrative: [
      "Stephen Hawking famously showed that black holes aren't perfectly black. Because of quantum effects at the horizon, particles can escape, carrying away a tiny bit of energy. Over a massive amount of time, this causes the black hole to slowly evaporate and shrink.",
    ],
    equations: [
      { label: "Hawking temperature", tex: "T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}" },
      { label: "Evaporation lifetime, from the Stefan–Boltzmann radiated power", tex: "\\tau \\sim \\frac{5120\\,\\pi G^2 M^3}{\\hbar c^4}" },
    ],
    applications: [
      { kind: "application", heading: "Why stellar black holes will outlive the universe", text: "For a normal-sized black hole, this evaporation is incredibly slow—colder than the background of space. It would take way longer than the current age of the universe for one to disappear, which is why we've never actually seen it happen." },
      { kind: "scifi", heading: "Micro black holes as power sources", text: "Tiny black holes would be much hotter and evaporate faster, potentially putting out a lot of power. It's a classic sci-fi trope, though there was some (unnecessary) worry about this when the LHC first started up." },
    ],
  },
  {
    id: "bekenstein-entropy",
    title: "Bekenstein Entropy",
    mode: "concept",
    narrative: [
      "Jacob Bekenstein realized that black holes have entropy, but it scales with their surface area rather than their volume. This is really weird—it's like the entire 'content' of the black hole is written on its surface. This idea eventually led to the 'holographic principle' in physics.",
    ],
    equations: [
      { label: "Bekenstein–Hawking entropy", tex: "S_{BH} = \\frac{k_B c^3 A}{4G\\hbar}, \\qquad A = 4\\pi r_s^2" },
    ],
    applications: [
      { kind: "scifi", heading: "The holographic universe", text: "If everything about a region of space can be described by its boundary, maybe the whole universe is a hologram. It sounds like science fiction, but it's actually one of the most serious and mind-bending topics in modern theoretical physics." },
    ],
  },
  {
    id: "penrose-process",
    title: "Penrose Process",
    mode: "concept",
    narrative: [
      "Roger Penrose figured out that you could technically steal energy from a spinning black hole. If you drop something into the ergosphere and split it just right, one piece falls in while the other flies out with more energy than you started with. It's like a cosmic slingshot.",
    ],
    equations: [
      { label: "Energy extracted, bounded by the black hole's irreducible mass", tex: "E_{\\text{extracted}} \\le \\left(1 - \\frac{1}{\\sqrt{2}}\\right)Mc^2 \\approx 0.29\\,Mc^2" },
    ],
    applications: [
      { kind: "scifi", heading: "Powering a Kardashev Type II/III civilization", text: "A super-advanced civilization could use this process to get way more energy than you'd ever get from nuclear fusion. It's a staple in stories about megastructures and high-tech alien races." },
    ],
  },
  {
    id: "black-hole-thermodynamics",
    title: "Black Hole Thermodynamics",
    mode: "concept",
    narrative: [
      "It turns out black holes follow laws that look almost exactly like the laws of thermodynamics we use for steam engines and refrigerators. Horizon area acts like entropy, and surface gravity acts like temperature. It's a deep connection between gravity and heat.",
    ],
    equations: [
      { label: "The first law of black hole mechanics", tex: "dM = \\frac{\\kappa}{8\\pi G}dA + \\Omega\\, dJ + \\Phi\\, dQ" },
      { label: "Hawking's area theorem (second law analogue)", tex: "\\delta A \\ge 0 \\quad \\text{(classically, horizon area never decreases)}" },
    ],
    applications: [
      { kind: "application", heading: "A genuine bridge between two theories", text: "The fact that black holes obey these laws is one of our best clues that gravity and quantum mechanics might eventually be unified into one single theory. We're still working on figuring out exactly how that works." },
    ],
  },
  {
    id: "gravitational-waves",
    title: "Gravitational Waves",
    mode: "concept",
    narrative: [
      "When massive objects like black holes accelerate, they send out ripples in spacetime—gravitational waves. They're incredibly hard to detect; even Einstein wasn't sure we'd ever see them. But in 2015, LIGO finally caught the signal from two black holes merging far away.",
    ],
    equations: [
      { label: "Quadrupole formula for gravitational wave strain h", tex: "h_{jk} = \\frac{2G}{c^4 r} \\frac{d^2 Q_{jk}}{dt^2}" },
    ],
    applications: [
      { kind: "application", heading: "A new way to see the universe", text: "Before gravitational waves, we could only see things that gave off light. Now, we can 'hear' the universe, letting us study black hole collisions and other massive events that were previously invisible to us." },
    ],
  },
  {
    id: "cosmology",
    title: "Cosmology",
    mode: "concept",
    narrative: [
      "Cosmology is the study of the whole universe—how it started, how it's growing, and where it's going. General Relativity is the backbone of this field, helping us model everything from the Big Bang to the mysterious 'dark energy' that's pushing everything apart.",
    ],
    equations: [
      { label: "Friedmann equation for the expansion rate H", tex: "H^2 = \\left(\\frac{\\dot{a}}{a}\\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{kc^2}{a^2} + \\frac{\\Lambda c^2}{3}" },
    ],
    applications: [
      { kind: "application", heading: "Predicting the fate of the universe", text: "By looking at the balance of matter, radiation, and dark energy, cosmologists can predict whether the universe will keep expanding forever or eventually collapse. Right now, all signs point to a never-ending expansion." },
    ],
  },
];
