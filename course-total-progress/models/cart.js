const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
) 

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      };
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      };
      cart.totalPrice = cart.totalPrice + +productPrice;
      Cart.saveCartInJson(cart);
    })
  }

  static deleteProduct(id, productPrice) {
    
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        const updatedCart = {...JSON.parse(fileContent)};
        const product = updatedCart.products.find(prod => prod.id === id);
        if (product) {

          const productQty = product.qty;
          updatedCart.products = updatedCart.products.filter(
            prod => prod.id !== id
            );

            console.log(productPrice);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            
            Cart.saveCartInJson(updatedCart);
          }
        }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static saveCartInJson(cart) {
    fs.writeFile(p, JSON.stringify(cart), err => {
      console.log(err);
    })
  }
}