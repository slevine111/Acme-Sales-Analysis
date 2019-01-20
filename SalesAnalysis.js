class SalesRecordsSystem {
  constructor() {
    this.products = []
    this.orders = []
    this.buyers = []
  }

  addNewItem(newItem, typeOfItem) {
    if (!['products', 'orders', 'buyers'].includes(typeOfItem)) {
      throw 'typeOfItem input parameter value not valid'
    }
    this[typeOfItem].push(newItem)
  }

  productsOrBuyersInTransactions(productsOrUsers) {
    let id = productsOrUsers === 'products' ? 'productId' : 'userId'
    let entriesInOrdersArray = this.orders.map(order => order[id])
    return this[productsOrUsers].filter(element =>
      entriesInOrdersArray.includes(element.id)
    )
  }

  productsPurchased() {
    return this.productsOrBuyersInTransactions('products')
  }

  topSellingProductByQuantity() {
    let quantityOfSalesByProduct = []
    let productTotalSales
    this.orders.forEach(order => {
      productTotalSales = quantityOfSalesByProduct.find(
        product => product.productId === order.productId
      )
      if (!productTotalSales) {
        quantityOfSalesByProduct.push({
          productId: order.productId,
          total: order.quantity
        })
      } else {
        productTotalSales.total += order.quantity
      }
    })
    let productIdMostSold = quantityOfSalesByProduct.sort(
      (x, y) => y.total - x.total
    )[0].productId
    return this.products.find(product => product.id === productIdMostSold)
  }

  usersWithOrders() {
    return this.productsOrBuyersInTransactions('buyers')
  }
}

module.exports = SalesRecordsSystem
