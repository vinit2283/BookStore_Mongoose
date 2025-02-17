const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {

    // res.render('admin/add-product', {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
        // formsCSS: true,
        // productCSS: true,
        // activeAddProduct: true
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
    const product = new Product(null, title, imgUrl, description, price);
    product.save();
    // console.log('In the middleware');
    // products.push({title: req.body.title});
    res.redirect('/');
    // next(); //Allows the request to continue to the next middleware in line
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; //This is the query string that we are looking for in the URL (edit-product?edit=true)
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode, //This is a flag that we can use in the template to determine if we are in edit mode or not
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    //we are basically constructing a new product and replace the existing product with the new one
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImgUrl = req.body.imgUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImgUrl, updatedDesc, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
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