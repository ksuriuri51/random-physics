import type { Point } from "./math";

/** Generates N evenly-sampled points around a shape, centered at origin. */
export function circleShape(N = 200, R = 100): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    pts.push({ x: R * Math.cos(t), y: R * Math.sin(t) });
  }
  return pts;
}

/** Five-pointed star polygon, interpolated into N smooth-ish sample points. */
export function starShape(N = 200, R = 110): Point[] {
  const spikes = 5;
  const inner = R * 0.42;
  const verts: Point[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? R : inner;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    verts.push({ x: r * Math.cos(a), y: r * Math.sin(a) });
  }
  return resample(verts, N);
}

/** Classic closed-form parametric heart curve. */
export function heartShape(N = 200, scale = 6.2): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push({ x: x * scale, y: y * scale });
  }
  return pts;
}

/** Bernoulli's lemniscate (a figure-eight / infinity symbol). */
export function infinityShape(N = 200, R = 130): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    pts.push({ x: (R * Math.cos(t)) / denom, y: (R * Math.sin(t) * Math.cos(t)) / denom });
  }
  return pts;
}

/** A three-lobed rose curve — the "hardest" level, needs the most harmonics. */
export function roseShape(N = 200, R = 120): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = R * Math.cos(3 * t);
    pts.push({ x: r * Math.cos(t), y: r * Math.sin(t) });
  }
  return pts;
}

/** Linearly resample a closed polyline into N evenly-arc-spaced points. */
function resample(verts: Point[], N: number): Point[] {
  const closed = [...verts, verts[0]];
  const lengths: number[] = [0];
  for (let i = 1; i < closed.length; i++) {
    const dx = closed[i].x - closed[i - 1].x;
    const dy = closed[i].y - closed[i - 1].y;
    lengths.push(lengths[i - 1] + Math.sqrt(dx * dx + dy * dy));
  }
  const total = lengths[lengths.length - 1];
  const out: Point[] = [];
  for (let i = 0; i < N; i++) {
    const target = (i / N) * total;
    let seg = 0;
    while (seg < lengths.length - 2 && lengths[seg + 1] < target) seg++;
    const segLen = lengths[seg + 1] - lengths[seg] || 1;
    const frac = (target - lengths[seg]) / segLen;
    out.push({
      x: closed[seg].x + (closed[seg + 1].x - closed[seg].x) * frac,
      y: closed[seg].y + (closed[seg + 1].y - closed[seg].y) * frac,
    });
  }
  return out;
}

export interface GameLevel {
  id: string;
  name: string;
  shape: () => Point[];
  /** Harmonic count below which 3 stars are awarded, if accuracy also clears the bar */
  parHarmonics: number;
}

export const levels: GameLevel[] = [
  { id: "circle", name: "Circle", shape: () => circleShape(), parHarmonics: 2 },
  { id: "infinity", name: "Infinity Loop", shape: () => infinityShape(), parHarmonics: 6 },
  { id: "star", name: "Five-Point Star", shape: () => starShape(), parHarmonics: 10 },
  { id: "heart", name: "Heart", shape: () => heartShape(), parHarmonics: 12 },
  { id: "rose", name: "Triple Rose", shape: () => roseShape(), parHarmonics: 8 },
];
