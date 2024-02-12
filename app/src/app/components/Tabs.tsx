"use client"
import { Tab, Tabs as MuiTabs, Box, Dialog } from "@mui/material"
import { last } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { ADMIN_WALLET } from "../constants"

export function Tabs({
  vertical = false,
  onChange = () => {},
}: {
  vertical?: boolean
  onChange?: (...args: any) => any
}) {
  const wallet = useWallet()
  const path = usePathname()

  const value = last(path.split("/")) || "crows"

  return (
    <Box>
      <MuiTabs value={value} orientation={vertical ? "vertical" : "horizontal"} onChange={onChange}>
        <Tab
          label="Crows"
          value="crows"
          href="/"
          LinkComponent={Link}
          sx={{
            textTransform: "none",
            "&.Mui-selected": { fontWeight: "bold" },
            fontSize: vertical ? "24px" : "unset",
          }}
        />
        <Tab
          label="Load"
          value="load"
          href="/load"
          LinkComponent={Link}
          sx={{
            textTransform: "none",
            "&.Mui-selected": { fontWeight: "bold" },
            fontSize: vertical ? "24px" : "unset",
          }}
        />
        <Tab
          label="About"
          value="about"
          href="/about"
          LinkComponent={Link}
          sx={{
            textTransform: "none",
            "&.Mui-selected": { fontWeight: "bold" },
            fontSize: vertical ? "24px" : "unset",
          }}
        />
        <Tab
          label="Pricing"
          value="pricing"
          href="/pricing"
          LinkComponent={Link}
          sx={{
            textTransform: "none",
            "&.Mui-selected": { fontWeight: "bold" },
            fontSize: vertical ? "24px" : "unset",
          }}
        />
        {wallet.publicKey?.toBase58() === ADMIN_WALLET && (
          <Tab
            label="Admin"
            value="admin"
            href="/admin"
            LinkComponent={Link}
            sx={{
              textTransform: "none",
              "&.Mui-selected": { fontWeight: "bold" },
              fontSize: vertical ? "24px" : "unset",
            }}
          />
        )}
      </MuiTabs>
    </Box>
  )
}
