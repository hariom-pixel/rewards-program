import React from 'react'
import { render, screen } from '@testing-library/react'
import MonthlyRewardsTable from './MonthlyRewards'

describe('MonthlyRewardsTable', () => {
  test('renders the component with rewards', () => {
    const rewards = [
      {
        customerId: '3',
        customerName: 'Alice',
        month: 6,
        year: 2024,
        rewardPoints: 500,
      },
      {
        customerId: '4',
        customerName: 'Bob',
        month: 7,
        year: 2024,
        rewardPoints: 300,
      },
    ]

    render(<MonthlyRewardsTable rewards={rewards} />)

    expect(screen.getByText('Monthly Rewards')).toBeInTheDocument()
    expect(screen.getByText('Customer ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
    expect(screen.getByText('Reward Points')).toBeInTheDocument()

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('June')).toBeInTheDocument()
    expect(screen.getByText(500)).toBeInTheDocument()
  })

  test('renders the component with no rewards', () => {
    render(<MonthlyRewardsTable rewards={[]} />)

    expect(screen.getByText('Monthly Rewards')).toBeInTheDocument()
    expect(screen.getByText('Customer ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.getByText('Reward Points')).toBeInTheDocument()

    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    expect(screen.queryByText('June')).not.toBeInTheDocument()
    expect(screen.queryByText('2024')).not.toBeInTheDocument()
    expect(screen.queryByText('500')).not.toBeInTheDocument()
  })
})
