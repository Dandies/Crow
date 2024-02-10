"use client"
import { Color, Link, Stack, Tooltip, Typography, TypographyVariant } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { default as NextLink } from "next/link"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DoneIcon from "@mui/icons-material/Done"
import { shorten } from "../helpers/utils"

type CopyAddressProps = {
  children: any
  chain?: string
  wallet?: Boolean
  textAlign?: "right" | "left" | "center"
  variant?: TypographyVariant
  color?: any
}

export const CopyAddress: FC<CopyAddressProps> = ({ children, chain = "solana", wallet, ...props }) => {
  const [copied, setCopied] = useState(false)

  function copyPk() {
    navigator.clipboard.writeText(children)
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return

    const id = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(id)
    }
  }, [copied])

  const targets = {
    solana: {
      name: "Solscan",
      url: "https://solscan.io/token/",
      image: "/solscan.png",
    },
  }

  const target = targets[chain as keyof object] as any

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Tooltip title={`View on ${target.name}`}>
        <Link href={`${target.url}${children}`} target="_blank">
          <img src={target.image} width="15px" style={{ display: "block" }} />
        </Link>
      </Tooltip>
      <Typography {...props}>{shorten(children)}</Typography>

      {copied ? (
        <DoneIcon fontSize="small" color="success" />
      ) : (
        <Tooltip title="Copy address">
          <ContentCopyIcon sx={{ cursor: "pointer" }} fontSize="small" onClick={copyPk} />
        </Tooltip>
      )}
    </Stack>
  )
}
