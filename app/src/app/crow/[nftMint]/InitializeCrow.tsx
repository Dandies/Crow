"use client"

import { useAnchor } from "@/app/context/anchor"
import { useUmi } from "@/app/context/umi"
import { findCrowPda } from "@/app/helpers/pdas"
import { findMetadataPda } from "@metaplex-foundation/mpl-token-metadata"
import { PublicKey } from "@metaplex-foundation/umi"
import { Button } from "@mui/material"
import { useState } from "react"
import toast from "react-hot-toast"

export function InitializeCrow({ nftMint }: { nftMint: PublicKey }) {
  const program = useAnchor()
  const [loading, setLoading] = useState(false)
  const umi = useUmi()

  async function init() {
    try {
      setLoading(true)
      const promise = program.methods
        .init()
        .accounts({ crow: findCrowPda(nftMint), nftMint, nftMetadata: findMetadataPda(umi, { mint: nftMint })[0] })
        .rpc()

      toast.promise(promise, {
        loading: "Initializing Crow account",
        success: "Crow account initialized!",
        error: "Error initializing account",
      })

      await promise
      window.location.reload()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size="large" variant="contained" disabled={loading} onClick={init}>
      Initialize Crow
    </Button>
  )
}
