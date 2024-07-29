import React, {useEffect} from 'react'
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

// TODO: pseudocode for a multiplexing helper.
// multiplex = ()=> 4.times{useSchematic}
// [user, ...bots] = mutliplex
const useMultiplex = (schematic) => {
  const user = useSchematic(schematic)
  const bots = []
  for(let i = 0; i < 4; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bots.push(useSchematic(schematic))
  }
  return {user, bots}
}

const CharacterStage = ({ setScene, characters, setCharacters, query, response }) => {
  // TODO: this is just singleplexing for the user atm
  const { name, description } = useSchematic(schematic)

  // TODO: starting to add in machines.
  // Loop 4 times, creating AI controlled characters.
  // call `query` for each, getting a `response` for each.
  // set the characters in `setCharacters` for each.
  useEffect(() => {
    for(let i = 0; i < 4; i++) {
        const name = `AI ${i}`
        console.log('foo is happening') // TODO
        const description = query(`
          Create a character for a comedy game show.
        `)
        deepSetCharacter(characters, setCharacters, name, { description })
    }
  }, [1])

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