import React, { useEffect } from 'react'
import StrategyStage from './StrategyStage'


const schematic = {
  name: '[Challenge Name]',
  description: '[Challenge Description]',
}

export default ({ setScene, gameState: {protagonist, antagonists, challenge}, query }) => {
  useEffect(() => {
    query(`
      Create a challenge for a comedy game show for these characters:
      ===
      ${JSON.stringify(protagonist)}
      ${JSON.stringify(antagonists)}
      ===
    `, schematic,
      ({description}) => draft => { draft.challenge = description }
    )
  }, [1])

  return challenge.length ? <div>
      {challenge.split("\n").map((paragraph, i) =>
        <p key={i}>{paragraph}</p>)}
      <button
        key="submit"
        onClick={() => {
          setScene(StrategyStage)
        }}
      >
        I accept
      </button></div>
    :
      <p>Generating challenge...</p>
}