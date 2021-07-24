import { renderHook, act } from "@testing-library/react-hooks"
import { useThemeStore } from "stores/useThemeStore"
import "../__mocks__/zustand/zustand"
import "../__mocks__/@react-native-async-storage/async-storage"

describe("useThemStore", () => {
  it("should return light theme when set theme= light", async () => {
    const { result } = renderHook(() => useThemeStore((state) => state))

    await act(async () => result.current.setTheme("light"))
    expect(result.current.theme).toBe("light")
  })

  it("should return light theme when set theme= dark", async () => {
    const { result } = renderHook(() => useThemeStore((state) => state))

    await act(async () => result.current.setTheme("dark"))
    expect(result.current.theme).toBe("dark")
  })
})
