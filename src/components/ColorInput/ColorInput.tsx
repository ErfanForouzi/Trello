import { type ComponentProps, type ReactNode, useId, useState } from "react";

import clsx from "clsx";

import styles from "./ColorInput.module.css";
import { BOARD_COLORS, type BoardColor } from "@/types/board";
import MingcuteCheckFill from "@/icons/MingcuteCheckFill";

type Props = Omit<ComponentProps<"input">,"type" | "value" | "onChange" | "defaultValue"> & {
  label: string;
  error?: string | null;
  value?:BoardColor,
  defaultValue?:BoardColor,
  onChange?:(value:BoardColor)=>void
};

export default function ColorInput({
  error,
  className,
  label,
value:controlledValue,
defaultValue,
onChange,
  ...otherProps
}: Props): ReactNode {
  
  const id = useId();

  const [unControlledValue,setUnControlledValue] = useState<BoardColor>(defaultValue ?? "blue")
  const value = controlledValue ?? unControlledValue

  const handleButtonClick = (color:BoardColor):void=>{
    setUnControlledValue(color)
       onChange?.(color)
  }


  return (
    <div
      className={clsx(styles["color-input"], !!error && styles.error, className)}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles.colors}>
        {BOARD_COLORS.map((color)=>(
          <button 
          onClick={()=>handleButtonClick(color)} 
          type="button" 
          key={color} 
          className={clsx(color, color === value && styles.active)}>
                   {color === value && <MingcuteCheckFill/>}
          </button>
        ))}
      </div>
      <input value={value} type="hidden"  id={id} {...otherProps} />
      <span className={styles.error}>{error || "\u00A0"}</span>
    </div>
  );
}
