import React, { useEffect } from 'react'
import CritiqueStage from './CritiqueStage'

// TODO: SVO structure for line/actions.  Event-like.
// TODO: rework this using shot prompting.  insert current script as history instead.
const prompt = (script, mainCharacter, otherCharacters, challenge) => `
The following character:
<character>
${mainCharacter.description}
</character>

is a contestant on a comedy game show. The challenge is to:
<challenge>
${challenge}
</challenge>

and their strategy is:
<strategy>
${JSON.stringify(mainCharacter.strategy)}
</strategy>

The other contestants' strategies, for reference:
<strategy>
${otherCharacters.map(({ strategy }) => JSON.stringify(strategy)).join('\n')}
</strategy>

Here's the current script so far.
=== script:
${script.map(({ name, says, does }) =>
  name + (does ? '**' : ':') + (does || says)
).join("\n")}
===

Write a line or action for the character to perform in the scene, using the SCHEMA.

The line or action should:
- Bring the characters stated strategies to life in an engaging, descriptive way
- Account for how the different characters' actions could intersect and influence each other
- Highlight moments that exemplify or clash with the characters established traits/personalities
- Leave room for creative interpretations, lateral thinking, and mischief.
`

const schematic = { "name": "Character name", "says": "either include a character line", "does": "or include a character action" }

// In the scene stage, experiment with agent-prompting-topology with a strategy
// of line-by-line generation.  Also, experiment with reframing the same prompt
// for each character, but having all characters present in all prompts.
const SceneStage = ({ gameState, setScene, query }) => {
  const all = Object.values({ ...gameState.antagonists, [gameState.protagonist.name]: gameState.protagonist })

  //  for each character, when generating a scene, we consider the character's strategy in special first-person terms.
  //  it is highlighted in a separate segment of the prompt, whereas we also consider each other character's strategy.
  //  For all prompts, we consider the same set of all 5 character's strategies, but the prompt is generated 5 times.
  useEffect(() => {
    for (const [name, us] of Object.entries(gameState.antagonists)) {
      const them = all.filter(character => character.name !== name)

      // TODO. VALIDATION: secondary query "does this look done" instead of hard limit of 12.
      if (us.script.length < 12) {
        const filledPrompt = prompt(us.script, us, them, gameState.challenge)
        query(filledPrompt, schematic, ({ name, says, does }) => draft => {
          draft.antagonists[name].script.push({ name, says, does })
        })
        break
      }
    }
    // same as above but for protagonist against all antagonists.
    if (gameState.protagonist.script.length < 12) {
      const filledPrompt = prompt(gameState.protagonist.script, gameState.protagonist, Object.entries(gameState.antagonists), gameState.challenge)
      query(filledPrompt, schematic, ({ name, says, does }) => draft => {
        draft.protagonist.script.push({ name, says, does })
      })
    }
  })

  return <div>
    <h2>Scene Stage</h2>
    {all.map(({name, script }) => <div key={name}>
      {script ? script.map((line, i) => <p
        key={i}
      >
        TODO {line}
      </p>) : <p>{name} is thinking...</p>}
    </div>)}
    <button onClick={() => {
      setScene(CritiqueStage)
    }}>Roast me</button>
  </div>
}

export default SceneStage