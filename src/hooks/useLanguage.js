import { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'


// `useLanguage` is used to query the LLM and get responses.
export const useLanguage = () => {
  const [response, setResponse] = useState([])
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      // TODO: hypothesis:  every first generation is garbage.
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"))
    })()
  }, [1])

  const query = async (content) => {
    console.log(content)//TODO
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
        setResponse(message)
        break
      } catch (e) {
        console.error(e)
      }
    }
  }

  return { ready: engine !== undefined, query, response }
}
