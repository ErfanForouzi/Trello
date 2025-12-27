import { type ReactNode, useRef } from "react";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteAddLine from "@/icons/MingcuteAddLine";
import MingcuteDotsLine from "@/icons/MingcuteDotsLine";

import ListItemModal from "@/modals/ListItemModal/ListItemModal";

import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line";
import ListModal from "@/modals/ListModal/ListModal";
import type { ListType } from "@/types/list";
import styles from "./ListHeader.module.css";

type Props = {
  listIndex: number;
  list: ListType;
  listeners?: SyntheticListenerMap;
};

export default function ListHeader({
  list,
  listIndex,
  listeners,
}: Props): ReactNode {
  const listModalRef = useRef<HTMLDialogElement>(null);
  const listItemModalRef = useRef<HTMLDialogElement>(null);
  const handleCreateListItemButtonClick = (): void => {
    listItemModalRef.current?.showModal();
  };
  const handleEditListButtonClick = (): void => {
    listModalRef.current?.showModal();
  };
  return (
    <div className={styles["list-header"]}>
      <div className={styles["drag-handle"]} {...listeners}>
        <MingcuteDotsLine />
        <div className={styles.title}>{list.title}</div>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={handleEditListButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListItemButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
      <ListItemModal modalRef={listItemModalRef} listIndex={listIndex} />
      <ListModal modalRef={listModalRef} listIndex={listIndex} defaultValues={list}/>
    </div>
  );
}
