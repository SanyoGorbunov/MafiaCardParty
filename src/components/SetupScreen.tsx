/**
 * SetupScreen placeholder component
 * This is a temporary screen for MAF-19 to test screen transitions.
 * It will be replaced by the actual setup wizard in MAF-20.
 */

interface SetupScreenProps {
  onBack?: () => void
}

export function SetupScreen({ onBack = () => {} }: SetupScreenProps) {
  return (
    <div className="setup-screen">
      <header className="setup-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </header>

      <main className="setup-main">
        <h1 className="screen-title">Game Setup</h1>
        <p className="screen-description">
          Placeholder setup screen for screen transition testing.
        </p>
        <p className="screen-note">
          The actual game setup wizard will be implemented in MAF-20.
        </p>
      </main>
    </div>
  )
}
