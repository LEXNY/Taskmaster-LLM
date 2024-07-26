import { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'

export const useLanguage = () => {
  const [response, setResponse] = useState('')
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      // TODO setEngine(await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC"))
    })()
    setEngine('TODO')
  })

  const query = async (content) => {
    setResponse(content); return 'TODO' // TODO

    while (true) {
      try {
        await engine.chatCompletion({
          response_format: { type: "json_object" }, stream: false,
          messages: [{ role: "user", content }],
        })
        const message = await engine.getMessage()
        console.log("MESSAGE: ", message)
        const response = JSON.parse(message)
        setResponse(response)
        break
      } catch (_) { }
    }
  }

  return { ready: engine !== undefined, query, response }
}
