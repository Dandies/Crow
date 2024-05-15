import { Close } from "@mui/icons-material"
import {
  Stack,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  Grid,
  FormControlLabel,
  Radio,
  Box,
  Card,
  CardContent,
  Skeleton,
  Tooltip,
} from "@mui/material"
import { groupBy, orderBy } from "lodash"
import { useState, useEffect, useRef } from "react"
import { AssetType, UniversalAssetWithCrow, useDigitalAssets } from "../context/digital-assets"
import { Center } from "./Center"
import useOnScreen from "../hooks/use-on-screen"
import { fetchJsonMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { useUmi } from "../context/umi"

type Collection = { id: string; name: string }

export function NftSelector({ onSelect, close, omit }: { onSelect: Function; close: Function; omit?: string }) {
  const { digitalAssetsWithCrows: digitalAssets, fetching } = useDigitalAssets()
  const [filter, setFilter] = useState("")
  const [filtered, setFiltered] = useState<UniversalAssetWithCrow[]>([])
  const [collections, setCollections] = useState<Array<Collection>>([])
  const [collection, setCollection] = useState<Collection | null>({ id: "crows" } as any)

  useEffect(() => {
    if (!digitalAssets.length) {
      setCollections([])
      return
    }
    const collectionIds = Object.keys(groupBy(digitalAssets, (da) => da.collection))
    const collections = collectionIds.map((id) => {
      const grouping = digitalAssets.find((da) => da.collection === id)
      return {
        id,
        name: grouping?.collectionName || "Unknown collection",
      }
    })
    setCollections(orderBy(collections, (c) => c.name))
  }, [digitalAssets])

  useEffect(() => {
    setFiltered([])
    setFiltered(
      orderBy(digitalAssets, (da) => da.name)
        .filter((d) => d.id !== omit)
        .filter((d) => !collection || (collection.id === "crows" ? !!d.crow : d.collection === collection.id))
        .filter((da) => {
          if (!filter) {
            return true
          }
          const term = filter.toLowerCase()
          return da.name?.toLowerCase().includes(term)
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

function Nft({ nft, select }: { nft: UniversalAssetWithCrow; select: Function }) {
  const ref = useRef(null)
  const visible = useOnScreen(ref)
  const umi = useUmi()
  const [image, setImage] = useState(nft.image)
  function handleClick() {
    select(nft)
  }

  useEffect(() => {
    if (nft.image || !visible || !nft.uri) {
      return
    }

    ;(async () => {
      const json = await fetchJsonMetadata(umi, nft.uri!)
      setImage(json.image)
    })()
  }, [visible, nft])

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
            src={image ? `https://img-cdn.magiceden.dev/rs:fill:200:200:0:0/plain/${image}` : "/fallback-image.jpg"}
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
          {nft.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
