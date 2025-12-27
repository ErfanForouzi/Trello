import {
  use,
  type ComponentProps,
  type ReactNode
} from "react";

import { toast } from "react-toastify";

import { ListsContext } from "@/context/lists-context";


import { ListSchema } from "@/schemas/list-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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


  const { dispatchLists } = use(ListsContext);

  const { reset, register, handleSubmit, formState: { errors } } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(ListSchema)
  })

  const handleRemoveButton = (): void => {
    if (listIndex === undefined) { return };
    dispatchLists({ type: "list_removed", listIndex })
    toast.success("List removed successfully")
    modalRef.current?.close();
  };

  const handleFormSubmit = (values: Values): void => {

    if (listIndex !== undefined) {
      dispatchLists({ type: "list_edited", list: values, listIndex });
      toast.success("List editted successfully.");
    } else {
      const id = crypto.randomUUID();
      dispatchLists({ type: "list_created", list: { ...values, items: [], id } });
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
