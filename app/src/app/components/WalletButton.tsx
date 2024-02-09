"use client"
import {
  Button,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import LogoutIcon from "@mui/icons-material/Logout"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { ContentCopy } from "@mui/icons-material"
import WalletIcon from "@mui/icons-material/Wallet"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import SettingsIcon from "@mui/icons-material/Settings"

import { shorten } from "../helpers/utils"

export const WalletButton = ({ authority }: { authority?: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const wallet = useWallet()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { setVisible, visible } = useWalletModal()
  const toggleVisible = () => {
    setVisible(!visible)
  }

  async function copyAddress() {
    try {
      const address = wallet.publicKey?.toBase58()
      if (!address) {
        throw new Error("Wallet not connected")
      }
      await navigator.clipboard.writeText(address)
      toast.success(`${shorten(address)} copied to clipboard`)
    } catch (err: any) {
      toast.error(err.message || "Error copying address")
    } finally {
      handleClose()
    }
  }

  function onDisconnectClick() {
    wallet.disconnect()
    handleClose()
  }

  function handleChangeWallet() {
    toggleVisible()
    handleClose()
  }

  function openSettingsModal() {
    handleClose()
  }

  const isAdmin = wallet.publicKey?.toBase58() === authority
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))

  return (
    <>
      <Box>
        <Button onClick={wallet.connected ? handleClick : toggleVisible} color="primary" variant="contained">
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountBalanceWalletIcon fontSize="small" />
            <Typography variant="body2" textTransform="none">
              {wallet.connected ? shorten(wallet.publicKey?.toBase58() as string) : "Connect"}
            </Typography>
          </Stack>
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ color: "white" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isAdmin && (
          <MenuItem onClick={openSettingsModal}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>
              <Link underline="none">Admin</Link>
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={copyAddress}>
          <ListItemIcon>
            <ContentCopy />
          </ListItemIcon>
          <ListItemText>
            <Link underline="none">Copy address</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleChangeWallet}>
          <ListItemIcon>
            <WalletIcon />
          </ListItemIcon>
          <ListItemText>
            <Link underline="none">Change wallet</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={onDisconnectClick}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>
            <Link underline="none">Disconnect</Link>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
