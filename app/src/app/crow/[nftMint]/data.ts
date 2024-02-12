import { anonymousProgram } from "@/app/helpers/anchor"
import { getDigitalAsset } from "@/app/helpers/helius"
import { findCrowPda } from "@/app/helpers/pdas"
import { mapDasWithAccounts } from "@/app/helpers/utils"
import { AssetWithPublicKey, Crow } from "@/app/types/types"
import { publicKey } from "@metaplex-foundation/umi"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import { DAS } from "helius-sdk"

export async function fetchDaWithCrow(nftMint: string) {
  const pk = publicKey(nftMint)
  const pda = findCrowPda(pk)
  let da: DAS.GetAssetResponse | null = null
  let crow: Crow | null = null
  let assets: AssetWithPublicKey[] = []
  try {
    da = await getDigitalAsset(pk)
    crow = await anonymousProgram.account.crow.fetch(pda)
    if (crow) {
      assets = (await anonymousProgram.account.asset.all([{ memcmp: { bytes: pda, offset: 8 } }])) || []
    }
  } catch {}

  if (da) {
    const [daWithCrow] = mapDasWithAccounts(
      [da],
      crow ? [{ account: crow, publicKey: toWeb3JsPublicKey(pda) }] : [],
      assets
    )

    return daWithCrow
  } else {
    throw new Error("Digital asset not found")
  }
}
