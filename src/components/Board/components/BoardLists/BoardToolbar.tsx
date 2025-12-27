import { use, useRef, type ReactNode } from "react";

import IconButton from "@/components/IconButton/IconButton";
import { BoardPageContext } from "@/context/board-page-context";
import MingcuteAddLine from "@/icons/MingcuteAddLine";
import MingcuteEdit2Line from "@/icons/MingcuteEdit2Line";
import ListModal from "@/modals/ListModal/ListModal";
import styles from "./BoardToolbar.module.css";
import BoardModal from "@/modals/BoardModal/BoardModal";

export default function BoardToolbar(): ReactNode {
    const { board } = use(BoardPageContext);

    const boardModalRef = useRef<HTMLDialogElement>(null);
    const listModalRef = useRef<HTMLDialogElement>(null);

    const handleEditBoardButtonClick = (): void => {
        boardModalRef.current?.showModal();
    };

    const handleCreateListButtonClick = (): void => {
        listModalRef.current?.showModal();
    };

    return (
        <div className={styles['board-toolbar']}>
            <div className={styles.title}>{board.title}</div>
            <div className={styles.actions}>
                <IconButton onClick={handleEditBoardButtonClick}>
                    <MingcuteEdit2Line />
                </IconButton>
                <IconButton onClick={handleCreateListButtonClick}>
                    <MingcuteAddLine />
                </IconButton>
            </div>
            <BoardModal
                modalRef={boardModalRef}
                boardId={board.id}
                defaultValues={board}
            />

            <ListModal modalRef={listModalRef} />
        </div>
    )
}