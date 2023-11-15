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
import { XY, isShapeId } from "@/lib/types";
import { log } from "console";

function ShapeThumbnail({ id }: { id: string }): JSX.Element | null {
  const shape = useAppSelector((state) =>
    selectors.shapes.selectById(state, id)
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
interface ShapeOnCanvasProps {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  parentRef: React.RefObject<HTMLDivElement>;
  onPositionChange: (x: number, y: number) => void;
}

function ShapeOnCanvas({
  cx,
  cy,
  r,
  fill,
  stroke,
  parentRef,
  onPositionChange,
}: ShapeOnCanvasProps): JSX.Element {
  const dragStartRef = React.useRef<XY>();
  const xyOfParentRef = () => {
    const rect = parentRef.current?.getBoundingClientRect();
    return rect ? { x: rect.left, y: rect.top } : undefined;
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        dragStartRef.current = xyOfParentRef();
      }}
      onDragEnd={(e) => {
        dragStartRef.current = undefined;
        const rect = xyOfParentRef();
        if (rect) {
          onPositionChange(rect.x, rect.y);
        }
      }}
      style={{
        position: "absolute",
        top: `${cy - r}px`,
        left: `${cx - r}px`,
        width: `${r * 2}px`,
        height: `${r * 2}px`,
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={500} cy={500} r={200} fill={fill} stroke={stroke} />
      </svg>
    </div>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3KL9gP2Gwb4
 */
function KeyframeEditor(): JSX.Element {
  const keyframeId = useAppSelector((state) => state.app.selectedKeyframeId);
  const keyframe = useAppSelector((state) =>
    keyframeId ? selectors.keyframes.selectById(state, keyframeId) : undefined
  );
  const dispatch = useAppDispatch();

  const shapes = useAppSelector(selectors.shapes.selectAll);
  const shapesEntities = useAppSelector(selectors.shapes.selectEntities);

  const canvasRef = React.useRef<HTMLDivElement>(null);

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
        <h4 className="text-lg font-semibold">Available shapes</h4>
        <div className="flex flex-wrap gap-3">
          {shapes.map((shape) => (
            <div
              draggable
              key={shape.id}
              onDragStart={(e) => {
                e.dataTransfer.setData("shape-id", shape.id);
              }}
              className="border rounded-md aspect-square flex flex-col justify-around align-center text-center w-24 h-24"
            >
              <ShapeThumbnail id={shape.id} />
              <span>{shape.displayName}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={canvasRef}
        className="w-[800px] h-[500px] border rounded-md bg-white dark:bg-zinc-800 relative"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const shapeId = e.dataTransfer.getData("shape-id");
          if (isShapeId(shapeId)) {
            dispatch(
              actions.keyframes.addShape({
                keyframeId: keyframe.id,
                shapeId,
                position: { x, y },
              })
            );
          }
        }}
      >
        <div className="m-4 text-center text-zinc-500 dark:text-zinc-400">
          {keyframe.entries.length === 0 &&
            "Drag and reposition shapes here..."}
        </div>
        {keyframe.entries.map((entry, idx) => {
          const shape = shapesEntities[entry.shape];
          return shape ? (
            <ShapeOnCanvas
              key={`${entry.shape}-${idx}`}
              parentRef={canvasRef}
              cx={entry.center.x}
              cy={entry.center.y}
              r={shape.radius}
              fill={shape.fill}
              stroke={shape.stroke}
              onPositionChange={(x, y) =>
                dispatch(
                  actions.keyframes.moveShape({
                    keyframeId: keyframe.id,
                    shapeId: shape.id,
                    position: { x, y },
                  })
                )
              }
            />
          ) : null;
        })}
      </div>
    </div>
  );
}

export default KeyframeEditor;
