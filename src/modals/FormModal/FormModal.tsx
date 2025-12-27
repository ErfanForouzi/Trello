import {
  type ComponentProps,
  type ReactNode
} from "react";

import clsx from "clsx";

import Button from "../../components/Button/Button";
import Modal from "../Modal/Modal";

import styles from "./FormModal.module.css";

type ModalProps = {
  modalRef: ComponentProps<typeof Modal>["ref"];
  heading: ComponentProps<typeof Modal>["heading"];
  onClose:ComponentProps<typeof Modal>["onClose"]
};
type FormProps = ComponentProps<"form"> & {
  onRemove?: false | (() => void);
};
type Props = FormProps & ModalProps;
export default function FormModal({
  modalRef,
  children,
  onRemove,
  heading,
  onClose,
  ...otherProps
}: Props): ReactNode {

  const handleCancelButtonClick = (): void => {
    modalRef.current?.close();
  };

  return (
    <Modal
      onClose={onClose}
      heading={heading}
      ref={modalRef}
      contentClassName={clsx(styles["form-modal"])}
    >
      <form
        {...otherProps}
      >
        {children}
        <div className={styles.actions}>
          {onRemove && (
            <Button
              type="button"
              variant="text"
              color="danger"
              onClick={onRemove}
            >
              Remove
            </Button>
          )}
          <Button
            className={styles.cancel}
            color="danger"
            onClick={handleCancelButtonClick}
            type="reset"
          >
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
