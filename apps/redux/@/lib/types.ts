export type ShapeId = `shape${number}`;
export type KeyframeId = `keyframe${number}`;

export const isShapeId = (id: string): id is ShapeId => id.startsWith("shape");
export const isKeyframeId = (id: string): id is KeyframeId =>
  id.startsWith("keyframe");

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
}

export interface Keyframe {
  id: KeyframeId;
  time: number;
  entries: KeyframeEntry[];
}
