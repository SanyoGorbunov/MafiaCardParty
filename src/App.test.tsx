import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('renders the main title', () => {
    render(<App />)
    expect(screen.getByText('Mafia Card Party')).toBeInTheDocument()
  })

  it('renders a button with count', () => {
    render(<App />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button.textContent).toContain('count is 0')
  })

  it('increments count on button click', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button')

    await user.click(button)
    expect(button.textContent).toContain('count is 1')

    await user.click(button)
    expect(button.textContent).toContain('count is 2')
  })

  it('renders read the docs message', () => {
    render(<App />)
    expect(screen.getByText(/click on the vite and react logos/i)).toBeInTheDocument()
  })
})
