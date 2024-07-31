import React from 'react'
import './MonthlyRewards.css'
import { getMonthName } from '../../utils/helper'

const MonthlyRewardsTable = ({ rewards }) => (
  <>
    <h2>Monthly Rewards</h2>
    <table className='rewards-table'>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Month</th>
          <th>Year</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {rewards?.map(
          ({ customerId, customerName, month, year, rewardPoints }, index) => (
            <tr key={`${customerId}-${month}-${year}-${index}`}>
              <td>{customerId}</td>
              <td>{customerName}</td>
              <td>{getMonthName(month)}</td>
              <td>{year}</td>
              <td>{rewardPoints}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </>
)

export default MonthlyRewardsTable
