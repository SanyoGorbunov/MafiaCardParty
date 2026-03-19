/**
 * PlayersScreen component - Players identification wizard step (Step 2 of 2)
 * Allows users to enter player names, with auto-fill helper and role summary
 */

import { useState } from 'react'
import { GameSettings } from '../types'
import { LanguageSwitch } from './LanguageSwitch'

interface PlayersScreenProps {
  settings: GameSettings
  onBack?: () => void
  onStart?: (playerNames: string[]) => void
}

const MAFIA_THEMED_NAMES = [
  'Vincenzo',
  'Don Corleone',
  'Soprano',
  'Guzman',
  'Castellano',
  'Luciano',
  'Gambino',
  'Gotti',
  'Bonasera',
  'Rizzi',
  'Barzini',
  'Tattaglia',
  'Clemenza',
  'Tessio',
  'Sollozzo',
  'Luca Brasi',
]

export function PlayersScreen({
  settings,
  onBack = () => {},
  onStart = () => {},
}: PlayersScreenProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(settings.totalPlayers).fill('')
  )

  // Validation logic
  const trimmedNames = playerNames.map((name) => name.trim())
  const allNamesValid = trimmedNames.every((name) => name.length > 0)
  const uniqueNames = new Set(trimmedNames.map((name) => name.toLowerCase()))
  const allNamesUnique = uniqueNames.size === trimmedNames.length
  const isValid = allNamesValid && allNamesUnique

  // Check if there are any empty slots to fill
  const hasEmptySlots = playerNames.some((name) => name.trim() === '')

  // Identify which names are duplicates
  const getDuplicateIndices = () => {
    const nameCounts = new Map<string, number[]>()
    trimmedNames.forEach((name, index) => {
      if (name.length > 0) {
        const lowerName = name.toLowerCase()
        if (!nameCounts.has(lowerName)) {
          nameCounts.set(lowerName, [])
        }
        nameCounts.get(lowerName)!.push(index)
      }
    })
    
    const duplicateSet = new Set<number>()
    nameCounts.forEach((indices) => {
      if (indices.length > 1) {
        indices.forEach((index) => duplicateSet.add(index))
      }
    })
    return duplicateSet
  }

  const duplicateIndices = getDuplicateIndices()

  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const handleAutoFill = () => {
    const newNames = [...playerNames]
    let nameIndex = 0

    for (let i = 0; i < newNames.length; i++) {
      if (newNames[i].trim() === '') {
        // Find the next unused name from MAFIA_THEMED_NAMES
        while (
          nameIndex < MAFIA_THEMED_NAMES.length &&
          newNames.some(
            (n) =>
              n.toLowerCase() ===
              MAFIA_THEMED_NAMES[nameIndex].toLowerCase()
          )
        ) {
          nameIndex++
        }

        if (nameIndex < MAFIA_THEMED_NAMES.length) {
          newNames[i] = MAFIA_THEMED_NAMES[nameIndex]
          nameIndex++
        }
      }
    }

    setPlayerNames(newNames)
  }

  const handleStart = () => {
    if (isValid) {
      onStart(trimmedNames)
    }
  }

  return (
    <div className="players-screen">
      <header className="players-header">
        <div className="players-header-left">
          <button className="back-btn" onClick={onBack} title="Back to Game Settings">
            ← Back
          </button>
        </div>
        <LanguageSwitch />
      </header>

      <main className="players-main">
        {/* Title and Step Indicator */}
        <div className="players-title-section">
          <h1 className="players-screen-title">Identify Players</h1>
          <div className="players-step-indicator">
            <span className="step-label">Step 2 of 2</span>
            <div className="step-progress-bar">
              <div className="step-progress-fill" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Registry Section */}
        <section className="players-section">
          <div className="settings-section-header">
            <span className="settings-section-icon">👥</span>
            <div className="settings-section-text">
              <h2 className="settings-section-title">Player Names</h2>
              <p className="settings-section-subtitle">Enter the names of the participants who will survive—or die—tonight.</p>
            </div>
          </div>

          {/* Auto-fill Button */}
          <button 
            className="autofill-btn" 
            onClick={handleAutoFill} 
            type="button"
            disabled={!hasEmptySlots}
          >
            ✨ Auto-fill Names
          </button>

          {/* Player Name Inputs */}
          <div className="player-inputs-container">
            {playerNames.map((name, index) => (
              <div key={index} className="player-row">
                <div className="player-row-header">
                  <span className="player-row-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <label className="player-row-label">PLAYER NAME</label>
                  {duplicateIndices.has(index) && (
                    <span className="duplicate-badge">Duplicate</span>
                  )}
                  {name.trim() === '' && (
                    <span className="required-badge">Required</span>
                  )}
                </div>
                <input
                  type="text"
                  className="player-name-input"
                  placeholder="Enter name..."
                  value={name}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  aria-label={`Player ${index + 1} name`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Game Setup Summary Card */}
        <section className="game-summary-card">
          <div className="summary-header">
            <div>
              <h3 className="summary-title">Game Setup</h3>
              <p className="summary-subtitle">
                Standard {settings.totalPlayers}-player distribution
              </p>
            </div>
            <span
              className={`ready-badge ${isValid ? 'ready' : 'not-ready'}`}
            >
              {isValid ? 'Ready' : 'Not Ready'}
            </span>
          </div>

          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-icon">👥</span>
              <div className="stat-content">
                <div className="stat-value">{settings.totalPlayers}</div>
                <div className="stat-label">TOTAL PLAYERS</div>
              </div>
            </div>
            <div className="summary-stat">
              <span className="stat-icon">🎭</span>
              <div className="stat-content">
                <div className="stat-value">{settings.mafiaCount}</div>
                <div className="stat-label">MAFIA MEMBERS</div>
              </div>
            </div>
          </div>

          <p className="summary-note">
            Role distribution is optimized for balance. Additional roles:{' '}
            <span className="role-list">
              {[
                settings.detectiveEnabled && 'Detective',
                settings.doctorEnabled && 'Doctor',
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          </p>
        </section>

        {/* Footer Buttons */}
        <div className="players-footer">
          <button
            className="start-btn"
            onClick={handleStart}
            disabled={!isValid}
            title={
              isValid
                ? 'Begin the game'
                : 'Enter all player names to proceed'
            }
          >
            ▷ START GAME
          </button>
        </div>
      </main>
    </div>
  )
}
