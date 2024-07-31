import {
  calculateRewardPoints,
  calculateTotalRewards,
  calculateMonthlyRewards,
} from './calculateRewards'

// calculate rewards  points test cases
describe('calculateRewardPoints', () => {
  it('should return 0 points for a purchase amount of 0', () => {
    expect(calculateRewardPoints(0)).toBe(0)
  })

  it('should return correct points for a purchase amount below the first threshold', () => {
    expect(calculateRewardPoints(30)).toBe(0) // No rewards below 50
  })

  it('should return correct points for a purchase amount above the first threshold but below the second', () => {
    expect(calculateRewardPoints(75)).toBe(25) // (75 - 50) * 1 = 25
  })

  it('should return correct points for a purchase amount above the second threshold', () => {
    expect(calculateRewardPoints(150)).toBe(150) // (100 - 50) * 1 + (150 - 100) * 2 = 50 + 100 = 150
  })
})

// calculate total rewards test cases
describe('calculateTotalRewards', () => {
  it('should return correct rewards for multiple transactions of a single customer', () => {
    const transactions = [
      { customerName: 'Alice', price: 60 },
      { customerName: 'Alice', price: 150 },
    ]
    const expectedRewards = { Alice: 185 } // 10 (60-50)*1 + 135 [(150-100)*2 + 50*1]
    expect(calculateTotalRewards(transactions)).toEqual(expectedRewards)
  })

  it('should return correct rewards for multiple customers', () => {
    const transactions = [
      { customerName: 'Alice', price: 60 },
      { customerName: 'Bob', price: 150 },
    ]
    const expectedRewards = { Alice: 10, Bob: 135 }
    expect(calculateTotalRewards(transactions)).toEqual(expectedRewards)
  })

  it('should return 0 rewards for customers with no valid transactions', () => {
    const transactions = [
      { customerName: 'Alice', price: 30 },
      { customerName: 'Bob', price: 40 },
    ]
    const expectedRewards = { Alice: 0, Bob: 0 }
    expect(calculateTotalRewards(transactions)).toEqual(expectedRewards)
  })
})

// calculate monthly rewards test cases
describe('calculateMonthlyRewards', () => {
  it('should return correct monthly rewards for a single customer', () => {
    const transactions = [
      {
        customerName: 'Alice',
        purchaseDate: '2024-06-15',
        price: 60,
        customerId: '1',
      },
      {
        customerName: 'Alice',
        purchaseDate: '2024-06-20',
        price: 150,
        customerId: '1',
      },
    ]
    const expectedRewards = {
      'Alice-6-2024': {
        customerName: 'Alice',
        customerId: '1',
        month: 6,
        year: 2024,
        rewardPoints: 185,
      },
    }
    expect(calculateMonthlyRewards(transactions)).toEqual(expectedRewards)
  })

  it('should return correct monthly rewards for multiple customers', () => {
    const transactions = [
      {
        customerName: 'Alice',
        purchaseDate: '2024-06-15',
        price: 60,
        customerId: '1',
      },
      {
        customerName: 'Bob',
        purchaseDate: '2024-06-20',
        price: 150,
        customerId: '2',
      },
    ]
    const expectedRewards = {
      'Alice-6-2024': {
        customerName: 'Alice',
        customerId: '1',
        month: 6,
        year: 2024,
        rewardPoints: 10,
      },
      'Bob-6-2024': {
        customerName: 'Bob',
        customerId: '2',
        month: 6,
        year: 2024,
        rewardPoints: 135,
      },
    }
    expect(calculateMonthlyRewards(transactions)).toEqual(expectedRewards)
  })

  it('should return correct monthly rewards for multiple months', () => {
    const transactions = [
      {
        customerName: 'Alice',
        purchaseDate: '2024-06-15',
        price: 60,
        customerId: '1',
      },
      {
        customerName: 'Alice',
        purchaseDate: '2024-07-20',
        price: 150,
        customerId: '1',
      },
    ]
    const expectedRewards = {
      'Alice-6-2024': {
        customerName: 'Alice',
        customerId: '1',
        month: 6,
        year: 2024,
        rewardPoints: 160,
      },
      'Alice-7-2024': {
        customerName: 'Bob',
        customerId: '1',
        month: 7,
        year: 2024,
        rewardPoints: 150,
      },
    }
    expect(calculateMonthlyRewards(transactions)).toEqual(expectedRewards)
  })
})
