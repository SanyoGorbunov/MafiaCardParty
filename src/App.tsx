import { useState, useEffect } from 'react'
import './App.css'
import { ScreenType, GameSettings } from './types'
import { WelcomeScreen, SetupScreen, PlayersScreen, GameScreen } from './components'

// Local storage keys
const STORAGE_KEYS = {
  GAME_SETTINGS: 'mafiaCardParty_gameSettings',
}

// Local storage helpers
function saveGameSettings(settings: GameSettings): void {
  localStorage.setItem(STORAGE_KEYS.GAME_SETTINGS, JSON.stringify(settings))
}

function loadGameSettings(): GameSettings | null {
  const stored = localStorage.getItem(STORAGE_KEYS.GAME_SETTINGS)
  return stored ? JSON.parse(stored) : null
}

function clearGameSettings(): void {
  localStorage.removeItem(STORAGE_KEYS.GAME_SETTINGS)
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(
    ScreenType.WELCOME
  )
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(
    loadGameSettings()
  )

  useEffect(() => {
    // Save settings to local storage whenever they change
    if (gameSettings) {
      saveGameSettings(gameSettings)
    }
  }, [gameSettings])

  const handlePlayClick = () => {
    setCurrentScreen(ScreenType.SETUP)
  }

  const handleBackClick = () => {
    setCurrentScreen(ScreenType.WELCOME)
  }

  const handleNextClick = (settings: GameSettings) => {
    setGameSettings(settings)
    setCurrentScreen(ScreenType.PLAYERS)
  }

  const handleBackToSetup = () => {
    setCurrentScreen(ScreenType.SETUP)
  }

  const handleStartGame = (_playerNames: string[]) => {
    // Player names are passed but not stored here; full game logic TBD
    setCurrentScreen(ScreenType.GAME)
  }

  const handleEndGame = () => {
    clearGameSettings()
    setGameSettings(null)
    setCurrentScreen(ScreenType.WELCOME)
  }

  return (
    <div className="app">
      <div className="app-container">
        {currentScreen === ScreenType.WELCOME && (
          <WelcomeScreen onPlay={handlePlayClick} />
        )}
        {currentScreen === ScreenType.SETUP && (
          <SetupScreen
            onBack={handleBackClick}
            onNext={handleNextClick}
            initialSettings={gameSettings || undefined}
          />
        )}
        {currentScreen === ScreenType.PLAYERS && gameSettings && (
          <PlayersScreen
            settings={gameSettings}
            onBack={handleBackToSetup}
            onStart={handleStartGame}
          />
        )}
        {currentScreen === ScreenType.GAME && (
          <GameScreen onEnd={handleEndGame} />
        )}
      </div>
    </div>
  )
}

export default App

