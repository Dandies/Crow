"use server"

import * as anchor from "@coral-xyz/anchor"
import {
  PublicKey,
  createNoopSigner,
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
  transactionBuilder,
  unwrapOptionRecursively,
} from "@metaplex-foundation/umi"
import { getProgram } from "./anchor"
import { fromWeb3JsInstruction, fromWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import {
  MPL_TOKEN_METADATA_PROGRAM_ID,
  TokenStandard,
  fetchDigitalAsset,
  fetchDigitalAssetWithToken,
  findMasterEditionPda,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { findCrowPda, findProgramConfigPda, getTokenAccount, getTokenRecordPda } from "./pdas"
import { getDandies, getPriorityFeesForTx } from "./helius"
import { FEES_WALLET, PriorityFees } from "../constants"
import base58 from "bs58"
import { MPL_TOKEN_AUTH_RULES_PROGRAM_ID } from "@metaplex-foundation/mpl-token-auth-rules"
import { getFee, packTx } from "./utils"
import { BN } from "bn.js"
import { SPL_TOKEN_PROGRAM_ID, setComputeUnitLimit, setComputeUnitPrice } from "@metaplex-foundation/mpl-toolbox"
import { stakeProgram } from "./stake"
import { string, publicKey as publicKeySerializer } from "@metaplex-foundation/umi/serializers"
import { AssetType } from "../context/digital-assets"
import { ASSET_PROGRAM_ID, State, fetchAsset } from "@nifty-oss/asset"
import { MPL_CORE_PROGRAM_ID, fetchAssetV1 } from "@metaplex-foundation/mpl-core"

let umi = createUmi(process.env.NEXT_PUBLIC_RPC_HOST!, { commitment: "processed" })

export async function getClaimTx(assetId: string, payerPk: string, feeLevel?: PriorityFees) {
  const payer = publicKey(payerPk)
  umi = umi.use(signerIdentity(createNoopSigner(payer)))
  const program = getProgram(umi.identity)

  const assetPk = publicKey(assetId)

  const asset = await program.account.asset.fetch(assetPk)
  const crow = fromWeb3JsPublicKey(asset.crow)
  const crowAccount = await program.account.crow.fetch(crow)
  const nftMint = fromWeb3JsPublicKey(crowAccount.nftMint)

  const acc = await umi.rpc.getAccount(nftMint)

  let nftMetadata = null
  let nftTokenRecord = null
  let nftToken = null
  let delegate = null

  if (acc.exists && acc.owner === SPL_TOKEN_PROGRAM_ID) {
    const nftDa = await fetchDigitalAssetWithToken(umi, nftMint, getTokenAccount(nftMint, payer))
    const isPnft = unwrapOptionRecursively(nftDa.metadata.tokenStandard) === TokenStandard.ProgrammableNonFungible
    delegate = isPnft
      ? unwrapOptionRecursively(nftDa.tokenRecord?.delegate) || null
      : unwrapOptionRecursively(nftDa.token.delegate) || null

    nftMetadata = findMetadataPda(umi, { mint: nftMint })[0]
    nftTokenRecord = isPnft ? getTokenRecordPda(nftMint, umi.identity.publicKey) : null
    nftToken = getTokenAccount(nftMint, umi.identity.publicKey)
  } else if (acc.exists && acc.owner === ASSET_PROGRAM_ID) {
    const asset = await fetchAsset(umi, nftMint)
    delegate = (asset.state === State.Locked && asset.delegate?.address) || null
  } else if (acc.exists && acc.owner === MPL_CORE_PROGRAM_ID) {
    const asset = await fetchAssetV1(umi, nftMint)
    delegate = asset.freezeDelegate?.authority.address || null
  }

  const tokenMint = asset.assetType.token || asset.assetType.nft ? fromWeb3JsPublicKey(asset.tokenMint) : null
  const escrowNftEdition = asset.assetType.nft && tokenMint ? findMasterEditionPda(umi, { mint: tokenMint })[0] : null

  const escrowNftMetadata = escrowNftEdition && tokenMint ? findMetadataPda(umi, { mint: tokenMint })[0] : null

  const recipient = umi.identity.publicKey
  const tokenAccount = tokenMint ? getTokenAccount(tokenMint, crow) : null
  const destinationToken = tokenMint ? getTokenAccount(tokenMint, recipient) : null

  let ownerTokenRecord: PublicKey | null = null
  let destinationTokenRecord: PublicKey | null = null
  let authRules: PublicKey | null = null

  if (asset.assetType.nft && tokenMint) {
    const da = await fetchDigitalAsset(umi, tokenMint)
    if (unwrapOptionRecursively(da.metadata.tokenStandard) === TokenStandard.ProgrammableNonFungible) {
      ownerTokenRecord = getTokenRecordPda(tokenMint, crow)
      destinationTokenRecord = getTokenRecordPda(tokenMint, recipient)
      authRules = unwrapOptionRecursively(da.metadata.programmableConfig)?.ruleSet || null
    }
  }

  const dandies = await getDandies(payer)
  const customFee = getFee("claim", dandies.length)

  const feeWaiver = customFee
    ? createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(base58.decode(process.env.FEE_WAIVER!)))
    : null

  const signers = [umi.identity]

  if (feeWaiver) {
    signers.push(feeWaiver)
  }

  const stakeRecord = (
    await stakeProgram.account.stakeRecord.all([
      {
        memcmp: {
          bytes: nftMint,
          offset: 72,
        },
      },
    ])
  )[0]

  const staker = stakeRecord?.account?.staker || null

  const [_, stakeRecordBump] = staker
    ? umi.eddsa.findPda(fromWeb3JsPublicKey(stakeProgram.programId), [
        string({ size: "variable" }).serialize("STAKE"),
        publicKeySerializer().serialize(fromWeb3JsPublicKey(staker)),
        string({ size: "variable" }).serialize("nft-authority"),
      ])
    : [null, null]

  const instruction = await program.methods
    .transferOut(stakeRecordBump, customFee ? new BN(customFee.toString()) : null)
    .accounts({
      crow,
      programConfig: findProgramConfigPda(),
      feesWallet: FEES_WALLET,
      feeWaiver: feeWaiver?.publicKey || null,
      asset: assetPk,
      tokenMint,
      delegate,
      nftMint,
      nftMetadata,
      nftTokenRecord,
      nftToken,
      escrowNftEdition,
      escrowNftMetadata,
      tokenAccount,
      destinationToken,
      ownerTokenRecord,
      destinationTokenRecord,
      staker,
      metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
      sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      authRules,
      authRulesProgram: MPL_TOKEN_AUTH_RULES_PROGRAM_ID,
      authority: asset.authority,
      recipient,
    })
    .instruction()

  let tx = transactionBuilder().add({
    instruction: fromWeb3JsInstruction(instruction),
    bytesCreatedOnChain: 0,
    signers,
  })

  const { chunks, txFee } = await packTx(
    umi,
    tx,
    feeLevel || PriorityFees.MEDIUM,
    destinationTokenRecord ? 300_00 : undefined
  )

  let built = await Promise.all(chunks.map((c) => c.buildWithLatestBlockhash(umi)))

  if (feeWaiver) {
    built = await feeWaiver.signAllTransactions(built)
  }

  return {
    serialized: built.map((b) => base58.encode(umi.transactions.serialize(b))),
    txFee,
    increasedComputeUnits: !!destinationTokenRecord,
  }
}

export async function getDistributeTx({
  payerPk,
  assetId,
  assetType,
  type,
  vestingType,
  escrowNftPk,
  numIntervals,
  amount,
  tokenPk,
  startDate,
  endDate,
  feeLevel,
}: {
  payerPk: string
  assetId: string
  assetType: AssetType
  type: string
  vestingType: string
  escrowNftPk?: string
  numIntervals?: number
  amount?: string
  tokenPk?: string
  startDate?: number
  endDate?: number
  feeLevel?: PriorityFees
}) {
  const payer = publicKey(payerPk)
  umi = umi.use(signerIdentity(createNoopSigner(payer)))
  const program = getProgram(umi.identity)

  const nft = publicKey(assetId)

  const nftMetadata = assetType === AssetType.LEGACY ? findMetadataPda(umi, { mint: nft })[0] : null

  const asset = generateSigner(umi)

  const crow = findCrowPda(nft)
  const vestingTypeEnum = {
    [vestingType]: {},
  }
  if (vestingType === "intervals") {
    vestingTypeEnum.intervals = { numIntervals }
  }
  const escrowDa = type === "nft" && escrowNftPk ? await fetchDigitalAsset(umi, publicKey(escrowNftPk)) : null
  const escrowNftMint = type === "nft" && escrowDa ? publicKey(escrowDa.publicKey) : null
  const isPnft =
    escrowNftMint && unwrapOptionRecursively(escrowDa?.metadata.tokenStandard) === TokenStandard.ProgrammableNonFungible

  const tokenMint = type === "token" && tokenPk ? publicKey(tokenPk) : type === "nft" ? escrowNftMint : null
  const tokenAccount = tokenMint ? getTokenAccount(tokenMint, umi.identity.publicKey) : null
  const destinationToken = tokenMint ? getTokenAccount(tokenMint, crow) : null

  const ownerTokenRecord = escrowNftMint && isPnft ? getTokenRecordPda(escrowNftMint, umi.identity.publicKey) : null
  const destinationTokenRecord = ownerTokenRecord ? getTokenRecordPda(escrowNftMint!, crow) : null
  const escrowNftEdition = escrowNftMint ? findMasterEditionPda(umi, { mint: escrowNftMint })[0] : null
  const escrowNftMetadata = escrowNftMint ? findMetadataPda(umi, { mint: escrowNftMint })[0] : null
  const authRules = escrowNftMint
    ? unwrapOptionRecursively((await fetchDigitalAsset(umi, escrowNftMint)).metadata.programmableConfig)?.ruleSet
    : null

  const dandies = await getDandies(payer)

  const customFee = getFee("distribute", dandies.length)

  const feeWaiver =
    customFee !== null
      ? createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(base58.decode(process.env.FEE_WAIVER!)))
      : null

  const signers = [umi.identity, asset]

  if (feeWaiver) {
    signers.push(feeWaiver)
  }

  const instruction = await program.methods
    .transferIn(
      { [type]: {} } as any,
      type === "nft" ? null : new BN(amount!),
      startDate ? new BN(startDate) : null,
      endDate ? new BN(endDate) : null,
      vestingTypeEnum as any,
      customFee ? new BN(customFee.toString()) : null
    )
    .accounts({
      programConfig: findProgramConfigPda(),
      crow,
      asset: asset.publicKey,
      nftMint: nft,
      nftMetadata,
      tokenMint,
      escrowNftEdition,
      escrowNftMetadata,
      tokenAccount,
      destinationToken,
      authority: umi.identity.publicKey,
      feesWallet: FEES_WALLET,
      feeWaiver: feeWaiver ? feeWaiver.publicKey : null,
      metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
      authRulesProgram: MPL_TOKEN_AUTH_RULES_PROGRAM_ID,
      authRules,
      ownerTokenRecord,
      destinationTokenRecord,
      sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    })
    .instruction()

  let tx = transactionBuilder().add({
    instruction: fromWeb3JsInstruction(instruction),
    bytesCreatedOnChain: 0,
    signers,
  })

  if (isPnft) {
    tx = tx.prepend(setComputeUnitLimit(umi, { units: 300_000 }))
  }

  const { chunks, txFee } = await packTx(
    umi,
    tx,
    feeLevel || PriorityFees.MEDIUM,
    destinationTokenRecord ? 300_00 : undefined
  )

  let built = await Promise.all(chunks.map((c) => c.buildWithLatestBlockhash(umi)))
  built = await asset.signAllTransactions(built)

  if (feeWaiver) {
    built = await feeWaiver.signAllTransactions(built)
  }

  return {
    serialized: built.map((b) => base58.encode(umi.transactions.serialize(b))),
    txFee,
    increasedComputeUnits: !!destinationTokenRecord,
  }
}

export async function getDistributeTxs({
  payerPk,
  assetIds,
  type,
  vestingType,
  escrowNftPk,
  numIntervals,
  amount,
  tokenPk,
  startDate,
  endDate,
  feeLevel,
}: {
  payerPk: string
  assetIds: string[]
  type: string
  vestingType: string
  escrowNftPk?: string
  numIntervals?: number
  amount?: string
  tokenPk?: string
  startDate?: number
  endDate?: number
  feeLevel?: PriorityFees
}) {
  return []
}
