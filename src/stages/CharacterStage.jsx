import React, { useState } from 'react'
          // TODO: Note that you need to prompt the model to answer in JSON

import ChallengeStage from './ChallengeStage'

// TODO: stages can optionally have a paramater for `useLanguage` as for whether we're using the
// component for its logic and not for UI.  `if (useLanguage) return [[more complicated -- useLanguage(prompt)]]`.
// TODO: state machine from CharacterStage -> ChallengeStage
export default ({ scene, setScene, setStage }) => {
    const [input, setInput] = useState('')

    const setCharacter = (input) => {
      const [name, description] = input.split(':') // TODO: JSON
      setScene({...scene, characters: { ...scene.characters, [name]: description }})
      setStage(() => ChallengeStage)
    }
  
    // TODO: define prompt and template for each stage in text first, so it can be reused between UI and `useLanguage`.
    return <div>
      <p>
        Create a character for a comedy game show.
      </p>
  
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="[Character Name]:  [Character Description]."
      />
      <button onClick={() => setCharacter(input)}>Submit</button>
    </div>
  }