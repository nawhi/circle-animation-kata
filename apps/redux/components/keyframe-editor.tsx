import React from "react";
import {
  actions,
  selectors,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Keyframe } from "@/lib/types";
import { KeyframeThumbnail } from "./keyframe-thumbnail";

function ShapeThumbnail({ id }: { id: string }): JSX.Element | null {
  const shape = useAppSelector((state) =>
    selectors.shapes.selectById(state, id),
  );
  if (shape === undefined) {
    return null;
  }
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={500}
        cy={500}
        r={200}
        strokeWidth={30}
        fill={shape.fill}
        stroke={shape.stroke}
      />
    </svg>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3KL9gP2Gwb4
 */
function KeyframeEditor(): JSX.Element {
  const keyframeId = useAppSelector((state) => state.app.selectedKeyframeId);
  const keyframe = useAppSelector((state) =>
    keyframeId ? selectors.keyframes.selectById(state, keyframeId) : undefined,
  );
  const dispatch = useAppDispatch();

  const shapes = useAppSelector(selectors.shapes.selectAll);

  if (keyframe === undefined) {
    return <div>Select a keyframe from the thumbnails above to begin.</div>;
  }

  const update = (changes: Partial<Keyframe>) =>
    dispatch(actions.keyframes.updateOne({ id: keyframe.id, changes }));

  return (
    <div className="flex gap-12 justify-between items-start p-6">
      <div className="flex flex-col gap-4 items-start mb-6">
        <h2 className="text-xl font-bold">
          Keyframe #{keyframe.id.replace("keyframe", "")}
        </h2>
        <div className="flex items-center gap-4">
          <Label className="contents">
            <span className="mr-2">Time:</span>
            <Input
              className="w-32"
              id="keyframe-time"
              type="number"
              value={keyframe.time}
              onChange={(e) => update({ time: parseInt(e.target.value, 10) })}
            />
          </Label>
        </div>
        <h4 className="text-lg font-semibold">Available shapes</h4>
        <div className="flex flex-wrap gap-3">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className="border rounded-md aspect-square flex flex-col justify-around align-center text-center w-24 h-24"
            >
              <ShapeThumbnail id={shape.id} />
              <span className="text-xs text-zinc-700 dark:text-zinc-200 whitespace-nowrap overflow-hidden overflow-ellipsis p-1">
                {shape.displayName}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="border rounded w-full h-full max-h-[75vh] aspect-square">
        <KeyframeThumbnail id={keyframe.id} />
      </div>
    </div>
  );
}

export default KeyframeEditor;
