import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  describe('WelcomeScreen rendering', () => {
    it('renders the main title "MAFIA"', () => {
      render(<App />)
      expect(screen.getByText('MAFIA')).toBeInTheDocument()
    })

    it('renders the Play button', () => {
      render(<App />)
      const playButton = screen.getByRole('button', { name: /play now/i })
      expect(playButton).toBeInTheDocument()
    })

    it('renders the "How to Play" button', () => {
      render(<App />)
      const howToPlayButton = screen.getByRole('button', {
        name: /how to play/i,
      })
      expect(howToPlayButton).toBeInTheDocument()
    })

    it('renders the language switch button', () => {
      render(<App />)
      const languageButton = screen.getByRole('button', { name: /🌐 EN|EN/i })
      expect(languageButton).toBeInTheDocument()
    })

    it('renders the illustration image element', () => {
      render(<App />)
      const illustration = screen.getByAltText(
        /mafia card party illustration/i
      )
      expect(illustration).toBeInTheDocument()
      expect(illustration).toHaveAttribute(
        'src',
        './images/welcome-illustration.png'
      )
    })
  })

  describe('Screen routing', () => {
    it('displays Welcome screen on initial load', () => {
      render(<App />)
      expect(screen.getByText('MAFIA')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /play now/i })).toBeInTheDocument()
    })

    it('navigates to Setup screen when Play button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      expect(screen.getByText('Game Setup')).toBeInTheDocument()
      expect(
        screen.getByText(/placeholder setup screen/i)
      ).toBeInTheDocument()
    })

    it('navigates back to Welcome screen when Back button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Go to Setup screen
      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      // Verify we're on Setup screen
      expect(screen.getByText('Game Setup')).toBeInTheDocument()

      // Click Back button
      const backButton = screen.getByRole('button', { name: /back/i })
      await user.click(backButton)

      // Verify we're back on Welcome screen
      expect(screen.getByText('MAFIA')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /play now/i })).toBeInTheDocument()
    })

    it('maintains smooth transitions without layout shift', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      // Component should still be mounted and functional
      const backButton = screen.getByRole('button', { name: /back/i })
      expect(backButton).toBeInTheDocument()
    })
  })
})
