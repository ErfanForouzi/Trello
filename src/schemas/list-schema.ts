import {z} from "zod"
import { TitleSchema } from "./title-schema";

export const ListSchema = z.object({
    title:TitleSchema
});