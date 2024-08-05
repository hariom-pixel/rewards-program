const rewardRules = [
  { threshold: 50, multiplier: 1 },
  { threshold: 100, multiplier: 2 },
]

// calculate rewards points as per transaction's amount
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
  const totalRewardsData = transactions.reduce((acc, transaction) => {
    const { customerName, price } = transaction
    const rewardPoints = calculateRewardPoints(price)

    if (!acc[customerName]) {
      acc[customerName] = 0
    }

    acc[customerName] += rewardPoints
    return acc
  }, {})

  const totalRewards = Object.entries(totalRewardsData).map(
    ([name, points]) => ({
      customerName: name,
      rewardPoints: points,
    })
  )

  return totalRewards
}

// calculate monthly rewards points as per total transaction in a month by the customers
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

/* latest three transactions of three consecutive months for each customer
 if they have three transactions, otherwise show all transactions of that customer
 */
export const getPastThreeMonthsTransactions = (transactions) => {
  // Group transactions by customerId and process them
  const result = transactions.reduce((acc, transaction) => {
    const { customerId } = transaction
    if (!acc[customerId]) {
      acc[customerId] = []
    }
    acc[customerId].push({
      ...transaction,
      purchaseDate: new Date(transaction.purchaseDate),
    })

    return acc
  }, {})

  // Flatten the results after processing each customer
  const processedResults = Object.values(result).reduce((acc, transactions) => {
    // Sort by purchaseDate descending
    const sortedTransactions = transactions.sort(
      (a, b) => b.purchaseDate - a.purchaseDate
    )

    // Find three consecutive months
    const monthValues = sortedTransactions.map(
      ({ purchaseDate }) =>
        purchaseDate.getFullYear() * 12 + purchaseDate.getMonth()
    )

    const latestThreeConsecutive = sortedTransactions
      .reduce((subAcc, transaction, index) => {
        const [month1, month2, month3] = [
          monthValues[index],
          monthValues[index + 1],
          monthValues[index + 2],
        ]
        if (month1 - month2 === 1 && month2 - month3 === 1) {
          subAcc.push(transaction)
        }
        return subAcc
      }, [])
      .slice(0, 3)

    // Convert Dates to strings
    const transactionsToReturn =
      latestThreeConsecutive.length === 3
        ? latestThreeConsecutive
        : sortedTransactions

    const stringifiedTransactions = transactionsToReturn.map((transaction) => ({
      ...transaction,
      purchaseDate: transaction.purchaseDate.toISOString().split('T')[0],
    }))

    return acc.concat(stringifiedTransactions)
  }, [])

  return processedResults
}
