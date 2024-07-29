import React, { useEffect } from 'react'
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

const CharacterStage = ({ setScene, characters, setCharacters, query, response }) => {
  // inputs for the user character
  const { name, description } = useSchematic(schematic)
  // machine-generated machine-controlled characters
  useEffect(() => {
    // TODO: race condition against user input, hacky fix.
    // Better would be putting them in different places.
    const bound = characters[name.value] ? 5 : 4
    if (
      Object.keys(characters).length <= bound
      // pass in schematic and enforce JSON output.
    ) { query(prompt, schematic) }

    try {
      const { name, description } = JSON.parse(response)
      deepSetCharacter(characters, setCharacters, name, { description })
    } catch {/* TODO set retry? */}
  }, [response])

  return <div>
    <p>{prompt}</p>

    <input key="name" {...name} />
    <input key="description" {...description} />
    {Object.keys(characters).length === 5 ?
      <button onClick={() => {
        deepSetCharacter(characters, setCharacters, name, { description })
        setScene(ChallengeStage)
      }}>Create Character</button>
      :
      <p>Generating AI characters...</p>
    }
    {JSON.stringify(characters)}
  </div>
}

export default CharacterStage