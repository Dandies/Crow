import * as anchor from "@coral-xyz/anchor"
import IDL from "../idl/stake.json"
import { Stake } from "../types/stake"

const connection = new anchor.web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST!, { commitment: "processed" })
export const stakeProgram = new anchor.Program<Stake>(IDL as any, new anchor.web3.PublicKey(IDL.metadata.address), {
  connection,
})
