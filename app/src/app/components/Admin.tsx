import * as anchor from "@coral-xyz/anchor"
import { Button, Card, CardContent, Container, Stack, TextField } from "@mui/material"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { ADMIN_WALLET } from "../constants"
import { ProgramConfig } from "../types/types"
import { useAnchor } from "../context/anchor"
import { findProgramConfigPda, findProgramDataAddress } from "../helpers/pdas"
import { toWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters"
import toast from "react-hot-toast"

export function Admin() {
  const [loading, setLoading] = useState(false)
  const program = useAnchor()
  const wallet = useWallet()
  const [programConfig, setProgramConfig] = useState<ProgramConfig | null>(null)
  const programConfigId = findProgramConfigPda()
  const [claimFee, setClaimFee] = useState<number>(0)
  const [distributeFee, setDistributeFee] = useState<number>(0)

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
    return null
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

  const isDirty =
    programConfig?.claimFee.toNumber() !== claimFee || programConfig.distributeFee.toNumber() !== distributeFee

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack spacing={2}>
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
    </Container>
  )
}
