import React, { useState, useEffect } from 'react'
import CharacterStage from './stages/CharacterStage'
import { useLanguage } from './hooks/useLanguage'


export default () => {
  // `useState` calls functions given as arguments.
  // This is a pattern for lazy loading but throws when putting a component inside.
  const [Scene, lazySetScene] = useState(() => () => "Downloading acerbic wit...")
  const setScene = (scene) => lazySetScene(() => scene)

  const [characters, setCharacters] = useState({})

  const { ready, query, response } = useLanguage()
  useEffect(() => { if (ready) setScene(CharacterStage) }, [ready])

    console.log(JSON.stringify(Scene.name))
  return <article>
    <h1>Preposterous Gauntlet</h1>
    <Scene
      characters={characters} setCharacters={setCharacters}
      setScene={setScene}
      query={query} response={response}
    />
  </article>
}