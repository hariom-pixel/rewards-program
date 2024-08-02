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
  getPastThreeMonthsTransactions,
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
        data = getPastThreeMonthsTransactions(data)
        // Sort transactions by purchase date in descending order
        const sortedTransactions = data.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        )
        log.info(TRANSACTION.TRANSACTION_SORTED)
        setTransactions(sortedTransactions)
        log.debug(TRANSACTION.TRANSACTION_SUCCESS, data)

        // Calculate monthly and total rewards
        const monthlyRewardsData = Object.values(calculateMonthlyRewards(data))

        const totalRewardsData = Object.entries(
          calculateTotalRewards(data)
        ).map(([name, points]) => ({
          customerName: name,
          rewardPoints: points,
        }))

        // sort total rewards by customer name alphabetically
        const sortedTotalRewards = totalRewardsData.sort((a, b) => {
          if (!a.customerName) return 1
          if (!b.customerName) return -1
          return a.customerName.localeCompare(b.customerName)
        })

        setMonthlyRewards(monthlyRewardsData)
        setTotalRewards(sortedTotalRewards)
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
