import React, { useEffect, useState } from 'react'
import DATA from './data';

function App() {
  const [answer, setAnswer] = useState('')
  const [words, setWords] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [enter, setEnter] = useState(false)

  //Sets new to be guessed word
  useEffect(() => {
    setAnswer(DATA[Math.floor(Math.random() * DATA.length)])
  }, [])

  const addToWords = () => {
    const nullIndex = words.indexOf(null)
    if (nullIndex === -1 || currentGuess.trim() === '') return;
    console.log("nullIndex ", nullIndex)
    setWords(prevWords => [
      ...prevWords.slice(0, nullIndex),
      currentGuess,
      ...prevWords.slice(nullIndex + 1)
    ])
    console.log("Words", words)
  }

  //Handles event and performs add or delete operations on currentGuess word
  const handleKeys = (event) => {
    if(currentGuess.length > 5) return;
    const pattern = /^[a-zA-Z]$/g
    const key = event.key
    if (key.match(pattern))
      setCurrentGuess(guess => guess + key)
    else if (key.match("Backspace")) {
      console.log("Backspace Pressed")
      setCurrentGuess(guess => guess.slice(0, -1))
      console.log("Enter Pressed")
    } else if (key.match("Enter")) {
      console.log("Enter Pressed")
      setEnter(true)
      // setCurrentGuess("")
      // console.log(words)
    }
  }

  useEffect(() => {
    addToWords()
    setEnter(false)
    setCurrentGuess("")
  }, [enter])

  //Sets events on all the keys.
  useEffect(() => {
    window.addEventListener('keydown', handleKeys)
    return () => window.addEventListener('keydown', handleKeys)
  }, [])

  return (
    <div className="App">
      Wordle game
      <div>{answer}</div>
      <div>{currentGuess}</div>
      <div>{words}</div>
    </div>
  );
}

export default App;
