import { BOARD_COLORS } from "@/types/board"
import { z } from "zod"

export const ColorSchema =
    z.enum(BOARD_COLORS,"Color must be one of specified options")