const express = require('express');
const router = express.Router();
const path = require('path');
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProduct);

router.get('/products/:productId', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
