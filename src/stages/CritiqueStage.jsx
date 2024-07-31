import React, { useEffect } from 'react'


const prompt = (challenge, character, scene) => `
  You are the capricious judge of a comedy game show challenge:
  ===
  ${challenge}
  ===
          
  Given the character:
  ===
  ${character}
  === and their performance in the scene:
  ${scene}
  ===
          
  Write a critique of the character's performance.
`

// TODO: stricter schematic, i.e. don't generate `"score":"[Score between 1-5, preferably < 4]"`.
// TODO: Search codebase for VALIDATION
const schematic = {
  "opening volley": "[Opening volley of insults lambasting the character's performance and general life choices with theatrical disdain.]",
  "grudging acknowledgement": "[Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.]",
  "explanation": "[Explanation for the score: - Adherence to the rules - Clever lateral thinking - Humorous moments - Overall effectiveness]",
  "parting shot": "[A parting shot insult issuing final judgement on both the performance and the character.]",
  "score": "[Score between 1-5, preferably < 4]",
}


const CritiqueStage = ({ gameState, query }) => {
  const all = [
    ...Object.entries(gameState.antagonists),
    [gameState.protagonist.name, gameState.protagonist, true],
  ]
  useEffect(() => {
    for (const [name, character, isProtagonist] of all) {
      if (character.critique) { continue }

      query(
        prompt(gameState.challenge, character, gameState.scene),
        schematic,
        ({ "opening volley": openingVolley, "grudging acknowledgement": grudgingAcknowledgement, explanation, "parting shot": partingShot, score }) => draft => {
          const path = isProtagonist ? draft.protagonist : draft.antagonists[name]
          path.critique = { openingVolley, grudgingAcknowledgement, explanation, partingShot, score }
        }
      )
      break
    }
  })

  return <div>
    <h2>Critique Stage</h2>
    {all.map(([name, {critique}]) => 
      <p key={name}>
        {name}: {JSON.stringify(critique)}
      </p>
    )}
  </div>
}

export default CritiqueStage