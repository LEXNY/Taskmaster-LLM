import React, { useState } from 'react'
          // TODO: Note that you need to prompt the model to answer in JSON

// TODO: state machine from StrategyStage -> SceneStage
export default ({ character, challenge, setStrategy }) => {
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
      <button onClick={() => setStrategy(input)}>Submit</button>
    </div>
  }