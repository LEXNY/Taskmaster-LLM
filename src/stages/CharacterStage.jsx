import React, { useState } from 'react'
import ChallengeStage from './ChallengeStage'


const prompt = `
Create a character for a comedy game show.
`

// Prompts sometimes have to go to both the LLM and user.
// TODO: schematic stage component metaprogramming.

// Schematics define the common return structure for both the user and LLM.
// The hints are textual descriptions of what should go in the keys.

// `useSchematic` defines the state hooks and input components for each key
// of `schematic`, partially-metaprogramming the multiplexer problem away.

// You can use `useSchematic` to multiplex IO.
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

export default ({ scene, setScene, setStage, query, response }) => {
    const {name, description, inputs} = useSchematic(schematic)

    const setCharacter = () => {
      const characters = { ...scene.characters, [name]: description }
      setScene({...scene, characters})
      setStage(() => ChallengeStage)
    }
  
  return <div>
      <p>{ prompt }</p>
  
      <inputs.name />
      <inputs.description />
      <button onClick={() => setCharacter()}>Create Character</button>
    </div>
  }