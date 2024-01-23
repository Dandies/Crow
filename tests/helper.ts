import * as anchor from "@coral-xyz/anchor"
import { Keypair, sol } from "@metaplex-foundation/umi"
import { Crow } from "../target/types/crow"
import { umi } from "./helpers/umi"
import { toWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters"

anchor.setProvider(anchor.AnchorProvider.env())
export const adminProgram = anchor.workspace.Crow as anchor.Program<Crow>

export function programPaidBy(payer: Keypair): anchor.Program<Crow> {
  const newProvider = new anchor.AnchorProvider(
    adminProgram.provider.connection,
    new anchor.Wallet(toWeb3JsKeypair(payer)),
    {}
  )

  return new anchor.Program(adminProgram.idl, adminProgram.programId, newProvider)
}

export async function createNewUser() {
  const kp = umi.eddsa.generateKeypair()

  await umi.rpc.airdrop(kp.publicKey, sol(100))
  return kp
}
