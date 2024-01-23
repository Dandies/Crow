import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Crow } from "../target/types/crow"
import { MPL_TOKEN_AUTH_RULES_PROGRAM_ID } from "@metaplex-foundation/mpl-token-auth-rules"
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
  sol,
  tokenAmount,
  transactionBuilder,
  unwrapOptionRecursively,
} from "@metaplex-foundation/umi"
import { adminProgram, createNewUser, programPaidBy } from "./helper"
import {
  DigitalAsset,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  TokenStandard,
  delegateUtilityV1,
  lockV1,
  revokeUtilityV1,
  transferV1,
  unlockV1,
} from "@metaplex-foundation/mpl-token-metadata"
import { createNft } from "./helpers/create-nft"
import { umi } from "./helpers/umi"
import { assert } from "chai"
import { BN } from "bn.js"
import { toWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters"
import { FEES_WALLET, assertErrorCode, expectFail, sleep } from "./helpers/utils"
import { createToken } from "./helpers/create-token"
import { createAssociatedToken, safeFetchToken } from "@metaplex-foundation/mpl-toolbox"

const TX_FEE = 5000n
const DISTRIBUTE_FEE = sol(0.001).basisPoints
const CLAIM_FEE = sol(0.001).basisPoints

describe("crow", () => {
  let user: Keypair
  let user2: Keypair
  let userProgram: Program<Crow>
  let user2Program: Program<Crow>
  let programConfig: anchor.IdlAccounts<Crow>["programConfig"]
  before(async () => {
    user = await createNewUser()
    user2 = await createNewUser()
    userProgram = programPaidBy(user)
    user2Program = programPaidBy(user2)
    await adminProgram.methods
      .initProgramConfig(new BN(CLAIM_FEE.toString()), new BN(DISTRIBUTE_FEE.toString()))
      .accounts({
        programConfig: findProgramConfigPda(),
        program: adminProgram.programId,
        programData: findProgramDataAddress(),
      })
      .rpc()

    programConfig = await adminProgram.account.programConfig.fetch(findProgramConfigPda())
  })

  describe("Happy path", () => {
    let nft: DigitalAsset
    let crow: PublicKey

    before(async () => {
      nft = await createNft(umi, true, undefined, user2.publicKey)
      crow = findCrowPda(nft.publicKey, user.publicKey)
    })

    it("Can initialize a new Crow", async () => {
      await userProgram.methods
        .init()
        .accounts({
          crow,
          nftMint: nft.publicKey,
          nftMetadata: nft.metadata.publicKey,
        })
        .rpc()

      const crowAccount = await userProgram.account.crow.fetch(crow)

      assert.equal(crowAccount.nftMint.toBase58(), nft.publicKey, "Expected NFT Mint to be set to Crow")
      assert.equal(crowAccount.authority.toBase58(), user.publicKey, "Expected authority to be set")
    })

    describe("SOL", () => {
      const asset = umi.eddsa.generateKeypair()
      it("can fund the crow with SOL", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        const tx = await userProgram.methods
          .fund({ sol: {} }, new BN(sol(1).basisPoints.toString()), null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
            nftMetadata: null,
            nftEdition: null,
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
        assert.equal(BigInt(assetAccount.amount.toString()), sol(1).basisPoints, "Expected amount to be 1 sol")
        assert.equal(
          BigInt(assetAccount.startTime.toString()),
          blockTime,
          "Expected start time to be set to block time"
        )

        assert.equal(
          balBefore.basisPoints - balAfter.basisPoints,
          sol(1).basisPoints + TX_FEE * 2n + DISTRIBUTE_FEE,
          "Expected balance to reduce by 1 sol + tx fee"
        )
      })

      it("Cannot transfer the crow as a non-holder of the NFT", async () => {
        await expectFail(
          () =>
            userProgram.methods
              .transfer()
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: null,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user2.publicKey),
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
          (err) => assertErrorCode(err, "Unauthorized")
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
              .transfer()
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: null,
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
          .transfer()
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: null,
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

      it("can fund a Crow which vests for 3 seconds", async () => {
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        await userProgram.methods
          .fund(
            { token: {} },
            new BN(tokenAmount(10, "token", 9).basisPoints.toString()),
            new BN(Date.now() / 1000 + 3)
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
            nftMetadata: null,
            nftEdition: null,
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
              .transfer()
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint,
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
          .transfer()
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            asset: asset.publicKey,
            tokenMint,
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
          .fund({ nft: {} }, null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            tokenAccount: getTokenAccount(escrowNft.publicKey, user.publicKey),
            destinationToken: getTokenAccount(escrowNft.publicKey, crow),
            nftMetadata: escrowNft.metadata.publicKey,
            nftEdition: escrowNft.edition.publicKey,
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
              .transfer()
              .accounts({
                crow,
                programConfig: findProgramConfigPda(),
                feesWallet: FEES_WALLET,
                feeWaiver: null,
                asset: asset.publicKey,
                tokenMint: escrowNft.publicKey,
                nftMint: nft.publicKey,
                nftMetadata: nft.metadata.publicKey,
                nftTokenRecord: getTokenRecordPda(nft.publicKey, user3.publicKey),
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
          (err) => assertErrorCode(err, "Unauthorized")
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
        await user3Program.methods
          .transfer()
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            nftMint: nft.publicKey,
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
        const tokenAfter =
          (await safeFetchToken(umi, getTokenAccount(escrowNft.publicKey, user3.publicKey)))?.amount || 0n

        const balAfter = await umi.rpc.getBalance(user.publicKey)

        assert.equal(tokenAfter - tokenBefore, 1n, "Expected NFT to have been claimed")
        assert.equal(
          balAfter.basisPoints - balBefore.basisPoints,
          tokenLamports.basisPoints + accLamports.basisPoints,
          "Expected authority to be repaid the original rent"
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
          .fund({ nft: {} }, null, null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset.publicKey,
            tokenMint: escrowNft.publicKey,
            tokenAccount: getTokenAccount(escrowNft.publicKey, user.publicKey),
            destinationToken: getTokenAccount(escrowNft.publicKey, crow),
            nftMetadata: escrowNft.metadata.publicKey,
            nftEdition: escrowNft.edition.publicKey,
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
          .transfer()
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
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
          tokenLamports.basisPoints + accLamports.basisPoints,
          "Expected authority to be repaid the original rent"
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
          .fund({ token: {} }, new BN(tokenAmount(10, "token", 9).basisPoints.toString()), null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset1.publicKey,
            tokenMint,
            tokenAccount: getTokenAccount(tokenMint, user.publicKey),
            destinationToken: getTokenAccount(tokenMint, crow),
            nftMetadata: null,
            nftEdition: null,
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
          .fund({ token: {} }, new BN(tokenAmount(15, "token", 9).basisPoints.toString()), null)
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            asset: asset2.publicKey,
            tokenMint,
            feesWallet: FEES_WALLET,
            feeWaiver: FEE_WAIVER.publicKey,
            tokenAccount: getTokenAccount(tokenMint, user.publicKey),
            destinationToken: getTokenAccount(tokenMint, crow),
            nftMetadata: null,
            nftEdition: null,
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
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        const acc = await umi.rpc.getAccount(asset1.publicKey)
        await user2Program.methods
          .transfer()
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset1.publicKey,
            tokenMint,
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

        const tokenBalAfter = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const balAfter = await umi.rpc.getBalance(user.publicKey)

        assert.equal(
          tokenBalAfter - tokenBalBefore,
          tokenAmount(10, "token", 9).basisPoints,
          "Expected to have claimed 10 tokens"
        )

        assert.equal(
          balAfter.basisPoints - balBefore.basisPoints,
          acc.exists && acc.lamports.basisPoints,
          "Expected only the balance of the asset account to be sent to the creator"
        )
      })

      it("can claim from the second, closing the token account", async () => {
        const tokenBalBefore = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const balBefore = await umi.rpc.getBalance(user.publicKey)
        const accLamports = await umi.rpc.getBalance(asset2.publicKey)
        const tokenLamports = await umi.rpc.getBalance(getTokenAccount(tokenMint, crow))
        await user2Program.methods
          .transfer()
          .accounts({
            crow,
            programConfig: findProgramConfigPda(),
            feesWallet: FEES_WALLET,
            feeWaiver: null,
            asset: asset2.publicKey,
            tokenMint,
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

        const tokenBalAfter = (await safeFetchToken(umi, getTokenAccount(tokenMint, user2.publicKey)))?.amount || 0n
        const balAfter = await umi.rpc.getBalance(user.publicKey)

        assert.equal(
          tokenBalAfter - tokenBalBefore,
          tokenAmount(15, "token", 9).basisPoints,
          "Expected to have claimed 10 tokens"
        )

        assert.equal(
          balAfter.basisPoints - balBefore.basisPoints,
          accLamports.basisPoints + tokenLamports.basisPoints,
          "Expected only the balance of the asset account to be sent to the creator"
        )
      })
    })
  })
})
