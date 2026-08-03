import DoublePendulumCanvas from "@/components/DoublePendulumCanvas";
import SimpleHarmonicOscillator from "@/components/SimpleHarmonicOscillator";
import WaveInterference from "@/components/WaveInterference";
import TopicBlock from "@/components/TopicBlock";
import { classicalTopics } from "@/data/classicalTopics";

const simById: Record<string, JSX.Element> = {
  mechanics: <DoublePendulumCanvas width={420} height={420} showTrajectory />,
  oscillations: <SimpleHarmonicOscillator width={420} height={280} />,
  waves: <WaveInterference width={420} height={280} />,
};

export default function ClassicalMechanics() {
  return (
    <div className="container py-12">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-auric-300 font-semibold">
          Volume 1
        </span>
        <h1 className="text-4xl font-bold mb-2 mt-1">Classical Physics</h1>
        <p className="text-muted-foreground max-w-2xl font-narrative">
          From Newton's laws to special relativity — twelve topics, each derived live rather than
          asserted. Simulations run 4th-order Runge–Kutta integration where the dynamics are chaotic;
          everywhere else, the equations themselves are the point.
        </p>
      </div>

      <div>
        {classicalTopics.map((topic, i) => (
          <TopicBlock
            key={topic.id}
            id={topic.id}
            index={i + 1}
            accent="auric"
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
