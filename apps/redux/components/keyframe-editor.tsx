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

  if (keyframe === undefined) {
    return <div>Select a keyframe from the thumbnails above to begin.</div>;
  }

  const update = (changes: Partial<Keyframe>) =>
    dispatch(actions.keyframes.updateOne({ id: keyframe.id, changes }));

  return (
    <div className="flex flex-wrap justify-between items-start p-6">
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
      </div>
      <div className="w-[800px] h-[500px] border rounded-md bg-white dark:bg-zinc-800">
        <p className="m-4 text-center text-zinc-500 dark:text-zinc-400">
          Drag and reposition shapes here...
        </p>
      </div>
    </div>
  );
}

export default KeyframeEditor;
