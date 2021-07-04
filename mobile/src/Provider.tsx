import { ThemeProvider } from "@shopify/restyle"
import React, { ReactNode } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { useThemeStore } from "stores/useThemeStore"
import { darkTheme, lightTheme } from "./theme"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
type Props = {
  children: ReactNode
}

export const Provider = ({ children }: Props) => {
  const { theme } = useThemeStore()

  const restyleTheme = theme === "light" ? lightTheme : darkTheme

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider theme={restyleTheme}>{children}</ThemeProvider>
    </SafeAreaProvider>
  )
}
