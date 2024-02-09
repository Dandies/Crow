import * as anchor from "@coral-xyz/anchor"
import { Dictionary, get, groupBy, mapValues, orderBy } from "lodash"
import { FEES } from "../constants"
import { BN } from "bn.js"
import { DAS } from "helius-sdk"
import { PublicKey, publicKey } from "@metaplex-foundation/umi"
import { AssetWithPublicKey, CrowWithPublicKey } from "../types/types"
import { findCrowPda } from "./pdas"

export function shorten(address: string) {
  if (!address) {
    return
  }
  return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`
}

export function getLevel(dandies: number) {
  if (dandies >= 10) {
    return "free"
  }
  if (dandies >= 5) {
    return "pro"
  }
  if (dandies >= 1) {
    return "advanced"
  }
  return "basic"
}

export function getFee(type: string, dandies: number) {
  if (!dandies) {
    return null
  }

  const level = getLevel(dandies)

  if (level === "free") {
    return 0n
  }

  const fee: BigInt = get(FEES, `${type}.${level}`, 0n)

  return fee || null
}

export function toTitleCase(str: string) {
  return str.replace("-", " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export function mapDasWithAccounts(
  digitalAssets: DAS.GetAssetResponse[],
  crows: CrowWithPublicKey[],
  assets: AssetWithPublicKey[]
) {
  const pdas: PublicKey[] = digitalAssets.map((da) => findCrowPda(publicKey(da.id)))
  const crowDict = groupBy(crows, (c) => c.publicKey.toBase58())
  const assetDict = groupBy(assets, (a) => a.account.crow.toBase58())

  return digitalAssets.map((da, index) => {
    const pda = pdas[index]
    const crow: any | null = crowDict[pda]?.[0] || null
    if (crow) {
      crow.publicKey = crow.publicKey.toBase58()
      crow.account.nftMint = crow.account.nftMint.toBase58()
      crow.assets = orderBy(
        assetDict[pda]?.map((asset) => {
          return {
            publicKey: asset.publicKey.toBase58(),
            account: mapValues(asset.account, (item) =>
              item instanceof BN ? item.toString() : item instanceof anchor.web3.PublicKey ? item.toBase58() : item
            ),
          }
        }),
        (item) => Number(item.account.startTime),
        "desc"
      )
    }
    return {
      ...da,
      crow,
    }
  })
}
