import React, { useState } from 'react'

import SceneStage from './SceneStage'

export default ({ setScene, challenge, useLanguage }) => {
  const [input, setInput] = useState('')

  return <div>
    <p>
      Come up with a strategy for your character for the challenge:
    </p>
    <p>
      {challenge}
    </p>
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="[Strategy Name]:  [Tactics or Actions]."
    />
    <button onClick={() => setScene(SceneStage)}>Submit</button>
  </div>
}