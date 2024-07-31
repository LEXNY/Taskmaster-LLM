import React, { useEffect } from 'react'
import StrategyStage from './StrategyStage'


const schematic = {
  name: 'Challenge Name',
  description: 'Challenge Description',
}

export default ({ setScene, gameState: { protagonist, antagonists, challenge }, query }) => {
  useEffect(() => {
    query(`
      Create a challenge for a comedy game show.  Each of these characters will have to perform in the challenge.
      Just generate the description of the single challenge which all characters will participate in.
      ===
      ${protagonist.name}: ${protagonist.description}
      ===
      ${Object.values(antagonists)
        .map(({ name, description }) => `${name}: ${description}`).join('===\n')
      }
    `, schematic,
      ({ description }) => draft => { draft.challenge = description }
    )
  }, [1])

  return <div>
    <h2>Challenge Stage</h2>
    {challenge.length ? <>
      {challenge.split("\n").map((paragraph, i) =>
        <p key={i}>{paragraph}</p>)}
      <button
        key="submit"
        onClick={() => {
          setScene(StrategyStage)
        }}
      >
        I accept
      </button>
    </>:
      <p>Generating challenge...</p>
    }
  </div>
}