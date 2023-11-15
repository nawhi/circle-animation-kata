"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n2Pf6AooUvy
 */
import Link from "next/link";
import { Button } from "react-daisyui";
import React from "react";

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
          <div className="flex h-[60px] items-center border-b px-6">
            <span className="font-semibold">Shapes</span>
            <Button className="ml-auto" size="sm">
              Add
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                href="#"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="18" rx="2" width="18" x="3" y="3" />
                </svg>
                Square
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                href="#"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Circle
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                href="#"
              >
                <svg
                  className=" h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                </svg>
                Triangle
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
