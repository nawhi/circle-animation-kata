import React from "react";
import { useAppSelector } from "../store/store";

const KeyframeEditor = (): JSX.Element => {
  const kf = useAppSelector((state) => state.app.selectedKeyframeId);
  return <div>Keyframe {kf ?? "null"} is currently being edited TODO</div>;
};

export default KeyframeEditor;
