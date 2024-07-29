import React from 'react'
import ChallengeStage from './ChallengeStage'
import { useSchematic } from '../hooks/useSchematic'


const prompt = `
Create a character for a comedy game show.
`

const schematic = {
  name: '[Character Name]',
  description: '[Character Description]',
}

export const deepSetCharacter = (characters, setCharacters, name, datum) => {
  setCharacters({
    ...characters, [name]: {
      ...characters[name], ...datum
    }
  })
}

const CharacterStage = ({ setScene, characters, setCharacters, useQuery }) => {
  const { name, description } = useSchematic(schematic)

  return <div>
    <p>{prompt}</p>

    <input key="name" {...name} />
    <input key="description" {...description} />
    <button onClick={() => {
      deepSetCharacter(characters, setCharacters, name, { description })
      setScene(ChallengeStage)
    }}>Create Character</button>
  </div>
}

export default CharacterStage