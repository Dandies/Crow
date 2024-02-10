import * as anchor from "@coral-xyz/anchor"
import { Crow as CrowProgram } from "./crow"
import { DAS } from "helius-sdk"

export type CrowWithPublicKey = {
  publicKey: anchor.web3.PublicKey
  account: Crow
}

export type AssetWithPublicKey = {
  publicKey: anchor.web3.PublicKey
  account: Asset
}

export type CrowWithAssets = CrowWithPublicKey & {
  assets?: AssetWithPublicKey[]
}

export type Crow = anchor.IdlAccounts<CrowProgram>["crow"]
export type Asset = anchor.IdlAccounts<CrowProgram>["asset"]
export type ProgramConfig = anchor.IdlAccounts<CrowProgram>["programConfig"]

export type TokenWithTokenInfo = DAS.GetAssetResponse & {
  token_info: {
    balance: number
    decimals: number
    symbol: string
    price_info: {
      total_price: number
      price_per_token: number
    }
  }
}
