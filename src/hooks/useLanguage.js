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

  const query = async (content, schematic) => {
    const system = "You generate JSON-formatted content for a comedy game show application."

    const prompt = content + "Respond only with JSON, using these keys:\n```" +
      JSON.stringify(schematic, null, 2) + "```"
    
    while (true) {
      try {
        await engine.chatCompletion({
          stream: false, response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            // TODO: shot-prompting
            { role: "user", prompt }
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
