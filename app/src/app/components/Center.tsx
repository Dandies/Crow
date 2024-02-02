import { Box } from "@mui/material"
import { PropsWithChildren } from "react"

export function Center({ children }: PropsWithChildren) {
  return (
    <Box display="flex" width="100%" height="100%" justifyContent="center" alignItems="center">
      {children}
    </Box>
  )
}
