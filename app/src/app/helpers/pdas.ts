import { umi } from "./umi"
import idl from "@/app/idl/crow.json"
import { PublicKey, publicKey } from "@metaplex-foundation/umi"
import { string, publicKey as publicKeySerializer } from "@metaplex-foundation/umi-serializers"
import { findAssociatedTokenPda } from "@metaplex-foundation/mpl-toolbox"
import { findTokenRecordPda } from "@metaplex-foundation/mpl-token-metadata"

const programId = publicKey(idl.metadata.address)

export function getTokenAccount(mint: PublicKey, owner: PublicKey) {
  return findAssociatedTokenPda(umi, { mint, owner })[0]
}

export function findProgramConfigPda() {
  return umi.eddsa.findPda(programId, [string({ size: "variable" }).serialize("program-config")])[0]
}

export function findProgramDataAddress() {
  return umi.eddsa.findPda(publicKey("BPFLoaderUpgradeab1e11111111111111111111111"), [
    publicKeySerializer().serialize(programId),
  ])[0]
}

export function findCrowPda(nft: PublicKey) {
  return umi.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("CROW"),
    publicKeySerializer().serialize(nft),
  ])[0]
}

export function getTokenRecordPda(mint: PublicKey, owner: PublicKey) {
  return findTokenRecordPda(umi, {
    mint,
    token: getTokenAccount(mint, owner),
  })[0]
}
