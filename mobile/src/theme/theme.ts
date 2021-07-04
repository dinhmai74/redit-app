import tokens from "@shopify/polaris-tokens"
import { createTheme, useTheme } from "@shopify/restyle"
import { TextStyle } from "react-native"
import { colors } from "./colors"
import { fontSize, typography } from "./typography"

const pxToNumber = (px: string) => {
  return parseInt(px.replace("px", ""), 10)
}

const spacing = {
  none: tokens.spacingNone,
  xxs: pxToNumber(tokens.spacingExtraTight),
  xs: pxToNumber(tokens.spacingTight),
  s: pxToNumber(tokens.spacingBaseTight),
  m: pxToNumber(tokens.spacingBase),
  l: pxToNumber(tokens.spacingLoose),
  xl: pxToNumber(tokens.spacingExtraLoose),
  xxl: 2 * pxToNumber(tokens.spacingExtraLoose),
}

const BASE_TEXT: TextStyle = {
  fontSize: fontSize.p,
  color: "body",
  fontFamily: typography.primary,
  fontWeight: "400",
}

const BASE_BTN = {
  paddingVertical: "m",
  paddingHorizontal: "xxl",
  borderRadius: "xl",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
}

const theme = createTheme({
  breakpoints: {},
  iconVariants: {
    xs: {
      width: 12,
      height: 12,
    },
    s: {
      width: 16,
      height: 16,
    },
    m: {
      width: 20,
      height: 20,
    },
    l: {
      width: 24,
      height: 24,
    },
    xl: {
      width: 32,
      height: 32,
    },
  },
  buttonVariants: {
    primary: {
      ...BASE_BTN,
      backgroundColor: "buttonBackgroundPlain",
    },
    outline: {
      ...BASE_BTN,
      backgroundColor: "transparent",
    },
    darkTransparent: {
      ...BASE_BTN,
      backgroundColor: "btnBackgroundTransparent",
    },
    transparent: {
      ...BASE_BTN,
      paddingHorizontal: "none",
      paddingVertical: "none",
      backgroundColor: "transparent",
    },
  },
  textVariants: {
    buttonprimary: {
      ...BASE_TEXT,
    },
    buttondarkTransparent: {
      ...BASE_BTN,
      color: "white",
    },
    buttontransparent: {
      ...BASE_TEXT,
    },
    h1: {
      ...BASE_TEXT,
      fontSize: fontSize.h1,
    },

    h2: {
      ...BASE_TEXT,
      fontSize: fontSize.h1,
    },

    h3: {
      ...BASE_TEXT,
      fontSize: fontSize.h3,
    },

    h4: {
      ...BASE_TEXT,
      fontSize: fontSize.h4,
    },

    h5: {
      ...BASE_TEXT,
      fontSize: fontSize.h5,
    },
    p: {
      ...BASE_TEXT,
    },
    s: {
      ...BASE_TEXT,
      fontSize: fontSize.s,
      color: "textSubscription",
    },
    label: {
      ...BASE_TEXT,
      fontSize: fontSize.label,
      color: "label",
    },
  },
  headerVariants: {
    default: {
      flexDirection: "row",
      paddingHorizontal: "l",
      alignItems: "center",
      paddingTop: "m",
      paddingBottom: "m",
      justifyContent: "space-between",
      backgroundColor: "backgroundRegular",
      zIndex: 1,
      position: "relative",
    },
  },

  colors,
  spacing: {
    none: tokens.spacingNone,
    xxs: pxToNumber(tokens.spacingExtraTight),
    xs: pxToNumber(tokens.spacingTight),
    s: pxToNumber(tokens.spacingBaseTight),
    m: pxToNumber(tokens.spacingBase),
    l: pxToNumber(tokens.spacingLoose),
    xl: pxToNumber(tokens.spacingExtraLoose),
    xxl: 2 * pxToNumber(tokens.spacingExtraLoose),
  },
  borderRadii: {
    rounded: 9999999999,
    ...spacing,
  },
})

export type Theme = typeof theme
export type Color = keyof typeof colors
export const useAppTheme = () => useTheme<Theme>()
export default theme
export { theme }
