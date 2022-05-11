const orders = [
  {
    tax: 35,
    shippingFee: 5,
    clientSecret: 'fakeClientSecret',
    total: 32,
    subtotal: 64,
    cartItems: [{
        name: 'The Settlers of Catan',
        price: 49.99,
        image:
          'https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160',
        quantity: 5,
        product: '627c1070b97a73424848a5d9',
      }
    ],
  },
  {
    tax: 28,
    shippingFee: 4,
    clientSecret: 'fakeClientSecret',
    total: 32,
    subtotal: 64,
    cartItems: [
      {
        name: 'Omerta',
        price: 19.99,
        image:
          'https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160',
        quantity: 3,
        product: '627c1070b97a73424848a5da',
      },
      {
        name: 'Codenames',
        price: 23.99,
        image:
          'https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160',
        quantity: 12,
        product: '627c1070b97a73424848a5dc',
      },
    ],
  },
]

export default orders
