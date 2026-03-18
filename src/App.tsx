import { useState } from 'react'
import './App.css'
import { ScreenType, GameSettings } from './types'
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

  const handleNextClick = (settings: GameSettings) => {
    // TODO: Navigate to Players screen (MAF-21) when implemented
    // For now, just log the settings
    console.log('Game settings configured:', settings)
  }

  return (
    <div className="app">
      <div className="app-container">
        {currentScreen === ScreenType.WELCOME && (
          <WelcomeScreen onPlay={handlePlayClick} />
        )}
        {currentScreen === ScreenType.SETUP && (
          <SetupScreen onBack={handleBackClick} onNext={handleNextClick} />
        )}
      </div>
    </div>
  )
}

export default App
