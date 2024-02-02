"use client"

import * as anchor from "@coral-xyz/anchor"
import { Crow } from "@/app/types/crow"
import { Program } from "@coral-xyz/anchor"
import { PropsWithChildren, createContext, useContext } from "react"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import idl from "@/app/idl/crow.json"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { PROGRAM_ID } from "../constants"

const programId = toWeb3JsPublicKey(PROGRAM_ID)

const Context = createContext<Program<Crow> | undefined>(undefined)

export function AnchorProvider({ children }: PropsWithChildren) {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()
  const provider = new anchor.AnchorProvider(connection, wallet!, {})

  const program = new Program(idl as any, programId, provider)
  return <Context.Provider value={program}>{children}</Context.Provider>
}

export const useAnchor = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useAnchor must be used in an AnchorProvider")
  }

  return context
}
