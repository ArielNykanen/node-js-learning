const Cart = require('./cart')
const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
  ) 
const getProductsFromFile = cb => {

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}



module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // adding temp id method
    // todo need to be changed
    getProductsFromFile(products => {
    if (this.id) {
      const existingProductIndex = products.findIndex(
        prod => prod.id === this.id
        );
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex] = this;   
      Product.saveProductInJson(updatedProducts, cb => {});
    } else {
      this.id = Math.random().toString();
      products.push(this);
      Product.saveProductInJson(products, cb => {});
    };
   });
  }

  static deleteById(productId) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === productId);
      const updatedProducts = products.filter(prod => prod.id !== productId);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(productId, product.price);
        }
      });

    });
  }

  static saveProductInJson(products) {
    fs.writeFile(p, JSON.stringify(products), (err) => {
      if (err) {
        console.log(err);
      }
    })
  }
 
  static fetchAll(cb) {
  getProductsFromFile(cb);
  }

  static getById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

}