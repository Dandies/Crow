import { umi } from "./umi"
import idl from "../../target/idl/crow.json"
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

export function findCrowPda(nft: PublicKey, authority: PublicKey) {
  return umi.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("CROW"),
    publicKeySerializer().serialize(nft),
    publicKeySerializer().serialize(authority),
  ])[0]
}

export function findAssetPda(crow: PublicKey) {
  return umi.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("CROW"),
    publicKeySerializer().serialize(crow),
    string({ size: "variable" }).serialize("asset"),
  ])
}

export function getTokenRecordPda(mint: PublicKey, owner: PublicKey) {
  return findTokenRecordPda(umi, {
    mint,
    token: getTokenAccount(mint, owner),
  })[0]
}

export const FEE_WAIVER = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array([
    135, 41, 139, 1, 64, 4, 78, 159, 1, 20, 144, 50, 66, 232, 6, 209, 80, 139, 208, 149, 218, 119, 66, 134, 165, 51, 32,
    123, 4, 147, 101, 47, 126, 106, 163, 255, 203, 119, 189, 135, 43, 143, 210, 20, 201, 94, 117, 73, 55, 198, 5, 55,
    13, 160, 162, 192, 22, 219, 52, 187, 37, 206, 221, 48,
  ])
)
