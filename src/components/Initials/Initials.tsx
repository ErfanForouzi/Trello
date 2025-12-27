import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Initials.module.css"
import type { BoardColor } from "@/types/board";

type Props = {
    className?:string,
    title:string,
    color:BoardColor
}

export default function Initials({className,color,title}:Props):ReactNode{
    const parts = title.trim().split(/\s+/);
    const initials = `${parts[0][0]}${parts.at(-1)?.[0] ?? ""}`
    return(
        <div className={clsx(styles.initials,className,color)}>
          <div className={styles.text}>
            {initials}
          </div>
        </div>
    )
}