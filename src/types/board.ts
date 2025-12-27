import type { ListType } from "./list"

export type BoardType = {
    id: string
    color: BoardColor
    title: string
    description: string
    lists: ListType[]
}

export const BOARD_COLORS = Object.freeze([
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "purple",
    "gray",
  ] as const);
  
export type BoardColor = (typeof BOARD_COLORS)[number]