import React, { useState, useEffect } from 'react'

import StrategyStage from './StrategyStage'

export default ({ scene: {characters}, setScene, setStage, query, response }) => {
  // TODO: Note that you need to prompt the model to answer in JSON
  useEffect(() =>{
  query(`
      Create a challenge for a comedy game show with the characters:
      ===
      ${JSON.stringify(characters)}
      ===
  
      ===
      [Challenge Name]
  
      [Challenge Description]
  
      [Rules or Requirements]
      ===
    `)

    const {description} = response // TODO
    setScene({description, characters})
  }, [characters])

  return <div><p>{response.description}</p>
  <button onClick={() => setStage(() => StrategyStage)}>Submit</button>
  </div>
}