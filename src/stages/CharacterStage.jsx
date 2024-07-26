import React from 'react'
import ChallengeStage from './ChallengeStage'
import { useSchematic } from '../hooks/useSchematic'


const prompt = `
Create a character for a comedy game show.
`

// Prompts sometimes have to go to both the LLM and user.
// Schematics define the common return structure for both the user and LLM.
// The hints are textual descriptions of what should go in the keys.
// `useSchematic` defines the state hooks and input components for each key.
const schematic = {
  name: '[Character Name]',
  description: '[Character Description]',
}

const machinePrompt = `
  ${prompt}

  Return a JSON object, using the keys from this example verbatim, but using the values as
  descriptions of *what* to fill in in place.

  ===
  ${JSON.stringify(schematic)}
`

const CharacterStage = ({ setScene, characters, setCharacters }) => {
  const {name, description} = useSchematic(schematic)

  return <div>
    <p>{prompt}</p>

    <input key="name" {...name} />
    <input key="description" {...description} />
    <button onClick={() => {
      setCharacters({ ...characters, [name.value]: description.value })
      setScene(ChallengeStage)
    }}>Create Character</button>
  </div>
}

export default CharacterStage