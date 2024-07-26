import React, { useEffect } from 'react'

import StrategyStage from './StrategyStage'

export default ({ characters, setCharacters, setScene, query, response }) => {
  useEffect(() => {
    if(characters.length < 5) {return}

    query(`
      Create a challenge for a comedy game show with the characters:
      ===
      ${JSON.stringify(characters)}
      ===

      Respond with a JSON object with strings at keys "name", "description", and "rules".
    `)

    const { description } = response // TODO
    setCharacters(characters)
  }, [characters])

  return <div>
    <p>{response}</p>
    <button
      onClick={() => setScene(StrategyStage)}>
      Submit
    </button>
  </div>
}