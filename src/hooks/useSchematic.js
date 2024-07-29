import { useState } from 'react'

// Prompts sometimes have to go to both the LLM and user.
// Schematics define the common return structure for both the user and LLM.
// The hints are textual descriptions of what should go in the keys.
// `useSchematic` defines the state hooks and input components for each key.
export const useSchematic = schematic => {
  const inputs = {}

  for (const [name, placeholder] of Object.entries(schematic)) {
    // `schematic` is static per component, so this does not violate hook rules.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(placeholder)

    inputs[name] = {
      name,
      value,
      placeholder,
      onChange: e => setValue(e.target.value),
    }
  }

  return inputs
}