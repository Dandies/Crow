import { get } from "lodash"
import { FEES } from "../constants"
import { BN } from "bn.js"

export function shorten(address: string) {
  if (!address) {
    return
  }
  return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`
}

export function getLevel(dandies: number) {
  if (dandies >= 10) {
    return "free"
  }
  if (dandies >= 5) {
    return "pro"
  }
  if (dandies >= 1) {
    return "advanced"
  }
  return "basic"
}

export function getFee(type: string, dandies: number) {
  if (!dandies) {
    return null
  }

  const level = getLevel(dandies)

  if (level === "free") {
    return new BN(0)
  }

  const fee: BigInt = get(FEES, `${type}.${level}`, 0n)

  return fee ? new BN(fee.toString()) : null
}

export function toTitleCase(str: string) {
  return str.replace("-", " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
