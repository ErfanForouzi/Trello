import { useSidebarStore } from "@/stores/sidebar-store";
import type { ReactNode } from "react";


import styles from "./Logo.module.css"

export default function Logo():ReactNode{
    const isCollapsed = useSidebarStore(state=>state.isCollapsed)
    return(
       <div className={styles.logo}>
        {isCollapsed ? "T":"Trello"}
       </div>
    )
}