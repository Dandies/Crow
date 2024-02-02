import axios from "axios"
import { DAS } from "helius-sdk"

self.addEventListener("message", async (event) => {
  const { wallet } = event.data

  const { data: digitalAssets }: { data: DAS.GetAssetResponse[] } = await axios.post("/api/get-nfts", {
    ownerAddress: wallet,
  })

  self.postMessage({
    digitalAssets: digitalAssets,
  })
})
