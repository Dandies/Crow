"use client"
import * as anchor from "@coral-xyz/anchor"
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  TextField,
  Link as MuiLink,
  Typography,
} from "@mui/material"
import { useAnchor } from "./context/anchor"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Center } from "./components/Center"
import Link from "next/link"
import { DigitalAssetWithCrow, useDigitalAssets } from "./context/digital-assets"
import CrowLogo from "@/../public/white-crow.png"
import Image from "next/image"
import { publicKey } from "@metaplex-foundation/umi"
import { AssetWithPublicKey } from "./types/types"
import { useUmi } from "./context/umi"
import toast from "react-hot-toast"

import { getClaimTx } from "./helpers/transactions"
import { usePriorityFees } from "./context/priority-fees"
import { dayjs } from "./helpers/dayjs"
import { DAS } from "helius-sdk"
import { getDigitalAsset } from "./helpers/helius"
import { Many, orderBy } from "lodash"
import { Close } from "@mui/icons-material"
import base58 from "bs58"
import { WalletButton } from "./components/WalletButton"
import SolIcon from "@/../public/sol.svg"
import TokenIcon from "@/../public/token.svg"
import NftIcon from "@/../public/nft.svg"
import { shorten } from "./helpers/utils"
import { CopyAddress } from "./components/CopyAddress"

export default function Home() {
  const [filter, setFilter] = useState("assets")
  const [sort, setSort] = useState("assets.desc")
  const { digitalAssetsWithCrows, fetching } = useDigitalAssets()
  const program = useAnchor()
  const wallet = useWallet()

  function onFilterChange(e: SelectChangeEvent<string>) {
    setFilter(e.target.value)
  }

  function onSortChange(e: SelectChangeEvent<string>) {
    setSort(e.target.value)
  }

  const crows = digitalAssetsWithCrows.filter((da) => da.crow)

  if (!wallet.publicKey) {
    return (
      <Center>
        <Stack spacing={2} alignItems="center">
          <Typography fontWeight="bold" textTransform="uppercase">
            Wallet disconnected
          </Typography>
          <WalletButton />
        </Stack>
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

  const [sortType, order] = sort.split(".")

  const filtered = orderBy(
    filter === "assets" ? crows.filter((c) => c.crow?.assets?.length) : crows,
    (item) => (sortType === "assets" ? item.crow?.assets?.length || 0 : item.content?.metadata.name),
    order as Many<boolean | "desc" | "asc">
  )

  return (
    <Container sx={{ height: "100%", width: "100%" }}>
      <Center>
        <Stack spacing={4} width="100%" maxHeight="80vh" height="100%">
          <Typography textAlign="center" fontWeight="bold" variant="h3">
            My Crows
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <FormControl>
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sort}
                label="sort"
                onChange={onSortChange}
                size="small"
              >
                <MenuItem value="assets.desc">Num Assets ↓</MenuItem>
                <MenuItem value="assets.asc">Num Assets ↑</MenuItem>
                <MenuItem value="name.asc">Name ↓</MenuItem>
                <MenuItem value="name.desc">Name ↑</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="filter-select-label">Filter</InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filter}
                label="Filter"
                onChange={onFilterChange}
                size="small"
              >
                <MenuItem value="assets">Has Assets</MenuItem>
                <MenuItem value="all">Show All</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {filtered.length ? (
            <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
              <Grid container spacing={2}>
                {filtered.map((crow, i) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                    <Crow crow={crow} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Center>
              <Stack>
                <Stack spacing={2} alignItems="center">
                  {filter === "assets" ? (
                    <>
                      <Typography fontWeight="bold" textTransform="uppercase">
                        No crows with assets found
                      </Typography>

                      <Button variant="contained" onClick={() => setFilter("all")}>
                        Show all
                      </Button>
                    </>
                  ) : (
                    <Typography fontWeight="bold" textTransform="uppercase">
                      No crows found
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Center>
          )}
        </Stack>
      </Center>
    </Container>
  )
}

function Crow({ crow }: { crow: DigitalAssetWithCrow }) {
  const program = useAnchor()
  const [assetsShowing, setAssetsShowing] = useState(false)
  const { fetchAccounts } = useDigitalAssets()

  function toggleAssets() {
    setAssetsShowing(!assetsShowing)
  }

  useEffect(() => {
    if (!crow.crow?.publicKey) {
      return
    }
    const id = program.provider.connection.onAccountChange(new anchor.web3.PublicKey(crow.crow?.publicKey), () =>
      fetchAccounts()
    )
    return () => {
      program.provider.connection.removeAccountChangeListener(id)
    }
  }, [crow])

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
            <Image src={CrowLogo} alt="Crow" width={15} />
            <Typography color="primary" fontWeight={700} variant="h6">
              {crow.crow?.assets?.length || 0}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Dialog open={assetsShowing} onClose={toggleAssets} fullWidth maxWidth="md">
        <Card sx={{ height: "80vh" }} elevation={10}>
          <CardContent sx={{ height: "100%", position: "relative" }}>
            <IconButton sx={{ position: "absolute", top: 10, right: 10 }} size="large" onClick={toggleAssets}>
              <Close fontSize="large" />
            </IconButton>
            <Stack spacing={2} height="100%">
              <Typography textAlign="center" variant="h4" fontWeight="900">
                Contents
              </Typography>

              {crow.crow?.assets?.length ? (
                <Box>
                  <Grid container spacing={4}>
                    {crow.crow?.assets?.map((asset, i) => (
                      <Grid item xs={6} sm={4} md={3} key={i}>
                        <Asset asset={asset} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Center>
                  <Stack alignItems="center" spacing={2}>
                    <Typography fontWeight="bold">Crow account empty</Typography>
                    <Button component={Link} href={`/transfer?nft=${crow.crow?.account.nftMint}`} variant="contained">
                      Add something
                    </Button>
                  </Stack>
                </Center>
              )}
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
    symbol: string
    price_info: {
      total_price: number
      price_per_token: number
    }
  }
}

function Asset({ asset }: { asset: AssetWithPublicKey }) {
  const { fetchAccounts } = useDigitalAssets()
  const [loading, setLoading] = useState(false)
  const { feeLevel } = usePriorityFees()
  const [canClaim, setCanClaim] = useState(true)
  const [nft, setNft] = useState<DAS.GetAssetResponse | null>(null)
  const [token, setToken] = useState<TokenWithTokenInfo | null>(null)
  const [amountToClaim, setAmountToClaim] = useState(0)
  const wallet = useWallet()
  const program = useAnchor()
  const umi = useUmi()

  useEffect(() => {
    ;(async () => {
      if (asset.account.assetType.nft) {
        const nft = await getDigitalAsset(publicKey(asset.account.tokenMint))
        setNft(nft)
      } else if (asset.account.assetType.token) {
        const token = (await getDigitalAsset(publicKey(asset.account.tokenMint))) as TokenWithTokenInfo
        setToken(token)
      }
    })()
  }, [asset])

  useEffect(() => {
    function tick() {
      if (!asset.account.vesting.linear && !asset.account.vesting.intervals) {
        return Number(asset.account.balance) - Number(asset.account.claimed)
      }

      const startTime = Number(asset.account.startTime)
      const endTime = Number(asset.account.endTime!)
      const currentTime = Date.now() / 1000
      const amount = Number(asset.account.amount)
      const claimed = Number(asset.account.claimed)
      const balance = Number(asset.account.balance)

      if (asset.account.vesting.linear) {
        const totalTime = endTime - startTime
        const refTime = Math.min(currentTime, endTime)
        const timeSpent = refTime - startTime

        const ratio = (timeSpent * 100) / totalTime

        const claimableBalance = (amount * ratio) / 100

        const amountToClaim = Math.min(claimableBalance - claimed, balance)

        setAmountToClaim(amountToClaim)
      } else if (asset.account.vesting.intervals) {
        const numIntervals = asset.account.vesting.intervals.numIntervals
        const totalTime = endTime - startTime
        const timeSpent = currentTime - startTime

        const timePerInterval = totalTime / numIntervals
        const amountPerInterval = amount / numIntervals

        const numIntervalsCompleted = Math.floor(timeSpent / timePerInterval)
        let claimableBalance = amountPerInterval * numIntervalsCompleted
        const amountToClaim = Math.min(claimableBalance - claimed, balance)
        setAmountToClaim(amountToClaim)
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
        const serialized = await getClaimTx(asset.publicKey as unknown as string, umi.identity.publicKey, feeLevel)
        const tx = umi.transactions.deserialize(base58.decode(serialized))
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
      fetchAccounts()
      setLoading(false)
    }
  }

  const isFuture = Number(asset.account.startTime) * 1000 > Date.now()
  const factor = asset.account.assetType.sol
    ? anchor.web3.LAMPORTS_PER_SOL
    : Math.pow(10, token?.token_info?.decimals || 0)

  const formatter = Intl.NumberFormat("en", { notation: "compact" })

  return (
    <Card sx={{ borderRadius: 2, height: "100%" }}>
      <Stack height="100%">
        <Box sx={{ backgroundColor: "primary.main" }} px={2} py={1}>
          <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="space-between">
            <SvgIcon sx={{ fill: "#1f1f1f" }} fontSize="small">
              {asset.account.assetType.sol && <SolIcon />}
              {asset.account.assetType.token && <TokenIcon />}
              {asset.account.assetType.nft && <NftIcon />}
            </SvgIcon>
            <Typography textTransform="uppercase" fontWeight={100} color="#1f1f1f" textAlign="right" fontStyle="italic">
              {Object.keys(asset.account.assetType)[0]}
            </Typography>
          </Stack>
        </Box>

        <Stack spacing={2} p={2} justifyContent="space-between" flexGrow={1}>
          <Stack spacing={1} alignItems="center" justifyContent="center" height="100%">
            {asset.account.assetType.token && (
              <Stack spacing={2}>
                <Typography color="primary" variant="h5" fontWeight={100} textAlign="center">
                  <strong>{formatter.format(Number(asset.account.amount) / factor)}</strong>{" "}
                  {token?.content?.metadata.name}
                </Typography>
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center">
                    Claimed: {(Number(asset.account.claimed) / factor).toLocaleString()}
                  </Typography>
                )}

                {asset.account.vesting.linear && (
                  <Typography textAlign="center">
                    Linear vesting until{" "}
                    {dayjs(Number(asset.account?.endTime || 0) * 1000).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                )}
                {asset.account.vesting.intervals && (
                  <Typography textAlign="center">
                    Vesting over {asset.account.vesting.intervals.numIntervals} intervals until{" "}
                    {dayjs(Number(asset.account?.endTime || 0) * 1000).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                )}
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center">
                    Can claim: {((amountToClaim > 0 ? amountToClaim : 0) / factor).toLocaleString()}
                  </Typography>
                )}
              </Stack>
            )}
            {asset.account.assetType.sol && (
              <Stack spacing={2}>
                <Typography color="primary" variant="h5" fontWeight={100} textAlign="center">
                  <strong>{formatter.format(Number(asset.account.amount) / factor)}</strong> SOL
                </Typography>
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center">
                    Claimed: {(Number(asset.account.claimed) / factor).toLocaleString()}
                  </Typography>
                )}

                {asset.account.vesting.linear && (
                  <Typography textAlign="center">
                    Linear vesting until{" "}
                    {dayjs((Number(asset.account?.endTime) || 0) * 1000).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                )}
                {asset.account.vesting.intervals && (
                  <Typography textAlign="center">
                    Vesting over {asset.account.vesting.intervals.numIntervals} intervals until{" "}
                    {dayjs(Number(asset.account?.endTime || 0) * 1000).format("DD/MM/YYYY HH:mm:ss")}
                  </Typography>
                )}
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center">
                    Can claim: {((amountToClaim > 0 ? amountToClaim : 0) / factor).toLocaleString()}
                  </Typography>
                )}
              </Stack>
            )}
            {asset.account.assetType.nft && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio: "1 / 1",
                  width: "100%",
                }}
              >
                <img
                  src={
                    nft?.content?.links?.image
                      ? `https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${nft?.content.links.image}`
                      : "/fallback-image.jpg"
                  }
                  width="100%"
                />
              </Box>
            )}
            {(asset.account.authority as any) !== wallet.publicKey?.toBase58() && (
              <Typography>
                From: <CopyAddress>{asset.account.authority as any}</CopyAddress>
              </Typography>
            )}
          </Stack>
          <Button variant="outlined" onClick={claim} disabled={loading || !canClaim} sx={{ whiteSpace: "nowrap" }}>
            {isFuture ? <Countdown until={Number(asset.account.startTime)} setCanClaim={setCanClaim} /> : "Claim"}
          </Button>
        </Stack>
      </Stack>
    </Card>
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
