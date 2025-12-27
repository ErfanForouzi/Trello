import type { ComponentProps, PointerEvent, ReactNode, RefObject } from "react";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton";

import MingcuteCloseLine from "@/icons/MingcuteCloseLine";

import styles from "./Modal.module.css";

type Props = ComponentProps<"dialog"> & {
  ref: RefObject<HTMLDialogElement | null>;
  contentClassName?: string;
  heading: string;
};
export default function Modal({
  children,
  heading,
  contentClassName,
  className,
  ref,
  onPointerDown,
  ...otherProps
}: Props): ReactNode {
  const handleCloseButton = (): void => {
    ref.current?.close();
  };
  const handleDialogPointerDown = (e: PointerEvent<HTMLDialogElement>): void => {
    if (e.target === e.currentTarget) {
      ref.current?.close();
    } else {
      onPointerDown?.(e);
    }
  };
  return (
    <dialog
      onPointerDown={handleDialogPointerDown}
      ref={ref}
      className={clsx(styles.modal, className)}
      {...otherProps}
    >
      <header>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.actions}>
          <IconButton onClick={handleCloseButton}>
            <MingcuteCloseLine />
          </IconButton>
        </div>
      </header>
      <main className={contentClassName}>{children}</main>
    </dialog>
  );
}
