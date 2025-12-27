import { type ActionDispatch, createContext } from "react";

import type { ListsAction } from "@/reducers/lists-reducer";

import type { ListType } from "@/types/list";

type ContextType = {
  lists: ListType[];
  dispatchLists: ActionDispatch<[action: ListsAction]>;
};

export const ListsContext = createContext<ContextType>({
  lists: [],
  dispatchLists: () => {},
});
