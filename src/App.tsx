import { useState } from 'react'
import './App.css'
import { ScreenType } from './types'
import { WelcomeScreen, SetupScreen } from './components'

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(
    ScreenType.WELCOME
  )

  const handlePlayClick = () => {
    setCurrentScreen(ScreenType.SETUP)
  }

  const handleBackClick = () => {
    setCurrentScreen(ScreenType.WELCOME)
  }

  return (
    <div className="app">
      <div className="app-container">
        {currentScreen === ScreenType.WELCOME && (
          <WelcomeScreen onPlay={handlePlayClick} />
        )}
        {currentScreen === ScreenType.SETUP && (
          <SetupScreen onBack={handleBackClick} />
        )}
      </div>
    </div>
  )
}

export default App
