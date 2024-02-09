import { publicKey, sol } from "@metaplex-foundation/umi"

export const PROGRAM_ID = publicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
export const DANDIES_COLLECTION = publicKey(process.env.NEXT_PUBLIC_DANDIES_COLLECTION!)
export const SHARE_RECORD_SIZE = 8 + 32 + 32 + 8 + 1
export const NFT_SHARE_RECORD_SIZE = 8 + 32 + 32 + 32 + 1
export const FEES_WALLET = publicKey(process.env.NEXT_PUBLIC_FEES_WALLET!)
export const FEE_WAIVER = publicKey(process.env.NEXT_PUBLIC_FEE_WAIVER!)
export const ADMIN_WALLET = publicKey(process.env.NEXT_PUBLIC_ADMIN_WALLET!)

export const FEES = {
  claim: {
    basic: sol(0.002).basisPoints,
    advanced: sol(0.001).basisPoints,
    pro: sol(0.0005).basisPoints,
  },
  distribute: {
    basic: sol(0.002).basisPoints,
    advanced: sol(0.001).basisPoints,
    pro: sol(0.0005).basisPoints,
  },
}

export enum PriorityFees {
  MIN = "Min",
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  VERYHIGH = "VeryHigh",
  // UNSAFEMAX = "UnsafeMax",
}
