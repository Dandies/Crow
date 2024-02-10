"use client"
import * as anchor from "@coral-xyz/anchor"
import { Center } from "@/app/components/Center"
import { Card, CardContent, Stack, Typography, Box, Grid, Button, Container } from "@mui/material"
import Link from "next/link"
import { Asset } from "./Asset"
import { anonymousProgram } from "@/app/helpers/anchor"
import { notFound } from "next/navigation"
import { getDigitalAsset } from "@/app/helpers/helius"
import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { mapDasWithAccounts } from "@/app/helpers/utils"
import { DigitalAssetWithCrow, useDigitalAssets } from "@/app/context/digital-assets"
import { CopyAddress } from "@/app/components/CopyAddress"
import { InitializeCrow } from "./InitializeCrow"
import { findCrowPda } from "@/app/helpers/pdas"
import { publicKey } from "@metaplex-foundation/umi"
import { useEffect, useState } from "react"
import { useAnchor } from "@/app/context/anchor"
import { AssetWithPublicKey } from "@/app/types/types"
import { fetchDaWithCrow } from "./data"

export function Client({ daWithCrow: initialDaWithCrow }: { daWithCrow: DigitalAssetWithCrow }) {
  const program = useAnchor()
  const [daWithCrow, setDaWithCrow] = useState<DigitalAssetWithCrow>(initialDaWithCrow)

  useEffect(() => {
    setDaWithCrow(initialDaWithCrow)
  }, [initialDaWithCrow])

  async function fetchDigitalAsset(nftMint: string) {
    const daWithCrow = await fetchDaWithCrow(nftMint)
    setDaWithCrow(daWithCrow)
  }

  useEffect(() => {
    fetchDigitalAsset(daWithCrow.id)
    const id = program.provider.connection.onAccountChange(
      toWeb3JsPublicKey(findCrowPda(publicKey(daWithCrow.id))),
      () => fetchDigitalAsset(daWithCrow.id)
    )
    return () => {
      program.provider.connection.removeAccountChangeListener(id)
    }
  }, [daWithCrow.id])

  return (
    <Container sx={{ height: "100%", width: "100%" }}>
      <Center>
        <Stack spacing={4} width="100%" maxHeight="80vh" height="100%">
          <Stack>
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              Crow Account
            </Typography>
            <CopyAddress textAlign="right" variant="h6" color="primary">
              {daWithCrow?.crow?.publicKey}
            </CopyAddress>
            {daWithCrow && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontWeight="bold">NFT mint:</Typography>
                    <CopyAddress variant="h6" color="primary">
                      {daWithCrow.id}
                    </CopyAddress>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontWeight="bold">Owned by:</Typography>
                    <CopyAddress variant="h6" color="primary">
                      {daWithCrow.ownership.owner}
                    </CopyAddress>
                  </Stack>
                </Stack>
                <Box>
                  <Button variant="contained" LinkComponent={Link} href={`/transfer?nft=${daWithCrow.id}`}>
                    Add assets to Crow
                  </Button>
                </Box>
              </Stack>
            )}
          </Stack>

          {daWithCrow?.crow ? (
            <>
              {daWithCrow.crow?.assets?.length ? (
                <Box height="100%" overflow="scroll">
                  <Grid container spacing={4}>
                    {daWithCrow.crow?.assets.map((asset, i) => (
                      <Grid item xs={6} sm={4} md={3} key={i}>
                        <Asset asset={asset} owner={daWithCrow.ownership.owner} fetchDigitalAsset={fetchDigitalAsset} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Center>
                  <Stack alignItems="center" spacing={2}>
                    <Typography fontWeight="bold">Crow account empty</Typography>
                    <Button
                      component={Link}
                      href={`/transfer?nft=${daWithCrow.crow?.account.nftMint}`}
                      variant="contained"
                    >
                      Add something
                    </Button>
                  </Stack>
                </Center>
              )}
            </>
          ) : (
            daWithCrow && (
              <Center>
                <InitializeCrow nftMint={publicKey(daWithCrow.id)} />
              </Center>
            )
          )}
        </Stack>
      </Center>
    </Container>
  )
}
