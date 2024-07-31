import React from 'react'
import './Transaction.css'
import { calculateRewardPoints } from '../../utils/calculateRewards'

const TransactionTable = ({ transactions }) => (
  <>
    <h2>Transactions</h2>
    <table className='transactions-table'>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer Name</th>
          <th>Purchase Date</th>
          <th>Purchased Product</th>
          <th>Price</th>
          <th>Reward Points</th>
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
