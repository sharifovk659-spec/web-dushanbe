export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export const REVEAL_DURATION = 0.6;
export const REVEAL_DISTANCE = 24;
export const STAGGER_GAP = 0.08;

export type RevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scale";

export const revealOffsets: Record<
  RevealVariant,
  { x: number; y: number; scale: number; blur: number }
> = {
  fadeUp: { x: 0, y: REVEAL_DISTANCE, scale: 1, blur: 6 },
  fadeLeft: { x: REVEAL_DISTANCE, y: 0, scale: 1, blur: 6 },
  fadeRight: { x: -REVEAL_DISTANCE, y: 0, scale: 1, blur: 6 },
  scale: { x: 0, y: 16, scale: 0.96, blur: 4 },
};

export const mobileRevealOffset = {
  x: 0,
  y: 16,
  scale: 1,
  blur: 0,
};
