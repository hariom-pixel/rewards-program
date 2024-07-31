const rules = [
  { threshold: 50, multiplier: 1 },
  { threshold: 100, multiplier: 2 },
]

// calculate rewards points as per transaction
export const calculateRewardPoints = (purchaseAmount) => {
  // Sort rules by threshold in ascending order
  rules.sort((a, b) => a.threshold - b.threshold)

  return rules.reduce((totalPoints, rule) => {
    if (purchaseAmount > rule.threshold) {
      const amountInThisRange = Math.min(
        purchaseAmount - rule.threshold,
        rule.threshold
      )
      return totalPoints + amountInThisRange * rule.multiplier
    } else {
      return totalPoints
    }
  }, 0)
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
