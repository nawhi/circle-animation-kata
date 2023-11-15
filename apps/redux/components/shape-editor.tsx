import React from "react";
import {
  actions,
  selectors,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import type { Shape, ShapeId } from "@/lib/types";

function ShapeEditor(): JSX.Element {
  const dispatch = useAppDispatch();
  const shapes = useAppSelector(selectors.shapes.selectAll);
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h4 className="text-lg font-semibold">Shapes</h4>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            const curShapeMaxId = Math.max(
              ...shapes.map((shape) =>
                parseInt(shape.id.replace("shape", ""), 10),
              ),
            );
            dispatch(
              actions.shapes.addOne({
                id: `shape${curShapeMaxId + 1}`,
                radius: 15,
                fill: "#ffffff",
                stroke: "#000000",
              }),
            );
          }}
        >
          <PlusCircle />
        </Button>
      </div>
      {shapes.map((shape) => {
        const update = (changes: Partial<Shape>) =>
          dispatch(actions.shapes.updateOne({ id: shape.id, changes }));
        return (
          <Accordion
            key={shape.id}
            className="w-full border rounded-md"
            collapsible
            type="single"
          >
            <AccordionItem value="shape1">
              <AccordionTrigger className="flex justify-between items-center gap-2 py-2 px-4">
                <div className="flex items-center gap-2">
                  <span>Shape 1</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 p-4">
                  <div className="flex gap-1">
                    <label>
                      Radius
                      <Input
                        placeholder="number"
                        type="number"
                        value={shape.radius}
                        onChange={(e) =>
                          update({ radius: parseInt(e.target.value, 10) })
                        }
                      />
                    </label>
                  </div>
                  {(["fill", "stroke"] as const).map((prop) => (
                    <div key={prop}>
                      <label>
                        {(prop[0] ?? "").toUpperCase() + prop.slice(1)} Color
                        <Input
                          className="h-10"
                          type="color"
                          value={shape[prop]}
                          onChange={(e) => update({ [prop]: e.target.value })}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}

export default ShapeEditor;
