import { type ReactNode } from "react";

import clsx from "clsx";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { ListType } from "@/types/list.ts";

import ListHeader from "./components/ListHeader/ListHeader";
import ListItems from "./components/ListItems/ListItems";

import styles from "./List.module.css";

type Props = {
  presentational?: boolean;
  list: ListType;
  listIndex: number;
};

function List({ list, listIndex, presentational }: Props): ReactNode {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: { isList: true, listIndex, list },
  });

  return (
    <div
      className={clsx(styles.list, presentational && styles.presentational)}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? "0.5" : 1,
      }}
      {...attributes}
    >
      <ListHeader
        listeners={listeners}
        list={list}
        listIndex={listIndex}
      />
      <ListItems
        presentational={presentational}
        list={list}
        listIndex={listIndex}
      />
    </div>
  );
}
export default List;
