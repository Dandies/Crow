"use client"
import * as anchor from "@coral-xyz/anchor"
import { publicKey, sol, unwrapOptionRecursively } from "@metaplex-foundation/umi"
import { useAnchor } from "../context/anchor"
import { findCrowPda } from "../helpers/pdas"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Radio,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import {
  DigitalAssetWithToken,
  JsonMetadata,
  TokenStandard,
  fetchDigitalAsset,
  fetchDigitalAssetWithAssociatedToken,
} from "@metaplex-foundation/mpl-token-metadata"
import { useUmi } from "../context/umi"
import { toWeb3JsKeypair, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { AssetWithPublicKey, Crow } from "../types/types"
import { useWallet } from "@solana/wallet-adapter-react"
import { DateTimePicker } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import { DigitalAssetWithCrow, useDigitalAssets } from "../context/digital-assets"
import { groupBy, mapValues, orderBy } from "lodash"
import useOnScreen from "../hooks/use-on-screen"
import { DAS } from "helius-sdk"
import toast from "react-hot-toast"
import { ArrowForwardIos, Close, Download } from "@mui/icons-material"
import { Center } from "../components/Center"
import { getAllFungiblesByOwner, getDigitalAsset } from "../helpers/helius"
import { dayjs } from "../helpers/dayjs"
import { shorten } from "../helpers/utils"
import { getDistributeTx } from "../helpers/transactions"
import base58 from "bs58"
import { usePriorityFees } from "../context/priority-fees"
import { TokenWithTokenInfo } from "../page"
import { WalletButton } from "../components/WalletButton"
import { useSearchParams } from "next/navigation"

type DigitalAssetWithTokenAndJson = DigitalAssetWithToken & {
  json: JsonMetadata
}

export default function Create() {
  const searchParams = useSearchParams()
  const { fetchAccounts, removeNft } = useDigitalAssets()
  const { feeLevel } = usePriorityFees()
  const [vestingType, setVestingType] = useState("none")
  const [nftMint, setNftMint] = useState(searchParams.get("nft") || "")
  const [nftMintError, setNftMintError] = useState<string | null>(null)
  const [type, setType] = useState("token")
  const [amount, setAmount] = useState("")
  const [da, setDa] = useState<DAS.GetAssetResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [tokenMint, setTokenMint] = useState("")
  const [token, setToken] = useState<DigitalAssetWithToken | null>(null)
  const [tokenMintError, setTokenMintError] = useState<string | null>(null)
  const [balance, setBalance] = useState(0n)
  const [escrowNftMint, setEscrowNftMint] = useState("")
  const [escrowNftMintError, setEscrowNftMintError] = useState<string | null>(null)
  const [escrowDa, setEscrowDa] = useState<DAS.GetAssetResponse | null>(null)
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [numIntervals, setNumIntervals] = useState("2")
  const [choosingType, setChoosingType] = useState("source")
  const [tokenSelectorShowing, setTokenSelectorShowing] = useState(false)
  const resolvePromise = useRef<(value: void | PromiseLike<void>) => void>()

  const [nftModalshowing, setNftModalShowing] = useState(false)
  const wallet = useWallet()
  const umi = useUmi()

  function toggleTokenSelector() {
    setTokenSelectorShowing(!tokenSelectorShowing)
  }

  function toggleNftModalShowing() {
    setNftModalShowing(!nftModalshowing)
  }

  function toggleSourceNftModalShowing() {
    setChoosingType("source")
    toggleNftModalShowing()
  }

  function toggleDestinationNftModalShowing() {
    setChoosingType("destination")
    toggleNftModalShowing()
  }

  useEffect(() => {
    if (!wallet.publicKey) {
      setBalance(BigInt(0))
      return
    }
    ;(async () => {
      const balance = await umi.rpc.getBalance(umi.identity.publicKey)
      setBalance(balance.basisPoints)
    })()
  }, [wallet.publicKey])

  useEffect(() => {
    if (!tokenMint) {
      setTokenMintError(null)
      setToken(null)
      return
    }
    ;(async () => {
      try {
        const pk = publicKey(tokenMint)
        const token = await fetchDigitalAssetWithAssociatedToken(umi, pk, umi.identity.publicKey)
        setTokenMintError(null)
        setToken(token)
      } catch (err: any) {
        console.error(err)
        setTokenMintError(err.message)
      }
    })()
  }, [tokenMint])

  useEffect(() => {
    if (!nftMint) {
      setNftMintError(null)
      return
    }
    ;(async () => {
      try {
        const pk = publicKey(nftMint)
        const da = await getDigitalAsset(pk)
        const tokenStandard = (da.content?.metadata as any).token_standard
        if (!tokenStandard) {
          const da = await fetchDigitalAsset(umi, pk)
          const tokenStandard = unwrapOptionRecursively(da.metadata.tokenStandard)
          if (!tokenStandard) {
            const isNonFungible = da.mint.decimals === 0 && da.mint.supply === 1n
            if (!isNonFungible) {
              throw new Error("Only non-fungible assets can be used")
            }
          } else if (
            ![
              TokenStandard.NonFungible,
              TokenStandard.NonFungibleEdition,
              TokenStandard.ProgrammableNonFungible,
              TokenStandard.ProgrammableNonFungibleEdition,
            ].includes(tokenStandard)
          ) {
            throw new Error("Invalid token standard")
          }
        } else {
          if (!["ProgrammableNonFungible", "NonFungible"].includes(tokenStandard)) {
            throw new Error("Only non-fungible tokens can be used")
          }
        }
        setDa(da)
      } catch (err: any) {
        if (err.name === "InvalidPublicKeyError") {
          setNftMintError("Invalid public key")
        } else if (err.message.includes("Multiple valid token accounts found")) {
          setNftMintError("Public key is not an NFT")
        } else {
          setNftMintError(err.message)
        }
      }
    })()
  }, [nftMint])

  useEffect(() => {
    if (!escrowNftMint) {
      setEscrowNftMintError(null)
      return
    }
    ;(async () => {
      try {
        const pk = publicKey(escrowNftMint)
        const da = await getDigitalAsset(pk)
        const tokenStandard = (da.content?.metadata as any).token_standard
        if (!tokenStandard) {
          throw new Error("Token standard missing")
        }
        if (!["ProgrammableNonFungible", "NonFungible"].includes(tokenStandard)) {
          throw new Error("Only non-fungible tokens can be used")
        }
        setEscrowDa(da)
      } catch (err: any) {
        if (err.name === "InvalidPublicKeyError") {
          setEscrowNftMintError("Invalid public key")
        } else if (err.message.includes("Multiple valid token accounts found")) {
          setEscrowNftMintError("Public key is not an NFT")
        } else {
          setEscrowNftMintError(err.message)
        }
      }
    })()
  }, [escrowNftMint])

  async function transferIn() {
    try {
      setLoading(true)
      if (!da) {
        throw new Error("Digital Asset not found")
      }

      const promise = new Promise<void>(async (resolve, reject) => {
        try {
          resolvePromise.current = resolve
          const serialized = await getDistributeTx({
            payerPk: umi.identity.publicKey,
            assetId: da.id,
            type,
            vestingType,
            escrowNftPk: escrowDa?.id,
            numIntervals: Number(numIntervals),
            amount: String(Number(amount) * Number(factor)),
            tokenPk: token?.publicKey,
            startDate: startDate?.unix(),
            endDate: endDate?.unix(),
            feeLevel,
          })

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

          resolve()
        } catch (err) {
          reject(err)
        }
      })

      toast.promise(promise, {
        loading: "Transferring into Crow",
        success: "Transferred successfully",
        error: "Error transferring",
      })

      await promise
      cancel()
      if (type === "nft") {
        removeNft(escrowNftMint)
      }
    } catch (err: any) {
      console.error(err.stack)
    } finally {
      setLoading(false)
      fetchAccounts()
    }
  }

  function setMax() {
    const max = type === "token" ? token?.token.amount || 0n : balance
    setAmount(String(Number((max * 100n) / factor) / 100))
  }

  const factor = type === "token" && token ? 10n ** BigInt(token.mint.decimals) : 10n ** 9n

  function cancel() {
    setType("token")
    setToken(null)
    setTokenMint("")
    setAmount("")
    setNftMint("")
    setDa(null)
    setEscrowNftMint("")
    setEscrowDa(null)
  }

  function onNftSelected(nft: DAS.GetAssetResponse) {
    if (choosingType === "source") {
      setEscrowNftMint(nft.id)
    } else {
      setNftMint(nft.id)
    }
    setNftModalShowing(false)
  }

  useEffect(() => {
    if (!escrowDa) {
      setEscrowNftMint("")
    } else {
      setEscrowNftMint(escrowDa.id)
    }
  }, [escrowDa])

  let canSubmit = false

  if (type === "nft") {
    canSubmit = !!escrowDa && !escrowNftMintError && !!da && !nftMintError
  } else if (type === "token") {
    canSubmit =
      !!da && !nftMintError && !!amount && BigInt(Number(amount) * Number(factor)) > 0n && !!token && !tokenMintError
  } else if (type === "sol") {
    canSubmit = !!da && !nftMintError && !!amount && BigInt(Number(amount) * anchor.web3.LAMPORTS_PER_SOL) > 0n
  }

  useEffect(() => {
    if (type === "nft") {
      setVestingType("none")
    }
  }, [type])

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"))

  function onTokenSelect(mint: string) {
    setTokenMint(mint)
    setTokenSelectorShowing(false)
  }

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

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Center>
        <Grid container spacing={4} overflow={{ xs: "scroll", lg: "hidden" }} height="80vh">
          <Grid item xs={12} lg={5.5}>
            <Stack spacing={2} sx={{ height: { lg: "100%", xs: "unset" } }}>
              <Card
                sx={{
                  border: "1px solid rgba(169, 169, 169, .12)",
                  borderRadius: "10px",
                  flexGrow: 1,
                }}
              >
                <Box p={1} sx={{ backgroundColor: "primary.main" }}>
                  <Typography variant="h5" fontWeight="bold" textTransform="uppercase" color="black" textAlign="center">
                    Assets
                  </Typography>
                </Box>
                <CardContent sx={{ height: "100%", overflow: "auto" }}>
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <Typography color="primary" textTransform="uppercase" fontWeight="bold">
                        Asset Selection
                      </Typography>
                      <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={(e, val) => val && setType(val)}
                        color="primary"
                        fullWidth
                      >
                        <ToggleButton value="token">Token</ToggleButton>
                        <ToggleButton value="sol">SOL</ToggleButton>
                        <ToggleButton value="nft">NFT</ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                    {type === "token" && (
                      <Stack spacing={2}>
                        <TextField
                          label="Token mint"
                          value={tokenMint}
                          onChange={(e) => setTokenMint(e.target.value)}
                          error={!!tokenMintError}
                          helperText={tokenMintError}
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button onClick={toggleTokenSelector}>Choose</Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                    )}
                    {["token", "sol"].includes(type) && (
                      <Stack spacing={1}>
                        <Typography color="primary" textTransform="uppercase" fontWeight="bold">
                          Amount to send
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                          <TextField
                            label="Enter amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value || e.target.value === "0" ? e.target.value : "")}
                            inputProps={{
                              max:
                                type === "token"
                                  ? Number(token?.token.amount || 0n / factor)
                                  : Number((balance * 100n) / factor) / 100,
                              min: 0,
                              step: 1 / Math.pow(10, (token?.mint.decimals || 9) - 6),
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {type === "token" ? token?.metadata.symbol || "$TOKEN" : "◎"}
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Button onClick={setMax}>Max</Button>
                                </InputAdornment>
                              ),
                            }}
                            fullWidth
                          />
                          {type === "sol" && (
                            <TextField
                              label="SOL Balance"
                              value={(Number((balance * 100n) / 10n ** 9n) / 100).toLocaleString()}
                              disabled
                              InputProps={{
                                startAdornment: <InputAdornment position="start">◎</InputAdornment>,
                              }}
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#ffffff",
                                },
                              }}
                              fullWidth
                            />
                          )}
                          {type === "token" && (
                            <TextField
                              label="Token balance"
                              value={
                                token
                                  ? (
                                      Number((token.token.amount * 100n) / 10n ** BigInt(token.mint.decimals)) / 100
                                    ).toLocaleString()
                                  : 0
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">{token?.metadata.symbol || "$TOKEN"}</InputAdornment>
                                ),
                              }}
                              disabled
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#ffffff",
                                },
                              }}
                              fullWidth
                            />
                          )}
                        </Stack>
                      </Stack>
                    )}

                    {type === "nft" && (
                      <Stack spacing={2} alignItems="center">
                        {escrowDa ? (
                          <Box
                            maxWidth={300}
                            width="100%"
                            position="relative"
                            sx={{ aspectRatio: "1 / 1", ":hover": { ".MuiBox-root": { opacity: "1 !important" } } }}
                          >
                            <Box
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              bottom={0}
                              sx={{ opacity: 0, transition: "opacity .2s" }}
                            >
                              <Center>
                                <Button
                                  onClick={toggleSourceNftModalShowing}
                                  variant="contained"
                                  sx={{ whiteSpace: "nowrap" }}
                                >
                                  Change NFT
                                </Button>
                              </Center>
                            </Box>

                            <img
                              src={`https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${escrowDa.content?.links?.image}`}
                              style={{ display: "block", width: "100%" }}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              border: "4px dashed",
                              borderColor: "text.secondary",
                              aspectRatio: "1 / 1",
                              borderRadius: 3,
                            }}
                            maxWidth={300}
                            width="100%"
                            padding={4}
                          >
                            <Center>
                              <Button
                                onClick={toggleSourceNftModalShowing}
                                variant="contained"
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                Choose NFT
                              </Button>
                            </Center>
                          </Box>
                        )}
                      </Stack>
                    )}
                    {type !== "nft" && (
                      <Stack spacing={1}>
                        <Typography color="primary" textTransform="uppercase" fontWeight="bold">
                          Asset claim vesting
                        </Typography>
                        <ToggleButtonGroup
                          exclusive
                          value={vestingType}
                          onChange={(e, val) => val && setVestingType(val)}
                          color="primary"
                          fullWidth
                          orientation={isXs ? "vertical" : "horizontal"}
                        >
                          <ToggleButton value="none">
                            <Stack>
                              <Typography variant="body2">None</Typography>
                              <Typography variant="body2" fontSize="12px">
                                Full amount can be claimed after start date
                              </Typography>
                            </Stack>
                          </ToggleButton>
                          <ToggleButton value="linear">
                            <Stack>
                              <Typography variant="body2">Linear</Typography>
                              <Typography variant="body2" fontSize="12px">
                                Amount is claimable spread over the given timeframe
                              </Typography>
                            </Stack>
                          </ToggleButton>
                          <ToggleButton value="intervals">
                            <Stack>
                              <Typography variant="body2">Intervals</Typography>
                              <Typography variant="body2" fontSize="12px">
                                Amount is claimable at given intervals
                              </Typography>
                            </Stack>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Stack>
                    )}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                        <Stack width="100%">
                          <DateTimePicker
                            label="Start date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            format="YYYY/MM/DD HH:mm:ss"
                            sx={{ width: "100%" }}
                            minDate={dayjs()}
                            ampm={false}
                          />

                          <FormHelperText>Leave blank for asset to be claimable immediately</FormHelperText>
                        </Stack>
                        {vestingType !== "none" && (
                          <DateTimePicker
                            label="End date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            format="YYYY/MM/DD HH:mm:ss"
                            sx={{ width: "100%" }}
                            minDate={dayjs()}
                            ampm={false}
                          />
                        )}
                        {vestingType === "intervals" && (
                          <TextField
                            type="number"
                            label="Number of intervals"
                            value={numIntervals}
                            onChange={(e) => setNumIntervals(e.target.value)}
                            inputProps={{
                              max: 65535,
                              min: 2,
                              step: 1,
                            }}
                            fullWidth
                          />
                        )}
                      </Stack>
                    </LocalizationProvider>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={1}>
            <Center>
              <ArrowForwardIos fontSize="large" sx={{ transform: isMd ? "rotate(90deg)" : "unset" }} />
            </Center>
          </Grid>
          <Grid item xs={12} lg={5.5}>
            <Stack spacing={2} sx={{ height: { lg: "100%", xs: "unset" } }}>
              <Card
                sx={{
                  border: "1px solid rgba(169, 169, 169, .12)",
                  borderRadius: "10px",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ backgroundColor: "primary.main" }} p={1}>
                  <Typography variant="h5" fontWeight="bold" textTransform="uppercase" textAlign="center" color="black">
                    Destination NFT
                  </Typography>
                </Box>
                <CardContent sx={{ height: "100%", overflow: "auto" }}>
                  <Stack spacing={2}>
                    <TextField
                      label="NFT Mint"
                      value={nftMint}
                      onChange={(e) => setNftMint(e.target.value)}
                      error={!!nftMintError}
                      helperText={nftMintError}
                    />
                    <Stack spacing={2} alignItems="center">
                      {da ? (
                        <Box
                          maxWidth={300}
                          width="100%"
                          position="relative"
                          sx={{ aspectRatio: "1 / 1", ":hover": { ".MuiBox-root": { opacity: "1 !important" } } }}
                        >
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            sx={{ opacity: 0, transition: "opacity .2s" }}
                          >
                            <Center>
                              <Button
                                onClick={toggleDestinationNftModalShowing}
                                variant="contained"
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                Change NFT
                              </Button>
                            </Center>
                          </Box>

                          <img
                            src={`https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${da.content?.links?.image}`}
                            style={{ display: "block", width: "100%" }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            border: "4px dashed",
                            borderColor: "text.secondary",
                            aspectRatio: "1 / 1",
                            borderRadius: 3,
                          }}
                          maxWidth={300}
                          width="100%"
                          padding={4}
                        >
                          <Center>
                            <Button
                              onClick={toggleDestinationNftModalShowing}
                              variant="contained"
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              Choose NFT
                            </Button>
                          </Center>
                        </Box>
                      )}
                      {da && <CrowContents da={da} resolvePromise={resolvePromise.current} />}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="bottom"
              justifyContent="space-between"
              width="100%"
              height="100%"
            >
              <Box display="flex" alignItems="flex-end">
                <Button onClick={cancel} color="error" variant="contained">
                  Clear
                </Button>
              </Box>
              <Box display="flex" alignItems="flex-end">
                <Button onClick={transferIn} disabled={loading || !canSubmit} variant="contained">
                  Transfer to NFT
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Modal
          open={tokenSelectorShowing}
          onClose={toggleTokenSelector}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            sx={{
              margin: { sm: 10, xs: 0 },
              height: { sm: "80vh", xs: "100vh" },
              outline: "none",
              overflowY: { xs: "auto" },
            }}
          >
            <Card sx={{ height: "100%", overflow: "hidden" }}>
              <CardContent sx={{ overflow: "auto", height: "100%" }}>
                <TokenSelector onSelect={onTokenSelect} />
              </CardContent>
            </Card>
          </Container>
        </Modal>

        <Modal
          open={nftModalshowing}
          onClose={toggleNftModalShowing}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            sx={{
              margin: { sm: 10, xs: 0 },
              height: { sm: "80vh", xs: "100vh" },
              outline: "none",
              overflowY: { xs: "auto" },
            }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <NftSelector
                  onSelect={onNftSelected}
                  close={toggleNftModalShowing}
                  omit={choosingType === "source" ? nftMint : escrowNftMint}
                />
              </CardContent>
            </Card>
          </Container>
        </Modal>
      </Center>
    </Container>
  )
}

function TokenSelector({ onSelect }: { onSelect: Function }) {
  const [tokens, setTokens] = useState<TokenWithTokenInfo[]>([])
  const wallet = useWallet()
  const umi = useUmi()

  useEffect(() => {
    if (!wallet.publicKey) {
      setTokens([])
      return
    }
    ;(async () => {
      const tokens = (await getAllFungiblesByOwner(umi.identity.publicKey)) as TokenWithTokenInfo[]
      setTokens(orderBy(tokens, (token) => token.token_info?.price_info?.total_price || 0, "desc"))
    })()
  }, [wallet.publicKey])

  return (
    <Stack spacing={2}>
      <Typography textTransform="uppercase" color="primary" textAlign="center" variant="h4" fontWeight="bold">
        Select a token
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Balance</Typography>
            </TableCell>
            <TableCell>
              <Typography>Price</Typography>
            </TableCell>
            <TableCell>
              <Typography>Value</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((token, i) => (
            <TableRow
              key={i}
              sx={{ ":hover": { backgroundColor: "background.default", cursor: "pointer" } }}
              onClick={() => onSelect(token.id)}
            >
              <TableCell>
                {token.content?.metadata.name || "Unnamed token"} (
                {token.content?.metadata.symbol || token.token_info?.symbol})
              </TableCell>
              <TableCell>
                {(token.token_info.balance / Math.pow(10, token.token_info.decimals || 0)).toLocaleString()}
              </TableCell>
              <TableCell>{token.token_info?.price_info?.price_per_token || 0}</TableCell>
              <TableCell>{token.token_info?.price_info?.total_price || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}

function CrowContents({
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

function Nft({ nft, select }: { nft: DigitalAssetWithCrow; select: Function }) {
  const ref = useRef(null)
  const visible = useOnScreen(ref)
  function handleClick() {
    select(nft)
  }

  return (
    <Card onClick={handleClick} ref={ref}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: "1 / 1",
          position: "relative",
        }}
      >
        {nft.crow && (
          <Tooltip title={`${nft.crow.assets?.length || 0} asset${(nft.crow.assets?.length || 0) === 1 ? "" : "s"}`}>
            <img src="/crow.png" width={25} style={{ position: "absolute", right: 5, top: 5 }} />
          </Tooltip>
        )}
        {visible ? (
          <img
            src={
              nft.content?.links?.image
                ? `https://img-cdn.magiceden.dev/rs:fill:200:200:0:0/plain/${nft.content.links.image}`
                : "/fallback-image.jpg"
            }
            width="100%"
          />
        ) : (
          <Skeleton width="100%" height="100%" variant="rounded" />
        )}
      </Box>

      <CardContent>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
          }}
        >
          {nft.content?.metadata.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

type Collection = { id: string; name: string }

function NftSelector({ onSelect, close, omit }: { onSelect: Function; close: Function; omit?: string }) {
  const { digitalAssetsWithCrows: digitalAssets, fetching } = useDigitalAssets()
  const [filter, setFilter] = useState("")
  const [filtered, setFiltered] = useState<DigitalAssetWithCrow[]>([])
  const [collections, setCollections] = useState<Array<Collection>>([])
  const [collection, setCollection] = useState<Collection | null>({ id: "crows" } as any)

  useEffect(() => {
    if (!digitalAssets.length) {
      setCollections([])
      return
    }
    const collectionIds = Object.keys(
      groupBy(digitalAssets, (da) => da.grouping?.find((g) => g.group_key === "collection")?.group_value)
    )
    const collections = collectionIds.map((id) => {
      const grouping = digitalAssets
        .find((da) => da.grouping?.find((g) => g.group_value === id))
        ?.grouping?.find((g) => g.group_key === "collection")
      return {
        id,
        name: grouping?.collection_metadata?.name || "Unknown collection",
      }
    })
    setCollections(orderBy(collections, (c) => c.name))
  }, [digitalAssets])

  useEffect(() => {
    setFiltered([])
    setFiltered(
      orderBy(digitalAssets, (da) => da.content?.metadata.name)
        .filter((d) => d.id !== omit)
        .filter(
          (d) =>
            !collection ||
            (collection.id === "crows" ? !!d.crow : d.grouping?.find((g) => g.group_value === collection?.id))
        )
        .filter((da) => {
          if (!filter) {
            return true
          }
          const term = filter.toLowerCase()
          return (
            da.content?.metadata.name.toLowerCase().includes(term) ||
            da.content?.metadata.attributes?.find((a) => a.value?.toLowerCase?.()?.includes(term))
          )
        })
    )
  }, [filter, digitalAssets, collection])

  return (
    <Stack spacing={2} height="100%" overflow="hidden">
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          Select NFT
        </Typography>
        <IconButton onClick={() => close()}>
          <Close fontSize="large" />
        </IconButton>
      </Stack>
      <TextField label="Filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
      {fetching ? (
        <Center>
          <CircularProgress />
        </Center>
      ) : (
        <Grid container sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Grid item xs={3} height="100%">
            <Stack spacing={2} height="100%" overflow="auto">
              <Typography variant="h6">Filter</Typography>
              <Stack>
                <FormControlLabel
                  label="Has Crow account"
                  control={
                    <Radio checked={collection?.id === "crows"} onClick={() => setCollection({ id: "crows" } as any)} />
                  }
                />
                <FormControlLabel
                  label="Show all"
                  control={<Radio checked={!collection} onClick={() => setCollection(null)} />}
                />

                {collections.map((c, i) => (
                  <FormControlLabel
                    key={i}
                    label={c.name}
                    control={<Radio checked={collection?.id === c.id} onClick={() => setCollection(c)} />}
                  />
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={9} height="100%">
            <Box flexGrow={1} overflow="auto" height="100%">
              <Grid container spacing={2}>
                {filtered.map((item, i) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                    <Nft nft={item} select={onSelect} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Stack>
  )
}
