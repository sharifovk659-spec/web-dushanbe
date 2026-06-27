/** Serpentine S-curve timeline geometry for the Process section */

export const VB_W = 600;
export const SEG = 480;
export const X_LEFT = 48;
export const X_RIGHT = 552;
export const CURVE_RATIO = 0.72;

/** Per-step scroll budget: draw line → brief pause at node → reveal text */
export const TIMELINE_PHASES = {
  drawEnd: 0.76,
  revealStart: 0.9,
} as const;

export type NodePosition = {
  x: number;
  y: number;
  leftPct: number;
  topPct: number;
};

export type TimelineMetrics = {
  total: number;
  nodeLens: number[];
};

export function getViewBoxHeight(stepCount: number): number {
  return stepCount * SEG;
}

export function getNodePosition(index: number, stepCount: number): NodePosition {
  const x = index % 2 === 0 ? X_LEFT : X_RIGHT;
  const y = SEG / 2 + index * SEG;
  const vbH = getViewBoxHeight(stepCount);
  return {
    x,
    y,
    leftPct: (x / VB_W) * 100,
    topPct: (y / vbH) * 100,
  };
}

function appendSegment(d: string, index: number, stepCount: number): string {
  if (index === 0) {
    const first = getNodePosition(0, stepCount);
    return `${d} L ${first.x} ${first.y}`;
  }

  const a = getNodePosition(index - 1, stepCount);
  const b = getNodePosition(index, stepCount);
  const curve = SEG * CURVE_RATIO;
  return `${d} C ${a.x} ${a.y + curve} ${b.x} ${b.y - curve} ${b.x} ${b.y}`;
}

export function buildSerpentinePath(stepCount: number): string {
  let d = `M ${X_LEFT} 0`;

  for (let i = 0; i < stepCount; i++) {
    d = appendSegment(d, i, stepCount);
  }

  const last = getNodePosition(stepCount - 1, stepCount);
  const vbH = getViewBoxHeight(stepCount);
  if (last.y < vbH) {
    d += ` L ${last.x} ${vbH}`;
  }

  return d;
}

export function measureTimeline(probe: SVGPathElement, stepCount: number): TimelineMetrics {
  let d = `M ${X_LEFT} 0`;
  const nodeLens: number[] = [];

  for (let i = 0; i < stepCount; i++) {
    d = appendSegment(d, i, stepCount);
    probe.setAttribute("d", d);
    nodeLens.push(probe.getTotalLength());
  }

  probe.setAttribute("d", buildSerpentinePath(stepCount));

  return { total: probe.getTotalLength(), nodeLens };
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** Local progress inside one step segment (0 = segment start, 1 = segment end) */
export function getSegmentLocal(scrollProgress: number, stepIndex: number, stepCount: number): number {
  return scrollProgress * stepCount - stepIndex;
}

/** Map global scroll progress to drawn path length */
export function progressToDrawnLen(metrics: TimelineMetrics, scrollProgress: number): number {
  const t = clamp01(scrollProgress);
  const count = metrics.nodeLens.length;

  if (t <= 0) return 0;
  if (t >= 1) return metrics.total;

  const index = Math.min(count - 1, Math.floor(t * count));
  const local = t * count - index;
  const drawT = Math.min(1, local / TIMELINE_PHASES.drawEnd);

  const start = index === 0 ? 0 : metrics.nodeLens[index - 1];
  const end = metrics.nodeLens[index];
  const nodeDrawn = start + (end - start) * drawT;

  if (index === count - 1 && local > TIMELINE_PHASES.drawEnd) {
    const tailT = (local - TIMELINE_PHASES.drawEnd) / (1 - TIMELINE_PHASES.drawEnd);
    const tailStart = metrics.nodeLens[count - 1];
    return tailStart + (metrics.total - tailStart) * clamp01(tailT);
  }

  return nodeDrawn;
}

export function applyDrawProgress(
  path: SVGPathElement,
  metrics: TimelineMetrics,
  scrollProgress: number,
): number {
  const drawnLen = progressToDrawnLen(metrics, scrollProgress);
  path.style.strokeDasharray = `${metrics.total}`;
  path.style.strokeDashoffset = `${metrics.total - drawnLen}`;
  return drawnLen;
}

export type TimelineFrame = {
  nodeActive: boolean[];
  stepVisible: boolean[];
};

export function computeTimelineFrame(
  metrics: TimelineMetrics,
  drawnLen: number,
  scrollProgress: number,
): TimelineFrame {
  const count = metrics.nodeLens.length;
  const t = clamp01(scrollProgress);

  const nodeActive = metrics.nodeLens.map((len, i) => {
    if (i === count - 1 && t >= 0.76) return true;
    return drawnLen >= len - 0.5;
  });

  const stepVisible = metrics.nodeLens.map((len, i) => {
    const local = getSegmentLocal(t, i, count);
    const lineReached = drawnLen >= len - 0.5;

    if (i === count - 1) {
      return lineReached || t >= 0.76;
    }

    if (i === count - 2) {
      return lineReached && (local >= 0.62 || t >= (i + 1) / count - 0.1);
    }

    if (!lineReached) return false;

    if (local >= TIMELINE_PHASES.revealStart) return true;
    return t >= (i + 1) / count - 0.06;
  });

  return { nodeActive, stepVisible };
}
