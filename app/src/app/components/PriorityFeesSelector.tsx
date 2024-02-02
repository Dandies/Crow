"use client"

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { PriorityFees } from "../constants"
import { usePriorityFees } from "../context/priority-fees"

export function PriorityFeesSelector() {
  const { feeLevel, setFeeLevel } = usePriorityFees()

  return (
    <FormControl size="small" sx={{ minWidth: 130 }}>
      <InputLabel id="demo-simple-select-label">Priority tx fees</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={feeLevel}
        label="Priority tx fees"
        onChange={(e) => setFeeLevel(e.target.value as PriorityFees)}
      >
        {Object.keys(PriorityFees).map((key, i) => (
          <MenuItem value={PriorityFees[key as keyof typeof PriorityFees]} key={i}>
            {PriorityFees[key as keyof typeof PriorityFees]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
