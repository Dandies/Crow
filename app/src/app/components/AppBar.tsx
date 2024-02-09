"use client"
import {
  Box,
  Card,
  Container,
  Drawer,
  IconButton,
  AppBar as MuiAppBar,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material"
import Logo from "@/../public/crow-logo.png"
import Image from "next/image"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Tabs } from "./Tabs"
import { WalletButton } from "./WalletButton"
import { Close, Menu } from "@mui/icons-material"
import { useState } from "react"

// add this
const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

export function AppBar() {
  const [menuShowing, setMenuShowing] = useState(false)
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  function toggleMenu() {
    setMenuShowing(!menuShowing)
  }
  return (
    <>
      <MuiAppBar
        sx={{ borderBottom: 1, borderColor: "divider", maxWidth: "100%", bgcolor: "rgba(0, 0, 0, 0.3)" }}
        position="sticky"
        elevation={0}
        color="default"
      >
        <Container maxWidth={false}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box py={1}>
              <Link href="/">
                <Image src={Logo} width={150} alt="Magpie logo" style={{ display: "block" }} />
              </Link>
            </Box>
            {isXs ? (
              <IconButton onClick={toggleMenu}>
                <Menu />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <Tabs />
                <WalletButton />
              </Stack>
            )}
          </Stack>
        </Container>
      </MuiAppBar>
      {isXs && (
        <Drawer
          open={menuShowing}
          onClose={toggleMenu}
          anchor="top"
          // sx={{ height: "100vh" }}
          PaperProps={{ sx: { height: "100vh" } }}
        >
          <Card sx={{ height: "100%" }}>
            <MuiAppBar
              sx={{ borderBottom: 1, borderColor: "divider", maxWidth: "100%", bgcolor: "rgba(0, 0, 0, 0.3)" }}
              position="sticky"
              elevation={0}
              color="default"
            >
              <Container maxWidth={false}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box py={1}>
                    <Link href="/">
                      <Image src={Logo} width={150} alt="Magpie logo" style={{ display: "block" }} />
                    </Link>
                  </Box>
                  <IconButton onClick={toggleMenu}>
                    <Close />
                  </IconButton>
                </Stack>
              </Container>
            </MuiAppBar>
            <Stack alignItems="center" spacing={4} mt={4}>
              <WalletButton />
              <Tabs vertical onChange={toggleMenu} />
            </Stack>
          </Card>
        </Drawer>
      )}
    </>
  )
}
