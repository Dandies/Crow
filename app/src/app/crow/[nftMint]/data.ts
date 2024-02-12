import { anonymousProgram } from "@/app/helpers/anchor"
import { getDigitalAsset } from "@/app/helpers/helius"
import { findCrowPda } from "@/app/helpers/pdas"
import { mapDasWithAccounts } from "@/app/helpers/utils"
import { publicKey } from "@metaplex-foundation/umi"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"

export async function fetchDaWithCrow(nftMint: string) {
  const pk = publicKey(nftMint)
  const pda = findCrowPda(pk)
  const crow = await anonymousProgram.account.crow.fetch(pda)
  const assets = await anonymousProgram.account.asset.all([{ memcmp: { bytes: pda, offset: 8 } }])
  const da = await getDigitalAsset(pk)

  const [daWithCrow] = mapDasWithAccounts([da], [{ account: crow, publicKey: toWeb3JsPublicKey(pda) }], assets)
  return daWithCrow
}
