import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import CharacterStage from './stages/CharacterStage'
import { useLanguage } from './hooks/useLanguage'


/* TODO
const background = '#2a2a2a'
const container = '#444'
const accent = '#ffcc00'
const text = '#ffffff'

const boxShadow = '2px 2px 0px 0px rgba(255, 0, 0, 0.9)'
const textShadow = '1px 1px 0px rgba(255, 0, 0, 0.9)'

export const stage = {
  borderRadius: 0,
  backgroundColor: container,
  padding: 4,
  maxWidth: 600,
  margin: '40px auto',
  boxShadow,
};

export const headingStyles = {
  fontFamily: 'Bangers, Arial, sans-serif',
  color: accent,
  textShadow,
};

export const inputStyles = {
  borderRadius: 0,
  width: '100%',
  marginBottom: 4,
  backgroundColor: background,
  boxShadow,
};

export const buttonStyles = {
  borderRadius: 0,
  backgroundColor: accent,
  boxShadow,
};

export const body = {
  backgroundColor: background,
  color: '#ffffff',
  fontFamily: 'Arial, sans-serif',
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: accent,
          boxShadow: '2px 2px 0px 0px rgba(255, 0, 0, 0.9)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          width: '100%',
          marginBottom: 4,
          backgroundColor: background,
          boxShadow: '2px 2px 0px 0px rgba(255, 0, 0, 0.9)',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: container,
          padding: 4,
          maxWidth: 600,
          margin: '40px auto',
          boxShadow: '2px 2px 0px 0px rgba(255, 0, 0, 0.9)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Bangers, Arial, sans-serif',
          color: accent,
          textShadow: '1px 1px 0px rgba(255, 0, 0, 0.9)',
        },
      },
    },
  },
});
*/


export const App = () => {
  // `useState` calls functions given as arguments.
  // This is a pattern for lazy loading but throws when putting a component inside.
  const [Scene, lazySetScene] = useState(() => () => "Downloading acerbic wit...")
  const setScene = (scene) => lazySetScene(() => scene)

  const [characters, setCharacters] = useState({})

  const { ready, query, response } = useLanguage()
  useEffect(() => { if (ready) setScene(CharacterStage) }, [ready])

  return <article>
    <h1>Preposterous Gauntlet</h1>
    <Scene
      characters={characters} setCharacters={setCharacters}
      setScene={setScene}
      query={query} response={response}
    />
  </article>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
