import { describe, it, expect } from 'vitest'
import { add, multiply, isEven } from './index'

describe('Utils Functions', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
      expect(add(10, 20)).toBe(30)
    })

    it('adds negative numbers', () => {
      expect(add(-5, 3)).toBe(-2)
      expect(add(-10, -20)).toBe(-30)
    })

    it('returns the first number when adding zero', () => {
      expect(add(5, 0)).toBe(5)
      expect(add(0, 5)).toBe(5)
    })
  })

  describe('multiply', () => {
    it('multiplies two positive numbers', () => {
      expect(multiply(2, 3)).toBe(6)
      expect(multiply(5, 4)).toBe(20)
    })

    it('multiplies with zero', () => {
      expect(multiply(5, 0)).toBe(0)
      expect(multiply(0, 10)).toBe(0)
    })

    it('multiplies negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(-5, -2)).toBe(10)
    })
  })

  describe('isEven', () => {
    it('returns true for even numbers', () => {
      expect(isEven(2)).toBe(true)
      expect(isEven(0)).toBe(true)
      expect(isEven(-4)).toBe(true)
    })

    it('returns false for odd numbers', () => {
      expect(isEven(1)).toBe(false)
      expect(isEven(3)).toBe(false)
      expect(isEven(-5)).toBe(false)
    })
  })
})
