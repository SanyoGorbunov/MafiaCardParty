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
      '/images/welcome-illustration.png'
    )
  })
})

test.describe('Screen Navigation E2E Tests', () => {
  test('should navigate to Setup screen when Play button is clicked', async ({
    page,
  }) => {
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    const setupTitle = page.locator('h1:has-text("Game Setup")')
    await expect(setupTitle).toBeVisible()

    const setupDescription = page.locator('text=Placeholder setup screen')
    await expect(setupDescription).toBeVisible()
  })

  test('should navigate back to Welcome screen from Setup', async ({ page }) => {
    // Go to Setup
    const playButton = page.locator('button.play-btn')
    await playButton.click()

    // Verify we're on Setup
    const setupTitle = page.locator('h1:has-text("Game Setup")')
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
    const setupTitle = page.locator('h1:has-text("Game Setup")') 

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

test('should have proper page title', async ({ page }) => {
  await expect(page).toHaveTitle('Mafia Card Party')
})
