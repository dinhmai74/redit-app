import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Text } from "./Text"

declare let module: NodeModule

const VIEWSTYLE = {
  flex: 1,
}
const viewStyleArray: ViewStyle[] = [VIEWSTYLE, { backgroundColor: "#7fff00" }]

storiesOf("Text", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="default" usage="Used for normal body text.">
        <View style={VIEWSTYLE}>
          <Text>Hello!</Text>
          <Text pt="l">
            Check out{"\n"}
            my{"\n"}
            line height
          </Text>
          <Text pt="l">The quick brown fox jumped over the slow lazy dog.</Text>
          <Text>$123,456,789.00</Text>
        </View>
      </UseCase>
      <UseCase text="bold" usage="Used for bolded body text.">
        <View style={VIEWSTYLE}>
          <Text fontWeight="bold">snap! I'm puffy.</Text>
        </View>
      </UseCase>
      <UseCase text="header" usage="Used for major section headers.">
        <View style={VIEWSTYLE}>
          <Text variant="h1">Behold!</Text>
        </View>
      </UseCase>
    </Story>
  ))
  .add("Passing Content", () => (
    <Story>
      <UseCase
        text="text"
        usage="Used when you want to pass a value but don't want to open a child."
      >
        <View style={VIEWSTYLE}>
          <Text>Heyo</Text>
        </View>
      </UseCase>
      <UseCase text="tx" usage="Used for looking up i18n keys.">
        <View style={VIEWSTYLE}>
          <Text tx="common.ok" />
          <Text tx="common.cancel" />
        </View>
      </UseCase>
      <UseCase
        text="children"
        usage="Used like you would normally use a React Native <Text> component."
      >
        <View style={VIEWSTYLE}>
          <Text>Passing strings as children.</Text>
        </View>
      </UseCase>
      <UseCase text="nested children" usage="You can embed them and change styles too.">
        <View style={VIEWSTYLE}>
          <Text>
            {" "}
            Hello <Text fontWeight="bold">bolded</Text> World.
          </Text>
        </View>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text="Style array" usage="Text with style array">
        <View style={viewStyleArray}>
          <Text>
            {" "}
            Hello <Text fontWeight="bold">bolded</Text> World.
          </Text>
        </View>
      </UseCase>
    </Story>
  ))
