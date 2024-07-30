import React, { useEffect } from 'react'
import SceneStage from './SceneStage'
import { useSchematic } from '../hooks/useSchematic'


const schematic = {
  strategy: '[Tactics, Doctrine, Goals, Schemes].',
}

export default ({ gameState, query, setScene }) => {
  const {strategy} = useSchematic(schematic)

  useEffect(() => {
    const needsStrategy = Object.entries(gameState.antagonists)
      .find(a => !a.strategy)
    if (needsStrategy) {
      query(
        prompt, schematic,
        ({ strategy }) => draft => { needsStrategy.strategy = strategy }
      )
    }
  }, [gameState.antagonists])

  return <div>
    <p>
      Come up with a strategy for your character for the challenge:
    </p>
    {gameState.challenge.split("\n").map((r, i) => <p key={i}>{r}</p>)}
    <input key="strategy" {...strategy} />
    <button onClick={() => {
      // TODO: Cannot add property strategy, object is not extensible.
      // Immerjs related.  Need to use `setGameState`
      gameState.protagonist.strategy = strategy.value
      setScene(SceneStage)
    }}>Submit</button>
    {Object.entries(gameState.antagonists).map(([name, { strategy }], i) => <p key={name}>
      {name}: {strategy}
    </p>)}
  </div>
}