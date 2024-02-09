import { publicKey } from "@metaplex-foundation/umi"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { Stack, Typography, Box, Grid } from "@mui/material"
import { useWallet } from "@solana/wallet-adapter-react"
import { DAS } from "helius-sdk"
import { mapValues, groupBy } from "lodash"
import { useState, useEffect } from "react"
import { useAnchor } from "../context/anchor"
import { useDigitalAssets } from "../context/digital-assets"
import { findCrowPda } from "../helpers/pdas"
import { AssetWithPublicKey } from "../types/types"

export function CrowContents({
  da,
  resolvePromise,
}: {
  da: DAS.GetAssetResponse
  resolvePromise?: (value: void | PromiseLike<void>) => void
}) {
  const { fetchAccounts } = useDigitalAssets()
  const [assets, setAssets] = useState<AssetWithPublicKey[]>([])
  const [fetching, setFetching] = useState(false)
  const program = useAnchor()
  const wallet = useWallet()

  async function fetchAssets() {
    try {
      setFetching(true)
      const crowPda = findCrowPda(publicKey(da.id))
      const crow = await program.account.crow.fetch(crowPda)
      if (crow) {
        const assets = await program.account.asset.all([
          {
            memcmp: {
              bytes: crowPda,
              offset: 8,
            },
          },
        ])
        setAssets(assets)
      } else {
        setAssets([])
      }
    } catch (err) {
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (!da.id) {
      setAssets([])
      return
    }
    fetchAssets()
    const id = program.provider.connection.onAccountChange(toWeb3JsPublicKey(findCrowPda(publicKey(da.id))), () => {
      resolvePromise?.()
      fetchAssets()
      fetchAccounts()
    })

    return () => {
      program.provider.connection.removeAccountChangeListener(id)
    }
  }, [da.id])

  const {
    sol = 0,
    token = 0,
    nft = 0,
  } = mapValues(
    groupBy(assets, (asset) => Object.keys(asset.account.assetType)[0]),
    (item) => item.length
  )

  return (
    <Stack spacing={2} width="100%">
      <Typography textAlign="center" fontWeight="bold" color="primary" textTransform="uppercase">
        Assets loaded
      </Typography>
      <Box>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6" textAlign="center">
              {sol}
              <Typography component="span" variant="body2">
                {" "}
                x SOL
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" textAlign="center">
              {token}
              <Typography component="span" variant="body2">
                {" "}
                x TOKEN
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" textAlign="center">
              {nft}
              <Typography component="span" variant="body2">
                {" "}
                x NFT
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  )
}
