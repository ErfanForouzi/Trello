import { use, type ComponentProps, type ReactNode } from "react";

import Initials from "@/components/Initials/Initials";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";
import { BoardsContext } from "@/context/boards-context";
import MingcuteHome7Line from "@/icons/MingcuteHome7Line";
import MingcuteSettings5Line from "@/icons/MingcuteSettings5Line";
import { useSidebarStore } from "@/stores/sidebar-store";
import clsx from "clsx";
import styles from "./SidebarGroups.module.css";
import { useThemeStore } from "@/stores/theme-store";
import MingcuteMoonStarsLine from "@/icons/MingcuteMoonStarsLine";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

type SidebarGroup = {
    title?: string,
    items: ComponentProps<typeof SidebarItem>[]
}

export default function SidebarGroups(): ReactNode {
    const isCollapsed = useSidebarStore(state=>state.isCollapsed)
    const { boards } = use(BoardsContext)
    const toggleTheme = useThemeStore(state=>state.toggleTheme)

    const groups: SidebarGroup[] = [
        {
            items: [
                {
                    id:"home",
                    href: "/",
                    title: "Home",
                    color: "gray",
                    icon: <MingcuteHome7Line />
                }
            ]
        },
        {
            title: "System",
            items: [
                {
                    id:"settings",
                    href: "/settings",
                    title: "Settings",
                    color: "gray",
                    icon: <MingcuteSettings5Line />
                },
                {
                    id:"theme",
                    title: <ThemeSwitch/>,
                    color: "gray",
                    icon: <MingcuteMoonStarsLine />,
                    onClick:toggleTheme
                }
            ]
        },
        {
            title: "Boards",
            items: boards.map((board) => ({
                id:board.id,
                href: `/board/${board.id}`,
                title: board.title,
                color: board.color,
                icon: <Initials color={board.color} title={board.title}/>
            }))
        }
    ]
    return groups.map((group, groupIndex) => (
        <div className={clsx(styles.group,isCollapsed && styles.collapsed)} key={groupIndex}>
            {group.title && <div className={styles.title}>
                {isCollapsed ? group.title[0] : group.title}
                </div>}
            <ul>
                {
                    group.items.map((item) => (
                        <li key={item.id}>
                            <SidebarItem
                                {...item}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    ))
}