import React, { useState, useEffect } from 'react'
import ChallengeStage from './ChallengeStage'
import { useSchematic } from '../hooks/useSchematic'


const prompt = `
Create a character for a comedy game show.
`

const schematic = {
  name: '[Character Name]',
  description: '[Character Description]',
}


const CharacterStage = ({ setScene, gameState: {antagonists}, setGameState, query }) => {
  const { name, description } = useSchematic(schematic)

  // machine-generated machine-controlled characters
  useEffect(() => {
    if (Object.keys(antagonists).length < 4) {
      query(
        prompt, schematic,
        ({ name, description }) => draft => { draft.antagonists[name] = { name, description } }
      )
    }
  }, [query])

  const ready = Object.keys(antagonists).length === 4 && name.value && description.value

  return <div>
    <p>{prompt}</p>

    <input key="name" {...name} />
    <input key="description" {...description} />
    {ready ?
      <button onClick={() => {
        setGameState(draft => { draft.protagonist = { name, description } })
        setScene(ChallengeStage)
      }}>Create Character</button>
      :
      <p>Generating AI characters...</p>
    }
    {Object.entries(antagonists).map(([name, { description }], i) => <p>
      {name}: {description}
    </p>)}
  </div>
}

export default CharacterStage