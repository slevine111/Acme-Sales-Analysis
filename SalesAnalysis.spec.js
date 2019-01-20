const expect = require('chai').expect
const SalesRecordsSystem = require('./SalesAnalysis')

describe('SalesRecordsSystem class', () => {
  let salesRecordsSystem = new SalesRecordsSystem()

  it('salesRecordsSystem is an object', () => {
    expect(typeof salesRecordsSystem).to.equal('object')
    expect(Array.isArray(salesRecordsSystem)).to.be.false
    expect(salesRecordsSystem).to.not.be.null
  })
  it('salesRecordsSystem has products, orders, and buyers properties', () => {
    expect(salesRecordsSystem.products).to.eql([])
    expect(salesRecordsSystem.orders).to.eql([])
    expect(salesRecordsSystem.buyers).to.eql([])
  })
  it('salesRecordsSystem has addNewItem, productsOrBuyersInTransactions, productsPurchased, topSellingProductByQuantity, and usersWithOrders methods', () => {
    expect(typeof salesRecordsSystem.addNewItem).to.equal('function')
    expect(typeof salesRecordsSystem.productsOrBuyersInTransactions).to.equal(
      'function'
    )
    expect(typeof salesRecordsSystem.productsPurchased).to.equal('function')
    expect(typeof salesRecordsSystem.topSellingProductByQuantity).to.equal(
      'function'
    )
    expect(typeof salesRecordsSystem.usersWithOrders).to.equal('function')
  })
})

describe('addNewItem method', () => {
  let salesRecordsSystem = new SalesRecordsSystem()

  it("method adds new order to orders array when inputOfType paramater is set to 'orders'", () => {
    salesRecordsSystem.addNewItem(
      {
        id: 1,
        productId: 1,
        quantity: 3,
        userId: 1
      },
      'orders'
    )
    expect(salesRecordsSystem.orders.length).to.equal(1)
    expect(salesRecordsSystem.orders[0]).to.eql({
      id: 1,
      productId: 1,
      quantity: 3,
      userId: 1
    })
  })
  it("method adds new product to products array when inputOfType paramater is set to 'products'", () => {
    salesRecordsSystem.addNewItem(
      {
        id: 1,
        name: 'baz',
        price: 5
      },
      'products'
    )
    expect(salesRecordsSystem.products.length).to.equal(1)
    expect(salesRecordsSystem.products[0]).to.eql({
      id: 1,
      name: 'baz',
      price: 5
    })
  })
  it("method adds new buyer to buyers array when inputOfType paramater is set to 'buyers'", () => {
    salesRecordsSystem.addNewItem({ id: 1, name: 'larry' }, 'buyers')
    expect(salesRecordsSystem.buyers.length).to.equal(1)
    expect(salesRecordsSystem.buyers[0]).to.eql({
      id: 1,
      name: 'larry'
    })
  })
  it('method throws an error when inputOfType aparameter is set to any other argument', () => {
    let testFunction = () =>
      salesRecordsSystem.addNewItem({ id: 2, name: 'moe' }, 'buyer')
    expect(testFunction).to.throw(
      /^typeOfItem input parameter value not valid$/
    )
  })
})

describe('productsPurchased, topSellingProductByQuantity, and usersWithOrders methods', () => {
  let salesRecordsSystem = new SalesRecordsSystem()
  salesRecordsSystem.addNewItem(
    {
      id: 1,
      productId: 1,
      quantity: 3,
      userId: 1
    },
    'orders'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 2,
      productId: 1,
      quantity: 7,
      userId: 1
    },
    'orders'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 3,
      productId: 5,
      quantity: 70,
      userId: 3
    },
    'orders'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 3,
      productId: 5,
      quantity: 1,
      userId: 3
    },
    'orders'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 1,
      name: 'foo',
      price: 7
    },
    'products'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 2,
      name: 'bar',
      price: 2
    },
    'products'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 5,
      name: 'bazz',
      price: 1
    },
    'products'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 1,
      name: 'moe'
    },
    'buyers'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 2,
      name: 'larry'
    },
    'buyers'
  )
  salesRecordsSystem.addNewItem(
    {
      id: 3,
      name: 'curly'
    },
    'buyers'
  )
  it('productsPurchased method returns the entries in the producta array that have been ordered', () => {
    let returnValue = [
      {
        id: 1,
        name: 'foo',
        price: 7
      },
      {
        id: 5,
        name: 'bazz',
        price: 1
      }
    ]
    expect(salesRecordsSystem.productsPurchased()).to.eql(returnValue)
  })
  it('topSellingProductByQuantity method returns the product that has been sold the most by quantity', () => {
    expect(salesRecordsSystem.topSellingProductByQuantity()).to.eql({
      id: 5,
      name: 'bazz',
      price: 1
    })
  })
  it('usersWithOrders method returns the entries in the buyers array who have placed an item', () => {
    let returnValue = [
      {
        id: 1,
        name: 'moe'
      },
      {
        id: 3,
        name: 'curly'
      }
    ]
    expect(salesRecordsSystem.usersWithOrders()).to.eql(returnValue)
  })
})
