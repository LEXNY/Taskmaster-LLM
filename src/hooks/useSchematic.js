import { useState } from 'react'


export const useSchematic = schematic => {
  const inputs = {}
  const returns = {inputs}

  for(const key in schematic) {
    // `schematic` is static per component, so this does not violate hook rules.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('')
    // TODO: this is created anew each render.  Halts keyboard input after each press.
    // Memory leak like crazy... related?
    // Also, tangential, but check why CharacterStage rerenders every ~10sec.
    const input = <input
      name={key}
      value={value}
      placeholder={schematic[key]}
      onChange={e => setValue(e.target.value)}
    />
    inputs[key] = () => input
    returns[key] = value
  }

  return returns
}
