import { storage } from "stores/utils"
import create from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
  token: string | null
  login: (username: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>(
  persist(
    (set, _get) => ({
      token: null,
      login: async (username, password) => {},
    }),
    {
      name: "auth-storage", // unique name
      getStorage: () => storage,
    },
  ),
)
