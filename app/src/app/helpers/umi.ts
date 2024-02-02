import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

export const umi = createUmi(process.env.NEXT_PUBLIC_RPC_HOST!, {
  commitment: "confirmed",
})
  .use(mplToolbox())
  .use(mplTokenMetadata())
