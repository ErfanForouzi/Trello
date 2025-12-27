import { use, type ReactNode } from "react";

import Board from "@/components/Board/Board";

import DndProvider from "@/providers/DndProvider/DndProvider";
import { ListsProvider } from "@/providers/ListsProvider";

import { BoardsContext } from "@/context/boards-context";
import { BoardPageProvider } from "@/providers/BoardPageProvider";
import { useParams } from "react-router";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const { id } = useParams();
  const { boards } = use(BoardsContext)
  const board = boards.find((board) => board.id === id);

  if (!board) {
    return <NotFoundPage/>
  }

  return (
    <BoardPageProvider board={board}>
      <ListsProvider key={id}> 
        <DndProvider>
          <div className={styles["board-page"]}>
            <Board />
          </div>
        </DndProvider>
      </ListsProvider>
    </BoardPageProvider>
  )
}

