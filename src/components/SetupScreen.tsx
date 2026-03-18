/**
 * SetupScreen component - Game Settings wizard step (Step 1 of 2)
 * Allows users to configure game parameters: player composition, special roles, and visual aesthetics
 */

import { useState } from 'react'
import { GameSettings, RoomEnvironment, RoleCardStyle, DEFAULT_GAME_SETTINGS } from '../types'

interface SetupScreenProps {
  onBack?: () => void
  onNext?: (settings: GameSettings) => void
}

export function SetupScreen({ onBack = () => {}, onNext = () => {} }: SetupScreenProps) {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS)

  // Validation logic
  const isValidTotalPlayers = settings.totalPlayers >= 4 && settings.totalPlayers <= 16
  const isValidMafiaCount = settings.mafiaCount >= 1 && settings.mafiaCount <= Math.floor(settings.totalPlayers / 2)
  const isValid = isValidTotalPlayers && isValidMafiaCount

  const handleTotalPlayersChange = (value: number) => {
    // Clamp mafia count if it exceeds the new limit
    const newMafiaCount = Math.min(settings.mafiaCount, Math.floor(value / 2))
    setSettings({
      ...settings,
      totalPlayers: value,
      mafiaCount: newMafiaCount,
    })
  }

  const handleIncrementPlayers = () => {
    if (settings.totalPlayers < 16) {
      handleTotalPlayersChange(settings.totalPlayers + 1)
    }
  }

  const handleDecrementPlayers = () => {
    if (settings.totalPlayers > 4) {
      handleTotalPlayersChange(settings.totalPlayers - 1)
    }
  }

  const handleMafiaCountChange = (value: number) => {
    setSettings({
      ...settings,
      mafiaCount: value,
    })
  }

  const handleIncrementMafia = () => {
    const maxMafia = Math.floor(settings.totalPlayers / 2)
    if (settings.mafiaCount < maxMafia) {
      handleMafiaCountChange(settings.mafiaCount + 1)
    }
  }

  const handleDecrementMafia = () => {
    if (settings.mafiaCount > 1) {
      handleMafiaCountChange(settings.mafiaCount - 1)
    }
  }

  const handleToggleRole = (role: 'detective' | 'doctor') => {
    if (role === 'detective') {
      setSettings({
        ...settings,
        detectiveEnabled: !settings.detectiveEnabled,
      })
    } else if (role === 'doctor') {
      setSettings({
        ...settings,
        doctorEnabled: !settings.doctorEnabled,
      })
    }
  }

  const handleRoomEnvironmentChange = (value: RoomEnvironment) => {
    setSettings({
      ...settings,
      roomEnvironment: value,
    })
  }

  const handleRoleCardStyleChange = (value: RoleCardStyle) => {
    setSettings({
      ...settings,
      roleCardStyle: value,
    })
  }

  const handleNext = () => {
    if (isValid) {
      onNext(settings)
    }
  }

  return (
    <div className="setup-screen">
      <header className="setup-header">
        <div className="setup-header-left">
          <button className="back-btn" onClick={onBack} title="Back to Welcome">
            ← Back
          </button>
        </div>
      </header>

      <main className="setup-main">
        {/* Title and Step Indicator */}
        <div className="setup-title-section">
          <h1 className="setup-screen-title">Game Settings</h1>
          <div className="setup-step-indicator">
            <span className="step-label">Step 1 of 2</span>
            <div className="step-progress-bar">
              <div className="step-progress-fill" />
            </div>
          </div>
        </div>

        {/* Player Composition Section */}
        <section className="settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon">👥</span>
            <div className="settings-section-text">
              <h2 className="settings-section-title">Player Composition</h2>
              <p className="settings-section-subtitle">Define the scale of your underground conflict.</p>
            </div>
          </div>

          <div className="player-inputs-row">
            <div className="player-input-card">
              <span className="input-card-icon">🔢</span>
              <div className="input-card-content">
                <label className="input-card-label">
                  TOTAL PLAYERS
                </label>
                <div className="input-card-controls">
                  <button
                    className="input-btn-decrement"
                    onClick={handleDecrementPlayers}
                    disabled={settings.totalPlayers <= 4}
                    title="Decrease total players"
                  >
                    −
                  </button>
                  <span className="input-card-value">{settings.totalPlayers}</span>
                  <button
                    className="input-btn-increment"
                    onClick={handleIncrementPlayers}
                    disabled={settings.totalPlayers >= 16}
                    title="Increase total players"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="player-input-card">
              <span className="input-card-icon">🎭</span>
              <div className="input-card-content">
                <label className="input-card-label">
                  MAFIA
                </label>
                <div className="input-card-controls">
                  <button
                    className="input-btn-decrement"
                    onClick={handleDecrementMafia}
                    disabled={settings.mafiaCount <= 1}
                    title="Decrease mafia count"
                  >
                    −
                  </button>
                  <span className="input-card-value">{settings.mafiaCount}</span>
                  <button
                    className="input-btn-increment"
                    onClick={handleIncrementMafia}
                    disabled={settings.mafiaCount >= Math.floor(settings.totalPlayers / 2)}
                    title="Increase mafia count"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="info-tip">
            <span className="info-tip-icon">ℹ️</span>
            <span className="info-tip-text">Standard ratio is 1 Mafia per 3–4 Villagers for balanced gameplay.</span>
          </div>
        </section>

        {/* Special Roles Section */}
        <section className="settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon">🔮</span>
            <div className="settings-section-text">
              <h2 className="settings-section-title">Special Roles</h2>
            </div>
          </div>

          <div className="role-toggle-row">
            <div className="role-toggle-content">
              <span className="role-icon detective-icon">🔍</span>
              <div className="role-text">
                <p className="role-name">Detective</p>
                <p className="role-description">Can investigate one player each</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.detectiveEnabled}
                onChange={() => handleToggleRole('detective')}
                aria-label="Toggle Detective role"
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="role-toggle-row">
            <div className="role-toggle-content">
              <span className="role-icon doctor-icon">💗</span>
              <div className="role-text">
                <p className="role-name">Doctor</p>
                <p className="role-description">Can protect one player from being</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.doctorEnabled}
                onChange={() => handleToggleRole('doctor')}
                aria-label="Toggle Doctor role"
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </section>

        {/* Visual Aesthetics Section */}
        <section className="settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon">🎨</span>
            <div className="settings-section-text">
              <h2 className="settings-section-title">Visual Aesthetics</h2>
            </div>
          </div>

          <div className="select-group">
            <label htmlFor="room-environment" className="select-label">
              ROOM ENVIRONMENT
            </label>
            <select
              id="room-environment"
              value={settings.roomEnvironment}
              onChange={(e) => handleRoomEnvironmentChange(e.target.value as RoomEnvironment)}
              className="select-dropdown"
              aria-label="Room environment"
            >
              <option value={RoomEnvironment.MIDNIGHT_MANSION}>Midnight Mansion</option>
              <option value={RoomEnvironment.FOGGY_HARBOR}>Foggy Harbor</option>
              <option value={RoomEnvironment.CRIMSON_LOUNGE}>Crimson Lounge</option>
            </select>
          </div>

          <div className="select-group">
            <label htmlFor="role-card-style" className="select-label">
              ROLE CARD STYLE
            </label>
            <select
              id="role-card-style"
              value={settings.roleCardStyle}
              onChange={(e) => handleRoleCardStyleChange(e.target.value as RoleCardStyle)}
              className="select-dropdown"
              aria-label="Role card style"
            >
              <option value={RoleCardStyle.VINTAGE_SKETCH_ART}>Vintage Sketch Art</option>
              <option value={RoleCardStyle.NEON_NOIR}>Neon Noir</option>
              <option value={RoleCardStyle.CLASSIC_PORTRAITS}>Classic Portraits</option>
            </select>
          </div>
        </section>

        {/* Next Button and Helper Text */}
        <div className="setup-footer">
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={!isValid}
            title={isValid ? 'Proceed to Players step' : 'Complete all fields to proceed'}
          >
            Next: Players <span className="next-chevron">›</span>
          </button>
          <p className="helper-text">FILL ALL FIELDS TO PROCEED</p>
        </div>
      </main>
    </div>
  )
}
