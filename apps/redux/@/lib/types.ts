export type ShapeId = `shape${number}`;
export type KeyframeId = `keyframe${number}`;

export interface XY {
  x: number;
  y: number;
}

export interface Shape {
  id: ShapeId;
  displayName: string;
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
