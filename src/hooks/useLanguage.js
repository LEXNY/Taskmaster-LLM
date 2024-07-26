import { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

export const useLanguage = () => {
  const [response, setResponse] = useState('')
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC"))
    })()
  })

  const query = async (content) => {
    while (true) {
      console.log('retrying...')
      try {
        await engine.chatCompletion({
          stream: false, n:1, max_tokens: 500,
          messages: [{ role: "user", content }],
        })
        const message = await engine.getMessage()
        setResponse(message)
        break
      } catch (e) {
        console.log("LLM: retrying...", e)
      }
    }
  }

  return { ready: engine !== undefined, query, response }
}
