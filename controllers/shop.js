const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        // console.log("products", products);

        // console.log('in the another middleware');
        // res.render('shop');
        // const products = adminData.products;
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products', //set active path link in header using this path variable
            // hasProducts: products.length > 0,
            // activeShop: true,
            // productCSS: true
        });
        // console.log('shop.js',adminData.products);
        // res.sendFile(path.join(rootDir,'views','shop.html'));
    });
};

exports.getProducts = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: "/products"
        });
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
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProduct = cart.products.find(prod => prod.id === product.id);
                if(cart.products.find(prod => prod.id === product.id)) {
                    cartProducts.push({productData: product, qty: cartProduct.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
