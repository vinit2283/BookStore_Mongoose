const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        console.log("products", products);

        // console.log('in the another middleware');
        // res.render('shop');
        // const products = adminData.products;
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            // hasProducts: products.length > 0,
            // activeShop: true,
            // productCSS: true
        });
        // console.log('shop.js',adminData.products);
        // res.sendFile(path.join(rootDir,'views','shop.html'));
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {        
        // console.log('in the another middleware');
        // res.render('shop');
        // const products = adminData.products;
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            // hasProducts: products.length > 0,
            // activeShop: true,
            // productCSS: true
        });
        // console.log('shop.js',adminData.products);
        // res.sendFile(path.join(rootDir,'views','shop.html'));
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};