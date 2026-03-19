/**
 * LanguageSwitch component - Reusable language selector button
 * Used across all screens in the header
 */

interface LanguageSwitchProps {
  onLanguageChange?: (lang: string) => void
}

export function LanguageSwitch({ onLanguageChange = () => {} }: LanguageSwitchProps) {
  return (
    <div className="language-switch">
      <button
        className="language-btn"
        onClick={() => onLanguageChange('EN')}
        title="Language"
      >
        🌐 EN
      </button>
    </div>
  )
}
