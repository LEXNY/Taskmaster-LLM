import React, { useEffect } from 'react'
import SceneStage from './SceneStage'
import { useSchematic } from '../hooks/useSchematic'


const prompt = (character, challenge) => `
  Come up with a strategy for your character for the challenge.

  Character:
  ===
  ${character.description}
  ===

  Challenge:
  ===
  ${challenge}
  ===
`

const schematic = {
  strategy: '[Tactics, Doctrine, Goals, Schemes].',
}

export default ({ gameState, setGameState, query, setScene }) => {
  const { strategy } = useSchematic(schematic)
  const [numBots] = 

  useEffect(() => {
    // TODO: not preventing resetting strategy on same char.
    const needsStrategy = Object.entries(gameState.antagonists)
      .find((_, a) => !a.strategy)
    if (needsStrategy) {
      const [name, antagonist] = needsStrategy
      query(
        prompt(antagonist, gameState.challenge),
        schematic,
        ({ strategy }) => draft => {
          draft.antagonists[name].strategy = strategy
        }
      )
    }
  })

  return <div>
    <p>{prompt(gameState.protagonist)}</p>
    {gameState.challenge.split("\n").map((r, i) => <p key={i}>{r}</p>)}
    <input key="strategy" {...strategy} />
    <button onClick={() => {
      setGameState(draft => {
        draft.protagonist.strategy = strategy.value
      })
      setScene(SceneStage)
    }}>Submit</button>
    {Object.entries(gameState.antagonists).map(([name, { strategy }], i) => <p key={name}>
      {name}: {JSON.stringify(strategy)}
    </p>)}
  </div>
}