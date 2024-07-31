import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App', async () => {
  render(<App />)
  expect(screen.getByText('Retailer Rewards Program')).toBeInTheDocument()
})
