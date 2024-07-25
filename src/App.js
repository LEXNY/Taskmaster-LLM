import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

import CharacterStage from './stages/CharacterStage'

const useLanguage = (engine) => {
  const [response, setResponse] = useState('')

  const query = async (prompt) => {
    while(true) {
    try {
      const request = {
        stream: false, n: 1,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      }
      await engine.chatCompletion(request)
      const message = await engine.getMessage()
      console.log("MESSAGE: ", message)
      setResponse(JSON.parse(message))
      break
    } catch (description) {
      console.log("ERROR: ", description)
      setResponse(description)
    }
  }
  }

  return { query, response }
}

const App = () => {
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC"))
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