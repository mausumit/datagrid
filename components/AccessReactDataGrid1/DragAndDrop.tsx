import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DnDWrapperProps } from "./Types";

function useDNDProviderElement(props: DnDWrapperProps) {
  if (props.condition) {
    return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
  } else {
    return <>{props.children}</>;
  }
}

export default function DragAndDrop(props: DnDWrapperProps) {
  const DNDElement = useDNDProviderElement(props);
  return <React.Fragment>{DNDElement}</React.Fragment>;
}
