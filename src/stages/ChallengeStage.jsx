import React, { useEffect } from 'react'
import StrategyStage from './StrategyStage'


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
    {response.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
    <button
      key="submit"
      onClick={() => {
        setChallenge(response)
        setScene(StrategyStage)
      }}
    >
      I accept
    </button>
  </div>
}