import { RootNavigator } from "navigators/RootNavigator"
import { Provider } from "Provider"
import * as React from "react"
import "react-native-gesture-handler"
import { enableScreens } from "react-native-screens"
import "./i18n"
import { ToggleStorybook } from "../storybook/toggle-storybook"

enableScreens()

export default function App() {
  return (
    <Provider>
      <ToggleStorybook>
        <RootNavigator />
      </ToggleStorybook>
    </Provider>
  )
}
