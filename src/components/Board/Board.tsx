import { type ReactNode } from "react";


import type { BoardType } from "@/types/board";
import styles from "./Board.module.css";
import BoardToolbar from "./components/BoardLists/BoardToolbar";
import BoardLists from "./components/BoardToolbar/BoardLists";

type Props = {
  board:BoardType
}

export default function Board({board}:Props): ReactNode {

  return (
    <div className={styles.board}>
      <BoardToolbar board={board} />
      <BoardLists lists={board.lists} />
    </div>
  );
}
