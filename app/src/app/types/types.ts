import * as anchor from "@coral-xyz/anchor"
import { Crow as CrowProgram } from "./crow"

export type CrowWithPublicKey = {
  publicKey: anchor.web3.PublicKey
  account: Crow
}

export type AssetWithPublicKey = {
  publicKey: anchor.web3.PublicKey
  account: Asset
}

export type Crow = anchor.IdlAccounts<CrowProgram>["crow"]
export type Asset = anchor.IdlAccounts<CrowProgram>["asset"]
export type ProgramConfig = anchor.IdlAccounts<CrowProgram>["programConfig"]
