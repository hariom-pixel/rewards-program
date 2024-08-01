import React from 'react'
import './Transaction.css'
import { calculateRewardPoints } from '../../utils/calculateRewards'
import { UI_TEXT } from '../../constants/commonConstants'
import { TRANSACTION_TABLE_HEADERS } from '../../constants/tableConstants'

const TransactionTable = ({ transactions }) => (
  <>
    <h2>{UI_TEXT.transactionsTitle}</h2>
    <table className='transactions-table'>
      <thead>
        <tr>
          <th>{TRANSACTION_TABLE_HEADERS.transactionId}</th>
          <th>{TRANSACTION_TABLE_HEADERS.customerName}</th>
          <th>{TRANSACTION_TABLE_HEADERS.purchaseDate}</th>
          <th>{TRANSACTION_TABLE_HEADERS.product}</th>
          <th>{TRANSACTION_TABLE_HEADERS.price}</th>
          <th>{TRANSACTION_TABLE_HEADERS.rewardPoints}</th>
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
