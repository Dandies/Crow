"use client"
import { useWallet } from "@solana/wallet-adapter-react"
import { DAS } from "helius-sdk"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { DANDIES_COLLECTION } from "../constants"
import { CrowWithPublicKey } from "../types/types"
import { findCrowPda } from "../helpers/pdas"
import { PublicKey, publicKey } from "@metaplex-foundation/umi"
import { useAnchor } from "./anchor"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"

const Context = createContext<
  | {
      digitalAssets: DAS.GetAssetResponse[]
      dandies: DAS.GetAssetResponse[]
      digitalAssetsWithCrows: DigitalAssetWithCrow[]
      fetching: boolean
    }
  | undefined
>(undefined)

export type DigitalAssetWithCrow = DAS.GetAssetResponse & {
  crow: CrowWithPublicKey | null
}

export function DigitalAssetsProvider({ children }: PropsWithChildren) {
  const [digitalAssets, setDigitalAssets] = useState<DAS.GetAssetResponse[]>([])
  const [digitalAssetsWithCrows, setDigitalAssetsWithCrows] = useState<DigitalAssetWithCrow[]>([])
  const [dandies, setDandies] = useState<DAS.GetAssetResponse[]>([])
  const [fetching, setFetching] = useState(false)
  const program = useAnchor()
  const wallet = useWallet()

  useEffect(() => {
    if (!digitalAssets.length) {
      setDandies([])
      return
    }
    setDandies(
      digitalAssets.filter((da) =>
        da.grouping?.find((g) => g.group_key === "collection" && g.group_value === DANDIES_COLLECTION)
      )
    )
    ;(async () => {
      const pdas: PublicKey[] = digitalAssets.map((da) => findCrowPda(publicKey(da.id)))
      const all = await program.account.crow.all()

      setDigitalAssetsWithCrows(
        digitalAssets.map((da, index) => {
          const pda = pdas[index]
          const crow = all.find((crow) => crow.publicKey.toBase58() === pda) || null
          return {
            ...da,
            crow,
          }
        })
      )
    })()
  }, [digitalAssets])

  async function fetchAssets(wallet: string) {
    const worker = new Worker(new URL("../../../public/fetch-assets.worker.ts", import.meta.url))

    worker.onmessage = async (event) => {
      const { digitalAssets } = event.data
      setDigitalAssets(digitalAssets.filter((da: DAS.GetAssetResponse) => !da.compression?.compressed))
      setFetching(false)
      worker.terminate()
    }
    setFetching(true)

    worker.postMessage({
      wallet,
    })
  }

  useEffect(() => {
    if (!wallet.publicKey) {
      setDigitalAssets([])
      return
    }

    fetchAssets(wallet.publicKey.toBase58())
  }, [wallet.publicKey])

  return (
    <Context.Provider value={{ digitalAssets, dandies, fetching, digitalAssetsWithCrows }}>{children}</Context.Provider>
  )
}

export const useDigitalAssets = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useDigitalAssets must be used in a DigitalAssetsProvider")
  }

  return context
}
