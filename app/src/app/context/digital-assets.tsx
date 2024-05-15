"use client"
import { useWallet } from "@solana/wallet-adapter-react"
import { DAS } from "helius-sdk"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { DANDIES_COLLECTION } from "../constants"
import { AssetWithPublicKey, CrowWithAssets, CrowWithPublicKey } from "../types/types"
import { useAnchor } from "./anchor"
import { mapDasWithAccounts, mapToUniversalAsset } from "../helpers/utils"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { AssetV1, Key, fetchAllCollectionV1, getAssetV1GpaBuilder } from "@metaplex-foundation/mpl-core"
import { Asset, ExtensionType, State, fetchAllAsset, getAssetGpaBuilder, getExtension } from "@nifty-oss/asset"
import { PublicKey, publicKey } from "@metaplex-foundation/umi"
import { useUmi } from "./umi"
import { base64 } from "@metaplex-foundation/umi/serializers"
import { uniq } from "lodash"

export enum AssetType {
  LEGACY,
  NIFTY,
  CORE,
}

const Context = createContext<
  | {
      dandies: UniversalAssetWithCrow[]
      digitalAssetsWithCrows: UniversalAssetWithCrow[]
      fetching: boolean
      fetchAccounts: Function
      removeNft: Function
    }
  | undefined
>(undefined)

export type UniversalAssetWithCrow = UniversalAsset & {
  crow: CrowWithAssets | null
}

export type UniversalAsset = {
  id: PublicKey
  image?: string
  uri?: string
  name?: string
  contentType?: string
  collection?: PublicKey
  collectionName?: string
  assetType: AssetType
  locked?: boolean
  owner: PublicKey
}

export function DigitalAssetsProvider({ children }: PropsWithChildren) {
  const search = useSearchParams()
  const [digitalAssetsWithCrows, setDigitalAssetsWithCrows] = useState<UniversalAssetWithCrow[]>([])
  const [dandies, setDandies] = useState<UniversalAssetWithCrow[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchingAccounts, setFetchingAccounts] = useState(false)
  const program = useAnchor()
  const umi = useUmi()
  const wallet = useWallet()

  useEffect(() => {
    if (!digitalAssetsWithCrows.length) {
      setDandies([])
      return
    }
    setDandies(digitalAssetsWithCrows.filter((da) => da.collection === DANDIES_COLLECTION))
  }, [digitalAssetsWithCrows])

  async function fetchAssets(wallet: string) {
    if (fetching) {
      return
    }

    setFetching(true)

    const [digitalAssets, crows, assets]: [UniversalAsset[], CrowWithPublicKey[], AssetWithPublicKey[]] =
      await Promise.all([getAssets(wallet), program.account.crow.all(), program.account.asset.all()])

    setDigitalAssetsWithCrows(mapDasWithAccounts(digitalAssets, crows, assets))
    setFetching(false)
  }

  async function getAssets(wallet: string): Promise<UniversalAsset[]> {
    const [{ data: das }, core, nifty]: [{ data: DAS.GetAssetResponse[] }, AssetV1[], Asset[]] = await Promise.all([
      axios.post("/api/get-nfts", {
        ownerAddress: wallet,
      }),
      getCore(wallet),
      getNifty(wallet),
    ])

    const assets = [...das.filter((da) => !da.compression?.compressed), ...core, ...nifty].map(mapToUniversalAsset)

    const [niftyCollections, coreCollections] = await Promise.all([
      fetchAllAsset(
        umi,
        uniq(
          assets
            .filter((a) => a.assetType === AssetType.NIFTY)
            .map((n) => n.collection)
            .filter(Boolean) as PublicKey[]
        )
      ),
      fetchAllCollectionV1(
        umi,
        assets
          .filter((a) => a.assetType === AssetType.CORE)
          .map((n) => n.collection)
          .filter(Boolean) as PublicKey[]
      ),
    ])

    return assets.map((a) => {
      if (a.assetType === AssetType.NIFTY) {
        const coll = niftyCollections.find((c) => c.publicKey === a.collection)
        return {
          ...a,
          collectionName: `${coll?.name} * NIFTY`,
        }
      }

      if (a.assetType === AssetType.CORE) {
        const coll = coreCollections.find((c) => c.publicKey === a.collection)
        return {
          ...a,
          collectionName: `${coll?.name} * CORE`,
        }
      }

      return a
    })
  }

  async function getCore(wallet: string) {
    const assets = await getAssetV1GpaBuilder(umi)
      .whereField("owner", publicKey(wallet))
      .whereField("key", Key.AssetV1)
      .getDeserialized()
    return assets
  }

  async function getNifty(wallet: string) {
    const assets = await getAssetGpaBuilder(umi).whereField("owner", publicKey(wallet)).getDeserialized()

    return assets
  }

  async function fetchAccounts() {
    if (fetchingAccounts) {
      return
    }

    setFetchingAccounts(true)

    const [crows, assets] = await Promise.all([program.account.crow.all(), program.account.asset.all()])
    const das = mapDasWithAccounts(digitalAssetsWithCrows, crows, assets)
    setDigitalAssetsWithCrows(das)
    setFetchingAccounts(false)
  }

  useEffect(() => {
    const fromSearch = search.get("wallet")
    if (!wallet.publicKey && !fromSearch) {
      setDigitalAssetsWithCrows([])
      return
    }

    setDigitalAssetsWithCrows([])

    fetchAssets(fromSearch || wallet.publicKey!.toBase58())
  }, [wallet.publicKey, search.get("wallet")])

  function removeNft(mint: string) {
    setDigitalAssetsWithCrows((das) => das.filter((da) => da.id !== mint))
  }

  return (
    <Context.Provider value={{ removeNft, fetchAccounts, dandies, fetching, digitalAssetsWithCrows }}>
      {children}
    </Context.Provider>
  )
}

export const useDigitalAssets = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useDigitalAssets must be used in a DigitalAssetsProvider")
  }

  return context
}
