import React, { useState, useEffect } from 'react'
import { fetchTransactions } from '../api'
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
        const data = await fetchTransactions()
        setTransactions(data)

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
      } finally {
        setLoading(false)
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