import React, { useEffect } from 'react'

import StrategyStage from './StrategyStage'

// TODO: useSchematic

export default ({ characters, setChallenge, setScene, query, response }) => {
  useEffect(() => {
    query(`
      Create a challenge for a comedy game show with the characters:
      ===
      ${JSON.stringify(characters)}
      ===

      Include only the name and description of the challenge in your response, like:
      ===
      { "name": "The Great Banana Peel-Off", "description": "Competitors must peel and eat as many bananas as possible in 60 seconds." }
      ===
    `)
  })

  return <div>
    <p>{response}</p>
    <button
      key="submit"
      onClick={() => {
        setChallenge(response)
        setScene(StrategyStage)
      }}
    >
      Submit
    </button>
  </div>
}