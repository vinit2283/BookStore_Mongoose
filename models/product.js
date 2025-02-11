const fs = require('fs');
const path = require('path');

const products = [];

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(titile, imgUrl, description, price) {
    this.title = titile;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
    });
      // let products = [];
      // if (!err) {
      //   products = JSON.parse(fileContent);
      // }
      });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
