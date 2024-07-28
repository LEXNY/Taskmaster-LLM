import React, { useEffect } from 'react'
import CritiqueStage from './CritiqueStage'

// TODO:
//  for each character, when generating a scene, we consider the character's strategy in special first-person terms.
//  it is highlighted in a separate segment of the prompt, whereas we also consider each other character's strategy.
//  For all prompts, we consider the same set of all 5 character's strategies, but the prompt is generated 5 times.
//
// for(const mainCharacter of characters) {
//   for(const otherCharacters of characters) {
//     if(mainCharacter === otherCharacters) continue
//     // TODO: no, actually-actually completed means stitching the template and the prompt together for the machine.  PROMPT COMBINATOR.
//     const completedPrompt = prompt({ mainCharacter, otherCharacters })
//   }
// }

// TODO: this one do as interactive, line-by-line.
// The system prompt and few shotting are there to help set personalities.
export default ({ challenge, characters, setScene, setScript, response, query }) => {
  /* TODO
    const script = query(`
      Write a script for the following character's attempt at the challenge based on their provided strategies:
      ===challenge:
      ${challenge}
      ===protagonist:
      ${character}
  
      ===antagonists (other contestants)
      ** TODO *****************************************************
      ** TODO: Add other characters' definitions and strategies. **
      ** TODO *****************************************************
      ===
  
      ===
      The script should:
      - Bring the characters stated strategies to life in an engaging, descriptive way
      - Account for how the different characters' actions could intersect and influence each other
      - Highlight moments that exemplify or clash with the characters established traits/personalities
      - Leave room for creative interpretations, lateral thinking, and mischief.
  
      Use this template to structure your response:
      ===
      [ line or action ]
      [ line or action ]
      [ ... ]
      ===
    `)
    */
  useEffect(() => {
    query(`
        Write a script for the following characters attempts at the challenge based on their provided strategies:
        ===
        ${challenge}
        ===
        ${JSON.stringify(characters)}
        ===
        The script should:
        - Bring the characters stated strategies to life in an engaging, descriptive way
        - Account for how the different characters' actions could intersect and influence each other
        - Highlight moments that exemplify or clash with the characters established traits/personalities
        - Leave room for creative interpretations, lateral thinking, and mischief.
        Use this template to structure your response:
        ===
        [ line or action ]
        [ line or action ]
        [ ... ]
        ===
      `)
  }, [])

  return <div>
    {response.map((r, i) => <p key={i}>{r}</p>)}
    <button onClick={() => {
      setScene(CritiqueStage)
      setScript(response)
    }}>Roast me</button>
  </div >
}