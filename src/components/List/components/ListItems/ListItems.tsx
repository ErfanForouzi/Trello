import { type ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import ListItem from "@/components/ListItem/ListItem.tsx";

import type { ListType } from "@/types/list.ts";

import styles from "./ListItems.module.css";

type Props = {
  presentational?: boolean;
  list: ListType;
  listIndex: number;
};
export default function ListItems({
  list,
  listIndex,
  presentational,
}: Props): ReactNode {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { isList: true, listIndex, list },
  });

  return (
    <SortableContext id={list.id} items={list.items.map((item) => item.id)}>
      <ul ref={setNodeRef} className={styles["list-items"]}>
        {list.items.map((item, itemIndex) => (
          <li key={item.id}>
            <ListItem
              presentational={presentational}
              item={item}
              itemIndex={itemIndex}
              listIndex={listIndex}
            />
          </li>
        ))}
      </ul>
    </SortableContext>
  );
}
