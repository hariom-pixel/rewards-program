import React from 'react'
import { render, screen } from '@testing-library/react'
import TransactionTable from './Transaction'

// Sample transactions
const transactions = [
  {
    transactionId: 1,
    customerName: 'Bob',
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

test('renders TransactionsTable with correct headers and data', () => {
  render(<TransactionTable transactions={transactions} />)

  // Check table headers
  expect(screen.getByText('Transaction ID')).toBeInTheDocument()
  expect(screen.getByText('Customer Name')).toBeInTheDocument()
  expect(screen.getByText('Purchase Date')).toBeInTheDocument()
  expect(screen.getByText('Purchased Product')).toBeInTheDocument()
  expect(screen.getByText('Price')).toBeInTheDocument()
  expect(screen.getByText('Reward Points')).toBeInTheDocument()

  // Check transaction data
  transactions.forEach((transaction) => {
    expect(
      screen.getByText(transaction.transactionId.toString())
    ).toBeInTheDocument()
    expect(screen.getByText(transaction.customerName)).toBeInTheDocument()
    expect(screen.getByText(transaction.purchaseDate)).toBeInTheDocument()
    expect(screen.getByText(transaction.product)).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`\\$\\s*${transaction.price.toFixed(2)}`))
    ).toBeInTheDocument()
    expect(
      screen.getByText(transaction.rewardPoints.toString())
    ).toBeInTheDocument()
  })
})
