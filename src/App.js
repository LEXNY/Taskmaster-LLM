import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

import CharacterStage from './stages/CharacterStage'

const useLanguage = (engine) => {
    const [response, setResponse] = useState('')

    if(!engine) return { query: () => {}, response }

    const query = async (content) => {
      try {
        const request = {
          stream: false, n: 1, max_tokens: 128,
          messages: [{ role: "user", content }],
          response_format: { type: "json_object" },
        }
        await engine.chatCompletion(request)
        const message = await engine.getMessage()
        console.log("MESSAGE: ", message) // TODO
        setResponse(
          message // TODO
          //JSON.parse( // TODO
          //await engine.getMessage()
          //)
        )
      } catch (e) { setResponse(`ERROR: ${e}`) }
    }

    return { query, response }
  }

const App = () => {
  // component values must be wrapped because of lazy initialization.
  const [CurrentStage, setStage] = useState(() => () => "Downloading acerbic wit...")
  const [scene, setScene] = useState({ description: '', characters: {} })

  const [engine, setEngine] = useState(undefined)
  const { query, response } = useLanguage(engine)

  useEffect(() => {
    (async ()=>{  // TODO: using tiny models for testing
      setEngine(await language.CreateMLCEngine("SmolLM-135M-Instruct-q4f32_1-MLC"))
    })()
  })
  useEffect(() => {
    if(engine) setStage(() => CharacterStage)
  }, [engine])

  return <article>
      <h1>Preposterous Gauntlet</h1>
      <CurrentStage
        scene={scene} setScene={setScene} setStage={setStage} query={query} response={response}
      />
    </article>
}

export default App