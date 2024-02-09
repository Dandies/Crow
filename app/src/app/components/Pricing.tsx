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
        <Container maxWidth="sm"></Container>
      </CardContent>
    </Card>
  )
}
