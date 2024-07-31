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
} from '../utils/calculateRewards'

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
        log.info('Fetching transactions...')
        const data = await fetchTransactions()
        setTransactions(data)
        log.debug('Transactions fetched:', data)

        // Calculate monthly and total rewards
        const monthlyRewardsData = Object.values(calculateMonthlyRewards(data))
        const totalRewardsData = Object.entries(
          calculateTotalRewards(data)
        ).map(([name, points]) => ({
          customerName: name,
          rewardPoints: points,
        }))

        setMonthlyRewards(monthlyRewardsData)
        setTotalRewards(totalRewardsData)
      } catch (err) {
        setError('Failed to load data')
        log.error('Error fetching transactions:', err)
      } finally {
        setLoading(false)
        log.info('Finished loading data')
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
