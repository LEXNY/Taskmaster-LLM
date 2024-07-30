import React, { useEffect } from 'react'
import CritiqueStage from './CritiqueStage'

// TODO: interactive mode?

// TODO generate scripts for each character.
//  for each character, when generating a scene, we consider the character's strategy in special first-person terms.
//  it is highlighted in a separate segment of the prompt, whereas we also consider each other character's strategy.
//  For all prompts, we consider the same set of all 5 character's strategies, but the prompt is generated 5 times.
//
// for(const mainCharacter of characters) {
//   for(const otherCharacters of characters) {
//     if(mainCharacter === otherCharacters) continue
//     const completedPrompt = prompt({ mainCharacter, otherCharacters })
//   }
// }

// TODO: accept current state of script into prompt
const prompt = (mainCharacter, otherCharacters) => `
Write a script for the following characters attempts at the challenge based on their provided strategies:
=== current contestant:
${JSON.stringify(mainCharacter)}
=== jeering other contestants:
${JSON.stringify(otherCharacters)}
===
The script should:
- Bring the characters stated strategies to life in an engaging, descriptive way
- Account for how the different characters' actions could intersect and influence each other
- Highlight moments that exemplify or clash with the characters established traits/personalities
- Leave room for creative interpretations, lateral thinking, and mischief.
`

const schematic = [{name: 'character name', says: 'says optional line', does: 'or does optional action'}]

const SceneStage = ({ gameState, setScene, query }) => {
  useEffect(() => {
    const filledPrompt = prompt(gameState.protagonist, gameState.antagonists) // TODO
    if(gameState.script.length > 12) { return } // TODO
    query(filledPrompt, schematic, lineOrAction => draft => {
      draft.script.push(lineOrAction)
    })
    // TODO: secondary query "does this look done"
  })

  return <div>
    {gameState.script.map(({name, says, does}, i) => <p key={i}
      style={does ? {fontStyle: 'italic'} : {}}
    >
      {name}: {says || does}
    </p>)}
    <button onClick={() => {
      setScene(CritiqueStage)
    }}>Roast me</button>
  </div >
}

export default SceneStage