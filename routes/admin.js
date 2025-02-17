const express = require('express');
const router = express.Router();
const path = require('path');
// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');


// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct); // this will not render anything, it will just update the product and redirect to /admin/products page 

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
// exports.products = products;