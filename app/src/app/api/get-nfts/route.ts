import { NextResponse } from "next/server"
import { getDigitalAssetsForWallet } from "@/app/helpers/helius"

export async function POST(request: Request) {
  const { ownerAddress } = await request.json()

  console.log({ ownerAddress })

  const assets = await getDigitalAssetsForWallet(ownerAddress)

  return NextResponse.json(assets)
}
