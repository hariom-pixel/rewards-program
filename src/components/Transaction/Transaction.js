import React from 'react'
import './Transaction.css'
import { calculateRewardPoints } from '../../utils/calculateRewards'
import { UI_TEXT } from '../../constants/commonConstants'
import { TRANSACTION_TABLE_HEADERS } from '../../constants/tableConstants'

const TransactionTable = ({ transactions }) => (
  <>
    <h2>{UI_TEXT.TRANSACTIONS_TITLE}</h2>
    <table className='transactions-table'>
      <thead>
        <tr>
          <th>{TRANSACTION_TABLE_HEADERS.TRANSACTION_ID}</th>
          <th>{TRANSACTION_TABLE_HEADERS.CUSTOMER_NAME}</th>
          <th>{TRANSACTION_TABLE_HEADERS.PURCHASE_DATE}</th>
          <th>{TRANSACTION_TABLE_HEADERS.PRODUCT}</th>
          <th>{TRANSACTION_TABLE_HEADERS.PRICE}</th>
          <th>{TRANSACTION_TABLE_HEADERS.REWARD_POINTS}</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(
          ({ transactionId, customerName, purchaseDate, product, price }) => (
            <tr key={transactionId}>
              <td>{transactionId}</td>
              <td>{customerName}</td>
              <td>{purchaseDate}</td>
              <td>{product}</td>
              <td>${price.toFixed(2)}</td>
              <td>{calculateRewardPoints(price)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </>
)

export default TransactionTable
