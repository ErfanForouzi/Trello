import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./Button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "solid" | "outlined" | "text";
  color?: "default" | "primary" | "danger";
};
export default function Button({
  color = "default",
  variant = "solid",
  children,
  className,
  ...otherProps
}: Props): ReactNode {
  return (
    <button
      {...otherProps}
      className={clsx(styles.button, styles[color], styles[variant], className)}
    >
      {children}
    </button>
  );
}
