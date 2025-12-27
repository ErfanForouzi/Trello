import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Theme } from "@/types/theme"

type ThemeStore = {
    theme: Theme,
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "dark",
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? "light" : "dark" })),
        }),
        { name: "theme" ,onRehydrateStorage:()=>{
            return (state)=>{
                document.documentElement.dataset.theme = state?.theme ?? "dark"
            }
        }}
    ),
);

useThemeStore.subscribe((state)=>{
    document.documentElement.dataset.theme = state.theme
})