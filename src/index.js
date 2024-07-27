import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import CharacterStage from './stages/CharacterStage'
import { useLanguage } from './hooks/useLanguage'


export const App = () => {
  const [Scene, lazySetScene] = useState(() => () => "Downloading acerbic wit...")
  const setScene = (scene) => lazySetScene(() => scene)

  const [characters, setCharacters] = useState({})
  const [challenge, setChallenge] = useState('')

  const { ready, query, response } = useLanguage()
  useEffect(() => { if (ready) setScene(CharacterStage) }, [ready])

  return <article>
    <h1>Preposterous Gauntlet</h1>
    <Scene
      // framework
      setScene={setScene}
      query={query} response={response}
      // game
      characters={characters} setCharacters={setCharacters}
      challenge={challenge} setChallenge={setChallenge}
    />
  </article>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
