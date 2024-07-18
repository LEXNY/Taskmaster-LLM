import React, { useState, useEffect } from 'react'
import secretLlama from './secretLlama'


const useLanguage = prompt => {
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    (async () => {
      for (const key in data) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
        prompt = prompt.replace(regex, data[key])
      }

      try {
        setResponse(
          JSON.parse(
            await secretLlama
              .generateCompletion(prompt)
              .match( /template>(.*?)<.template>/s )
              [1] ))
      } catch (error) {
        setRetryCount(retryCount + 1)
      }
    })()
  }, [retryCount])

  return response
}


// TODO: state machine from CharacterStage -> ChallengeStage
const CharacterStage = ({ setCharacter }) => {
  const [input, setInput] = useState('')

  return <div>
    <p>
      Create a character for a comedy game show.
    </p>
 
    <input>
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="[Character Name]:  [Character Description]."
    </input>
    <button onClick={() => setCharacter(input)}>Submit</button>
  </div>
}


// TODO: state machine from ChallengeStage -> StrategyStage
const ChallengeStage = ({ character, setChallenge }) => {
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


// TODO: state machine from StrategyStage -> SceneStage
const StrategyStage = ({ character, challenge, setStrategy }) => {
  const [input, setInput] = useState('')

  return <div>
    <p>
      Come up with a strategy for your character for the challenge:
    </p>
    <p>
      {challenge}
    </p>
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="[Strategy Name]:  [Tactics or Actions]."
    />
    <button onClick={() => setStrategy(input)}>Submit</button>
  </div>
}


// TODO: state machine from SceneStage -> CritiqueStage.
                      // TODO: `strategy` as a property of `character`
const SceneStage = ({ character, challenge, strategy, setScene }) => {
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
  return <p>{scene}</p>
}


// TODO: state machine from CritiqueStage -> CharacterStage.
const CritiqueStage = ({ character, challenge, scene, setCritique }) => {
  const critique = useLanguage(`
    You are the capricious judge of a comedy game show challenge:
    ===
    ${challenge}
    ===

    Given the character performances:
    ===
    ${scene}
    ===

    Use this template to structure your critique:
    ===
    [Opening volley of insults lambasting the character's performance and general life choices with theatrical disdain.]

    [Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.]

    [Explanation for the score:
    - Adherence to the rules
    - Clever lateral thinking
    - Humorous moments
    - Overall effectiveness]

    [A parting shot insult issuing final judgement on both the performance and the character.]
    ===
  `)

  setCritique(critique)
  return <p>{critique}</p>
}


// Some stages (e.g. CharacterStage) are rendered once to UI and 4 times to `useLanguage`. *
const Multiplex = ({ prompt, characters, setter }) => {
  // * TODO, considering the example of scene generation:
  //  `const Multiplex = ({ prompt /* e.g. scene prompt */, characters, setter /* e.g. scenes */ }) => {`.
  //
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
  const responses = Array(4).fill().map(() => useLanguage(prompt))
  const [input, setInput] = useState('')

  return <div>
    <input value={input} onChange={e => setInput(e.target.value)} />
    <button
      onClick={() => setter([...responses, input])}
    >Submit</button>
  </div>
}


const App = () => {
  const [character, setCharacter] = useState([ /* {characterName, description} */ ])
  const [challenge, setChallenge] = useState([ /* {challengeName, description} */ ])
  const [scenes, setScenes] = {
    /* [challengeName]: {[characterName]: {strategyDescription, sceneText, sceneCritique}} */
  }

  const [CurrentStage, setStage] = useState(() => CharacterStage)

  return <>
    <Header>Preposterous Gauntlet</Header>
    <CurrentStage
      character={character}
      setCharacter={setCharacter}
      challenge={challenge}
      setChallenge={setChallenge}
      scenes={scenes}
      setScenes={setScenes}
      setStage={setStage}
    />
  </>
}

export default App