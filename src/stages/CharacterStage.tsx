import React, { useState } from 'react'

// TODO: stages can optionally have a paramater for `useLanguage` as for whether we're using the
// component for its logic and not for UI.  `if (useLanguage) return [[more complicated -- useLanguage(prompt)]]`.
// TODO: state machine from CharacterStage -> ChallengeStage
export default ({ setCharacter }) => {
    const [input, setInput] = useState('')
  
    // TODO: JSON defines prompt and template for each stage, so it can be reused between UI and `useLanguage`.  `({prompt: fn, template: fn})` **
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