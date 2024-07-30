import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import CharacterStage from './stages/CharacterStage'
import { query } from './hooks/useLanguage'
import * as language from '@mlc-ai/web-llm'


export const App = () => {
  const [engine, setEngine] = useState(undefined)
  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"))
    })()
  }, [1])

  const [Scene, lazySetScene] = useState(() => () => "Downloading acerbic wit...")
  const setScene = (scene) => lazySetScene(() => scene)

  useEffect(() => { if (engine) setScene(CharacterStage) }, [engine])

  const [characters, setCharacters] = useState({})

  return <Scene
    // framework
    setScene={setScene}
    query={(q, schematic, callback) => query(q, schematic, callback, engine)}
    // game
    characters={characters} setCharacters={setCharacters}
  />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
