export const transactions = [
  {
    transactionId: 1,
    customerId: 1,
    customerName: 'John Doe',
    purchaseDate: '2023-12-15',
    product: 'Laptop',
    price: 120,
  },
  {
    transactionId: 2,
    customerId: 2,
    customerName: 'Jane Smith',
    purchaseDate: '2024-01-10',
    product: 'Phone',
    price: 90,
  },
  {
    transactionId: 3,
    customerId: 3,
    customerName: 'Alice Johnson',
    purchaseDate: '2024-01-20',
    product: 'Tablet',
    price: 55,
  },
  {
    transactionId: 4,
    customerId: 4,
    customerName: 'Bob Brown',
    purchaseDate: '2024-02-05',
    product: 'Headphones',
    price: 70,
  },
  {
    transactionId: 5,
    customerId: 1,
    customerName: 'John Doe',
    purchaseDate: '2024-02-15',
    product: 'Keyboard',
    price: 110,
  },
  {
    transactionId: 6,
    customerId: 2,
    customerName: 'Jane Smith',
    purchaseDate: '2024-03-01',
    product: 'Monitor',
    price: 150,
  },
  {
    transactionId: 7,
    customerId: 3,
    customerName: 'Alice Johnson',
    purchaseDate: '2024-03-10',
    product: 'Mouse',
    price: 45,
  },
  {
    transactionId: 8,
    customerId: 4,
    customerName: 'Bob Brown',
    purchaseDate: '2024-03-15',
    product: 'Webcam',
    price: 95,
  },
  {
    transactionId: 9,
    customerId: 1,
    customerName: 'John Doe',
    purchaseDate: '2024-03-20',
    product: 'Printer',
    price: 105,
  },
  {
    transactionId: 10,
    customerId: 2,
    customerName: 'Jane Smith',
    purchaseDate: '2024-03-25',
    product: 'Router',
    price: 85,
  },
]

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions)
    }, 1000) // Simulate 1 second delay
  })
}
