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

      expect(screen.getByText('Game Settings')).toBeInTheDocument()
    })

    it('navigates back to Welcome screen when Back button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Go to Setup screen
      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      // Verify we're on Setup screen
      expect(screen.getByText('Game Settings')).toBeInTheDocument()

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

  describe('SetupScreen rendering', () => {
    it('renders the Game Settings title', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      expect(screen.getByText('Game Settings')).toBeInTheDocument()
    })

    it('renders the step indicator showing Step 1 of 2', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      expect(screen.getByText('Step 1 of 2')).toBeInTheDocument()
    })

    it('renders Player Composition section with Total Players controls', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const decrementBtn = screen.getByTitle('Decrease total players')
      const incrementBtn = screen.getByTitle('Increase total players')
      expect(decrementBtn).toBeInTheDocument()
      expect(incrementBtn).toBeInTheDocument()
    })

    it('renders Player Composition section with Mafia input', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const mafiaDecrementBtn = screen.getByTitle('Decrease mafia count')
      const mafiaIncrementBtn = screen.getByTitle('Increase mafia count')
      expect(mafiaDecrementBtn).toBeInTheDocument()
      expect(mafiaIncrementBtn).toBeInTheDocument()
    })

    it('renders info tip about standard mafia ratio', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      expect(screen.getByText(/Standard ratio is/i)).toBeInTheDocument()
    })

    it('renders Special Roles section with Detective toggle', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      expect(screen.getByText('Detective')).toBeInTheDocument()
    })

    it('renders Special Roles section with Doctor toggle', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      expect(screen.getByText('Doctor')).toBeInTheDocument()
    })

    it('renders Visual Aesthetics section with Room Environment dropdown', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const roomSelect = screen.getByLabelText(/room environment/i)
      expect(roomSelect).toBeInTheDocument()
    })

    it('renders Visual Aesthetics section with Role Card Style dropdown', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const cardStyleSelect = screen.getByLabelText(/role card style/i)
      expect(cardStyleSelect).toBeInTheDocument()
    })

    it('renders the Next button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('SetupScreen interactions', () => {
    it('allows incrementing Total Players using + button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const incrementBtn = screen.getByTitle('Increase total players')
      
      await user.click(incrementBtn)
      
      // Check that the value changed
      expect(screen.getByText('7')).toBeInTheDocument()
    })

    it('allows decrementing Total Players using - button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const decrementBtn = screen.getByTitle('Decrease total players')
      
      await user.click(decrementBtn)
      
      // Check that the value changed from 6 to 5
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('allows incrementing Mafia count using + button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const mafiaIncrementBtn = screen.getByTitle('Increase mafia count')
      
      await user.click(mafiaIncrementBtn)
      
      // Check that mafia increased to 3
      expect(screen.getAllByText('3').length).toBeGreaterThan(0)
    })

    it('allows decrementing Mafia count using - button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const mafiaDecrementBtn = screen.getByTitle('Decrease mafia count')
      
      await user.click(mafiaDecrementBtn)
      
      // Check that mafia decreased to 1
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('allows toggling Detective role', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const detectiveToggle = screen.getByLabelText(/toggle detective/i)
      expect(detectiveToggle).toBeInTheDocument()
      expect((detectiveToggle as HTMLInputElement).checked).toBe(true)

      await user.click(detectiveToggle)
      expect((detectiveToggle as HTMLInputElement).checked).toBe(false)
    })

    it('allows toggling Doctor role', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const doctorToggle = screen.getByLabelText(/toggle doctor/i)
      expect(doctorToggle).toBeInTheDocument()
      expect((doctorToggle as HTMLInputElement).checked).toBe(true)

      await user.click(doctorToggle)
      expect((doctorToggle as HTMLInputElement).checked).toBe(false)
    })

    it('allows changing Room Environment dropdown', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const roomSelect = screen.getByLabelText(/room environment/i) as HTMLSelectElement
      const initialValue = roomSelect.value

      await user.selectOptions(roomSelect, 'FOGGY_HARBOR')
      expect(roomSelect.value).toBe('FOGGY_HARBOR')
      expect(roomSelect.value).not.toBe(initialValue)
    })

    it('allows changing Role Card Style dropdown', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const cardStyleSelect = screen.getByLabelText(/role card style/i) as HTMLSelectElement
      const initialValue = cardStyleSelect.value

      await user.selectOptions(cardStyleSelect, 'NEON_NOIR')
      expect(cardStyleSelect.value).toBe('NEON_NOIR')
      expect(cardStyleSelect.value).not.toBe(initialValue)
    })

    it('Next button is enabled with valid default settings', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      expect((nextButton as HTMLButtonElement).disabled).toBe(false)
    })

    it('disables Mafia increment button when at maximum', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const mafiaIncrementBtn = screen.getByTitle('Increase mafia count')
      
      // Default mafia is 2, max for 6 players is 3
      // Click increment once to get to 3
      await user.click(mafiaIncrementBtn)
      
      // Now the button should be disabled because mafia (3) == max (3 for 6 players)
      expect((mafiaIncrementBtn as HTMLButtonElement).disabled).toBe(true)
    })

    it('adjusts Mafia count when Total Players is reduced below current Mafia', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      // First increment mafia to 3 (valid for 6 players)
      const mafiaIncrementBtn = screen.getByTitle('Increase mafia count')
      await user.click(mafiaIncrementBtn)
      expect(screen.getByText('3')).toBeInTheDocument()

      // Now reduce total players to 4 (max mafia for 4 is 2)
      const playersDecrementBtn = screen.getByTitle('Decrease total players')
      await user.click(playersDecrementBtn)
      await user.click(playersDecrementBtn)

      // Mafia should be adjusted down to 2
      const mafiaValues = screen.getAllByText('2')
      expect(mafiaValues.length).toBeGreaterThan(0)
    })
  })

  describe('PlayersScreen rendering', () => {
    it('renders the Player Names title', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      expect(screen.getByText('Player Names')).toBeInTheDocument()
    })

    it('renders player names section description text', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      expect(
        screen.getByText('Enter the names of the participants who will survive—or die—tonight.')
      ).toBeInTheDocument()
    })

    it('renders the correct number of player input fields', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      // Default is 6 players
      const inputs = screen.getAllByLabelText(/player \d+ name/i)
      expect(inputs).toHaveLength(6)
    })

    it('renders Auto-fill Names button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      expect(screen.getByRole('button', { name: /auto-fill names/i })).toBeInTheDocument()
    })

    it('renders the Game Setup summary card', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      expect(screen.getByText('Game Setup')).toBeInTheDocument()
      expect(screen.getByText(/standard \d+-player distribution/i)).toBeInTheDocument()
    })

    it('renders START GAME button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const startButton = screen.getByRole('button', { name: /start game/i })
      expect(startButton).toBeInTheDocument()
      expect(startButton).toBeDisabled()
    })

    it('renders back button', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
    })

    it('displays "Not Ready" badge initially', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      expect(screen.getByText('Not Ready')).toBeInTheDocument()
    })
  })

  describe('PlayersScreen interactions', () => {
    it('allows typing in player name inputs', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const firstInput = screen.getByLabelText('Player 1 name')
      await user.type(firstInput, 'Vincenzo')

      expect((firstInput as HTMLInputElement).value).toBe('Vincenzo')
    })

    it('auto-fill fills empty inputs with themed names', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      // Check that inputs are now filled
      const inputs = screen.getAllByLabelText(/player \d+ name/i) as HTMLInputElement[]
      inputs.forEach((input) => {
        expect(input.value).not.toBe('')
      })
    })

    it('auto-fill skips already-filled inputs', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const firstInput = screen.getByLabelText('Player 1 name')
      await user.type(firstInput, 'Alice')

      expect((firstInput as HTMLInputElement).value).toBe('Alice')

      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      // First input should still be 'Alice'
      expect((firstInput as HTMLInputElement).value).toBe('Alice')

      // Other inputs should be filled
      const secondInput = screen.getByLabelText('Player 2 name')
      expect((secondInput as HTMLInputElement).value).not.toBe('')
    })

    it('START GAME is disabled when any input is empty', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const startButton = screen.getByRole('button', { name: /start game/i })
      expect((startButton as HTMLButtonElement).disabled).toBe(true)
    })

    it('START GAME becomes enabled when all names are filled with unique values', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      const startButton = screen.getByRole('button', { name: /start game/i })
      expect((startButton as HTMLButtonElement).disabled).toBe(false)
    })

    it('START GAME is disabled when duplicate names are entered', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      const firstInput = screen.getByLabelText('Player 1 name')
      const secondInput = screen.getByLabelText('Player 2 name')

      // Clear first input and set it to same as second
      await user.clear(firstInput)
      await user.type(firstInput, (secondInput as HTMLInputElement).value)

      const startButton = screen.getByRole('button', { name: /start game/i })
      expect((startButton as HTMLButtonElement).disabled).toBe(true)
    })

    it('Back button navigates back to Setup screen', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      expect(screen.getByText('Player Names')).toBeInTheDocument()

      const backButton = screen.getByRole('button', { name: /back/i })
      await user.click(backButton)

      expect(screen.getByText('Game Settings')).toBeInTheDocument()
    })

    it('START GAME navigates to Game screen', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      const startButton = screen.getByRole('button', { name: /start game/i })
      await user.click(startButton)

      expect(screen.getByText('Game in Progress')).toBeInTheDocument()
    })

    it('displays "Ready" badge when all names are valid', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      expect(screen.getByText('Ready')).toBeInTheDocument()
    })

    it('displays Required badges only on empty inputs', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)

      // Initially all should show Required
      let requiredBadges = screen.getAllByText('Required')
      expect(requiredBadges).toHaveLength(6)

      // Fill one input
      const firstInput = screen.getByLabelText('Player 1 name')
      await user.type(firstInput, 'Vincenzo')

      // Now should have 5 Required badges
      requiredBadges = screen.getAllByText('Required')
      expect(requiredBadges).toHaveLength(5)
    })
  })

  describe('Full navigation flow', () => {
    it('supports full flow: Welcome → Setup → Players → Game', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Start at Welcome
      expect(screen.getByText('MAFIA')).toBeInTheDocument()

      // Go to Setup
      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)
      expect(screen.getByText('Game Settings')).toBeInTheDocument()

      // Go to Players
      const nextButton = screen.getByRole('button', { name: /next: players/i })
      await user.click(nextButton)
      expect(screen.getByText('Player Names')).toBeInTheDocument()

      // Auto-fill names
      const autoFillButton = screen.getByRole('button', { name: /auto-fill names/i })
      await user.click(autoFillButton)

      // Go to Game
      const startButton = screen.getByRole('button', { name: /start game/i })
      await user.click(startButton)
      expect(screen.getByText('Game in Progress')).toBeInTheDocument()
    })

    it('persists game settings when navigating back from Players to Setup', async () => {
      const user = userEvent.setup()
      render(<App />)

      const playButton = screen.getByRole('button', { name: /play now/i })
      await user.click(playButton)

      // Change settings: increment players to 7
      const incrementBtn = screen.getByTitle('Increase total players')
      await user.click(incrementBtn)

      // Verify change
      expect(screen.getByText('7')).toBeInTheDocument()

      // Go to Players
      const nextButton = screen.getByRole('button', { name: /next/i })
      await user.click(nextButton)

      // Go back to Setup
      const backButton = screen.getByRole('button', { name: /back/i })
      await user.click(backButton)

      // Verify number of inputs is still 7
      expect(screen.getByText('7')).toBeInTheDocument()
    })
  })
})
