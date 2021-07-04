import { Box, Layout } from "components"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useThemeStore } from "stores/useThemeStore"

export default function Welcome() {
  const { setTheme, theme } = useThemeStore()
  const onPress = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }
  console.log("theme", theme)
  return (
    <Box flex={1} mt="xxl">
      <Layout>
        <Text>something</Text>
      </Layout>
      <TouchableOpacity onPress={onPress}>
        <Text>Button</Text>
      </TouchableOpacity>
    </Box>
  )
}
