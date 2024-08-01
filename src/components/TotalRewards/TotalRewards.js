import React from 'react'
import './TotalRewards.css'
import { UI_TEXT } from '../../constants/commonConstants'
import { TOTAL_REWARDS_TABLE_HEADERS } from '../../constants/tableConstants'

const TotalRewardsTable = ({ totalRewards }) => (
  <>
    <h2>{UI_TEXT.REWARDS_TITLE}</h2>
    <table className='total-rewards-table'>
      <thead>
        <tr>
          <th>{TOTAL_REWARDS_TABLE_HEADERS.CUSTOMER_NAME}</th>
          <th>{TOTAL_REWARDS_TABLE_HEADERS.REWARD_POINTS}</th>
        </tr>
      </thead>
      <tbody>
        {totalRewards.map(({ customerName, rewardPoints }) => (
          <tr key={customerName}>
            <td>{customerName}</td>
            <td>{rewardPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default TotalRewardsTable
