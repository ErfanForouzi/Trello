import {
  type PropsWithChildren,
  type ReactNode,
  use,
  useEffect
} from "react";

import { listReducer } from "@/reducers/lists-reducer";
import { useImmerReducer } from "use-immer";

import { ListsContext } from "@/context/lists-context";


import { BoardPageContext } from "@/context/board-page-context";
import { BoardsContext } from "@/context/boards-context";

type Props = PropsWithChildren;


export const ListsProvider = ({ children }: Props): ReactNode => {
  const {  dispatchBoards } = use(BoardsContext)
  const { board } = use(BoardPageContext)
  const [lists, dispatchLists] = useImmerReducer(listReducer, board.lists);

  useEffect(() => {
    dispatchBoards({
      type: "board_edited",
      board: { lists },
      boardId: board.id
    })
  }, [board.id, dispatchBoards, lists]);

  return (
    <ListsContext value={{ lists, dispatchLists }}>{children}</ListsContext>
  );
};
