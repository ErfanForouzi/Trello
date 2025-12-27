import { z } from "zod"
import { TitleSchema } from "./title-schema";
import { DescriptionSchema } from "./description-schema";
import { ColorSchema } from "./color-schema";

export const BoardSchema = z.object({
    title: TitleSchema,
    description: DescriptionSchema,
    color: ColorSchema
});