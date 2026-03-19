/**
 * GameScreen component - Placeholder for game in progress
 * This is a minimal placeholder; full game logic is out of scope for MAF-21
 */

import { LanguageSwitch } from './LanguageSwitch'

interface GameScreenProps {
  onEnd?: () => void
}

export function GameScreen({ onEnd = () => {} }: GameScreenProps) {
  return (
    <div className="game-screen">
      <header className="game-header">
        <div className="game-header-left">
          <button className="reset-btn" onClick={onEnd} title="End game and return to welcome">
            🏠 Home
          </button>
        </div>
        <LanguageSwitch />
      </header>

      <main className="game-main">
        <div className="game-placeholder">
          <div className="game-placeholder-icon">🎮</div>
          <h1 className="game-placeholder-title">Game in Progress</h1>
          <p className="game-placeholder-text">
            Full game logic coming soon in future sprints.
          </p>
          <button
            className="end-game-btn"
            onClick={onEnd}
            title="End game and return to welcome screen"
          >
            End Game
          </button>
        </div>
      </main>
    </div>
  )
}
