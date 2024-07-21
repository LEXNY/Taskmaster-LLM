import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

import CharacterStage from './stages/CharacterStage'

const chatCompletion = () => 'hi' // TODO
const getMessage = () => 'hi' // TODO
const engie = {chatCompletion, getMessage} // TODO

const useLanguage
= (engine) => {
  const [response, setResponse] = useState('')

  const query = async (prompt) => {
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
    // TODO: temporary error shim
    try { JSON.parse(engine.getMessage()) }
    catch { engine.getMessage = () => '{"description": "error"}' }
    setResponse(
      JSON.parse(
        await engine.getMessage()
      ))
  }

  return {query, response}
}

const App = () => {
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    setEngine(engie) // TODO
    return // TODO
    (async () => {
      setEngine(await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC"))
    })()
  })
  const {query, response} = useLanguage(engine)

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
  <p>Loading...</p>
}

export default App