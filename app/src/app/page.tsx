"use client"
import * as anchor from "@coral-xyz/anchor"
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Link as MuiLink,
  Typography,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  FormLabel,
  Tooltip,
} from "@mui/material"
import { useAnchor } from "./context/anchor"
import { ChangeEvent, useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Center } from "./components/Center"
import Link from "next/link"
import { AssetType, UniversalAssetWithCrow, useDigitalAssets } from "./context/digital-assets"
import CrowLogo from "@/../public/white-crow.png"
import Image from "next/image"
import { publicKey, unwrapOptionRecursively } from "@metaplex-foundation/umi"
import { Many, orderBy } from "lodash"
import { WalletButton } from "./components/WalletButton"

import { useRouter, useSearchParams } from "next/navigation"
import { Close, Search, TripOrigin } from "@mui/icons-material"
import { getDigitalAsset } from "./helpers/helius"
import { TokenStandard, fetchDigitalAsset, fetchJsonMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { useUmi } from "./context/umi"
import { findCrowPda } from "./helpers/pdas"
import { CopyAddress } from "./components/CopyAddress"
import toast from "react-hot-toast"
import { SPL_TOKEN_PROGRAM_ID } from "@metaplex-foundation/mpl-toolbox"
import { ASSET_PROGRAM_ID } from "@nifty-oss/asset"
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core"

export default function Home() {
  const router = useRouter()
  const search = useSearchParams()
  const [filter, setFilter] = useState("assets")
  const [sort, setSort] = useState("assets.desc")
  const { digitalAssetsWithCrows, fetching } = useDigitalAssets()
  const [searchType, setSearchType] = useState("wallet")
  const [searchTerm, setSearchTerm] = useState("")
  const program = useAnchor()
  const umi = useUmi()
  const wallet = useWallet()

  function onFilterChange(e: SelectChangeEvent<string>) {
    setFilter(e.target.value)
  }

  function onSortChange(e: SelectChangeEvent<string>) {
    setSort(e.target.value)
  }

  async function goTo() {
    if (!searchTerm) {
      router.push(`/`)
      return
    }

    try {
      if (searchType === "wallet") {
        try {
          let pk = publicKey(searchTerm)
          router.push(`/?wallet=${pk}`)
        } catch (err) {
          throw new Error("Invalid wallet address")
        }
      } else {
        try {
          const pk = publicKey(searchTerm)
          const account = await umi.rpc.getAccount(pk)

          if (account.exists && account.owner === SPL_TOKEN_PROGRAM_ID) {
            const da = await fetchDigitalAsset(umi, pk)
            if (!da) {
              throw new Error("NFT not found")
            }

            if (
              ![
                TokenStandard.NonFungible,
                TokenStandard.NonFungibleEdition,
                TokenStandard.ProgrammableNonFungible,
                TokenStandard.ProgrammableNonFungibleEdition,
              ].includes(unwrapOptionRecursively(da.metadata.tokenStandard) || 0)
            ) {
              throw new Error("Only non fungibles can be used as Crows")
            }
            router.push(`/crow/${pk}`)
          } else if (account.exists && account.owner === ASSET_PROGRAM_ID) {
            router.push(`/crow/${pk}`)
          } else if (account.exists && account.owner === MPL_CORE_PROGRAM_ID) {
            router.push(`/crow/${pk}`)
          } else {
            throw new Error("Invalid asset")
          }
        } catch (err: any) {
          throw new Error("Invalid mint")
        }
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const crows = digitalAssetsWithCrows.filter((da) => da.crow)

  const [sortType, order] = sort.split(".")

  const filtered = orderBy(
    filter === "assets" ? crows.filter((c) => c.crow?.assets?.length) : crows,
    (item) => (sortType === "assets" ? item.crow?.assets?.length || 0 : item.name),
    order as Many<boolean | "desc" | "asc">
  )

  const isMine = wallet.publicKey?.toBase58() && wallet.publicKey.toBase58() !== search.get("wallet")

  function checkEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      goTo()
    }
  }

  return (
    <Container sx={{ height: "100%", width: "100%" }}>
      <Center>
        <Stack spacing={4} width="100%" maxHeight="80vh" height="100%">
          <Stack>
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              {isMine ? "My " : ""}Crows
            </Typography>
            <Typography>
              <CopyAddress fontWeight="bold" color="primary">
                {isMine ? wallet.publicKey?.toBase58() : search.get("wallet")}
              </CopyAddress>
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack spacing={2} direction="row">
              <ToggleButtonGroup
                sx={{ backgroundColor: "background.default", borderRadius: 1 }}
                color="primary"
                exclusive
                value={searchType}
                onChange={(e, t) => t && setSearchType(t)}
                size="small"
              >
                <ToggleButton value="wallet">Wallet</ToggleButton>
                <ToggleButton value="nft" sx={{ whiteSpace: "nowrap" }}>
                  NFT Mint
                </ToggleButton>
              </ToggleButtonGroup>

              <TextField
                label={searchType === "nft" ? "NFT Mint" : "Wallet address"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ backgroundColor: "background.default", borderRadius: 1 }}
                fullWidth
                size="small"
                onKeyDown={checkEnter}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={goTo}>
                        <Search fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

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
                  sx={{ backgroundColor: "background.default", borderRadius: 1 }}
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
                  sx={{ backgroundColor: "background.default", borderRadius: 1 }}
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
          ) : fetching ? (
            <Center>
              <Stack alignItems="center" spacing={2}>
                <CircularProgress />
                <Typography fontWeight="bold" textTransform="uppercase">
                  Reading wallet contents
                </Typography>
              </Stack>
            </Center>
          ) : isMine && !wallet.publicKey ? (
            <Center>
              <Stack spacing={2} alignItems="center">
                <Typography fontWeight="bold" textTransform="uppercase">
                  Wallet disconnected
                </Typography>
                <WalletButton />
              </Stack>
            </Center>
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

function Crow({ crow }: { crow: UniversalAssetWithCrow }) {
  const program = useAnchor()
  const [image, setImage] = useState(crow.image)
  const umi = useUmi()
  const { fetchAccounts } = useDigitalAssets()

  useEffect(() => {
    if (image || !crow.uri) {
      return
    }

    ;(async () => {
      const json = await fetchJsonMetadata(umi, crow.uri!)
      setImage(json.image)
    })()
  }, [crow])

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
      <MuiLink component={Link} href={`/crow/${crow.id}`} underline="none">
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
            position: "relative",
          }}
        >
          {[AssetType.CORE, AssetType.NIFTY].includes(crow.assetType) && (
            <Tooltip title={crow.assetType === AssetType.NIFTY ? "Nifty-OSS asset" : "Metaplex Core asset"}>
              <img
                src={`${crow.assetType === AssetType.NIFTY ? "/nifty-dark.png" : "/metaplex.png"}`}
                width="20%"
                style={{ position: "absolute", top: "5%", right: "5%" }}
              />
            </Tooltip>
          )}
          <img
            src={image ? `https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${image}` : "/fallback-image.jpg"}
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
              {crow.name}
            </Typography>
            <Stack spacing={1} direction="row" alignItems="center">
              <Image src={CrowLogo} alt="Crow" width={15} />
              <Typography color="primary" fontWeight={700} variant="h6">
                {crow.crow?.assets?.length || 0}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </MuiLink>
    </Card>
  )
}
