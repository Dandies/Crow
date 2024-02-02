"use client"
import { PropsWithChildren } from "react"
import { Theme } from "./Theme"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { AnchorProvider } from "../context/anchor"
import { UmiProvider } from "../context/umi"
import { DigitalAssetsProvider } from "../context/digital-assets"
import { PriorityFeesProvider } from "../context/priority-fees"

export function Providers({ children }: PropsWithChildren) {
  return (
    <Theme>
      <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_HOST!}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <UmiProvider>
              <PriorityFeesProvider>
                <AnchorProvider>
                  <DigitalAssetsProvider>{children}</DigitalAssetsProvider>
                </AnchorProvider>
              </PriorityFeesProvider>
            </UmiProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Theme>
  )
}
