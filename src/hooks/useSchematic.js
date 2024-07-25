import { useState } from 'react'
import TextField from '@mui/material/TextField'


export const useSchematic = schematic => {
  const inputs = {}
  const returns = {inputs}

  for(const key in schematic) {
    // `schematic` is static per component, so this does not violate hook rules.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('')
    const input = <TextField
      value={value}
      placeholder={schematic[key]}
      onChange={e => setValue(e.target.value)}
    />
    inputs[key] = () => input
    returns[key] = value
  }

  return returns
}
