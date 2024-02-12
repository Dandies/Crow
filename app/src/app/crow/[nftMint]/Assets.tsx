"use client"
import * as anchor from "@coral-xyz/anchor"
import { AssetWithPublicKey } from "@/app/types/types"
import { Box, Grid } from "@mui/material"
import { Asset } from "./Asset"
import { useEffect, useState } from "react"
import { useAnchor } from "@/app/context/anchor"
import { DigitalAssetWithCrow, useDigitalAssets } from "@/app/context/digital-assets"

export function Assets({ owner, assets }: { owner: string; assets: AssetWithPublicKey[] }) {
  return (
    <Box height="100%" overflow="scroll">
      <Grid container spacing={4}>
        {assets.map((asset, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <Asset asset={asset} owner={owner} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
