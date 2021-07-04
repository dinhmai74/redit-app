import { configure, getStorybookUI } from "@storybook/react-native"
import React, { useEffect } from "react"

declare let module: any

configure(() => {
  require("./storybook-registry")
}, module)

const StorybookUI = getStorybookUI({
  port: 9001,
  host: "localhost",
  onDeviceUI: true,
  asyncStorage: require("@react-native-async-storage/async-storage").default || null,
})

export function StorybookUIRoot() {
  useEffect(() => {
    ;(async () => {
      // @ts-ignore
    })()
  }, [])

  return <StorybookUI />
}
