"use client"
import { Tab, Tabs as MuiTabs, Box, Dialog } from "@mui/material"
import { last } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Pricing } from "./Pricing"
import { useWallet } from "@solana/wallet-adapter-react"
import { ADMIN_WALLET } from "../constants"

export function Tabs() {
  const [pricingShowing, setPricingShowing] = useState(false)
  const wallet = useWallet()
  const path = usePathname()
  function togglePricing() {
    setPricingShowing(!pricingShowing)
  }

  const value = last(path.split("/")) || "wallet"

  return (
    <Box>
      <MuiTabs value={value}>
        <Tab label="My wallet" value="wallet" href="/" LinkComponent={Link} />
        <Tab label="Transfer" value="transfer" href="/transfer" LinkComponent={Link} />
        <Tab label="About" value="about" href="/about" LinkComponent={Link} />
        <Tab label="Pricing" value="pricing" onClick={togglePricing} />
        {wallet.publicKey?.toBase58() === ADMIN_WALLET && (
          <Tab label="Admin" value="admin" href="/admin" LinkComponent={Link} />
        )}
      </MuiTabs>
      <Dialog open={pricingShowing} onClose={() => setPricingShowing(false)} maxWidth="md" fullWidth>
        <Pricing onClose={() => setPricingShowing(false)} />
      </Dialog>
    </Box>
  )
}
