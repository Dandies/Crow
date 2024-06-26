"use client"
import * as anchor from "@coral-xyz/anchor"
import { Center } from "@/app/components/Center"
import { Card, CardContent, Stack, Typography, Box, Grid, Button, Container, CircularProgress } from "@mui/material"
import Link from "next/link"
import { anonymousProgram } from "@/app/helpers/anchor"
import { notFound } from "next/navigation"
import { Asset as AssetComponent } from "./Asset"
import { getDigitalAsset } from "@/app/helpers/helius"
import { fromWeb3JsPublicKey, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { mapDasWithAccounts, mapToUniversalAsset } from "@/app/helpers/utils"
import { UniversalAssetWithCrow, useDigitalAssets } from "@/app/context/digital-assets"
import { CopyAddress } from "@/app/components/CopyAddress"
import { InitializeCrow } from "./InitializeCrow"
import { findCrowPda } from "@/app/helpers/pdas"
import { publicKey } from "@metaplex-foundation/umi"
import { useEffect, useState } from "react"
import { useAnchor } from "@/app/context/anchor"
import { AssetWithPublicKey, Crow } from "@/app/types/types"
import { useUmi } from "@/app/context/umi"
import { SPL_TOKEN_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox"
import { DAS } from "helius-sdk"
import { ASSET_PROGRAM_ID, fetchAsset, Asset } from "@nifty-oss/asset"
import { AssetV1, MPL_CORE_PROGRAM_ID, fetchAssetV1 } from "@metaplex-foundation/mpl-core"
import toast from "react-hot-toast"

export default function Crow({ params: { nftMint } }: { params: Record<string, string> }) {
  const program = useAnchor()
  const umi = useUmi()
  const [daWithCrow, setDaWithCrow] = useState<UniversalAssetWithCrow | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!nftMint) {
      return
    }
    const pda = findCrowPda(publicKey(nftMint))
    const id = program.provider.connection.onAccountChange(toWeb3JsPublicKey(pda), getAccount)

    return () => {
      program.provider.connection.removeAccountChangeListener(id)
    }
  }, [nftMint])

  async function getAccount() {
    try {
      setLoading(true)
      const pk = publicKey(nftMint)
      const acc = await umi.rpc.getAccount(pk)
      const pda = findCrowPda(pk)
      const crow = await anonymousProgram.account.crow.fetch(pda)
      let assets: AssetWithPublicKey[] = []
      if (crow) {
        assets = (await anonymousProgram.account.asset.all([{ memcmp: { bytes: pda, offset: 8 } }])) || []
      }
      let da: DAS.GetAssetResponse | Asset | AssetV1 | null = null
      if (acc.exists && acc.owner === SPL_TOKEN_PROGRAM_ID) {
        try {
          da = await getDigitalAsset(pk)
        } catch {}
      } else if (acc.exists && acc.owner === ASSET_PROGRAM_ID) {
        da = await fetchAsset(umi, pk)
      } else if (acc.exists && acc.owner === MPL_CORE_PROGRAM_ID) {
        da = await fetchAssetV1(umi, pk)
      }

      if (da) {
        const [daWithCrow] = mapDasWithAccounts(
          [mapToUniversalAsset(da)],
          crow ? [{ account: crow, publicKey: toWeb3JsPublicKey(pda) }] : [],
          assets
        )

        setDaWithCrow(daWithCrow)
      } else {
        throw new Error("Digital asset not found")
      }
    } catch (err) {
      toast.error("Error loading asset")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!nftMint) {
      setDaWithCrow(null)
      return
    }

    getAccount()
  }, [nftMint])

  if (!daWithCrow) {
    return loading ? (
      <Center>
        <CircularProgress />
      </Center>
    ) : null
  }

  return (
    <Container sx={{ height: "100%", width: "100%" }}>
      <Center>
        <Stack spacing={4} width="100%" maxHeight="80vh" height="100%">
          <Stack>
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              Crow Account
            </Typography>
            <Typography variant="h6" color="primary" textAlign="center">
              {daWithCrow.crow ? <CopyAddress>{daWithCrow?.crow?.publicKey}</CopyAddress> : "No crow account"}
            </Typography>

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
                      {daWithCrow.owner}
                    </CopyAddress>
                  </Stack>
                </Stack>
                <Box>
                  <Button variant="contained" LinkComponent={Link} href={`/load?nft=${daWithCrow.id}`}>
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
                        <AssetComponent asset={asset} owner={daWithCrow.owner} getAccount={getAccount} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Center>
                  <Stack alignItems="center" spacing={2}>
                    <Typography fontWeight="bold">Crow account empty</Typography>
                    <Button component={Link} href={`/load?nft=${daWithCrow.crow?.account.nftMint}`} variant="contained">
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
