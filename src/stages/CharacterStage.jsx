import React, { useState } from 'react'

import ChallengeStage from './ChallengeStage'

export default ({ scene, setScene, setStage, useLanguage }) => {
    const [input, setInput] = useState('')

    const setCharacter = () => {
      const [name, description] = input.split(':') // TODO: JSON
      setScene({...scene, characters: {...scene.characters, [name]: description}})
      setStage(() => ChallengeStage)
    }
  
    // TODO: define prompt and template for each stage in text first, so it can be reused between UI and `useLanguage`.
          // TODO: Note that you need to prompt the model to answer in JSON
return <div>
      <p>
        Create a character for a comedy game show.
      </p>
  
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="[Character Name]:  [Character Description]."
      />
      <button onClick={() => setCharacter()}>Submit</button>
    </div>
  }