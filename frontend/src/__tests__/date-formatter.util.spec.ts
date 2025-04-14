import { formatDate } from './../utils/date-formatter.util'
import { describe, it, expect } from 'vitest'

describe('formatDate', () => {
  it('should format an ISO date string to "MMM D, YYYY" (en-US)', () => {
    const input = '2023-12-25T00:00:00.000Z'
    const output = formatDate(input)
    expect(output).toBe('Dec 25, 2023')
  })

  it('should handle another valid ISO string', () => {
    const input = '2025-04-12T15:30:00.000Z'
    const output = formatDate(input)
    expect(output).toBe('Apr 12, 2025')
  })

  it('should return "Invalid Date" for invalid input', () => {
    const input = 'invalid-date'
    const output = formatDate(input)
    expect(output).toBe('Invalid Date')
  })
})
