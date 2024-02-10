"use client"
import { useWallet } from "@solana/wallet-adapter-react"
import { DAS } from "helius-sdk"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { DANDIES_COLLECTION } from "../constants"
import { CrowWithAssets } from "../types/types"
import { useAnchor } from "./anchor"
import { groupBy } from "lodash"
import { publicKey } from "@metaplex-foundation/umi"
import { mapDasWithAccounts } from "../helpers/utils"
import { useSearchParams } from "next/navigation"

const Context = createContext<
  | {
      dandies: DAS.GetAssetResponse[]
      digitalAssetsWithCrows: DigitalAssetWithCrow[]
      fetching: boolean
      fetchAccounts: Function
      removeNft: Function
    }
  | undefined
>(undefined)

export type DigitalAssetWithCrow = DAS.GetAssetResponse & {
  crow: CrowWithAssets | null
}

export function DigitalAssetsProvider({ children }: PropsWithChildren) {
  const search = useSearchParams()
  const [digitalAssetsWithCrows, setDigitalAssetsWithCrows] = useState<DigitalAssetWithCrow[]>([])
  const [dandies, setDandies] = useState<DAS.GetAssetResponse[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchingAccounts, setFetchingAccounts] = useState(false)
  const program = useAnchor()
  const wallet = useWallet()

  useEffect(() => {
    if (!digitalAssetsWithCrows.length) {
      setDandies([])
      return
    }
    setDandies(
      digitalAssetsWithCrows.filter((da) =>
        da.grouping?.find((g) => g.group_key === "collection" && g.group_value === DANDIES_COLLECTION)
      )
    )
  }, [digitalAssetsWithCrows])

  async function fetchAssets(wallet: string) {
    if (fetching) {
      return
    }
    const worker = new Worker(new URL("../../../public/fetch-assets.worker.ts", import.meta.url))

    worker.onmessage = async (event) => {
      const { digitalAssets } = event.data
      setDigitalAssetsWithCrows(digitalAssets.filter((da: DigitalAssetWithCrow) => !da.compression?.compressed))
      setFetching(false)
      worker.terminate()
    }
    setFetching(true)

    worker.postMessage({
      wallet,
    })
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
