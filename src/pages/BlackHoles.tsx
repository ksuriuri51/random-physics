import SpacetimeCurvature from "@/components/SpacetimeCurvature";
import GravitationalLensing from "@/components/GravitationalLensing";
import TopicBlock from "@/components/TopicBlock";
import { blackholeTopics } from "@/data/blackholeTopics";

const simById: Record<string, JSX.Element> = {
  "general-relativity": <SpacetimeCurvature width={420} height={300} />,
  "event-horizons": <GravitationalLensing width={420} height={420} />,
};

export default function BlackHoles() {
  return (
    <div className="container py-12">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-nebula-300 font-semibold">
          Volume 3
        </span>
        <h1 className="text-4xl font-bold mb-2 mt-1">Black Hole Physics</h1>
        <p className="text-muted-foreground max-w-2xl font-narrative">
          Fourteen topics from general relativity's field equations to Hawking radiation and the
          expanding universe — each grounded in the same Einstein field equations, each with a
          real observational confirmation where one exists.
        </p>
      </div>

      <div>
        {blackholeTopics.map((topic, i) => (
          <TopicBlock
            key={topic.id}
            id={topic.id}
            index={i + 1}
            accent="nebula"
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
