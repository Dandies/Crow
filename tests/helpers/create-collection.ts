import { createProgrammableNft, fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata"
import { generateSigner, percentAmount, type Umi } from "@metaplex-foundation/umi"

export async function createCollection(umi: Umi, collection = generateSigner(umi)) {
  await createProgrammableNft(umi, {
    mint: collection,
    isCollection: true,
    name: "Test Collection",
    uri: "",
    sellerFeeBasisPoints: percentAmount(0),
  }).sendAndConfirm(umi)

  const da = await fetchDigitalAsset(umi, collection.publicKey)
  return da
}
