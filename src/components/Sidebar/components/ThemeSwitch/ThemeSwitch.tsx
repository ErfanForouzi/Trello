import type { ReactNode } from "react";

import styles from "./ThemeSwitch.module.css";
import { useThemeStore } from "@/stores/theme-store";
import clsx from "clsx";

export default function ThemeSwitch(): ReactNode {
    const theme = useThemeStore((state) => state.theme)
    return (
        <div className={clsx(styles['theme-switch'], styles[theme])}>
            Dark Mode
            <div className={styles.track}>
                <div className={styles.thumb}></div>
            </div>
        </div>
    )
}