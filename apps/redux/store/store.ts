import {
  configureStore,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { Keyframe, Shape } from "@/lib/types";
import { pick } from "lodash-es";

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

const keyframesSlice = createSlice({
  name: "keyframes",
  initialState: keyframesEntityAdapter.getInitialState(),
  reducers: {
    addOne: keyframesEntityAdapter.addOne,
    removeOne: keyframesEntityAdapter.removeOne,
    updateOne: keyframesEntityAdapter.updateOne,
  },
});

const store = configureStore({
  reducer: {
    shapes: shapesSlice.reducer,
    keyframes: keyframesSlice.reducer,
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
              overrides: {
                radius: 50,
                fill: "#000000",
                stroke: "#ffffff",
              },
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
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectors = {
  shapes: shapesEntityAdapter.getSelectors<RootState>((state) => state.shapes),
  keyframes: keyframesEntityAdapter.getSelectors<RootState>(
    (state) => state.keyframes,
  ),
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
