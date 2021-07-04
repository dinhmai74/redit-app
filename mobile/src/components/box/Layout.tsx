import { Box } from "./Box"
import React from "react"
import { BoxProps } from "@shopify/restyle"
import { Theme } from "theme"

type LayoutProps = BoxProps<Theme> & {
  children?: React.ReactNode
}

export const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <Box backgroundColor="backgroundRegular" {...props}>
      {children}
    </Box>
  )
}
