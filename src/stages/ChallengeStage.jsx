import React, { useState, useEffect } from 'react'

import StrategyStage from './StrategyStage'

export default ({ scene: {characters}, setScene, setStage, useLanguage }) => {
  const [description, setDescription] = useState('...loading...')

  // TODO: Note that you need to prompt the model to answer in JSON
  useEffect(() =>{
    setDescription(
  useLanguage(`
      Create a challenge for a comedy game show with the characters:
      ===
      ${JSON.stringify(characters)}
      ===
  
      ===
      [Challenge Name]
  
      [Challenge Description]
  
      [Rules or Requirements]
      ===
    `))

    setScene({description, characters})
  })

  return <div><p>{'description'}</p>
  <button onClick={() => setStage(() => StrategyStage)}>Submit</button>
  </div>
}