import { type ReactNode } from "react";

import Board from "@/components/Board/Board";

import DndProvider from "@/providers/DndProvider/DndProvider";
import { useKanbanStore } from "@/stores/kanban-store";
import { useParams } from "react-router";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const { boardId } = useParams();
  const boards = useKanbanStore(state => state.boards)
  const board = boards.find((board) => board.id === boardId);

  if (!board) {
    return <NotFoundPage />
  }

  return (
        <DndProvider>
          <div className={styles["board-page"]}>
            <Board board={board} />
          </div>
        </DndProvider>
  )
}

