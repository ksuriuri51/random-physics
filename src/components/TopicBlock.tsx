import type { ReactNode } from "react";
import { FlaskConical, BookOpen, Rocket, Lightbulb } from "lucide-react";
import EquationReveal, { type EquationStep } from "./EquationReveal";

export interface Application {
  kind: "invention" | "application" | "scifi";
  heading: string;
  text: string;
}

export type VolumeAccent = "auric" | "verdant" | "nebula";

interface TopicBlockProps {
  id: string;
  title: string;
  mode: "simulated" | "concept";
  narrative: string | string[];
  equations?: EquationStep[];
  applications: Application[];
  accent?: VolumeAccent;
  index?: number;
  children?: ReactNode;
}

const kindMeta: Record<Application["kind"], { icon: typeof Lightbulb; label: string }> = {
  invention: { icon: Lightbulb, label: "Real invention" },
  application: { icon: BookOpen, label: "Real-world application" },
  scifi: { icon: Rocket, label: "Speculative application" },
};

const accentClasses: Record<VolumeAccent, { badge: string; bar: string; icon: string; glow: string; watermark: string; hex: string }> = {
  auric: {
    badge: "border-auric-300/50 text-auric-300",
    bar: "from-auric-300 to-auric-700",
    icon: "text-auric-300",
    glow: "shadow-[0_0_30px_-10px_rgba(220,181,95,0.35)]",
    watermark: "text-auric-300/10",
    hex: "#DCB55F",
  },
  verdant: {
    badge: "border-verdant-300/50 text-verdant-300",
    bar: "from-verdant-300 to-verdant-700",
    icon: "text-verdant-300",
    glow: "shadow-[0_0_30px_-10px_rgba(60,154,129,0.35)]",
    watermark: "text-verdant-300/10",
    hex: "#89DEC6",
  },
  nebula: {
    badge: "border-nebula-300/60 text-nebula-100",
    bar: "from-nebula-300 to-nebula-700",
    icon: "text-nebula-300",
    glow: "shadow-[0_0_30px_-10px_rgba(99,90,107,0.45)]",
    watermark: "text-nebula-300/10",
    hex: "#8C86A0",
  },
};

export default function TopicBlock({
  id,
  title,
  mode,
  narrative,
  equations,
  applications,
  accent = "auric",
  index,
  children,
}: TopicBlockProps) {
  const paragraphs = Array.isArray(narrative) ? narrative : [narrative];
  const palette = accentClasses[accent];

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 my-8 rounded-2xl glass-panel overflow-hidden ${palette.glow}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${palette.bar}`} />
      {typeof index === "number" && (
        <div
          aria-hidden="true"
          className={`pointer-events-none select-none absolute -right-2 -top-6 text-[7rem] font-black leading-none ${palette.watermark}`}
        >
          {String(index).padStart(2, "0")}
        </div>
      )}

      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h3 className="text-2xl font-bold">{title}</h3>
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${palette.badge}`}>
            <FlaskConical className="w-3 h-3" />
            {mode === "simulated" ? "Live simulation" : "Concept deep-dive"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className={children ? "lg:col-span-3" : "lg:col-span-5"}>
            <div className="font-narrative text-[15px] leading-relaxed space-y-3 text-foreground/90">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {equations && equations.length > 0 && (
              <div className="mt-5">
                <EquationReveal steps={equations} accentColor={palette.hex} />
              </div>
            )}

            {applications.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {applications.map((app, i) => {
                  const Meta = kindMeta[app.kind];
                  const Icon = Meta.icon;
                  return (
                    <div key={i} className="p-4 rounded-lg bg-black/25 border border-white/10">
                      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-1 ${palette.icon}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {Meta.label}
                      </div>
                      <div className="font-semibold text-sm mb-1">{app.heading}</div>
                      <p className="text-sm text-foreground/75 font-narrative">{app.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {children && (
            <div className="lg:col-span-2">
              <div className="sticky top-24">{children}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
