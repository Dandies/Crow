import type { Metadata } from "next"
import { Providers } from "./components/Providers"
import { AppBar } from "./components/AppBar"
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material"
import Logo from "@/../public/dandies-logo.png"
import Image from "next/image"
import "./style.css"

import "@solana/wallet-adapter-react-ui/styles.css"
import { Toaster } from "react-hot-toast"
import { PriorityFees } from "./constants"
import { usePriorityFees } from "./context/priority-fees"
import { PriorityFeesSelector } from "./components/PriorityFeesSelector"

export const metadata: Metadata = {
  title: "Crow",
  description: "An app for managing NFT based escrow",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "url(/tapestry.svg)",
          backgroundSize: "100px",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <Toaster />
        <Stack sx={{ height: "100vh" }}>
          <Providers>
            <CssBaseline />
            <AppBar />
            <Box
              sx={{
                flexGrow: 1,
                overflow: "auto",
                height: "100%",
                width: "100%",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 32%, rgba(255,255,255,0) 70%)",
              }}
            >
              <Container maxWidth={false} sx={{ height: "100%" }}>
                {children}
              </Container>
            </Box>
            <Box
              sx={{
                backgroundColor: "background.default",
                width: "100%",
                zIndex: 1201,
                borderTop: "1px solid",
                borderColor: "grey.900",
              }}
              px={4}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2} py={1}>
                  <Typography fontSize="10px">powered by</Typography>
                  <Link href="https://dandies.xyz" target="_blank" rel="noreferrer" sx={{ display: "block" }}>
                    <Image src={Logo} alt="Dandes" width={35} style={{ display: "block" }} />
                  </Link>
                </Stack>
                <PriorityFeesSelector />
              </Stack>
            </Box>
          </Providers>
        </Stack>
      </body>
    </html>
  )
}
