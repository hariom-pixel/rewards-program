import React from 'react'
import { render, screen } from '@testing-library/react'
import MonthlyRewardsTable from './MonthlyRewards'

// Sample monthly rewards
// Sample rewards data for testing
const monthlyRewards = [
  {
    customerId: 1,
    customerName: 'Alice',
    month: 'January',
    year: 2024,
    rewardPoints: 100,
  },
  {
    customerId: 2,
    customerName: 'Bob',
    month: 'February',
    year: 2024,
    rewardPoints: 150,
  },
  // Add more reward objects as needed
]

test('renders MonthlyRewardsTable with correct headers and data', () => {
  render(<MonthlyRewardsTable monthlyRewards={monthlyRewards} />)

  // Check headers
  expect(screen.getByText('Customer ID')).toBeInTheDocument()
  expect(screen.getByText('Month')).toBeInTheDocument()
  expect(screen.getByText('Year')).toBeInTheDocument()
  expect(screen.getByText('Reward Points')).toBeInTheDocument()

  // Check if each reward is rendered
  monthlyRewards?.forEach(
    ({ customerId, customerName, month, year, rewardPoints }) => {
      expect(screen.getByText(customerId.toString())).toBeInTheDocument()
      expect(screen.getByText(customerName)).toBeInTheDocument()
      expect(screen.getByText(month)).toBeInTheDocument()
      expect(screen.getByText(year.toString())).toBeInTheDocument()
      expect(screen.getByText(rewardPoints.toString())).toBeInTheDocument()
    }
  )
})
