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
    ) { query(prompt) }

    // TODO: request JSON in query based on schematic.
    // TODO: parsing response
    // TODO: an array of paragraphs isnt useful in all cases.
    const _name = response[0]
    const description = name
    // TODO: actually capture the response
    // TODO: pass in schematic and enforce JSON output.
    deepSetCharacter(characters, setCharacters, _name, { description })

    try {
      const { name, description } = JSON.parse(response)
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