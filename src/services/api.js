export const transactions = [
  {
    transactionId: 'T1',
    customerId: 'C4',
    customerName: 'John Doe',
    purchaseDate: '2023-12-15',
    product: 'Laptop',
    price: 120,
  },
  {
    transactionId: 'T2',
    customerId: 'C3',
    customerName: 'Jane Smith',
    purchaseDate: '2024-01-10',
    product: 'Phone',
    price: 90,
  },
  {
    transactionId: 'T3',
    customerId: 'C4',
    customerName: 'John Doe',
    purchaseDate: '2024-1-15',
    product: 'Laptop Charger',
    price: 100,
  },
  {
    transactionId: 'T4',
    customerId: 'C1',
    customerName: 'Alice Johnson',
    purchaseDate: '2024-01-20',
    product: 'Tablet',
    price: 55,
  },
  {
    transactionId: 'T5',
    customerId: 'C2',
    customerName: 'Bob Brown',
    purchaseDate: '2024-02-05',
    product: 'Headphones',
    price: 70,
  },
  {
    transactionId: 'T6',
    customerId: 'C4',
    customerName: 'John Doe',
    purchaseDate: '2024-02-15',
    product: 'Keyboard',
    price: 110,
  },
  {
    transactionId: 'T7',
    customerId: 'C3',
    customerName: 'Jane Smith',
    purchaseDate: '2024-02-01',
    product: 'Monitor',
    price: 150,
  },
  {
    transactionId: 'T8',
    customerId: 'C1',
    customerName: 'Alice Johnson',
    purchaseDate: '2024-03-10',
    product: 'Mouse',
    price: 45,
  },
  {
    transactionId: 'T9',
    customerId: 'C2',
    customerName: 'Bob Brown',
    purchaseDate: '2024-03-15',
    product: 'Webcam',
    price: 95,
  },
  {
    transactionId: 'T10',
    customerId: 'C4',
    customerName: 'John Doe',
    purchaseDate: '2024-03-20',
    product: 'Printer',
    price: 105,
  },
  {
    transactionId: 'T11',
    customerId: 'C3',
    customerName: 'Jane Smith',
    purchaseDate: '2023-12-25',
    product: 'Router',
    price: 85,
  },
  {
    transactionId: 'T12',
    customerId: 'C4',
    customerName: 'John Doe',
    purchaseDate: '2023-11-15',
    product: 'TV',
    price: 250,
  },
]

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions)
    }, 1000) // Simulate 1 second delay
  })
}
