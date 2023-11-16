import { selectors, useAppSelector } from "../store/store";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../store/constants";
import React from "react";

export function KeyframeThumbnail({ id }: { id: string }): JSX.Element {
  const kf = useAppSelector((state) =>
    selectors.keyframes.selectById(state, id),
  );
  const entries = kf?.entries ?? [];
  const shapes = useAppSelector(selectors.shapes.selectEntities);

  return (
    <svg
      className="w-full h-full"
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {entries.map((entry, i) => {
        const shape = shapes[entry.shape];
        if (!shape) {
          const availableShapes = Object.keys(shapes).join(", ");
          throw new Error(
            `Found a reference to ${entry.shape} at entries[${i}] of ${id} but no shape with that id exists in the store. Available shapes: ${availableShapes}`,
          );
        }
        return (
          <circle
            key={shape.id}
            cx={entry.center.x}
            cy={entry.center.y}
            r={shape.radius}
            fill={shape.fill}
            stroke={shape.stroke}
          />
        );
      })}
    </svg>
  );
}
