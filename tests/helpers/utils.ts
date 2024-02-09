import * as anchor from "@coral-xyz/anchor"
import { PublicKey, Umi, publicKey } from "@metaplex-foundation/umi"
import assert from "assert"
import { createNft } from "./create-nft"
import { umi } from "./umi"
import { Crow } from "../../target/types/crow"
import { safeFetchToken } from "@metaplex-foundation/mpl-toolbox"
import { getTokenAccount } from "./pdas"
import { createSignerFromKeypair } from "@metaplex-foundation/umi"

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function assertErrorLogContains(
  err: {
    logs: string[]
  },
  text: string
) {
  assert.ok(err.logs.find((log) => log.includes(text)))
}

export async function expectFail(func: Function, onError: Function) {
  try {
    await func()
    assert.fail("Expected function to throw")
  } catch (err) {
    if (err.code === "ERR_ASSERTION") {
      throw err
    } else {
      onError(err)
    }
  }
}

export const FEES_WALLET = publicKey("B84GxkZDmXmbZ9PBK7yLvYpNhMX1TAUQ4T7tQWsukUyT")

export async function mintNfts(collection: PublicKey, num: number, isPnft: boolean, owner?: PublicKey) {
  return await Promise.all(Array.from(new Array(num).keys()).map((async) => createNft(umi, isPnft, collection, owner)))
}

export function assertErrorCode(err: any, code) {
  assert.equal(err?.error?.errorCode?.code, code, `Expected code ${code}`)
}

export function assertEqualishLamports(num1: bigint, num2: bigint, msg?: string) {
  assert.ok(Math.abs(Number(num1) - Number(num2)) < 100, msg)
}

export async function getTokenAmount(tokenMint: PublicKey, owner: PublicKey): Promise<bigint> {
  return (await safeFetchToken(umi, getTokenAccount(tokenMint, owner)))?.amount || 0n
}

export const DANDIES_COLLECTION_SIGNER = createSignerFromKeypair(
  umi,
  umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array([
      28, 127, 4, 68, 83, 107, 119, 245, 87, 122, 132, 15, 19, 6, 68, 155, 200, 25, 56, 122, 45, 245, 46, 220, 105, 164,
      31, 232, 54, 172, 57, 31, 6, 198, 239, 111, 3, 115, 20, 233, 175, 73, 62, 115, 210, 231, 239, 42, 216, 101, 152,
      194, 60, 58, 210, 53, 153, 124, 189, 188, 176, 8, 77, 71,
    ])
  )
)
