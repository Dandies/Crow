import * as anchor from "@coral-xyz/anchor"
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useDigitalAssets } from "../context/digital-assets"
import { FEES } from "../constants"
import { getLevel, toTitleCase } from "../helpers/utils"

export function Pricing({ onClose }: { onClose: Function }) {
  const { dandies } = useDigitalAssets()

  const account = getLevel(dandies.length)

  return (
    <Card>
      <CardContent>
        <Container maxWidth="sm">
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4" textAlign="center" textTransform="uppercase">
              Pricing
            </Typography>
            <Typography textAlign="center" color="primary" width="100%">
              All prices are in SOL and per change.
              <br />
              Your current fee level is highlighted in{" "}
              <Typography component="span" sx={{ color: "#faaf00" }}>
                gold
              </Typography>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: account === "basic" ? "#faaf00" : "primary.main" }}>Basic</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: account === "advanced" ? "#faaf00" : "primary.main" }}>
                      Advanced (1+)
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: account === "pro" ? "#faaf00" : "primary.main" }}>Pro (5+)</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: account === "free" ? "#faaf00" : "primary.main" }}>Free (10+)</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(FEES).map((key, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Typography color="primary">{toTitleCase(key)}</Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Typography sx={{ color: account === "basic" ? "#faaf00" : "default" }}>
                          {(
                            Number((FEES[key as keyof object] as any).basic) / anchor.web3.LAMPORTS_PER_SOL
                          ).toLocaleString(undefined, { minimumSignificantDigits: 1 })}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Typography sx={{ color: account === "advanced" ? "#faaf00" : "default" }}>
                          {(
                            Number((FEES[key as keyof object] as any).advanced) / anchor.web3.LAMPORTS_PER_SOL
                          ).toLocaleString(undefined, { minimumSignificantDigits: 1 })}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Typography sx={{ color: account === "pro" ? "#faaf00" : "default" }}>
                          {(
                            Number((FEES[key as keyof object] as any).pro) / anchor.web3.LAMPORTS_PER_SOL
                          ).toLocaleString(undefined, { minimumSignificantDigits: 1 })}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Typography sx={{ color: account === "free" ? "#faaf00" : "default" }}>{0}</Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <Button onClick={() => onClose()}>Dismiss</Button>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  )
}
