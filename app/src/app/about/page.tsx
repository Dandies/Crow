import { Box, Card, CardContent, Container, Link, Stack, Typography } from "@mui/material"
import { Center } from "../components/Center"

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Center>
        <Card elevation={8} sx={{ maxHeight: "80vh", overflow: "hidden", display: "flex", alignItems: "stretch" }}>
          <CardContent sx={{ p: 5, overflow: "auto" }}>
            <Container maxWidth="md">
              <Stack spacing={6}>
                <Stack>
                  <Typography fontWeight="bold" textAlign="center" variant="h4">
                    What is Crow?
                  </Typography>
                  <Typography textAlign="center" fontWeight={100} color="primary" variant="h5">
                    Asset storage, sharing and es<strong>crow</strong> via NFTs
                  </Typography>
                </Stack>
                <Typography color="primary" fontWeight="bold" fontSize="20px">
                  Crow is an open source decentralised protocol on Solana built by Dandies which enables the
                  transferring and storage of assets within non-fungible tokens (NFTs).
                </Typography>

                <Box sx={{ columnCount: { xs: 1, md: 2 }, columnGap: 6 }}>
                  <Typography variant="body2" mb={2} fontWeight={100} sx={{ wordBreak: "break-word" }}>
                    The public key of the program is Crow6rDB5ZhGGqV2uXAG6Ta7aLvyw22vRNAcxd7mu2sv and the IDL can be
                    downloaded from{" "}
                    <Link
                      href="https://solscan.io/account/Crow6rDB5ZhGGqV2uXAG6Ta7aLvyw22vRNAcxd7mu2sv"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Solscan
                    </Link>
                  </Typography>

                  <Typography variant="body2" mb={2} fontWeight={100}>
                    <strong>
                      Anyone can transfer any asset into any non-fungible token, including NFTs, pNFTs, NFT Editions and
                      pNFT Editions.
                    </strong>{" "}
                    These assets are claimable by the holder of the NFT, so are transferrable when the NFT is bought or
                    sent to a new holder.
                  </Typography>

                  <Typography variant="body2" mb={2} fontWeight={100}>
                    The sender of the asset can optionally set a start date, and the asset will only become claimable
                    after this date, or in the case of SOL or Fungible tokens (eg USDC) a vesting schedule can be set.
                    This can either be linear, or a set number of intervals.
                  </Typography>

                  <Typography variant="body2" mb={2} fontWeight={100}>
                    For example: A user can send 120,000,000 $BONK to the Crow account of a Dandy, and set an interval
                    vesting schedule over 12 weeks with 12 intervals. The holder of the Dandy will be able to claim
                    10,000,000 $BONK per week while he holds the NFT.
                  </Typography>

                  <Typography variant="body2" mb={2} fontWeight={100}>
                    If he holds for 2 weeks, and claims the full allocation unlocked during this time (20,000,000), then
                    sells to user B, User B will be able to claim the remaining vesting balance (100,000,000) over the
                    remaining time (10 weeks)
                  </Typography>

                  <Typography variant="body2" mb={2} fontWeight="bold">
                    This opens up a lot of interesting use cases and opportunities to explore around ownership and NFT
                    based token vesting. We look forward to seeing what you come up with.
                  </Typography>
                </Box>
              </Stack>
            </Container>
          </CardContent>
        </Card>
      </Center>
    </Container>
  )
}
