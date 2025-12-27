import {
  type ComponentProps,
  type ReactNode,
  use
} from "react";

import { toast } from "react-toastify";

import { ListsContext } from "@/context/lists-context";


import TextArea from "@/components/TextArea/TextArea";
import { ListItemSchema } from "@/schemas/list-item-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import TextInput from "../../components/TextInput/TextInput";
import FormModal from "../FormModal/FormModal";

type Values = z.infer<typeof ListItemSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex: number;
  itemIndex?: number,
  defaultValues?: Values
};
export default function ListItemModal({
  modalRef,
  listIndex,
  itemIndex,
  defaultValues
}: Props): ReactNode {
  const { dispatchLists } = use(ListsContext);
  const {reset,register,formState:{errors},handleSubmit} = useForm({
    defaultValues,
    resolver:zodResolver(ListItemSchema)
  })
  const handleRemoveButton = (): void => {
    if (itemIndex === undefined) { return };
    dispatchLists({ type: "item_removed", listIndex, itemIndex })
    toast.success("Item removed successfully")
    modalRef.current?.close();
  };


  const handleFormSubmit = (values:Values): void => {
    if (itemIndex !== undefined) {

      dispatchLists({ type: "item_edited", listIndex, itemIndex, item: values });
      toast.success("Item editted successfully.");
    } else {
      const id = crypto.randomUUID();
      dispatchLists({ type: "item_created", listIndex, item: { id, ...values } });
      toast.success("Item created successfully.");
    }

    modalRef.current?.close();
  };



  return (
    <FormModal
    onClose={() => reset()}
      heading={itemIndex !== undefined ? "Edit a Item" : "Create a New Item"}
      modalRef={modalRef}
      onSubmit={handleSubmit(handleFormSubmit)}
      onRemove={
        itemIndex !== undefined && handleRemoveButton
      }
    >
      <TextInput
        label="Title"
        error={errors.title?.message}
        type="text"
        {...register('title')}
      />
      <TextArea
        error={errors.description?.message}
        label="Description"
        {...register('description')}
      />
      <TextInput
        label="Due Date"
        error={errors.dueDate?.message}
        type="date"
        {...register('dueDate')}
      />
    </FormModal>
  );
}
