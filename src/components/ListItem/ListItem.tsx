import { type ReactNode, use, useRef } from "react";


import clsx from "clsx";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ListsContext } from "@/context/lists-context";


import type { ListItemType } from "@/types/list-item.ts";

import IconButton from "../IconButton/IconButton";

import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line";
import ListItemModal from "@/modals/ListItemModal/ListItemModal";
import styles from "./ListItem.module.css";

type Props = {
  presentational?: boolean;
  item: ListItemType;
  listIndex: number;
  itemIndex: number;
};

function ListItem({
  item,
  listIndex,
  itemIndex,
  presentational,
}: Props): ReactNode {
  const { listeners, attributes, setNodeRef, transform, over, isDragging } =
    useSortable({
      id: item.id,
      data: { isList: false, listIndex, itemIndex, item },
    });

  const overListIndex = over?.data.current?.listIndex;
  const { dispatchLists } = use(ListsContext);


  const modalEditItemRef = useRef<HTMLDialogElement>(null)


  const handleEditListItemButtonClick = (): void => {
    modalEditItemRef.current?.showModal()
  };

  return (
    <>
      <div
        className={clsx(
          styles["list-item"],
          presentational && styles.presentational,
        )}
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition:
            listIndex === overListIndex ? "transform 2000ms ease" : undefined,
          opacity: isDragging ? "0.5" : 1,
        }}
        {...listeners}
        {...attributes}
      >
        {item.title}
          <IconButton onPointerDown={handleEditListItemButtonClick}>
            <MingcuteEdit2Line />
          </IconButton>
      </div>
      
      <ListItemModal
          defaultValues={item}
          modalRef={modalEditItemRef}
          listIndex={listIndex}
          itemIndex={itemIndex} />
    </>
  );
}
export default ListItem;
