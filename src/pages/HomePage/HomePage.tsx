import { use, useRef, type ReactNode } from "react";

import BoardCard from "@/components/BoardCard/BoardCard";
import Button from "@/components/Button/Button";

import { BoardsContext } from "@/context/boards-context";
import BoardModal from "@/modals/BoardModal/BoardModal";
import styles from "./HomePage.module.css";

export default function HomePage(): ReactNode {
  const {boards} = use(BoardsContext)

  const modalRef = useRef<HTMLDialogElement>(null)
  const handleCreateButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return(
      <div className={styles["home-page"]}>
        <div className={styles.header}>
          <h1>Boards</h1>
          <Button onClick={handleCreateButtonClick} variant="solid" color="primary">
            Create
          </Button>
        </div>
        <ul className={styles.boards}>
          {boards.length ?boards.map((board)=>(
            <li key={board.id}>
            <BoardCard
             board={board}
            />
          </li>
          )):<h1>No Boards</h1>}
        </ul>
        <BoardModal modalRef={modalRef}/>
      </div>
    );
}

