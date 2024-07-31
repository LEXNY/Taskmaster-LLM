import React, { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import ReactDOM from 'react-dom/client'
import CharacterStage from './stages/CharacterStage'
import { useLanguage } from './hooks/useLanguage'

import './index.css'

const NullScene = () => "Downloading acerbic wit..."

export const App = () => {
  const [Scene, lazySetScene] = useState(() => NullScene)
  const setScene = (scene) => lazySetScene(() => scene)

  const [gameState, setGameState] = useImmer({
    protagonist: '',
    antagonists: {},
    challenge: '',
  })

  const query = useLanguage(setGameState)
  useEffect(() => { if (query && Scene === NullScene) setScene(CharacterStage) })

  return <Scene
    // framework
    setScene={setScene} query={query}
    // game
    gameState={gameState} setGameState={setGameState}
  />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
