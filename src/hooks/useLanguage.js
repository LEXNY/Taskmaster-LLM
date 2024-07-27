import { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

export const useLanguage = () => {
  const [response, setResponse] = useState('')
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"))
    })()
  })

  const query = async (content) => {
    while (true) {
      try {
        await engine.chatCompletion({
          stream: false,
          messages: [{ role: "user", content }],
        })
        // TODO: split response into lines and render each a <p>
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
