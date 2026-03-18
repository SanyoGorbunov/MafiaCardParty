import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach((): void => {
  cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn() as () => void,
    removeListener: vi.fn() as () => void,
    addEventListener: vi.fn() as () => void,
    removeEventListener: vi.fn() as () => void,
    dispatchEvent: vi.fn() as () => boolean,
  })),
})
