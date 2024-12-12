import Flag from './Flag'
import data from '../../data/countries.ts'
import { useState } from 'react'
import '../style.css'

const numCountries = data.length

function App() {
  console.log('Total Number of Countries: ' + numCountries)

  // Keeping track of countries that haven't been done yet
  const [remainingCountries, setRemainingCountries] = useState(data/*data.filter((c, i) => i < 1)*/)

  /* 
  -- Go through state variable
  -- Go through how state changes when user interactions functions are a called ect 
  -- changes are displayed in dom 
  */

  const [countryNum, setCountryNum] = useState(
    Math.floor(Math.random() * remainingCountries.length),
  )

  const selectedCountry = remainingCountries[countryNum]
  
  // const [correctButton, setCorrectButton] = useState(0)

  const [buttonText, setButtonText] = useState(createOptions(selectedCountry.name, 3))
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null)

  const [score, setScore] =useState(0)
  const [lives, setLives] =useState(3)
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('highScore')) || 0)

  const [isGameOver, setIsGameOver] = useState(false)

  const buttonClicked = (buttonNumber: number) => {
    if (selectedButtonId != null) return
    setSelectedButtonId(buttonNumber)
    if(buttonText[buttonNumber] == selectedCountry.name){
      setScore(score + 1)

      if(score+1 >highScore){
        setHighScore(score+1)
        localStorage.setItem('highScore', String(score+1))
      }
    } else{
      setLives(lives-1)
      if (lives-1 <=0){
        setIsGameOver(true)
      }
      console.log(lives) 
    }

  }

  function nextButtonClicked(){
    if(selectedButtonId == null) return

    setSelectedButtonId(null)
    const pool = remainingCountries.length === 1 ? data : remainingCountries
    const remaining = pool.filter((country) => country.name != selectedCountry.name)

    setRemainingCountries(remaining)
    
    const nextCountryNum = Math.floor(Math.random() * remaining.length)

    setCountryNum(nextCountryNum)

   // console.log(remaining[nextCountryNum])

    setButtonText(createOptions(remaining[nextCountryNum].name, 3))
    
  }

  const resetGame =() => {
    setScore(0)
    setLives(3)
    setIsGameOver(false)
    setRemainingCountries(data)
    const randomCountry = Math.floor(Math.random()*numCountries)
    setCountryNum(randomCountry)
    setButtonText(createOptions(data[randomCountry].name, 3))
    setSelectedButtonId(null)
  }
  
  function getButtonClass(num: number){
    if (selectedButtonId == null || (num != selectedButtonId && buttonText[num] != selectedCountry.name))
      return undefined
    else if (buttonText[num] === selectedCountry.name)
      return 'correct'
    else
      return 'wrong'
  }

  return (
    <div className='game-container'>
      <h1>Guess The Flag</h1>
      {isGameOver ? (
        <div className = "game-over">
          <h2>Game Over!</h2>
          {/* <p>Your Score: {score}</p> */}
          <button onClick = {resetGame}>Restart</button>
          </div>
      ): (
        <>
      <div className='flag-container'>
        {/*<p>{selectedCountry.name}</p>*/}
        <Flag code={selectedCountry.code} width='300px'/>
      </div>
      <div className = "answer-buttons">
        <button className={getButtonClass(0)}
          onClick={() => {
            buttonClicked(0)
          }}
        >
          {buttonText[0]}
        </button>
        <button className={getButtonClass(1)}
          onClick={() => {
            buttonClicked(1)
          }}
        >
          {buttonText[1]}
        </button>
        <button className={getButtonClass(2)}
          onClick={() => {
            buttonClicked(2)
          }}
        >
          {buttonText[2]}
        </button>
        <button className='next'
          onClick={() => {
            nextButtonClicked()
          }}
        >
          Next
        </button>
      </div>
      </>
      )}

      <div className ="feedback"></div>
      <br></br>
      {!isGameOver && <div className = "lives">Lives: {lives}</div>}
      <br></br>
      <div className = "score">Score: {score}</div>
      <div className = "high-score">High Score: {highScore}</div>
      
    {!isGameOver && <button className = "reset" onClick={() => {resetGame()}}>Reset</button>}
    
    
      {/*<Flag ></Flag>*/}
    </div>
  )
}

function createOptions(correctName: string, totalOptions: number): string[]{
  const arr = new Array<string>()
  const correctIndex = Math.floor(Math.random() * totalOptions)
  for (let i = 0; i < totalOptions; i++){
    if (i === correctIndex){
      arr.push(correctName)
      continue
    }
    let randomCountryName = getRandomCountryName()
    while (arr.includes(randomCountryName) || randomCountryName === correctName)
      randomCountryName = getRandomCountryName()

    arr.push(randomCountryName)
  }

  return arr
}

function getRandomCountryName() {
  const randomCountryIndex = Math.floor(Math.random() * data.length)
  const randomCountryName = data[randomCountryIndex].name
  return randomCountryName
}

export default App
