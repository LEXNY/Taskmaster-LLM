import { useState, useEffect } from 'react'


export const useSchematic = schematic => {
  const [inputs, setInputs] = useState(schematic)

  for (const [name, placeholder] in Object.entries(schematic)) {
    // `schematic` is static per component, so this does not violate hook rules.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(placeholder)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setInputs({
        ...inputs,
        [name]: {
          name,
          value,
          placeholder,
          onChange: e => setValue(e.target.value),
        }
      })
    }, [value])
  }

  return inputs
}