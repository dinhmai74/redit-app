import { palette } from "./palette"
import tokens from "@shopify/polaris-tokens"

export const colors = {
  ...palette,
  transparent: "transparent",
  body: tokens.colorBlack,
  white: tokens.colorWhite,
  backgroundRegular: tokens.colorWhite,
  backgroundSubdued: tokens.colorSkyLighter,

  text: palette["grey-900"],
  textBlue: tokens.colorBlueDark,
  textSubscription: palette["grey-700"],
  textGrey: palette["grey-500"],

  label: palette["grey-500"],
  border: palette["grey-400"],

  foregroundRegular: tokens.colorBlack,
  foregroundOff: tokens.colorInkLight,
  foregroundSubdued: tokens.colorInkLightest,
  foregroundContrasting: tokens.colorWhite,
  foregroundSuccess: tokens.colorGreenDark,

  highlightPrimary: tokens.colorIndigo,
  highlightPrimaryDisabled: tokens.colorIndigoLight,

  buttonBackgroundPlain: tokens.colorSky,
  btnBackgroundTransparent: "rgba(0,0,0,0.6)",
  errorPrimary: tokens.colorRed,

  iconBackgroundDark: tokens.colorBlueDarker,
}
