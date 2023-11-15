export type ShapeId = `shape${string}`;
export type KeyframeId = `keyframe${string}`;

export interface XY {
  x: number;
  y: number;
}

export interface Shape {
  id: ShapeId;
  radius: number;
  fill: string;
  stroke: string;
}

export interface KeyframeEntry {
  shape: ShapeId;
  center: XY;
  overrides: Partial<Shape>;
}

export interface Keyframe {
  id: KeyframeId;
  time: number;
  entries: KeyframeEntry[];
}
