"use client"
import { Tab, Tabs as MuiTabs, Box, Dialog } from "@mui/material"
import { last } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Pricing } from "./Pricing"

export function Tabs() {
  const [pricingShowing, setPricingShowing] = useState(false)
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
      </MuiTabs>
      <Dialog open={pricingShowing} onClose={() => setPricingShowing(false)} maxWidth="md" fullWidth>
        <Pricing onClose={() => setPricingShowing(false)} />
      </Dialog>
    </Box>
  )
}
