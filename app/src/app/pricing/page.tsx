"use client"
import * as anchor from "@coral-xyz/anchor"
import {
  Container,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material"
import { Center } from "../components/Center"
import { FEES } from "../constants"
import { getLevel, toTitleCase } from "../helpers/utils"
import { useDigitalAssets } from "../context/digital-assets"

export default function Pricing() {
  const { dandies } = useDigitalAssets()

  const account = getLevel(dandies.length)
  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Center>
        <Card elevation={8} sx={{ maxHeight: "80vh", overflow: "hidden", display: "flex", alignItems: "stretch" }}>
          <CardContent sx={{ p: 5, overflow: "auto" }}>
            <Container maxWidth="md">
              <Stack spacing={6}>
                <Stack>
                  <Typography fontWeight="bold" textAlign="center" variant="h4">
                    Pricing
                  </Typography>
                  <Typography textAlign="center" fontWeight={100} color="primary" variant="h5">
                    Always free for Dandies
                  </Typography>
                </Stack>
                <Box sx={{ columnCount: { xs: 1, md: 2 }, columnGap: 6 }}>
                  <Typography fontWeight={100} mb={2}>
                    <strong>There are no fees associated with transferring any items in, or out of Dandies.</strong> And
                    what&apos;s more: a Crow account has already been initialized for every single Dandy, meaning the
                    only fees you will pay will be network tx fees, rent for the Asset record account, plus account
                    opening rent in the case of SPL tokens.
                  </Typography>
                  <Typography fontWeight={100} mb={1}>
                    <strong>The latter 2 are repaid in full when the asset is claimed.</strong>
                  </Typography>
                  <Typography fontWeight={100} mb={2}>
                    For other NFTs the pricing is highlighted in the table below, however{" "}
                    <strong>distributions by Free level holders also qualify all recipients to claim for free.</strong>
                  </Typography>
                  <Typography fontWeight={100}>
                    The first time a non-Dandy NFT is used, a Crow account will be initialized. This costs 0.0012 SOL in
                    rent and will last for the life of the NFT.{" "}
                    <strong>This account has been pre-paid and opened for all Dandies.</strong>
                  </Typography>
                </Box>
                <Stack spacing={2} alignItems="center">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell sx={{ textAlign: "right" }}>
                          <Typography sx={{ color: account === "basic" ? "#faaf00" : "primary.main" }}>
                            Basic
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "right" }}>
                          <Typography sx={{ color: account === "advanced" ? "#faaf00" : "primary.main" }}>
                            Advanced (1+)
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "right" }}>
                          <Typography sx={{ color: account === "pro" ? "#faaf00" : "primary.main" }}>
                            Pro (5+)
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "right" }}>
                          <Typography sx={{ color: account === "free" ? "#faaf00" : "primary.main" }}>
                            Free (10+)
                          </Typography>
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
                  <Typography textAlign="center" color="primary" width="100%">
                    All prices are in SOL and per asset.
                    <br />
                    Your current fee level is highlighted in{" "}
                    <Typography component="span" sx={{ color: "#faaf00" }}>
                      gold
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </Container>
          </CardContent>
        </Card>
      </Center>
    </Container>
  )
}
