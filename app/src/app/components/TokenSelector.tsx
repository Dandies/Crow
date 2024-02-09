import { Stack, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useWallet } from "@solana/wallet-adapter-react"
import { orderBy } from "lodash"
import { useEffect, useState } from "react"
import { useUmi } from "../context/umi"
import { getAllFungiblesByOwner } from "../helpers/helius"
import { TokenWithTokenInfo } from "../page"

export function TokenSelector({ onSelect }: { onSelect: Function }) {
  const [tokens, setTokens] = useState<TokenWithTokenInfo[]>([])
  const wallet = useWallet()
  const umi = useUmi()

  useEffect(() => {
    if (!wallet.publicKey) {
      setTokens([])
      return
    }
    ;(async () => {
      const tokens = (await getAllFungiblesByOwner(umi.identity.publicKey)) as TokenWithTokenInfo[]
      setTokens(orderBy(tokens, (token) => token.token_info?.price_info?.total_price || 0, "desc"))
    })()
  }, [wallet.publicKey])

  return (
    <Stack spacing={2}>
      <Typography textTransform="uppercase" color="primary" textAlign="center" variant="h4" fontWeight="bold">
        Select a token
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Balance</Typography>
            </TableCell>
            <TableCell>
              <Typography>Price</Typography>
            </TableCell>
            <TableCell>
              <Typography>Value</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((token, i) => (
            <TableRow
              key={i}
              sx={{ ":hover": { backgroundColor: "background.default", cursor: "pointer" } }}
              onClick={() => onSelect(token.id)}
            >
              <TableCell>
                {token.content?.metadata.name || "Unnamed token"} (
                {token.content?.metadata.symbol || token.token_info?.symbol})
              </TableCell>
              <TableCell>
                {(token.token_info.balance / Math.pow(10, token.token_info.decimals || 0)).toLocaleString()}
              </TableCell>
              <TableCell>{token.token_info?.price_info?.price_per_token || 0}</TableCell>
              <TableCell>{token.token_info?.price_info?.total_price || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}
