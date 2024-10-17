import Flag from './Flag'
import data from '../../data/countries.ts'
import { useState } from 'react'
import '../style.css'

const numCountries = data.length

function App() {

  

  const [countryNum, setCountryNum] = useState(
    Math.floor(Math.random() * numCountries),
  )

  const selectedCountry = data[countryNum]
  
  // const [correctButton, setCorrectButton] = useState(0)

  const [buttonText, setButtonText] = useState(createOptions(countryNum, 3))
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null)

  const [score, setScore] =useState(0)

  const buttonClicked = (buttonNumber: number) => {
    if (selectedButtonId != null) return
    setSelectedButtonId(buttonNumber)
    if(buttonText[buttonNumber] == selectedCountry.name){
      setScore(score + 1)
    }
  }

  function nextButtonClicked(){
    if(selectedButtonId == null) return

    setSelectedButtonId(null)

    const nextRandomCountry = Math.floor(Math.random() * numCountries)

    setCountryNum(nextRandomCountry)

    setButtonText(createOptions(nextRandomCountry, 3))
    
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
      <div className='flag'>
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
        <button 
          onClick={() => {
            nextButtonClicked()
          }}
        >
          Next
        </button>
      </div>

      <div className ="feedback"></div>
      <div className = "score">Score: {score}</div>
      {/*<Flag ></Flag>*/}
    </div>
  )
}

function createOptions(correctId: number, totalOptions: number): string[]{
  const arr = new Array<string>()
  const correctIndex = Math.floor(Math.random() * totalOptions)
  for (let i = 0; i < totalOptions; i++){
    if (i === correctIndex){
      arr.push(data[correctId].name)
      continue
    }
    let randomCountryName = getRandomCountryName()
    while (arr.includes(randomCountryName) || randomCountryName === data[correctId].name)
      randomCountryName = getRandomCountryName()

    arr.push(randomCountryName)
  }
  console.log(arr.length)
  return arr
}

function getRandomCountryName() {
  const randomCountryIndex = Math.floor(Math.random() * numCountries)
  const randomCountryName = data[randomCountryIndex].name
  return randomCountryName
}

export default App
