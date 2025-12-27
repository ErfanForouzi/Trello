import { type PropsWithChildren, type ReactNode, use, useState } from "react";

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import List from "@/components/List/List";
import ListItem from "@/components/ListItem/ListItem";

import { ListsContext } from "@/context/lists-context";

import type { DraggableData } from "@/types/draggable-data";

type Props = PropsWithChildren;

export default function DndProvider({ children }: Props): ReactNode {
  const [activeData, setActiveData] = useState<DraggableData | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const { dispatchLists } = use(ListsContext);

  const handleDragStart = (e: DragStartEvent): void => {
    setActiveData(e.active.data.current as DraggableData);
  };
  const handleDragOver = (e: DragOverEvent): void => {
    if (!e.over || e.active.data.current!.isList) {
      return;
    }
    dispatchLists({
      type: "item_dragged_over",
      activeListIndex: e.active.data.current!.listIndex,
      activeItemIndex: e.active.data.current!.itemIndex,
      overItemIndex: e.over?.data.current!.itemIndex,
      overListIndex: e.over?.data.current!.listIndex,
    });
  };

  const handleDragEnd = (e: DragEndEvent): void => {
    setActiveData(null);
    if (!e.over) {
      return;
    }
    if (e.active.data.current!.isList) {
      dispatchLists({
        type: "list_dragged_end",
        activeListIndex: e.active.data.current!.listIndex,
        overListIndex: e.over?.data.current!.listIndex,
      });
    } else {
      dispatchLists({
        type: "item_dragged_end",
        activeListIndex: e.active.data.current!.listIndex,
        activeItemIndex: e.active.data.current!.itemIndex,
        overItemIndex: e.over?.data.current!.itemIndex,
      });
    }
  };

  return (
    <DndContext
      onDragOver={handleDragOver}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData &&
          (activeData.isList ? (
            <List
              presentational
              list={activeData.list}
              listIndex={activeData.listIndex}
            />
          ) : (
            <ListItem
              presentational
              listIndex={activeData.listIndex}
              item={activeData.item}
              itemIndex={activeData.itemIndex}
            />
          ))}
      </DragOverlay>
    </DndContext>
  );
}
