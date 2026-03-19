/**
 * WelcomeScreen component for the game welcome/home screen
 * Features: Game title, illustration, Play button, How to Play link, language switch
 */

import { LanguageSwitch } from './LanguageSwitch'

interface WelcomeScreenProps {
  onPlay?: () => void
  onHowToPlay?: () => void
  onLanguageChange?: (lang: string) => void
}

export function WelcomeScreen({
  onPlay = () => {},
  onHowToPlay = () => {},
  onLanguageChange = () => {},
}: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      {/* Header with language switch */}
      <header className="welcome-header">
        <LanguageSwitch onLanguageChange={onLanguageChange} />
      </header>

      {/* Main content */}
      <main className="welcome-main">
        {/* Subtitle badge */}
        <div className="subtitle-badge">The Ultimate Deception</div>

        {/* Game title */}
        <h1 className="game-title">MAFIA</h1>

        {/* Tagline */}
        <p className="game-tagline">
          Trust no one. Suspect everyone. Find the killers before it's too late.
        </p>

        {/* Illustration */}
        <div className="illustration-container">
          <img
            src="./images/welcome-illustration.png"
            alt="Mafia Card Party illustration"
            className="illustration"
          />
        </div>

        {/* Tag chips */}
        <div className="tag-chips">
          <span className="tag-chip">👥 4–16 Players</span>
          <span className="tag-chip">⚙️ Pro Rules</span>
          <span className="tag-chip">🏆 Ranked</span>
        </div>

        {/* Call to action buttons */}
        <div className="cta-section">
          <button className="play-btn" onClick={onPlay}>
            ▶ PLAY NOW
          </button>

          <button className="how-to-play-btn" onClick={onHowToPlay}>
            <span className="how-to-play-icon">?</span>
            <span>How to play</span>
            <span className="how-to-play-chevron">›</span>
          </button>
        </div>

        {/* Footer legal */}
        <p className="legal-text">
          By joining, you agree to our{' '}
          <span className="legal-link">Fair Play Policy</span> and{' '}
          <span className="legal-link">Terms of Service</span>.
        </p>
      </main>
    </div>
  )
}
