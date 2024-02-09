"use server"

import { PublicKey } from "@metaplex-foundation/umi"
import axios from "axios"
import { Helius } from "helius-sdk"
import { DANDIES_COLLECTION, PriorityFees } from "../constants"

const client = new Helius(process.env.HELIUS_API_KEY!)
const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`

async function getDigitalAssetsPage(collection: PublicKey, page: number) {
  return client.rpc.getAssetsByGroup({
    groupKey: "collection",
    groupValue: collection,
    limit: 1000,
    page,
    displayOptions: {
      showGrandTotal: true,
    },
  })
}

export async function getDigitalAssets(collection: PublicKey) {
  const result = await getDigitalAssetsPage(collection, 1)
  const total = result.grand_total as any as number
  let das = result.items

  const pages = Math.ceil((total - das.length) / 1000)

  await Promise.all(
    Array.from(new Array(pages).keys()).map(async (index) => {
      const result = await getDigitalAssetsPage(collection, index + 2)
      das.push(...result.items)
    })
  )
  return das
}

async function getAssetsByOwner(ownerAddress: string, page: number) {
  return client.rpc.getAssetsByOwner({
    ownerAddress,
    page,
    displayOptions: {
      showGrandTotal: true,
      showCollectionMetadata: true,
    },
  })
}

export async function getDigitalAssetsForWallet(wallet: string) {
  const result = await getAssetsByOwner(wallet, 1)
  const total = result.grand_total as any as number
  let das = result.items

  const pages = Math.ceil((total - das.length) / 1000)

  await Promise.all(
    Array.from(new Array(pages).keys()).map(async (index) => {
      const result = await getAssetsByOwner(wallet, index + 2)
      das.push(...result.items)
    })
  )
  return das
}

export async function getDigitalAsset(mint: PublicKey) {
  return await client.rpc.getAsset({
    id: mint,
    displayOptions: {
      showFungible: true,
    } as any,
  })
}

async function getFungiblesByOwner(ownerAddress: string, page: number) {
  try {
    const result = await client.rpc.searchAssets({
      ownerAddress,
      page,
      tokenType: "fungible",
    } as any)
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function getAllFungiblesByOwner(owner: string) {
  const nfts = []
  let page = 1
  let result
  while ((result = await getFungiblesByOwner(owner, page++))?.items.length) {
    nfts.push(...result.items)
  }

  return nfts
}

export async function getDandies(ownerAddress: string) {
  return (
    (
      await client.rpc.searchAssets({
        ownerAddress,
        page: 1,
        grouping: ["collection", process.env.NEXT_PUBLIC_DANDIES_COLLECTION!],
      })
    )?.items || []
  )
}

export async function getPriorityFeesForTx(tx: string, feeLevel: PriorityFees) {
  console.log(feeLevel)
  const { data } = await axios.post(url, {
    jsonrpc: "2.0",
    id: "1",
    method: "getPriorityFeeEstimate",
    params: [
      {
        transaction: tx,
        options: { priorityLevel: feeLevel },
      },
    ],
  })

  console.log(data)

  return data?.result?.priorityFeeEstimate || 0
}

async function getDandiesPage(page: number) {
  return client.rpc.getAssetsByGroup({
    page,
    groupKey: "collection",
    groupValue: DANDIES_COLLECTION,
    displayOptions: {
      showGrandTotal: true,
    },
  })
}

export async function getAllDandies() {
  const result = await getDandiesPage(1)
  const total = result.grand_total as any as number
  let das = result.items

  const pages = Math.ceil((total - das.length) / 1000)

  await Promise.all(
    Array.from(new Array(pages).keys()).map(async (index) => {
      const result = await getDandiesPage(index + 2)
      das.push(...result.items)
    })
  )
  return das
}
