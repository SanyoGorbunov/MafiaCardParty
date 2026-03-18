import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Welcome Screen E2E Tests', () => {
  test('should display the Welcome screen on initial load', async ({
    page,
  }) => {
    const title = page.locator('h1:has-text("MAFIA")')
    await expect(title).toBeVisible()
  })

  test('should display the game title "MAFIA"', async ({ page }) => {
    const title = page.locator('h1')
    await expect(title).toContainText('MAFIA')
  })

  test('should display the Play button', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await expect(playButton).toBeVisible()
    await expect(playButton).toBeEnabled()
  })

  test('should display the How to Play button', async ({ page }) => {
    const howToPlayButton = page.locator('button.how-to-play-btn')
    await expect(howToPlayButton).toBeVisible()
    await expect(howToPlayButton).toBeEnabled()
  })

  test('should display the language switch', async ({ page }) => {
    const languageBtn = page.locator('button.language-btn')
    await expect(languageBtn).toBeVisible()
  })

  test('should display the illustration image', async ({ page }) => {
    const illustration = page.locator('img[alt*="illustration"]')
    await expect(illustration).toBeVisible()
    await expect(illustration).toHaveAttribute(
      'src',
      './images/welcome-illustration.png'
    )
  })
})

test.describe('Screen Navigation E2E Tests', () => {
  test('should navigate to Setup screen when Play button is clicked', async ({
    page,
  }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const setupTitle = page.locator('text=Game Settings')
    await expect(setupTitle).toBeVisible()

    // Verify form elements are visible
    const totalPlayersInput = page.locator('#total-players')
    await expect(totalPlayersInput).toBeVisible()
  })

  test('should navigate back to Welcome screen from Setup', async ({ page }) => {
    // Go to Setup
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    // Verify we're on Setup
    const setupTitle = page.locator('text=Game Settings')
    await expect(setupTitle).toBeVisible()

    // Click Back
    const backButton = page.locator('button.back-btn')
    await backButton.click()

    // Verify we're back on Welcome
    const welcomeTitle = page.locator('h1:has-text("MAFIA")')
    await expect(welcomeTitle).toBeVisible()
  })

  test('should allow multiple transitions between screens', async ({
    page,
  }) => {
    const playButton = page.locator('button.play-btn')
    const backButton = page.locator('button.back-btn')
    const welcomeTitle = page.locator('h1:has-text("MAFIA")')
    const setupTitle = page.locator('text=Game Settings')

    // First transition: Welcome -> Setup
    await playButton.click()
    await expect(setupTitle).toBeVisible()

    // Second transition: Setup -> Welcome
    await backButton.click()
    await expect(welcomeTitle).toBeVisible()

    // Third transition: Welcome -> Setup
    await playButton.click()
    await expect(setupTitle).toBeVisible()
  })
})

test.describe('Setup Screen - Game Settings E2E Tests', () => {
  test('should display all sections on Setup screen', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    // Verify Game Settings title
    const title = page.locator('text=Game Settings')
    await expect(title).toBeVisible()

    // Verify step indicator
    const stepIndicator = page.locator('text=Step 1 of 2')
    await expect(stepIndicator).toBeVisible()

    // Verify Player Composition section
    const playerCompositionSection = page.locator('text=PLAYER COMPOSITION')
    await expect(playerCompositionSection).toBeVisible()

    // Verify Special Roles section
    const specialRolesSection = page.locator('text=SPECIAL ROLES')
    await expect(specialRolesSection).toBeVisible()

    // Verify Visual Aesthetics section
    const visualAestheticsSection = page.locator('text=VISUAL AESTHETICS')
    await expect(visualAestheticsSection).toBeVisible()
  })

  test('should display form controls correctly', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    // Check Total Players increment/decrement buttons
    const totalPlayersDecrement = page.locator('button[title="Decrease total players"]')
    const totalPlayersIncrement = page.locator('button[title="Increase total players"]')
    await expect(totalPlayersDecrement).toBeVisible()
    await expect(totalPlayersIncrement).toBeVisible()

    // Check Mafia increment/decrement buttons
    const mafiaDecrement = page.locator('button[title="Decrease mafia count"]')
    const mafiaIncrement = page.locator('button[title="Increase mafia count"]')
    await expect(mafiaDecrement).toBeVisible()
    await expect(mafiaIncrement).toBeVisible()

    // Check Detective toggle
    const detectiveToggle = page.locator('input[aria-label="Toggle Detective role"]')
    await expect(detectiveToggle).toBeVisible()

    // Check Doctor toggle
    const doctorToggle = page.locator('input[aria-label="Toggle Doctor role"]')
    await expect(doctorToggle).toBeVisible()

    // Check dropdowns
    const roomSelect = page.locator('#room-environment')
    await expect(roomSelect).toBeVisible()

    const cardStyleSelect = page.locator('#role-card-style')
    await expect(cardStyleSelect).toBeVisible()
  })

  test('should allow changing player count with buttons', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const incrementBtn = page.locator('button[title="Increase total players"]')
    
    // Get initial value (should be 6)
    let currentValue = await page.locator('.input-card-controls').first().locator('.input-card-value').textContent()
    expect(currentValue?.trim()).toBe('6')

    // Click increment
    await incrementBtn.click()

    // Check new value (should be 7)
    currentValue = await page.locator('.input-card-controls').first().locator('.input-card-value').textContent()
    expect(currentValue?.trim()).toBe('7')
  })

  test('should allow changing mafia count with buttons', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const mafiaIncrementBtn = page.locator('button[title="Increase mafia count"]')
    
    // Get All inputs, second one is Mafia
    const inputValues = page.locator('.input-card-value')
    let mafiaValue = await inputValues.nth(1).textContent()
    expect(mafiaValue?.trim()).toBe('2') // default

    // Click increment
    await mafiaIncrementBtn.click()

    // Check new value
    mafiaValue = await inputValues.nth(1).textContent()
    expect(mafiaValue?.trim()).toBe('3')
  })

  test('should allow toggling roles', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const detectiveToggle = page.locator('input[aria-label="Toggle Detective role"]')
    const isCheckedBefore = await detectiveToggle.isChecked()

    await detectiveToggle.click()
    const isCheckedAfter = await detectiveToggle.isChecked()

    expect(isCheckedBefore).not.toBe(isCheckedAfter)
  })

  test('should allow changing room environment', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const roomSelect = page.locator('#room-environment')
    const initialValue = await roomSelect.inputValue()

    await roomSelect.selectOption('FOGGY_HARBOR')
    const newValue = await roomSelect.inputValue()

    expect(initialValue).not.toBe(newValue)
    expect(newValue).toBe('FOGGY_HARBOR')
  })

  test('should allow changing role card style', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const styleSelect = page.locator('#role-card-style')
    const initialValue = await styleSelect.inputValue()

    await styleSelect.selectOption('NEON_NOIR')
    const newValue = await styleSelect.inputValue()

    expect(initialValue).not.toBe(newValue)
    expect(newValue).toBe('NEON_NOIR')
  })

  test('Next button should be enabled with default settings', async ({ page }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const nextButton = page.locator('button:has-text("Next: Players")')
    await expect(nextButton).toBeEnabled()
  })
})

test('should have proper page title', async ({ page }) => {
  await expect(page).toHaveTitle('Mafia Card Party')
})
