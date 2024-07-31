import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { fetchTransactions } from './api'

// Mock the API
jest.mock('./api', () => ({
  fetchTransactions: jest.fn(),
}))

const mockTransactions = [
  {
    transactionId: 1,
    customerName: 'Alice',
    purchaseDate: '2024-01-15',
    product: 'Laptop',
    price: 120,
    rewardPoints: 90,
  },
  {
    transactionId: 2,
    customerName: 'Alice',
    purchaseDate: '2024-02-20',
    product: 'Headphones',
    price: 80,
    rewardPoints: 30,
  },
]

test('renders App and fetches data', async () => {
  fetchTransactions.mockResolvedValue(mockTransactions)

  render(<App />)

  // Wait for data to be fetched and components to render
  await waitFor(() => {
    expect(screen.getByText('Transaction ID')).toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.getByText('90')).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.getByText('Total Reward Points')).toBeInTheDocument()
  })
})
