import { useState } from 'react'

export const useSchematic = schematic => {
  const inputs = {}

  for (const [name, placeholder] of Object.entries(schematic)) {
    // `schematic` is static per component, so this does not violate hook rules.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(placeholder)

    inputs[name] = {
      value,
      placeholder,
      onChange: e => setValue(e.target.value),
    }
  }

  return inputs
}