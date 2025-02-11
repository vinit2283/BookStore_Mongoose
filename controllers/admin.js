const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    }); //.this is for the hbs also can use for ejs

    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    // console.log('This always runs');
    // res.send('<h1>Hello from Express.js</h1>');
    // next(); //Allows the request to continue to the next middleware in line
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imgUrl,  description, price);
    product.save();
    // console.log('In the middleware');
    // products.push({title: req.body.title});
    res.redirect('/');
    // next(); //Allows the request to continue to the next middleware in line
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};