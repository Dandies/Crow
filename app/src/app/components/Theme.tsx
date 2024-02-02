"use client"
import { ThemeProvider, createTheme } from "@mui/material"
import { PropsWithChildren } from "react"

export function Theme({ children }: PropsWithChildren) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#6cbec9",
      },
    },
  })
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}
