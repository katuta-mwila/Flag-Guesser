import Flag from './Flag'
import data from '../../data/countries.ts'
import { useState } from 'react'
import '../style.css'

function App() {
  const numCountries = data.length

  // const [countryNum, setCountryNum] = getState(
  //   Math.floor(Math.random() * numCountries),
  // )
  // const [correctButton, setCorrectButton] = getState(0)

  // const [buttonText, setButtonText] = getState(['', '', ''])

  return (
    <div className='game-container'>
      <h1>Guess The Flag</h1>
      <div className='flag'>
        <img src ="/public/images/us.png" width = "300px" alt = "Country Flag (US)" />
      </div>
      <div className = "answer-buttons">
        <button>United States</button>
        <button>France</button>
        <button>Germany</button>
        <button>New Zealand</button>
      </div>

      <div className ="feedback"></div>
      <div className = "score">Score: 0</div>
      {/*<Flag ></Flag>*/}
      {/* <button
        onClick={() => {
          buttonClicked(0)
        }}
      >
        {button[0]}
      </button>
      <button
        onClick={() => {
          buttonClicked(1)
        }}
      >
        {button[1]}
      </button>
      <button
        onClick={() => {
          buttonClicked(2)
        }}
      >
        {button[2]}
      </button> */}
    </div>
  )
}

const buttonClicked = (buttonNumber: number) => {
  if (buttonNumber === correctButton){
    alert('Correct!')
    setScore(score +1)
  } else {
    alert ('Wrong!')
  }
  // setButtonText()
}

function getRandomCountryName(numCountries: number) {
  // const randomCountryIndex = Math.floor(Math.random() * numCountries)
  // const randomCountryName = data[randomCountryIndex].name
  // return randomCountryName
}

export default App
