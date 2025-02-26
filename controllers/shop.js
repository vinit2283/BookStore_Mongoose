const Product = require('../models/product');
// const Cart = require('../models/cart');
// const { where } = require('sequelize');
const Order = require('../models/order');
const product = require('../models/product');

exports.getProduct = (req, res, next) => {
    Product.find() //in build method in mongoose it will fetch all products from products collection
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    const prodId = req.params.productId; // where productId belongs to product._id => <a href="/products/<%= product._id %>" class="btn">Details</a>
    Product.findById(prodId) // also findById() is defined by mongoose
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err)
        );

    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProduct = cart.products.find(prod => prod.id === product.id);
    //             if (cart.products.find(prod => prod.id === product.id)) {
    //                 cartProducts.push({ productData: product, qty: cartProduct.qty });
    //             }
    //         }
    //     });
    // });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
        return req.user.addToCart(product);
      })
      .then(result => {
        console.log(result);
        res.redirect('/cart');
      });
  };

    // let fetchedCart;
    // let newQuantity = 1;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({ where: { id: prodId } });
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }

    //         if (product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }
    //         return Product.findByPk(prodId);
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: { quantity: newQuantity }
    //         });
    //     })
    //     .then(() => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));
// };

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        // .then(cart => {
        //     return cart.getProducts({ where: { id: prodId } });
        // })
        // .then(products => {
        //     const product = products[0];
        //     return product.cartItem.destroy();
        // })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
    // Product.findById(prodId, product => {
    //     Cart.deleteProduct(prodId, product.price);
    // });
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                // return { product: i.productId, quantity: i.quantity };
                // now for adding full info of product use,
                return { product: { ...i.productId._doc }, quantity: i.quantity }; // In Mongoose, a document includes not just data but also extra methods and metadata. _doc holds only the actual data.So, we use _doc to get the actual data.
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user._id
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};


// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Checkout'
//     });
// };
