import { z } from "zod"
import { TitleSchema } from "./title-schema";
import { DescriptionSchema } from "./description-schema";

export const ListItemSchema = z.object({
    title: TitleSchema,
    description: DescriptionSchema,
    dueDate: z.string()
});