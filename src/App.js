import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

import CharacterStage from './stages/CharacterStage'

const App = async () => {
  const engine = await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC")
  const useLanguage
    = (prompt) => {
      const [response, setResponse] = useState('')

      useEffect(() => {
        (async () => {
          const request = {
            stream: false, n: 1, max_tokens: 128,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            response_format: { type: "json_object" },
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

  const [scene, setScene] = useState({ description: 'TODO', characters: {} })
  const [CurrentStage, setStage] = useState(() => CharacterStage)

  return <article>
    <h1>Preposterous Gauntlet</h1>
    <CurrentStage
      scene={scene}
      setScene={setScene}
      setStage={setStage}
    />
  </article>
}

export default App