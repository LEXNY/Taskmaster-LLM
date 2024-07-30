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

  useEffect(() => {
    for(const [name, antagonist] of Object.entries(gameState.antagonists)) {
      if(antagonist.strategy) { continue }
      query(
        prompt(antagonist, gameState.challenge),
        schematic,
        ({ strategy }) => draft => {
          draft.antagonists[name].strategy = strategy
        }
      )
      break
    }
  }, [query])

  return <div>
    <p>{prompt(gameState.protagonist, gameState.challenge)}</p>
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