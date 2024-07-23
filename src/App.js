import React, { useState, useEffect } from 'react'
import * as language from '@mlc-ai/web-llm'
import CharacterStage from './stages/CharacterStage'


// TODO: automatic schematic merging
const useLanguage = (engine) => {
  const [response, setResponse] = useState('')

  const query = async content => {
    try {
      await engine.chatCompletion({
        response_format: { type: "json_object" }, stream: false,
        messages: [{ role: "user", content }],
      })
      const message = await engine.getMessage()
      setResponse( /* TODO: JSON.parse( */ message /* ) */)
    } catch ({ message }) { setResponse(message + ' ---- ' + response) }
  }

  return { response, query }
}

export const useSchematic = schematic => {
  const inputs = {}
  const returns = {inputs}

  for(const key in schematic) {
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

  return returns
}


export default () => {
  // Wrap setStage values in extra functions.  Google "useState component lazy init".
  const [CurrentStage, setStage] = useState(() => () => "Downloading acerbic wit...")
  const [scene, setScene] = useState({ description: '', characters: {} })

  const [engine, setEngine] = useState(undefined)
  const { query, response } = useLanguage(engine)

  useEffect(() => {
    (async () => {  // TODO: using tiny models for testing
      setEngine(await language.CreateMLCEngine("SmolLM-135M-Instruct-q4f32_1-MLC"))
    })()
  })
  useEffect(() => { if (engine) setStage(() => CharacterStage) }, [engine])

  return <article>
    <h1>Preposterous Gauntlet</h1>
    <CurrentStage
      scene={scene} setScene={setScene}
      setStage={setStage}
      query={query} response={response}
    />
  </article>
}