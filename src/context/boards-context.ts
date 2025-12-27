import { type ActionDispatch, createContext } from "react";


import type { BoardsAction } from "@/reducers/boards-reducer";
import type { BoardType } from "@/types/board";

type ContextType = {
  boards: BoardType[];
  dispatchBoards: ActionDispatch<[action: BoardsAction]>;
};

export const BoardsContext = createContext<ContextType>({} as ContextType);
