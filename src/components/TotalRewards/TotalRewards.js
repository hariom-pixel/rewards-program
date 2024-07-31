import React from 'react'
import './TotalRewards.css'

const TotalRewardsTable = ({ totalRewards }) => (
  <>
    <h2>Total Rewards</h2>
    <table className='total-rewards-table'>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Reward Points</th>
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
