"use client"
import { Box, Container, AppBar as MuiAppBar, Stack } from "@mui/material"
import Logo from "@/../public/crow-logo.png"
import Image from "next/image"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Tabs } from "./Tabs"
import { WalletButton } from "./WalletButton"

// add this
const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

export function AppBar() {
  return (
    <MuiAppBar
      sx={{ borderBottom: 1, borderColor: "divider", maxWidth: "100%" }}
      position="sticky"
      elevation={0}
      color="default"
    >
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box py={2}>
            <Link href="/">
              <Image src={Logo} width={200} alt="Magpie logo" style={{ display: "block" }} />
            </Link>
          </Box>
          <Stack direction="row" spacing={2}>
            <Tabs />
            <WalletButton />
          </Stack>
        </Stack>
      </Container>
    </MuiAppBar>
  )
}
