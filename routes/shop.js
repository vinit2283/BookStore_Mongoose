const express = require('express');
const router = express.Router();
const path = require('path');
const shopController = require('../controllers/shop');
// const rootDir = require('../util/path');
// const adminData = require('./admin');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
// router.get('/product-detail');
// router.get('/product-list');
module.exports = router;