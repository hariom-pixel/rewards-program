import { COMMON_HEADERS } from './commonConstants'

export const TOTAL_REWARDS_TABLE_HEADERS = {
  ...COMMON_HEADERS,
}

export const MONTHLY_REWARDS_TABLE_HEADERS = {
  CUSTOMER_ID: 'Customer ID',
  ...COMMON_HEADERS,
  MONTH: 'Month',
  YEAR: 'Year',
}

export const TRANSACTION_TABLE_HEADERS = {
  TRANSACTION_ID: 'Transaction ID',
  ...COMMON_HEADERS,
  PURCHASE_DATE: 'Purchase Date',
  PRODUCT: 'Purchased Product',
  PRICE: 'Price',
}
