'use client';
import ShapeEditor from './shape-editor';
import Storyboard from './storyboard';
import KeyframeEditor from './keyframe-editor';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n2Pf6AooUvy
 */
export default function App() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[1fr_280px]">
      <div className="flex flex-col">
        <Storyboard />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="border shadow-sm rounded-lg h-full w-full">
            <KeyframeEditor />
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
