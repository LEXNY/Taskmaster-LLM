import React from 'react'
          // TODO: Note that you need to prompt the model to answer in JSON

// TODO: state machine from ChallengeStage -> StrategyStage
export default ({ scene, setScene, setStage, useLanguage }) => {
    const challenge = useLanguage(`
      Create a challenge for a comedy game show with the character:
      ===
      ${character}
      ===
  
      ===
      [Challenge Name]
  
      [Challenge Description]
  
      [Rules or Requirements]
      ===
    `)
  
    setChallenge(challenge)
    return <p>{challenge}</p>
  }