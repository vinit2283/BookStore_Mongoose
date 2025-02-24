const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imgUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imgUrl = imgUrl;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbop;
//     if (this._id) {
//       //update product
//       dbop = db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this }); // updateOne update only one product, and it contain the two arguments(first i use the 'filter' that defines which element or which document we want to update )
//       // The second argument is specify how to update that document ex. [1st, 2nd] => [this, updation for this element] 
//       // $set is in build fuction of mongodb
//     } else {
//       //insert product
//       dbop = db.collection('products').insertOne(this);
//     }
//     return dbop
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products')
//       .find() //in build method in mongodb
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db.collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) }) // it will find the id but not fetched because at the database _id stored in the BSON formate so that i have to import the mongodb in this file. Also you have to pass the new mongodb.ObjectId() so that it will show at page (show product when click on 'detail')
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }

// module.exports = Product;

