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

      Include only the text of the challenge, without any salutations or other text.
    `)
  }, [1])

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