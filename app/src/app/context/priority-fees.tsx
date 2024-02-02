import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react"
import { PriorityFees } from "../constants"

const Context = createContext<
  undefined | { feeLevel: PriorityFees; setFeeLevel: Dispatch<SetStateAction<PriorityFees>> }
>(undefined)

export function PriorityFeesProvider({ children }: PropsWithChildren) {
  const [feeLevel, setFeeLevel] = useState(PriorityFees.MEDIUM)

  return <Context.Provider value={{ feeLevel, setFeeLevel }}>{children}</Context.Provider>
}

export const usePriorityFees = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("usePriorityFees must be used in a PriorityFeesProvider")
  }

  return context
}
