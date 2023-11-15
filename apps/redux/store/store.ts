import {
  configureStore,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

type ShapeId = `shape-${string}`;
type CircleId = `shape-circle-${string}`;
type PolygonId = `shape-polygon-${string}`;
type KeyframeId = `keyframe-${string}`;

interface XY {
  x: number;
  y: number;
}

interface BaseShape {
  id: ShapeId;
  fill: string;
  stroke: string;
}

interface Circle extends BaseShape {
  id: CircleId;
  type: "circle";
  radius: number;
}

interface Polygon extends BaseShape {
  id: PolygonId;
  type: "polygon";
  points: XY[];
}

type Shape = Circle | Polygon;

interface KeyframeEntry {
  shape: ShapeId;
  center: XY;
  overrides: Partial<Shape>;
}

interface Keyframe {
  id: KeyframeId;
  time: number;
  entries: KeyframeEntry[];
}

interface StoreState {
  shapes: Shape[];
  keyframes: Keyframe[];
}

const shapesEntityAdapter = createEntityAdapter<Shape>();
const keyframesEntityAdapter = createEntityAdapter<Keyframe>({
  sortComparer: (a, b) => a.time - b.time,
});

const shapesSlice = createSlice({
  name: "shapes",
  initialState: shapesEntityAdapter.getInitialState(),
  reducers: {
    addShape: shapesEntityAdapter.addOne,
    removeShape: shapesEntityAdapter.removeOne,
    updateShape: shapesEntityAdapter.updateOne,
  },
});

const keyframesSlice = createSlice({
  name: "keyframes",
  initialState: keyframesEntityAdapter.getInitialState(),
  reducers: {
    addKeyframe: keyframesEntityAdapter.addOne,
    removeKeyframe: keyframesEntityAdapter.removeOne,
    updateKeyframe: keyframesEntityAdapter.updateOne,
  },
});

const store = configureStore({
  reducer: {
    shapes: shapesSlice.reducer,
    keyframes: keyframesSlice.reducer,
  },
});

export const actions = {
  shapes: shapesSlice.actions,
  keyframes: keyframesSlice.actions,
};

export default store;
