import { notFound } from "next/navigation"
import { fetchDaWithCrow } from "./data"
import { Client } from "./Client"

export default async function Crow({ params }: { params: Record<string, string> }) {
  const daWithCrow = await fetchDaWithCrow(params.nftMint)

  if (!daWithCrow) {
    return notFound()
  }

  return <Client daWithCrow={daWithCrow} />
}
