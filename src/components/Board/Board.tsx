import { type ReactNode } from "react";


import styles from "./Board.module.css";
import BoardToolbar from "./components/BoardLists/BoardToolbar";
import BoardLists from "./components/BoardToolbar/BoardLists";

export default function Board(): ReactNode {

  return (
    <div className={styles.board}>
      <BoardToolbar />
      <BoardLists />
    </div>
  );
}
