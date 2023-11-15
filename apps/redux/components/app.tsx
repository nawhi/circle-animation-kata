"use client";
import React from "react";
import ShapeEditor from "./shape-editor";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n2Pf6AooUvy
 */
export default function App() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[1fr_280px]">
      <div className="flex flex-col">
        <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
          <h1 className="font-semibold text-lg md:text-2xl">Storyboard</h1>
        </div>
        <div className="flex overflow-x-auto py-4 px-6 border-b bg-zinc-100/40 dark:bg-zinc-800/40">
          <div className="flex items-center gap-8">
            <img
              alt="Keyframe 1"
              className="aspect-square rounded-md object-cover"
              height="80"
              src="/placeholder.svg"
              width="80"
            />
            <img
              alt="Keyframe 2"
              className="aspect-square rounded-md object-cover"
              height="80"
              src="/placeholder.svg"
              width="80"
            />
            <img
              alt="Keyframe 3"
              className="aspect-square rounded-md object-cover"
              height="80"
              src="/placeholder.svg"
              width="80"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="border shadow-sm rounded-lg h-full w-full">
            <img
              alt="Keyframe Editor"
              className="aspect-[4/3] rounded-md object-cover"
              height="600"
              src="/placeholder.svg"
              width="800"
            />
          </div>
        </div>
      </div>
      <div className="border-l bg-zinc-100/40 dark:bg-zinc-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <ShapeEditor />
        </div>
      </div>
    </div>
  );
}
