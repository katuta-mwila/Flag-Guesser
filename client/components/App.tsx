import Flag from './Flag'
import data from '../../data/countries.ts'
import { useState } from '.react'

function App() {
  const numCountries = data.length

  const [countryNum, setCountryNum] = getState(
    Math.floor(Math.random() * numCountries),
  )
  const [correctButton, setCorrectButton] = getState(0)

  const [buttonText, setButtonText] = getState(['', '', ''])

  return (
    <div>
      <h1>App</h1>

      <Flag></Flag>
      <button
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
      </button>
    </div>
  )
}

function buttonClicked(buttonNumber: number) {
  setButtonText
}

function getRandomCountryName(numCountries: number) {
  const randomCountryIndex = Math.floor(Math.random() * numCountries)
  const randomCountryName = data[randomCountryIndex].name
  return randomCountryName
}

export default App
