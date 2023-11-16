import type { EntityState } from "@reduxjs/toolkit";
import { keyBy, range } from "lodash-es";
import type { Keyframe, KeyframeEntry, Shape } from "@/lib/types";
import { CANVAS_WIDTH } from "./constants";
import seedrandom from "seedrandom";

const entityStateOf = <T extends { id: string }>(
  entities: T[],
): EntityState<T> => ({
  ids: entities.map((e) => e.id),
  entities: keyBy(entities, "id"),
});

const seed = "change me to get different shapes and keyframes";

const rand = seedrandom.alea(seed);

const randomInt = (min: number, max: number) =>
  Math.floor(rand() * (max - min + 1) + min);

const SHAPES: Shape[] = [
  {
    displayName: "Snakey Snakey",
    fill: "green",
    stroke: "yellow",
    radius: randomInt(50, 120),
  },
  {
    displayName: "Feeling Blue",
    fill: "blue",
    stroke: "rebeccapurple",
    radius: randomInt(120, 150),
  },
  {
    displayName: "Dark Horse",
    fill: "brown",
    stroke: "black",
    radius: randomInt(150, 200),
  },
  {
    displayName: "Hotter Than The Sun",
    fill: "orange",
    stroke: "ref",
    radius: randomInt(200, 250),
  },
  {
    displayName: "Darkest Night",
    fill: "black",
    stroke: "black",
    radius: randomInt(250, 350),
  },
].map((shape, i) => ({ ...shape, id: `shape${i + 1}` }));

const shapesEntityState = entityStateOf(SHAPES);

export const PRELOADED_STATE = {
  app: { selectedKeyframeId: "keyframe0" },
  shapes: shapesEntityState,
  keyframes: entityStateOf<Keyframe>(
    range(randomInt(6, 9)).map(
      (i): Keyframe => ({
        id: `keyframe${i}`,
        time: i,
        entries: range(randomInt(SHAPES.length - 3, SHAPES.length)).map(
          (j): KeyframeEntry => {
            const shapeId = `shape${j + 1}` as const;
            const shape = shapesEntityState.entities[shapeId];
            if (!shape) {
              throw new Error(`Shape ${shapeId} not found`);
            }
            const acceptableMin = 40;
            return {
              shape: shapeId,
              center: {
                x: randomInt(acceptableMin, CANVAS_WIDTH - acceptableMin),
                y: randomInt(acceptableMin, CANVAS_WIDTH - acceptableMin),
              },
            };
          },
        ),
      }),
    ),
  ),
} as const;
