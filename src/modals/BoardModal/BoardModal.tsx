import {
  type ComponentProps,
  type ReactNode,
  use
} from "react";

import { toast } from "react-toastify";


import ColorInput from "@/components/ColorInput/ColorInput";
import { BoardsContext } from "@/context/boards-context";
import { BoardSchema } from "@/schemas/board-schema";
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


  const { dispatchBoards } = use(BoardsContext);

  const navigate = useNavigate()

  const handleRemoveButton = (): void => {
    if (boardId === undefined) { return };
    dispatchBoards({ type: "board_removed", boardId })
    toast.success("Board removed successfully")
    modalRef.current?.close();

    navigate("/")
  };

  const handleFormSubmit = (values: Values): void => {

    if (boardId !== undefined) {
      dispatchBoards({ type: "board_edited", board: values, boardId });
      toast.success("Board editted successfully.");
    } else {
      const id = crypto.randomUUID();
      dispatchBoards({ type: "board_created", board: { ...values, lists: [], id } });
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
