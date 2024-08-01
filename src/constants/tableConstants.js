import { COMMON_HEADERS } from './commonConstants'

export const TOTAL_REWARDS_TABLE_HEADERS = {
  ...COMMON_HEADERS,
}

export const MONTHLY_REWARDS_TABLE_HEADERS = {
  customerId: 'Customer ID',
  ...COMMON_HEADERS,
  month: 'Month',
  year: 'Year',
}

export const TRANSACTION_TABLE_HEADERS = {
  transactionId: 'Transaction ID',
  ...COMMON_HEADERS,
  purchaseDate: 'Purchase Date',
  product: 'Purchased Product',
  price: 'Price',
}
