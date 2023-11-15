import {
  configureStore,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Keyframe, KeyframeId, Shape, ShapeId, XY } from "@/lib/types";

const shapesEntityAdapter = createEntityAdapter<Shape>();
const keyframesEntityAdapter = createEntityAdapter<Keyframe>({
  sortComparer: (a, b) => a.time - b.time,
});

const shapesSlice = createSlice({
  name: "shapes",
  initialState: shapesEntityAdapter.getInitialState(),
  reducers: {
    addOne: shapesEntityAdapter.addOne,
    updateOne: shapesEntityAdapter.updateOne,
    removeOne: shapesEntityAdapter.removeOne,
  },
});

interface ShapePositionPayload {
  keyframeId: KeyframeId;
  shapeId: ShapeId;
  position: XY;
}

const keyframesSlice = createSlice({
  name: "keyframes",
  initialState: keyframesEntityAdapter.getInitialState(),
  reducers: {
    addOne: keyframesEntityAdapter.addOne,
    removeOne: keyframesEntityAdapter.removeOne,
    updateOne: keyframesEntityAdapter.updateOne,
    addShape: (state, { payload }: PayloadAction<ShapePositionPayload>) => {
      const keyframe = state.entities[payload.keyframeId];
      if (!keyframe) return;
      keyframe.entries.push({
        shape: payload.shapeId,
        center: payload.position,
      });
    },
    moveShape: (state, { payload }: PayloadAction<ShapePositionPayload>) => {
      const keyframe = state.entities[payload.keyframeId];
      if (!keyframe) return;
      const entry = keyframe.entries.find(
        (entry) => entry.shape === payload.shapeId
      );
      if (entry) {
        entry.center = payload.position;
      }
    },
  },
});

const appSlice = createSlice({
  name: "app",
  initialState: {
    selectedKeyframeId: "keyframe1" as KeyframeId | null,
  },
  reducers: {
    selectKeyframe: (state, { payload }: PayloadAction<KeyframeId | null>) => {
      state.selectedKeyframeId = payload;
    },
  },
});

const store = configureStore({
  reducer: {
    shapes: shapesSlice.reducer,
    keyframes: keyframesSlice.reducer,
    app: appSlice.reducer,
  },
  preloadedState: {
    shapes: {
      ids: ["shape1"],
      entities: {
        shape1: {
          id: "shape1",
          displayName: "Shape 1",
          radius: 50,
          fill: "#000000",
          stroke: "#ffffff",
        },
      },
    },
    keyframes: {
      ids: ["keyframe1"],
      entities: {
        keyframe1: {
          id: "keyframe1",
          time: 0,
          entries: [
            {
              shape: "shape1",
              center: { x: 100, y: 100 },
            },
          ],
        },
      },
    },
  },
});

export const actions = {
  shapes: shapesSlice.actions,
  keyframes: keyframesSlice.actions,
  app: appSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectors = {
  shapes: shapesEntityAdapter.getSelectors<RootState>((state) => state.shapes),
  keyframes: keyframesEntityAdapter.getSelectors<RootState>(
    (state) => state.keyframes
  ),
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
