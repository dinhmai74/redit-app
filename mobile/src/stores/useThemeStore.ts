import { storage } from "stores/utils"
import create from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark"

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>(
  persist(
    (set, _get) => ({
      theme: "light",
      setTheme: (theme) => set((state) => ({ ...state, theme })),
    }),
    {
      name: "theme-storage", // unique name
      getStorage: () => storage,
    },
  ),
)
