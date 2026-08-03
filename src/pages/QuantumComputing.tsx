import BlochSphere from "@/components/BlochSphere";
import SchrodingerWavePacket from "@/components/SchrodingerWavePacket";
import TopicBlock from "@/components/TopicBlock";
import { quantumTopics } from "@/data/quantumTopics";

const simById: Record<string, JSX.Element> = {
  "wave-mechanics": <SchrodingerWavePacket width={420} height={280} />,
  "quantum-computing": <BlochSphere width={380} height={380} />,
};

export default function QuantumComputing() {
  return (
    <div className="container py-12">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-verdant-300 font-semibold">
          Volume 2
        </span>
        <h1 className="text-4xl font-bold mb-2 mt-1">Quantum Physics</h1>
        <p className="text-muted-foreground max-w-2xl font-narrative">
          Ten topics tracing quantum mechanics from a spreading wave packet to the Bloch sphere and
          Shor's algorithm — the same operators, the same Schrödinger equation, applied at increasing
          levels of structure.
        </p>
      </div>

      <div>
        {quantumTopics.map((topic, i) => (
          <TopicBlock
            key={topic.id}
            id={topic.id}
            index={i + 1}
            accent="verdant"
            title={topic.title}
            mode={topic.mode}
            narrative={topic.narrative}
            equations={topic.equations}
            applications={topic.applications}
          >
            {simById[topic.id]}
          </TopicBlock>
        ))}
      </div>
    </div>
  );
}
