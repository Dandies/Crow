"use client"
import * as anchor from "@coral-xyz/anchor"
import { publicKey, sol, unwrapOptionRecursively } from "@metaplex-foundation/umi"
import { useAnchor } from "../context/anchor"
import {
  findCrowPda,
  findProgramConfigPda,
  findProgramDataAddress,
  getTokenAccount,
  getTokenRecordPda,
} from "../helpers/pdas"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import BN from "bn.js"
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
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
  Typography,
  useMediaQuery,
} from "@mui/material"
import { Dispatch, SetStateAction, memo, useEffect, useMemo, useRef, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import {
  DigitalAssetWithToken,
  JsonMetadata,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  TokenStandard,
  fetchDigitalAsset,
  fetchDigitalAssetWithAssociatedToken,
  fetchDigitalAssetWithTokenByMint,
  fetchJsonMetadata,
  findMasterEditionPda,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata"
import { useUmi } from "../context/umi"
import { toWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters"
import { AssetWithPublicKey, Crow } from "../types/types"
import { useWallet } from "@solana/wallet-adapter-react"
import { DateTimePicker } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import { useDigitalAssets } from "../context/digital-assets"
import { groupBy, orderBy, toLength } from "lodash"
import useOnScreen from "../hooks/use-on-screen"
import { DAS, Helius } from "helius-sdk"
import toast from "react-hot-toast"
import { FEES_WALLET } from "../constants"
import { MPL_TOKEN_AUTH_RULES_PROGRAM_ID } from "@metaplex-foundation/mpl-token-auth-rules"
import {
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowDownward,
  ArrowForwardIos,
  ArrowLeft,
  CheckBox,
  Close,
  Download,
  WidthFull,
} from "@mui/icons-material"
import { Center } from "../components/Center"
import { getAllFungiblesByOwner, getDigitalAsset } from "../helpers/helius"
import { dayjs } from "../helpers/dayjs"
import { shorten } from "../helpers/utils"
import { getDistributeTx } from "../helpers/transactions"
import base58 from "bs58"
import { usePriorityFees } from "../context/priority-fees"
import { Token, fetchAllTokenByOwner } from "@metaplex-foundation/mpl-toolbox"
import { TokenWithTokenInfo } from "../page"

type DigitalAssetWithTokenAndJson = DigitalAssetWithToken & {
  json: JsonMetadata
}

export default function Create() {
  const program = useAnchor()
  const { feeLevel } = usePriorityFees()
  const [vestingType, setVestingType] = useState("none")
  const [nftMint, setNftMint] = useState("")
  const [nftMintError, setNftMintError] = useState<string | null>(null)
  const [type, setType] = useState("token")
  const [amount, setAmount] = useState("0")
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

      const promise = Promise.resolve().then(async () => {
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
        console.log(signed)
        const sig = await umi.rpc.sendTransaction(signed, { skipPreflight: true })
        console.log(sig)
        const conf = await umi.rpc.confirmTransaction(sig, {
          strategy: {
            type: "blockhash",
            ...(await umi.rpc.getLatestBlockhash()),
          },
        })
        console.log(conf)

        if (conf.value.err) {
          throw new Error("Error confirming tx")
        }
      })

      toast.promise(promise, {
        loading: "Transferring into Crow",
        success: "Transferred successfully",
        error: "Error transferring",
      })

      await promise
      cancel()
    } catch (err: any) {
      console.error(err.stack)
    } finally {
      setLoading(false)
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
    setAmount("0")
    setNftMint("")
    setEscrowNftMint("")
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

  return (
    <Box height="100%">
      <Grid container spacing={4} overflow={{ xs: "scroll", lg: "hidden" }} height="100%">
        <Grid item xs={12} lg={5.5} sx={{ height: { lg: "100%", xs: "unset" } }}>
          <Card
            sx={{
              backdropFilter: "blur(3px)",
              backgroundColor: "rgba(245, 245, 247, 0)",
              border: "1px solid rgba(169, 169, 169, .12)",
              // backgroundColor: "rgba(0, 0, 0, 0.9)",
              borderRadius: "10px",
              height: { lg: "100%", xs: "unset" },
            }}
          >
            <CardContent sx={{ height: "100%", overflow: "auto" }}>
              <Stack spacing={2} justifyContent="space-between" height="100%">
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                    Put this 👉
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
                  {type === "token" && (
                    <Stack spacing={2}>
                      <TextField
                        label="Token mint"
                        value={tokenMint}
                        onChange={(e) => setTokenMint(e.target.value)}
                        error={!!tokenMintError}
                        helperText={tokenMintError}
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
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        label="Amount to share"
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
                      <FormLabel>Asset claim vesting</FormLabel>
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
                            <Typography>None</Typography>
                            <Typography variant="body2">Full amount can be claimed after start date</Typography>
                          </Stack>
                        </ToggleButton>
                        <ToggleButton value="linear">
                          <Stack>
                            <Typography>Linear</Typography>
                            <Typography variant="body2">Amount is claimable spread over the given timeframe</Typography>
                          </Stack>
                        </ToggleButton>
                        <ToggleButton value="intervals">
                          <Stack>
                            <Typography>Intervals</Typography>
                            <Typography variant="body2">Amount is claimable at given intervals</Typography>
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
                        {vestingType === "none" && (
                          <FormHelperText>Leave blank for asset to be claimable immediately</FormHelperText>
                        )}
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
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <Button onClick={cancel} color="error" variant="outlined">
                    Cancel
                  </Button>
                  <Button onClick={transferIn} disabled={loading || !canSubmit} variant="contained">
                    Transfer to NFT
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={1} sx={{ height: { lg: "100%", xs: "unset" } }}>
          <Center>
            <ArrowForwardIos fontSize="large" sx={{ transform: isMd ? "rotate(90deg)" : "unset" }} />
          </Center>
        </Grid>
        <Grid item xs={12} lg={5.5} sx={{ height: { lg: "100%", xs: "unset" } }}>
          <Card
            sx={{
              backdropFilter: "blur(3px)",
              backgroundColor: "rgba(245, 245, 247, 0)",
              border: "1px solid rgba(169, 169, 169, .12)",
              borderRadius: "10px",
              height: { lg: "100%", xs: "unset" },
            }}
          >
            <CardContent sx={{ height: "100%", overflow: "auto" }}>
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                  👌 In this
                </Typography>
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
                  {da && <CrowContents da={da} />}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
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
              <NftSelector onSelect={onNftSelected} close={toggleNftModalShowing} />
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </Box>
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
      console.log(tokens)
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

function CrowContents({ da }: { da: DAS.GetAssetResponse }) {
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
    const listener1 = program.addEventListener("TransferInEvent", fetchAssets)
    const listener2 = program.addEventListener("TransferOutEvent", fetchAssets)

    return () => {
      program.removeEventListener(listener1)
      program.removeEventListener(listener2)
    }
  }, [da.id])

  return (
    <Stack spacing={2} width="100%">
      <Typography>Assets</Typography>
      <Box>
        <Grid container>
          {assets.map((asset, i) => (
            <Grid item xs={4} key={i}>
              <Card>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography textTransform="uppercase" color="primary" fontWeight={700}>
                      {Object.keys(asset.account.assetType)[0]}
                    </Typography>
                    <Typography>From: {shorten(asset.account.authority.toBase58())}</Typography>
                    {asset.account.assetType.sol && (
                      <Typography>{asset.account.amount.toNumber() / anchor.web3.LAMPORTS_PER_SOL} SOL</Typography>
                    )}
                    <Typography>Vesting: {Object.keys(asset.account.vesting)[0]}</Typography>
                    <Typography>{dayjs(asset.account.startTime.toNumber() * 1000).fromNow()}</Typography>
                    {da.ownership.owner === wallet.publicKey?.toBase58() && (
                      <Button color="primary" variant="outlined">
                        <Download />
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}

function Nft({ nft, select }: { nft: DAS.GetAssetResponse; select: Function }) {
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
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", aspectRatio: "1 / 1" }}
      >
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

function NftSelector({ onSelect, close }: { onSelect: Function; close: Function }) {
  const { digitalAssets, fetching } = useDigitalAssets()
  const [filter, setFilter] = useState("")
  const [filtered, setFiltered] = useState<DAS.GetAssetResponse[]>([])
  const [collections, setCollections] = useState<Array<Collection>>([])
  const [collection, setCollection] = useState<Collection | null>(null)

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
        .filter((d) => !collection || d.grouping?.find((g) => g.group_value === collection?.id))
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
              <Typography>Collections</Typography>
              <Stack>
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
