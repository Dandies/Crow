import * as anchor from "@coral-xyz/anchor"
import { anonymousProgram } from "@/app/helpers/anchor"
import { findCrowPda } from "@/app/helpers/pdas"
import { AssetWithPublicKey, CrowWithAssets, CrowWithPublicKey } from "@/app/types/types"
import { PublicKey, publicKey } from "@metaplex-foundation/umi"
import axios from "axios"
import { BN } from "bn.js"
import { DAS } from "helius-sdk"
import { groupBy, mapValues } from "lodash"
import { mapDasWithAccounts } from "@/app/helpers/utils"

self.addEventListener("message", async (event) => {
  const { wallet } = event.data

  const [{ data: digitalAssets }, crows, assets]: [
    { data: DAS.GetAssetResponse[] },
    CrowWithPublicKey[],
    AssetWithPublicKey[]
  ] = await Promise.all([
    axios.post("/api/get-nfts", {
      ownerAddress: wallet,
    }),
    anonymousProgram.account.crow.all(),
    anonymousProgram.account.asset.all(),
  ])

  self.postMessage({
    digitalAssets: mapDasWithAccounts(digitalAssets, crows, assets),
  })
})
