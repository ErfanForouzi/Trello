import {
  type ComponentProps,
  type ReactNode
} from "react";

import { toast } from "react-toastify";



import { ListSchema } from "@/schemas/list-schema";
import { useKanbanStore } from "@/stores/kanban-store";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router";
import z from "zod";
import TextInput from "../../components/TextInput/TextInput";
import FormModal from "../FormModal/FormModal";


type Values = z.infer<typeof ListSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex?: number,
  defaultValues?: Values
};

export default function ListModal({
  modalRef,
  listIndex,
  defaultValues
}: Props): ReactNode {


const {boardId} = useParams()

const  createList= useKanbanStore(state=>state.createList)
const  editList= useKanbanStore(state=>state.editList)
const  removeList= useKanbanStore(state=>state.removeList)

  const { reset, register, handleSubmit, formState: { errors } } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(ListSchema)
  })

  const handleRemoveButton = (): void => {
    if (listIndex === undefined) { return };
    removeList(boardId,listIndex)
    toast.success("List removed successfully")
    modalRef.current?.close();
  };

  const handleFormSubmit = (values: Values): void => {

    if (listIndex !== undefined) {
      editList(boardId,listIndex,values)
      toast.success("List editted successfully.");
    } else {
      createList(boardId,values)
      toast.success("List created successfully.");
    }


    modalRef.current?.close();
  };



  return (
    <FormModal
      onClose={() => reset()}
      heading={listIndex !== undefined ? "Edit Existing List" : "Create a New List"}
      modalRef={modalRef}
      onSubmit={handleSubmit(handleFormSubmit)}
      onRemove={
        listIndex !== undefined && handleRemoveButton
      }
    >
      <TextInput
        {...register('title')}
        error={errors.title?.message}
        type="text"
        label="Title"
      />
    </FormModal>
  );
}
