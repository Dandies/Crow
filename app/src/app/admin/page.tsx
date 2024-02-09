"use client"
import * as anchor from "@coral-xyz/anchor"
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { ADMIN_WALLET } from "../constants"
import { ProgramConfig } from "../types/types"
import { useAnchor } from "../context/anchor"
import { findCrowPda, findProgramConfigPda, findProgramDataAddress } from "../helpers/pdas"
import { fromWeb3JsInstruction, toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import toast from "react-hot-toast"
import { notFound } from "next/navigation"
import { Center } from "../components/Center"
import { publicKey, signAllTransactions, transactionBuilder } from "@metaplex-foundation/umi"
import { getAllDandies } from "../helpers/helius"
import { useUmi } from "../context/umi"
import { findMetadataPda } from "@metaplex-foundation/mpl-token-metadata"
import { chunk } from "lodash"

export default function Admin() {
  const [loading, setLoading] = useState(false)
  const program = useAnchor()
  const wallet = useWallet()
  const [programConfig, setProgramConfig] = useState<ProgramConfig | null>(null)
  const programConfigId = findProgramConfigPda()
  const [claimFee, setClaimFee] = useState<number>(0)
  const [distributeFee, setDistributeFee] = useState<number>(0)
  const umi = useUmi()

  useEffect(reset, [programConfig])

  async function fetchProgramConfig() {
    const programConfig = await program.account.programConfig.fetch(programConfigId)
    setProgramConfig(programConfig)
  }

  useEffect(() => {
    fetchProgramConfig()
    const id = program.provider.connection.onAccountChange(toWeb3JsPublicKey(programConfigId), fetchProgramConfig)
    return () => {
      program.provider.connection.removeAccountChangeListener(id)
    }
  }, [])

  if (wallet.publicKey?.toBase58() !== ADMIN_WALLET) {
    return notFound()
  }

  function reset() {
    if (!programConfig) {
      setClaimFee(0)
      setDistributeFee(0)
      return
    }
    setClaimFee(programConfig.claimFee.toNumber())
    setDistributeFee(programConfig.distributeFee.toNumber())
  }

  async function update() {
    try {
      setLoading(true)
      const promise = program.methods
        .updateProgramConfig(
          claimFee !== programConfig?.claimFee.toNumber() ? new anchor.BN(claimFee) : null,
          distributeFee !== programConfig?.distributeFee.toNumber() ? new anchor.BN(distributeFee) : null
        )
        .accounts({
          program: program.programId,
          programConfig: programConfigId,
          programData: findProgramDataAddress(),
        })
        .rpc()

      toast.promise(promise, {
        loading: "Updating program config",
        success: "Program config updated successfully",
        error: "Error updating program config",
      })

      await promise
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function initDandies() {
    try {
      setLoading(true)
      const promise = Promise.resolve().then(async () => {
        const crows = (await program.account.crow.all()).map((c) => c.account.nftMint.toBase58())
        let dandies = (await getAllDandies()).map((d) => d.id)

        dandies = dandies.filter((d) => {
          return !crows.includes(d)
        })

        let tx = transactionBuilder().add(
          await Promise.all(
            dandies.map(async (d) => {
              const nftMint = publicKey(d)
              const instruction = await program.methods
                .init()
                .accounts({
                  crow: findCrowPda(nftMint),
                  nftMint,
                  nftMetadata: findMetadataPda(umi, { mint: nftMint })[0],
                })
                .instruction()

              return {
                instruction: fromWeb3JsInstruction(instruction),
                signers: [umi.identity],
                bytesCreatedOnChain: 41,
              }
            })
          )
        )

        const txs = await Promise.all(tx.unsafeSplitByTransactionSize(umi))
        const chunks = chunk(txs, 100)

        await chunks.reduce((promise, txs, index) => {
          return promise.then(async () => {
            const p = Promise.resolve().then(async () => {
              const built = await Promise.all(txs.map((t) => t.buildWithLatestBlockhash(umi)))
              const signed = await umi.identity.signAllTransactions(built)
              // const blockhash = await umi.rpc.getLatestBlockhash()
              await Promise.all(
                signed.map(async (tx) => {
                  try {
                    const sig = await umi.rpc.sendTransaction(tx)
                  } catch (err) {
                    console.error(err)
                  }
                  // const conf = await umi.rpc.confirmTransaction(sig, {
                  //   strategy: {
                  //     type: "blockhash",
                  //     ...blockhash,
                  //   },
                  // })
                })
              )
            })

            toast.promise(p, {
              loading: `Sending batch ${index + 1} of ${chunks.length}`,
              success: "Done",
              error: "Error sending batch",
            })

            await p
          })
        }, Promise.resolve())
      })

      toast.promise(promise, {
        loading: "Creating Crow accounts",
        success: "Done",
        error: "Error creting crows",
      })

      await promise
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isDirty =
    programConfig?.claimFee.toNumber() !== claimFee || programConfig.distributeFee.toNumber() !== distributeFee

  return (
    <Center>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Fees
              </Typography>
              <TextField
                type="number"
                label="Distribute fee"
                value={distributeFee / anchor.web3.LAMPORTS_PER_SOL}
                onChange={(e) => setDistributeFee(Number(e.target.value) * anchor.web3.LAMPORTS_PER_SOL)}
              />
              <TextField
                type="number"
                label="Claim fee"
                value={claimFee / anchor.web3.LAMPORTS_PER_SOL}
                onChange={(e) => setClaimFee(Number(e.target.value) * anchor.web3.LAMPORTS_PER_SOL)}
              />
              <Stack direction="row">
                <Button onClick={reset} disabled={!isDirty}>
                  Cancel
                </Button>
                <Button onClick={update} disabled={!isDirty}>
                  Update
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Button onClick={initDandies} disabled={loading}>
          Init Dandies
        </Button>
      </Container>
    </Center>
  )
}
