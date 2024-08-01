import React from 'react'
import './MonthlyRewards.css'
import { getMonthName } from '../../utils/helper'
import { UI_TEXT } from '../../constants/commonConstants'
import { MONTHLY_REWARDS_TABLE_HEADERS } from '../../constants/tableConstants'

const MonthlyRewardsTable = ({ rewards }) => (
  <>
    <h2>{UI_TEXT.MONTHLY_REWARDS_TITLE}</h2>
    <table className='rewards-table'>
      <thead>
        <tr>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.CUSTOMER_ID}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.CUSTOMER_NAME}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.MONTH}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.YEAR}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.REWARD_POINTS}</th>
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
