import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

test('render App', () => {
  render(<App />)
  expect(screen.getByText('Hello, world!')).toBeDefined
})