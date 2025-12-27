import {
  type ComponentProps,
  type ReactNode
} from "react";

import { toast } from "react-toastify";


import ColorInput from "@/components/ColorInput/ColorInput";
import { BoardSchema } from "@/schemas/board-schema";
import { useKanbanStore } from "@/stores/kanban-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import TextInput from "../../components/TextInput/TextInput";
import FormModal from "../FormModal/FormModal";

type Values = z.infer<typeof BoardSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  boardId?: string,
  defaultValues?: Values
};

export default function BoardModal({
  modalRef,
  boardId,
  defaultValues 
}: Props): ReactNode {
  const { reset,register, formState: { errors }, handleSubmit, control } = useForm({
    defaultValues : defaultValues ?? {color:"blue"},
    resolver: zodResolver(BoardSchema)
  })


  const createBoard = useKanbanStore(state=>state.createBoard)
  const editBoard = useKanbanStore(state=>state.editBoard)
  const removeBoard = useKanbanStore(state=>state.removeBoard)


  const navigate = useNavigate()

  const handleRemoveButton = (): void => {
    if (boardId === undefined) { return };
     removeBoard(boardId)
    toast.success("Board removed successfully")
    modalRef.current?.close();

    navigate("/")
  };

  const handleFormSubmit = (values: Values): void => {

    if (boardId !== undefined) {
      editBoard(boardId,values)
      toast.success("Board editted successfully.");
    } else {
      createBoard(values)
      toast.success("Board created successfully.");
    }
    modalRef.current?.close();
  };


  return (
    <FormModal
    onClose={() => reset()}
      heading={boardId !== undefined ? "Edit Existing Board" : "Create a New Board"}
      modalRef={modalRef}
      onSubmit={handleSubmit(handleFormSubmit)}
      onRemove={
        boardId !== undefined && handleRemoveButton
      }
    >
      <TextInput
        error={errors.title?.message}
        type="text"
        label="Title"
        {...register('title')}
      />
      <TextInput
        error={errors.description?.message}
        type="text"
        label="Description"
        {...register('description')}
      />
      <Controller
        name="color"
        control={control}
        render={({ field }) => {
          return (
            <ColorInput
              error={errors.color?.message}
              label="Color"
              {...field}
            />
          )
        }}
      />

    </FormModal>
  );
}
