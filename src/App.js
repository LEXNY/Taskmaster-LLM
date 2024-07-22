import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

import CharacterStage from './stages/CharacterStage'

const useLanguage = (engine) => {
    const [response, setResponse] = useState('')

    const query = async (prompt) => {
      try {
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
      } catch (description) {
        setResponse(description)
      }
    }

    return { query, response }
  }

const App = () => {
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      // TODO: setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"))
      setEngine(await language.CreateMLCEngine("SmolLM-135M-Instruct-q4f32_1-MLC"))
    })()
  })
  const { query, response } = useLanguage(engine)

  const [scene, setScene] = useState({ description: '', characters: {} })
  const [CurrentStage, setStage] = useState(() => CharacterStage)

  return engine ? <article>
    <h1>Preposterous Gauntlet</h1>
    <CurrentStage
      scene={scene}
      setScene={setScene}
      setStage={setStage}
      query={query}
      response={response}
    />
  </article> :
    <p>Loading... TODO progress percentage</p>
}

export default App