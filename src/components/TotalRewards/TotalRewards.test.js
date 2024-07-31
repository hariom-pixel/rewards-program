import React from 'react'
import { render, screen } from '@testing-library/react'
import TotalRewards from './TotalRewards'

// Sample total rewards
const totalRewards = [
  { customerName: 'Alice', rewardPoints: 150 },
  { customerName: 'Bob', rewardPoints: 30 },
]

test('renders TotalRewards with correct headers and data', () => {
  render(<TotalRewards totalRewards={totalRewards} />)

  // Check headers
  expect(screen.getByText('Customer Name')).toBeInTheDocument()
  expect(screen.getByText('Reward Points')).toBeInTheDocument()

  // Check row data
  expect(screen.getByText('Alice')).toBeInTheDocument()
  expect(screen.getByText('30')).toBeInTheDocument()

  expect(screen.getByText('Bob')).toBeInTheDocument()
  expect(screen.getByText('150')).toBeInTheDocument()
})
