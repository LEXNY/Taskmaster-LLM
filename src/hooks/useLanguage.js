import { useEffect, useState } from "react"
import * as language from '@mlc-ai/web-llm'


// TODO: debounce because multiple requests interleave.
export const useLanguage = (setter) => {
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"))
    })()
  }, [])

  if (engine) {
    return async (prompt, schematic, callback) => {
      const strungifiedSchematic = JSON.stringify(schematic)
      while (true) {
        try {
          await engine.chatCompletion({
            stream: false, response_format: { type: "json_object" },
            temperature: 0.75,
            messages: [
              { role: "system", content: "You respond only with JSON." },
              { role: "user", content: `repeat ${strungifiedSchematic}`},
              { role: "assistant", content: strungifiedSchematic },
              { role: "user", content: 'Now use the same property keys, but fill in the values.' + prompt }
            ],
          })
          const message = await engine.getMessage()

          // callback is the API-consumer-provided plan.
          // setter is the `useImmer` setter.
          // JSON.parse(message) is the generated content.
          console.log(`generated: ${message}`)
          const parsedResponse = JSON.parse(message)
          setter(callback(parsedResponse))
          break
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}