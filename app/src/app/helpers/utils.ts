import * as anchor from "@coral-xyz/anchor"
import { Dictionary, get, groupBy, mapValues, orderBy } from "lodash"
import { FEES, MAX_TX_SIZE, PRIORITY_AND_COMPUTE_IXS_SIZE, PRIORITY_FEE_IX_SIZE, PriorityFees } from "../constants"
import { BN } from "bn.js"
import { DAS } from "helius-sdk"
import { PublicKey, Transaction, TransactionBuilder, Umi, base58, publicKey } from "@metaplex-foundation/umi"
import { AssetWithPublicKey, CrowWithPublicKey } from "../types/types"
import { findCrowPda } from "./pdas"
import { setComputeUnitLimit, setComputeUnitPrice } from "@metaplex-foundation/mpl-toolbox"
import { getPriorityFeesForTx } from "./helius"

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
      const mapped = assetDict[pda]?.map((asset) => {
        return {
          publicKey: asset.publicKey.toBase58(),
          account: mapValues(asset.account, (item) =>
            item instanceof BN ? item.toString() : item instanceof anchor.web3.PublicKey ? item.toBase58() : item
          ),
        }
      })
      crow.assets = orderBy(mapped, (item) => Number(item.account.startTime), "asc")
    }
    return {
      ...da,
      crow,
    }
  })
}

export function displayErrorFromLog(err: any, fallback: string = "Unable to perform action") {
  const errMessage = err.logs?.find((l: string) => l.includes("Error Message:"))?.split("Error Message: ")?.[1]
  return errMessage || err.message || fallback
}

export function unsafeSplitByTransactionSizeWithPriorityFees(
  umi: Umi,
  tx: TransactionBuilder,
  computeUnits: boolean
): TransactionBuilder[] {
  return tx.items.reduce(
    (builders, item) => {
      const lastBuilder = builders.pop() as TransactionBuilder
      const lastBuilderWithItem = lastBuilder.add(item)
      if (
        lastBuilderWithItem.getTransactionSize(umi) <=
        MAX_TX_SIZE - (computeUnits ? PRIORITY_AND_COMPUTE_IXS_SIZE : PRIORITY_FEE_IX_SIZE)
      ) {
        builders.push(lastBuilderWithItem)
      } else {
        builders.push(lastBuilder)
        builders.push(lastBuilder.empty().add(item))
      }
      return builders
    },
    [tx.empty()]
  )
}

export async function packTx(umi: Umi, tx: TransactionBuilder, feeLevel: PriorityFees, computeUnits?: number) {
  let chunks = unsafeSplitByTransactionSizeWithPriorityFees(umi, tx, !!computeUnits)

  const [encoded] = base58.deserialize(umi.transactions.serialize(await chunks[0].buildWithLatestBlockhash(umi)))
  const txFee = feeLevel && (await getPriorityFeesForTx(encoded, feeLevel))

  if (computeUnits) {
    chunks = chunks.map((ch) => ch.prepend(setComputeUnitLimit(umi, { units: computeUnits })))
  }

  if (txFee) {
    chunks = chunks.map((ch) => ch.prepend(setComputeUnitPrice(umi, { microLamports: txFee })))
  }
  return { chunks, txFee }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function sendAllTxsWithRetries(
  umi: Umi,
  connection: anchor.web3.Connection,
  signed: Transaction[],
  preIxs = 0,
  delay = 500
) {
  let successes = 0
  let errors = 0

  const lastValidBlockHeight = (await umi.rpc.getLatestBlockhash()).lastValidBlockHeight
  let blockheight = await connection.getBlockHeight("confirmed")
  let blockhash = await umi.rpc.getLatestBlockhash()

  await Promise.all(
    signed.map(async (tx) => {
      const sig = await umi.rpc.sendTransaction(tx, { skipPreflight: true })
      let resolved = false
      const confPromise = umi.rpc.confirmTransaction(sig, {
        strategy: {
          type: "blockhash",
          ...blockhash,
        },
        commitment: "confirmed",
      })

      while (blockheight < lastValidBlockHeight && !resolved) {
        try {
          console.log("Sending tx")
          await umi.rpc.sendTransaction(tx)
          await sleep(delay)
        } catch (err: any) {
          if (err.message.includes("This transaction has already been processed")) {
            resolved = true
          } else {
            console.log(err.logs)
            console.error(displayErrorFromLog(err, err.message || "Error sending tx"))
          }
        }
        blockheight = await connection.getBlockHeight()
      }

      const conf = await confPromise

      if (conf.value.err) {
        errors += tx.message.instructions.length - preIxs
      } else {
        successes += tx.message.instructions.length - preIxs
      }
    })
  )

  return {
    successes,
    errors,
  }
}
