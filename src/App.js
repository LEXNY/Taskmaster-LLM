import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'
import CharacterStage from './stages/CharacterStage'


export const useSchematic = schematic => {
  const inputs = {}
  const returns = {inputs}

  for(const key in schematic) {
    // `schematic` is static per component, so this does not violate hook rules.
    const [value, setValue] = useState('')
    const input = <TextField
      value={value}
      placeholder={schematic[key]}
      onChange={e => setValue(e.target.value)}
      sx={{TODO: 'TODO'}}
    />
    inputs[key] = input
    returns[key] = value
  }
}





    // TODO: schematic parameter
const useLanguage = () => {
  const [response, setResponse] = useState('')
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC"))
    })()
  })

  const query = async (content) => {
    while(true) {
    try {
      await engine.chatCompletion({
        response_format: { type: "json_object" }, stream: false,
        messages: [{ role: "user", content }],
      })
      const message = await engine.getMessage()
      console.log("MESSAGE: ", message)
      const response = JSON.parse(message)
      setResponse(newResponse)
      return
    } catch (_) {}
  }

  return { ready: engine !== undefined, query, response }
}}


export default () => {
  // Wrap setStage values in extra functions.  Google "useState component lazy init".
  const [CurrentStage, setStage] = useState(() => () => "Downloading acerbic wit...")
  const [scene, setScene] = useState({ description: '', characters: {} })

  const { ready, query, response } = useLanguage(engine)
  useEffect(() => { if (ready) setStage(() => CharacterStage) }, [ready])

  return <article>
    <h1
      onClick={setStage(() => CharacterStage)}
    >Preposterous Gauntlet</h1>
    <CurrentStage
      scene={scene} setScene={setScene}
      setStage={setStage}
      query={query} response={response}
    />
  </article>
}