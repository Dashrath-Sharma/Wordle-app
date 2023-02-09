import React, { useEffect, useState } from 'react'
import DATA from './data';

function App() {
  const [answer, setAnswer] = useState('')
  const [words, setWords] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')

  useEffect(() => {
    setAnswer(DATA[Math.floor(Math.random() * DATA.length)])
  }, [])

  const handleKeys = (event) => {
    const pattern = /^[a-zA-Z]$/g
    const key = event.key
    if(currentGuess.length == 5) return
    if (key.match(pattern))
      setCurrentGuess(guess => guess + key)
    else if (key.match("Backspace"))
      setCurrentGuess(guess => guess.slice(0, -1))
    else if (key.match("Enter"))
      console.log("Enter was pressed")
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeys)
    return () => window.addEventListener('keydown', handleKeys)
  }, [])

  return (
    <div className="App">
      Wordle game
      <div>{answer}</div>
      <div>{currentGuess}</div>
    </div>
  );
}

export default App;
