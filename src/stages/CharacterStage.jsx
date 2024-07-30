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


const CharacterStage = ({ setScene, characters, setCharacters, query }) => {
  const create = ({name, description}) => {
    setCharacters({ ...characters, [name]: { name, description } })
  }

  // inputs for the user character
  const { name, description } = useSchematic(schematic)
  // machine-generated machine-controlled characters
  useEffect(() => {
    for(let i = 0; i < 4; i++) {
      query(prompt, schematic, create)
    }
  }, [1])

  return <div>
    <p>{prompt}</p>

    <input key="name" {...name} />
    <input key="description" {...description} />
    {Object.keys(characters).length === 5 ?
      <button onClick={() => {
        create({name, description})
        setScene(ChallengeStage)
      }}>Create Character</button>
      :
      <p>Generating AI characters...</p>
    }
    {JSON.stringify(characters)}
  </div>
}

export default CharacterStage