import * as anchor from "@coral-xyz/anchor"
import IDL from "../idl/crow.json"
import { Crow } from "../types/crow"
import { PROGRAM_ID } from "../constants"
import { PublicKey, Signer } from "@metaplex-foundation/umi"

const connection = new anchor.web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST!, { commitment: "processed" })
export function getProgram(signer: Signer) {
  const provider = new anchor.AnchorProvider(connection, signer as any, {})

  return new anchor.Program<Crow>(IDL as any, new anchor.web3.PublicKey(PROGRAM_ID), provider)
}

export const anonymousProgram = new anchor.Program<Crow>(IDL as any, new anchor.web3.PublicKey(PROGRAM_ID), {
  connection,
})
