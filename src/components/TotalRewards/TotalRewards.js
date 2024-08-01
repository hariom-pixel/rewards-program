import React from 'react'
import './TotalRewards.css'
import { UI_TEXT } from '../../constants/commonConstants'
import { TOTAL_REWARDS_TABLE_HEADERS } from '../../constants/tableConstants'

const TotalRewardsTable = ({ totalRewards }) => (
  <>
    <h2>{UI_TEXT.rewardsTitle}</h2>
    <table className='total-rewards-table'>
      <thead>
        <tr>
          <th>{TOTAL_REWARDS_TABLE_HEADERS['customerName']}</th>
          <th>{TOTAL_REWARDS_TABLE_HEADERS['rewardPoints']}</th>
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
