import React from 'react'

// TODO: state machine from ChallengeStage -> StrategyStage
export default ({ engine, character, setChallenge }) => {
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
    `, engine)
  
    setChallenge(challenge)
    return <p>{challenge}</p>
  }