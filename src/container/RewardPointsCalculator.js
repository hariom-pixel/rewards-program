import React, { useState, useEffect } from 'react'
import { fetchTransactions } from '../services/api'
import log from '../logger'
import TransactionTable from '../components/Transaction/Transaction'
import MonthlyRewardsTable from '../components/MonthlyRewards/MonthlyRewards'
import TotalRewardsTable from '../components/TotalRewards/TotalRewards'
import LoadingSpinner from '../components/Loader/Loader'
import {
  calculateMonthlyRewards,
  calculateTotalRewards,
  getLatestThreeMonthsTransactions,
} from '../utils/calculateRewards'
import { TRANSACTION } from '../constants/commonConstants'

export const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([])
  const [monthlyRewards, setMonthlyRewards] = useState([])
  const [totalRewards, setTotalRewards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCustomerData = async () => {
      try {
        setLoading(true)
        log.info(TRANSACTION.TRANSACTION_INFO)
        let data = await fetchTransactions()
        // record of every transaction during a three month period
        data = getLatestThreeMonthsTransactions(data)
        // sort total transaction by customer name alphabetically
        data.sort((a, b) => {
          if (!a.customerName) return 1
          if (!b.customerName) return -1
          return a.customerName.localeCompare(b.customerName)
        })
        // set transactions in transactions state variable
        setTransactions(data)
        log.debug(TRANSACTION.TRANSACTION_SUCCESS, data)

        // Fetch monthly rewards
        const monthlyRewardsData = Object.values(calculateMonthlyRewards(data))
        // Fetch total rewards
        const totalRewards = calculateTotalRewards(data)
        // set monthly and total rewards
        setMonthlyRewards(monthlyRewardsData)
        setTotalRewards(totalRewards)
      } catch (err) {
        setError(TRANSACTION.TRANSACTION_ERROR)
        log.error(TRANSACTION.TRANSACTION_ERROR, err)
      } finally {
        setLoading(false)
        log.info(TRANSACTION.TRANSACTION_SUCCESS)
      }
    }
    loadCustomerData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <div>{error}</div>

  return (
    <>
      <TransactionTable transactions={transactions} />
      <MonthlyRewardsTable rewards={monthlyRewards} />
      <TotalRewardsTable totalRewards={totalRewards} />
    </>
  )
}
