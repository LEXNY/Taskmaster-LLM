import { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'


// `useLanguage` is used to query the LLM and get responses.
export const useLanguage = () => {
  const [response, setResponse] = useState([])
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"))
    })()
  })

  const query = async (content) => {
    const system = "You generate content for a comedy game show application."
    
    while (true) {
      try {
        await engine.chatCompletion({
          stream: false,
          messages: [
            { role: "system", content: system },
            // TODO: shot-prompting
            { role: "user", content }
          ],
        })
        const message = await engine.getMessage()
        setResponse(message.split("\n"))
        break
      } catch (e) {
        console.log("LLM: retrying...", e)
      }
    }

    // TODO: return response
  }

  return { ready: engine !== undefined, query, response }
}
