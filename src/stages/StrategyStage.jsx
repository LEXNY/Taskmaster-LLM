import React, { useState } from 'react'
import SceneStage from './SceneStage'
import { useSchematic } from '../hooks/useSchematic'
import { deepSetCharacter } from './CharacterStage'


const schematic = {
  input: '[Strategy Name]:  [Tactics or Actions].',
}

export default ({ characters, setCharacters, setScene, response }) => {
  const userCharacter = Object.entries(characters)[0]
  const {strategy} = useSchematic(schematic)
  // TODO: multiplex

  return <div>
    <p>
      Come up with a strategy for your character for the challenge:
    </p>
    {response.map((r, i) => <p key={i}>{r}</p>)}
    <input key="strategy" {...strategy} />
    <button onClick={() => {
      // TODO: multiplexing has to happen in the onClick also.
      deepSetCharacter(characters, setCharacters, userCharacter.name, { strategy: strategy.value })
      setScene(SceneStage)
    }}>Submit</button>
  </div>
}