export type ShapeId = `shape${number}`;
export type KeyFrameId = `keyframe${number}`;

export const isShapeId = (id: string): id is ShapeId => id.startsWith('shape');
export const isKeyframeId = (id: string): id is KeyFrameId => id.startsWith('keyframe');

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

export interface KeyFrameEntry {
  shape: ShapeId;
  center: XY;
}

export interface KeyFrame {
  id: KeyFrameId;
  time: number;
  entries: KeyFrameEntry[];
}
