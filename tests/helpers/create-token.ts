import { generateSigner, percentAmount, sol, transactionBuilder } from "@metaplex-foundation/umi"
import { TokenStandard, createAndMint, createFungible } from "@metaplex-foundation/mpl-token-metadata"
import type { Signer, Umi } from "@metaplex-foundation/umi"
import { createAssociatedToken, findAssociatedTokenPda, mintTokensTo } from "@metaplex-foundation/mpl-toolbox"
import { getTokenAccount } from "./pdas"
import { PublicKey } from "@solana/web3.js"

export async function createToken(
  umi: Umi,
  amount = BigInt(3600),
  decimals: number = 0,
  mint = generateSigner(umi),
  sendTo = umi.identity.publicKey
) {
  await transactionBuilder()
    .add(
      createAndMint(umi, {
        mint,
        name: "Test Token",
        uri: "",
        sellerFeeBasisPoints: percentAmount(0),
        authority: umi.identity,
        decimals,
        token: getTokenAccount(mint.publicKey, sendTo),
        tokenOwner: sendTo,
        tokenStandard: TokenStandard.Fungible,
        amount,
      })
    )
    .sendAndConfirm(umi)

  return mint.publicKey
}
