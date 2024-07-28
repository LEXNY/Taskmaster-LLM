import React, { useState } from 'react'
import SceneStage from './SceneStage'
import { useSchematic } from '../hooks/useSchematic'


const schematic = {
  input: '[Strategy Name]:  [Tactics or Actions].',
}

export default ({ setScene, response, setStrategy }) => {
  const {strategy} = useSchematic(schematic)
  // TODO: multiplex

  return <div>
    <p>
      Come up with a strategy for your character for the challenge:
    </p>
    {response.map((r, i) => <p key={i}>{r}</p>)}
    <input key="strategy" {...strategy} />
    <button onClick={() => {
      setStrategy(strategy.value)
      setScene(SceneStage)
    }}>Submit</button>
  </div>
}