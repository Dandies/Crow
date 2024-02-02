import * as anchor from "@coral-xyz/anchor"
import { PublicKey, Umi, publicKey } from "@metaplex-foundation/umi"
import assert from "assert"
import { createNft } from "./create-nft"
import { umi } from "./umi"
import { Crow } from "../../target/types/crow"
import { safeFetchToken } from "@metaplex-foundation/mpl-toolbox"
import { getTokenAccount } from "./pdas"

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
