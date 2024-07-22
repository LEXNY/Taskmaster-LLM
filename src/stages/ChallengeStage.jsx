import React, { useEffect } from 'react'

import StrategyStage from './StrategyStage'

export default ({ scene: { characters }, setScene, setStage, query, response }) => {
  useEffect(() => {
    query(`
      Create a challenge for a comedy game show with the characters:
      ===
      ${JSON.stringify(characters)}
      ===

      Respond with a JSON object with strings at keys "name", "description", and "rules".
    `)

    const { description } = response // TODO
    setScene({ description, characters })
  }, [characters])

  // TODO: temporarily serializing
  const todo = JSON.stringify(response)

  return <div>
    <p>{todo}</p>
    <button
      onClick={() => setStage(() => StrategyStage)}>
      Submit
    </button>
  </div>
}