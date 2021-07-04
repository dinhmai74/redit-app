import { createText, TextProps as RestyleTextProps } from "@shopify/restyle"
import { translate, TxKeyPath } from "i18n"
import i18n from "i18n-js"
import React from "react"
import { Theme } from "theme"

const RestyleText = createText<Theme>()

type TextProps = RestyleTextProps<Theme> & {
  children?: React.ReactNode
  tx?: TxKeyPath
  txOptions?: i18n.TranslateOptions
}

export const Text = ({ children, tx, txOptions, ...rest }: TextProps) => {
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || children

  return <RestyleText {...rest}>{content}</RestyleText>
}
