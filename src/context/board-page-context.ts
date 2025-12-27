import { createContext } from "react";

import type { BoardType } from "@/types/board";

type ContextType = {
    board: BoardType;
};

export const BoardPageContext = createContext<ContextType>({} as ContextType);
