import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Crow } from "../target/types/crow"
import { MPL_TOKEN_AUTH_RULES_PROGRAM_ID } from "@metaplex-foundation/mpl-token-auth-rules"
import { string, publicKey as publicKeySerializer } from "@metaplex-foundation/umi/src/serializers"
import {
  FEE_WAIVER,
  findCrowPda,
  findProgramConfigPda,
  findProgramDataAddress,
  getTokenAccount,
  getTokenRecordPda,
} from "./helpers/pdas"
import {
  Keypair,
  PublicKey,
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  sol,
  tokenAmount,
  transactionBuilder,
  unwrapOptionRecursively,
} from "@metaplex-foundation/umi"
import { STAKE_PROGRAM, adminProgram, createNewUser, programPaidBy } from "./helper"
import {
  DigitalAsset,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  TokenStandard,
  delegateStandardV1,
  delegateUtilityV1,
  fetchDigitalAssetWithToken,
  freezeDelegatedAccount,
  lockV1,
  revokeUtilityV1,
  transferV1,
  unlockV1,
} from "@metaplex-foundation/mpl-token-metadata"
import { createNft } from "./helpers/create-nft"
import { umi } from "./helpers/umi"
import { assert, expect } from "chai"
import { BN } from "bn.js"
import { toWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters"
import {
  DANDIES_COLLECTION_SIGNER,
  FEES_WALLET,
  assertErrorCode,
  expectFail,
  getTokenAmount,
  sleep,
} from "./helpers/utils"
import { createToken } from "./helpers/create-token"
import { createAccount, createAssociatedToken, safeFetchToken } from "@metaplex-foundation/mpl-toolbox"
import { createCollection } from "./helpers/create-collection"
import { KeypairSigner } from "@metaplex-foundation/umi/dist/types/Keypair"
import { DelegateRole, approve, create, delegateInput, lock, revoke, unlock } from "@nifty-oss/asset"
import {
  addPluginV1,
  createPlugin,
  createV1,
  fetchAssetV1,
  freezeAsset,
  pluginAuthority,
  thawAsset,
} from "@metaplex-foundation/mpl-core"

const TX_FEE = 5000n
const DISTRIBUTE_FEE = sol(0.001).basisPoints
const CLAIM_FEE = sol(0.001).basisPoints

describe("esCROW", () => {
  let user: KeypairSigner
  let user2: KeypairSigner
  let userProgram: Program<Crow>
  let user2Program: Program<Crow>
  let dandiesCollection: DigitalAsset
  before(async () => {
    user = await createNewUser()
    user2 = await createNewUser()
    userProgram = programPaidBy(user)
    user2Program = programPaidBy(user2)
    dandiesCollection = await createCollection(umi, DANDIES_COLLECTION_SIGNER)
    await adminProgram.methods
      .initProgramConfig(new BN(CLAIM_FEE.toString()), new BN(DISTRIBUTE_FEE.toString()))
      .accounts({
        programConfig: findProgramConfigPda(),
        program: adminProgram.programId,
        programData: findProgramDataAddress(),
      })
      .rpc()
  })

  describe("Happy path", () => {
    let nft: DigitalAsset
    let crow: PublicKey

    before(async () => {
      nft = await createNft(umi, true, undefined, user2.publicKey)
      crow = findCrowPda(nft.publicKey)
    })

    describe("SOL", () => {
      const asset = umi.eddsa.generateKeypair()
      it("can fund the crow with SOL", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        const tx = await userProgram.methods
          .transferIn({ sol: {} }, new BN(sol(1).basisPoints.toString()), null, null, { none: {} }, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset)])
          .rpc()

        const balAfter = await umi.rpc.getBalance(user.publicKey)

        const slot = await umi.rpc.getSlot({
          id: tx,
        })

        const blockTime = await umi.rpc.getBlockTime(slot)

        const assetAccount = await userProgram.account.asset.fetch(asset.publicKey)
        const crowAccLamports = await umi.rpc.getBalance(crow)

        assert.equal(BigInt(assetAccount.amount.toString()), sol(1).basisPoints, "Expected amount to be 1 sol")
        assert.equal(
          BigInt(assetAccount.startTime.toString()),
          blockTime,
          "Expected start time to be set to block time"
        )

        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          sol(1).basisPoints + TX_FEE * 2n + DISTRIBUTE_FEE + crowAccLamports.basisPoints,
          "Expected balance to reduce by 1 sol + tx fee"
        )
      })

      it("Cannot transfer the crow as a non-holder of the NFT", async () => {
        await expectFail(
          () =>
            userProgram.methods
              .transferOut(null, null)
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                delegate: null,
                staker: null,
                tokenMint: null,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user.publicKey),
                nftToken: getTokenAccount(nft.publicKey, user.publicKey),
                escrowNftEdition: null,
                escrowNftMetadata: null,
                tokenAccount: null,
                destinationToken: null,
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
                authority: user.publicKey,
                recipient: user.publicKey,
              })
              .rpc(),
          (err) => assertErrorCode(err, "AccountNotInitialized")
        )
      })

      it("cant claim if the token is locked", async () => {
        await transactionBuilder()
          .add(
            delegateUtilityV1(umi, {
              mint: nft.publicKey,
              authority: createSignerFromKeypair(umi, user2),
              delegate: user2.publicKey,
              tokenStandard: TokenStandard.ProgrammableNonFungible,
              tokenOwner: user2.publicKey,
              authorizationRules: unwrapOptionRecursively(nft.metadata.programmableConfig).ruleSet,
            })
          )
          .add(
            lockV1(umi, {
              mint: nft.publicKey,
              authority: createSignerFromKeypair(umi, user2),
              tokenStandard: TokenStandard.ProgrammableNonFungible,
              token: getTokenAccount(nft.publicKey, user2.publicKey),
              tokenOwner: user2.publicKey,
            })
          )
          .sendAndConfirm(umi)

        await expectFail(
          () =>
            user2Program.methods
              .transferOut(null, null)
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: null,
                delegate: null,
                staker: null,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
                escrowNftEdition: null,
                escrowNftMetadata: null,
                tokenAccount: null,
                destinationToken: null,
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
                authority: user.publicKey,
                recipient: user2.publicKey,
              })
              .rpc(),
          (err) => assertErrorCode(err, "TokenIsLocked")
        )
      })

      it("can claim the SOL", async () => {
        await transactionBuilder()
          .add(
            unlockV1(umi, {
              mint: nft.publicKey,
              authority: createSignerFromKeypair(umi, user2),
              tokenStandard: TokenStandard.ProgrammableNonFungible,
              token: getTokenAccount(nft.publicKey, user2.publicKey),
              tokenOwner: user2.publicKey,
            })
          )
          .add(
            revokeUtilityV1(umi, {
              mint: nft.publicKey,
              authority: createSignerFromKeypair(umi, user2),
              delegate: user2.publicKey,
              tokenStandard: TokenStandard.ProgrammableNonFungible,
              tokenOwner: user2.publicKey,
              authorizationRules: unwrapOptionRecursively(nft.metadata.programmableConfig).ruleSet,
            })
          )
          .sendAndConfirm(umi)

        const balBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
            delegate: null,
            staker: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .rpc()

        const balAfter = await umi.rpc.getBalance(user2.publicKey)

        assert.equal(balAfter.basisPoints - balBefore.basisPoints, sol(1).basisPoints - TX_FEE - CLAIM_FEE)
      })
    })

    describe("Token", () => {
      let tokenMint: PublicKey
      const asset = umi.eddsa.generateKeypair()
      before(async () => {
        tokenMint = await createToken(umi, tokenAmount(100, "token", 9).basisPoints, 9, undefined, user.publicKey)
      })

      it("can fund a Crow which can be claimed in 3 seconds", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .transferIn(
            { token: {} },
            new BN(tokenAmount(10, "token", 9).basisPoints.toString()),
            new BN(Date.now() / 1000 + 3),
            null,
            { none: {} },
            null
          )
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint,
            tokenAccount: getTokenAccount(tokenMint, user.publicKey),
            destinationToken: getTokenAccount(tokenMint, crow),
            nftMetadata: nft.metadata.publicKey,
            nftMint: nft.publicKey,
            escrowNftEdition: null,
            escrowNftMetadata: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset)])
          .rpc()

        const assetLamorts = (await umi.rpc.getBalance(asset.publicKey)).basisPoints
        const tokenLamports = (await umi.rpc.getBalance(getTokenAccount(tokenMint, crow))).basisPoints

        const balAfter = await umi.rpc.getBalance(user.publicKey)
        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          TX_FEE * 2n + DISTRIBUTE_FEE + assetLamorts + tokenLamports,
          "Expected to pay for acc opening rent, token rent, tx fee + distribute fee"
        )
      })

      it("Cannot claim right away as vesting", async () => {
        await expectFail(
          () =>
            user2Program.methods
              .transferOut(null, null)
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint,
                delegate: null,
                staker: null,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
                nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
                escrowNftEdition: null,
                escrowNftMetadata: null,
                tokenAccount: getTokenAccount(tokenMint, crow),
                destinationToken: getTokenAccount(tokenMint, user2.publicKey),
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
                authority: user.publicKey,
                recipient: user2.publicKey,
              })
              .rpc(),
          (err) => assertErrorCode(err, "CannotClaimYet")
        )
      })

      it("can wait 3 seconds then claim, with waived fee", async () => {
        await sleep(4000)
        const tokenBalBefore = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const balBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            asset: asset.publicKey,
            tokenMint,
            delegate: null,
            staker: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: getTokenAccount(tokenMint, crow),
            destinationToken: getTokenAccount(tokenMint, user2.publicKey),
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .signers([toWeb3JsKeypair(FEE_WAIVER)])
          .rpc()

        const balAfter = await umi.rpc.getBalance(user2.publicKey)

        const tokenBalAfter = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n

        const tokenAccBalance = await umi.rpc.getBalance(getTokenAccount(tokenMint, user2.publicKey))

        assert.equal(
          tokenBalAfter - tokenBalBefore,
          tokenAmount(10, "token", 9).basisPoints,
          "Expected to have claimed 10 tokens"
        )

        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          TX_FEE * 2n + tokenAccBalance.basisPoints,
          "Expected to have paid the tx fee, and token acc rent, but no claim fee"
        )
      })
    })

    describe("NFT", () => {
      let escrowNft: DigitalAsset
      const asset = umi.eddsa.generateKeypair()
      let user3: Keypair
      let user3Program: Program<Crow>
      before(async () => {
        escrowNft = await createNft(umi, false, undefined, user.publicKey)
        user3 = await createNewUser()
        user3Program = programPaidBy(user3)
      })

      it("can add an NFT to a crow", async () => {
        await userProgram.methods
          .transferIn({ nft: {} }, null, null, null, { none: {} }, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            tokenAccount: getTokenAccount(escrowNft.publicKey, user.publicKey),
            destinationToken: getTokenAccount(escrowNft.publicKey, crow),
            escrowNftMetadata: escrowNft.metadata.publicKey,
            escrowNftEdition: escrowNft.edition.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftMint: nft.publicKey,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset)])
          .rpc()
      })

      it("can send the original NFT to another user, and not longer claim", async () => {
        await transactionBuilder()
          .add(
            createAssociatedToken(umi, {
              mint: nft.publicKey,
              owner: user3.publicKey,
            })
          )
          .add(
            transferV1(umi, {
              mint: nft.publicKey,
              token: getTokenAccount(nft.publicKey, user2.publicKey),
              authority: createSignerFromKeypair(umi, user2),
              tokenOwner: user2.publicKey,
              destinationOwner: user3.publicKey,
              destinationToken: getTokenAccount(nft.publicKey, user3.publicKey),
              tokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
              destinationTokenRecord: getTokenRecordPda(nft.publicKey, user3.publicKey),
              tokenStandard: TokenStandard.ProgrammableNonFungible,
              authorizationRules: unwrapOptionRecursively(nft.metadata.programmableConfig).ruleSet,
            })
          )
          .sendAndConfirm(umi)

        await expectFail(
          () =>
            user2Program.methods
              .transferOut(null, null)
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                delegate: null,
                staker: null,
                asset: asset.publicKey,
                tokenMint: escrowNft.publicKey,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
                nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
                escrowNftEdition: escrowNft.edition.publicKey,
                escrowNftMetadata: escrowNft.metadata.publicKey,
                tokenAccount: getTokenAccount(escrowNft.publicKey, crow),
                destinationToken: getTokenAccount(escrowNft.publicKey, user2.publicKey),
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
                authority: user.publicKey,
                recipient: user2.publicKey,
              })
              .rpc(),
          (err) => assertErrorCode(err, "AccountNotInitialized")
        )
      })

      it("can be claimed by the new owner of the Crow nft", async () => {
        const tokenBefore =
          (await safeFetchToken(umi, getTokenAccount(escrowNft.publicKey, user3.publicKey)))?.amount || 0n
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        const acc = await umi.rpc.getAccount(asset.publicKey)
        const accLamports = acc.exists && acc.lamports
        const token = await umi.rpc.getAccount(getTokenAccount(escrowNft.publicKey, crow))
        const tokenLamports = token.exists && token.lamports
        const feesWalletBefore = await umi.rpc.getBalance(FEES_WALLET)
        await user3Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            nftMint: nft.publicKey,
            delegate: null,
            staker: null,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user3.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user3.publicKey),
            escrowNftEdition: escrowNft.edition.publicKey,
            escrowNftMetadata: escrowNft.metadata.publicKey,
            tokenAccount: getTokenAccount(escrowNft.publicKey, crow),
            destinationToken: getTokenAccount(escrowNft.publicKey, user3.publicKey),
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user3.publicKey,
          })
          .rpc()
        const feesWalletAfter = await umi.rpc.getBalance(FEES_WALLET)
        const tokenAfter =
          (await safeFetchToken(umi, getTokenAccount(escrowNft.publicKey, user3.publicKey)))?.amount || 0n

        const balAfter = await umi.rpc.getBalance(user.publicKey)

        assert.equal(tokenAfter - tokenBefore, 1n, "Expected NFT to have been claimed")
        assert.equal(
          balAfter.basisPoints - balBefore.basisPoints,
          accLamports.basisPoints + tokenLamports.basisPoints,
          "Expected authority to be repaid the acc opening rent and token account rent"
        )

        assert.equal(
          feesWalletAfter.basisPoints - feesWalletBefore.basisPoints,
          CLAIM_FEE,
          "Expected the fees wallet to receive the claim fee"
        )

        await transferV1(umi, {
          mint: nft.publicKey,
          token: getTokenAccount(nft.publicKey, user3.publicKey),
          authority: createSignerFromKeypair(umi, user3),
          tokenOwner: user3.publicKey,
          destinationOwner: user2.publicKey,
          destinationToken: getTokenAccount(nft.publicKey, user2.publicKey),
          tokenRecord: getTokenRecordPda(nft.publicKey, user3.publicKey),
          destinationTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
          tokenStandard: TokenStandard.ProgrammableNonFungible,
          authorizationRules: unwrapOptionRecursively(nft.metadata.programmableConfig).ruleSet,
        }).sendAndConfirm(umi)
      })
    })

    describe("pNFT", async () => {
      let escrowNft: DigitalAsset
      const asset = umi.eddsa.generateKeypair()
      before(async () => {
        escrowNft = await createNft(umi, true, undefined, user.publicKey)
      })

      it("Can send a pNFT to a Crow", async () => {
        await userProgram.methods
          .transferIn({ nft: {} }, null, null, null, { none: {} }, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            tokenAccount: getTokenAccount(escrowNft.publicKey, user.publicKey),
            destinationToken: getTokenAccount(escrowNft.publicKey, crow),
            nftMetadata: nft.metadata.publicKey,
            nftMint: nft.publicKey,
            escrowNftMetadata: escrowNft.metadata.publicKey,
            escrowNftEdition: escrowNft.edition.publicKey,
            ownerTokenRecord: getTokenRecordPda(escrowNft.publicKey, user.publicKey),
            destinationTokenRecord: getTokenRecordPda(escrowNft.publicKey, crow),
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: unwrapOptionRecursively(escrowNft.metadata.programmableConfig).ruleSet,
            authRulesProgram: MPL_TOKEN_AUTH_RULES_PROGRAM_ID,
          })
          .signers([toWeb3JsKeypair(asset)])
          .preInstructions([anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })])
          .rpc()
      })

      it("can be claimed", async () => {
        const tokenBefore =
          (await safeFetchToken(umi, getTokenAccount(escrowNft.publicKey, user2.publicKey)))?.amount || 0n
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        const acc = await umi.rpc.getAccount(asset.publicKey)
        const accLamports = acc.exists && acc.lamports
        const token = await umi.rpc.getAccount(getTokenAccount(escrowNft.publicKey, crow))
        const tokenLamports = token.exists && token.lamports
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            nftMint: nft.publicKey,
            delegate: null,
            staker: null,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: escrowNft.edition.publicKey,
            escrowNftMetadata: escrowNft.metadata.publicKey,
            tokenAccount: getTokenAccount(escrowNft.publicKey, crow),
            destinationToken: getTokenAccount(escrowNft.publicKey, user2.publicKey),
            ownerTokenRecord: getTokenRecordPda(escrowNft.publicKey, crow),
            destinationTokenRecord: getTokenRecordPda(escrowNft.publicKey, user2.publicKey),
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: unwrapOptionRecursively(escrowNft.metadata.programmableConfig).ruleSet,
            authRulesProgram: MPL_TOKEN_AUTH_RULES_PROGRAM_ID,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .preInstructions([anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })])
          .rpc()
        const tokenAfter =
          (await safeFetchToken(umi, getTokenAccount(escrowNft.publicKey, user2.publicKey)))?.amount || 0n

        const balAfter = await umi.rpc.getBalance(user.publicKey)

        assert.equal(tokenAfter - tokenBefore, 1n, "Expected NFT to have been claimed")
        assert.equal(
          balAfter.basisPoints - balBefore.basisPoints,
          accLamports.basisPoints + tokenLamports.basisPoints,
          "Expected authority to be repaid the original rent and token account rent"
        )
      })
    })

    describe("The same token twice", async () => {
      let tokenMint: PublicKey
      let asset1 = umi.eddsa.generateKeypair()
      let asset2 = umi.eddsa.generateKeypair()

      before(async () => {
        tokenMint = await createToken(umi, tokenAmount(100, "token", 9).basisPoints, 9, undefined, user.publicKey)
      })

      it("can fund once", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .transferIn(
            { token: {} },
            new BN(tokenAmount(10, "token", 9).basisPoints.toString()),
            null,
            null,
            {
              none: {},
            },
            null
          )
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset1.publicKey,
            tokenMint,
            tokenAccount: getTokenAccount(tokenMint, user.publicKey),
            destinationToken: getTokenAccount(tokenMint, crow),
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            escrowNftMetadata: null,
            escrowNftEdition: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset1)])
          .rpc()

        const balAfter = await umi.rpc.getBalance(user.publicKey)
        const accRent = await umi.rpc.getBalance(asset1.publicKey)
        const tokenAccRent = await umi.rpc.getBalance(getTokenAccount(tokenMint, crow))

        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          TX_FEE * 2n + accRent.basisPoints + tokenAccRent.basisPoints + DISTRIBUTE_FEE,
          "Expected creator to pay 2x tx fee, asset acc rent, token acc rent, and distribute fee"
        )
      })

      it("can fund again, with fees waived", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .transferIn(
            { token: {} },
            new BN(tokenAmount(15, "token", 9).basisPoints.toString()),
            null,
            null,
            {
              none: {},
            },
            null
          )
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            asset: asset2.publicKey,
            tokenMint,
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            tokenAccount: getTokenAccount(tokenMint, user.publicKey),
            destinationToken: getTokenAccount(tokenMint, crow),
            nftMetadata: nft.metadata.publicKey,
            nftMint: nft.mint.publicKey,
            escrowNftEdition: null,
            escrowNftMetadata: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset2), toWeb3JsKeypair(FEE_WAIVER)])
          .rpc()
        const balAfter = await umi.rpc.getBalance(user.publicKey)
        const accRent = await umi.rpc.getBalance(asset2.publicKey)

        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          TX_FEE * 3n + accRent.basisPoints,
          "Expected to have paid 3x tx fee, and for acc rent"
        )
      })

      it("can claim from the first", async () => {
        const tokenBalBefore = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const creatorBalBefore = await umi.rpc.getBalance(user.publicKey)
        const accBal = await umi.rpc.getBalance(asset1.publicKey)
        const userBalBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset1.publicKey,
            tokenMint,
            delegate: null,
            staker: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: getTokenAccount(tokenMint, crow),
            destinationToken: getTokenAccount(tokenMint, user2.publicKey),
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .rpc()
        const userBalAfter = await umi.rpc.getBalance(user2.publicKey)
        const tokenBalAfter = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const creatorBalAfter = await umi.rpc.getBalance(user.publicKey)
        const tokenLamports = await umi.rpc.getBalance(getTokenAccount(tokenMint, user2.publicKey))

        assert.equal(
          tokenBalAfter - tokenBalBefore,
          tokenAmount(10, "token", 9).basisPoints,
          "Expected to have claimed 10 tokens"
        )

        assert.equal(
          creatorBalAfter.basisPoints - creatorBalBefore.basisPoints,
          accBal.basisPoints,
          "Expected only the balance of the asset account to be sent to the creator"
        )

        assert.equal(
          userBalBefore.basisPoints - userBalAfter.basisPoints,
          TX_FEE + CLAIM_FEE + tokenLamports.basisPoints,
          "Expected claimer to pay tx fee, claim fee and acc opening rent"
        )
      })

      it("can claim from the second, closing the token account", async () => {
        const tokenBalBefore = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const creatorBalBefore = await umi.rpc.getBalance(user.publicKey)
        const accLamports = await umi.rpc.getBalance(asset2.publicKey)
        const tokenLamports = await umi.rpc.getBalance(getTokenAccount(tokenMint, crow))
        const feesWalletBefore = await umi.rpc.getBalance(FEES_WALLET)
        const claimerBalBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset2.publicKey,
            tokenMint,
            delegate: null,
            staker: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: getTokenAccount(tokenMint, crow),
            destinationToken: getTokenAccount(tokenMint, user2.publicKey),
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .rpc()
        const feesWalletAfter = await umi.rpc.getBalance(FEES_WALLET)
        const claimerBalAfter = await umi.rpc.getBalance(user2.publicKey)
        const tokenBalAfter = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const creatorBalAfter = await umi.rpc.getBalance(user.publicKey)

        assert.equal(
          tokenBalAfter - tokenBalBefore,
          tokenAmount(15, "token", 9).basisPoints,
          "Expected to have claimed 10 tokens"
        )

        assert.equal(
          creatorBalAfter.basisPoints - creatorBalBefore.basisPoints,
          accLamports.basisPoints + tokenLamports.basisPoints,
          "Expected the balance of the asset account and token account to be sent to the creator"
        )

        assert.equal(
          claimerBalBefore.basisPoints - claimerBalAfter.basisPoints,
          TX_FEE,
          "Expected claimer to pay for tx fee, no claim fee, token account already exists"
        )
      })
    })

    describe("Linear vesting", () => {
      it("Cannot be used with NFT", async () => {
        const asset = umi.eddsa.generateKeypair()
        const escrowNft = await createNft(umi, false, undefined, user.publicKey)
        await expectFail(
          () =>
            userProgram.methods
              .transferIn({ nft: {} }, null, null, new BN(Date.now() / 1000 + 20), { linear: {} }, null)
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: escrowNft.publicKey,
                tokenAccount: getTokenAccount(escrowNft.publicKey, user.publicKey),
                destinationToken: getTokenAccount(escrowNft.publicKey, crow),
                escrowNftMetadata: escrowNft.metadata.publicKey,
                escrowNftEdition: escrowNft.edition.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftMint: nft.publicKey,
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
              })
              .signers([toWeb3JsKeypair(asset)])
              .rpc(),
          (err) => assertErrorCode(err, "InvalidVesting")
        )
      })

      describe("Token", () => {
        let tokenMint: PublicKey
        const asset = umi.eddsa.generateKeypair()
        let claimed = 0n

        before(async () => {
          tokenMint = await createToken(umi, tokenAmount(100, "token", 9).basisPoints, 9, undefined, user.publicKey)
        })

        it("Can set up a linear vesting token asset for 5 seconds", async () => {
          await userProgram.methods
            .transferIn(
              { token: {} },
              new BN(tokenAmount(100, null, 6).basisPoints.toString()),
              null,
              new BN(Date.now() / 1000 + 5),
              { linear: {} },
              null
            )
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint,
              tokenAccount: getTokenAccount(tokenMint, user.publicKey),
              destinationToken: getTokenAccount(tokenMint, crow),
              escrowNftMetadata: null,
              escrowNftEdition: null,
              nftMetadata: nft.metadata.publicKey,
              nftMint: nft.publicKey,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
            })
            .signers([toWeb3JsKeypair(asset)])
            .rpc()

          const acc = await userProgram.account.asset.fetch(asset.publicKey)
          assert.ok(acc.active, "Expected account to be active")
        })

        it("Can claim", async () => {
          await sleep(1000)
          const balBefore = await getTokenAmount(tokenMint, user2.publicKey)
          await user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint,
              delegate: null,
              staker: null,
              nftMint: nft.publicKey,
              nftMetadata: nft.metadata.publicKey,
              nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
              nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: getTokenAccount(tokenMint, crow),
              destinationToken: getTokenAccount(tokenMint, user2.publicKey),
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc()

          const balAfter = await getTokenAmount(tokenMint, user2.publicKey)
          const assetAcc = await userProgram.account.asset.fetch(asset.publicKey)

          claimed += balAfter - balBefore

          assert.ok(balAfter > balBefore, "Expected balance to have increased")
          assert.equal(
            balAfter - balBefore,
            BigInt(assetAcc.claimed.toString()),
            "Expected claimed amount to be updated"
          )
        })

        it("Can claim again", async () => {
          await sleep(2000)
          const balBefore = await getTokenAmount(tokenMint, user2.publicKey)

          await user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint,
              delegate: null,
              staker: null,
              nftMint: nft.publicKey,
              nftMetadata: nft.metadata.publicKey,
              nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
              nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: getTokenAccount(tokenMint, crow),
              destinationToken: getTokenAccount(tokenMint, user2.publicKey),
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc()

          const balAfter = await getTokenAmount(tokenMint, user2.publicKey)
          const assetAcc = await userProgram.account.asset.fetch(asset.publicKey)

          claimed += balAfter - balBefore

          assert.ok(balAfter > balBefore, "Expected balance to have increased")
          assert.equal(claimed, BigInt(assetAcc.claimed.toString()), "Expected claimed amount to be updated")
        })

        it("Can claim again, closing asset", async () => {
          await sleep(3000)
          const balBefore = await getTokenAmount(tokenMint, user2.publicKey)
          await user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint,
              delegate: null,
              staker: null,
              nftMint: nft.publicKey,
              nftMetadata: nft.metadata.publicKey,
              nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
              nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: getTokenAccount(tokenMint, crow),
              destinationToken: getTokenAccount(tokenMint, user2.publicKey),
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc()

          const balAfter = await getTokenAmount(tokenMint, user2.publicKey)
          const exists = await umi.rpc.accountExists(asset.publicKey)

          assert.ok(!exists, "Expected account to no longer exist")

          assert.ok(balAfter > balBefore, "Expected balance to have increased")
        })
      })
    })

    describe("Interval vesting", () => {
      it("Cannot be used with NFT", async () => {
        const asset = umi.eddsa.generateKeypair()
        const escrowNft = await createNft(umi, false, undefined, user.publicKey)
        await expectFail(
          () =>
            userProgram.methods
              .transferIn({ nft: {} }, null, null, new BN(Date.now() / 1000 + 20), { linear: {} }, null)
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: escrowNft.publicKey,
                tokenAccount: getTokenAccount(escrowNft.publicKey, user.publicKey),
                destinationToken: getTokenAccount(escrowNft.publicKey, crow),
                escrowNftMetadata: escrowNft.metadata.publicKey,
                escrowNftEdition: escrowNft.edition.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftMint: nft.publicKey,
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
              })
              .signers([toWeb3JsKeypair(asset)])
              .rpc(),
          (err) => assertErrorCode(err, "InvalidVesting")
        )
      })

      describe("SOL", () => {
        const asset = umi.eddsa.generateKeypair()
        let claimed = 0n

        it("cannot set up with 1 interval", async () => {
          await expectFail(
            () =>
              userProgram.methods
                .transferIn(
                  { sol: {} },
                  new BN(sol(10).basisPoints.toString()),
                  null,
                  new BN(Date.now() / 1000 + 10),
                  {
                    intervals: {
                      numIntervals: 1,
                    },
                  },
                  null
                )
                .accounts({
                  crow,
                  programConfig: findProgramConfigPda(),
                  feesWallet: FEES_WALLET,
                  feeWaiver: null,
                  asset: asset.publicKey,
                  tokenMint: null,
                  tokenAccount: null,
                  destinationToken: null,
                  escrowNftMetadata: null,
                  escrowNftEdition: null,
                  nftMetadata: nft.metadata.publicKey,
                  nftMint: nft.publicKey,
                  ownerTokenRecord: null,
                  destinationTokenRecord: null,
                  metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                  sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                  authRules: null,
                  authRulesProgram: null,
                })
                .signers([toWeb3JsKeypair(asset)])
                .rpc(),
            (err) => assertErrorCode(err, "NotEnoughIntervals")
          )
        })

        it("Can set up a interval vesting token asset for 2 intervals over 6 seconds", async () => {
          await userProgram.methods
            .transferIn(
              { sol: {} },
              new BN(sol(10).basisPoints.toString()),
              null,
              new BN(Date.now() / 1000 + 6),
              {
                intervals: {
                  numIntervals: 2,
                },
              },
              null
            )
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              tokenAccount: null,
              destinationToken: null,
              escrowNftMetadata: null,
              escrowNftEdition: null,
              nftMetadata: nft.metadata.publicKey,
              nftMint: nft.publicKey,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
            })
            .signers([toWeb3JsKeypair(asset)])
            .rpc()
        })

        it("Cannot claim ", async () => {
          await expectFail(
            () =>
              user2Program.methods
                .transferOut(null, null)
                .accounts({
                  crow,
                  programConfig: findProgramConfigPda(),
                  feesWallet: FEES_WALLET,
                  feeWaiver: null,
                  asset: asset.publicKey,
                  tokenMint: null,
                  delegate: null,
                  staker: null,
                  nftMint: nft.publicKey,
                  nftMetadata: nft.metadata.publicKey,
                  nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
                  nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
                  escrowNftEdition: null,
                  escrowNftMetadata: null,
                  tokenAccount: null,
                  destinationToken: null,
                  ownerTokenRecord: null,
                  destinationTokenRecord: null,
                  metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                  sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                  authRules: null,
                  authRulesProgram: null,
                  authority: user.publicKey,
                  recipient: user2.publicKey,
                })
                .rpc(),
            (err) => assertErrorCode(err, "NothingToClaim")
          )
        })

        it("Can wait 4 seconds and claim half", async () => {
          await sleep(4000)
          const balBefore = await umi.rpc.getBalance(user2.publicKey)
          await user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              delegate: null,
              staker: null,
              nftMint: nft.publicKey,
              nftMetadata: nft.metadata.publicKey,
              nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
              nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: null,
              destinationToken: null,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc()

          const balAfter = await umi.rpc.getBalance(user2.publicKey)
          assert.equal(
            balAfter.basisPoints - balBefore.basisPoints,
            sol(5).basisPoints - TX_FEE - CLAIM_FEE,
            "Expected to have claimed half the available amount"
          )
        })

        it("Cannot claim again after 1s", async () => {
          await sleep(1000)
          await expectFail(
            () =>
              user2Program.methods
                .transferOut(null, null)
                .accounts({
                  crow,
                  programConfig: findProgramConfigPda(),
                  feesWallet: FEES_WALLET,
                  feeWaiver: null,
                  asset: asset.publicKey,
                  tokenMint: null,
                  delegate: null,
                  staker: null,
                  nftMint: nft.publicKey,
                  nftMetadata: nft.metadata.publicKey,
                  nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
                  nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
                  escrowNftEdition: null,
                  escrowNftMetadata: null,
                  tokenAccount: null,
                  destinationToken: null,
                  ownerTokenRecord: null,
                  destinationTokenRecord: null,
                  metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                  sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                  authRules: null,
                  authRulesProgram: null,
                  authority: user.publicKey,
                  recipient: user2.publicKey,
                })
                .rpc(),
            (err) => assertErrorCode(err, "NothingToClaim")
          )
        })

        it("Can wait and claim the remainder", async () => {
          await sleep(3000)
          const balBefore = await umi.rpc.getBalance(user2.publicKey)
          await user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              delegate: null,
              staker: null,
              nftMint: nft.publicKey,
              nftMetadata: nft.metadata.publicKey,
              nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
              nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: null,
              destinationToken: null,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc()

          const balAfter = await umi.rpc.getBalance(user2.publicKey)
          const exists = await umi.rpc.accountExists(asset.publicKey)

          assert.ok(!exists, "Expected account to be closed")

          assert.equal(
            balAfter.basisPoints - balBefore.basisPoints,
            sol(5).basisPoints - TX_FEE - CLAIM_FEE,
            "Expected to have claimed half the available amount"
          )
        })
      })
    })
  })

  describe("FEES", () => {
    describe("Fee free for dandies", () => {
      let dandy: DigitalAsset
      let pnft: DigitalAsset
      let crow: PublicKey
      const asset = umi.eddsa.generateKeypair()

      before(async () => {
        dandy = await createNft(umi, true, dandiesCollection.publicKey, user2.publicKey)
        pnft = await createNft(umi, true, undefined, user2.publicKey)
        crow = findCrowPda(dandy.publicKey)
      })

      it("doesn't cost anything to transfer into a dandy", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .transferIn({ sol: {} }, new BN(sol(1).basisPoints.toString()), null, null, { none: {} }, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
            nftMint: dandy.publicKey,
            nftMetadata: dandy.metadata.publicKey,
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset)])
          .rpc()

        const crowBal = await umi.rpc.getBalance(crow)

        const balAfter = await umi.rpc.getBalance(user.publicKey)
        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          sol(1).basisPoints + TX_FEE * 2n + crowBal.basisPoints
        )
      })

      it("doesn't cost anything to claim from a dandy", async () => {
        const balBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
            delegate: null,
            staker: null,
            nftMint: dandy.publicKey,
            nftMetadata: dandy.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(dandy.publicKey, user2.publicKey),
            nftToken: getTokenAccount(dandy.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .rpc()

        const balAfter = await umi.rpc.getBalance(user2.publicKey)
        assert.equal(balAfter.basisPoints - balBefore.basisPoints, sol(1).basisPoints - TX_FEE)
      })
    })

    describe("Full fee waiver also free to claim", () => {
      let nft: DigitalAsset
      let crow: PublicKey
      const asset = umi.eddsa.generateKeypair()

      before(async () => {
        nft = await createNft(umi, true, undefined, user2.publicKey)
        crow = findCrowPda(nft.publicKey)
      })

      it("doesn't cost anything with fee waiver", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .transferIn({ sol: {} }, new BN(sol(1).basisPoints.toString()), null, null, { none: {} }, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            asset: asset.publicKey,
            tokenMint: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset), toWeb3JsKeypair(FEE_WAIVER)])
          .rpc()

        const crowBal = await umi.rpc.getBalance(crow)

        const balAfter = await umi.rpc.getBalance(user.publicKey)
        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          sol(1).basisPoints + TX_FEE * 3n + crowBal.basisPoints
        )
      })

      it("doesn't cost anything to claim", async () => {
        const balBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
            delegate: null,
            staker: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .rpc()

        const balAfter = await umi.rpc.getBalance(user2.publicKey)
        assert.equal(balAfter.basisPoints - balBefore.basisPoints, sol(1).basisPoints - TX_FEE)
      })
    })

    // describe("Staked pNFT", () => {
    //   let nft: DigitalAsset
    //   let crow: PublicKey
    //   const asset = generateSigner(umi)

    //   before(async () => {
    //     nft = await createNft(umi, true, undefined, user2.publicKey)
    //     const delegate = generateSigner(umi)
    //     await transactionBuilder()
    //       .add(
    //         createAccount(umi, {
    //           newAccount: delegate,
    //           lamports: sol(0.1),
    //           space: 0,
    //           programId: STAKE_PROGRAM,
    //         })
    //       )
    //       .add(
    //         delegateUtilityV1(umi, {
    //           mint: nft.publicKey,
    //           delegate: delegate.publicKey,
    //           tokenStandard: TokenStandard.ProgrammableNonFungible,
    //           authority: user2,
    //           token: getTokenAccount(nft.publicKey, user2.publicKey),
    //           authorizationRules: unwrapOptionRecursively(nft.metadata.programmableConfig).ruleSet,
    //         })
    //       )
    //       .add(
    //         lockV1(umi, {
    //           mint: nft.publicKey,
    //           authority: delegate,
    //           tokenStandard: TokenStandard.ProgrammableNonFungible,
    //           token: getTokenAccount(nft.publicKey, user2.publicKey),
    //         })
    //       )
    //       .sendAndConfirm(umi)
    //     crow = findCrowPda(nft.publicKey)
    //   })

    //   it("can transfer in", async () => {
    //     await userProgram.methods
    //       .transferIn(
    //         { sol: {} },
    //         new BN(sol(1).basisPoints.toString()),
    //         null,
    //         null,
    //         { none: {} },
    //         new BN(sol(0.001).basisPoints.toString())
    //       )
    //       .accounts({
    //         crow,
    //         programConfig: findProgramConfigPda(),
    //         feesWallet: FEES_WALLET,
    //         feeWaiver: FEE_WAIVER.publicKey,
    //         asset: asset.publicKey,
    //         tokenMint: null,
    //         nftMint: nft.publicKey,
    //         nftMetadata: nft.metadata.publicKey,
    //         escrowNftEdition: null,
    //         escrowNftMetadata: null,
    //         tokenAccount: null,
    //         destinationToken: null,
    //         ownerTokenRecord: null,
    //         destinationTokenRecord: null,
    //         metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    //         sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //         authRules: null,
    //         authRulesProgram: null,
    //       })
    //       .signers([toWeb3JsKeypair(asset), toWeb3JsKeypair(FEE_WAIVER)])
    //       .rpc()
    //   })

    //   it("cannot transfer out without providing delegate", async () => {
    //     await expectFail(
    //       () =>
    //         user2Program.methods
    //           .transferOut(null, null)
    //           .accounts({
    //             crow,
    //             programConfig: findProgramConfigPda(),
    //             feesWallet: FEES_WALLET,
    //             feeWaiver: null,
    //             asset: asset.publicKey,
    //             tokenMint: null,
    //             delegate: null,
    //             staker: null,
    //             nftMint: nft.publicKey,
    //             nftMetadata: nft.metadata.publicKey,
    //             nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
    //             nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
    //             escrowNftEdition: null,
    //             escrowNftMetadata: null,
    //             tokenAccount: null,
    //             destinationToken: null,
    //             ownerTokenRecord: null,
    //             destinationTokenRecord: null,
    //             metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    //             sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //             authRules: null,
    //             authRulesProgram: null,
    //             authority: user.publicKey,
    //             recipient: user2.publicKey,
    //           })
    //           .rpc(),
    //       (err) => assertErrorCode(err, "TokenIsLocked")
    //     )
    //   })

    //   it("can transfer out if delegate is expected owner", async () => {
    //     const daWithToken = await fetchDigitalAssetWithToken(
    //       umi,
    //       nft.publicKey,
    //       getTokenAccount(nft.publicKey, user2.publicKey)
    //     )
    //     await user2Program.methods
    //       .transferOut(null, null)
    //       .accounts({
    //         crow,
    //         programConfig: findProgramConfigPda(),
    //         feesWallet: FEES_WALLET,
    //         feeWaiver: null,
    //         asset: asset.publicKey,
    //         tokenMint: null,
    //         delegate: unwrapOptionRecursively(daWithToken.tokenRecord.delegate),
    //         nftMint: nft.publicKey,
    //         nftMetadata: nft.metadata.publicKey,
    //         nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
    //         nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
    //         escrowNftEdition: null,
    //         escrowNftMetadata: null,
    //         tokenAccount: null,
    //         destinationToken: null,
    //         ownerTokenRecord: null,
    //         destinationTokenRecord: null,
    //         metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    //         sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //         authRules: null,
    //         authRulesProgram: null,
    //         authority: user.publicKey,
    //         recipient: user2.publicKey,
    //       })
    //       .rpc()
    //   })
    // })

    // describe("Staked NFT", () => {
    //   let nft: DigitalAsset
    //   let crow: PublicKey
    //   const asset = generateSigner(umi)

    //   before(async () => {
    //     nft = await createNft(umi, false, undefined, user2.publicKey)
    //     const staker = generateSigner(umi).publicKey
    //     const delegate = umi.eddsa.findPda(publicKey("STAKEQkGBjkhCXabzB5cUbWgSSvbVJFEm2oEnyWzdKE"), [
    //       string({ size: "variable" }).serialize("STAKE"),
    //       publicKeySerializer().serialize(staker),
    //       string({ size: "variable" }).serialize("nft-authority"),
    //     ])[0]

    //     await transactionBuilder()
    //       .add(
    //         delegateStandardV1(umi, {
    //           mint: nft.publicKey,
    //           delegate,
    //           tokenStandard: TokenStandard.NonFungible,
    //           authority: user2,
    //           token: getTokenAccount(nft.publicKey, user2.publicKey),
    //           tokenOwner: user2.publicKey,
    //         })
    //       )
    //       .add(
    //         freezeDelegatedAccount(umi, {
    //           mint: nft.publicKey,
    //           delegate,
    //           tokenAccount: getTokenAccount(nft.publicKey, user2.publicKey),
    //         })
    //       )
    //       .sendAndConfirm(umi)

    //     crow = findCrowPda(nft.publicKey)
    //   })

    //   it("can transfer in", async () => {
    //     await userProgram.methods
    //       .transferIn(
    //         { sol: {} },
    //         new BN(sol(1).basisPoints.toString()),
    //         null,
    //         null,
    //         { none: {} },
    //         new BN(sol(0.001).basisPoints.toString())
    //       )
    //       .accounts({
    //         crow,
    //         programConfig: findProgramConfigPda(),
    //         feesWallet: FEES_WALLET,
    //         feeWaiver: FEE_WAIVER.publicKey,
    //         asset: asset.publicKey,
    //         tokenMint: null,
    //         nftMint: nft.publicKey,
    //         nftMetadata: nft.metadata.publicKey,
    //         escrowNftEdition: null,
    //         escrowNftMetadata: null,
    //         tokenAccount: null,
    //         destinationToken: null,
    //         ownerTokenRecord: null,
    //         destinationTokenRecord: null,
    //         metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    //         sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //         authRules: null,
    //         authRulesProgram: null,
    //       })
    //       .signers([toWeb3JsKeypair(asset), toWeb3JsKeypair(FEE_WAIVER)])
    //       .rpc()
    //   })

    //   it("cannot transfer out without providing delegate", async () => {
    //     await expectFail(
    //       () =>
    //         user2Program.methods
    //           .transferOut(null, null)
    //           .accounts({
    //             crow,
    //             programConfig: findProgramConfigPda(),
    //             feesWallet: FEES_WALLET,
    //             feeWaiver: null,
    //             asset: asset.publicKey,
    //             tokenMint: null,
    //             delegate: null,
    //             staker: null,
    //             nftMint: nft.publicKey,
    //             nftMetadata: nft.metadata.publicKey,
    //             nftTokenRecord: null,
    //             nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
    //             escrowNftEdition: null,
    //             escrowNftMetadata: null,
    //             tokenAccount: null,
    //             destinationToken: null,
    //             ownerTokenRecord: null,
    //             destinationTokenRecord: null,
    //             metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    //             sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //             authRules: null,
    //             authRulesProgram: null,
    //             authority: user.publicKey,
    //             recipient: user2.publicKey,
    //           })
    //           .rpc(),
    //       (err) => assertErrorCode(err, "TokenIsLocked")
    //     )
    //   })

    //   it("can transfer out if delegate is expected owner", async () => {
    //     const daWithToken = await fetchDigitalAssetWithToken(
    //       umi,
    //       nft.publicKey,
    //       getTokenAccount(nft.publicKey, user2.publicKey)
    //     )
    //     await user2Program.methods
    //       .transferOut(null, null)
    //       .accounts({
    //         crow,
    //         programConfig: findProgramConfigPda(),
    //         feesWallet: FEES_WALLET,
    //         feeWaiver: null,
    //         asset: asset.publicKey,
    //         tokenMint: null,
    //         delegate: unwrapOptionRecursively(daWithToken.token.delegate),
    //         staker: null,
    //         nftMint: nft.publicKey,
    //         nftMetadata: nft.metadata.publicKey,
    //         nftTokenRecord: null,
    //         nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
    //         escrowNftEdition: null,
    //         escrowNftMetadata: null,
    //         tokenAccount: null,
    //         destinationToken: null,
    //         ownerTokenRecord: null,
    //         destinationTokenRecord: null,
    //         metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    //         sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
    //         authRules: null,
    //         authRulesProgram: null,
    //         authority: user.publicKey,
    //         recipient: user2.publicKey,
    //       })
    //       .rpc()
    //   })
    // })

    describe("Custom fee waiver", () => {
      let nft: DigitalAsset
      let crow: PublicKey
      const asset = umi.eddsa.generateKeypair()

      before(async () => {
        nft = await createNft(umi, true, undefined, user2.publicKey)
        crow = findCrowPda(nft.publicKey)
      })

      it("doesn't cost anything with fee waiver", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .transferIn(
            { sol: {} },
            new BN(sol(1).basisPoints.toString()),
            null,
            null,
            { none: {} },
            new BN(sol(0.001).basisPoints.toString())
          )
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            asset: asset.publicKey,
            tokenMint: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
          })
          .signers([toWeb3JsKeypair(asset), toWeb3JsKeypair(FEE_WAIVER)])
          .rpc()

        const crowBal = await umi.rpc.getBalance(crow)

        const balAfter = await umi.rpc.getBalance(user.publicKey)
        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          sol(1).basisPoints + TX_FEE * 3n + crowBal.basisPoints + sol(0.001).basisPoints
        )
      })

      it("Cannot claim with a bespoke fee without fee waiver", async () => {
        await expectFail(
          () =>
            user2Program.methods
              .transferOut(null, new BN(sol(0.0001).basisPoints.toString()))
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: null,
                delegate: null,
                staker: null,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
                nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
                escrowNftEdition: null,
                escrowNftMetadata: null,
                tokenAccount: null,
                destinationToken: null,
                ownerTokenRecord: null,
                destinationTokenRecord: null,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                authRules: null,
                authRulesProgram: null,
                authority: user.publicKey,
                recipient: user2.publicKey,
              })
              .rpc(),
          (err) => assertErrorCode(err, "FeeWaiverNotProvided")
        )
      })

      it("Can claim with a bespoke fee", async () => {
        const balBefore = await umi.rpc.getBalance(user2.publicKey)
        await user2Program.methods
          .transferOut(null, new BN(sol(0.0001).basisPoints.toString()))
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            asset: asset.publicKey,
            tokenMint: null,
            delegate: null,
            staker: null,
            nftMint: nft.publicKey,
            nftMetadata: nft.metadata.publicKey,
            nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
            nftToken: getTokenAccount(nft.publicKey, user2.publicKey),
            escrowNftEdition: null,
            escrowNftMetadata: null,
            tokenAccount: null,
            destinationToken: null,
            ownerTokenRecord: null,
            destinationTokenRecord: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
            authRules: null,
            authRulesProgram: null,
            authority: user.publicKey,
            recipient: user2.publicKey,
          })
          .signers([toWeb3JsKeypair(FEE_WAIVER)])
          .rpc()

        const balAfter = await umi.rpc.getBalance(user2.publicKey)
        assert.equal(
          balAfter.basisPoints - balBefore.basisPoints,
          sol(1).basisPoints - TX_FEE * 2n - sol(0.0001).basisPoints
        )
      })
    })
  })

  describe("Nifty", () => {
    const niftyAsset = generateSigner(umi)
    const asset = generateSigner(umi)
    const crow = findCrowPda(niftyAsset.publicKey)
    it("can create a nifty crow", async () => {
      await create(umi, {
        asset: niftyAsset,
        name: "nifty",
        owner: user2.publicKey,
        authority: umi.identity,
        payer: umi.identity,
      }).sendAndConfirm(umi)

      await userProgram.methods
        .transferIn({ sol: {} }, new BN(sol(1).basisPoints.toString()), null, null, { none: {} }, null)
        .accounts({
          crow,
          programConfig: findProgramConfigPda(),
          feesWallet: FEES_WALLET,
          feeWaiver: null,
          asset: asset.publicKey,
          tokenMint: null,
          nftMint: niftyAsset.publicKey,
          nftMetadata: null,
          escrowNftEdition: null,
          escrowNftMetadata: null,
          tokenAccount: null,
          destinationToken: null,
          ownerTokenRecord: null,
          destinationTokenRecord: null,
          metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
          authRules: null,
          authRulesProgram: null,
        })
        .signers([toWeb3JsKeypair(asset)])
        .rpc()
    })

    it("cannot claim as non-owner", async () => {
      await expectFail(
        () =>
          userProgram.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              delegate: null,
              staker: null,
              nftMint: niftyAsset.publicKey,
              nftMetadata: null,
              nftTokenRecord: null,
              nftToken: null,
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: null,
              destinationToken: null,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user.publicKey,
            })
            .rpc(),
        (err) => assertErrorCode(err, "Unauthorized")
      )
    })

    it("cannot claim if asset is locked", async () => {
      await approve(umi, {
        asset: niftyAsset.publicKey,
        owner: user2,
        delegate: umi.identity.publicKey,
        delegateInput: delegateInput("Some", { roles: [DelegateRole.Lock] }),
      })
        .add(
          lock(umi, {
            asset: niftyAsset.publicKey,
          })
        )
        .sendAndConfirm(umi)

      await expectFail(
        () =>
          user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              owner: user2.publicKey,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              delegate: null,
              staker: null,
              nftMint: niftyAsset.publicKey,
              nftMetadata: null,
              nftTokenRecord: null,
              nftToken: null,
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: null,
              destinationToken: null,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc(),
        (err) => assertErrorCode(err, "TokenIsLocked")
      )
    })

    it("can claim if asset is unlocked", async () => {
      await unlock(umi, {
        asset: niftyAsset.publicKey,
      })
        .add(
          revoke(umi, {
            asset: niftyAsset.publicKey,
            delegateInput: delegateInput("Some", {
              roles: [DelegateRole.Lock],
            }),
            signer: user2,
          })
        )
        .sendAndConfirm(umi)

      await user2Program.methods
        .transferOut(null, null)
        .accounts({
          crow,
          owner: user2.publicKey,
          programConfig: findProgramConfigPda(),
          feesWallet: FEES_WALLET,
          feeWaiver: null,
          asset: asset.publicKey,
          tokenMint: null,
          delegate: null,
          staker: null,
          nftMint: niftyAsset.publicKey,
          nftMetadata: null,
          nftTokenRecord: null,
          nftToken: null,
          escrowNftEdition: null,
          escrowNftMetadata: null,
          tokenAccount: null,
          destinationToken: null,
          ownerTokenRecord: null,
          destinationTokenRecord: null,
          metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
          authRules: null,
          authRulesProgram: null,
          authority: user.publicKey,
          recipient: user2.publicKey,
        })
        .rpc()
    })
  })

  describe("Core", () => {
    const coreAsset = generateSigner(umi)
    const asset = generateSigner(umi)
    const crow = findCrowPda(coreAsset.publicKey)
    it("can create a core crow", async () => {
      await createV1(umi, {
        asset: coreAsset,
        name: "core",
        uri: "",
        owner: user2.publicKey,
      }).sendAndConfirm(umi)

      await userProgram.methods
        .transferIn({ sol: {} }, new BN(sol(1).basisPoints.toString()), null, null, { none: {} }, null)
        .accounts({
          crow,
          programConfig: findProgramConfigPda(),
          feesWallet: FEES_WALLET,
          feeWaiver: null,
          asset: asset.publicKey,
          tokenMint: null,
          nftMint: coreAsset.publicKey,
          nftMetadata: null,
          escrowNftEdition: null,
          escrowNftMetadata: null,
          tokenAccount: null,
          destinationToken: null,
          ownerTokenRecord: null,
          destinationTokenRecord: null,
          metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
          authRules: null,
          authRulesProgram: null,
        })
        .signers([toWeb3JsKeypair(asset)])
        .rpc()
    })

    it("cannot claim as non-owner", async () => {
      await expectFail(
        () =>
          userProgram.methods
            .transferOut(null, null)
            .accounts({
              crow,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              delegate: null,
              staker: null,
              nftMint: coreAsset.publicKey,
              nftMetadata: null,
              nftTokenRecord: null,
              nftToken: null,
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: null,
              destinationToken: null,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user.publicKey,
            })
            .rpc(),
        (err) => assertErrorCode(err, "Unauthorized")
      )
    })

    it("cannot claim if asset is locked", async () => {
      await addPluginV1(umi, {
        asset: coreAsset.publicKey,
        plugin: createPlugin({ type: "FreezeDelegate", data: { frozen: true } }),
        initAuthority: pluginAuthority("Address", { address: umi.identity.publicKey }),
        authority: user2,
      }).sendAndConfirm(umi)

      await expectFail(
        () =>
          user2Program.methods
            .transferOut(null, null)
            .accounts({
              crow,
              owner: user2.publicKey,
              programConfig: findProgramConfigPda(),
              feesWallet: FEES_WALLET,
              feeWaiver: null,
              asset: asset.publicKey,
              tokenMint: null,
              delegate: null,
              staker: null,
              nftMint: coreAsset.publicKey,
              nftMetadata: null,
              nftTokenRecord: null,
              nftToken: null,
              escrowNftEdition: null,
              escrowNftMetadata: null,
              tokenAccount: null,
              destinationToken: null,
              ownerTokenRecord: null,
              destinationTokenRecord: null,
              metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
              sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              authRules: null,
              authRulesProgram: null,
              authority: user.publicKey,
              recipient: user2.publicKey,
            })
            .rpc(),
        (err) => assertErrorCode(err, "TokenIsLocked")
      )
    })

    it("can claim if asset is unlocked", async () => {
      const coreAssetAcc = await fetchAssetV1(umi, coreAsset.publicKey)
      await thawAsset(umi, {
        asset: coreAssetAcc,
        delegate: umi.identity,
      }).sendAndConfirm(umi)

      await user2Program.methods
        .transferOut(null, null)
        .accounts({
          crow,
          owner: user2.publicKey,
          programConfig: findProgramConfigPda(),
          feesWallet: FEES_WALLET,
          feeWaiver: null,
          asset: asset.publicKey,
          tokenMint: null,
          delegate: null,
          staker: null,
          nftMint: coreAsset.publicKey,
          nftMetadata: null,
          nftTokenRecord: null,
          nftToken: null,
          escrowNftEdition: null,
          escrowNftMetadata: null,
          tokenAccount: null,
          destinationToken: null,
          ownerTokenRecord: null,
          destinationTokenRecord: null,
          metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          sysvarInstructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
          authRules: null,
          authRulesProgram: null,
          authority: user.publicKey,
          recipient: user2.publicKey,
        })
        .rpc()
    })
  })
})
