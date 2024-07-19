import React from 'react'
          // TODO: Note that you need to prompt the model to answer in JSON


// ** Some stages (e.g. CharacterStage) are rendered once to UI and 4 times to `useLanguage`.
    // ** TODO, considering the example of scene generation:
    //
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


// TODO: state machine from SceneStage -> CritiqueStage.
// TODO: `strategy` as a property of `character`
export default ({ character, challenge, strategy, setScene }) => {
    const scene = useLanguage(`
      Write a script for the following characters attempts at the challenge based on their provided strategies:
      ===
      ${challenge}
      ===
      ${character}
  
      ===
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
  
    setScene(scene)
    return <div><p>{scene}</p></div>
  }