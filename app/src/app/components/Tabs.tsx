"use client"
import { Tab, Tabs as MuiTabs } from "@mui/material"
import { last } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Tabs() {
  const path = usePathname()

  const value = last(path.split("/")) || "wallet"

  return (
    <MuiTabs value={value}>
      <Tab label="My wallet" value="wallet" href="/" LinkComponent={Link} />
      <Tab label="Transfer" value="transfer" href="/transfer" LinkComponent={Link} />
      <Tab label="About" value="about" href="/about" LinkComponent={Link} />
      <Tab label="Pricing" value="pricing" href="/pricing" LinkComponent={Link} />
    </MuiTabs>
  )
}
