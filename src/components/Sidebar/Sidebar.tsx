import { type ReactNode } from "react";

import MingcuteArrowsRightLine from "@/icons/MingcuteArrowsRightLine";
import MingcuteExitLine from "@/icons/MingcuteExitLine";
import { useSidebarStore } from "@/stores/sidebar-store";
import clsx from "clsx";
import { Link } from "react-router";
import IconButton from "../IconButton/IconButton";
import Logo from "../Logo/Logo";
import SidebarGroups from "./components/SidebarGroups/SidebarGroups";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import { SidebarContext } from "./context/sidebar-context";
import styles from "./Sidebar.module.css";

export default function Sidebar(): ReactNode {
    const { fold, isCollapsed } = useSidebarStore()


    return (
        <SidebarContext value={{ isCollapsed }}>
            <aside className={clsx(styles.sidebar, isCollapsed && styles.collapsed)}>
                <div className={styles.header}>
                    <Link className={styles.logo} to={'/'} >
                        <Logo />
                    </Link>
                    <IconButton className={styles.arrow} onClick={fold}>
                        <MingcuteArrowsRightLine />
                    </IconButton>
                </div>
                <nav>
                    <SidebarGroups />
                </nav>
                <div className={styles.footer}>
                    <SidebarItem
                        id="sign-out"
                        title="Sign Out"
                        color="gray"
                        icon={<MingcuteExitLine />}
                    />
                </div>
            </aside>
        </SidebarContext>
    )
}