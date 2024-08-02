const rewardRules = [
  { threshold: 50, multiplier: 1 },
  { threshold: 100, multiplier: 2 },
]

// calculate rewards points as per transaction
export const calculateRewardPoints = (purchaseAmount) => {
  const sortedRules = [...rewardRules].sort((a, b) => b.threshold - a.threshold)

  const totalPoints = sortedRules.reduce((totalPoints, rule) => {
    if (purchaseAmount > rule.threshold) {
      const amountInThisRange = purchaseAmount - rule.threshold
      purchaseAmount = rule.threshold
      return totalPoints + amountInThisRange * rule.multiplier
    }
    return totalPoints
  }, 0)

  return Math.floor(totalPoints)
}

// calculate total rewards points as per total transaction
export const calculateTotalRewards = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { customerName, price } = transaction
    const rewardPoints = calculateRewardPoints(price)

    if (!acc[customerName]) {
      acc[customerName] = 0
    }

    acc[customerName] += rewardPoints
    return acc
  }, {})
}

// calculate monthly rewards points as per total transaction in a month
export const calculateMonthlyRewards = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { customerName, purchaseDate, price, customerId } = transaction
    const date = new Date(purchaseDate)
    const month = date.getMonth() + 1 // Months are 0-based
    const year = date.getFullYear()

    const rewardPoints = calculateRewardPoints(price)

    const key = `${customerName}-${month}-${year}`
    if (!acc[key]) {
      acc[key] = {
        customerName,
        customerId,
        month,
        year,
        rewardPoints: 0,
      }
    }

    acc[key].rewardPoints += rewardPoints
    return acc
  }, {})
}

// Function to get transactions from the past three consecutive months
export const getPastThreeMonthsTransactions = (transactions) => {
  // Define the range for the last three consecutive months
  const startDate = new Date(Date.UTC(2023, 11, 1)) // December 1, 2023
  const endDate = new Date(Date.UTC(2024, 1, 29, 23, 59, 59)) // February 29, 2024

  // Filter transactions within the defined range
  const recentTransactions = transactions.filter((transaction) => {
    const purchaseDate = new Date(transaction.purchaseDate)
    return purchaseDate >= startDate && purchaseDate <= endDate
  })
  return recentTransactions
}
