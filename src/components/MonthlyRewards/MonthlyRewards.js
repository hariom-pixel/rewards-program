import React from 'react'
import './MonthlyRewards.css'
import { getMonthName } from '../../utils/helper'
import { UI_TEXT } from '../../constants/commonConstants'
import { MONTHLY_REWARDS_TABLE_HEADERS } from '../../constants/tableConstants'

const MonthlyRewardsTable = ({ rewards }) => (
  <>
    <h2>{UI_TEXT.monthlyRewardsTitle}</h2>
    <table className='rewards-table'>
      <thead>
        <tr>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.customerId}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.customerName}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.month}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.year}</th>
          <th>{MONTHLY_REWARDS_TABLE_HEADERS.rewardPoints}</th>
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
