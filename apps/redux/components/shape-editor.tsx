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
import { Plus } from "lucide-react";
import type { Shape } from "@/lib/types";
import { chooseNextEntityNumber } from "../store/id";

function ShapeEditor(): JSX.Element {
  const dispatch = useAppDispatch();
  const shapes = useAppSelector(selectors.shapes.selectAll);
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <h4 className="text-lg font-semibold">Shapes</h4>
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
                  <span>{shape.displayName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 p-4">
                  <label>
                    Name
                    <Input
                      type="text"
                      value={shape.displayName}
                      onChange={(e) => update({ displayName: e.target.value })}
                    />
                  </label>
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
                  <Button
                    variant="ghost"
                    className={"mt-3"}
                    onClick={() => dispatch(actions.shapes.removeOne(shape.id))}
                  >
                    Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
      <Button
        size="sm"
        className="gap-2"
        variant="outline"
        onClick={() => {
          const entityNum = chooseNextEntityNumber(shapes, "shape");
          dispatch(
            actions.shapes.addOne({
              id: `shape${entityNum}`,
              displayName: `Shape ${entityNum}`,
              radius: 15,
              fill: "#ffffff",
              stroke: "#000000",
            }),
          );
        }}
      >
        <Plus />
        Add shape
      </Button>
    </div>
  );
}

export default ShapeEditor;
