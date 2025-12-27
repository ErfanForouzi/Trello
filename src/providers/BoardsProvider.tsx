import {
  type PropsWithChildren,
  type ReactNode,
  useEffect
} from "react";

import { boardReducer } from "@/reducers/boards-reducer";
import { useImmerReducer } from "use-immer";


import { boardsData } from "@/data/list-data";

import { BoardsContext } from "@/context/boards-context";
import type { BoardType } from "@/types/board";

type Props = PropsWithChildren;

function save(boards: BoardType[]): void {
  localStorage.setItem("boards", JSON.stringify(boards));
}
function load(): BoardType[] {
  const item = localStorage.getItem("boards");
  if (!item) {
    return boardsData
  }
  return JSON.parse(item);
}

export const BoardsProvider = ({ children }: Props): ReactNode => {
  const [boards, dispatchBoards] = useImmerReducer(boardReducer, undefined,load);

  useEffect(() => {
    save(boards);
  }, [boards]);

  return (
    <BoardsContext value={{ boards, dispatchBoards }}>{children}</BoardsContext>
  );
};
