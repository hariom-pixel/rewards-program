/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { RewardPointsCalculator } from './RewardPointsCalculator'
import { fetchTransactions } from '../services/api'
import {
  calculateMonthlyRewards,
  calculateTotalRewards,
} from '../utils/calculateRewards'

// Mock dependencies
jest.mock('../services/api.js', () => ({
  fetchTransactions: jest.fn(),
}))

jest.mock('../utils/calculateRewards', () => ({
  calculateMonthlyRewards: jest.fn(),
  calculateTotalRewards: jest.fn(),
}))

jest.mock('../components/Transaction/Transaction', () => ({ transactions }) => (
  <div>
    TransactionTable
    {transactions.map((transaction, index) => (
      <div key={index}>
        {transaction.customerName}: {transaction.price}
      </div>
    ))}
  </div>
))

jest.mock(
  '../components/MonthlyRewards/MonthlyRewards',
  () =>
    ({ rewards }) =>
      (
        <div>
          MonthlyRewardsTable
          {rewards.map((reward, index) => (
            <div key={index}>
              {reward.customerName}: {reward.rewardPoints}
            </div>
          ))}
        </div>
      )
)

jest.mock(
  '../components/TotalRewards/TotalRewards',
  () =>
    ({ totalRewards }) =>
      (
        <div>
          TotalRewardsTable
          {totalRewards.map((reward, index) => (
            <div key={index}>
              {reward.customerName}: {reward.rewardPoints}
            </div>
          ))}
        </div>
      )
)

describe('RewardPointsCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state', async () => {
    fetchTransactions.mockResolvedValue([])
    calculateMonthlyRewards.mockReturnValue({})
    calculateTotalRewards.mockReturnValue({})

    await act(async () => {
      render(<RewardPointsCalculator />)
    })
  })

  test('renders error state', async () => {
    fetchTransactions.mockRejectedValue(
      new Error('Error fetching transactions:')
    )

    await act(async () => {
      render(<RewardPointsCalculator />)
    })

    await waitFor(() => {
      expect(
        screen.getByText('Error fetching transactions:')
      ).toBeInTheDocument()
    })
  })

  test('renders data correctly', async () => {
    const mockTransactions = [
      {
        customerId: '1',
        customerName: 'Alice',
        purchaseDate: '2024-07-01',
        price: 120,
      },
      {
        customerId: '2',
        customerName: 'Bob',
        purchaseDate: '2024-07-15',
        price: 75,
      },
    ]

    const mockMonthlyRewards = [
      {
        customerId: '1',
        customerName: 'Alice',
        month: 7,
        year: 2024,
        rewardPoints: 200,
      },
      {
        customerId: '2',
        customerName: 'Bob',
        month: 7,
        year: 2024,
        rewardPoints: 75,
      },
    ]

    fetchTransactions.mockResolvedValue(mockTransactions)
    calculateMonthlyRewards.mockReturnValue({
      'Alice-7-2024': mockMonthlyRewards[0],
      'Bob-7-2024': mockMonthlyRewards[1],
    })
    calculateTotalRewards.mockReturnValue({
      Alice: 200,
      Bob: 75,
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<RewardPointsCalculator />)
    })
  })
})
