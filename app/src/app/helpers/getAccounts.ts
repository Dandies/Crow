"use server"
import { PublicKey } from "@metaplex-foundation/umi"
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

const umi = createUmi(process.env.RPC_HOST!).use(mplTokenMetadata())

export async function getAccounts(pks: PublicKey[]) {
  const accounts = await umi.rpc.getAccounts(pks)
  return accounts
}
