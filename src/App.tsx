import React, { useState, useEffect } from 'react'
import language, { MLCEngine } from '@mlc-ai/web-llm'

import CharacterStage from './stages/CharacterStage'
import ChallengeStage from './stages/ChallengeStage'
import StrategyStage from './stages/StrategyStage'
import SceneStage from './stages/SceneStage'
import CritiqueStage from './stages/CritiqueStage'

const App = async () => {
  const engine = await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC")
  const useLanguage
    : (prompt: string) => string
    = (prompt) => {
      const [response, setResponse] = useState('')

      useEffect(() => {
        (async () => {
          // TODO: Note that you need to prompt the model to answer in JSON either in
          // user's message or the system prompt
          const request: language.ChatCompletionRequest = {
            stream: false, n: 1, max_tokens: 128,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            response_format: { type: "json_object" } as language.ResponseFormat,
          }
          await engine.chatCompletion(request)
          setResponse(
            JSON.parse(
              await engine.getMessage()
            ))
        })()
      })

      return response
    }
  //////////////////////////////////

  const [character, setCharacter] = useState([ /* {characterName, description} */])
  const [challenge, setChallenge] = useState([ /* {challengeName, description} */])
  const [scenes, setScenes] = useState({
    /* [challengeName]: {[characterName]: {strategyDescription, sceneText, sceneCritique}} */
  })
  const [CurrentStage, setStage] = useState(() => CharacterStage as React.FC<any>)

  return <>
    <h1>Preposterous Gauntlet</h1>
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