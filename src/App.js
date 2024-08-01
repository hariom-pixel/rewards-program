import React from 'react'
import { RewardPointsCalculator } from './container/RewardPointsCalculator'
import './App.css'
import { UI_TEXT } from './constants/commonConstants'

const App = () => {
  return (
    <div>
      <h1>{UI_TEXT.title}</h1>
      <RewardPointsCalculator />
    </div>
  )
}

export default App
