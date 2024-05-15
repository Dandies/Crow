"use client"
import * as anchor from "@coral-xyz/anchor"
import { CopyAddress } from "@/app/components/CopyAddress"
import { Countdown } from "@/app/components/Countdown"
import { useAnchor } from "@/app/context/anchor"
import { useDigitalAssets } from "@/app/context/digital-assets"
import { usePriorityFees } from "@/app/context/priority-fees"
import { useUmi } from "@/app/context/umi"
import { getDigitalAsset } from "@/app/helpers/helius"
import { getClaimTx } from "@/app/helpers/transactions"
import { AssetWithPublicKey, TokenWithTokenInfo } from "@/app/types/types"
import { publicKey } from "@metaplex-foundation/umi"
import { Card, Stack, Box, SvgIcon, Typography, Button, CircularProgress } from "@mui/material"
import { useWallet } from "@solana/wallet-adapter-react"
import base58 from "bs58"
import { DAS } from "helius-sdk"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import SolIcon from "@/../public/sol.svg"
import TokenIcon from "@/../public/token.svg"
import NftIcon from "@/../public/nft.svg"
import { dayjs } from "@/app/helpers/dayjs"
import { useParams } from "next/navigation"
import { sendAllTxsWithRetries } from "@/app/helpers/utils"

export function Asset({
  asset,
  owner,
  getAccount,
}: {
  asset: AssetWithPublicKey
  owner: string
  getAccount: Function
}) {
  const { fetchAccounts } = useDigitalAssets()
  const [loading, setLoading] = useState(false)
  const { feeLevel } = usePriorityFees()
  const [canClaim, setCanClaim] = useState(true)
  const [nft, setNft] = useState<DAS.GetAssetResponse | null>(null)
  const [token, setToken] = useState<TokenWithTokenInfo | null>(null)
  const [amountToClaim, setAmountToClaim] = useState(0)
  const wallet = useWallet()
  const program = useAnchor()
  const umi = useUmi()

  useEffect(() => {
    ;(async () => {
      if (asset.account.assetType.nft) {
        const nft = await getDigitalAsset(publicKey(asset.account.tokenMint))
        setNft(nft)
        setToken(null)
      } else if (asset.account.assetType.token) {
        const token = (await getDigitalAsset(publicKey(asset.account.tokenMint))) as TokenWithTokenInfo
        setToken(token)
        setNft(null)
      } else {
        setToken(null)
        setNft(null)
      }
    })()
  }, [asset])

  useEffect(() => {
    function tick() {
      if (!asset.account.vesting.linear && !asset.account.vesting.intervals) {
        return Number(asset.account.balance) - Number(asset.account.claimed)
      }

      const startTime = Number(asset.account.startTime)
      const endTime = Number(asset.account.endTime!)
      const currentTime = Date.now() / 1000
      const amount = Number(asset.account.amount)
      const claimed = Number(asset.account.claimed)
      const balance = Number(asset.account.balance)

      if (asset.account.vesting.linear) {
        const totalTime = endTime - startTime
        const refTime = Math.min(currentTime, endTime)
        const timeSpent = refTime - startTime

        const ratio = (timeSpent * 100) / totalTime

        const claimableBalance = (amount * ratio) / 100

        const amountToClaim = Math.min(claimableBalance - claimed, balance)

        setAmountToClaim(amountToClaim)
      } else if (asset.account.vesting.intervals) {
        const numIntervals = asset.account.vesting.intervals.numIntervals
        const totalTime = endTime - startTime
        const timeSpent = currentTime - startTime

        const timePerInterval = totalTime / numIntervals
        const amountPerInterval = amount / numIntervals

        const numIntervalsCompleted = Math.floor(timeSpent / timePerInterval)
        let claimableBalance = amountPerInterval * numIntervalsCompleted
        const amountToClaim = Math.min(claimableBalance - claimed, balance)
        setAmountToClaim(amountToClaim)
      }
    }

    const id = setInterval(tick, 100)
    return () => {
      clearInterval(id)
    }
  }, [asset])

  async function claim() {
    try {
      setLoading(true)
      const promise = Promise.resolve().then(async () => {
        const { serialized, txFee, increasedComputeUnits } = await getClaimTx(
          asset.publicKey as unknown as string,
          umi.identity.publicKey,
          feeLevel
        )

        const chunks = serialized.map((item) => umi.transactions.deserialize(base58.decode(item)))
        const signed = await umi.identity.signAllTransactions(chunks)
        return await sendAllTxsWithRetries(
          umi,
          program.provider.connection,
          signed,
          (increasedComputeUnits ? 1 : 0) + (txFee ? 1 : 0)
        )
      })

      toast.promise(promise, {
        loading: "Claiming asset",
        success: "Successfully claimed asset",
        error: "Error claiming asset",
      })

      await promise
    } catch (e: any) {
      console.error(e.message)
    } finally {
      getAccount()
      fetchAccounts()
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!asset.publicKey) {
      return
    }
    const id = program.provider.connection.onAccountChange(new anchor.web3.PublicKey(asset.publicKey), () =>
      fetchAccounts()
    )
    return () => {
      program.provider.connection.removeAccountChangeListener(id)
    }
  }, [asset.publicKey])

  const isFuture = Number(asset.account.startTime) * 1000 > Date.now()
  const factor = asset.account.assetType.sol
    ? anchor.web3.LAMPORTS_PER_SOL
    : Math.pow(10, token?.token_info?.decimals || 0)

  const formatter = Intl.NumberFormat("en", { notation: "compact" })

  return (
    <Card sx={{ borderRadius: 2, height: "100%" }}>
      <Stack height="100%">
        <Box sx={{ backgroundColor: "primary.main" }} px={2} py={1}>
          <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="space-between">
            <SvgIcon sx={{ fill: "#1f1f1f" }} fontSize="small">
              {asset.account.assetType.sol && <SolIcon />}
              {asset.account.assetType.token && <TokenIcon />}
              {asset.account.assetType.nft && <NftIcon />}
            </SvgIcon>
            <Typography textTransform="uppercase" fontWeight={100} color="#1f1f1f" textAlign="right" fontStyle="italic">
              {Object.keys(asset.account.assetType)[0]}
            </Typography>
          </Stack>
        </Box>

        <Stack spacing={2} p={2} justifyContent="space-between" flexGrow={1}>
          <Stack spacing={1} alignItems="center" justifyContent="center" height="100%">
            {asset.account.assetType.token && (
              <Stack spacing={2}>
                <Typography color="primary" variant="h5" fontWeight={100} textAlign="center">
                  <strong>{formatter.format(Number(asset.account.amount) / factor)}</strong>{" "}
                  {token?.content?.metadata.name}
                </Typography>
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center" fontWeight={100}>
                    Claimed:{" "}
                    <Typography fontWeight="bold" component="span">
                      {(Number(asset.account.claimed) / factor).toLocaleString()}
                    </Typography>
                  </Typography>
                )}

                {asset.account.vesting.linear && (
                  <Typography textAlign="center" fontWeight={100}>
                    Linear vesting until:{" "}
                    <Typography fontWeight="bold">
                      {dayjs(Number(asset.account?.endTime || 0) * 1000).format("YYYY/MM/DD HH:mm:ss")}
                    </Typography>
                  </Typography>
                )}
                {asset.account.vesting.intervals && (
                  <Typography textAlign="center" fontWeight={100}>
                    Vesting over {asset.account.vesting.intervals.numIntervals} intervals until{" "}
                    <Typography fontWeight="bold">
                      {dayjs(Number(asset.account?.endTime || 0) * 1000).format("YYYY/MM/DD HH:mm:ss")}
                    </Typography>
                  </Typography>
                )}
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center" fontWeight={100}>
                    Can claim:{" "}
                    <Typography fontWeight="bold" component="span">
                      {formatter.format((amountToClaim > 0 ? amountToClaim : 0) / factor)}
                    </Typography>
                  </Typography>
                )}
              </Stack>
            )}
            {asset.account.assetType.sol && (
              <Stack spacing={2}>
                <Typography color="primary" variant="h5" fontWeight={100} textAlign="center">
                  <strong>{formatter.format(Number(asset.account.amount) / factor)}</strong> SOL
                </Typography>
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center" fontWeight={100}>
                    Claimed:{" "}
                    <Typography fontWeight="bold" component="span">
                      {(Number(asset.account.claimed) / factor).toLocaleString()}
                    </Typography>
                  </Typography>
                )}

                {asset.account.vesting.linear && (
                  <Typography textAlign="center" fontWeight={100}>
                    Linear vesting until{" "}
                    <Typography fontWeight="bold">
                      {dayjs((Number(asset.account?.endTime) || 0) * 1000).format("YYYY/MM/DD HH:mm:ss")}
                    </Typography>
                  </Typography>
                )}
                {asset.account.vesting.intervals && (
                  <Typography textAlign="center" fontWeight={100}>
                    Vesting over {asset.account.vesting.intervals.numIntervals} intervals until{" "}
                    <Typography fontWeight="bold">
                      {dayjs(Number(asset.account?.endTime || 0) * 1000).format("YYYY/MM/DD HH:mm:ss")}
                    </Typography>
                  </Typography>
                )}
                {(asset.account.vesting.linear || asset.account.vesting.intervals) && (
                  <Typography textAlign="center" fontWeight={100}>
                    Can claim:{" "}
                    <Typography fontWeight="bold" component="span">
                      {((amountToClaim > 0 ? amountToClaim : 0) / factor).toLocaleString()}
                    </Typography>
                  </Typography>
                )}
              </Stack>
            )}
            {asset.account.assetType.nft && (
              <Stack>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    aspectRatio: "1 / 1",
                    width: "100%",
                  }}
                >
                  {nft ? (
                    <img
                      src={
                        nft?.content?.links?.image
                          ? `https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${nft?.content.links.image}`
                          : "/fallback-image.jpg"
                      }
                      width="100%"
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
                {/* <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: "bold",
                    }}
                  >
                    {nft?.content?.metadata.name}
                  </Typography>
                </Box> */}
              </Stack>
            )}
            {(asset.account.authority as any) !== owner && (
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={100}>From:</Typography>
                <CopyAddress variant="body2" fontWeight="bold">
                  {asset.account.authority.toString() as any}
                </CopyAddress>
              </Stack>
            )}
          </Stack>
          {owner === wallet.publicKey?.toBase58() ? (
            <Button variant="outlined" onClick={claim} disabled={loading || !canClaim} sx={{ whiteSpace: "nowrap" }}>
              {isFuture ? <Countdown until={Number(asset.account.startTime)} setCanClaim={setCanClaim} /> : "Claim"}
            </Button>
          ) : (
            isFuture && (
              <Typography fontWeight="bold" textAlign="center">
                Can claim <Countdown until={Number(asset.account.startTime)} setCanClaim={setCanClaim} />
              </Typography>
            )
          )}
        </Stack>
      </Stack>
    </Card>
  )
}
