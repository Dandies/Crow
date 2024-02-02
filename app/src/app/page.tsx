"use client"
import * as anchor from "@coral-xyz/anchor"
import { Box, Button, Card, CardContent, CircularProgress, Dialog, Grid, Stack, Typography } from "@mui/material"
import { useAnchor } from "./context/anchor"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Center } from "./components/Center"
import Link from "next/link"
import { DigitalAssetWithCrow, useDigitalAssets } from "./context/digital-assets"
import CrowLogo from "@/../public/crow.png"
import Image from "next/image"
import { findCrowPda, findProgramConfigPda, getTokenAccount, getTokenRecordPda } from "./helpers/pdas"
import {
  PublicKey,
  createNoopSigner,
  publicKey,
  transactionBuilder,
  unwrapOption,
  unwrapOptionRecursively,
} from "@metaplex-foundation/umi"
import { AssetWithPublicKey } from "./types/types"
import { FEES_WALLET, FEE_WAIVER } from "./constants"
import {
  MPL_TOKEN_METADATA_PROGRAM_ID,
  TokenStandard,
  fetchDigitalAsset,
  findMasterEditionPda,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata"
import { fromWeb3JsInstruction, fromWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { useUmi } from "./context/umi"
import toast from "react-hot-toast"
import { MPL_TOKEN_AUTH_RULES_PROGRAM_ID } from "@metaplex-foundation/mpl-token-auth-rules"
import axios from "axios"
import base58 from "bs58"
import { getClaimTx } from "./helpers/transactions"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { usePriorityFees } from "./context/priority-fees"
import { dayjs } from "./helpers/dayjs"
import { DAS } from "helius-sdk"
import { getDigitalAsset } from "./helpers/helius"
import { orderBy } from "lodash"

export default function Home() {
  const { digitalAssetsWithCrows, fetching } = useDigitalAssets()
  const program = useAnchor()
  const wallet = useWallet()

  const crows = digitalAssetsWithCrows.filter((da) => da.crow)

  if (!wallet.publicKey) {
    return (
      <Center>
        <Typography fontWeight="bold" textTransform="uppercase">
          Wallet disconnected
        </Typography>
      </Center>
    )
  }

  if (!fetching && !crows.length) {
    return (
      <Center>
        <Stack spacing={2} alignItems="center">
          <Typography fontWeight="bold" textTransform="uppercase">
            No crows found
          </Typography>
          <Button variant="contained" href="/transfer" LinkComponent={Link}>
            Transfer something
          </Button>
        </Stack>
      </Center>
    )
  }

  if (fetching) {
    return (
      <Center>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography fontWeight="bold" textTransform="uppercase">
            Reading wallet contents
          </Typography>
        </Stack>
      </Center>
    )
  }

  return (
    <Grid container>
      {crows.map((crow, i) => (
        <Grid item xs={2} key={i}>
          <Crow crow={crow} />
        </Grid>
      ))}
    </Grid>
  )
}

function Crow({ crow }: { crow: DigitalAssetWithCrow }) {
  const [assets, setAssets] = useState<AssetWithPublicKey[]>([])
  const [assetsShowing, setAssetsShowing] = useState(false)
  const [fetching, setFetching] = useState(false)
  const program = useAnchor()
  const wallet = useWallet()

  function toggleAssets() {
    setAssetsShowing(!assetsShowing)
  }

  async function getAssets() {
    try {
      setFetching(true)
      const crowPda = findCrowPda(publicKey(crow.id))
      const crowAcc = await program.account.crow.fetch(crowPda)
      if (crowAcc) {
        const assets = await program.account.asset.all([
          {
            memcmp: {
              bytes: crowPda,
              offset: 8,
            },
          },
        ])
        setAssets(orderBy(assets, (item) => item.account.startTime.toNumber(), "asc"))
      } else {
        setAssets([])
      }
    } catch (err) {
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (!crow.id) {
      setAssets([])
      return
    }

    getAssets()
    const listener1 = program.addEventListener("TransferInEvent", getAssets)
    const listener2 = program.addEventListener("TransferOutEvent", ({ asset }) => {
      console.log("OK GOT IT", asset)
      if (assets.find((a) => a.publicKey.toBase58() === asset.toBase58())) {
        setAssets((assets) => assets.filter((a) => a.publicKey.toBase58() !== asset.toBase58()))
      }
    })

    return () => {
      program.removeEventListener(listener1)
      program.removeEventListener(listener2)
    }
  }, [crow.id])

  return (
    <Card>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: "1 / 1",
          cursor: "pointer",
        }}
        onClick={toggleAssets}
      >
        <img
          src={
            crow.content?.links?.image
              ? `https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${crow.content.links.image}`
              : "/fallback-image.jpg"
          }
          width="100%"
        />
      </Box>
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: "bold",
            }}
          >
            {crow.content?.metadata.name}
          </Typography>
          <Stack spacing={1} direction="row" alignItems="center">
            <Image src={CrowLogo} alt="Crow" width={26} />
            <Typography color="primary" fontWeight={700} variant="h6">
              {assets.length}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Dialog open={assetsShowing} onClose={toggleAssets} fullWidth maxWidth="md">
        <Card sx={{ height: "80vh" }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography textAlign="center" textTransform="uppercase" color="primary" variant="h4" fontWeight={700}>
                NFT contents
              </Typography>
              <Box>
                <Grid container spacing={2}>
                  {assets.map((asset, i) => (
                    <Grid item xs={3} key={i}>
                      <Asset asset={asset} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Dialog>
    </Card>
  )
}

export type TokenWithTokenInfo = DAS.GetAssetResponse & {
  token_info: {
    balance: number
    decimals: number
    price_info: {
      total_price: number
      price_per_token: number
    }
  }
}

function Asset({ asset }: { asset: AssetWithPublicKey }) {
  const [loading, setLoading] = useState(false)
  const { feeLevel } = usePriorityFees()
  const [canClaim, setCanClaim] = useState(true)
  const [nft, setNft] = useState<DAS.GetAssetResponse | null>(null)
  const [token, setToken] = useState<TokenWithTokenInfo | null>(null)
  const [amountToClaim, setAmountToClaim] = useState(0)
  const umi = useUmi()

  useEffect(() => {
    ;(async () => {
      if (asset.account.assetType.nft) {
        const nft = await getDigitalAsset(fromWeb3JsPublicKey(asset.account.tokenMint))
        setNft(nft)
      } else if (asset.account.assetType.token) {
        const token = (await getDigitalAsset(fromWeb3JsPublicKey(asset.account.tokenMint))) as TokenWithTokenInfo
        setToken(token)
      }
    })()
  }, [asset])

  useEffect(() => {
    function tick() {
      if (!asset.account.vesting.linear && !asset.account.vesting.intervals) {
        return asset.account.balance.toNumber() - asset.account.claimed.toNumber()
      }

      const startTime = asset.account.startTime.toNumber()
      const endTime = asset.account.endTime!.toNumber()
      const currentTime = Date.now() / 1000
      const amount = asset.account.amount.toNumber()
      const claimed = asset.account.claimed.toNumber()

      if (asset.account.vesting.linear) {
        const totalTime = endTime - startTime
        const refTime = Math.min(currentTime, endTime)
        const timeSpent = refTime - startTime

        const ratio = (timeSpent * 100) / totalTime

        const claimableBalance = (amount * ratio) / 100

        setAmountToClaim(claimableBalance - claimed)
      } else if (asset.account.vesting.intervals) {
        const numIntervals = asset.account.vesting.intervals.numIntervals
        const totalTime = endTime - startTime
        const timeSpent = currentTime - startTime

        const timePerInterval = totalTime / numIntervals
        const amountPerInterval = amount / numIntervals

        const numIntervalsCompleted = Math.floor(timeSpent / timePerInterval)
        let claimableBalance = amountPerInterval * numIntervalsCompleted
        console.log(claimableBalance)
        setAmountToClaim(claimableBalance - claimed)
      }
    }

    const id = setInterval(tick, 100)
    return () => {
      clearInterval(id)
    }
  }, [asset])

  async function claim() {
    try {
      setLoading(true)
      const promise = Promise.resolve().then(async () => {
        const serialized = await getClaimTx(asset.publicKey.toBase58(), umi.identity.publicKey, feeLevel)
        const tx = umi.transactions.deserialize(bs58.decode(serialized))
        const signed = await umi.identity.signTransaction(tx)
        const sig = await umi.rpc.sendTransaction(signed, { skipPreflight: true })
        const conf = await umi.rpc.confirmTransaction(sig, {
          strategy: {
            type: "blockhash",
            ...(await umi.rpc.getLatestBlockhash()),
          },
        })

        if (conf.value.err) {
          throw new Error("Error confirming tx")
        }
      })

      toast.promise(promise, {
        loading: "Claiming asset",
        success: "Successfully claimed asset",
        error: "Error claiming asset",
      })

      await promise
    } catch (e: any) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const isFuture = asset.account.startTime.toNumber() * 1000 > Date.now()
  const factor = asset.account.assetType.sol
    ? Math.pow(10, anchor.web3.LAMPORTS_PER_SOL)
    : Math.pow(10, token?.token_info?.decimals || 0)

  return (
    <Stack
      sx={{ border: "2px solid", borderColor: "primary.main", padding: 2, borderRadius: 2, height: "100%" }}
      spacing={1}
      justifyContent="space-between"
    >
      <Stack spacing={1}>
        <Typography textTransform="uppercase" fontWeight={700} color="primary" variant="h6">
          {Object.keys(asset.account.assetType)[0]}
        </Typography>

        {token && (
          <Stack spacing={2}>
            <Typography>
              {(asset.account.amount.toNumber() / factor).toLocaleString()} {token.content?.metadata.name}
            </Typography>
            <Typography>Claimed: {(asset.account.claimed.toNumber() / factor).toLocaleString()}</Typography>
            {asset.account.vesting.linear && (
              <Typography>
                Linear vesting until{" "}
                {dayjs((asset.account?.endTime?.toNumber() || 0) * 1000).format("DD/MM/YYYY HH:mm:ss")}
              </Typography>
            )}
            {asset.account.vesting.intervals && (
              <Typography>
                Vesting over {asset.account.vesting.intervals.numIntervals} intervals until{" "}
                {dayjs((asset.account?.endTime?.toNumber() || 0) * 1000).format("DD/MM/YYYY HH:mm:ss")}
              </Typography>
            )}
            {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
              <Typography>Can claim: {(amountToClaim / factor).toLocaleString()}</Typography>
            )}
          </Stack>
        )}

        {nft && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              aspectRatio: "1 / 1",
            }}
          >
            <img
              src={
                nft.content?.links?.image
                  ? `https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${nft.content.links.image}`
                  : "/fallback-image.jpg"
              }
              width="100%"
            />
          </Box>
        )}
      </Stack>

      <Button variant="outlined" onClick={claim} disabled={loading || !canClaim} sx={{ whiteSpace: "nowrap" }}>
        {isFuture ? <Countdown until={asset.account.startTime.toNumber()} setCanClaim={setCanClaim} /> : "Claim"}
      </Button>
    </Stack>
  )
}

function Countdown({ until, setCanClaim }: { until: number; setCanClaim: Dispatch<SetStateAction<boolean>> }) {
  const [timer, setTimer] = useState(dayjs(until * 1000).fromNow())
  const id = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    function tick() {
      const now = dayjs().unix()
      if (until > now) {
        setCanClaim(false)
      } else {
        setCanClaim(true)
      }
      setTimer(dayjs(until * 1000).fromNow())
    }
    tick()
    id.current = setInterval(tick, 1000)
    return () => {
      clearInterval(id.current)
    }
  }, [until])

  return timer
}
